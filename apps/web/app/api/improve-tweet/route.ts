// app/api/improve-tweet/route.ts
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { prisma, Tone, Length } from "@repo/db/client";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY ?? "",
});

interface ImproveTweetRequest {
  tweet: string;
  options?: {
    tone?: Tone;
    length?: Length;
    emoji?: boolean;
  };
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: ImproveTweetRequest = await req.json();
    const { tweet, options = {} } = body;

    if (!tweet?.trim()) {
      return NextResponse.json(
        { error: "Tweet content is required" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key is not configured" },
        { status: 500 }
      );
    }

    const prompt = `
You are a professional social media copywriter and growth expert specializing in X (Twitter).
You understand X's algorithm, engagement psychology, hooks, readability, and virality.
Your goal is to rewrite tweets to maximize engagement (likes, reposts, replies) while preserving the original meaning.

Tweet:
"${tweet}"

Apply the following customization options:
- Tone: ${options.tone ?? "VIRAL"}
- Length: ${options.length ?? "SHORT"}
- Use Emojis: ${options.emoji ? "Yes" : "No, unless necessary"}

Constraints:
- Preserve the original meaning.
- Improve hook in the first line.
- Make it easy to skim.
- Make it sound human, not AI-generated.
- Improve clarity and engagement.
- Do NOT add hashtags unless explicitly asked in the tweet.
- Return ONLY the improved tweet text. Do not include quotes or any other text.
    `.trim();

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash", 
      contents: prompt,
    });

    let improvedTweet = result.text ?? "";

    // Clean up in case of extra quotes/line breaks
    improvedTweet = improvedTweet.trim().replace(/^["„]|[“"]$/g, "");
    
    // Save to database
    const savedTweet = await prisma.tweet.create({
        data: {
            userId: session.user.id,
            originalText: tweet,
            improvedText: improvedTweet,
            tone: options.tone ?? "VIRAL",
            length: options.length ?? "SHORT",
            emoji: options.emoji ?? false
        }
    });

    return NextResponse.json({ improvedTweet, id: savedTweet.id });
  } catch (error: any) {
    console.error("Error improving tweet:", {
      message: error?.message,
      stack: error?.stack?.slice(0, 300),
      cause: error?.cause, 
      name: error?.name
    });

    const msg =
      error?.message?.includes("API key") || error?.message?.includes("auth")
        ? "Invalid or missing Gemini API key"
        : "Failed to improve tweet. Check server logs for details.";

    return NextResponse.json({ error: msg, details: error?.message }, { status: 500 });
  }
}