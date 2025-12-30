"use client";
import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();
const SidebarProvider = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen); 
  return (
    <SidebarContext.Provider value={{isOpen,setIsOpen,  toggleSidebar}}>
        {children}
    </SidebarContext.Provider>
  );
}

function useSidebarContext(){
    const context = useContext(SidebarContext);
    if(context === undefined){
        throw new Error("useSidebarContext must be used within a SidebarProvider");
    }
    return context;
}

export {SidebarProvider, useSidebarContext};
