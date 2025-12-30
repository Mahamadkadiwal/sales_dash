"use client";
import { Users } from "@/app/_types/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from 'react-hot-toast';
import Input from "../../_component/Input";
import { saveUser } from "../../_lib/localStorage";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState<Users>({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    
    
    if(!formData.username || !formData.email || !formData.password){
        alert("Please fill in all fields");
        return;
    }

    try {
      saveUser(formData);
      toast.success('User registered successfully!');
      if(formData.role === "admin"){
        localStorage.setItem("currentAdmin", JSON.stringify(formData));
        router.push("/dashboard");
      } else{
        localStorage.setItem("currentUser", JSON.stringify(formData));
        router.push("/userHome");
      }
      // alert("User registered successfully!");
      setFormData({
        username: "",
        email: "",
        password: "",
        role: "user",
      });
    } catch (error: unknown) {
      if(error instanceof Error){
        toast.error(error.message);
        return;
      } else{
        toast.error("An unknown error occurred");
        return;
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 md:p-8 space-y-6">
        <h1 className="text-2xl font-bold text-(--font-color) text-center">
          Sign Up
        </h1>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <Input
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            label="Username"
            id="username"
            placeholder="Username"
            className="w-full border p-2 rounded"
          />

          <Input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            label="Email"
            id="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
          />

          <Input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            label="Password"
            id="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
          />

          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as "user" | "admin" })}
            className="input-field"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="w-full bg-(--primary-btn) hover:bg-(--secondary-btn) text-white p-2 rounded font-semibold transition"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center text-(--font-color)">
          <Link href="/auth/signIn">Already have an account?</Link>
        </div>
      </div>
    </div>
  );
}
