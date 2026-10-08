"use client";

import React from "react";
import Link from "next/link";
import {
  MessageSquare,
  Tag,
  Award,
  Users,
  Bookmark,
  Sparkles,
  Shield,
  Flame,
  Radio,
  ExternalLink,
} from "lucide-react";

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenCopilot?: () => void;
}

export function Sidebar({ currentTab, onSelectTab, onOpenCopilot }: SidebarProps) {
  const navItems = [
    { id: "feed", label: "Questions Feed", icon: MessageSquare, badge: "Live" },
    { id: "popular", label: "Trending Topics", icon: Flame },
    { id: "tags", label: "Explore Tags", icon: Tag },
    { id: "badges", label: "Badges & Rep", icon: Award },
    { id: "users", label: "Hivemind Leaders", icon: Users },
    { id: "saved", label: "Bookmarks", icon: Bookmark },
  ];

  return (
    <aside className="w-64 flex-shrink-0 hidden md:block">
      <div className="sticky top-20 flex flex-col gap-6 p-2">
        {/* Main Nav */}
        <div className="flex flex-col gap-1">
          <div className="px-3 pb-2 text-[11px] font-mono font-semibold uppercase tracking-wider text-outline">
            Community
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left ${
                  isActive
                    ? "bg-surface-container-high text-primary font-semibold border border-primary/20 shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-primary" : "text-outline"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-secondary/15 text-secondary border border-secondary/30 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* AI Copilot Card - Interactive */}
        <div
          onClick={onOpenCopilot}
          className="group p-3.5 rounded-2xl bg-gradient-to-br from-surface-container via-surface-container-high to-surface-container border border-primary/30 hover:border-primary/60 relative overflow-hidden transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md hover:scale-[1.02]"
        >
          <div className="absolute right-0 top-0 w-24 h-24 bg-primary/10 rounded-full blur-xl pointer-events-none group-hover:bg-primary/20 transition-all" />
          
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary/20 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              </div>
              <div>
                <div className="text-xs font-bold text-on-surface flex items-center gap-1.5 group-hover:text-primary transition-colors">
                  Gemini Copilot
                </div>
                <div className="text-[10px] text-outline font-mono">Auto-Drafts Active</div>
              </div>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-secondary/15 text-secondary border border-secondary/30 font-semibold">
              Ready
            </span>
          </div>

          <p className="text-xs text-on-surface-variant leading-relaxed mb-3">
            AskHive synthesizes community answers and synthesizes verified technical summaries.
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-surface-container-highest text-[11px] font-mono text-primary font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-secondary animate-ping" />
              API Connected
            </span>
            <span className="flex items-center gap-1 text-primary group-hover:translate-x-1 transition-transform font-bold">
              Chat ✨ →
            </span>
          </div>
        </div>

        {/* Moderator Zone */}
        <div className="flex flex-col gap-1 pt-2 border-t border-surface-container-high">
          <div className="px-3 pb-2 text-[11px] font-mono font-semibold uppercase tracking-wider text-outline">
            Moderator Access
          </div>
          <button
            onClick={() => onSelectTab("mod-panel")}
            className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
              currentTab === "mod-panel"
                ? "bg-surface-container-high text-primary"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
            }`}
          >
            <Shield className="w-4 h-4 text-tertiary" />
            <span>Review Queue</span>
            <span className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded bg-tertiary/15 text-tertiary">
              3 new
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}
