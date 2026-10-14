"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserSession {
  id: string;
  name: string;
  username: string;
  email: string;
  role: "USER" | "MODERATOR" | "ADMIN";
  reputation: number;
  isGuest: boolean;
}

export const PRESET_USERS: Record<string, UserSession> = {
  anjali: {
    id: "u-anjali",
    name: "Anjali Gupta",
    username: "anjali_gupta",
    email: "anjali@askhive.dev",
    role: "USER",
    reputation: 1520,
    isGuest: false,
  },
  alex: {
    id: "u-1",
    name: "Alex Rivera",
    username: "alex_dev",
    email: "alex@askhive.dev",
    role: "MODERATOR",
    reputation: 12450,
    isGuest: false,
  },
  sarah: {
    id: "u-2",
    name: "Sarah Chen",
    username: "sarah_k",
    email: "sarah@askhive.dev",
    role: "USER",
    reputation: 4820,
    isGuest: false,
  },
  admin: {
    id: "u-3",
    name: "Marcus Aurelius",
    username: "admin_hive",
    email: "admin@askhive.dev",
    role: "ADMIN",
    reputation: 50200,
    isGuest: false,
  },
  guest: {
    id: "u-guest",
    name: "Guest Explorer",
    username: "guest_user",
    email: "guest@askhive.dev",
    role: "USER",
    reputation: 150,
    isGuest: true,
  },
};

interface AuthState {
  user: UserSession | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => boolean;
  register: (name: string, username: string, email: string) => boolean;
  loginAsGuest: (displayName?: string) => void;
  switchUser: (key: keyof typeof PRESET_USERS) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (email: string) => {
        // Find existing preset or create active session
        const found = Object.values(PRESET_USERS).find(
          (u) => u.email.toLowerCase() === email.toLowerCase() || u.username.toLowerCase() === email.toLowerCase()
        );
        if (found) {
          set({ user: found, isAuthenticated: true });
          return true;
        }

        const newUser: UserSession = {
          id: `u-${Date.now()}`,
          name: email.split("@")[0],
          username: email.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "_"),
          email: email,
          role: "USER",
          reputation: 100,
          isGuest: false,
        };
        set({ user: newUser, isAuthenticated: true });
        return true;
      },

      register: (name: string, username: string, email: string) => {
        const newUser: UserSession = {
          id: `u-${Date.now()}`,
          name,
          username,
          email,
          role: "USER",
          reputation: 100,
          isGuest: false,
        };
        set({ user: newUser, isAuthenticated: true });
        return true;
      },

      loginAsGuest: (displayName?: string) => {
        const guestName = displayName?.trim() || "Guest Explorer";
        set({
          user: {
            ...PRESET_USERS.guest,
            name: guestName,
            username: `guest_${Math.floor(1000 + Math.random() * 9000)}`,
          },
          isAuthenticated: true,
        });
      },

      switchUser: (key: keyof typeof PRESET_USERS) => {
        const preset = PRESET_USERS[key];
        if (preset) {
          set({ user: preset, isAuthenticated: true });
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "askhive-auth-v3",
    }
  )
);
