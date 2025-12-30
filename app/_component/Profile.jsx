"use client";

import { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { getCurrentAdmin, getCurrentUser } from "../_lib/localStorage";
import {useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Profile = ({user = ""}) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchUser = () => {
    if(user === "user"){
      const user = getCurrentUser();
      if(user){
        setCurrentUser(user);
      }
    }
    else if(user === "admin"){
      const admin = getCurrentAdmin();
      if(admin) setCurrentUser(admin);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [])


  const handleLogout = () => {
    if(user === "user"){
      localStorage.removeItem("currentUser");
      
    } else if(user === "admin"){
      localStorage.removeItem("currentAdmin")
    }
    toast.success("Logged out successfully");
    router.push("/auth/signIn");
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div>
      <button
        onClick={toggleDropdown}
        className="flex items-center focus:outline-none"
        aria-label="Open Profile Menu"
      >
        <div className="w-10 h-10 mr-2 rounded-full flex items-center justify-center font-bold text-lg shadow-md  hover:scale-105 transition-transform duration-300 overflow-hidden">
          <i className="text-2xl text-(--font-color)"><CiUser /></i>
        </div>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-3 mr-2 w-52 bg-white rounded-md shadow-lg border border-(--border-color) z-50 animate-fade-in">
          <div className="px-4 py-3 text-center border-b border-(--border-color)">
            <p className="text-sm font-semibold text-(--font-color)">
              {currentUser ? currentUser.username : "guest"}
            </p>
            <p className="text-xs text-(--font-color)">
              {currentUser ? currentUser.email : "guest@example.com"}
            </p>
          </div>

          <ul className="py-2">
            <li>
              <a
                href="/adminprofile"
                className="flex items-center px-4 py-2 text-sm text-(--font-color) hover:bg-(--bg-btn-hover)"
                onClick={(e) => {
                  e.preventDefault();
                  setIsDropdownOpen(false);
                }}
              >Profile</a>
            </li>
            <li>
              <button onClick={handleLogout} className="w-full flex items-center px-4 py-2 text-sm text-(--font-color) hover:bg-(--bg-btn-hover) ">
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
