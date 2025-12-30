"use client";

import { useEffect } from "react";
import HeaderUser from "../_component/HeaderUser";
import { getCurrentUser } from "../_lib/localStorage";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/app/_component/ProtectedRoute";

export default function layout({children}) {

  const router = useRouter();
  
    useEffect(() => {
      const user = getCurrentUser();
  
      if(!user){
        router.replace('/auth/signIn');
      }
    },[router]);

  return (
    <>
    <ProtectedRoute role="user">
    <HeaderUser />

    <main className="pt-16 transition-all duration-300 ">
        {children} </main>
    </ProtectedRoute>
    </>
  )
}
