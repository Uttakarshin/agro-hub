# 🌿 Agro Vision Hub

An AI-powered crop disease detection web application. Upload a leaf photo and receive an instant Gemini-powered diagnosis — including disease name, severity, confidence score, and actionable treatment & prevention steps.

---

## ✨ Features

- 📸 **Snap & Diagnose** — Upload a leaf image in 3 easy steps: select crop → upload image → get AI analysis
- 🤖 **Gemini AI Powered** — Uses Google's `gemini-2.5-flash` model with a two-stage prompt pipeline for accurate, structured diagnosis
- 📊 **Dashboard Overview** — Health stats, weekly scan chart, disease distribution pie chart, recent scans, and AI-generated farming tips
- 🌾 **10 Supported Crops** — Apple, Corn, Grape, Potato, Rice, Soybean, Strawberry, Sugarcane, Tomato, Wheat
- 🔍 **Scan History** — Searchable and filterable list of all past scans
- 🔒 **Authentication** — Full Clerk auth with sign-in, sign-up, password reset, and account deletion
- 🌙 **Dark Mode** — Light / Dark / System theme support
- ⚙️ **Settings** — Language, units, notifications, and scan preferences
- 👤 **Profile Management** — Photo upload, farm info, bio, and account deletion (with full data cascade)

---

## 🏗️ Architecture

### Frontend (`artifacts/agro-vision-hub`)
- **Framework:** React + Vite
- **Styling:** Tailwind CSS v4 + shadcn/ui (green forest palette)
- **Routing:** Wouter
- **Auth:** Clerk (`@clerk/react`)
- **Animations:** Framer Motion
- **Charts:** Recharts
- **State/Fetching:** TanStack React Query

### API Server (`artifacts/api-server`)
- **Framework:** Express (bundled with esbuild)
- **Auth Middleware:** `@clerk/express` — verifies Clerk sessions
- **Key Routes:**
  | Method | Route | Description |
  |--------|-------|-------------|
  | GET | `/api/crops` | List supported crops |
  | POST | `/api/scans` | Submit a scan |
  | GET | `/api/scans` | List user's scans |
  | DELETE | `/api/scans/:id` | Delete a scan |
  | GET | `/api/dashboard/summary` | Dashboard stats |
  | GET | `/api/dashboard/recent` | Recent scans |
  | GET | `/api/dashboard/tips` | AI farming tips (6h cache) |
  | GET/PUT/DELETE | `/api/profile` | User profile management |
  | GET/PUT | `/api/settings` | User settings |

### ML / AI Pipeline
- Powered by `@google/genai` calling `gemini-2.5-flash`
- **Two-stage prompting:**
  1. **Validation** — Checks if the uploaded image is a valid leaf/crop photo; returns `{ valid, reason }`
  2. **Diagnosis** — Returns structured JSON:
    ```json
    {
      "status": "diseased",
      "disease": "Early Blight",
      "confidence": 0.92,
      "severity": "moderate",
      "summary": "...",
      "symptoms": ["..."],
      "treatment": ["..."],
      "prevention": ["..."]
    }
    ```

### Database
- **PostgreSQL** via Drizzle ORM
- **Tables:** `scans`, `settings`, `profile` — all scoped by Clerk `userId`
- Account deletion cascades all user data and calls `clerkClient.users.deleteUser`

---

## 🧠 ML Model (Notebook)

The included notebook (`crop_diseases_detection1_34.ipynb`) trains a **MobileNetV2** transfer learning model on the **PlantVillage** dataset for offline/local crop disease classification.

**Training Pipeline:**
1. Data augmentation with `ImageDataGenerator` (rotation, zoom, flip, etc.)
2. **Phase 1** — Train top classification layers (base frozen), 20 epochs
3. **Phase 2** — Fine-tune (unfreeze top layers), 10 epochs at `lr=1e-5`
4. Evaluation via confusion matrix and classification report

**Tech stack:** TensorFlow / Keras, MobileNetV2 (ImageNet weights), scikit-learn

---

## 📁 Project Structure

```
Agro-Vision-Hub/
├── artifacts/
│   ├── agro-vision-hub/        # React frontend
│   └── api-server/             # Express backend
├── lib/
│   ├── api-client-react/       # Typed API client
│   ├── api-spec/               # OpenAPI spec
│   ├── api-zod/                # Zod-validated schemas
│   ├── db/                     # Drizzle ORM schema & migrations
│   └── integrations-gemini-ai/ # Gemini AI integration
├── scripts/                    # Build utilities
├── package.json                # Workspace root (pnpm)
└── replit.md                   # Architecture notes
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- PostgreSQL database
- [Clerk](https://clerk.com) account (for auth)
- [Google Gemini API](https://ai.google.dev/) key

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/Agro-Vision-Hub.git
cd Agro-Vision-Hub

# Install dependencies (pnpm required)
pnpm install
```

### Environment Variables

Create a `.env` file in `artifacts/api-server/`:

```env
SESSION_SECRET=your_session_secret
CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=postgresql://user:password@localhost:5432/agrovision
```

### Development

```bash
# Run frontend
cd artifacts/agro-vision-hub
pnpm dev

# Run API server
cd artifacts/api-server
pnpm dev
```

### Build

```bash
# From workspace root
pnpm build
```

---

## 🌐 Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page (redirects to `/dashboard` if signed in) |
| `/sign-in` | Clerk sign-in |
| `/sign-up` | Clerk sign-up |
| `/dashboard` | Health overview with charts and AI tips |
| `/scan` | 3-step disease scan flow |
| `/scans/:id` | Full diagnosis result page |
| `/history` | Searchable scan history |
| `/settings` | App preferences |
| `/profile` | User profile and account management |
| `/about` | How it works + FAQ |

---

## 🔐 Security & Auth

- All API routes are protected by Clerk session verification middleware
- All database queries are scoped to the authenticated `userId`
- Account deletion permanently removes all user data from the DB and Clerk

---

## 🛠️ Tech Stack Summary

| Layer | Technology |
|-------|-----------|
| Frontend | React, Vite, Tailwind v4, shadcn/ui, Wouter |
| Backend | Express, esbuild, Clerk |
| AI/ML | Google Gemini 2.5 Flash, TensorFlow/Keras (notebook) |
| Database | PostgreSQL, Drizzle ORM |
| Auth | Clerk |
| Monorepo | pnpm workspaces |

---

## 📄 License

MIT
