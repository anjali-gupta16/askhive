"use client";

import React, { useState } from "react";
import {
  X,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Eye,
  Share2,
  ShieldCheck,
  Send,
  Bot,
  Copy,
  Check,
} from "lucide-react";
import { QuestionItem, AnswerItem } from "@/types/question";
import { Button } from "@/components/ui/button";

interface QuestionDetailModalProps {
  question: QuestionItem | null;
  isOpen: boolean;
  onClose: () => void;
  onVoteQuestion: (questionId: string, direction: 1 | -1) => void;
  onAcceptAnswer: (questionId: string, answerId: string) => void;
  onAddAnswer: (questionId: string, answerText: string) => void;
  onGenerateAiAnswer: (questionId: string) => void;
  isAiGenerating?: boolean;
}

export function QuestionDetailModal({
  question,
  isOpen,
  onClose,
  onVoteQuestion,
  onAcceptAnswer,
  onAddAnswer,
  onGenerateAiAnswer,
  isAiGenerating = false,
}: QuestionDetailModalProps) {
  const [newAnswerText, setNewAnswerText] = useState("");
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  if (!isOpen || !question) return null;

  const handlePostAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnswerText.trim()) return;
    onAddAnswer(question.id, newAnswerText.trim());
    setNewAnswerText("");
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard?.writeText?.(text);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-4xl max-h-[92vh] rounded-3xl bg-surface-container-low border border-surface-container-high shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-container-high bg-surface-container/60">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold uppercase px-2 py-0.5 rounded bg-surface-container-highest text-primary border border-primary/20">
              Q&A Thread
            </span>
            {question.hasAcceptedAnswer && (
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-secondary/15 text-secondary border border-secondary/30 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Solved
              </span>
            )}
            {question.hasAiAnswer && (
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-primary/15 text-primary border border-primary/30 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                AI Enhanced
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          {/* Main Question Body */}
          <div className="border-b border-surface-container-high pb-6">
            <div className="flex gap-4 items-start">
              {/* Question Vote Pill */}
              <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-surface-container border border-surface-container-highest flex-shrink-0">
                <button
                  onClick={() => onVoteQuestion(question.id, 1)}
                  className={`p-1 rounded-lg transition-colors ${
                    question.userVote === 1
                      ? "text-secondary bg-secondary/15"
                      : "text-outline hover:text-on-surface"
                  }`}
                >
                  <ChevronUp className="w-6 h-6 stroke-[2.5]" />
                </button>
                <span className="text-base font-mono font-bold my-1 text-on-surface">
                  {question.score}
                </span>
                <button
                  onClick={() => onVoteQuestion(question.id, -1)}
                  className={`p-1 rounded-lg transition-colors ${
                    question.userVote === -1
                      ? "text-error bg-error/15"
                      : "text-outline hover:text-on-surface"
                  }`}
                >
                  <ChevronDown className="w-6 h-6 stroke-[2.5]" />
                </button>
              </div>

              {/* Title & Body */}
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface leading-tight mb-3">
                  {question.title}
                </h1>

                <div className="text-sm text-on-surface-variant leading-relaxed whitespace-pre-line mb-4">
                  {question.body}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {question.tags.map((t) => (
                    <span
                      key={t.id}
                      className="text-xs font-mono px-2.5 py-1 rounded-lg bg-surface-container text-primary border border-surface-container-highest"
                    >
                      #{t.name}
                    </span>
                  ))}
                </div>

                {/* Author footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-surface-container-high/60 text-xs text-outline">
                  <div className="flex items-center gap-4 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-4 h-4" />
                      {question.views} views
                    </span>
                    <span>asked {question.createdAt}</span>
                  </div>

                  <div className="flex items-center gap-2 p-1.5 px-3 rounded-xl bg-surface-container border border-surface-container-highest">
                    <div className="w-6 h-6 rounded-md bg-primary/20 text-primary font-bold flex items-center justify-center text-[11px]">
                      {question.author.username.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="font-semibold text-on-surface">
                      {question.author.username}
                    </span>
                    {question.author.role === "MODERATOR" && (
                      <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                    )}
                    <span className="font-mono text-primary text-[11px]">
                      {question.author.reputation} rep
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Synthesis Section CTA */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-surface-container to-surface-container-high border border-primary/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-on-surface flex items-center gap-2">
                  Gemini AI Copilot
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/20 text-primary">
                    v2.5 Flash
                  </span>
                </h4>
                <p className="text-xs text-outline">
                  {question.hasAiAnswer
                    ? "AI synthesis is provided below based on developer documentation."
                    : "Generate an instant automated technical solution using verified knowledge bases."}
                </p>
              </div>
            </div>

            {!question.hasAiAnswer && (
              <Button
                onClick={() => onGenerateAiAnswer(question.id)}
                disabled={isAiGenerating}
                className="bg-primary text-surface font-semibold hover:bg-primary-container hover:text-white flex-shrink-0"
                size="sm"
              >
                <Sparkles className="w-4 h-4 mr-1.5" />
                {isAiGenerating ? "Synthesizing Solution..." : "Generate AI Answer"}
              </Button>
            )}
          </div>

          {/* Answers Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-bold text-on-surface flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                {question.answers.length} {question.answers.length === 1 ? "Answer" : "Answers"}
              </h3>
            </div>

            {question.answers.length === 0 ? (
              <div className="p-8 rounded-2xl bg-surface-container text-center border border-surface-container-highest">
                <p className="text-sm text-outline mb-2">No answers posted yet.</p>
                <p className="text-xs text-on-surface-variant">
                  Be the first developer to answer this question or trigger the Gemini Copilot!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {question.answers.map((answer) => (
                  <div
                    key={answer.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      answer.isAccepted
                        ? "bg-secondary/5 border-secondary/40 shadow-sm"
                        : answer.isAiGenerated
                        ? "bg-surface-container border-primary/30"
                        : "bg-surface-container-low border-surface-container-high"
                    }`}
                  >
                    {/* Top status bar */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {answer.isAccepted && (
                          <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-secondary bg-secondary/15 px-2.5 py-1 rounded-lg border border-secondary/30">
                            <CheckCircle2 className="w-4 h-4" />
                            Accepted Solution (+15 rep)
                          </span>
                        )}
                        {answer.isAiGenerated && (
                          <span className="flex items-center gap-1.5 text-xs font-mono font-semibold text-primary bg-primary/15 px-2.5 py-1 rounded-lg border border-primary/30">
                            <Bot className="w-4 h-4" />
                            AI Assistant
                          </span>
                        )}
                        <span className="text-xs font-mono text-outline">
                          {answer.createdAt}
                        </span>
                      </div>

                      {/* Accept Answer Button */}
                      {!answer.isAccepted && (
                        <button
                          onClick={() => onAcceptAnswer(question.id, answer.id)}
                          className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg text-outline hover:text-secondary hover:bg-secondary/10 border border-surface-container-highest transition-colors"
                          title="Mark this answer as accepted solution"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Accept Answer
                        </button>
                      )}
                    </div>

                    {/* Answer text */}
                    <div className="text-sm text-on-surface leading-relaxed whitespace-pre-line mb-4 font-sans">
                      {answer.body}
                    </div>

                    {/* Footer: Author & score */}
                    <div className="flex items-center justify-between pt-3 border-t border-surface-container-high/60 text-xs">
                      <div className="flex items-center gap-2 font-mono">
                        <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-bold">
                          +{answer.score} votes
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-surface-container-highest text-primary font-bold flex items-center justify-center text-[10px]">
                          {answer.author.username.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="font-semibold text-on-surface">
                          {answer.author.username}
                        </span>
                        <span className="font-mono text-primary text-[11px]">
                          {answer.author.reputation} rep
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Write an Answer Form */}
          <div className="p-5 rounded-2xl bg-surface-container border border-surface-container-highest">
            <h4 className="text-sm font-bold text-on-surface mb-2 flex items-center gap-2">
              <Send className="w-4 h-4 text-primary" />
              Your Answer
            </h4>
            <form onSubmit={handlePostAnswer} className="space-y-3">
              <textarea
                required
                rows={4}
                value={newAnswerText}
                onChange={(e) => setNewAnswerText(e.target.value)}
                placeholder="Write your constructive solution, code snippets, or explanation..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-highest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-sans"
              />
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-outline">
                  Markdown and code blocks supported. Be respectful and helpful.
                </span>
                <Button type="submit" variant="primary" size="sm">
                  Post Answer (+10 rep)
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
