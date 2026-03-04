"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardAppBar } from "../../components/dashboard/DashboardAppBar";

export default function CreateTweetPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const [tone, setTone] = useState("VIRAL");
  const [length, setLength] = useState("SHORT");
  const [emoji, setEmoji] = useState("yes");

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch("/api/improve-tweet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tweet: userMessage,
          options: {
            tone: tone,
            length: length,
            emoji: emoji === "yes",
          },
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setMessages((prev) => [
        ...prev,
        { role: "ai", content: data.improvedTweet },
      ]);
    } catch (error) {
      console.error("Failed to improve tweet", error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-fullscreen-page">
      <DashboardAppBar />
      
      <div className="chat-fullscreen-container">
        {/* Ambient background matching overall theme */}
        <div className="ambient-background">
          <div className="ambient-light-center"></div>
        </div>

        <div className="chat-wrapper">
          {/* Chat Messages */}
          <div 
              ref={scrollRef}
              className="chat-messages custom-scrollbar"
          >
            <AnimatePresence initial={false}>
              {messages.length === 0 && (
                  <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="empty-chat-fullscreen"
                  >
                      <div className="empty-chat-icon-large">
                          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                      </div>
                      <h2 className="empty-chat-title">AI Tweet Enhancer</h2>
                      <p className="empty-chat-subtitle">Type a rough draft below and let AI polish it.</p>
                  </motion.div>
              )}
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`chat-message ${msg.role}`}
                >
                  <div className={`message-bubble-modern ${msg.role}`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
               {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="chat-message ai"
                >
                  <div className="loading-bubble-modern">
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Controls & Input */}
          <div className="chat-input-area">
             <div className="input-container-wrapper">
                 <div className="options-row-pill">
                     <select
                         value={tone}
                         onChange={(e) => setTone(e.target.value)}
                         aria-label="Select tone"
                         className="pill-select"
                     >
                         <option value="VIRAL">🔥 Viral</option>
                         <option value="PROFESSIONAL">💼 Professional</option>
                         <option value="CASUAL">☕ Casual</option>
                         <option value="BOLD">🦁 Bold</option>
                         <option value="HUMOROUS">🤪 Humorous</option>
                         <option value="PERSUASIVE">🧠 Persuasive</option>
                     </select>

                     <select
                         value={length}
                         onChange={(e) => setLength(e.target.value)}
                         aria-label="Select length"
                          className="pill-select"
                     >
                         <option value="SHORT">⚡ Short</option>
                         <option value="MEDIUM">📝 Medium</option>
                         <option value="LONG">📜 Long</option>
                     </select>

                      <select
                         value={emoji}
                         onChange={(e) => setEmoji(e.target.value)}
                         aria-label="Select emoji preference"
                          className="pill-select"
                     >
                         <option value="yes">😀 Emojis: Yes</option>
                         <option value="no">🚫 Emojis: No</option>
                     </select>
                 </div>

                 <form onSubmit={handleSubmit} className="input-form">
                     <input
                     type="text"
                     value={input}
                     onChange={(e) => setInput(e.target.value)}
                     placeholder="Paste your thought here..."
                     className="chat-input"
                     />
                     <button
                     type="submit"
                     disabled={loading || !input.trim()}
                     className="send-btn-modern"
                     >
                         {loading ? (
                             <div className="w-5 h-5 border-2 border-transparent border-t-black rounded-full animate-spin"></div>
                         ) : (
                             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                         )}
                     </button>
                 </form>
             </div>
             <p className="ai-disclaimer">AI can make mistakes. Verify important information.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
