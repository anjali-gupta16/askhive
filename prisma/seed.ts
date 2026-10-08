import { PrismaClient, Role, VoteTarget, Badge, Tag } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting AskHive database seeding...");

  // Clean existing data in reverse dependency order
  await prisma.userBadge.deleteMany();
  await prisma.badge.deleteMany();
  await prisma.vote.deleteMany();
  await prisma.answer.deleteMany();
  await prisma.questionTag.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.question.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  console.log("🧹 Cleaned database tables.");

  // 1. Seed Badges
  const badgesData = [
    {
      name: "First Question",
      description: "Asked their first question to the hive",
      tier: "bronze",
      icon: "HelpCircle",
      criteria: "first_question",
      threshold: 1,
    },
    {
      name: "Good Answer",
      description: "Answer scored 10 or more upvotes",
      tier: "silver",
      icon: "Award",
      criteria: "answer_upvotes",
      threshold: 10,
    },
    {
      name: "Great Answer",
      description: "Answer scored 25 or more upvotes",
      tier: "gold",
      icon: "Trophy",
      criteria: "answer_upvotes",
      threshold: 25,
    },
    {
      name: "Scholar",
      description: "Accepted an answer on their own question",
      tier: "bronze",
      icon: "CheckCircle",
      criteria: "accept_answer",
      threshold: 1,
    },
    {
      name: "Civic Duty",
      description: "Voted 50 times across questions and answers",
      tier: "silver",
      icon: "ThumbsUp",
      criteria: "cast_votes",
      threshold: 50,
    },
    {
      name: "AI Collaborator",
      description: "Utilized the AI assistant to refine question or answer",
      tier: "bronze",
      icon: "Sparkles",
      criteria: "ai_generation",
      threshold: 1,
    },
  ];

  const badges: Record<string, Badge> = {};
  for (const b of badgesData) {
    badges[b.name] = await prisma.badge.create({ data: b });
  }
  console.log("🏅 Created badges.");

  // 2. Seed Users
  const passwordHash = await bcrypt.hash("password123", 10);
  const adminHash = await bcrypt.hash("admin123", 10);
  const demoHash = await bcrypt.hash("demo123", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Elena Rostova",
      username: "elena_admin",
      email: "admin@askhive.dev",
      password: adminHash,
      role: Role.ADMIN,
      reputation: 2450,
      bio: "AskHive Founder & Lead Architect. Passionate about performant developer tools.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
  });

  const expert = await prisma.user.create({
    data: {
      name: "Sarah Chen",
      username: "sarahchen",
      email: "sarah.chen@askhive.dev",
      password: passwordHash,
      role: Role.MODERATOR,
      reputation: 5120,
      bio: "Staff Distributed Systems Engineer. Rust, Go, distributed consensus & high-throughput DBs.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    },
  });

  const regularUser = await prisma.user.create({
    data: {
      name: "Marcus Vance",
      username: "marcus_v",
      email: "marcus.v@askhive.dev",
      password: passwordHash,
      role: Role.USER,
      reputation: 430,
      bio: "Full-stack developer building modern React apps, Next.js enthusiast.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
  });

  const demoUser = await prisma.user.create({
    data: {
      name: "Demo Explorer",
      username: "demo_guest",
      email: "demo@askhive.dev",
      password: demoHash,
      role: Role.USER,
      isGuest: true,
      reputation: 25,
      bio: "Guest exploration account with sandbox permissions.",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    },
  });

  console.log("👥 Created users: admin, expert, regularUser, demoUser.");

  // 3. Seed Tags
  const tagsData = [
    { name: "nextjs", description: "React framework for production with App Router and Server Components." },
    { name: "react", description: "Declarative UI library for building dynamic component trees." },
    { name: "typescript", description: "Strict syntactical superset of JavaScript adding static typing." },
    { name: "postgresql", description: "Powerful, open source object-relational database system." },
    { name: "prisma", description: "Next-generation Node.js and TypeScript ORM for databases." },
    { name: "tailwindcss", description: "Utility-first CSS framework for rapid modern UI development." },
    { name: "ai", description: "Generative AI models, prompt engineering, and LLM integrations." },
    { name: "performance", description: "Web performance optimization, SSR streaming, caching." },
    { name: "security", description: "Authentication, authorization, RBAC, and data protection." },
  ];

  const tags: Record<string, Tag> = {};
  for (const t of tagsData) {
    tags[t.name] = await prisma.tag.create({ data: t });
  }
  console.log("🏷️ Created tags.");

  // 4. Seed Questions
  const q1 = await prisma.question.create({
    data: {
      title: "How to properly stream Server Actions in Next.js 15 without blocking dynamic navigation?",
      slug: "how-to-properly-stream-server-actions-nextjs-15",
      body: `When running long-running operations inside Next.js 15 Server Actions (e.g. LLM synthesis or database pipelines), the client navigation transition currently freezes or waits for the entire action promise to resolve.

\`\`\`tsx
export async function generateReportAction(formData: FormData) {
  "use server";
  const query = formData.get("query") as string;
  // This takes ~8-12 seconds
  const result = await heavyDataAnalysisPipeline(query);
  return result;
}
\`\`\`

What is the recommended architectural pattern in Next.js 15 App Router to stream progress updates back to the UI incrementally while keeping the route transitions responsive? Should we use Route Handlers with ReadableStream, AI SDK streamText, or background jobs with polling/SSE?`,
      authorId: regularUser.id,
      score: 18,
      views: 342,
      tags: {
        create: [
          { tagId: tags["nextjs"].id },
          { tagId: tags["react"].id },
          { tagId: tags["performance"].id },
        ],
      },
    },
  });

  const q2 = await prisma.question.create({
    data: {
      title: "Optimizing PostgreSQL connection pooling with Prisma in serverless Edge runtimes",
      slug: "optimizing-postgresql-connection-pooling-prisma-edge",
      body: `We are running a high-traffic Next.js deployment. During traffic spikes, our PostgreSQL instance reaches \`max_connections = 100\` within seconds, throwing:

\`\`\`
Error: P2024: Timed out fetching a connection from the connection pool.
\`\`\`

Here is our current setup:
- PostgreSQL 16 on AWS RDS
- Prisma ORM with standard \`PrismaClient\` singleton
- Next.js serverless functions

What is the best way to handle this in production? Should we use PgBouncer, Prisma Accelerate, or configure custom pool parameters (\`connection_limit\` & \`pool_timeout\`)?`,
      authorId: admin.id,
      score: 29,
      views: 780,
      tags: {
        create: [
          { tagId: tags["postgresql"].id },
          { tagId: tags["prisma"].id },
          { tagId: tags["performance"].id },
        ],
      },
    },
  });

  const q3 = await prisma.question.create({
    data: {
      title: "Designing resilient rate limiting for Gemini/Claude LLM endpoints in public Q&A platform",
      slug: "resilient-rate-limiting-llm-endpoints",
      body: `We are integrating an AI Copilot feature into AskHive that assists users with drafting answers and reviewing questions for clarity.

How should we structure tiered rate limiting (e.g., Guest: 3 calls/day, User: 20 calls/day, Expert: 100 calls/day) to prevent API quota exhaustion and DDoS attacks while ensuring smooth developer experience?`,
      authorId: expert.id,
      score: 14,
      views: 215,
      tags: {
        create: [
          { tagId: tags["ai"].id },
          { tagId: tags["security"].id },
          { tagId: tags["nextjs"].id },
        ],
      },
    },
  });

  console.log("❓ Created sample questions.");

  // 5. Seed Answers & Acceptance
  const a1 = await prisma.answer.create({
    data: {
      body: `For streaming long-running actions in Next.js 15, **Server Actions are best suited for mutations that return standard serializable data**, whereas **streaming responses should use Route Handlers with \`ReadableStream\` or the Vercel AI SDK**.

Here is the cleanest pattern:

### 1. Route Handler with Server-Sent Events / Streaming:
\`\`\`ts
// app/api/pipeline/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { query } = await req.json();

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      for await (const chunk of runAnalysis(query)) {
        controller.enqueue(encoder.encode(\`data: \${JSON.stringify(chunk)}\\n\\n\`));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
\`\`\`

### 2. Client Consumer Hook:
Use \`fetch\` with a \`getReader()\` loop or TanStack Query mutations to consume chunks without freezing React's render thread. This leaves \`useTransition\` free for instant optimistic UI!`,
      questionId: q1.id,
      authorId: expert.id,
      score: 16,
      isAccepted: true,
    },
  });

  // Threaded reply to answer a1 (nested level 2)
  await prisma.answer.create({
    data: {
      body: `Fantastic breakdown @sarahchen! We implemented the Route Handler stream approach with \`ReadableStream\` and client response latency dropped from 8.4s blank screen to 120ms first byte chunk. Highly recommend this over raw server action waiting.`,
      questionId: q1.id,
      authorId: regularUser.id,
      parentId: a1.id,
      score: 4,
    },
  });

  // Answer for q2
  const a2 = await prisma.answer.create({
    data: {
      body: `The fundamental issue is that serverless instances each instantiate their own connection pool when cold-starting. If 50 lambdas spin up concurrently, each attempting to hold 5-10 connections, PostgreSQL reaches \`max_connections\` immediately.

Here is the production hierarchy of solutions:

1. **Connection Pooling Proxy (PgBouncer or Supabase Supavisor):**
   Place PgBouncer in **transaction mode** between your Next.js app and Postgres. This allows thousands of serverless requests to share a physical pool of ~20 Postgres backend connections.
   
2. **Prisma connection string configuration:**
\`\`\`env
DATABASE_URL="postgresql://user:pwd@pgbouncer-host:6543/askhive?pgbouncer=true&connection_limit=3"
\`\`\`

3. **Prisma Accelerate:**
   If you do not want to maintain self-hosted PgBouncer infrastructure, Prisma Accelerate provides automated global edge connection pooling and response caching with zero proxy configuration.`,
      questionId: q2.id,
      authorId: expert.id,
      score: 22,
      isAccepted: true,
    },
  });

  // Answer for q3
  await prisma.answer.create({
    data: {
      body: `To protect AI endpoints, implement a two-layer defense:
1. **Sliding window token bucket:** Enforce IP-based rate limiting on unauthenticated guests and user-ID-based tiered limits for authenticated members.
2. **Deterministic response caching:** Hash the prompt and check a quick key-value store before invoking expensive model inference.`,
      questionId: q3.id,
      authorId: admin.id,
      score: 11,
      isAccepted: false,
    },
  });

  // Upvotes
  await prisma.vote.createMany({
    data: [
      { userId: demoUser.id, questionId: q1.id, target: VoteTarget.QUESTION, value: 1 },
      { userId: demoUser.id, questionId: q3.id, target: VoteTarget.QUESTION, value: 1 },
      { userId: regularUser.id, answerId: a1.id, target: VoteTarget.ANSWER, value: 1 },
      { userId: regularUser.id, answerId: a2.id, target: VoteTarget.ANSWER, value: 1 },
    ],
  });

  console.log("💬 Created answers and votes.");

  // 6. User Badges
  await prisma.userBadge.createMany({
    data: [
      { userId: expert.id, badgeId: badges["Great Answer"].id },
      { userId: expert.id, badgeId: badges["Good Answer"].id },
      { userId: expert.id, badgeId: badges["Civic Duty"].id },
      { userId: regularUser.id, badgeId: badges["First Question"].id },
      { userId: regularUser.id, badgeId: badges["Scholar"].id },
      { userId: admin.id, badgeId: badges["AI Collaborator"].id },
      { userId: demoUser.id, badgeId: badges["First Question"].id },
    ],
  });

  console.log("✨ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
