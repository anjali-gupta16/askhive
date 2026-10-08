import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface ChatMessage {
  role: "user" | "model" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const { prompt, history, customApiKey } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required and must be a string." },
        { status: 400 }
      );
    }

    const apiKey = customApiKey || process.env.GEMINI_API_KEY;

    if (apiKey && apiKey.trim() !== "") {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const systemInstruction =
          "You are Gemini Copilot, a friendly and helpful developer AI embedded inside AskHive (a developer Q&A community). When someone greets you, respond warmly and conversationally. When asked technical questions, provide clear, concise, actionable solutions with code examples where applicable. Format code using markdown fenced code blocks.";

        const contents = [
          { role: "user", parts: [{ text: systemInstruction }] },
          { role: "model", parts: [{ text: "Got it! I'm Gemini Copilot, ready to chat and help with your dev questions!" }] },
          ...(history || []).map((m: ChatMessage) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
          })),
          { role: "user", parts: [{ text: prompt }] },
        ];

        const result = await model.generateContent({ contents });
        const responseText = result.response.text();

        return NextResponse.json({ reply: responseText, source: "gemini-api" });
      } catch (geminiError: unknown) {
        console.warn("Live Gemini API call failed, falling back to synthesis engine:", geminiError instanceof Error ? geminiError.message : geminiError);
      }
    }

    // Fallback synthesizer
    const reply = generateSmartSynthesis(prompt);
    return NextResponse.json({ reply, source: "askhive-synthesizer" });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to process Copilot request." },
      { status: 500 }
    );
  }
}

