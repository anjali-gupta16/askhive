"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthPortal } from "@/components/auth/auth-portal";
import { useAuthStore } from "@/stores/auth-store";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  return <AuthPortal defaultMode="login" onSuccess={() => router.push("/")} />;
}
