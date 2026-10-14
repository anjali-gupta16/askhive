"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { RightSidebar } from "@/components/layout/right-sidebar";
import { QuestionCard } from "@/features/questions/components/question-card";
import { AskQuestionModal } from "@/features/questions/components/ask-question-modal";
import { QuestionDetailModal } from "@/features/questions/components/question-detail-modal";
import { QuestionItem, TagItem, AnswerItem } from "@/types/question";
import {
  Sparkles,
  Flame,
  Clock,
  HelpCircle,
  CheckCircle2,
  Plus,
  Compass,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TagsView } from "@/components/community/tags-view";
import { BadgesView } from "@/components/community/badges-view";
import { LeadersView } from "@/components/community/leaders-view";
import { BookmarksView } from "@/components/community/bookmarks-view";
import { TrendingView } from "@/components/community/trending-view";
import { ModeratorView } from "@/components/community/moderator-view";
import { GeminiCopilotModal, FloatingCopilotButton } from "@/features/copilot/gemini-copilot-modal";
import { useAuthStore } from "@/stores/auth-store";
import { AuthPortal } from "@/components/auth/auth-portal";

const INITIAL_TAGS: (TagItem & { count: number })[] = [
  { id: "nextjs", name: "next.js", count: 84, color: "#c0c1ff" },
  { id: "react", name: "react", count: 142, color: "#4ae176" },
  { id: "typescript", name: "typescript", count: 98, color: "#8083ff" },
  { id: "tailwind", name: "tailwind", count: 62, color: "#ffb95f" },
  { id: "postgres", name: "postgres", count: 45, color: "#c0c1ff" },
  { id: "rust", name: "rust", count: 31, color: "#ffb4ab" },
  { id: "docker", name: "docker", count: 29, color: "#4ae176" },
  { id: "optimistic-ui", name: "optimistic-ui", count: 18, color: "#ffb95f" },
];

