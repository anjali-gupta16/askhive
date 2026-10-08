export interface Author {
  id: string;
  name: string;
  username: string;
  image?: string;
  role: "USER" | "MODERATOR" | "ADMIN";
  reputation: number;
}

export interface TagItem {
  id: string;
  name: string;
  description?: string;
  color?: string;
}

export interface AnswerItem {
  id: string;
  body: string;
  score: number;
  userVote?: number;
  isAccepted: boolean;
  isAiGenerated: boolean;
  createdAt: string;
  author: Author;
  replies?: AnswerItem[];
}

export interface QuestionItem {
  id: string;
  title: string;
  body: string;
  slug: string;
  views: number;
  score: number;
  userVote?: number; // 1, -1, or 0
  hasAcceptedAnswer: boolean;
  hasAiAnswer: boolean;
  answersCount: number;
  createdAt: string;
  createdAtTimestamp: number;
  author: Author;
  tags: TagItem[];
  answers: AnswerItem[];
}
