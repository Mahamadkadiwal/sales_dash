"use client";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { CiShoppingCart } from "react-icons/ci";
import { GoInbox } from "react-icons/go";
import { usePathname } from "next/navigation";
import { useSidebarContext } from "../provider/sidebarProvider";
import { ReactNode } from "react";

type MenuItem = {
  name: string;
  icon: ReactNode;
  link: string;
}
export default function Sidebar() {
  const {isOpen, setIsOpen, toggleSidebar } =useSidebarContext();
    const path = usePathname();
    
    const menu: MenuItem[] = [
        {name: "Dashboard", icon: <AiOutlineDashboard />, link: "/dashboard"},
        {name: "Orders", icon: <CiShoppingCart />, link: "/dashboard/orders"},
        {name: "Products", icon: <GoInbox />, link: "/dashboard/products"},
    ];
  return (
    <div className="sidebar">
      <div className="fixed opacity-50 z-40"></div>
      <div className="md:hidden fixed top-4 left-4">

      </div>

      <aside className={`fixed top-0 left-0 h-full transition-all   duration-300 z-50 w-60 bg-(--sidebar-bg) text-(--sidebar-text) ${isOpen ? "open": ""} `} style={{ width: isOpen ? "15rem" : "3rem" }}>
        <div className="flex items-center justify-between p-2">
            <div className="text-lg font-semibold transition-opacity duration-300">
                
                <div className="flex items-center justify-between space-x-25 mt-2">
                  <div className="p-2 rounded-md hover:shadow-lg transition ease-in-out duration-300">
                    {isOpen ? <h2 className="text-2xl text-(--font-color)">SD</h2> : 
                
                    <i className="text-2xl text-(--font-color) cursor-pointer" onClick={toggleSidebar}><FaArrowLeft /></i>}
                  </div>

                  <div className="p-2 rounded-md hover:shadow-lg transition ease-in-out duration-300">
                    {isOpen &&
                        <i className="text-2xl  text-(--font-color) cursor-pointer" onClick={toggleSidebar}><FaArrowLeft /></i>
                    }
                  </div>
                </div>
            </div>
        </div>

        <nav className="relative m-2">
            {menu.map((item, index) => (
                <Link href={item.link} key={index} className= {`mb-2 sidebar-link ${path === item.link ? "active" : ""}`} >
                    <i className={`text-xl`}>{item.icon}</i>
                    {isOpen &&<span>{item.name}</span>}
                </Link>
            ))}
        </nav>
      </aside>
    </div>
  );
}
