"use client";

import { create } from "zustand";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "upvote" | "accept" | "ai" | "badge";
  points?: number;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Answer Accepted!",
    message: "sarah_k marked your answer on optimistic UI as accepted.",
    time: "10m ago",
    read: false,
    type: "accept",
    points: 15,
  },
  {
    id: "notif-2",
    title: "Upvote Received",
    message: "admin_hive upvoted your Tailwind v4 question.",
    time: "45m ago",
    read: false,
    type: "upvote",
    points: 5,
  },
  {
    id: "notif-3",
    title: "Gemini Copilot Ready",
    message: "AI synthesized an answer for your WebAssembly interop query.",
    time: "2h ago",
    read: true,
    type: "ai",
  },
  {
    id: "notif-4",
    title: "Badge Unlocked 🏆",
    message: "You unlocked the 'Bug Hunter' Tier II badge for community fixes.",
    time: "1d ago",
    read: true,
    type: "badge",
  },
];

interface NotificationState {
  notifications: NotificationItem[];
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: INITIAL_NOTIFICATIONS,

  markAsRead: (id: string) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    }));
  },

  clearAll: () => {
    set({ notifications: [] });
  },
}));
