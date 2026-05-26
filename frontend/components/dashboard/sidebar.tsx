"use client";

import { useAuth } from "@/providers/auth-provider";
import { DASHBOARD_NAVIGATION } from "@/config/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronsLeft,
  ChevronsRight,
  LayoutDashboard,
  LogOut,
  X,
} from "lucide-react";

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
          className='fixed inset-0 z-30 bg-slate-950/40 md:hidden'
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-screen w-72 flex-col border-r border-slate-200 bg-white p-4 shadow-lg transition-transform duration-300 md:sticky md:top-0 md:z-auto md:shadow-none md:transition-[width,transform] ${
          isCollapsed ? "md:w-24" : "md:w-72"
        } ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className='mb-6 flex items-center justify-between gap-3 rounded-2xl px-3 py-3'>
          <Link
            href='/dashboard'
            onClick={onCloseMobile}
            className='flex min-w-0 items-center gap-3 overflow-hidden'>
            <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-[#516933] to-[#73914c] text-white shadow-sm'>
              <LayoutDashboard size={18} />
            </span>
            {showLabels ? (
              <span className='flex min-w-0 flex-col leading-tight'>
                <span className='truncate text-base font-semibold text-slate-900'>
                  Logo
                </span>
                <span className='truncate text-xs uppercase tracking-[0.2em] text-slate-500'>
                  Dashboard
                </span>
              </span>
            ) : null}
          </Link>

          <button
            type='button'
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className='hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl   text-slate-700 transition-colors md:inline-flex'>
            {isCollapsed ? (
              <ChevronsRight size={18} />
            ) : (
              <ChevronsLeft size={18} />
            )}
          </button>

          <button
            type='button'
            onClick={onCloseMobile}
            aria-label='Close sidebar'
            className='inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition-colors hover:bg-slate-100 md:hidden'>
            <X size={18} />
          </button>
        </div>

        <div className='mb-6 rounded-2xl bg-slate-50 px-3 py-3 md:mb-8'>
          <p
            className={`truncate font-bold text-slate-900 ${showLabels ? "text-lg" : "text-center text-sm"}`}>
            {showLabels ? user.name : user.name.charAt(0)}
          </p>
          {showLabels ? (
            <p className='truncate text-sm text-slate-500'>{user.role}</p>
          ) : null}
        </div>

        <nav className='flex-1 space-y-1 overflow-y-auto'>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex items-center rounded-xl px-3 py-3 transition-colors ${
                  isActive
                    ? "bg-[#eef4e4] text-[#516933]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                } ${showLabels ? "gap-3" : "justify-center"}`}>
                <Icon size={20} className='shrink-0' />
                {showLabels ? (
                  <span className='truncate'>{item.label}</span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={logout}
          className={`mt-auto flex items-center rounded-xl px-3 py-3 text-red-600 transition-colors hover:bg-red-50 ${
            showLabels ? "gap-3" : "justify-center"
          }`}>
          <LogOut size={20} className='shrink-0' />
          {showLabels ? <span>Logout</span> : null}
        </button>
      </aside>
    </>
  );
}
