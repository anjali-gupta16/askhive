"use client";

import React, { useState } from "react";
import {
  Users,
  Trophy,
  Medal,
  Award,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

interface LeaderUser {
  rank: number;
  id: string;
  name: string;
  username: string;
  role: "ADMIN" | "MODERATOR" | "USER";
  reputation: number;
  answersGiven: number;
  solutionsAccepted: number;
  topTags: string[];
  badgesCount: number;
}

const COMMUNITY_LEADERS: LeaderUser[] = [
  {
    rank: 1,
    id: "u-3",
    name: "Marcus Aurelius",
    username: "admin_hive",
    role: "ADMIN",
    reputation: 50200,
    answersGiven: 482,
    solutionsAccepted: 312,
    topTags: ["rust", "postgres", "docker"],
    badgesCount: 28,
  },
  {
    rank: 2,
    id: "u-1",
    name: "Alex Rivera",
    username: "alex_dev",
    role: "MODERATOR",
    reputation: 12450,
    answersGiven: 194,
    solutionsAccepted: 142,
    topTags: ["nextjs", "typescript", "react"],
    badgesCount: 19,
  },
  {
    rank: 3,
    id: "u-2",
    name: "Sarah Chen",
    username: "sarah_k",
    role: "USER",
    reputation: 4820,
    answersGiven: 88,
    solutionsAccepted: 64,
    topTags: ["tailwind", "react", "optimistic-ui"],
    badgesCount: 14,
  },
  {
    rank: 4,
    id: "u-anjali",
    name: "Anjali Gupta",
    username: "anjali_gupta",
    role: "USER",
    reputation: 1520,
    answersGiven: 34,
    solutionsAccepted: 26,
    topTags: ["typescript", "nextjs", "react"],
    badgesCount: 9,
  },
  {
    rank: 5,
    id: "u-5",
    name: "Elena Rostova",
    username: "elena_code",
    role: "USER",
    reputation: 1280,
    answersGiven: 28,
    solutionsAccepted: 19,
    topTags: ["postgres", "docker"],
    badgesCount: 7,
  },
  {
    rank: 6,
    id: "u-6",
    name: "David Kim",
    username: "dkim_dev",
    role: "USER",
    reputation: 960,
    answersGiven: 21,
    solutionsAccepted: 15,
    topTags: ["react", "tailwind"],
    badgesCount: 6,
  },
];

interface LeadersViewProps {
  onFilterAuthor?: (username: string) => void;
  onGoToFeed?: () => void;
}

export function LeadersView({ onFilterAuthor, onGoToFeed }: LeadersViewProps) {
  const [timeframe, setTimeframe] = useState<"all" | "month" | "week">("all");

  const topThree = COMMUNITY_LEADERS.slice(0, 3);
  const remaining = COMMUNITY_LEADERS.slice(3);

  const handleInspectUser = (username: string) => {
    onFilterAuthor?.(username);
    onGoToFeed?.();
  };

  return (
    <div className="flex-1 min-w-0">
      {/* Header Banner */}
      <div className="mb-6 p-6 rounded-3xl bg-gradient-to-r from-surface-container to-surface-container-high border border-surface-container-highest relative overflow-hidden shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-primary/15 text-primary border border-primary/30 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                Community Hall of Fame
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-on-surface">
              Hivemind Leaders & Top Contributors
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1 max-w-xl">
              Honoring developers whose technical insights, verified solutions, and peer guidance empower the AskHive ecosystem.
            </p>
          </div>
        </div>
      </div>

      {/* Timeframe Filter */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-container border border-surface-container-highest">
          <button
            onClick={() => setTimeframe("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              timeframe === "all"
                ? "bg-surface-container-high text-primary shadow-sm"
                : "text-outline hover:text-on-surface"
            }`}
          >
            All-Time Standings
          </button>
          <button
            onClick={() => setTimeframe("month")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              timeframe === "month"
                ? "bg-surface-container-high text-primary shadow-sm"
                : "text-outline hover:text-on-surface"
            }`}
          >
            This Month
          </button>
          <button
            onClick={() => setTimeframe("week")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              timeframe === "week"
                ? "bg-surface-container-high text-primary shadow-sm"
                : "text-outline hover:text-on-surface"
            }`}
          >
            This Week
          </button>
        </div>
      </div>

      {/* Podium Top 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {topThree.map((user) => {
          const isGold = user.rank === 1;
          const isSilver = user.rank === 2;
          const isBronze = user.rank === 3;

          return (
            <div
              key={user.id}
              onClick={() => handleInspectUser(user.username)}
              className={`relative p-5 rounded-2xl border transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md group flex flex-col justify-between ${
                isGold
                  ? "bg-gradient-to-b from-primary/10 to-surface-container-low border-primary/40 hover:border-primary"
                  : isSilver
                  ? "bg-gradient-to-b from-secondary/10 to-surface-container-low border-secondary/40 hover:border-secondary"
                  : "bg-gradient-to-b from-tertiary/10 to-surface-container-low border-tertiary/40 hover:border-tertiary"
              }`}
            >
              {/* Rank Pill */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono font-bold text-xs shadow-sm ${
                    isGold
                      ? "bg-primary text-surface"
                      : isSilver
                      ? "bg-secondary text-surface"
                      : "bg-tertiary text-surface"
                  }`}
                >
                  #{user.rank}
                </span>

                <span className="text-[11px] font-mono text-outline flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  {user.badgesCount} badges
                </span>
              </div>

              {/* User Avatar & Info */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-base text-surface shadow-md ${
                    isGold
                      ? "bg-primary"
                      : isSilver
                      ? "bg-secondary"
                      : "bg-tertiary"
                  }`}
                >
                  {user.username.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-on-surface flex items-center gap-1 text-sm group-hover:text-primary transition-colors">
                    {user.name}
                    {user.role === "ADMIN" && <ShieldCheck className="w-3.5 h-3.5 text-primary" />}
                    {user.role === "MODERATOR" && <ShieldCheck className="w-3.5 h-3.5 text-secondary" />}
                  </h3>
                  <span className="text-xs text-outline font-mono">@{user.username}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="p-3 rounded-xl bg-surface-container/60 border border-surface-container-high grid grid-cols-2 gap-2 text-center text-xs mb-3">
                <div>
                  <div className="text-[10px] text-outline uppercase font-mono">Reputation</div>
                  <div className="font-bold text-primary text-sm font-mono mt-0.5">
                    {user.reputation.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-outline uppercase font-mono">Accepted</div>
                  <div className="font-bold text-secondary text-sm font-mono mt-0.5">
                    {user.solutionsAccepted}
                  </div>
                </div>
              </div>

              {/* Tags & Action */}
              <div className="flex items-center justify-between text-xs pt-2 border-t border-surface-container-high">
                <div className="flex gap-1">
                  {user.topTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-surface-container-highest text-outline"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <span className="text-primary font-semibold flex items-center gap-0.5 text-[11px] group-hover:translate-x-1 transition-transform">
                  View <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Leaderboard Table */}
      <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container-high shadow-sm">
        <h3 className="text-sm font-bold text-on-surface mb-4">Full Leaderboard Standings</h3>
        <div className="flex flex-col gap-2">
          {remaining.map((user) => (
            <div
              key={user.id}
              onClick={() => handleInspectUser(user.username)}
              className="p-3 rounded-xl bg-surface-container/50 border border-surface-container-highest hover:bg-surface-container-high hover:border-primary/30 transition-colors flex items-center justify-between gap-3 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 text-center font-mono font-bold text-xs text-outline">
                  #{user.rank}
                </span>
                <div className="w-8 h-8 rounded-xl bg-surface-container-highest text-on-surface font-semibold text-xs flex items-center justify-center">
                  {user.username.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors flex items-center gap-1.5">
                    {user.name}
                    <span className="text-[10px] font-normal text-outline font-mono">@{user.username}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    {user.topTags.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono text-outline">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 text-xs">
                <div className="text-right">
                  <div className="font-mono font-bold text-primary">{user.reputation.toLocaleString()}</div>
                  <div className="text-[10px] font-mono text-outline">points</div>
                </div>
                <div className="text-right hidden sm:block">
                  <div className="font-mono font-semibold text-secondary">{user.solutionsAccepted}</div>
                  <div className="text-[10px] font-mono text-outline">accepted</div>
                </div>
                <ArrowRight className="w-4 h-4 text-outline group-hover:text-primary group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
