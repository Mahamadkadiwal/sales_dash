"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCurrentAdmin, getCurrentUser } from "../_lib/localStorage";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: "admin" | "user";
}

export default function ProtectedRoute({
  children,
  role,
}: ProtectedRouteProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const admin = getCurrentAdmin();
    const user = getCurrentUser();

    if (role === "admin" && admin) {
      setIsAuthorized(true);
    } else if (role === "user" && user) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
      router.replace("/auth/signIn");
    }
  }, [role, router]);

  if (isAuthorized === null) return null;

  return <>{children}</>;
}
