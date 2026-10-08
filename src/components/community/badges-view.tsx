"use client";

import React, { useState } from "react";
import {
  Award,
  Sparkles,
  Trophy,
  CheckCircle2,
  Lock,
  Unlock,
  Shield,
  Zap,
  Star,
  Users,
  MessageSquare,
  Flame,
  Check,
} from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";

interface BadgeItem {
  id: string;
  name: string;
  category: "gold" | "silver" | "bronze";
  description: string;
  earned: boolean;
  earnedDate?: string;
  progress?: { current: number; total: number };
  icon: string;
}

const BADGES_LIST: BadgeItem[] = [
  // Gold Badges
  {
    id: "b-gold-1",
    name: "Gemini Pioneer",
    category: "gold",
    description: "Accepted or verified an AI-synthesized solution that resolved an ambiguous architecture bug.",
    earned: true,
    earnedDate: "2 weeks ago",
    icon: "🌟",
  },
  {
    id: "b-gold-2",
    name: "Hivemind Pillar",
    category: "gold",
    description: "Authored an answer that achieved 25+ community upvotes and accepted status.",
    earned: true,
    earnedDate: "1 month ago",
    icon: "👑",
  },
  {
    id: "b-gold-3",
    name: "Grandmaster",
    category: "gold",
    description: "Accumulate 10,000+ total reputation points across multiple technology domains.",
    earned: false,
    progress: { current: 1520, total: 10000 },
    icon: "⚡",
  },
  // Silver Badges
  {
    id: "b-silver-1",
    name: "Problem Solver",
    category: "silver",
    description: "Have 10 answers officially marked as accepted answers by question authors.",
    earned: true,
    earnedDate: "Last week",
    icon: "🎯",
  },
  {
    id: "b-silver-2",
    name: "Guru",
    category: "silver",
    description: "Answer a question and receive an upvote score of 10 or higher.",
    earned: true,
    earnedDate: "3 weeks ago",
    icon: "💡",
  },
  {
    id: "b-silver-3",
    name: "Top Contributor",
    category: "silver",
    description: "Post 20 high-quality answers in a single calendar month.",
    earned: false,
    progress: { current: 12, total: 20 },
    icon: "🚀",
  },
  // Bronze Badges
  {
    id: "b-bronze-1",
    name: "Scholar",
    category: "bronze",
    description: "First answer marked as accepted by a fellow developer in the community.",
    earned: true,
    earnedDate: "2 months ago",
    icon: "📜",
  },
  {
    id: "b-bronze-2",
    name: "Conversation Starter",
    category: "bronze",
    description: "Ask 3 questions that each receive positive community feedback.",
    earned: true,
    earnedDate: "1 month ago",
    icon: "💬",
  },
  {
    id: "b-bronze-3",
    name: "Curator",
    category: "bronze",
    description: "Cast 50 thoughtful upvotes on helpful questions and constructive answers.",
    earned: true,
    earnedDate: "3 days ago",
    icon: "🔍",
  },
  {
    id: "b-bronze-4",
    name: "Bug Hunter",
    category: "bronze",
    description: "Submit a question with reproducible code snippets identifying an upstream library flaw.",
    earned: false,
    progress: { current: 2, total: 3 },
    icon: "🐞",
  },
];

const REPUTATION_PRIVILEGES = [
  { rep: 15, title: "Upvote questions & answers", unlocked: true },
  { rep: 50, title: "Leave comments on any post", unlocked: true },
  { rep: 100, title: "Cast downvotes & edit wiki excerpts", unlocked: true },
  { rep: 500, title: "Access community review queue & flag posts", unlocked: true },
  { rep: 1000, title: "Create new community tags without moderator approval", unlocked: true },
  { rep: 2500, title: "Access moderator dashboard & pin important topics", unlocked: false },
  { rep: 5000, title: "Approve AI-generated answer summaries sitewide", unlocked: false },
];

