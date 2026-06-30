"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { AuthInput } from "./auth-input.component";
import { useCustomForm } from "../hooks/useCustomForm";
import { forgotPasswordSchema, ForgotPasswordFormData } from "../validation/forgot-password.validation";
import { useForgotPassword } from "../hooks/useForgotPassword";
import { ApiError } from "../types/auth.types";
import { useState } from "react";

export function ForgotPasswordComponent() {
  const { mutate: forgotPassword, isPending } = useForgotPassword();
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setErrors,
  } = useCustomForm<ForgotPasswordFormData>({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (formValues) => {
      forgotPassword(
        { email: formValues.email },
        {
          onSuccess: () => {
            setIsSuccess(true);
          },
          onError: (error) => {
            const apiErr = error as ApiError;
            if (apiErr.fieldErrors) {
              setErrors(apiErr.fieldErrors as Partial<Record<keyof ForgotPasswordFormData, string>>);
            }
          },
        }
      );
    },
  });

  return (
    <div className='w-full flex items-center justify-center bg-[#0f0f0f] text-white p-4 font-inter py-12 min-h-screen'>
      <div className='bg-[#111] border border-[#1e1e1e] rounded-[10px] w-full max-w-[600px] p-8 md:p-12 relative overflow-hidden'>
        <h1 className='text-center font-bebas text-[32px] tracking-[1.6px] uppercase mb-4'>
          Reset Password
        </h1>

        {isSuccess ? (
          <div className="text-center mt-6">
            <p className="text-[#aaa] text-sm mb-8">
              We've sent a password reset link to <strong className="text-white">{values.email}</strong>. 
              Please check your inbox.
            </p>
            <Link href="/login" className="w-full inline-block bg-[#222] hover:bg-[#333] border border-[#333] text-white font-inter font-bold text-sm uppercase py-4 rounded-[8px] transition-colors">
              Return to Login
            </Link>
          </div>
        ) : (
          <>
            <p className="text-center text-[#888] text-sm mb-10">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <div className='mt-2'>
              <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                <AuthInput
                  name="email"
                  label='EMAIL ADDRESS'
                  placeholder='Enter your email'
                  icon={<User size={16} />}
                  value={values.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  error={touched.email ? errors.email : undefined}
                />

                <button
                  type='submit'
                  disabled={isPending}
                  className='w-full bg-[#d72322] hover:bg-[#b01c1c] text-white font-inter font-bold text-sm uppercase py-4 rounded-[8px] transition-colors mt-4 disabled:opacity-70 disabled:cursor-not-allowed'>
                  {isPending ? "Sending Link..." : "Send Reset Link"}
                </button>
              </form>

              <div className='text-center mt-8 text-[#555] text-sm font-medium'>
                Remember your password?{" "}
                <Link href='/login' className='text-[#d72322] hover:underline'>
                  Log in
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
