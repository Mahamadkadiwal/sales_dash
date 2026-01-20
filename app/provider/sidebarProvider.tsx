// provider/sidebarProvider.tsx
"use client";
import { createContext, useContext, useState } from "react";

type SidebarContextType = {
  isOpen: boolean;                 
  toggleSidebar: () => void;
  mobileMenuOpen: boolean;         
  setMobileMenuOpen: (v: boolean) => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(prev => !prev);

  return (
    <SidebarContext.Provider
      value={{ isOpen, toggleSidebar, mobileMenuOpen, setMobileMenuOpen }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebarContext() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("SidebarContext missing");
  return ctx;
}
