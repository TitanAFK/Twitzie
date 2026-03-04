# Twitzie - AI Tweet Enhancer 🚀

Twitzie is a powerful, AI-driven web application designed to help you create more engaging, clear, and impactful tweets. Built with a modern dark-theme aesthetic, it uses Google's Gemini AI to analyze and optimize your social media content perfectly tailored to your desired tone and length.

## 🌟 Features

- **AI-Powered Enhancements**: Utilizes Gemini 1.5 Flash to automatically rewrite and improve tweets.
- **Customizable Output**: Choose the tone (Professional, Casual, Funny, etc.) and length of your generated tweets.
- **Beautiful UI/UX**: A sleek, dark-themed interface built for a premium user experience.
- **History Dashboard**: A dedicated dashboard to view all your previously enhanced tweets.
- **Secure Authentication**: Integrated with NextAuth for seamless Google and GitHub login.
- **Modern Monorepo Architecture**: Structured using Turborepo for fast, scalable development.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** Custom CSS with dark theme emphasis
- **Database:** PostgreSQL (Neon DB)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **AI Integration:** Google Gemini AI
- **Monorepo Management:** [Turborepo](https://turbo.build/)

## 🏗️ Project Structure

This project uses Turborepo. It consists of the following workspaces:

- `apps/web`: The main Next.js web application.
- `packages/db`: Prisma database configurations and generated client.
- `packages/ui`: Shared React components (if applicable).
- `packages/eslint-config`: Shared `eslint` configurations.
- `packages/typescript-config`: Shared `tsconfig.json`s used throughout the monorepo.

## 💻 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (v18 or higher)
- npm (v10 or higher)
- A PostgreSQL database (e.g., Neon, Supabase, or local)
- A Google Gemini API Key

### Installation

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd twitzie
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   You will need to set up environment variables in both the `web` and `db` packages.
   Template files (`.env.example`) have been provided in the respective directories.
   - Copy `apps/web/.env.example` to `apps/web/.env` and fill in your authentication and AI keys.
   - Copy `packages/db/.env.example` to `packages/db/.env` and add your database connection string.

4. **Initialize the database:**
   Deploy the Prisma schema to your database and generate the Prisma Client.

   ```bash
   npm run db:deploy --workspace=@repo/db
   npm run db:generate --workspace=@repo/db
   ```

   _(Alternatively, run `npx turbo run db:generate` from the root)_

5. **Start the development server:**

   ```bash
   npm run dev
   ```

6. **Open the app:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Scripts

Useful commands you can run from the root of the project:

- `npm run dev`: Starts the development servers for all apps.
- `npm run build`: Builds all apps and packages for production.
- `npm run lint`: Lints all workspaces.
- `npm run check-types`: Runs TypeScript type checking across the project.
