"use client";

import { useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";
import { DEMO_USERS } from "@/constants/demo-users";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = DEMO_USERS.find((u) => u.email === email);
    if (user) {
      login(email);
      router.push("/dashboard");
    } else {
      setError("Invalid demo credentials. Use one of the accounts below.");
    }
  };

  return (
    <section className='flex min-h-screen w-full bg-[#fdf5f7] items-center justify-center p-4 sm:p-8'>
      <div className='w-full 2xl:px-40 xl:px-32 lg:px-24 md:px-12 sm:px-8 px-0 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-25 items-stretch'>
        {/* Left Side: Rounded image card — matches screenshot */}
        <div className='relative hidden md:block w-full h-full min-h-125 rounded-2xl overflow-hidden shadow-sm'>
          <Image
            src='/images/auth.png'
            alt='Style City Login Background'
            fill
            className='object-cover object-center scale-[1.02]'
            priority
          />
        </div>

        {/* Right Side: Form — content unchanged */}
        <div className='w-full mx-auto md:mx-0 flex flex-col justify-center py-6'>
          <div className='text-center'>
            <Link
              href='/'
              className='text-4xl font-bold text-center block mb-8'>
              Logo
            </Link>
            <h1 className='text-3xl font-bold'>Sign In</h1>
          </div>

          <form onSubmit={handleSubmit} className='space-y-4 mt-8'>
            {error && (
              <div className='text-red-500 text-sm bg-red-50 p-3 rounded'>
                {error}
              </div>
            )}
            <input
              type='email'
              placeholder='Email'
              className='w-full p-4 border rounded-xl'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className='relative'>
              <input
                type={showPassword ? "text" : "password"}
                placeholder='Password'
                className='w-full p-4 pr-12 border rounded-xl'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700'>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button
              type='submit'
              className='w-full p-4 bg-[#4D7C0F] text-white rounded-xl hover:bg-[#3a5f0c] transition-all font-semibold'>
              Sign In
            </button>
          </form>

          <div className='mt-4'>
            Didn&apos;t have an account?{" "}
            <Link
              href='/signup'
              className='text-[#4D7C0F] font-semibold hover:underline'>
              Sign up
            </Link>
          </div>

          <div className='border-t pt-8 mt-8'>
            <p className='text-sm text-slate-500 mb-4'>
              Demo Accounts (Click to autofill):
            </p>
            <div className='grid gap-2'>
              {DEMO_USERS.map((user) => (
                <button
                  key={user.email}
                  onClick={() => {
                    setEmail(user.email);
                    setPassword("password123");
                  }}
                  className='w-full p-3 border rounded-lg text-left text-sm hover:bg-slate-50'>
                  <span className='font-medium'>{user.email}</span> -{" "}
                  <span className='text-slate-400'>{user.role}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
