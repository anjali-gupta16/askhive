"use client";

import React, { useState, useMemo } from "react";
import { Flame, Sparkles, TrendingUp, Clock, Eye, MessageSquare, Zap } from "lucide-react";
import { QuestionItem } from "@/types/question";
import { QuestionCard } from "@/features/questions/components/question-card";

interface TrendingViewProps {
  questions: QuestionItem[];
  bookmarkedIds: Set<string>;
  onSelectQuestion: (question: QuestionItem) => void;
  onTagClick: (tag: string) => void;
  onVoteChange: (questionId: string, diff: number, newVote: number) => void;
  onToggleBookmark: (questionId: string) => void;
}

export function TrendingView({
  questions,
  bookmarkedIds,
  onSelectQuestion,
  onTagClick,
  onVoteChange,
  onToggleBookmark,
}: TrendingViewProps) {
  const [selectedHotTag, setSelectedHotTag] = useState<string | null>(null);

  // Trending formula: (score * 2.5) + (views * 0.05) + (answersCount * 3)
  const trendingQuestions = useMemo(() => {
    return [...questions]
      .filter((q) => {
        if (!selectedHotTag) return true;
        return q.tags.some((t) => t.name.toLowerCase() === selectedHotTag.toLowerCase());
      })
      .sort((a, b) => {
        const scoreA = a.score * 2.5 + a.views * 0.05 + a.answersCount * 3;
        const scoreB = b.score * 2.5 + b.views * 0.05 + b.answersCount * 3;
        return scoreB - scoreA;
      });
  }, [questions, selectedHotTag]);

  // Extract top tags among trending
  const trendingTags = useMemo(() => {
    const counts: Record<string, number> = {};
    questions.forEach((q) => {
      q.tags.forEach((t) => {
        counts[t.name] = (counts[t.name] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => ({ name, count }));
  }, [questions]);

  return (
    <div className="flex-1 min-w-0">
      {/* Header Banner */}
      <div className="mb-6 p-6 rounded-3xl bg-gradient-to-r from-surface-container to-surface-container-high border border-surface-container-highest relative overflow-hidden shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-tertiary/15 text-tertiary border border-tertiary/30 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                Live Surge Velocity
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-on-surface">
              Trending Technical Topics & Q&A
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1 max-w-xl">
              Discussions experiencing high developer traffic, rapid answer peer-reviews, and active AI syntheses right now.
            </p>
          </div>
        </div>
      </div>

      {/* Trending Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-tertiary/15 text-tertiary flex items-center justify-center">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-outline font-mono">Surge Velocity</div>
            <div className="text-base font-bold text-on-surface mt-0.5">+48% Today</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-outline font-mono">Active Debates</div>
            <div className="text-base font-bold text-on-surface mt-0.5">24 Solutions</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-outline font-mono">Gemini Insights</div>
            <div className="text-base font-bold text-on-surface mt-0.5">100% Realtime</div>
          </div>
        </div>
      </div>

      {/* Hot Topics Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <span className="text-xs font-mono text-outline mr-1 flex items-center gap-1">
          <Flame className="w-3.5 h-3.5 text-tertiary" />
          Hot Tags:
        </span>
        <button
          onClick={() => setSelectedHotTag(null)}
          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer ${
            selectedHotTag === null
              ? "bg-tertiary text-surface"
              : "bg-surface-container text-outline hover:text-on-surface"
          }`}
        >
          All Trending
        </button>
        {trendingTags.map((tag) => (
          <button
            key={tag.name}
            onClick={() => setSelectedHotTag(tag.name === selectedHotTag ? null : tag.name)}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer ${
              selectedHotTag === tag.name
                ? "bg-primary text-surface"
                : "bg-surface-container text-outline hover:text-on-surface"
            }`}
          >
            #{tag.name}
          </button>
        ))}
      </div>

      {/* Question Cards */}
      <div className="flex flex-col gap-4">
        {trendingQuestions.map((q, idx) => (
          <div key={q.id} className="relative">
            <div className="absolute top-3 right-4 z-10 hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary/15 text-tertiary border border-tertiary/30 text-[10px] font-mono font-bold">
              <Flame className="w-3 h-3" />
              HOT #{idx + 1}
            </div>
            <QuestionCard
              question={q}
              isBookmarked={bookmarkedIds.has(q.id)}
              onTagClick={onTagClick}
              onSelectQuestion={onSelectQuestion}
              onVoteChange={onVoteChange}
              onToggleBookmark={onToggleBookmark}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
