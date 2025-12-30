import { useSidebarContext } from "../provider/sidebarProvider";
import Profile from "./Profile";
import { CiSearch } from "react-icons/ci";

export default function Header() {
  const {isOpen} = useSidebarContext();
  return (
    <header className={`fixed top-0 h-16 z-50 flex items-center justify-between bg-(--header-bg) text-(--text-color) transition-all duration-300 px-4 ${isOpen ? "left-60 w-[calc(100%-15rem)]" : "left-12 w-[calc(100%-3rem)]"}`}>
        <div className="flex m-3">
            <h1 className="text-xl font-semibold text-(--font-color) truncate">Sales Dashboard</h1>
        </div>

        <div className="flex items-center space-x-4 m-3">
            <i className="text-2xl text-(--font-color)"><CiSearch /></i>
            <Profile user="admin" />
        </div>
    </header>
  )
}
