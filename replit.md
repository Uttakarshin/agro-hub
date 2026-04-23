# Agro Vision Hub

AI-powered crop disease detection web app. Snap a leaf photo and get a Gemini-powered diagnosis with severity, confidence, treatment, and prevention.

## Architecture

- **Frontend** (`artifacts/agro-vision-hub`): React + Vite + Tailwind v4 + shadcn UI + wouter, with Clerk auth (shadcn theme), framer-motion, recharts. Bound to `BASE_URL` from artifact path; calls API via `customFetch` with bearer token from Clerk.
- **API server** (`artifacts/api-server`): Express + esbuild bundle. Clerk middleware verifies sessions (`@clerk/express`). Routes: `/api/crops`, `/api/scans` (POST/GET/DELETE), `/api/dashboard/{summary,recent,tips}`, `/api/settings`, `/api/profile` (GET/PUT/DELETE).
- **ML**: `@google/genai` calling `gemini-2.5-flash` with inline image data. Two-stage prompt: (1) leaf+crop validation that returns `{ valid, reason }` to surface clean rejection messages; (2) diagnosis returning structured JSON `{ status, disease, confidence, severity, summary, symptoms[], treatment[], prevention[] }`.
- **DB**: Postgres via Drizzle ORM. Tables: `scans`, `settings`, `profile`. All scoped by Clerk `userId`. Account deletion cascades all tables and calls `clerkClient.users.deleteUser`.
- **Crops**: 10 crops in `artifacts/api-server/src/lib/crops.ts` (apple, corn, grape, potato, rice, soybean, strawberry, sugarcane, tomato, wheat).
- **Tips**: in-memory 6h cache of generated farming tips per user.

## Pages

- `/` Landing (signed-out) → redirect to `/dashboard` (signed-in)
- `/sign-in`, `/sign-up` (Clerk full-page)
- `/dashboard` health overview (stats, weekly chart, disease pie, recent scans, AI tips)
- `/scan` 3-step crop → upload → analyze with rejection error UI
- `/scans/:id` full diagnosis (image, confidence bar, symptoms/treatment/prevention)
- `/history` searchable + filterable scan list
- `/settings` language, dark mode, units, notifications, scan options, change password (Clerk profile modal)
- `/profile` photo upload, name/farm/location/bio, delete account
- `/about` how it works, FAQ (forgot-password explanation)

## Theming

CSS vars in `src/index.css` define a green forest palette. Dark mode toggled by `.dark` class on `html`, controlled via `ThemeProvider` (light/dark/system). Clerk uses shadcn theme (`@clerk/themes/shadcn.css`) imported into the `clerk` cascade layer with green primary color overrides.

## Build / dev oddities

- `lib/api-spec` runs a `fix-index.mjs` post-step to overwrite `lib/api-zod/src/index.ts` with only `./generated/api` exports (avoids type/zod name collisions on body schemas).
- `lib/api-client-react/package.json` exports both `.` and `./custom-fetch`.
- `pnpm-workspace.yaml` excludes `@clerk/*` from `minimumReleaseAge` (pinned `@clerk/express` to `1.7.78`).
- `@google/genai` added directly to api-server because esbuild externalizes `@google/*`.
- Vite uses `tailwindcss({ optimize: false })`.

## Secrets

- `SESSION_SECRET` (Express)
- Clerk publishable + secret keys from artifact env (auto)
- Gemini API key managed via Replit AI Integrations (no manual key required)

## Generated assets

Brand imagery in `artifacts/agro-vision-hub/public/`: `logo.png`, `hero-fields.jpg`, `hero-leaf.jpg`, `about-farmer.jpg`, `dashboard-bg.jpg`.