const INITIAL_QUESTIONS: QuestionItem[] = [
  {
    id: "q-1",
    title: "How to handle optimistic UI updates with TanStack Query and Server Actions in Next.js 15?",
    body: "I am trying to implement instant feedback on voting buttons while keeping server state consistent. Currently, when calling the Server Action via useMutation, the UI glitches before the cache invalidation triggers. What is the cleanest pattern for rolling back on server failure without causing re-render flickering?",
    slug: "optimistic-ui-tanstack-query-nextjs-15",
    views: 1240,
    score: 42,
    userVote: 1,
    hasAcceptedAnswer: true,
    hasAiAnswer: true,
    answersCount: 2,
    createdAt: "2 hours ago",
    createdAtTimestamp: Date.now() - 2 * 60 * 60 * 1000,
    author: {
      id: "u-1",
      name: "Alex Rivera",
      username: "alex_dev",
      role: "MODERATOR",
      reputation: 12450,
    },
    tags: [
      { id: "nextjs", name: "next.js" },
      { id: "typescript", name: "typescript" },
      { id: "optimistic-ui", name: "optimistic-ui" },
    ],
    answers: [
      {
        id: "ans-101",
        body: `The best pattern in TanStack Query v5 is to cancel outgoing refetches in \`onMutate\`, capture snapshot context, and update the cache optimistically:

\`\`\`typescript
const mutation = useMutation({
  mutationFn: voteServerAction,
  onMutate: async (newVote) => {
    await queryClient.cancelQueries({ queryKey: ['votes', id] });
    const previous = queryClient.getQueryData(['votes', id]);
    queryClient.setQueryData(['votes', id], (old) => ({
      ...old,
      score: old.score + newVote.diff,
      userVote: newVote.direction
    }));
    return { previous };
  },
  onError: (err, newVote, context) => {
    queryClient.setQueryData(['votes', id], context.previous);
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['votes', id] });
  },
});
\`\`\`
This gives guaranteed zero-latency tactile response with solid rollback on network blip!`,
        score: 38,
        isAccepted: true,
        isAiGenerated: false,
        createdAt: "1 hour ago",
        author: {
          id: "u-2",
          name: "Sarah Chen",
          username: "sarah_k",
          role: "USER",
          reputation: 4820,
        },
      },
      {
        id: "ans-102",
        body: `🤖 **Gemini AI Synthesis:**
Key consideration for Next.js App Router:
Ensure you do not call \`revalidatePath\` inside a tight client loop when mutating state. Use client-side TanStack cache for instantaneous UI paint, and let the server mutation run asynchronously in the background. Return the validated record from the Server Action to eliminate second round-trip refetches.`,
        score: 14,
        isAccepted: false,
        isAiGenerated: true,
        createdAt: "1 hour ago",
        author: {
          id: "u-ai",
          name: "Gemini Copilot",
          username: "gemini_bot",
          role: "ADMIN",
          reputation: 99999,
        },
      },
    ],
  },
  {
    id: "q-2",
    title: "Tailwind CSS v4 @theme inline configuration vs legacy tailwind.config.js",
    body: "We just upgraded our project to Tailwind v4. The @theme inline directive works great for design tokens, but how do we configure custom font family variables (e.g. Inter and JetBrains Mono) without breaking CSS specificity when using @import 'tailwindcss'?",
    slug: "tailwind-v4-theme-inline-config",
    views: 890,
    score: 27,
    userVote: 0,
    hasAcceptedAnswer: true,
    hasAiAnswer: false,
    answersCount: 1,
    createdAt: "4 hours ago",
    createdAtTimestamp: Date.now() - 4 * 60 * 60 * 1000,
    author: {
      id: "u-2",
      name: "Sarah Chen",
      username: "sarah_k",
      role: "USER",
      reputation: 4820,
    },
    tags: [
      { id: "tailwind", name: "tailwind" },
      { id: "nextjs", name: "next.js" },
    ],
    answers: [
      {
        id: "ans-201",
        body: `In Tailwind v4, pass your CSS variables right inside \`@theme inline\`:

\`\`\`css
@import "tailwindcss";

@theme inline {
  --font-sans: var(--font-inter), ui-sans-serif, system-ui;
  --font-mono: var(--font-mono), ui-monospace, monospace;
}
\`\`\`
Then attach \`next/font\` variables to the \`<html>\` or \`<body>\` tag. No need for a \`tailwind.config.ts\` file anymore!`,
        score: 19,
        isAccepted: true,
        isAiGenerated: false,
        createdAt: "3 hours ago",
        author: {
          id: "u-3",
          name: "Marcus Aurelius",
          username: "admin_hive",
          role: "ADMIN",
          reputation: 50200,
        },
      },
    ],
  },
  {
    id: "q-3",
    title: "Best practices for schema migrations with Prisma in zero-downtime environments?",
    body: "When migrating PostgreSQL schemas with millions of records in production, running `prisma migrate deploy` directly in CI/CD pipeline can lock tables. What multi-stage column expansion and contract strategy works best alongside Prisma Client generation?",
    slug: "prisma-schema-migrations-zero-downtime",
    views: 650,
    score: 18,
    userVote: 0,
    hasAcceptedAnswer: false,
    hasAiAnswer: true,
    answersCount: 1,
    createdAt: "6 hours ago",
    createdAtTimestamp: Date.now() - 6 * 60 * 60 * 1000,
    author: {
      id: "u-3",
      name: "Marcus Aurelius",
      username: "admin_hive",
      role: "ADMIN",
      reputation: 50200,
    },
    tags: [
      { id: "postgres", name: "postgres" },
      { id: "docker", name: "docker" },
    ],
    answers: [
      {
        id: "ans-301",
        body: `🤖 **Gemini AI Synthesis:**
For zero-downtime migrations with Prisma:
1. **Expand**: Add the new column as nullable. Deploy application code that writes to both old and new columns.
2. **Backfill**: Run background task batch-updating historical rows without locking the table.
3. **Contract**: Switch reads to the new column, and mark old column deprecated before dropping in a future migration.
Avoid \`DEFAULT\` values on massive existing tables on older Postgres engines.`,
        score: 12,
        isAccepted: false,
        isAiGenerated: true,
        createdAt: "5 hours ago",
        author: {
          id: "u-ai",
          name: "Gemini Copilot",
          username: "gemini_bot",
          role: "ADMIN",
          reputation: 99999,
        },
      },
    ],
  },
  {
    id: "q-4",
    title: "Why is my Tiptap rich-text editor losing focus when re-rendering parent components?",
    body: "I wrapped Tiptap's EditorContent inside a stateful modal. Whenever typing triggers character counter state in the modal wrapper, the cursor resets to index 0 or loses focus completely. Has anyone isolated the unmount issue when passing extensions?",
    slug: "tiptap-editor-losing-focus-re-render",
    views: 410,
    score: 12,
    userVote: 0,
    hasAcceptedAnswer: false,
    hasAiAnswer: true,
    answersCount: 1,
    createdAt: "12 hours ago",
    createdAtTimestamp: Date.now() - 12 * 60 * 60 * 1000,
    author: {
      id: "u-4",
      name: "Guest Explorer",
      username: "guest_user",
      role: "USER",
      reputation: 150,
    },
    tags: [
      { id: "react", name: "react" },
      { id: "typescript", name: "typescript" },
    ],
    answers: [
      {
        id: "ans-401",
        body: `🤖 **Gemini AI Synthesis:**
The most common cause is defining the \`extensions\` array inline inside the component render function:
\`\`\`typescript
// ❌ WRONG: causes re-instantiation on every render
const editor = useEditor({ extensions: [StarterKit] });

// ✅ CORRECT: memoize or declare outside component
const extensions = [StarterKit];
function MyEditor() {
  const editor = useEditor({ extensions });
}
\`\`\`
When extensions are recreated, ProseMirror destroys the document view and rebuilds it, losing DOM selection.`,
        score: 9,
        isAccepted: false,
        isAiGenerated: true,
        createdAt: "11 hours ago",
        author: {
          id: "u-ai",
          name: "Gemini Copilot",
          username: "gemini_bot",
          role: "ADMIN",
          reputation: 99999,
        },
      },
    ],
  },
  {
    id: "q-5",
    title: "Understanding Rust ownership & borrowing patterns in WebAssembly interop with JS memory",
    body: "Working on high-performance vector calculations in Rust compiled to wasm32-unknown-unknown. Passing large TypedArrays back and forth across the JS boundary creates high GC overhead. What is the recommended zero-copy buffer sharing idiom with wasm-bindgen?",
    slug: "rust-ownership-wasm-memory-interop",
    views: 320,
    score: 9,
    userVote: 0,
    hasAcceptedAnswer: false,
    hasAiAnswer: false,
    answersCount: 0,
    createdAt: "1 day ago",
    createdAtTimestamp: Date.now() - 24 * 60 * 60 * 1000,
    author: {
      id: "u-2",
      name: "Sarah Chen",
      username: "sarah_k",
      role: "USER",
      reputation: 4820,
    },
    tags: [{ id: "rust", name: "rust" }],
    answers: [],
  },
];

