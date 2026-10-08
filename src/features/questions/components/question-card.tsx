"use client";

import React, { useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Eye,
  Bookmark,
  Share2,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { QuestionItem } from "@/types/question";

interface QuestionCardProps {
  question: QuestionItem;
  onTagClick?: (tagName: string) => void;
  onSelectQuestion?: (question: QuestionItem) => void;
  onVoteChange?: (questionId: string, diff: number, newVote: number) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (questionId: string) => void;
}

export function QuestionCard({
  question,
  onTagClick,
  onSelectQuestion,
  onVoteChange,
  isBookmarked,
  onToggleBookmark,
}: QuestionCardProps) {
  const [score, setScore] = useState(question.score);
  const [userVote, setUserVote] = useState<number>(question.userVote || 0);
  const [internalSaved, setInternalSaved] = useState(false);
  const isSaved = isBookmarked !== undefined ? isBookmarked : internalSaved;
  const [copied, setCopied] = useState(false);

  const handleVote = (e: React.MouseEvent, direction: 1 | -1) => {
    e.stopPropagation();
    if (userVote === direction) {
      // Undo vote
      setUserVote(0);
      setScore((prev) => prev - direction);
      onVoteChange?.(question.id, -direction, 0);
    } else {
      // New vote or flipped vote
      const diff = userVote === 0 ? direction : direction * 2;
      setUserVote(direction);
      setScore((prev) => prev + diff);
      onVoteChange?.(question.id, diff, direction);
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText?.(
      typeof window !== "undefined"
        ? window.location.origin + `/questions/${question.id}`
        : ""
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article
      onClick={() => onSelectQuestion?.(question)}
      className="group p-5 rounded-2xl bg-surface-container-low border border-surface-container-high hover:border-primary/40 hover:bg-surface-container/70 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
    >
      <div className="flex gap-4 items-start">
        {/* Left: Vote Pill */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-surface-container border border-surface-container-highest flex-shrink-0"
        >
          <button
            onClick={(e) => handleVote(e, 1)}
            title="Upvote question"
            className={`p-1 rounded-lg transition-colors ${
              userVote === 1
                ? "text-secondary bg-secondary/15 font-bold"
                : "text-outline hover:text-on-surface hover:bg-surface-container-high"
            }`}
          >
            <ChevronUp className="w-5 h-5 stroke-[2.5]" />
          </button>
          <span
            className={`text-sm font-mono font-bold my-0.5 ${
              userVote === 1
                ? "text-secondary"
                : userVote === -1
                ? "text-error"
                : "text-on-surface"
            }`}
          >
            {score}
          </span>
          <button
            onClick={(e) => handleVote(e, -1)}
            title="Downvote question"
            className={`p-1 rounded-lg transition-colors ${
              userVote === -1
                ? "text-error bg-error/15 font-bold"
                : "text-outline hover:text-on-surface hover:bg-surface-container-high"
            }`}
          >
            <ChevronDown className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Middle: Content */}
        <div className="flex-1 min-w-0">
          {/* Status Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {question.hasAcceptedAnswer && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono font-semibold bg-secondary/15 text-secondary border border-secondary/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Solved
              </span>
            )}
            {question.hasAiAnswer && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono font-semibold bg-primary/15 text-primary border border-primary/30">
                <Sparkles className="w-3.5 h-3.5" />
                AI Synthesized
              </span>
            )}
            {question.answersCount === 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono font-semibold bg-tertiary/15 text-tertiary border border-tertiary/30">
                Needs Answer
              </span>
            )}
            <span className="text-[11px] text-outline font-mono ml-auto">
              asked {question.createdAt}
            </span>
          </div>

          {/* Question Title */}
          <h2 className="text-base sm:text-lg font-bold text-on-surface group-hover:text-primary transition-colors mb-1.5 leading-snug flex items-center justify-between gap-2">
            <span>{question.title}</span>
            <ArrowRight className="w-4 h-4 text-outline group-hover:text-primary group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100 flex-shrink-0" />
          </h2>

          {/* Question Excerpt */}
          <p className="text-xs sm:text-sm text-on-surface-variant line-clamp-2 leading-relaxed mb-3">
            {question.body}
          </p>

          {/* Bottom Bar: Tags & Author / Stats */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-surface-container-high/60">
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5" onClick={(e) => e.stopPropagation()}>
              {question.tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onTagClick?.(tag.name);
                  }}
                  className="text-xs font-mono px-2 py-0.5 rounded-md bg-surface-container hover:bg-surface-container-highest text-primary/90 border border-surface-container-highest hover:border-primary/40 transition-colors"
                >
                  #{tag.name}
                </button>
              ))}
            </div>

            {/* Author info & metrics */}
            <div className="flex items-center gap-4 text-xs text-outline">
              {/* Answer & View counters */}
              <div className="flex items-center gap-3 font-mono">
                <span
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-md ${
                    question.hasAcceptedAnswer
                      ? "bg-secondary/15 text-secondary font-semibold"
                      : question.answersCount > 0
                      ? "bg-surface-container text-on-surface"
                      : "text-tertiary bg-tertiary/10 font-medium"
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  {question.answersCount} {question.answersCount === 1 ? "answer" : "answers"}
                </span>
                <span className="flex items-center gap-1 hidden sm:inline-flex">
                  <Eye className="w-3.5 h-3.5" />
                  {question.views}
                </span>
              </div>

              {/* Author pill */}
              <div className="flex items-center gap-2 pl-2 border-l border-surface-container-high">
                <div className="w-6 h-6 rounded-md bg-surface-container-highest text-on-surface font-semibold text-[10px] flex items-center justify-center">
                  {question.author.username.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-medium text-on-surface">
                    {question.author.username}
                  </span>
                  {question.author.role === "MODERATOR" && (
                    <ShieldCheck className="w-3 h-3 text-secondary" />
                  )}
                  <span className="text-[11px] font-mono text-primary font-semibold">
                    {question.author.reputation}
                  </span>
                </div>
              </div>

              {/* Bookmark & Share buttons */}
              <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBookmark?.(question.id);
                    setInternalSaved(!internalSaved);
                  }}
                  title="Bookmark"
                  className={`p-1 rounded-md hover:bg-surface-container transition-colors ${
                    isSaved ? "text-tertiary" : "text-outline hover:text-on-surface"
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" fill={isSaved ? "currentColor" : "none"} />
                </button>
                <button
                  onClick={handleShare}
                  title="Copy link"
                  className="p-1 rounded-md text-outline hover:text-on-surface hover:bg-surface-container transition-colors relative"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  {copied && (
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 text-[10px] font-mono bg-surface-container-highest text-secondary rounded shadow border border-secondary/30">
                      Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
