"use client";
import { RegisterFormInputs, registerSchema } from "@/app/Schema/SignUp";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import Input from "../../_component/Input";
import { saveUser } from "../../_lib/localStorage";

export default function SignUp() {
  const router = useRouter();

  const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm<RegisterFormInputs>({
      resolver: zodResolver(registerSchema),
      defaultValues: {
        username: '',
        email: '',
        password: '',
        role: 'user',
      },
    });

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    try {
      saveUser(data);
      toast.success('User registered successfully!');
      if(data.role === "admin"){
         router.push("/dashboard");
      } else{
        router.push("/userHome");
      }
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
    <div className="min-h-screen  from-gray-50 via-white to-gray-100 flex items-center justify-center p-4">
      

      <div className="relative w-full max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-0">

          <div className="hidden lg:flex flex-col justify-center p-12 bg-linear-to-br from-(--primary-btn) to-(--secondary-btn) rounded-l-2xl text-white">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <span className="text-sm font-semibold">Sales Dashboard</span>
                </div>
                
                <h2 className="text-4xl font-bold leading-tight">
                  Welcome to the Future of Sales Management
                </h2>
                
                <p className="text-lg text-white/90">
                  Join thousands of businesses streamlining their sales operations with our powerful platform.
                </p>
              </div>

              

              
            </div>
          </div>

          <div className="bg-white rounded-2xl lg:rounded-l-none lg:rounded-r-2xl shadow-2xl p-8 md:p-12">
            <div className="space-y-8">
              
              <div className="lg:hidden text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full border border-(--border-color)">
                  <span className="text-sm font-semibold text-(--font-color)">Sales Dashboard</span>
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-(--font-color)">
                  Create Your Account
                </h1>
                <p className="text-gray-600">
                  Get started with your free account today
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  type="text"
                  {...register("username")}
                  error={errors.username?.message}
                  label="Username"
                  id="username"
                  placeholder="Enter your username"
                  className="w-full"
                  disabled={isSubmitting}
                />

                <Input
                  type="email"
                  {...register("email")}
                  error={errors.email?.message}
                  label="Email Address"
                  id="email"
                  placeholder="you@example.com"
                  className="w-full"
                  disabled={isSubmitting}
                />

                <Input
                  type="password"
                  {...register("password")}
                  error={errors.password?.message}
                  label="Password"
                  id="password"
                  placeholder="Create a strong password"
                  className="w-full"
                  disabled={isSubmitting}
                />

                {/* Role Selection - Improved Design */}
                <div className="space-y-2">
                  <label htmlFor="role" className="block text-sm font-semibold text-(--font-color)">
                    Select Your Role
                  </label>
                  <select
                    id="role"
                    {...register("role")}
                    disabled={isSubmitting}
                    className="w-full input-field"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full primary-btn text-white p-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Creating Account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <div className="text-center pt-6 border-t border-(--border-color)">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link 
                    href="/auth/signIn" 
                    className="text-(--primary-btn) font-semibold hover:text-(--secondary-btn) transition-colors"
                  >
                    Sign In
                  </Link>
                </p>
              </div>

              <p className="text-xs text-center text-gray-500">
                By creating an account, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}