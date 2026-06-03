"use client";

import { DASHBOARD_NAVIGATION } from "@/config/navigation";
import { useAuth } from "@/providers/auth-provider";
import { ChevronsLeft, ChevronsRight, LogOut, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarProps = {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onToggleCollapse: () => void;
  onCloseMobile: () => void;
};

export function Sidebar({
  isCollapsed,
  isMobileOpen,
  onToggleCollapse,
  onCloseMobile,
}: SidebarProps) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  const navItems = DASHBOARD_NAVIGATION[user.role];
  const showLabels = !isCollapsed;

  return (
    <>
      {isMobileOpen ? (
        <button
          type='button'
          aria-label='Close sidebar'
          onClick={onCloseMobile}
          className='fixed inset-0 z-30 bg-black/50 md:hidden'
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-screen flex-col border-r border-slate-800 bg-slate-950 p-4 shadow-2xl transition-transform duration-300 md:sticky md:top-0 md:z-auto md:shadow-none md:transition-[width,transform] ${
          isCollapsed ? "md:w-24 w-72" : "md:w-80 w-72"
        } ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        {/* Header Section */}
        <div className='mb-8 flex items-center justify-between gap-3'>
          <Link
            href='/dashboard'
            onClick={onCloseMobile}
            className='flex min-w-0 items-center gap-3 overflow-hidden'>
            <span className='flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-btn-primary text-white font-bold text-lg'>
              B
            </span>
            {showLabels ? (
              <div className='flex min-w-0 flex-col'>
                <span className='truncate text-base font-bold text-white'>
                  BOXING
                </span>
                <span className='truncate text-xs font-semibold text-btn-primary uppercase'>
                  ADMIN
                </span>
              </div>
            ) : null}
          </Link>

          <button
            type='button'
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className='hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:text-white hover:bg-slate-800 md:inline-flex'>
            {isCollapsed ? (
              <ChevronsRight size={20} />
            ) : (
              <ChevronsLeft size={20} />
            )}
          </button>

          <button
            type='button'
            onClick={onCloseMobile}
            aria-label='Close sidebar'
            className='inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition-colors hover:text-white hover:bg-slate-800 md:hidden'>
            <X size={20} />
          </button>
        </div>

        {/* User Profile Section */}
        <div className='mb-8 rounded-lg bg-slate-900 px-4 py-4 border border-slate-800'>
          <div className='flex items-center gap-3'>
            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-700 text-text-secondary'>
              <span className='font-bold text-sm'>{user.name.charAt(0)}</span>
            </div>
            {showLabels ? (
              <div className='min-w-0 flex-1'>
                <p className='truncate text-sm font-bold text-white'>
                  {user.name}
                </p>
              </div>
            ) : null}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className='flex-1 space-y-1 overflow-y-auto'>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex items-center rounded-lg px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? "bg-btn-primary text-white shadow-lg"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                } ${showLabels ? "gap-3" : "justify-center"}`}>
                <Icon size={22} className='shrink-0' />
                {showLabels ? (
                  <span className='truncate font-medium text-sm'>
                    {item.label}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        {/* Logout & Footer */}
        <div className='mt-auto space-y-3 border-t border-slate-800 pt-4'>
          <button
            onClick={logout}
            className={`flex w-full items-center rounded-lg px-4 py-3 text-btn-primary transition-all duration-200 hover:bg-red-950 ${
              showLabels ? "gap-3 justify-start" : "justify-center"
            }`}>
            <LogOut size={22} className='shrink-0' />
            {showLabels ? (
              <span className='font-medium text-sm'>Logout</span>
            ) : null}
          </button>

          {showLabels ? (
            <Link
              href='/'
              onClick={onCloseMobile}
              className='flex items-center justify-center py-2 text-xs font-medium text-slate-500 hover:text-slate-300 transition-colors'>
              ← Back to site
            </Link>
          ) : null}
        </div>
      </aside>
    </>
  );
}
