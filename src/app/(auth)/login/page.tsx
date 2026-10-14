"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  User,
  AtSign,
  Award,
  Eye,
  EyeOff,
  CheckCircle2,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore, PRESET_USERS } from "@/stores/auth-store";

function AuthCardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedMode = searchParams.get("mode");

  const { isAuthenticated, login, register, switchUser, loginAsGuest } = useAuthStore();

  // Default to register mode if explicitly specified or if visiting first time
  const [mode, setMode] = useState<"login" | "register">(
    requestedMode === "login" ? "login" : "register"
  );

  // Sync mode with query parameter if present
  useEffect(() => {
    if (requestedMode === "login") {
      setMode("login");
    } else if (requestedMode === "register" || requestedMode === "signup") {
      setMode("register");
    }
  }, [requestedMode]);

  // If already authenticated, redirect to home immediately
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  // Form states
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email or username");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    login(email, password);
    setSuccess(true);
    setTimeout(() => {
      router.push("/");
    }, 600);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (name.trim().length < 2) {
      setError("Please enter your full or display name");
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
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    register(name.trim(), username.trim().toLowerCase(), email.trim());
    setSuccess(true);
    setTimeout(() => {
      router.push("/");
    }, 600);
  };

  const handleQuickLogin = (key: keyof typeof PRESET_USERS) => {
    setError("");
    switchUser(key);
    setSuccess(true);
    setTimeout(() => {
      router.push("/");
    }, 500);
  };

  const handleGuestLogin = () => {
    setError("");
    loginAsGuest();
    setSuccess(true);
    setTimeout(() => {
      router.push("/");
    }, 500);
  };

  return (
    <div className="w-full max-w-md rounded-3xl bg-surface-container-low/90 border border-white/10 shadow-2xl p-6 sm:p-8 relative z-10 backdrop-blur-2xl">
      {/* Brand Header */}
      <div className="text-center mb-5">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-3 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center text-surface shadow-lg group-hover:scale-105 transition-transform duration-200">
            <span className="text-2xl font-black">🐝</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-on-surface">
            Ask<span className="text-primary font-extrabold">Hive</span>
          </span>
        </Link>
        <h1 className="text-xl sm:text-2xl font-black text-on-surface tracking-tight">
          {mode === "register" ? "Create your AskHive Account" : "Welcome Back"}
        </h1>
        <p className="text-xs sm:text-sm text-outline mt-1">
          {mode === "register"
            ? "Sign up to join developer discussions, vote, and earn badges"
            : "Sign in to access your threads, reputation, and AI synthesis"}
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="grid grid-cols-2 p-1 bg-surface-container rounded-2xl mb-5 border border-surface-container-highest">
        <button
          type="button"
          onClick={() => {
            setMode("register");
            setError("");
          }}
          className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            mode === "register"
              ? "bg-primary text-surface shadow-md"
              : "text-outline hover:text-on-surface"
          }`}
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Sign Up</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("login");
            setError("");
          }}
          className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            mode === "login"
              ? "bg-primary text-surface shadow-md"
              : "text-outline hover:text-on-surface"
          }`}
        >
          <LogIn className="w-3.5 h-3.5" />
          <span>Log In</span>
        </button>
      </div>

      {/* Quick Demo Login Preset Buttons */}
      <div className="mb-5 p-3 rounded-2xl bg-surface-container/70 border border-surface-container-highest">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-outline font-semibold">
            ⚡ 1-Click Demo Profiles:
          </span>
          <span className="text-[10px] text-secondary font-mono">No typing required</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleQuickLogin("anjali")}
            type="button"
            className="px-2.5 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-left text-xs transition-colors cursor-pointer border border-primary/40 shadow-sm flex flex-col"
          >
            <span className="font-bold text-primary flex items-center gap-1">
              Anjali Gupta <Sparkles className="w-3 h-3 text-secondary" />
            </span>
            <span className="text-[10px] text-outline font-mono">anjali_gupta (1.5k rep)</span>
          </button>

          <button
            onClick={() => handleQuickLogin("alex")}
            type="button"
            className="px-2.5 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-left text-xs transition-colors cursor-pointer border border-surface-container-highest flex flex-col"
          >
            <span className="font-bold text-on-surface flex items-center gap-1">
              alex_dev <ShieldCheck className="w-3 h-3 text-secondary" />
            </span>
            <span className="text-[10px] text-outline font-mono">Moderator (12.4k)</span>
          </button>
        </div>
        <button
          onClick={handleGuestLogin}
          type="button"
          className="w-full mt-2 py-1.5 rounded-xl bg-surface-container-highest/60 hover:bg-surface-container-highest text-xs text-on-surface-variant font-medium transition-colors text-center cursor-pointer"
        >
          Continue as Guest Explorer →
        </button>
      </div>

      {/* Bonus Banner for Sign Up */}
      {mode === "register" && (
        <div className="mb-4 p-2.5 rounded-xl bg-secondary/10 border border-secondary/30 flex items-center gap-2 text-xs text-secondary font-medium">
          <Award className="w-4 h-4 flex-shrink-0" />
          <span>New developers receive <strong>+100 reputation points</strong> upon sign up!</span>
        </div>
      )}

      {/* Divider */}
      <div className="relative flex py-1 items-center mb-4">
        <div className="flex-grow border-t border-surface-container-high"></div>
        <span className="flex-shrink mx-3 text-[11px] font-mono text-outline uppercase">
          or continue with details
        </span>
        <div className="flex-grow border-t border-surface-container-high"></div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="mb-4 p-3 rounded-xl bg-error/15 border border-error/30 text-error text-xs">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 rounded-xl bg-secondary/15 border border-secondary/30 text-secondary text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{mode === "register" ? "Account created successfully!" : "Authentication successful!"} Redirecting...</span>
        </div>
      )}

      {/* SIGN UP FORM */}
      {mode === "register" && (
        <form onSubmit={handleRegisterSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">
              Display Name
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
                  setUsername(e.target.value);
                  setError("");
                }}
                placeholder="anjali_dev"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-surface-container border border-surface-container-highest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-mono text-xs"
              />
            </div>
          </div>

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
                placeholder="you@example.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-surface-container border border-surface-container-highest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">
              Password
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
                placeholder="At least 6 characters"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface-container border border-surface-container-highest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-mono text-xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-primary to-primary-container text-surface hover:brightness-110 font-bold shadow-md cursor-pointer flex items-center justify-center gap-2 mt-3"
          >
            <span>Create Account & Enter</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>
      )}

      {/* LOG IN FORM */}
      {mode === "login" && (
        <form onSubmit={handleLoginSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">
              Email or Username
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="anjali@askhive.dev or username"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-surface-container border border-surface-container-highest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-on-surface">Password</label>
              <button
                type="button"
                onClick={() => handleQuickLogin("anjali")}
                className="text-xs text-primary hover:underline font-mono"
              >
                Use demo password?
              </button>
            </div>
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
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface-container border border-surface-container-highest text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-mono text-xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-primary to-primary-container text-surface hover:brightness-110 font-bold shadow-md cursor-pointer flex items-center justify-center gap-2 mt-3"
          >
            <span>Sign In to AskHive</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>
      )}

      {/* Toggle link below form */}
      <div className="mt-5 text-center text-xs text-outline">
        {mode === "register" ? (
          <>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError("");
              }}
              className="text-primary hover:underline font-semibold cursor-pointer"
            >
              Log In here
            </button>
          </>
        ) : (
          <>
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setError("");
              }}
              className="text-primary hover:underline font-semibold cursor-pointer"
            >
              Sign Up now
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Background radial glow */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <Suspense fallback={<div className="w-full max-w-md h-96 rounded-3xl bg-surface-container-low/50 animate-pulse" />}>
        <AuthCardContent />
      </Suspense>
    </div>
  );
}