export type FilterTab = "newest" | "top" | "unanswered" | "ai" | "solved";

export default function Home() {
  const [questions, setQuestions] = useState<QuestionItem[]>(INITIAL_QUESTIONS);
  const [tags] = useState(INITIAL_TAGS);
  const [activeTab, setActiveTab] = useState<FilterTab>("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sidebarTab, setSidebarTab] = useState("feed");
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set(["q-1"]));
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [draftData, setDraftData] = useState<{ title: string; body: string; tags: string } | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionItem | null>(null);
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  const { user: currentUser, isAuthenticated } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const bookmarkedQuestions = useMemo(() => {
    return questions.filter((q) => bookmarkedIds.has(q.id));
  }, [questions, bookmarkedIds]);

  // Compute live counts for each filter tab so users can see all tabs active with real badges
  const counts = useMemo(() => {
    return {
      newest: questions.length,
      top: questions.length,
      unanswered: questions.filter((q) => q.answersCount === 0).length,
      ai: questions.filter((q) => q.hasAiAnswer).length,
      solved: questions.filter((q) => q.hasAcceptedAnswer).length,
    };
  }, [questions]);

  // Filter and sort questions dynamically
  const filteredQuestions = useMemo(() => {
    return questions
      .filter((q) => {
        // Tag filter
        if (selectedTag && !q.tags.some((t) => t.name.toLowerCase() === selectedTag.toLowerCase())) {
          return false;
        }
        // Search query filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchTitle = q.title.toLowerCase().includes(query);
          const matchBody = q.body.toLowerCase().includes(query);
          const matchTag = q.tags.some((t) => t.name.toLowerCase().includes(query));
          const matchAuthor = q.author.username.toLowerCase().includes(query);
          if (!matchTitle && !matchBody && !matchTag && !matchAuthor) return false;
        }
        // Tab filters
        if (activeTab === "unanswered") return q.answersCount === 0;
        if (activeTab === "ai") return q.hasAiAnswer;
        if (activeTab === "solved") return q.hasAcceptedAnswer;
        return true;
      })
      .sort((a, b) => {
        if (activeTab === "top") return b.score - a.score;
        if (activeTab === "newest") return b.createdAtTimestamp - a.createdAtTimestamp;
        return 0;
      });
  }, [questions, selectedTag, searchQuery, activeTab]);

  const handleCreateQuestion = (newQ: { title: string; body: string; tags: TagItem[] }) => {
    const created: QuestionItem = {
      id: `q-${Date.now()}`,
      title: newQ.title,
      body: newQ.body,
      slug: newQ.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      views: 1,
      score: 1,
      userVote: 1,
      hasAcceptedAnswer: false,
      hasAiAnswer: false,
      answersCount: 0,
      createdAt: "Just now",
      createdAtTimestamp: Date.now(),
      author: {
        id: currentUser?.id || "u-anjali",
        name: currentUser?.name || "Anjali Gupta",
        username: currentUser?.username || "anjali_gupta",
        role: currentUser?.role || "USER",
        reputation: currentUser?.reputation || 1520,
      },
      tags: newQ.tags,
      answers: [],
    };
    setQuestions([created, ...questions]);
    setActiveTab("newest");
    setSelectedTag(null);
  };

  const handleVoteChange = (questionId: string, diff: number, newVote: number) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            score: q.score + diff,
            userVote: newVote,
          };
        }
        return q;
      })
    );
    if (selectedQuestion && selectedQuestion.id === questionId) {
      setSelectedQuestion((prev) =>
        prev
          ? {
              ...prev,
              score: prev.score + diff,
              userVote: newVote,
            }
          : null
      );
    }
  };

  const handleAcceptAnswer = (questionId: string, answerId: string) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId) {
          const updatedAnswers = q.answers.map((a) => ({
            ...a,
            isAccepted: a.id === answerId,
          }));
          return {
            ...q,
            hasAcceptedAnswer: true,
            answers: updatedAnswers,
          };
        }
        return q;
      })
    );

    if (selectedQuestion && selectedQuestion.id === questionId) {
      setSelectedQuestion((prev) =>
        prev
          ? {
              ...prev,
              hasAcceptedAnswer: true,
              answers: prev.answers.map((a) => ({
                ...a,
                isAccepted: a.id === answerId,
              })),
            }
          : null
      );
    }
  };

  const handleAddAnswer = (questionId: string, answerText: string) => {
    const newAnswer: AnswerItem = {
      id: `ans-${Date.now()}`,
      body: answerText,
      score: 1,
      isAccepted: false,
      isAiGenerated: false,
      createdAt: "Just now",
      author: {
        id: currentUser?.id || "u-anjali",
        name: currentUser?.name || "Anjali Gupta",
        username: currentUser?.username || "anjali_gupta",
        role: currentUser?.role || "USER",
        reputation: (currentUser?.reputation || 1520) + 15,
      },
    };

    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId) {
          const updatedAnswers = [...q.answers, newAnswer];
          return {
            ...q,
            answers: updatedAnswers,
            answersCount: updatedAnswers.length,
          };
        }
        return q;
      })
    );

    if (selectedQuestion && selectedQuestion.id === questionId) {
      setSelectedQuestion((prev) =>
        prev
          ? {
              ...prev,
              answers: [...prev.answers, newAnswer],
              answersCount: prev.answers.length + 1,
            }
          : null
      );
    }
  };

  const handleGenerateAiAnswer = (questionId: string) => {
    setIsAiGenerating(true);
    setTimeout(() => {
      const aiAnswer: AnswerItem = {
        id: `ans-ai-${Date.now()}`,
        body: `🤖 **Gemini AI Synthesis:**
Based on the code pattern and official documentation:
You can eliminate memory copy overhead by exporting the WebAssembly linear memory buffer directly to a JavaScript TypedArray using \`wasm_bindgen::memory()\`. Keep the pointer pinned in Rust during mutation to ensure zero data cloning across the boundaries.`,
        score: 5,
        isAccepted: false,
        isAiGenerated: true,
        createdAt: "Just now",
        author: {
          id: "u-ai",
          name: "Gemini Copilot",
          username: "gemini_bot",
          role: "ADMIN",
          reputation: 99999,
        },
      };

      setQuestions((prev) =>
        prev.map((q) => {
          if (q.id === questionId) {
            const updatedAnswers = [aiAnswer, ...q.answers];
            return {
              ...q,
              hasAiAnswer: true,
              answers: updatedAnswers,
              answersCount: updatedAnswers.length,
            };
          }
          return q;
        })
      );

      if (selectedQuestion && selectedQuestion.id === questionId) {
        setSelectedQuestion((prev) =>
          prev
            ? {
                ...prev,
                hasAiAnswer: true,
                answers: [aiAnswer, ...prev.answers],
                answersCount: prev.answers.length + 1,
              }
            : null
        );
      }
      setIsAiGenerating(false);
    }, 1000);
  };

  if (!isMounted || !isAuthenticated || !currentUser) {
    return <AuthPortal defaultMode="register" />;
  }

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-sans">
      {/* Top Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenAskModal={() => setIsAskModalOpen(true)}
      />

      {/* Main Container */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 flex gap-6">
        {/* Left Sidebar */}
        <Sidebar
          currentTab={sidebarTab}
          onSelectTab={(tab) => {
            setSidebarTab(tab);
            if (tab === "feed") setActiveTab("newest");
          }}
          onOpenCopilot={() => setIsCopilotOpen(true)}
        />

        {/* Center Community Feed / Dynamic View */}
        {sidebarTab === "feed" && (
          <main className="flex-1 min-w-0">
            {/* Feed Title & Hero Banner */}
            <div className="mb-6 p-6 rounded-3xl bg-gradient-to-r from-surface-container to-surface-container-high border border-surface-container-highest relative overflow-hidden shadow-lg">
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-primary/10 to-transparent pointer-events-none" />
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-primary/15 text-primary border border-primary/30 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Stack Overflow + Discourse + AI
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-on-surface">
                    Community Discussions & Q&A
                  </h1>
                  <p className="text-xs sm:text-sm text-on-surface-variant mt-1 max-w-xl">
                    Explore verified developer solutions, peer discussions, and Gemini-synthesized insights.
                  </p>
                </div>

                <Button
                  onClick={() => setIsAskModalOpen(true)}
                  className="self-start sm:self-auto flex items-center gap-2 bg-gradient-to-r from-primary to-primary-container text-surface hover:brightness-110 font-bold shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  Ask Question
                </Button>
              </div>
            </div>

            {/* ALL FILTER TABS ACTIVATED WITH LIVE COUNTS AND DYNAMIC STYLES */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-surface-container-high">
              <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-surface-container-low border border-surface-container-highest shadow-inner">
                {/* 1. Newest Tab */}
                <button
                  onClick={() => setActiveTab("newest")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    activeTab === "newest"
                      ? "bg-surface-container-highest text-primary border border-primary/30 shadow-md glow-primary"
                      : "text-outline hover:text-on-surface hover:bg-surface-container"
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>Newest</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      activeTab === "newest"
                        ? "bg-primary text-surface font-bold"
                        : "bg-surface-container text-outline"
                    }`}
                  >
                    {counts.newest}
                  </span>
                </button>

                {/* 2. Top Voted Tab */}
                <button
                  onClick={() => setActiveTab("top")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    activeTab === "top"
                      ? "bg-tertiary/20 text-tertiary border border-tertiary/40 shadow-md"
                      : "text-outline hover:text-tertiary hover:bg-surface-container"
                  }`}
                >
                  <Flame className="w-4 h-4 text-tertiary" />
                  <span>Top Voted</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      activeTab === "top"
                        ? "bg-tertiary text-surface font-bold"
                        : "bg-surface-container text-outline"
                    }`}
                  >
                    {counts.top}
                  </span>
                </button>

                {/* 3. Unanswered Tab */}
                <button
                  onClick={() => setActiveTab("unanswered")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    activeTab === "unanswered"
                      ? "bg-error/20 text-error border border-error/40 shadow-md"
                      : "text-outline hover:text-error hover:bg-surface-container"
                  }`}
                >
                  <HelpCircle className="w-4 h-4 text-error" />
                  <span>Unanswered</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      activeTab === "unanswered"
                        ? "bg-error text-surface font-bold"
                        : "bg-surface-container text-outline"
                    }`}
                  >
                    {counts.unanswered}
                  </span>
                </button>

                {/* 4. AI Answered Tab */}
                <button
                  onClick={() => setActiveTab("ai")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    activeTab === "ai"
                      ? "bg-primary/25 text-primary border border-primary/40 shadow-md glow-primary"
                      : "text-outline hover:text-primary hover:bg-surface-container"
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>AI Answered</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      activeTab === "ai"
                        ? "bg-primary text-surface font-bold"
                        : "bg-surface-container text-outline"
                    }`}
                  >
                    {counts.ai}
                  </span>
                </button>

                {/* 5. Solved Tab */}
                <button
                  onClick={() => setActiveTab("solved")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    activeTab === "solved"
                      ? "bg-secondary/20 text-secondary border border-secondary/40 shadow-md glow-secondary"
                      : "text-outline hover:text-secondary hover:bg-surface-container"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-secondary" />
                  <span>Solved</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      activeTab === "solved"
                        ? "bg-secondary text-surface font-bold"
                        : "bg-surface-container text-outline"
                    }`}
                  >
                    {counts.solved}
                  </span>
                </button>
              </div>

              {/* Active Tag or reset */}
              {selectedTag && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-outline font-mono">Filtered by:</span>
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md bg-primary text-surface flex items-center gap-1">
                    #{selectedTag}
                    <button
                      onClick={() => setSelectedTag(null)}
                      className="hover:opacity-75 font-bold ml-1 cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                </div>
              )}
            </div>

            {/* Tab Information Banner */}
            <div className="mb-4 text-xs font-mono text-outline flex items-center justify-between">
              <span>
                Showing{" "}
                <strong className="text-on-surface">{filteredQuestions.length}</strong>{" "}
                {filteredQuestions.length === 1 ? "question" : "questions"} in{" "}
                <span className="text-primary font-bold">
                  {activeTab === "newest" && "Newest Activity"}
                  {activeTab === "top" && "Top Community Votes"}
                  {activeTab === "unanswered" && "Unanswered Queue (Needs Help)"}
                  {activeTab === "ai" && "Gemini AI Synthesized"}
                  {activeTab === "solved" && "Accepted Solutions"}
                </span>
              </span>
              <span className="text-[11px]">Click any card to inspect solutions or post answers</span>
            </div>

            {/* Question List */}
            <div className="flex flex-col gap-4">
              {filteredQuestions.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-surface-container-low border border-surface-container-high flex flex-col items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-outline">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-on-surface">No questions in this filter</h3>
                  <p className="text-xs text-outline max-w-sm">
                    There are currently no questions under this criteria. You can ask a new question or change your filter.
                  </p>
                  <Button
                    onClick={() => setIsAskModalOpen(true)}
                    variant="primary"
                    size="sm"
                    className="mt-2"
                  >
                    Ask a Question
                  </Button>
                </div>
              ) : (
                filteredQuestions.map((q) => (
                  <QuestionCard
                    key={q.id}
                    question={q}
                    isBookmarked={bookmarkedIds.has(q.id)}
                    onTagClick={(tag) => setSelectedTag(tag)}
                    onSelectQuestion={(selected) => setSelectedQuestion(selected)}
                    onVoteChange={handleVoteChange}
                    onToggleBookmark={handleToggleBookmark}
                  />
                ))
              )}
            </div>
          </main>
        )}

        {/* 2. Trending Topics View */}
        {sidebarTab === "popular" && (
          <TrendingView
            questions={questions}
            bookmarkedIds={bookmarkedIds}
            onSelectQuestion={(selected) => setSelectedQuestion(selected)}
            onTagClick={(tag) => {
              setSelectedTag(tag);
              setSidebarTab("feed");
            }}
            onVoteChange={handleVoteChange}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {/* 3. Explore Tags View */}
        {sidebarTab === "tags" && (
          <TagsView
            tags={tags}
            onSelectTag={(tag) => {
              setSelectedTag(tag);
            }}
            onGoToFeed={() => setSidebarTab("feed")}
          />
        )}

        {/* 4. Badges & Rep View */}
        {sidebarTab === "badges" && <BadgesView />}

        {/* 5. Hivemind Leaders View */}
        {sidebarTab === "users" && (
          <LeadersView
            onFilterAuthor={(username) => {
              setSearchQuery(username);
            }}
            onGoToFeed={() => setSidebarTab("feed")}
          />
        )}

        {/* 6. Bookmarks View */}
        {sidebarTab === "saved" && (
          <BookmarksView
            bookmarkedQuestions={bookmarkedQuestions}
            onSelectQuestion={(selected) => setSelectedQuestion(selected)}
            onTagClick={(tag) => {
              setSelectedTag(tag);
              setSidebarTab("feed");
            }}
            onVoteChange={handleVoteChange}
            onToggleBookmark={handleToggleBookmark}
            onGoToFeed={() => setSidebarTab("feed")}
          />
        )}

        {/* 7. Moderator Queue View */}
        {sidebarTab === "mod-panel" && <ModeratorView />}

        {/* Right Sidebar */}
        <RightSidebar
          selectedTag={selectedTag}
          onSelectTag={setSelectedTag}
          tags={tags}
        />
      </div>

      {/* Ask Question Modal */}
      <AskQuestionModal
        isOpen={isAskModalOpen}
        onClose={() => {
          setIsAskModalOpen(false);
          setDraftData(null);
        }}
        onSubmit={handleCreateQuestion}
        initialTitle={draftData?.title || ""}
        initialBody={draftData?.body || ""}
        initialTags={draftData?.tags || ""}
      />

      {/* Gemini Copilot Modal */}
      <GeminiCopilotModal
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        onDraftQuestion={(draft) => {
          setDraftData({
            title: draft.title,
            body: draft.body,
            tags: draft.tags.join(", "),
          });
          setIsAskModalOpen(true);
        }}
      />

      {/* Floating Copilot Access Button — always visible */}
      <FloatingCopilotButton
        onClick={() => setIsCopilotOpen(true)}
        isOpen={isCopilotOpen}
      />

      {/* Full Question & Answers Thread Modal */}
      <QuestionDetailModal
        question={selectedQuestion}
        isOpen={!!selectedQuestion}
        onClose={() => setSelectedQuestion(null)}
        onVoteQuestion={(qId, dir) => handleVoteChange(qId, dir, dir)}
        onAcceptAnswer={handleAcceptAnswer}
        onAddAnswer={handleAddAnswer}
        onGenerateAiAnswer={handleGenerateAiAnswer}
        isAiGenerating={isAiGenerating}
      />
    </div>
  );
}
