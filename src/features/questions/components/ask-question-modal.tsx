"use client";

import React, { useState } from "react";
import { X, Sparkles, HelpCircle, Code2, Tag as TagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuestionItem } from "@/types/question";

interface AskQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newQuestion: { title: string; body: string; tags: { id: string; name: string }[] }) => void;
  initialTitle?: string;
  initialBody?: string;
  initialTags?: string;
}

export function AskQuestionModal({
  isOpen,
  onClose,
  onSubmit,
  initialTitle = "",
  initialBody = "",
  initialTags = "",
}: AskQuestionModalProps) {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const [tagInput, setTagInput] = useState(initialTags);
  const [error, setError] = useState("");

  React.useEffect(() => {
    if (isOpen) {
      if (initialTitle) setTitle(initialTitle);
      if (initialBody) setBody(initialBody);
      if (initialTags) setTagInput(initialTags);
    }
  }, [isOpen, initialTitle, initialBody, initialTags]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim().length < 10) {
      setError("Title must be at least 10 characters long.");
      return;
    }
    if (body.trim().length < 20) {
      setError("Please describe the problem in at least 20 characters.");
      return;
    }

    const parsedTags = tagInput
      .split(",")
      .map((t) => t.trim().toLowerCase().replace(/^#/, ""))
      .filter((t) => t.length > 0)
      .slice(0, 5)
      .map((t) => ({
        id: t,
        name: t,
      }));

    onSubmit({
      title: title.trim(),
      body: body.trim(),
      tags: parsedTags.length > 0 ? parsedTags : [{ id: "general", name: "general" }],
    });

    setTitle("");
    setBody("");
    setTagInput("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl rounded-2xl bg-surface-container-low border border-surface-container-high shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-container-high bg-surface-container/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-on-surface">Ask the Hive</h2>
              <p className="text-xs text-outline">Get solutions from community experts and Gemini AI</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex flex-col gap-5 flex-1">
          {error && (
            <div className="p-3 rounded-xl bg-error/15 border border-error/30 text-error text-xs">
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1.5 flex items-center gap-1.5">
              <span>Question Title</span>
              <span className="text-outline text-[11px] font-normal">(Be specific and summarize the core problem)</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. How to handle optimistic UI updates with TanStack Query and Server Actions?"
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container border border-surface-container-highest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Details / Body */}
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1.5 flex items-center gap-1.5">
              <span>What are the details of your problem?</span>
              <span className="text-outline text-[11px] font-normal">(Explain what you expected vs what actually happened)</span>
            </label>
            <textarea
              required
              rows={6}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Describe your architecture, error logs, and minimal code snippet..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container border border-surface-container-highest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-mono text-xs"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1.5 flex items-center gap-1.5">
              <TagIcon className="w-3.5 h-3.5 text-primary" />
              <span>Tags</span>
              <span className="text-outline text-[11px] font-normal">(Comma-separated, up to 5 tags)</span>
            </label>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="next.js, typescript, tailwind, prisma"
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container border border-surface-container-highest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-mono text-xs"
            />
          </div>

          {/* Tip Banner */}
          <div className="p-3 rounded-xl bg-surface-container/60 border border-primary/20 text-xs text-on-surface-variant flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Upon publishing, questions will automatically trigger an initial AI synthesis if no community reply is received within the first tier.
            </p>
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-container-high">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Publish Question
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