export function BadgesView() {
  const { user } = useAuthStore();
  const [activeFilter, setActiveFilter] = useState<"all" | "gold" | "silver" | "bronze">("all");

  const userRep = user?.reputation || 1520;
  const userName = user?.name || "Anjali Gupta";

  const earnedCount = BADGES_LIST.filter((b) => b.earned).length;

  const filteredBadges = BADGES_LIST.filter((b) => {
    if (activeFilter === "all") return true;
    return b.category === activeFilter;
  });

  return (
    <div className="flex-1 min-w-0">
      {/* Header Banner */}
      <div className="mb-6 p-6 rounded-3xl bg-gradient-to-r from-surface-container to-surface-container-high border border-surface-container-highest relative overflow-hidden shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-primary/15 text-primary border border-primary/30 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-secondary" />
                Reputation & Achievements
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-on-surface">
              Badges & Reputation Milestones
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1 max-w-xl">
              Earn reputation when your questions or answers are upvoted. Unlock platform privileges and collect distinctive badges.
            </p>
          </div>
        </div>
      </div>

      {/* User Progress Card */}
      <div className="mb-6 p-5 rounded-2xl bg-surface-container-low border border-surface-container-high flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-container text-surface flex items-center justify-center font-extrabold text-lg shadow-md">
            {userName.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-on-surface">{userName}</h2>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-secondary/15 text-secondary border border-secondary/30">
                Level 4 Architect
              </span>
            </div>
            <p className="text-xs text-outline font-mono mt-0.5">
              Current Balance: <strong className="text-primary font-bold">{userRep.toLocaleString()}</strong> Reputation Points
            </p>
          </div>
        </div>

        {/* Progress towards Next Tier */}
        <div className="flex-1 max-w-md">
          <div className="flex justify-between items-center text-xs mb-1.5 font-mono">
            <span className="text-outline">Next Tier: Gold Master (2,500 rep)</span>
            <span className="text-primary font-bold">{Math.round((userRep / 2500) * 100)}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.round((userRep / 2500) * 100))}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-outline font-mono mt-1">
            <span>{userRep} pts</span>
            <span>{Math.max(0, 2500 - userRep)} pts remaining</span>
          </div>
        </div>
      </div>

      {/* Privileges Unlock Ladder */}
      <div className="mb-8 p-5 rounded-2xl bg-surface-container-low border border-surface-container-high">
        <h3 className="text-sm font-bold text-on-surface mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-secondary" />
          Reputation Privileges Tree
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {REPUTATION_PRIVILEGES.map((priv) => {
            const isUnlocked = userRep >= priv.rep;
            return (
              <div
                key={priv.rep}
                className={`p-3 rounded-xl border flex items-start gap-2.5 transition-colors ${
                  isUnlocked
                    ? "bg-surface-container/60 border-secondary/30 text-on-surface"
                    : "bg-surface-container-low/50 border-surface-container-highest text-outline"
                }`}
              >
                {isUnlocked ? (
                  <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                ) : (
                  <Lock className="w-4 h-4 text-outline flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="text-xs font-semibold">{priv.title}</div>
                  <div className="text-[10px] font-mono mt-0.5">
                    {priv.rep.toLocaleString()} rep {isUnlocked ? "(Unlocked)" : "(Locked)"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges Filter Bar */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-surface-container-high">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
              activeFilter === "all"
                ? "bg-surface-container-high text-primary shadow-sm"
                : "text-outline hover:text-on-surface"
            }`}
          >
            All Badges ({BADGES_LIST.length})
          </button>
          <button
            onClick={() => setActiveFilter("gold")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
              activeFilter === "gold"
                ? "bg-primary/20 text-primary shadow-sm"
                : "text-outline hover:text-primary"
            }`}
          >
            Gold
          </button>
          <button
            onClick={() => setActiveFilter("silver")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
              activeFilter === "silver"
                ? "bg-secondary/20 text-secondary shadow-sm"
                : "text-outline hover:text-secondary"
            }`}
          >
            Silver
          </button>
          <button
            onClick={() => setActiveFilter("bronze")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
              activeFilter === "bronze"
                ? "bg-tertiary/20 text-tertiary shadow-sm"
                : "text-outline hover:text-tertiary"
            }`}
          >
            Bronze
          </button>
        </div>

        <div className="text-xs font-mono text-outline">
          Earned: <strong className="text-secondary">{earnedCount}</strong> of {BADGES_LIST.length}
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBadges.map((badge) => (
          <div
            key={badge.id}
            className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
              badge.earned
                ? "bg-surface-container-low border-surface-container-high hover:border-primary/40 shadow-sm"
                : "bg-surface-container-low/40 border-surface-container-highest/60 opacity-80"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{badge.icon}</span>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface">{badge.name}</h4>
                    <span
                      className={`text-[10px] font-mono uppercase font-bold ${
                        badge.category === "gold"
                          ? "text-primary"
                          : badge.category === "silver"
                          ? "text-secondary"
                          : "text-tertiary"
                      }`}
                    >
                      {badge.category} tier
                    </span>
                  </div>
                </div>

                {badge.earned ? (
                  <span className="p-1 rounded-full bg-secondary/15 text-secondary border border-secondary/30">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                ) : (
                  <span className="p-1 rounded-full bg-surface-container text-outline">
                    <Lock className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>

              <p className="text-xs text-on-surface-variant leading-relaxed mb-3">
                {badge.description}
              </p>
            </div>

            <div className="pt-2 border-t border-surface-container-high text-[11px] font-mono">
              {badge.earned ? (
                <span className="text-secondary flex items-center gap-1 font-semibold">
                  <Sparkles className="w-3 h-3" />
                  Unlocked {badge.earnedDate}
                </span>
              ) : badge.progress ? (
                <div>
                  <div className="flex justify-between text-outline mb-1">
                    <span>In Progress</span>
                    <span>
                      {badge.progress.current} / {badge.progress.total}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{
                        width: `${(badge.progress.current / badge.progress.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ) : (
                <span className="text-outline">Locked</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
