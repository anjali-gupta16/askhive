"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  User,
  AtSign,
  ArrowRight,
  Sparkles,
  Award,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuthStore();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError("Please enter your display name");
      return;
    }
    if (username.trim().length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError("Username can only contain alphanumeric characters and underscores");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    register(name.trim(), username.trim().toLowerCase(), email.trim());
    setSuccess(true);
    setTimeout(() => {
      router.push("/");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Background radial glow */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Card container */}
      <div className="w-full max-w-md rounded-3xl bg-surface-container-low border border-surface-container-high shadow-2xl p-6 sm:p-8 relative z-10 backdrop-blur-xl">
        {/* Brand */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center text-surface shadow-lg group-hover:scale-105 transition-transform duration-200">
              <span className="text-2xl font-black">🐝</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-on-surface">
              Ask<span className="text-primary font-extrabold">Hive</span>
            </span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-black text-on-surface tracking-tight">
            Join the developer hive
          </h1>
          <p className="text-xs sm:text-sm text-outline mt-1">
            Create an account to ask, solve, and earn reputation badges
          </p>
        </div>

        {/* Reputation Welcome Bonus Banner */}
        <div className="mb-5 p-3 rounded-2xl bg-secondary/10 border border-secondary/30 flex items-center gap-2.5 text-xs text-secondary font-medium">
          <Award className="w-5 h-5 flex-shrink-0" />
          <span>New members receive <strong>+100 welcome reputation points</strong> to jumpstart participation!</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {error && (
            <div className="p-3 rounded-xl bg-error/15 border border-error/30 text-error text-xs">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 rounded-xl bg-secondary/15 border border-secondary/30 text-secondary text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Account created successfully! Welcome to AskHive...
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                placeholder="e.g. Anjali Gupta"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-surface-container border border-surface-container-highest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">
              Username
            </label>
            <div className="relative">
              <AtSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""));
                  setError("");
                }}
                placeholder="anjali_gupta"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-surface-container border border-surface-container-highest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-mono text-xs"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="anjali@askhive.dev"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-surface-container border border-surface-container-highest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">
              Password (min. 8 characters)
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface-container border border-surface-container-highest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-primary to-primary-container text-surface hover:brightness-110 font-bold shadow-md cursor-pointer flex items-center justify-center gap-2 mt-3"
          >
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        {/* OAuth options */}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-surface-container border border-surface-container-highest hover:bg-surface-container-high text-xs text-on-surface font-medium transition-colors"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </Link>
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-surface-container border border-surface-container-highest hover:bg-surface-container-high text-xs text-on-surface font-medium transition-colors"
          >
            <span className="font-bold text-tertiary">G</span>
            <span>Google</span>
          </Link>
        </div>

        {/* Footer Link */}
        <div className="mt-6 text-center text-xs text-outline">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline font-semibold">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
