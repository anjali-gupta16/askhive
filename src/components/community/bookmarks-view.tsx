"use client";

import React from "react";
import { Bookmark, Sparkles, Compass, ArrowRight } from "lucide-react";
import { QuestionItem } from "@/types/question";
import { QuestionCard } from "@/features/questions/components/question-card";
import { Button } from "@/components/ui/button";

interface BookmarksViewProps {
  bookmarkedQuestions: QuestionItem[];
  onSelectQuestion: (question: QuestionItem) => void;
  onTagClick: (tag: string) => void;
  onVoteChange: (questionId: string, diff: number, newVote: number) => void;
  onToggleBookmark: (questionId: string) => void;
  onGoToFeed: () => void;
}

export function BookmarksView({
  bookmarkedQuestions,
  onSelectQuestion,
  onTagClick,
  onVoteChange,
  onToggleBookmark,
  onGoToFeed,
}: BookmarksViewProps) {
  return (
    <div className="flex-1 min-w-0">
      {/* Header Banner */}
      <div className="mb-6 p-6 rounded-3xl bg-gradient-to-r from-surface-container to-surface-container-high border border-surface-container-highest relative overflow-hidden shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-tertiary/15 text-tertiary border border-tertiary/30 flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5" />
                Personal Reading List
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-on-surface">
              Saved Questions & References
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1 max-w-xl">
              Quickly revisit solutions, code patterns, and architectural discussions you&apos;ve bookmarked for later.
            </p>
          </div>
        </div>
      </div>

      {/* Bookmarks Counter */}
      <div className="mb-4 text-xs font-mono text-outline flex items-center justify-between">
        <span>
          You have <strong className="text-primary">{bookmarkedQuestions.length}</strong>{" "}
          {bookmarkedQuestions.length === 1 ? "question" : "questions"} saved in your library
        </span>
      </div>

      {/* Bookmarked Questions List or Empty State */}
      <div className="flex flex-col gap-4">
        {bookmarkedQuestions.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-surface-container-low border border-surface-container-high flex flex-col items-center justify-center gap-3.5 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center text-outline">
              <Bookmark className="w-7 h-7 text-outline" />
            </div>
            <h3 className="text-base font-bold text-on-surface">No bookmarked questions yet</h3>
            <p className="text-xs text-outline max-w-sm leading-relaxed">
              When exploring questions, click the bookmark icon <Bookmark className="w-3.5 h-3.5 inline mx-1 text-tertiary" /> on any card to save it here for fast offline or future reference.
            </p>
            <Button
              onClick={onGoToFeed}
              variant="primary"
              size="sm"
              className="mt-2 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore Questions Feed</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          bookmarkedQuestions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              isBookmarked={true}
              onTagClick={onTagClick}
              onSelectQuestion={onSelectQuestion}
              onVoteChange={onVoteChange}
              onToggleBookmark={onToggleBookmark}
            />
          ))
        )}
      </div>
    </div>
  );
}
