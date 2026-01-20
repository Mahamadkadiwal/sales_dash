"use client";
import UserProfileCard from "@/app/_component/UserProfileCard";
import UserProfileForm from "@/app/_component/UserProfileForm";
import { getCurrentUser, updateAllUsers } from "@/app/_lib/localStorage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PageHeader from "../../_component/PageHeader";

export default function Page() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      setFormData({
        username: userData.username || "",
        email: userData.email || "",
      });
    } else {
      router.push("/auth/signIn");
    }
  }, []);

  const handleChange = (
    field: "username" | "email",
    value: string
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    setFormData({
      username: user.username ?? "",
      email: user.email ?? "",
    });
    toast.success("Changes discarded");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const userData = getCurrentUser();
      if (!userData) {
        throw new Error("No user session found");
      }

      const updatedUser = {
        ...userData,
        username: formData.username,
        email: formData.email,
      };

      // update the localstorage current user
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      // update in all users
      updateAllUsers(userData, updatedUser);

      toast.success("Settings updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update settings");
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
              role="user"
            />

            
          </div>

          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-md border border-(--border-color) p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-(--font-color) mb-2">
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