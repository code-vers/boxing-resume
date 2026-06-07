'use client';

import { AtSign, Check, Eye, EyeOff, Lock, Mail, Shield, User } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function SignupForm() {
  const [activeTab, setActiveTab] = useState<'user' | 'admin'>('user');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
  };

  return (
    <section className='flex min-h-screen w-full bg-[#0a0a0a] items-center justify-center p-4 sm:p-8 font-sans'>
      <div className='w-full max-w-[520px] bg-[#121212] rounded-2xl border border-[#222222] p-8 sm:p-12 shadow-2xl'>
        <h1 className='text-2xl sm:text-[28px] font-bold text-center text-white mb-10 tracking-widest uppercase'>
          Sign Up
        </h1>

        {/* Tabs */}
        <div className='flex w-full mb-10 border-b border-[#222222]'>
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

        {/* Stepper */}
        <div className='flex items-start justify-center mb-10 max-w-[260px] mx-auto relative'>
          {/* Connecting Line behind dots */}
          <div className='absolute top-[3px] left-[15%] right-[15%] h-[1px] bg-[#2a2a2a] -z-10'></div>

          <div className='flex flex-col items-center flex-1'>
            <div className='w-[8px] h-[8px] rounded-full bg-white mb-2 z-10 border-2 border-[#121212] box-content'></div>
            <span className='text-[9px] font-bold tracking-widest text-white uppercase'>
              Account
            </span>
          </div>

          <div className='flex flex-col items-center flex-1'>
            <div className='w-[8px] h-[8px] rounded-full bg-[#333] mb-2 z-10 border-2 border-[#121212] box-content'></div>
            <span className='text-[9px] font-bold tracking-widest text-[#555] uppercase'>
              Profile
            </span>
          </div>

          <div className='flex flex-col items-center flex-1'>
            <div className='w-[8px] h-[8px] rounded-full bg-[#333] mb-2 z-10 border-2 border-[#121212] box-content'></div>
            <span className='text-[9px] font-bold tracking-widest text-[#555] uppercase'>
              Verify
            </span>
          </div>
        </div>

        <div className='mb-6'>
          <h2 className='text-[15px] font-bold text-white uppercase tracking-wider mb-1'>
            Create Account
          </h2>
          <p className='text-[#555] text-[12px]'>Step 1 of 3 — Account details</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-5'>
          {/* First & Last Name */}
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-[10px] font-bold text-[#737373] uppercase tracking-wider mb-2'>
                First Name
              </label>
              <div className='relative group'>
                <User
                  className='absolute left-4 top-1/2 -translate-y-1/2 text-[#555] group-focus-within:text-[#E32626] transition-colors'
                  size={16}
                />
                <input
                  type='text'
                  placeholder='First name'
                  className='w-full bg-[#181818] border border-[#2a2a2a] text-white text-[14px] rounded-lg py-3.5 pl-11 pr-4 focus:outline-none focus:border-[#555] transition-colors placeholder:text-[#444]'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label className='block text-[10px] font-bold text-[#737373] uppercase tracking-wider mb-2'>
                Last Name
              </label>
              <div className='relative group'>
                <input
                  type='text'
                  placeholder='Last name'
                  className='w-full bg-[#181818] border border-[#2a2a2a] text-white text-[14px] rounded-lg py-3.5 px-4 focus:outline-none focus:border-[#555] transition-colors placeholder:text-[#444]'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Username */}
          <div>
            <label className='block text-[10px] font-bold text-[#737373] uppercase tracking-wider mb-2'>
              Username
            </label>
            <div className='relative group'>
              <AtSign
                className='absolute left-4 top-1/2 -translate-y-1/2 text-[#555] group-focus-within:text-[#E32626] transition-colors'
                size={16}
              />
              <input
                type='text'
                placeholder='Choose a username'
                className='w-full bg-[#181818] border border-[#2a2a2a] text-white text-[14px] rounded-lg py-3.5 pl-11 pr-4 focus:outline-none focus:border-[#555] transition-colors placeholder:text-[#444]'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            {username && (
              <p className='text-[#22c55e] text-[10px] font-bold tracking-wider mt-2 ml-1'>
                Available
              </p>
            )}
          </div>

          {/* OR Divider */}
          <div className='flex items-center my-4 gap-4'>
            <div className='h-[1px] bg-[#222222] flex-1'></div>
            <span className='text-[#444444] text-[10px] font-bold italic tracking-widest uppercase'>
              OR
            </span>
            <div className='h-[1px] bg-[#222222] flex-1'></div>
          </div>

          {/* Email Address */}
          <div>
            <label className='block text-[10px] font-bold text-[#737373] uppercase tracking-wider mb-2'>
              Email Address
            </label>
            <div className='relative group'>
              <Mail
                className='absolute left-4 top-1/2 -translate-y-1/2 text-[#555] group-focus-within:text-[#E32626] transition-colors'
                size={16}
              />
              <input
                type='email'
                placeholder='Your email address'
                className='w-full bg-[#181818] border border-[#2a2a2a] text-white text-[14px] rounded-lg py-3.5 pl-11 pr-4 focus:outline-none focus:border-[#555] transition-colors placeholder:text-[#444]'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className='block text-[10px] font-bold text-[#737373] uppercase tracking-wider mb-2'>
              Password
            </label>
            <div className='relative group'>
              <Lock
                className='absolute left-4 top-1/2 -translate-y-1/2 text-[#555] group-focus-within:text-[#a3a3a3] transition-colors'
                size={16}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Create a password'
                className='w-full bg-[#181818] border border-[#2a2a2a] text-white text-[14px] rounded-lg py-3.5 pl-11 pr-12 focus:outline-none focus:border-[#555] transition-colors placeholder:text-[#444]'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-4 top-1/2 transform -translate-y-1/2 text-[#555] hover:text-[#a3a3a3] transition-colors'
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Password Strength Meter */}
            <div className='flex gap-1.5 mt-3 mb-4'>
              <div className='h-[2px] flex-1 bg-[#444] rounded-full'></div>
              <div className='h-[2px] flex-1 bg-[#2a2a2a] rounded-full'></div>
              <div className='h-[2px] flex-1 bg-[#2a2a2a] rounded-full'></div>
              <div className='h-[2px] flex-1 bg-[#2a2a2a] rounded-full'></div>
            </div>

            {/* Password Checklist */}
            <div className='space-y-1.5'>
              <div className='flex items-center gap-2 text-[10px] text-[#555] font-medium'>
                <Check size={12} className='text-[#555]' /> At least 8 characters
              </div>
              <div className='flex items-center gap-2 text-[10px] text-[#555] font-medium'>
                <Check size={12} className='text-[#555]' /> One uppercase letter
              </div>
              <div className='flex items-center gap-2 text-[10px] text-[#555] font-medium'>
                <Check size={12} className='text-[#555]' /> One number
              </div>
              <div className='flex items-center gap-2 text-[10px] text-[#555] font-medium'>
                <Check size={12} className='text-[#555]' /> One special character
              </div>
            </div>
          </div>

          {/* Confirm Password */}
          <div className='pt-2'>
            <label className='block text-[10px] font-bold text-[#737373] uppercase tracking-wider mb-2'>
              Confirm Password
            </label>
            <div className='relative group'>
              <Lock
                className='absolute left-4 top-1/2 -translate-y-1/2 text-[#555] group-focus-within:text-[#a3a3a3] transition-colors'
                size={16}
              />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='Confirm your password'
                className='w-full bg-[#181818] border border-[#2a2a2a] text-white text-[14px] rounded-lg py-3.5 pl-11 pr-12 focus:outline-none focus:border-[#555] transition-colors placeholder:text-[#444]'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='absolute right-4 top-1/2 transform -translate-y-1/2 text-[#555] hover:text-[#a3a3a3] transition-colors'
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className='flex items-center gap-3 pt-2'>
            <input
              type='checkbox'
              id='terms'
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-[18px] h-[18px] rounded-md appearance-none border border-[#2a2a2a] bg-[#181818] checked:bg-[#E32626] checked:border-[#E32626] cursor-pointer relative flex items-center justify-center shrink-0
                after:content-[''] after:absolute after:hidden checked:after:block after:w-[5px] after:h-[10px] after:border-r-[2.5px] after:border-b-[2.5px] after:border-white after:rotate-45 after:mb-[2px]"
            />
            <label
              htmlFor='terms'
              className='text-[12px] text-[#737373] cursor-pointer select-none leading-tight'
            >
              I agree to the{' '}
              <Link href='/terms' className='text-[#E32626] font-bold hover:underline'>
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href='/privacy' className='text-[#E32626] font-bold hover:underline'>
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* Submit Button (Disabled style representation) */}
          <button
            type='submit'
            className='w-full py-4 bg-[#1a1a1a] text-[#555] border border-[#222] rounded-lg transition-colors font-bold text-[13px] uppercase tracking-wider mt-4 hover:bg-[#222] hover:text-[#777]'
          >
            Continue
          </button>
        </form>

        {/* Footer */}
        <p className='text-center text-[12px] text-[#737373] mt-8'>
          Already have an account?{' '}
          <Link
            href='/login'
            className='text-[#E32626] hover:text-[#ff4d4d] transition-colors font-bold'
          >
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
}
