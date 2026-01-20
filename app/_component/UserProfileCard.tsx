import React from 'react'
import { BsShieldCheck } from 'react-icons/bs'
import { FaUserCircle } from 'react-icons/fa'

export interface UserProfileCardProps {
  username: string;
  email: string;
  role?: "admin" | "user";
}

export default function UserProfileCard({
  username,
  email,
  role = "admin",
}: UserProfileCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-(--border-color) p-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-linear-to-br from-(--primary-btn) to-(--secondary-btn) rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <FaUserCircle className="text-white text-5xl" />
                </div>
                <h3 className="text-xl font-bold text-(--font-color) mb-1">
                  {username || "Admin User"}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{email}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-linear-to-r from-(--primary-btn)/10 to-(--secondary-btn)/10 rounded-full border border-(--primary-btn)/20">
                  <BsShieldCheck className="text-(--primary-btn)" />
                  <span className="text-xs font-semibold text-(--font-color)">
                    {role === "admin" ? "Administrator" : "User"}
                  </span>
                </div>
              </div>
            </div>
  )
}
