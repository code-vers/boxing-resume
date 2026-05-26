"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const closeMobileSidebar = () => setIsMobileOpen(false);

  return (
    <div className='min-h-screen bg-slate-50 md:flex'>
      <div className='sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:hidden'>
        <div className='flex items-center gap-3'>
          <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-[#e8f0df] text-[#516933]'>
            <span className='text-lg font-black'>V</span>
          </span>
          <div>
            <p className='text-sm font-semibold text-slate-900'>Veritas</p>
            <p className='text-xs text-slate-500'>Dashboard</p>
          </div>
        </div>

        <button
          type='button'
          onClick={() => setIsMobileOpen(true)}
          aria-label='Open sidebar'
          className='inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100'>
          <Menu size={18} />
        </button>
      </div>

      <Sidebar
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        onToggleCollapse={() => setIsCollapsed((value) => !value)}
        onCloseMobile={closeMobileSidebar}
      />

      <main className='flex-1 p-4 md:p-8'>{children}</main>
    </div>
  );
}
