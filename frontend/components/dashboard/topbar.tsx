"use client";

import React from "react";
import { Search, Bell, ChevronRight } from "lucide-react";
import { useAuth } from "@/providers/auth-provider";
import { usePathname } from "next/navigation";
import Link from "next/link";

/**
 * @component Topbar
 * @description Top navigation bar featuring breadcrumbs, global search, and user quick actions.
 */
export function Topbar() {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  // Generate simple breadcrumbs from pathname
  const pathSegments = pathname.split("/").filter(Boolean);
  const isDashboardRoot =
    pathSegments.length === 1 && pathSegments[0] === "dashboard";

  const getPageName = () => {
    if (isDashboardRoot) return "Overview";
    const lastSegment = pathSegments[pathSegments.length - 1];
    return lastSegment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getSectionName = () => {
    if (isDashboardRoot) return "Main";
    const lastSegment = pathSegments[pathSegments.length - 1];
    if (
      ["fighters", "match-records", "belts", "rankings"].includes(lastSegment)
    ) {
      return "Database";
    }
    if (lastSegment === "events") return "Events";
    if (lastSegment === "users") return "Users";
    if (lastSegment === "settings") return "System";
    return "Main";
  };

  return (
    <header className='w-full flex justify-between items-center px-6 py-4 bg-[#fbfbf9]  shadow-sm shrink-0'>
      {/* Left Side: Breadcrumbs */}
      <nav
        aria-label='Breadcrumb'
        className='text-sm text-stone-500 tracking-wide font-medium font-mono'>
        <ol className='flex items-center space-x-2'>
          <li>
            <Link
              href='/dashboard'
              className='hover:text-stone-800 transition-colors'>
              Admin
            </Link>
          </li>
          <li>
            <ChevronRight className='w-3 h-3 text-stone-400' strokeWidth={3} />
          </li>
          <li>
            <span className='text-stone-500'>{getSectionName()}</span>
          </li>
          <li>
            <ChevronRight className='w-3 h-3 text-stone-400' strokeWidth={3} />
          </li>
          <li aria-current='page' className='text-stone-900 font-bold'>
            {getPageName()}
          </li>
        </ol>
      </nav>

      {/* Right Side: Search & Actions */}
      <div className='flex items-center space-x-6'>
        {/* Quick Search */}
        <div className='relative hidden md:block'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <Search className='h-4 w-4 text-stone-400' />
          </div>
          <input
            type='text'
            className='block w-64 pl-10 pr-3 py-1.5 border border-stone-300 rounded-md leading-5 bg-[#f5f5f0] placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-stone-500 focus:border-stone-500 sm:text-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] transition-colors duration-200 font-sans'
            placeholder='Quick search...'
          />
        </div>

        {/* Notifications */}
        <button
          aria-label='Notifications'
          className='relative p-1 text-stone-500 hover:text-stone-800 transition-colors focus:outline-none'>
          <Bell className='h-6 w-6' strokeWidth={1.5} />
          {/* Red Dot Indicator */}
          <span className='absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-600 ring-2 ring-[#fbfbf9]' />
        </button>

        {/* User Profile Avatar */}
        <button
          aria-label='User profile'
          className='flex items-center focus:outline-none'>
          <div className='h-8 w-8 rounded-full bg-stone-900 border-2 border-[#d92d20] flex items-center justify-center text-white text-xs font-bold tracking-wider shadow-sm font-sans'>
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .substring(0, 2)
              .toUpperCase()}
          </div>
        </button>
      </div>
    </header>
  );
}
