// src/components/auth-redirect.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "store/store";

export const AuthRedirect = () => {
  const router = useRouter();
  const { user } = useStore();

  useEffect(() => {
    // Redirect to login if not authenticated
    const isAuthenticated = user && user.email;
    
    if (!isAuthenticated) {
      router.push("/event_type/page");
    }
  }, [user, router]);

  return null;
};