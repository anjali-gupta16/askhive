"use client";

import React, { useState, useMemo } from "react";
import { Search, Tag, ArrowRight, TrendingUp, Sparkles, Hash } from "lucide-react";
import { TagItem } from "@/types/question";
import { Button } from "@/components/ui/button";

interface ExtendedTag extends TagItem {
  count: number;
  color?: string;
  description?: string;
  weeklyGrowth?: string;
}

interface TagsViewProps {
  tags: (TagItem & { count: number; color?: string })[];
  onSelectTag: (tagName: string) => void;
  onGoToFeed: () => void;
}

const TAG_DESCRIPTIONS: Record<string, { desc: string; growth: string }> = {
  nextjs: {
    desc: "The React framework for the web, featuring App Router, Server Components, and Turbopack.",
    growth: "+18 questions this week",
  },
  react: {
    desc: "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
    growth: "+32 questions this week",
  },
  typescript: {
    desc: "A typed superset of JavaScript that compiles to plain JavaScript with strict type safety.",
    growth: "+24 questions this week",
  },
  tailwind: {
    desc: "A utility-first CSS framework packed with classes that can be composed to build any design.",
    growth: "+15 questions this week",
  },
  postgres: {
    desc: "A powerful, open source object-relational database system with over 35 years of active development.",
    growth: "+10 questions this week",
  },
  rust: {
    desc: "A language empowering everyone to build reliable and efficient software with zero-cost abstractions.",
    growth: "+8 questions this week",
  },
  docker: {
    desc: "Platform for developing, shipping, and running applications inside lightweight containers.",
    growth: "+12 questions this week",
  },
  "optimistic-ui": {
    desc: "Architectural patterns for updating UI state ahead of server confirmation with error rollbacks.",
    growth: "+6 questions this week",
  },
};

export function TagsView({ tags, onSelectTag, onGoToFeed }: TagsViewProps) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"popular" | "name" | "recent">("popular");

  const enrichedTags: ExtendedTag[] = useMemo(() => {
    return tags.map((t) => ({
      ...t,
      description:
        TAG_DESCRIPTIONS[t.name.toLowerCase()]?.desc ||
        `Community discussions, solutions, and code patterns related to ${t.name}.`,
      weeklyGrowth:
        TAG_DESCRIPTIONS[t.name.toLowerCase()]?.growth || `+${Math.floor(t.count * 0.15)} this week`,
    }));
  }, [tags]);

  const filteredTags = useMemo(() => {
    return enrichedTags
      .filter((t) => t.name.toLowerCase().includes(search.toLowerCase()) || t.description?.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === "popular") return b.count - a.count;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return b.count - a.count;
      });
  }, [enrichedTags, search, sortBy]);

  return (
    <div className="flex-1 min-w-0">
      {/* Header Banner */}
      <div className="mb-6 p-6 rounded-3xl bg-gradient-to-r from-surface-container to-surface-container-high border border-surface-container-highest relative overflow-hidden shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-primary/15 text-primary border border-primary/30 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                Community Index
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-on-surface">
              Explore Tags & Domains
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1 max-w-xl">
              A tag is a keyword or label that categorizes your question with other similar questions. Use the right tags to get rapid answers.
            </p>
          </div>
        </div>
      </div>

      {/* Search & Sort Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
          <input
            type="text"
            placeholder="Search tags by keyword or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-surface-container border border-surface-container-highest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-container border border-surface-container-highest self-start sm:self-auto">
          <button
            onClick={() => setSortBy("popular")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              sortBy === "popular"
                ? "bg-surface-container-high text-primary shadow-sm"
                : "text-outline hover:text-on-surface"
            }`}
          >
            Popular
          </button>
          <button
            onClick={() => setSortBy("name")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              sortBy === "name"
                ? "bg-surface-container-high text-primary shadow-sm"
                : "text-outline hover:text-on-surface"
            }`}
          >
            Alphabetical
          </button>
        </div>
      </div>

      {/* Tags Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTags.map((tag) => (
          <div
            key={tag.id}
            onClick={() => {
              onSelectTag(tag.name);
              onGoToFeed();
            }}
            className="group p-5 rounded-2xl bg-surface-container-low border border-surface-container-high hover:border-primary/50 hover:bg-surface-container/70 transition-all duration-200 cursor-pointer shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-primary/15 text-primary border border-primary/30 flex items-center gap-1 group-hover:scale-105 transition-transform">
                  <Hash className="w-3.5 h-3.5" />
                  {tag.name}
                </span>
                <span className="text-[11px] font-mono text-outline font-semibold">
                  {tag.count} {tag.count === 1 ? "question" : "questions"}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-4 line-clamp-3">
                {tag.description}
              </p>
            </div>

            <div className="pt-3 border-t border-surface-container-high flex items-center justify-between text-xs">
              <span className="text-[11px] font-mono text-secondary flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {tag.weeklyGrowth}
              </span>
              <span className="text-primary font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Browse
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredTags.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-surface-container-low border border-surface-container-high">
          <p className="text-sm text-outline">No tags found matching &ldquo;{search}&rdquo;</p>
        </div>
      )}
    </div>
  );
}
