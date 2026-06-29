"use client";

import { useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";
import { DEMO_USERS } from "@/constants/demo-users";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RoleTabs } from "./role-tabs";
import { AuthInput } from "./auth-input";
import { User, Lock } from "lucide-react";

const loginSchema = z.object({
  emailOrUsername: z.string().min(1, "Email or Username is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [role, setRole] = useState<"USER" | "ADMIN">("USER");
  const [globalError, setGlobalError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailOrUsername: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setGlobalError("");
    console.log("Login Payload:", { role, ...data });

    // Mock Authentication Logic
    const user = DEMO_USERS.find(
      (u) => u.email === data.emailOrUsername || u.name === data.emailOrUsername
    );
    
    if (user) {
      if (role === "ADMIN" && user.role !== "admin") {
        setGlobalError("You do not have Admin privileges.");
        return;
      }
      login(user.email);
      router.push("/dashboard");
    } else {
      setGlobalError("Invalid credentials. Use a demo account.");
    }
  };

  return (
    <div className='w-full flex items-center justify-center bg-[#0f0f0f] text-white p-4 font-inter py-12 min-h-screen'>
      <div className='bg-[#111] border border-[#1e1e1e] rounded-[10px] w-full max-w-[600px] p-8 md:p-12 relative overflow-hidden'>
        
        {/* Title */}
        <h1 className='text-center font-bebas text-[32px] tracking-[1.6px] uppercase mb-10'>
          Log In
        </h1>

        {/* Role Selection Tabs */}
        <RoleTabs role={role} setRole={setRole} />

        {/* Form Container */}
        <div className='mt-10'>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
            {globalError && (
              <div className='text-red-500 text-sm bg-red-500/10 p-3 rounded'>
                {globalError}
              </div>
            )}

            <AuthInput
              label='EMAIL OR USERNAME'
              placeholder='Enter your email or username'
              icon={<User size={16} />}
              error={errors.emailOrUsername?.message}
              {...register("emailOrUsername")}
            />

            <div>
              <div className='flex justify-between items-center mb-[5px]'>
                <label className='font-inter font-medium text-[#555] text-[10px] tracking-[0.8px] uppercase'>
                  PASSWORD
                </label>
                <Link href='#' className='font-inter font-medium text-[#d72322] text-[10px] tracking-[0.8px] uppercase hover:underline'>
                  FORGOT PASSWORD?
                </Link>
              </div>
              <AuthInput
                type='password'
                placeholder='Enter your password'
                icon={<Lock size={16} />}
                error={errors.password?.message}
                {...register("password")}
              />
            </div>

            <div className='flex items-center gap-2 mt-[-5px]'>
              <input
                type='checkbox'
                id='rememberMe'
                className='accent-[#d72322] w-4 h-4 bg-[#1a1a1a] border-[#1e1e1e] rounded'
                {...register("rememberMe")}
              />
              <label htmlFor='rememberMe' className='text-[#555] text-sm cursor-pointer'>
                Remember me for 30 days
              </label>
            </div>

            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full bg-[#d72322] hover:bg-[#b01c1c] text-white font-inter font-bold text-sm uppercase py-4 rounded-[8px] transition-colors mt-2'>
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className='flex items-center gap-4 my-8'>
            <div className='h-[1px] flex-1 bg-[#1e1e1e]' />
            <span className='text-[#555] text-[10px] uppercase tracking-[0.8px]'>OR</span>
            <div className='h-[1px] flex-1 bg-[#1e1e1e]' />
          </div>

          <div className='flex flex-col gap-4'>
            <button className='w-full flex items-center justify-center gap-3 bg-[#1a1a1a] hover:bg-[#222] border border-[#1e1e1e] text-[#ccc] py-3 rounded-[8px] transition-colors text-sm font-medium'>
              <i className="fa-brands fa-google text-blue-400 text-lg"></i>
              Continue with Google
            </button>
            <button className='w-full flex items-center justify-center gap-3 bg-[#1a1a1a] hover:bg-[#222] border border-[#1e1e1e] text-[#ccc] py-3 rounded-[8px] transition-colors text-sm font-medium'>
              <i className="fa-brands fa-facebook text-blue-600 text-lg"></i>
              Continue with Facebook
            </button>
          </div>

          <div className='text-center mt-8 text-[#555] text-sm font-medium'>
            Don&apos;t have an account?{" "}
            <Link href='/signup' className='text-[#d72322] hover:underline'>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
