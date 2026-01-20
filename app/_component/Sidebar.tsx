"use client";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { CiShoppingCart } from "react-icons/ci";
import { GoInbox } from "react-icons/go";
import { usePathname } from "next/navigation";
import { useSidebarContext } from "../provider/sidebarProvider";
import { ReactNode } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { handleLogoutAdmin } from "../_lib/localStorage";

type MenuItem = {
  name: string;
  icon: ReactNode;
  link: string;
};

export default function Sidebar() {
  const router = useRouter();
  const { isOpen, toggleSidebar } = useSidebarContext();
  const path = usePathname();

  const menu: MenuItem[] = [
    { name: "Dashboard", icon: <AiOutlineDashboard />, link: "/dashboard" },
    { name: "Orders", icon: <CiShoppingCart />, link: "/dashboard/orders" },
    { name: "Products", icon: <GoInbox />, link: "/dashboard/products" },
  ];

  const handleLogout = () => {
    handleLogoutAdmin();
    toast.success("Logged out successfully");
    router.replace("/auth/signIn");
  }

  return (
    <>
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="md:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-50
          bg-(--sidebar-bg) text-(--sidebar-text)
          transition-all duration-300
          flex flex-col
          shadow-lg
          ${isOpen ? "w-60" : "w-12 md:w-16"}
        `}
      >

        <div className="flex items-center justify-between p-3">
          {isOpen ? (
            <h2 className="text-2xl text-(--font-color)">SD</h2>
          ) : (
            <span className="text-(--font-color) text-xl font-bold">S</span>
          )}

          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-200 transition"
          >
            <FaArrowLeft
              className={`text-(--font-color) transition-transform duration-300 ${
                isOpen ? "" : "rotate-180"
              }`}
            />
          </button>
        </div>

        <nav className="flex-1 mt-4 px-2 space-y-2">
          {menu.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className={`flex items-center gap-3 px-3 py-2 rounded-md sidebar-link ${
                path === item.link ? "active bg-gray-200" : ""
              }`}
            >
              <i className="text-xl">{item.icon}</i>
              {isOpen && <span>{item.name}</span>}
            </Link>
          ))}

          
        </nav>
        <div className="px-2 pb-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-md sidebar-link w-full text-left"
        >
          <i className="text-xl">
            <FaArrowLeft />
          </i>
          {isOpen && <span>Logout</span>}
        </button>
          </div>
      </aside>
    </>
  );
}
