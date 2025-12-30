"use client";
import { FormEvent, useState } from "react";
import Input from "../../_component/Input";
import { authenticateUser } from "../../_lib/localStorage";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { Users } from "@/app/_types/user";

export default function SignIn(){
    const router = useRouter();
    const [formData, setFormData] = useState<Omit<Users, "id" | "username">>({
        email: "",
        password: "",
        role: "user",
    });

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!formData.email || !formData.password){
            alert("Please fill in all fields");
            return;
        }
        try {
           const user = authenticateUser(formData as Users);
           toast.success('User logged in successfully!');
           if(user.role === "admin"){
            router.push("/dashboard");
           } else{
            router.push("/userHome");
           }
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unknown error occurred");
            }
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-6">
              <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 md:p-8 space-y-6">
                <h1 className="text-2xl font-bold text-(--font-color) text-center">
                  Sign In
                </h1>
        
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  
        
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
                    Sign In
                  </button>
                </form>
                <div className="text-center text-(--font-color)">
                  <Link href="/auth/signUp">Don&apos;t have an account?</Link>
                </div>
              </div>
            </div>
    )
}