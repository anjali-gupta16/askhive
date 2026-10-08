"use client";

import React from "react";
import { TrendingUp, Users, CheckCircle2, Flame, Award, Lightbulb } from "lucide-react";
import { TagItem } from "@/types/question";

interface RightSidebarProps {
  selectedTag: string | null;
  onSelectTag: (tagName: string | null) => void;
  tags: (TagItem & { count: number })[];
}

export function RightSidebar({ selectedTag, onSelectTag, tags }: RightSidebarProps) {
  const topContributors = [
    { username: "admin_hive", rep: "50.2k", role: "ADMIN", tier: "Gold", badgeColor: "text-amber-400" },
    { username: "alex_dev", rep: "12.4k", role: "MOD", tier: "Silver", badgeColor: "text-primary" },
    { username: "sarah_k", rep: "4.8k", role: "PRO", tier: "Bronze", badgeColor: "text-secondary" },
  ];

  return (
    <aside className="w-80 flex-shrink-0 hidden xl:flex flex-col gap-5 p-2">
      {/* Community Pulse */}
      <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-outline flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-secondary" />
            Network Pulse
          </span>
          <span className="text-[11px] font-mono text-secondary font-medium">94.8% Solved</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="p-2.5 rounded-xl bg-surface-container border border-surface-container-highest">
            <div className="text-lg font-black text-primary font-mono">1,482</div>
            <div className="text-[11px] text-outline">Questions</div>
          </div>
          <div className="p-2.5 rounded-xl bg-surface-container border border-surface-container-highest">
            <div className="text-lg font-black text-secondary font-mono">4,912</div>
            <div className="text-[11px] text-outline">Answers</div>
          </div>
        </div>
      </div>

      {/* Trending Tags */}
      <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-outline flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-tertiary" />
            Trending Tags
          </span>
          {selectedTag && (
            <button
              onClick={() => onSelectTag(null)}
              className="text-[11px] text-primary hover:underline font-mono"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => {
            const isSelected = selectedTag === tag.name;
            return (
              <button
                key={tag.id}
                onClick={() => onSelectTag(isSelected ? null : tag.name)}
                className={`text-xs px-2.5 py-1 rounded-lg font-mono transition-all duration-150 flex items-center gap-1.5 border ${
                  isSelected
                    ? "bg-primary text-surface font-semibold border-primary shadow-sm"
                    : "bg-surface-container text-on-surface-variant hover:text-on-surface hover:border-outline/40 border-surface-container-highest"
                }`}
              >
                <span>#{tag.name}</span>
                <span
                  className={`text-[10px] opacity-70 font-sans ${
                    isSelected ? "text-surface font-bold" : "text-outline"
                  }`}
                >
                  {tag.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Top Contributors */}
      <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-outline flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-primary" />
            Top Contributors
          </span>
          <span className="text-[10px] font-mono text-outline">This Week</span>
        </div>
        <div className="flex flex-col gap-2.5">
          {topContributors.map((c, idx) => (
            <div
              key={c.username}
              className="flex items-center justify-between p-2 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-mono font-bold text-outline w-3">
                  #{idx + 1}
                </span>
                <div className="w-7 h-7 rounded-lg bg-surface-container-highest flex items-center justify-center text-xs font-bold text-primary border border-surface-container-high">
                  {c.username.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-xs font-medium text-on-surface flex items-center gap-1">
                    {c.username}
                    <span className="text-[9px] px-1 py-0.2 rounded font-mono bg-surface-container-highest text-outline">
                      {c.role}
                    </span>
                  </div>
                  <div className="text-[10px] text-outline font-mono">{c.tier} Tier</div>
                </div>
              </div>
              <div className="text-xs font-mono font-semibold text-primary">
                +{c.rep}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hive Guidelines Tips */}
      <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface-variant flex flex-col gap-2">
        <div className="flex items-center gap-1.5 font-semibold text-on-surface">
          <Lightbulb className="w-4 h-4 text-tertiary" />
          Pro-tip for Asking
        </div>
        <p className="leading-relaxed text-[11.5px]">
          Include a minimal reproducible code snippet and specify your framework version. AI drafts automatically trigger after 5 minutes for unanswered queries!
        </p>
      </div>
    </aside>
  );
}
