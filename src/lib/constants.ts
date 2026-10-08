// ─── Reputation Points ──────────────────────────────────

export const REPUTATION = {
  ANSWER_UPVOTE: 10,
  QUESTION_UPVOTE: 5,
  ANSWER_ACCEPTED: 15,
  DOWNVOTE_RECEIVED: -2,
} as const;

// ─── Badge Criteria ─────────────────────────────────────

export const BADGE_CRITERIA = {
  FIRST_ANSWER: { key: "first_answer", threshold: 1 },
  TOP_HELPER: { key: "accepted_answers", threshold: 10 },
  BUG_HUNTER: { key: "bug_accepted_answers", threshold: 5 },
  CONTRIBUTOR: { key: "reputation", threshold: 50 },
  EXPERT: { key: "reputation", threshold: 1000 },
} as const;

// ─── Pagination ─────────────────────────────────────────

export const PAGINATION = {
  QUESTIONS_PER_PAGE: 20,
  ANSWERS_PER_PAGE: 30,
  TAGS_PER_PAGE: 50,
} as const;

// ─── Feed Filter Tabs ───────────────────────────────────

export const FEED_FILTERS = [
  { key: "latest", label: "Latest", icon: null },
  { key: "most-upvoted", label: "Most Upvoted", icon: "TrendingUp" },
  { key: "unanswered", label: "Unanswered", icon: null },
] as const;

export type FeedFilter = (typeof FEED_FILTERS)[number]["key"];

// ─── User Roles ─────────────────────────────────────────

export const ROLE_LABELS = {
  USER: "User",
  MODERATOR: "Moderator",
  ADMIN: "Admin",
} as const;

// ─── App Metadata ───────────────────────────────────────

export const APP = {
  name: "AskHive",
  tagline: "The Developer Knowledge Hive & AI Copilot",
  version: "2.4",
  description:
    "AskHive is a Q&A platform for developers with AI-powered code assistance, peer-reviewed answers, and gamified community engagement.",
} as const;
