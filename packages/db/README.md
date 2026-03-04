# Twitzie Database Package (`@repo/db`)

This package manages the database schema and provides the Prisma Client for the rest of the monorepo.

## 🛠️ Stack

- [Prisma](https://www.prisma.io/)
- PostgreSQL
- Typescript

## 🚀 Usage

This package exports a singleton instance of the Prisma Client which can be imported into other packages (like `apps/web`) seamlessly.

```typescript
import { prisma } from "@repo/db/client";

// Use the prisma client
const user = await prisma.user.findUnique({ where: { id: "user_id" } });
```

## 💻 Scripts

From the root of this workspace (`packages/db`), you can run:

- `npm run db:generate`: Generates the Prisma Client based on your `schema.prisma`. Essential before running the frontend.
- `npm run db:deploy`: Deploys the migrations to the connected database. Useful for initial setup or CI/CD.
- `npm run db:migrate`: Creates and applies a new migration after making changes to `schema.prisma`. (Use this during development).

## Environment Configuration

A `DATABASE_URL` is required for Prisma to function correctly. Ensure you map this variable via a local `.env` file before running any prisma commands. See `.env.example` for the required format.
