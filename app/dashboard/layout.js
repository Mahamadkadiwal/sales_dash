"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "../_component/Header";
import Sidebar from "../_component/Sidebar";
import { getCurrentAdmin } from "../_lib/localStorage";
import { useSidebarContext } from "../provider/sidebarProvider";
import ProtectedRoute from "@/app/_component/ProtectedRoute";

export default function Layout({ children }) {
  const router = useRouter();
  const { isOpen } = useSidebarContext();

  useEffect(() => {
    const admin = getCurrentAdmin();
    if (!admin) router.replace("/auth/signIn");
  }, [router]);

  return (
    <ProtectedRoute role="admin">
      <Header />
      <Sidebar />

      <main
        className={`
        pt-16 transition-all duration-300
        ${isOpen ? "md:pl-60 pl-12" : "md:pl-16 pl-12"}
      `}
      >
        {children}
      </main>
    </ProtectedRoute>
  );
}
