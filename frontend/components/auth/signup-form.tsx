"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <section className='flex min-h-screen w-full bg-[#fdf5f7] items-center justify-center p-4 sm:p-8'>
      <div className='w-full 2xl:px-40 xl:px-32 lg:px-24 md:px-12 sm:px-8 px-0 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-25 items-stretch'>
        {/* Left Side: Rounded image card */}
        <div className='relative hidden md:block w-full h-full min-h-125 rounded-2xl overflow-hidden shadow-sm'>
          <Image
            src='/images/auth.png'
            alt='Style City Signup Background'
            fill
            className='object-cover object-center scale-[1.02]'
            priority
          />
        </div>

        {/* Right Side: Form */}
        <div className='w-full mx-auto md:mx-0 flex flex-col justify-center py-6'>
          <div className='text-center'>
            <Link
              href='/'
              className='text-4xl font-bold text-center block mb-8'>
              Logo
            </Link>
            <h1 className='text-3xl font-bold'>Sign Up</h1>
            <p className='text-slate-500 mt-2'>
              Start your demo journey today.
            </p>
          </div>

          <div className='space-y-4 mt-8'>
            {/* First Name */}
            <div className='space-y-1'>
              <label className='text-sm font-medium text-[#1F2937]'>
                First Name
              </label>
              <input
                type='text'
                placeholder='Pedro Duarte'
                className='w-full p-4 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-pink-200'
              />
            </div>

            {/* Last Name */}
            <div className='space-y-1'>
              <label className='text-sm font-medium text-[#1F2937]'>
                Last Name
              </label>
              <input
                type='text'
                placeholder='Pedro Duarte'
                className='w-full p-4 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-pink-200'
              />
            </div>

            {/* Email */}
            <div className='space-y-1'>
              <label className='text-sm font-medium text-[#1F2937]'>
                Email
              </label>
              <input
                type='email'
                placeholder='@peduarte'
                className='w-full p-4 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-pink-200'
              />
            </div>

            {/* Salon */}
            <div className='space-y-1'>
              <label className='text-sm font-medium text-[#1F2937]'>
                Salon
              </label>
              <div className='relative'>
                <select
                  defaultValue=''
                  className='w-full p-4 border border-gray-200 rounded-xl bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-pink-200 text-gray-400'>
                  <option value='' disabled>
                    Salon Name
                  </option>
                </select>
                <div className='pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400'>
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'>
                    <path d='M6 9l6 6 6-6' />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password */}
            <div className='space-y-1'>
              <label className='text-sm font-medium text-[#1F2937]'>
                Password
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder='Enter your password'
                  className='w-full p-4 pr-12 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-pink-200'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600'>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className='space-y-1'>
              <label className='text-sm font-medium text-[#1F2937]'>
                Confirm password
              </label>
              <div className='relative'>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder='Confirm Password'
                  className='w-full p-4 pr-12 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-pink-200'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type='button'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600'>
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            <button className='w-full p-4 bg-black text-white rounded-xl hover:bg-slate-800 transition-all font-semibold'>
              Create Account
            </button>
          </div>

          <p className='text-center text-sm text-slate-600 mt-8'>
            Already have an account?{" "}
            <Link
              href='/login'
              className='text-[#4D7C0F] font-semibold hover:underline'>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
