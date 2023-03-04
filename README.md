# T3 Stack on the edge runtime.

This is a  project bootstrapped with `create-t3-app`.

## Modified [T3 Stack](https://create.t3.gg/), made to work on the edge runtime.

Get that sweet no-coldboot fullstack typesafe app running on Vercel quick.

- [Clerk](https://clerk.dev), instead of Auth.js (NextAuth)
- [Kysely](https://koskimas.github.io/kysely/), as a query builder replacer for Prisma, not perfect but provides a nice typesafe DX, while working on the edge with the fast planescale's database.js

## How to run this thing

- Install dependencies
```bash
  pnpm install
```

- Add the required environment variables to `.env` 
```bash
# Prisma
DATABASE_URL=

# Kysely
DATABASE_USERNAME=
DATABASE_PASSWORD=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```
- Run project
```
  pnpm dev
```
