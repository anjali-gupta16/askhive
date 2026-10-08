"use client";

import React, { useState } from "react";
import { Shield, CheckCircle2, XCircle, AlertTriangle, Eye, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReviewItem {
  id: string;
  type: "flagged_post" | "ai_summary" | "tag_proposal";
  title: string;
  author: string;
  reason: string;
  time: string;
}

const INITIAL_QUEUE: ReviewItem[] = [
  {
    id: "rev-1",
    type: "flagged_post",
    title: "How to bypass rate limit with automated scripts on nextauth?",
    author: "anonymous_dev",
    reason: "Flagged by community: Suspected abusive scraping or brute force vectors.",
    time: "15 mins ago",
  },
  {
    id: "rev-2",
    type: "ai_summary",
    title: "Optimistic UI Rollback Pattern for TanStack Query v5",
    author: "gemini_bot",
    reason: "Pending human verification before promoting to official wiki answer.",
    time: "1 hour ago",
  },
  {
    id: "rev-3",
    type: "tag_proposal",
    title: "New tag request: #turbopack-v16",
    author: "alex_dev",
    reason: "Requested domain tag for bundling performance benchmarks.",
    time: "3 hours ago",
  },
];

export function ModeratorView() {
  const [queue, setQueue] = useState(INITIAL_QUEUE);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const handleAction = (id: string, actionName: string) => {
    setQueue((prev) => prev.filter((item) => item.id !== id));
    setActionNotice(`Item successfully ${actionName}!`);
    setTimeout(() => setActionNotice(null), 3000);
  };

  return (
    <div className="flex-1 min-w-0">
      {/* Header Banner */}
      <div className="mb-6 p-6 rounded-3xl bg-gradient-to-r from-surface-container to-surface-container-high border border-surface-container-highest relative overflow-hidden shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-tertiary/15 text-tertiary border border-tertiary/30 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            Moderator Operations
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-on-surface">
          Community Review & Moderation Queue
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant mt-1 max-w-xl">
          Audit flagged submissions, confirm AI technical summaries, and maintain quality across the community.
        </p>
      </div>

      {actionNotice && (
        <div className="mb-4 p-3 rounded-xl bg-secondary/15 border border-secondary/30 text-secondary text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          {actionNotice}
        </div>
      )}

      {/* Queue items */}
      <div className="flex flex-col gap-3">
        {queue.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-surface-container-low border border-surface-container-high">
            <CheckCircle2 className="w-12 h-12 text-secondary mx-auto mb-3" />
            <h3 className="text-base font-bold text-on-surface">All caught up!</h3>
            <p className="text-xs text-outline mt-1">
              There are no pending reports or moderation audits in the queue.
            </p>
          </div>
        ) : (
          queue.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-surface-container-low border border-surface-container-high flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                      item.type === "flagged_post"
                        ? "bg-error/15 text-error"
                        : item.type === "ai_summary"
                        ? "bg-primary/15 text-primary"
                        : "bg-tertiary/15 text-tertiary"
                    }`}
                  >
                    {item.type.replace("_", " ")}
                  </span>
                  <span className="text-[11px] font-mono text-outline">by @{item.author} • {item.time}</span>
                </div>
                <h4 className="text-sm font-bold text-on-surface mb-1">{item.title}</h4>
                <p className="text-xs text-on-surface-variant flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-tertiary flex-shrink-0" />
                  {item.reason}
                </p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <Button
                  onClick={() => handleAction(item.id, "approved")}
                  variant="outline"
                  size="sm"
                  className="text-xs text-secondary hover:bg-secondary/10 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  Approve
                </Button>
                <Button
                  onClick={() => handleAction(item.id, "dismissed")}
                  variant="outline"
                  size="sm"
                  className="text-xs text-error hover:bg-error/10 cursor-pointer"
                >
                  <XCircle className="w-3.5 h-3.5 mr-1" />
                  Dismiss
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
