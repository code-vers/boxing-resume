"use client";

import Link from "next/link";
import { User, Lock } from "lucide-react";
import { AuthInput } from "./auth-input.component";
import { useCustomForm } from "../hooks/useCustomForm";
import { loginSchema, LoginFormData } from "../validation/login.validation";
import { useLogin } from "../hooks/useLogin";
import { ApiError } from "../types/auth.types";

/**
 * Enterprise Login Component.
 * Purely handles UI rendering, form state bridging, and mutation triggering.
 */
export function LoginComponent() {
  const { mutate: loginUser, isPending } = useLogin();

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setErrors,
  } = useCustomForm<LoginFormData>({
    initialValues: {
      emailOrUsername: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: loginSchema,
    onSubmit: async (formValues) => {
      loginUser(
        { email: formValues.emailOrUsername, password: formValues.password },
        {
          onError: (error) => {
            const apiErr = error as ApiError;
            if (apiErr.fieldErrors) {
              setErrors(apiErr.fieldErrors as Partial<Record<keyof LoginFormData, string>>);
            }
          },
        }
      );
    },
  });

  return (
    <div className='w-full flex items-center justify-center bg-[#0f0f0f] text-white p-4 font-inter py-12 min-h-screen'>
      <div className='bg-[#111] border border-[#1e1e1e] rounded-[10px] w-full max-w-[600px] p-8 md:p-12 relative overflow-hidden'>
        <h1 className='text-center font-bebas text-[32px] tracking-[1.6px] uppercase mb-10'>
          Log In
        </h1>

        <div className='mt-2'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <AuthInput
              name="emailOrUsername"
              label='EMAIL OR USERNAME'
              placeholder='Enter your email or username'
              icon={<User size={16} />}
              value={values.emailOrUsername}
              onChange={(e) => handleChange("emailOrUsername", e.target.value)}
              onBlur={() => handleBlur("emailOrUsername")}
              error={touched.emailOrUsername ? errors.emailOrUsername : undefined}
            />

            <div>
              <div className='flex justify-between items-center mb-[5px]'>
                <label className='font-inter font-medium text-[#555] text-[10px] tracking-[0.8px] uppercase'>
                  PASSWORD
                </label>
                <Link href='/forgot-password' className='font-inter font-medium text-[#d72322] text-[10px] tracking-[0.8px] uppercase hover:underline'>
                  FORGOT PASSWORD?
                </Link>
              </div>
              <AuthInput
                name="password"
                type='password'
                placeholder='Enter your password'
                icon={<Lock size={16} />}
                value={values.password}
                onChange={(e) => handleChange("password", e.target.value)}
                onBlur={() => handleBlur("password")}
                error={touched.password ? errors.password : undefined}
              />
            </div>

            <div className='flex items-center gap-2 mt-[-5px]'>
              <input
                type='checkbox'
                id='rememberMe'
                checked={values.rememberMe}
                onChange={(e) => handleChange("rememberMe", e.target.checked)}
                className='accent-[#d72322] w-4 h-4 bg-[#1a1a1a] border-[#1e1e1e] rounded cursor-pointer'
              />
              <label htmlFor='rememberMe' className='text-[#555] text-sm cursor-pointer'>
                Remember me for 30 days
              </label>
            </div>

            <button
              type='submit'
              disabled={isPending}
              className='w-full bg-[#d72322] hover:bg-[#b01c1c] text-white font-inter font-bold text-sm uppercase py-4 rounded-[8px] transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed'>
              {isPending ? "Logging in..." : "Login"}
            </button>
          </form>

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
