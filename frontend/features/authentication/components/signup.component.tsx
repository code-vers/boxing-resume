"use client";

import Link from "next/link";
import { User, Mail, Lock, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { AuthInput } from "./auth-input.component";
import { useCustomForm } from "../hooks/useCustomForm";
import { registerSchema, RegisterFormData } from "../validation/register.validation";
import { useRegister } from "../hooks/useRegister";
import { ApiError } from "../types/auth.types";

/**
 * Enterprise Signup Component.
 * Purely handles UI rendering, form state bridging, and mutation triggering.
 */
export function SignupComponent() {
  const { mutate: registerUser, isPending } = useRegister();

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setErrors,
  } = useCustomForm<RegisterFormData>({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
    validationSchema: registerSchema,
    onSubmit: async (formValues) => {
      // Map frontend fields to backend expected payload
      const name = `${formValues.firstName} ${formValues.lastName}`.trim();

      registerUser(
        { name, email: formValues.email, password: formValues.password, role: "USER" },
        {
          onError: (error) => {
            const apiErr = error as ApiError;
            if (apiErr.fieldErrors) {
              setErrors(apiErr.fieldErrors as Partial<Record<keyof RegisterFormData, string>>);
            }
          },
        }
      );
    },
  });

  const passwordChecks = [
    { label: "At least 8 characters", test: (p: string) => p?.length >= 8 },
    { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p || "") },
    { label: "One number", test: (p: string) => /[0-9]/.test(p || "") },
    { label: "One special character", test: (p: string) => /[^A-Za-z0-9]/.test(p || "") },
  ];

  return (
    <div className='w-full flex items-center justify-center bg-[#0f0f0f] text-white p-4 font-inter py-12 min-h-screen'>
      <div className='bg-[#111] border border-[#1e1e1e] rounded-[10px] w-full max-w-[600px] p-8 md:p-12 relative overflow-hidden'>
        
        <h1 className='text-center font-bebas text-[32px] tracking-[1.6px] uppercase mb-10'>
          Sign Up
        </h1>

        <div className='flex items-center justify-center mb-8'>
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

        <div className='mt-2'>
          <h2 className='font-bebas text-[20px] tracking-[1px] uppercase mb-1'>CREATE ACCOUNT</h2>
          <p className='text-[#555] text-xs font-inter mb-6'>Step 1 of 3 — Account details</p>

          <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <AuthInput
                name="firstName"
                label='FIRST NAME'
                placeholder='First name'
                icon={<User size={16} />}
                value={values.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                onBlur={() => handleBlur("firstName")}
                error={touched.firstName ? errors.firstName : undefined}
              />
              <AuthInput
                name="lastName"
                label='LAST NAME'
                placeholder='Last name'
                value={values.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                onBlur={() => handleBlur("lastName")}
                error={touched.lastName ? errors.lastName : undefined}
              />
            </div>

            <div>
              <AuthInput
                name="username"
                label='USERNAME'
                placeholder='Choose a username'
                icon={<span className="font-semibold text-lg pb-1">@</span>}
                value={values.username}
                onChange={(e) => handleChange("username", e.target.value)}
                onBlur={() => handleBlur("username")}
                error={touched.username ? errors.username : undefined}
              />
              {!errors.username && values.username.length >= 3 && (
                <span className="text-green-500 text-[10px] font-inter mt-1 inline-block">Available</span>
              )}
            </div>

            <AuthInput
              name="email"
              label='EMAIL ADDRESS'
              type='email'
              placeholder='Your email address'
              icon={<Mail size={16} />}
              value={values.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              error={touched.email ? errors.email : undefined}
            />

            <div>
              <AuthInput
                name="password"
                label='PASSWORD'
                type='password'
                placeholder='Create a password'
                icon={<Lock size={16} />}
                value={values.password}
                onChange={(e) => handleChange("password", e.target.value)}
                onBlur={() => handleBlur("password")}
                error={touched.password ? (errors.password ? "" : undefined) : undefined}
              />
              
              <div className='mt-3 flex flex-col gap-[6px] pl-1'>
                {passwordChecks.map((check, idx) => {
                  const passed = check.test(values.password);
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
              {touched.password && errors.password && (
                <span className="text-red-500 text-xs font-inter mt-2 inline-block">{errors.password}</span>
              )}
            </div>

            <AuthInput
              name="confirmPassword"
              label='CONFIRM PASSWORD'
              type='password'
              placeholder='Confirm your password'
              icon={<Lock size={16} />}
              value={values.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              onBlur={() => handleBlur("confirmPassword")}
              error={touched.confirmPassword ? errors.confirmPassword : undefined}
            />

            <div className='flex items-start gap-2 mt-2'>
              <input
                type='checkbox'
                id='acceptTerms'
                checked={values.acceptTerms}
                onChange={(e) => handleChange("acceptTerms", e.target.checked)}
                className='accent-[#d72322] w-4 h-4 mt-0.5 bg-[#1a1a1a] border-[#1e1e1e] rounded cursor-pointer'
              />
              <div className="flex flex-col">
                <label htmlFor='acceptTerms' className='text-[#555] text-sm cursor-pointer'>
                  I agree to the <span className='text-[#d72322]'>Terms of Service</span> and <span className='text-[#d72322]'>Privacy Policy</span>
                </label>
                {touched.acceptTerms && errors.acceptTerms && (
                  <span className='text-red-500 text-xs mt-1'>{errors.acceptTerms}</span>
                )}
              </div>
            </div>

            <button
              type='submit'
              disabled={isPending}
              className='w-full bg-[#1a1a1a] hover:bg-[#d72322] border border-[#1e1e1e] hover:border-[#d72322] text-[#555] hover:text-white font-inter font-bold text-sm uppercase py-4 rounded-[8px] transition-colors mt-4 disabled:opacity-50 disabled:hover:bg-[#1a1a1a] disabled:hover:text-[#555]'>
              {isPending ? "Processing..." : "Continue"}
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
