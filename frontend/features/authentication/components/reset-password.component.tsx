"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { AuthInput } from "./auth-input.component";
import { useCustomForm } from "../hooks/useCustomForm";
import { resetPasswordSchema, ResetPasswordFormData } from "../validation/reset-password.validation";
import { useResetPassword } from "../hooks/useResetPassword";
import { ApiError } from "../types/auth.types";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function ResetPasswordComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  const { mutate: resetPassword, isPending } = useResetPassword();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setErrors,
  } = useCustomForm<ResetPasswordFormData>({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (formValues) => {
      if (!token) return;
      
      resetPassword(
        { token, newPassword: formValues.newPassword },
        {
          onSuccess: () => {
            setIsSuccess(true);
          },
          onError: (error) => {
            const apiErr = error as ApiError;
            if (apiErr.fieldErrors) {
              setErrors(apiErr.fieldErrors as Partial<Record<keyof ResetPasswordFormData, string>>);
            }
          },
        }
      );
    },
  });

  if (!token) {
    return null;
  }

  return (
    <div className='w-full flex items-center justify-center bg-[#0f0f0f] text-white p-4 font-inter py-12 min-h-screen'>
      <div className='bg-[#111] border border-[#1e1e1e] rounded-[10px] w-full max-w-[600px] p-8 md:p-12 relative overflow-hidden'>
        <h1 className='text-center font-bebas text-[32px] tracking-[1.6px] uppercase mb-4'>
          Set New Password
        </h1>

        {isSuccess ? (
          <div className="text-center mt-6">
            <p className="text-[#aaa] text-sm mb-8">
              Your password has been successfully reset. You can now login with your new password.
            </p>
            <Link href="/login" className="w-full inline-block bg-[#d72322] hover:bg-[#b01c1c] text-white font-inter font-bold text-sm uppercase py-4 rounded-[8px] transition-colors">
              Go to Login
            </Link>
          </div>
        ) : (
          <>
            <p className="text-center text-[#888] text-sm mb-10">
              Please enter your new password below.
            </p>
            <div className='mt-2'>
              <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                <AuthInput
                  name="newPassword"
                  label='NEW PASSWORD'
                  type="password"
                  placeholder='Enter new password'
                  icon={<Lock size={16} />}
                  value={values.newPassword}
                  onChange={(e) => handleChange("newPassword", e.target.value)}
                  onBlur={() => handleBlur("newPassword")}
                  error={touched.newPassword ? errors.newPassword : undefined}
                />

                <AuthInput
                  name="confirmPassword"
                  label='CONFIRM PASSWORD'
                  type="password"
                  placeholder='Confirm new password'
                  icon={<Lock size={16} />}
                  value={values.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  onBlur={() => handleBlur("confirmPassword")}
                  error={touched.confirmPassword ? errors.confirmPassword : undefined}
                />

                <button
                  type='submit'
                  disabled={isPending}
                  className='w-full bg-[#d72322] hover:bg-[#b01c1c] text-white font-inter font-bold text-sm uppercase py-4 rounded-[8px] transition-colors mt-4 disabled:opacity-70 disabled:cursor-not-allowed'>
                  {isPending ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
