# 🐝 AskHive — Singularity V1.0

AskHive is a next-generation, AI-powered developer community and knowledge exchange platform built for the modern engineering era. Featuring a stunning Cyberpunk / Deep Space Glassmorphism UI, AskHive seamlessly blends high-performance threaded discussions, Google Gemini AI copilot assistance, multi-tier role-based access control (RBAC), and a gamified reputation engine to elevate technical problem-solving and developer collaboration.

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.3.7-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-1.5_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)
![NextAuth](https://img.shields.io/badge/NextAuth.js-v5_Beta-black?style=for-the-badge&logo=nextdotjs&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>

<br />

---

## 🚀 Key Features & Modules

### 1. 🔐 Multi-Tier Role-Based Access Control (RBAC) & Authentication
- **Admin**: Full platform oversight, system diagnostics, user management, and global moderation privilege.
- **Moderator**: Access to the specialized Moderator Review Queue, flags resolution, tag lifecycle management, and content quality curation.
- **Developer (User)**: Post technical questions, submit multi-level replies, upvote/downvote solutions, bookmark key threads, and accumulate reputation points.
- **Guest Explorer Mode**: Frictionless, zero-setup onboarding allowing immediate browsing, searching, and public discussion reading.
- **NextAuth v5 Security**: Enterprise-grade authentication supporting salted bcrypt password hashing, persistent sessions, and secure protected server actions.

### 2. 🤖 AI Integration (Google Gemini 1.5 Flash Copilot & Smart Synthesizer)
- **Gemini Copilot Assistant**: Integrated conversational copilot that parses technical problems, assists in drafting high-quality questions, suggests edge cases, and provides instant code solutions formatted in clean markdown.
- **Hybrid Fallback Synthesis Engine**: High-resilience fallback engine offering specialized troubleshooting for TanStack Query optimistic mutations, Rust zero-copy WASM memory buffers, NextAuth security setups, and PostgreSQL BRIN/composite indexing when offline.
- **Transparent AI Attribution**: Native schema and UI support (`isAiGenerated`) that visibly labels automated versus human community contributions for transparent provenance.

### 3. ⚡ Core Q&A Engine & Rich Discussions
- **Threaded Hierarchical Discussions**: 2-level nested discussion architecture (root answers + threaded replies) for structured, readable technical dialogues.
- **Accepted Solutions & Verification**: Question authors can verify and accept definitive answers, instantly crediting reputation bounties.
- **Tiptap Rich-Text Editor**: WYSIWYG editor featuring inline syntax-highlighted code blocks (via Lowlight), rich markdown support, lists, and formatted quotes.
- **Real-Time Dynamic Feeds**: Multi-criteria filtering including *Trending*, *Top Voted*, *Unanswered*, and *Newest* with fast search query resolution and SEO-friendly slugged URLs.

### 4. 🏆 Gamification, Reputation & Badges System
- **Tiered Badge Engine**: Dynamic milestone badges categorized across **Bronze**, **Silver**, and **Gold** tiers (e.g., First Question, Solution Master, Bug Hunter).
- **Reputation Matrix**: Granular point allocations tied directly to community value (+10 per accepted answer, +5 per question upvote, +10 per answer upvote).
- **Hivemind Leaders Showcase**: Live community leaderboard highlighting top contributors, accepted answer counts, active streaks, and leaderboard rankings.

### 5. 🌌 Cyberpunk / Deep Space Glassmorphism UI
- **Canvas-Powered Dynamic Starfield**: Smooth 60 FPS background animation rendering 750 stars with multi-layer parallax depth, realistic twinkling physics, and 6 drifting nebula clouds.
- **Frosted Glassmorphism Panels**: Translucent dark surfaces with neon purple, cyan, and amber glow accents, modern micro-interactions, and responsive layout primitives.
- **Network Pulse & Telemetry**: Live metrics dashboard tracking active discussions, total community members, response times, and ecosystem statistics.

### 6. 🏷️ Taxonomy & Tagging Ecosystem
- **Thematic Color-Coded Tags**: Dedicated visual styling and meta-descriptions for technologies (e.g., Next.js, TypeScript, Rust, Docker, PostgreSQL).
- **Dedicated Tag Landing Pages**: Filter questions, track tag activity, and discover domain-specific discussions effortlessly.

### 7. 🛡️ Community Moderation & Vote Integrity
- **Review Queue**: Dedicated moderation desk to approve, reject, or flag suspicious or duplicate entries.
- **Vote Fraud Prevention**: Strict composite database constraints (`@@unique([userId, questionId])`, `@@unique([userId, answerId])`) ensuring one vote per user per entity and preventing vote manipulation.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | Next.js 16.3 (App Router), React 19.2 | High-performance React framework with Server Components & Actions |
| **Language** | TypeScript 5.x | End-to-end static typing for robust application stability |
| **Styling & Design** | TailwindCSS v4, Vanilla CSS | Next-gen CSS engine with custom glassmorphic tokens & neon palettes |
| **AI Copilot** | Google Gemini 1.5 Flash (`@google/generative-ai`) | High-speed generative AI assistance for technical troubleshooting |
| **ORM & Database** | Prisma ORM 6.19, PostgreSQL | Type-safe query building and scalable relational data storage |
| **Authentication** | Auth.js / NextAuth v5 Beta, bcryptjs | Multi-session management, password encryption, and middleware routing |
| **Rich Text Editor** | Tiptap React, Lowlight | Extensible headless rich text editor with syntax highlighting |
| **State Management** | Zustand 5.0, TanStack Query 5 | Predictable global UI state and optimistic mutation handling |
| **Visuals & Charts** | Lucide React, Recharts | Sleek vector iconography and interactive data visualizations |
| **Testing Suite** | Vitest 5.0, Testing Library | Lightning-fast unit and component test runner with JSDOM |

---

## 📁 Project Structure

```
askhive/
├── prisma/
│   ├── schema.prisma           # Relational schema (User, Question, Answer, Vote, Tag, Badge)
│   └── seed.ts                 # Database seed script with initial community data
├── public/                     # Static media, icons, and assets
├── src/
│   ├── app/
│   │   ├── (auth)/             # Authentication routes (/login, /register)
│   │   ├── api/
│   │   │   ├── auth/           # NextAuth route handlers
│   │   │   └── copilot/        # Google Gemini Copilot streaming endpoint
│   │   ├── globals.css         # Glassmorphism utilities & Tailwind v4 theme variables
│   │   ├── layout.tsx          # Root layout with Starfield Canvas background
│   │   └── page.tsx            # Community Q&A feed and navigation hub
│   ├── components/
│   │   ├── community/          # Badges, Bookmarks, Leaders, Moderator, Tags, Trending
│   │   ├── layout/             # Navigation Bar, Sidebar, Right Sidebar (Pulse)
│   │   ├── shared/             # Starfield background canvas, confirmation modals
│   │   └── ui/                 # Reusable glassmorphic atoms (Button, Badge, Card, Input)
│   ├── features/
│   │   ├── copilot/            # Gemini Copilot assistant dialog & quick prompts
│   │   └── questions/          # Question card, detail modal, rich ask-question modal
│   ├── stores/                 # Zustand state stores (UI state, modal controls)
│   └── types/                  # Global TypeScript interfaces and domain schemas
├── vitest.config.ts            # Vitest unit testing configuration
├── next.config.ts              # Next.js environment & bundler configuration
└── package.json                # Project dependencies and operational scripts
```

---

## 📦 Getting Started

### Prerequisites

Ensure you have the following installed on your local development machine:
- **Node.js**: `v18.18.0` or higher (v20+ recommended)
- **npm** or **pnpm**
- **PostgreSQL** database (Local instance, Docker, or hosted like Supabase / Neon)

### 1. Clone the Repository

```bash
git clone https://github.com/anjali-gupta16/Askhive.git
cd Askhive/askhive
```

*(Or navigate into the root directory where the project is cloned)*

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
# Database Connection (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/askhive?schema=public"

# NextAuth v5 Secret & URL
AUTH_SECRET="your_secure_random_string_here"
NEXTAUTH_URL="http://localhost:3000"

# Google Gemini AI Integration
GEMINI_API_KEY="your_google_gemini_api_key_here"
```

> [!TIP]
> You can generate a secure `AUTH_SECRET` by running: `openssl rand -base64 32`

### 4. Synchronize & Seed the Database

Push the Prisma schema to your PostgreSQL instance and seed mock questions, tags, users, and badges:

```bash
npm run db:push
npm run db:seed
```

### 5. Launch the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to experience AskHive! 🎉

---

## 🗄️ Database Architecture

AskHive utilizes a robust relational model engineered with Prisma:

```mermaid
erDiagram
    USER ||--o{ QUESTION : writes
    USER ||--o{ ANSWER : posts
    USER ||--o{ VOTE : casts
    USER ||--o{ USER_BADGE : earns
    QUESTION ||--o{ ANSWER : contains
    QUESTION ||--o{ VOTE : receives
    QUESTION ||--o{ QUESTION_TAG : categorized_by
    ANSWER ||--o{ ANSWER : replies_to
    ANSWER ||--o{ VOTE : receives
    TAG ||--o{ QUESTION_TAG : includes
    BADGE ||--o{ USER_BADGE : awarded_as

    USER {
        string id PK
        string username UK
        string email UK
        enum role
        int reputation
        boolean isGuest
    }
    QUESTION {
        string id PK
        string title
        text body
        string slug UK
        int views
        int score
    }
    ANSWER {
        string id PK
        text body
        int score
        boolean isAccepted
        boolean isAiGenerated
        string parentId FK
    }
    BADGE {
        string id PK
        string name UK
        string tier
        string criteria
        int threshold
    }
```

---

## 🧪 Testing & Quality Assurance

AskHive includes automated unit and integration tests powered by **Vitest** and **React Testing Library**:

```bash
# Run complete test suite
npm run test

# Run tests in watch mode
npm run test:watch

# Execute static linting checks
npm run lint
```

---

## 🎮 Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts local Next.js development server at `localhost:3000` |
| `npm run build` | Compiles optimized production bundle |
| `npm run start` | Boots production server |
| `npm run lint` | Runs Next.js ESLint validation |
| `npm run test` | Executes Vitest test suite |
| `npm run test:watch` | Starts Vitest interactive watch mode |
| `npm run db:push` | Synchronizes Prisma schema directly with the database |
| `npm run db:seed` | Populates database with sample developers, badges, and threads |
| `npm run db:generate` | Generates type-safe Prisma Client code |

---

## 🤝 Contributing

Contributions are what make the open-source community an inspiring place to learn, inspire, and create:

1. **Fork the Project**
2. **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your Changes** (`git commit -m 'feat: Add some AmazingFeature'`)
4. **Push to the Branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">

Crafted with 💜 by [Anjali Gupta](https://github.com/anjali-gupta16)

**[⭐ Star this repository](https://github.com/anjali-gupta16/Askhive)** if you found it inspiring!

</div>
