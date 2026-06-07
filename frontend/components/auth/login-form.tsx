'use client';

import { DEMO_USERS } from '@/constants/demo-users';
import { useAuth } from '@/providers/auth-provider';
import { Eye, EyeOff, Lock, Shield, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'user' | 'admin'>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const user = DEMO_USERS.find((u) => u.email === email);
    if (user) {
      login(email);
      router.push('/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <section className='flex min-h-screen w-full bg-[#0a0a0a] items-center justify-center p-4 sm:p-8 font-sans'>
      <div className='w-full max-w-[520px] bg-[#121212] rounded-2xl border border-[#222222] p-8 sm:p-12 shadow-2xl'>
        <h1 className='text-2xl sm:text-[28px] font-bold text-center text-white mb-10 tracking-widest uppercase'>
          Log In
        </h1>

        {/* Tabs */}
        <div className='flex w-full mb-8 border-b border-[#222222]'>
          <button
            type='button'
            onClick={() => setActiveTab('user')}
            className={`flex-1 pb-4 flex items-center justify-center gap-2 text-[15px] font-medium transition-colors relative ${
              activeTab === 'user' ? 'text-white' : 'text-[#737373] hover:text-[#a3a3a3]'
            }`}
          >
            <User size={18} strokeWidth={activeTab === 'user' ? 2.5 : 2} />
            User
            {activeTab === 'user' && (
              <span className='absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#E32626]'></span>
            )}
          </button>
          <button
            type='button'
            onClick={() => setActiveTab('admin')}
            className={`flex-1 pb-4 flex items-center justify-center gap-2 text-[15px] font-medium transition-colors relative ${
              activeTab === 'admin' ? 'text-white' : 'text-[#737373] hover:text-[#a3a3a3]'
            }`}
          >
            <Shield size={18} strokeWidth={activeTab === 'admin' ? 2.5 : 2} />
            Admin
            {activeTab === 'admin' && (
              <span className='absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#E32626]'></span>
            )}
          </button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-5'>
          {error && (
            <div className='text-[#E32626] text-sm text-center font-medium bg-[#E32626]/10 p-3 rounded-lg border border-[#E32626]/20'>
              {error}
            </div>
          )}

          {/* Email / Username Field */}
          <div>
            <label className='block text-[10px] font-bold text-[#737373] uppercase tracking-wider mb-2'>
              Email or Username
            </label>
            <div className='relative group'>
              <User
                className='absolute left-4 top-1/2 -translate-y-1/2 text-[#737373] group-focus-within:text-[#E32626] transition-colors'
                size={18}
              />
              <input
                type='text'
                placeholder='Enter your email or username'
                className='w-full bg-[#181818] border border-[#2a2a2a] text-white text-[15px] rounded-lg py-3.5 pl-12 pr-4 focus:outline-none focus:border-[#E32626] transition-colors placeholder:text-[#555555]'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className='flex justify-between items-center mb-2'>
              <label className='block text-[10px] font-bold text-[#737373] uppercase tracking-wider'>
                Password
              </label>
              <Link
                href='/forgot-password'
                className='text-[10px] font-bold text-[#E32626] uppercase tracking-wider hover:text-[#ff4d4d] transition-colors'
              >
                Forgot Password?
              </Link>
            </div>
            <div className='relative group'>
              <Lock
                className='absolute left-4 top-1/2 -translate-y-1/2 text-[#737373] group-focus-within:text-[#a3a3a3] transition-colors'
                size={18}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter your password'
                className='w-full bg-[#181818] border border-[#2a2a2a] text-white text-[15px] rounded-lg py-3.5 pl-12 pr-12 focus:outline-none focus:border-[#555] transition-colors placeholder:text-[#555555]'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-4 top-1/2 transform -translate-y-1/2 text-[#737373] hover:text-[#a3a3a3] transition-colors'
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className='flex items-center gap-2.5 pt-1 pb-1'>
            <input
              type='checkbox'
              id='remember'
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded appearance-none border border-[#444] bg-[#181818] checked:bg-[#E32626] checked:border-[#E32626] cursor-pointer relative flex items-center justify-center
                after:content-[''] after:absolute after:hidden checked:after:block after:w-[4px] after:h-[8px] after:border-r-2 after:border-b-2 after:border-white after:rotate-45 after:mb-[2px]"
            />
            <label
              htmlFor='remember'
              className='text-[13px] text-[#888888] cursor-pointer select-none'
            >
              Remember me for 30 days
            </label>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full py-4 bg-[#E32626] text-white rounded-lg hover:bg-[#d62020] transition-colors font-bold text-[14px] uppercase tracking-wider mt-2'
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className='flex items-center my-7 gap-4'>
          <div className='h-[1px] bg-[#222222] flex-1'></div>
          <span className='text-[#444444] text-[11px] font-bold italic tracking-widest uppercase'>
            OR
          </span>
          <div className='h-[1px] bg-[#222222] flex-1'></div>
        </div>

        {/* Social Logins */}
        <div className='space-y-3.5'>
          <button
            type='button'
            className='w-full flex items-center justify-center gap-3 bg-[#161616] border border-[#262626] rounded-lg py-3 hover:bg-[#1f1f1f] transition-colors'
          >
            <svg viewBox='0 0 24 24' width='20' height='20' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                fill='#4285F4'
              />
              <path
                d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                fill='#34A853'
              />
              <path
                d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                fill='#FBBC05'
              />
              <path
                d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                fill='#EA4335'
              />
            </svg>
            <span className='text-[14px] font-medium text-[#cccccc]'>Continue with Google</span>
          </button>

          <button
            type='button'
            className='w-full flex items-center justify-center gap-3 bg-[#161616] border border-[#262626] rounded-lg py-3 hover:bg-[#1f1f1f] transition-colors'
          >
            <svg viewBox='0 0 24 24' width='20' height='20' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'
                fill='#1877F2'
              />
              <path
                d='M15.83 12.073h-3.328v8.385C18.388 19.522 22 16.19 22 12.073c0-5.523-4.477-10-10-10s-10 4.477-10 10c0 4.11 2.49 7.644 6.078 9.073v-8.385H5.03v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-2.12c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47z'
                fill='#ffffff'
              />
            </svg>
            <span className='text-[14px] font-medium text-[#cccccc]'>Continue with Facebook</span>
          </button>
        </div>

        {/* Footer */}
        <p className='text-center text-[13px] text-[#777777] mt-8'>
          Don&apos;t have an account?{' '}
          <Link
            href='/signup'
            className='text-[#E32626] hover:text-[#ff4d4d] transition-colors font-medium'
          >
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}