function generateSmartSynthesis(prompt: string): string {
  const p = prompt.toLowerCase().trim();

  // ── Greetings & small talk ──
  const greetings = ["hi", "hii", "hey", "hello", "sup", "yo", "howdy", "greetings", "good morning", "good evening", "good night", "what's up"];
  if (greetings.some((g) => p === g || p.startsWith(g + " ") || p.startsWith(g + "!") || p.startsWith(g + ","))) {
    const hour = new Date().getHours();
    const timeGreeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
    return `${timeGreeting}! 👋 I'm **Gemini Copilot**, your AI dev assistant inside AskHive.\n\nI can help you with:\n- 🐛 **Debugging** — paste your error or code\n- 🏗️ **Architecture** — design patterns, state management, APIs\n- ⚡ **Performance** — optimization tips and best practices\n- 💬 **Code review** — get feedback on your implementation\n\nWhat are you working on today?`;
  }

  // ── Thanks / appreciation ──
  if (p.includes("thank") || p === "thanks" || p === "ty" || p === "thx") {
    return `You're welcome! 😊 Happy to help anytime.\n\nFeel free to ask if you have more questions — I'm always here!`;
  }

  // ── How are you / feelings ──
  if (p.includes("how are you") || p.includes("how r u") || p.includes("how do you do")) {
    return `I'm doing great, thanks for asking! 🤖✨\n\nAs an AI I don't get tired, so I'm always ready to dive into code with you. What are you building today?`;
  }

  // ── Who are you ──
  if (p.includes("who are you") || p.includes("what are you") || p.includes("what can you do")) {
    return `I'm **Gemini Copilot** 🤖 — an AI developer assistant powered by Google Gemini, embedded inside **AskHive**.\n\nI can help you:\n- Write and debug code (TypeScript, JavaScript, Rust, Python, SQL, and more)\n- Design software architecture and APIs\n- Explain complex concepts clearly\n- Draft community questions from your problem\n\nJust type your question or paste your code — I'll get right on it!`;
  }

  // ── TanStack / Optimistic UI ──
  if (p.includes("optimistic") || p.includes("tanstack") || p.includes("mutation")) {
    return `## ⚡ Optimistic UI Updates with TanStack Query

\`\`\`typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useVoteMutation(questionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (direction: 1 | -1) => {
      const res = await fetch("/api/vote", {
        method: "POST",
        body: JSON.stringify({ questionId, direction }),
      });
      if (!res.ok) throw new Error("Vote failed");
      return res.json();
    },
    onMutate: async (direction) => {
      await queryClient.cancelQueries({ queryKey: ["questions", questionId] });
      const previous = queryClient.getQueryData(["questions", questionId]);
      queryClient.setQueryData(["questions", questionId], (old: any) => ({
        ...old,
        score: (old?.score || 0) + direction,
      }));
      return { previous };
    },
    onError: (_err, _dir, context) => {
      if (context?.previous)
        queryClient.setQueryData(["questions", questionId], context.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["questions", questionId] });
    },
  });
}
\`\`\`

**Key points:**
- Cancel in-flight queries before mutating to prevent race conditions
- Always snapshot and restore previous data on error`;
  }

  // ── Rust / WASM ──
  if (p.includes("rust") || p.includes("wasm") || p.includes("webassembly")) {
    return `## 🦀 Zero-Copy WebAssembly Memory in Rust

\`\`\`rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct PixelBuffer { data: Vec<u8> }

#[wasm_bindgen]
impl PixelBuffer {
  #[wasm_bindgen(constructor)]
  pub fn new(size: usize) -> PixelBuffer {
    PixelBuffer { data: vec![0u8; size] }
  }
  pub fn as_ptr(&self) -> *const u8 { self.data.as_ptr() }
}
\`\`\`

\`\`\`javascript
const wasm = await init();
const buf = new PixelBuffer(1024 * 1024);
// Zero-copy direct view into WASM linear memory:
const view = new Uint8Array(wasm.memory.buffer, buf.as_ptr(), 1024 * 1024);
\`\`\``;
  }

  // ── Auth / JWT / NextAuth ──
  if (p.includes("auth") || p.includes("session") || p.includes("jwt") || p.includes("login") || p.includes("nextauth")) {
    return `## 🛡️ NextAuth v5 Security Setup

\`\`\`typescript
// middleware.ts
import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthRoute = req.nextUrl.pathname.startsWith("/login");
  if (isAuthRoute && isLoggedIn)
    return Response.redirect(new URL("/", req.nextUrl));
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
\`\`\`

\`\`\`typescript
// Protected Server Component
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  if (!session?.user) return <div>Unauthorized</div>;
  return <div>Welcome, {session.user.name}!</div>;
}
\`\`\``;
  }

  // ── Postgres / SQL / Database ──
  if (p.includes("postgres") || p.includes("sql") || p.includes("database") || p.includes("index")) {
    return `## 🗄️ Postgres Indexing for Time-Series Queries

For large time-series datasets, use **partial indexes + BRIN**:

\`\`\`sql
-- BRIN index (tiny, perfect for append-only time-series)
CREATE INDEX idx_events_created_brin ON events USING BRIN (created_at);

-- Partial index for common filtered queries
CREATE INDEX idx_events_recent ON events (created_at DESC)
  WHERE created_at > NOW() - INTERVAL '30 days';

-- Covering index to avoid heap access entirely
CREATE INDEX idx_events_covering ON events (user_id, created_at DESC)
  INCLUDE (event_type, payload);
\`\`\`

**Tips:**
- Use \`EXPLAIN (ANALYZE, BUFFERS)\` to verify index usage
- Partition large tables by month/year using \`PARTITION BY RANGE\``;
  }

  // ── Generic technical fallback ──
  if (p.length > 20) {
    return `I'd be happy to help with: **"${prompt.trim()}"**\n\nCould you give me a bit more detail? For example:\n- What language or framework are you using?\n- What specific error or behavior are you seeing?\n- What have you tried so far?\n\nThe more context you share, the more precise my answer can be! 🎯`;
  }

  // ── Very short / unclear input ──
  return `I'm not sure I understood that. Could you rephrase or give more details?\n\nFor example:\n- "How do I debounce a React input?"\n- "Why is my Postgres query slow?"\n- "How does JWT token refresh work?"\n\nI'm here to help! 🚀`;
}
