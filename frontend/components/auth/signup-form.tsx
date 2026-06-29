"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RoleTabs } from "./role-tabs";
import { AuthInput } from "./auth-input";
import { User, Mail, Lock, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain one uppercase letter")
    .regex(/[0-9]/, "Must contain one number")
    .regex(/[^A-Za-z0-9]/, "Must contain one special character"),
  confirmPassword: z.string(),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept terms and conditions" }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function SignupForm() {
  const router = useRouter();
  const [role, setRole] = useState<"USER" | "ADMIN">("USER");
  const [globalError, setGlobalError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const watchPassword = watch("password");

  const passwordChecks = [
    { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
    { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
    { label: "One number", test: (p: string) => /[0-9]/.test(p) },
    { label: "One special character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
  ];

  const onSubmit = async (data: RegisterFormValues) => {
    setGlobalError("");
    console.log("Register Payload:", { role, ...data });

    // Mock API call simulation
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // For now, redirect to login after successful mock registration
      router.push("/login");
    } catch (err) {
      setGlobalError("Registration failed. Please try again.");
    }
  };

  return (
    <div className='w-full flex items-center justify-center bg-[#0f0f0f] text-white p-4 font-inter py-12 min-h-screen'>
      <div className='bg-[#111] border border-[#1e1e1e] rounded-[10px] w-full max-w-[600px] p-8 md:p-12 relative overflow-hidden'>
        
        {/* Title */}
        <h1 className='text-center font-bebas text-[32px] tracking-[1.6px] uppercase mb-10'>
          Sign Up
        </h1>

        {/* Role Selection Tabs */}
        <RoleTabs role={role} setRole={setRole} />

        {/* Step Indicator */}
        <div className='flex items-center justify-center mt-10 mb-8'>
          <div className='flex items-center w-full max-w-[300px]'>
            <div className='flex flex-col items-center flex-1'>
              <div className='w-2 h-2 rounded-full bg-white mb-2' />
              <span className='text-[10px] font-inter uppercase text-white tracking-[0.8px]'>Account</span>
            </div>
            <div className='flex-[2] h-[1px] bg-[#1e1e1e] -mt-5 mx-2' />
            <div className='flex flex-col items-center flex-1'>
              <div className='w-2 h-2 rounded-full bg-[#333] mb-2' />
              <span className='text-[10px] font-inter uppercase text-[#555] tracking-[0.8px]'>Profile</span>
            </div>
            <div className='flex-[2] h-[1px] bg-[#1e1e1e] -mt-5 mx-2' />
            <div className='flex flex-col items-center flex-1'>
              <div className='w-2 h-2 rounded-full bg-[#333] mb-2' />
              <span className='text-[10px] font-inter uppercase text-[#555] tracking-[0.8px]'>Verify</span>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className='mt-2'>
          <h2 className='font-bebas text-[20px] tracking-[1px] uppercase mb-1'>CREATE ACCOUNT</h2>
          <p className='text-[#555] text-xs font-inter mb-6'>Step 1 of 3 — Account details</p>

          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
            {globalError && (
              <div className='text-red-500 text-sm bg-red-500/10 p-3 rounded'>
                {globalError}
              </div>
            )}

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <AuthInput
                label='FIRST NAME'
                placeholder='First name'
                icon={<User size={16} />}
                error={errors.firstName?.message}
                {...register("firstName")}
              />
              <AuthInput
                label='LAST NAME'
                placeholder='Last name'
                error={errors.lastName?.message}
                {...register("lastName")}
              />
            </div>

            <div>
              <AuthInput
                label='USERNAME'
                placeholder='Choose a username'
                icon={<span className="font-semibold text-lg pb-1">@</span>}
                error={errors.username?.message}
                {...register("username")}
              />
              {!errors.username && watch("username").length >= 3 && (
                <span className="text-green-500 text-[10px] font-inter mt-1 inline-block">Available</span>
              )}
            </div>

            <AuthInput
              label='EMAIL ADDRESS'
              type='email'
              placeholder='Your email address'
              icon={<Mail size={16} />}
              error={errors.email?.message}
              {...register("email")}
            />

            <div>
              <AuthInput
                label='PASSWORD'
                type='password'
                placeholder='Create a password'
                icon={<Lock size={16} />}
                error={errors.password?.message && ""}
                {...register("password")}
              />
              
              {/* Password Strength Checklist */}
              <div className='mt-3 flex flex-col gap-[6px] pl-1'>
                {passwordChecks.map((check, idx) => {
                  const passed = watchPassword ? check.test(watchPassword) : false;
                  return (
                    <div key={idx} className='flex items-center gap-2'>
                      <Check size={12} className={passed ? "text-green-500" : "text-[#555]"} strokeWidth={passed ? 3 : 2} />
                      <span className={cn("text-[11px] font-inter", passed ? "text-[#ccc]" : "text-[#555]")}>
                        {check.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <AuthInput
              label='CONFIRM PASSWORD'
              type='password'
              placeholder='Confirm your password'
              icon={<Lock size={16} />}
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            <div className='flex items-start gap-2 mt-2'>
              <input
                type='checkbox'
                id='acceptTerms'
                className='accent-[#d72322] w-4 h-4 mt-0.5 bg-[#1a1a1a] border-[#1e1e1e] rounded'
                {...register("acceptTerms")}
              />
              <div className="flex flex-col">
                <label htmlFor='acceptTerms' className='text-[#555] text-sm cursor-pointer'>
                  I agree to the <span className='text-[#d72322]'>Terms of Service</span> and <span className='text-[#d72322]'>Privacy Policy</span>
                </label>
                {errors.acceptTerms?.message && <span className='text-red-500 text-xs mt-1'>{errors.acceptTerms.message}</span>}
              </div>
            </div>

            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full bg-[#1a1a1a] hover:bg-[#d72322] border border-[#1e1e1e] hover:border-[#d72322] text-[#555] hover:text-white font-inter font-bold text-sm uppercase py-4 rounded-[8px] transition-colors mt-4 disabled:opacity-50 disabled:hover:bg-[#1a1a1a] disabled:hover:text-[#555]'>
              {isSubmitting ? "Processing..." : "Continue"}
            </button>
          </form>

          <div className='text-center mt-8 text-[#555] text-sm font-medium'>
            Already have an account?{" "}
            <Link href='/login' className='text-[#d72322] hover:underline'>
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
