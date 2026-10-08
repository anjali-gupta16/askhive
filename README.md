# 🐝 AskHive — Developer Q&A Platform

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-16.3.7-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=for-the-badge&logo=google" />
</div>

<br />

> **AskHive** is a high-performance, modern community Q&A platform built for developers — featuring real-time question feeds, nested discussions, reputation systems, AI-powered copilot assistance, and an animated galaxy background. ✨

---

## 🚀 Features

- 🌌 **Animated Starfield Background** — 750 moving stars with parallax depth, nebula clouds, and twinkling effects
- ❓ **Question Feed** — Browse, search, filter questions with live updates
- 🤖 **Gemini AI Copilot** — AI-powered assistant to help draft and refine questions
- 🏆 **Reputation Engine** — Voting, badges, and leaderboard system
- 👥 **Community Views** — Trending topics, tags explorer, bookmarks, Hivemind Leaders
- 🛡️ **Moderator Panel** — Review queue and moderation tools
- 🔔 **Notifications** — Real-time notification system
- 🔐 **Authentication** — Sign up / Login with NextAuth v5
- 📊 **Network Pulse** — Live stats dashboard
- 🎨 **Glassmorphism UI** — Semi-transparent panels over a deep galaxy background

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | TailwindCSS v4 + Vanilla CSS |
| Database | Prisma ORM |
| Auth | NextAuth v5 + bcryptjs |
| AI | Google Gemini API |
| State | Zustand + TanStack Query |
| Rich Text | Tiptap Editor |
| Charts | Recharts |
| Icons | Lucide React |
| Testing | Vitest + Testing Library |

---

## 📦 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/anjali-gupta16/askhive.git
cd askhive
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="your_database_url"
AUTH_SECRET="your_auth_secret"
GEMINI_API_KEY="your_gemini_api_key"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Set up the database

```bash
npm run db:push
npm run db:seed
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. 🎉

---

## 📁 Project Structure

```
askhive/
├── src/
│   ├── app/                    # Next.js App Router pages & API routes
│   │   ├── (auth)/             # Login & Register pages
│   │   ├── api/                # API endpoints (copilot, auth)
│   │   ├── globals.css         # Global styles & design system
│   │   ├── layout.tsx          # Root layout with starfield background
│   │   └── page.tsx            # Main Q&A feed page
│   ├── components/
│   │   ├── community/          # Feed views (trending, tags, bookmarks, leaders)
│   │   ├── layout/             # Header, Sidebar, Right Sidebar
│   │   ├── shared/             # Reusable components (starfield, modals)
│   │   └── ui/                 # Base UI components (Button, etc.)
│   ├── features/
│   │   ├── questions/          # Question cards, detail modal, ask modal
│   │   └── copilot/            # Gemini AI Copilot modal
│   ├── stores/                 # Zustand state management
│   └── types/                  # TypeScript type definitions
├── prisma/                     # Database schema & seed data
├── .vscode/                    # VS Code workspace settings
└── public/                     # Static assets
```

---

## 🎮 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run tests (Vitest)
npm run test:watch   # Run tests in watch mode
npm run db:push      # Push Prisma schema to database
npm run db:seed      # Seed the database with sample data
npm run db:generate  # Generate Prisma client
```

---

## 🌌 Background Animation

The website features a custom **canvas-based starfield animation** built with vanilla JavaScript:

- **750 stars** each with individual velocity, depth, and twinkling behavior
- **Parallax depth system** — near stars move faster than distant ones
- **6 nebula clouds** that slowly drift across the screen
- **Seamless edge wrapping** — stars that drift off one side reappear on the other

---

## 📸 Screenshots

> Coming soon...

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/anjali-gupta16">Anjali Gupta</a>
</div>
