"use client";
import UserProfileCard from "@/app/_component/UserProfileCard";
import UserProfileForm from "@/app/_component/UserProfileForm";
import { getCurrentAdmin, updateAllUsers } from "@/app/_lib/localStorage";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import PageHeader from "../../_component/PageHeader";

export default function Page() {
   const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  // Load admin ONCE
  useEffect(() => {
    const admin = getCurrentAdmin();
    if (!admin) return;

    setFormData({
      username: admin.username ?? "",
      email: admin.email ?? "",
    });
  }, []);

  const handleChange = useCallback(
    (field: "username" | "email", value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleCancel = () => {
    const admin = getCurrentAdmin();
    if (!admin) return;

    setFormData({
      username: admin.username ?? "",
      email: admin.email ?? "",
    });

    toast.success("Changes discarded");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const admin = getCurrentAdmin();
      if (!admin) throw new Error("No admin session");

      const updatedAdmin = {
        ...admin,
        username: formData.username,
        email: formData.email,
      };

      localStorage.setItem("currentAdmin", JSON.stringify(updatedAdmin));
      updateAllUsers(admin, updatedAdmin);

      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-full">
        <PageHeader title="Account Settings" />

        <div className="mt-6 grid md:grid-cols-3 gap-6">
         
          <div className="md:col-span-1 space-y-6">
            
            <UserProfileCard
              username={formData.username}
              email={formData.email}
              role="admin"
            />

            
          </div>

          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-md border border-(--border-color) p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-2xl text-(--font-color) mb-2">
                  Profile Information
                </h2>
                <p className="text-gray-600 text-sm">
                  Update your account information and email address
                </p>
              </div>

              <UserProfileForm
                formData={formData}
                isSubmitting={isSubmitting}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}