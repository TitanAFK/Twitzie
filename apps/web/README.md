# Twitzie Web App

This is the main frontend application for Twitzie, built with [Next.js](https://nextjs.org/).

## 🚀 Features

- **App Router:** Utilizes the latest Next.js App Router for routing and layouts.
- **Authentication:** Powered by `next-auth` protecting the `/dashboard` and `/create` routes.
- **AI Integration:** Uses `@google/generative-ai` in the backend API routes (`/api/improve-tweet`) to securely communicate with Gemini.

## 💻 Development

To run this application specifically in development mode (if you don't want to run the entire turbo pipeline):

1. Set up your `.env` file based on the `.env.example`.
2. Ensure the `@repo/db` package has been built/generated.
3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Refer to `.env.example` in this directory for the required environment variables:

- NextAuth configuration (URLs, secrets, OAuth Client IDs)
- Database URL (for Prisma Client)
- Google Gemini API Key
