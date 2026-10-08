"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Sparkles,
  Plus,
  Bell,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Award,
  LogOut,
  LogIn,
  UserPlus,
  ChevronDown,
  User,
  Users,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore, PRESET_USERS } from "@/stores/auth-store";
import { useNotificationStore } from "@/stores/notification-store";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenAskModal: () => void;
}

export function Header({ searchQuery, onSearchChange, onOpenAskModal }: HeaderProps) {
  const router = useRouter();
  const { user, isAuthenticated, logout, switchUser } = useAuthStore();
  const { notifications, markAllAsRead, markAsRead } = useNotificationStore();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close menus on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-surface-container-high header-blur bg-surface/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center text-surface shadow-lg group-hover:scale-105 transition-transform duration-200">
              <span className="text-xl font-black tracking-wider text-surface">🐝</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-on-surface flex items-center gap-1.5">
                Ask<span className="text-primary font-extrabold">Hive</span>
                <span className="text-[10px] font-mono font-semibold uppercase px-1.5 py-0.5 rounded bg-surface-container-highest text-primary border border-primary/20">
                  v0.1
                </span>
              </span>
            </div>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl hidden md:block">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
            <input
              type="text"
              placeholder="Search questions, code solutions, tags (e.g. [nextjs] or error)..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-12 py-2 text-sm bg-surface-container-low border border-surface-container-highest rounded-xl text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-150"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[11px] font-mono text-outline bg-surface-container rounded border border-surface-container-highest">
              /
            </kbd>
          </div>
        </div>

        {/* Action Buttons & Profile */}
        <div className="flex items-center gap-3">
          <Button
            onClick={onOpenAskModal}
            className="flex items-center gap-1.5 bg-gradient-to-r from-primary to-primary-container text-surface hover:brightness-110 font-semibold shadow-md active:scale-95 cursor-pointer"
            size="sm"
          >
            <Plus className="w-4 h-4 text-surface stroke-[2.5]" />
            <span className="hidden sm:inline">Ask Question</span>
          </Button>

          {/* Notification Bell Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              title="Notifications"
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer relative ${
                isNotifOpen
                  ? "bg-surface-container-highest text-primary"
                  : "text-outline hover:text-on-surface hover:bg-surface-container-high"
              }`}
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-secondary ring-2 ring-surface flex items-center justify-center animate-pulse" />
              )}
            </button>

            {/* Notifications Popover */}
            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-white/10 shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                style={{ background: 'rgba(14, 10, 28, 0.97)', backdropFilter: 'blur(24px)' }}>
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10" style={{ background: 'rgba(26, 16, 50, 0.95)' }}>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-on-surface">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-secondary/20 text-secondary">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-[11px] font-medium text-primary hover:underline cursor-pointer"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-surface-container-high/40">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-outline">
                      No notifications yet.
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => markAsRead(notif.id)}
                        className={`p-3.5 hover:bg-surface-container/70 transition-colors cursor-pointer flex gap-3 items-start ${
                          !notif.read ? "bg-surface-container/40" : ""
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0 mt-0.5">
                          {notif.type === "accept" && (
                            <CheckCircle2 className="w-4 h-4 text-secondary" />
                          )}
                          {notif.type === "upvote" && (
                            <TrendingUp className="w-4 h-4 text-primary" />
                          )}
                          {notif.type === "ai" && (
                            <Sparkles className="w-4 h-4 text-primary" />
                          )}
                          {notif.type === "badge" && (
                            <Award className="w-4 h-4 text-tertiary" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <span className="text-xs font-bold text-on-surface">
                              {notif.title}
                            </span>
                            {notif.points && (
                              <span className="text-[10px] font-mono font-bold text-secondary bg-secondary/10 px-1 rounded">
                                +{notif.points} rep
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                            {notif.message}
                          </p>
                          <span className="text-[10px] font-mono text-outline mt-1 block">
                            {notif.time}
                          </span>
                        </div>

                        {!notif.read && (
                          <span className="w-2 h-2 rounded-full bg-secondary flex-shrink-0 mt-2" />
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Account Pill & Menu */}
          <div className="relative" ref={userMenuRef}>
            {isAuthenticated && user ? (
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2.5 px-2.5 py-1 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer border border-surface-container-highest"
              >
                <div className="w-7 h-7 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                  {user.username.substring(0, 2).toUpperCase()}
                </div>
                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-xs font-semibold text-on-surface flex items-center gap-1">
                    {user.username}
                    {user.role === "MODERATOR" && (
                      <ShieldCheck className="w-3 h-3 text-secondary" />
                    )}
                  </span>
                  <span className="text-[11px] font-mono font-medium text-primary">
                    {user.reputation.toLocaleString()} rep
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-outline hidden lg:block" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    <LogIn className="w-4 h-4 mr-1.5" />
                    Log In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="outline" size="sm">
                    <UserPlus className="w-4 h-4 mr-1.5" />
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* User Dropdown Menu */}
            {isUserMenuOpen && isAuthenticated && user && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-white/10 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                style={{ background: 'rgba(14, 10, 28, 0.97)', backdropFilter: 'blur(24px)' }}>
                {/* User Info Header */}
                <div className="p-3 rounded-xl mb-2 border border-white/10" style={{ background: 'rgba(30, 20, 60, 0.95)' }}>
                  <div className="flex items-center gap-2.5 mb-1">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary font-bold text-xs flex items-center justify-center">
                      {user.username.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-on-surface flex items-center gap-1">
                        {user.name}
                        {user.role === "MODERATOR" && (
                          <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-secondary/15 text-secondary">
                            MOD
                          </span>
                        )}
                        {user.role === "ADMIN" && (
                          <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-tertiary/15 text-tertiary">
                            ADMIN
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-outline font-mono">@{user.username}</div>
                    </div>
                  </div>
                  <div className="text-xs font-mono font-semibold text-primary pt-1 border-t border-surface-container-highest/60 flex items-center justify-between">
                    <span>Reputation:</span>
                    <span>{user.reputation.toLocaleString()} points</span>
                  </div>
                </div>

                {/* Fast Profile Presets Switcher */}
                <div className="px-2 py-1 text-[10px] font-mono font-semibold uppercase text-outline">
                  Switch Demo Account
                </div>
                <div className="space-y-1 mb-2">
                  <button
                    onClick={() => {
                      switchUser("anjali");
                      setIsUserMenuOpen(false);
                    }}
                    className={`flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                      user.username === "anjali_gupta"
                        ? "bg-surface-container-high text-primary font-bold"
                        : "text-on-surface-variant hover:bg-surface-container"
                    }`}
                  >
                    <span>Anjali Gupta (1.5k rep)</span>
                    {user.username === "anjali_gupta" && <Check className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => {
                      switchUser("alex");
                      setIsUserMenuOpen(false);
                    }}
                    className={`flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                      user.username === "alex_dev"
                        ? "bg-surface-container-high text-primary font-bold"
                        : "text-on-surface-variant hover:bg-surface-container"
                    }`}
                  >
                    <span>alex_dev (Mod, 12.4k)</span>
                    {user.username === "alex_dev" && <Check className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => {
                      switchUser("sarah");
                      setIsUserMenuOpen(false);
                    }}
                    className={`flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                      user.username === "sarah_k"
                        ? "bg-surface-container-high text-primary font-bold"
                        : "text-on-surface-variant hover:bg-surface-container"
                    }`}
                  >
                    <span>sarah_k (User, 4.8k)</span>
                    {user.username === "sarah_k" && <Check className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => {
                      switchUser("admin");
                      setIsUserMenuOpen(false);
                    }}
                    className={`flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                      user.username === "admin_hive"
                        ? "bg-surface-container-high text-primary font-bold"
                        : "text-on-surface-variant hover:bg-surface-container"
                    }`}
                  >
                    <span>admin_hive (Admin, 50k)</span>
                    {user.username === "admin_hive" && <Check className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => {
                      switchUser("guest");
                      setIsUserMenuOpen(false);
                    }}
                    className={`flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                      user.username.startsWith("guest")
                        ? "bg-surface-container-high text-primary font-bold"
                        : "text-on-surface-variant hover:bg-surface-container"
                    }`}
                  >
                    <span>guest_user (Guest mode)</span>
                    {user.username.startsWith("guest") && <Check className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="pt-2 border-t border-surface-container-high space-y-1">
                  <Link
                    href="/login"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2 w-full px-2.5 py-2 rounded-lg text-xs text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Go to Login Page</span>
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2 w-full px-2.5 py-2 rounded-lg text-xs text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Go to Sign Up Page</span>
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-2.5 py-2 rounded-lg text-xs text-error hover:bg-error/15 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
