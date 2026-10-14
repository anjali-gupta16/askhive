"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the unified auth portal with register / sign up mode active
    router.replace("/login?mode=register");
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden font-sans">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="flex flex-col items-center gap-4 z-10 text-center">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center text-3xl shadow-2xl animate-bounce">
          🐝
        </div>
        <div>
          <h2 className="text-xl font-black text-on-surface tracking-tight">
            Ask<span className="text-primary">Hive</span>
          </h2>
          <p className="text-xs text-outline font-mono mt-1 flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            Loading Sign Up portal...
          </p>
        </div>
      </div>
    </div>
  );
}
