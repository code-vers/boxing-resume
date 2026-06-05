"use client";

import { Sidebar } from "@/components/dashboard/sidebar";
import { Menu } from "lucide-react";
import { useState } from "react";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const closeMobileSidebar = () => setIsMobileOpen(false);

  return (
    <div className='min-h-screen pb-8 bg-background md:flex overflow-hidden'>
      {/* Mobile Header */}
      <div className='sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:hidden'>
        <div className='flex items-center gap-3'>
          <div>
            <h1 className='font-heading text-2xl font-bold tracking-wider leading-none text-gray-900'>
              BOXING
            </h1>
            <p className='font-heading text-primary text-xs tracking-widest mt-1 uppercase font-semibold'>
              Resume
            </p>
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

      <main className='flex-1 p-4 md:p-8 pb-1 md:pb-1 overflow-x-hidden'>
        {children}
      </main>
    </div>
  );
}
