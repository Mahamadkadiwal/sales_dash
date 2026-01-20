import { CiSearch } from "react-icons/ci";
import Profile from "./Profile";
import Link from "next/link";

export default function HeaderUser() {
  return (
    <header className="fixed top-0 h-16 z-50 flex items-center justify-between bg-(--header-bg) text-(--text-color) transition-all duration-300 px-4 w-full">
        <div className="flex m-3">
            <h1 className="text-xl font-semibold text-(--font-color) truncate">Sales User</h1>
        </div>
        <div className="flex items-center space-x-4 m-3">
            <Link href="/userHome">Product</Link>
            <Link href="/userHome/order">Orders</Link>
        </div>
        <div className="flex items-center space-x-4 m-3">
           
            <Profile user="user" />
        </div>

        
    </header>
  )
}
