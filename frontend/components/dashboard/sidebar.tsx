"use client";

import { DASHBOARD_NAVIGATION } from "@/config/navigation";
import { useAuth } from "@/providers/auth-provider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarProps = {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onToggleCollapse: () => void;
  onCloseMobile: () => void;
};

// Map existing lucide icons to FontAwesome classes based on HTML design
const getIconClass = (label: string) => {
  switch (label) {
    case "Overview":
      return "fa-solid fa-border-all";
    case "Stats & Reports":
      return "fa-solid fa-chart-simple";
    case "Fighter Management":
      return "fa-solid fa-user-group";
    case "Match Records":
      return "fa-regular fa-file-lines";
    case "Belts & Titles":
      return "fa-solid fa-trophy";
    case "Rankings":
      return "fa-solid fa-list-ol";
    case "Events Management":
      return "fa-regular fa-calendar";
    case "User Management":
      return "fa-solid fa-user-gear";
    case "Settings":
      return "fa-solid fa-gear";
    default:
      return "fa-solid fa-circle"; // Fallback
  }
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

  // Group nav items
  const mainItems = navItems.filter((i) => ["Overview", "Stats & Reports"].includes(i.label));
  const databaseItems = navItems.filter((i) =>
    ["Fighter Management", "Match Records", "Belts & Titles", "Rankings"].includes(i.label)
  );
  const eventItems = navItems.filter((i) => i.label === "Events Management");
  const userItems = navItems.filter((i) => i.label === "User Management");
  const systemItems = navItems.filter((i) => i.label === "Settings");

  return (
    <>
      {isMobileOpen && (
        <button
          type='button'
          aria-label='Close sidebar'
          onClick={onCloseMobile}
          className='fixed inset-0 z-30 bg-black/50 md:hidden'
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex h-screen flex-col border-r border-[#222222] bg-[#111111] text-white font-sans shadow-xl transition-transform duration-300 md:sticky md:top-0 md:z-auto md:shadow-none md:transition-[width,transform]",
          isCollapsed ? "md:w-20 w-64" : "md:w-64 w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}>
        {/* Brand Header */}
        <div className='px-6 py-5 border-b border-[#222222] flex items-center justify-between'>
          <div className={cn(isCollapsed ? "hidden md:block" : "block")}>
            {isCollapsed ? (
              <h1 className='font-heading text-xl font-bold tracking-wider leading-none text-white text-center'>
                BX
              </h1>
            ) : (
              <>
                <h1 className='font-heading text-2xl font-bold tracking-wider leading-none text-white'>
                  BOXING
                </h1>
                <p className='font-heading text-primary text-xs tracking-widest mt-1 uppercase font-semibold'>
                  Resume
                </p>
              </>
            )}
          </div>
          {!isCollapsed && (
            <span className='text-[10px] text-primary border border-primary px-2 py-0.5 rounded uppercase tracking-wider font-semibold'>
              Admin
            </span>
          )}
        </div>

        {/* User Profile */}
        <div className='px-6 py-5 border-b border-[#222222] flex items-center gap-3'>
          <div className='w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center bg-transparent text-sm font-semibold relative shrink-0'>
            <span className='text-gray-300'>
              {user.name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase()}
            </span>
            {/* Small red dot indicator */}
            <span className='absolute top-0 right-0 w-2.5 h-2.5 bg-primary border-2 border-[#111111] rounded-full'></span>
          </div>
          {!isCollapsed && (
            <div className='flex flex-col min-w-0'>
              <span className='text-sm font-semibold text-gray-200 leading-tight truncate'>
                {user.name}
              </span>
              <span className='text-xs text-[#777777] mt-0.5 truncate capitalize'>
                {user.role}
              </span>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className='flex-1 overflow-y-auto py-4 sidebar-scrollbar'>
          {/* MAIN Section */}
          {mainItems.length > 0 && (
            <div className='mb-6'>
              {!isCollapsed && (
                <h3 className='px-6 text-[10px] font-bold text-[#777777] uppercase tracking-wider mb-2'>
                  Main
                </h3>
              )}
              <ul className='space-y-1'>
                {mainItems.map((item) => (
                  <NavItem
                    key={item.href}
                    item={item}
                    isActive={pathname === item.href}
                    isCollapsed={isCollapsed}
                    onClick={onCloseMobile}
                  />
                ))}
              </ul>
            </div>
          )}

          {/* DATABASE Section */}
          {databaseItems.length > 0 && (
            <div className='mb-6'>
              {!isCollapsed && (
                <h3 className='px-6 text-[10px] font-bold text-[#777777] uppercase tracking-wider mb-2'>
                  Database
                </h3>
              )}
              <ul className='space-y-1'>
                {databaseItems.map((item) => (
                  <NavItem
                    key={item.href}
                    item={item}
                    isActive={pathname.startsWith(item.href)}
                    isCollapsed={isCollapsed}
                    onClick={onCloseMobile}
                    hasChevron={true}
                  />
                ))}
              </ul>
            </div>
          )}

          {/* EVENTS Section */}
          {eventItems.length > 0 && (
            <div className='mb-6'>
              {!isCollapsed && (
                <h3 className='px-6 text-[10px] font-bold text-[#777777] uppercase tracking-wider mb-2'>
                  Events
                </h3>
              )}
              <ul className='space-y-1'>
                {eventItems.map((item) => (
                  <NavItem
                    key={item.href}
                    item={item}
                    isActive={pathname.startsWith(item.href)}
                    isCollapsed={isCollapsed}
                    onClick={onCloseMobile}
                    hasChevron={true}
                  />
                ))}
              </ul>
            </div>
          )}

          {/* USERS Section */}
          {userItems.length > 0 && (
            <div className='mb-6'>
              {!isCollapsed && (
                <h3 className='px-6 text-[10px] font-bold text-[#777777] uppercase tracking-wider mb-2'>
                  Users
                </h3>
              )}
              <ul className='space-y-1'>
                {userItems.map((item) => (
                  <NavItem
                    key={item.href}
                    item={item}
                    isActive={pathname.startsWith(item.href)}
                    isCollapsed={isCollapsed}
                    onClick={onCloseMobile}
                    hasChevron={true}
                  />
                ))}
              </ul>
            </div>
          )}

          {/* SYSTEM Section */}
          <div className='mb-6'>
            {!isCollapsed && (
              <h3 className='px-6 text-[10px] font-bold text-[#777777] uppercase tracking-wider mb-2'>
                System
              </h3>
            )}
            <ul className='space-y-1'>
              {systemItems.map((item) => (
                <NavItem
                  key={item.href}
                  item={item}
                  isActive={pathname.startsWith(item.href)}
                  isCollapsed={isCollapsed}
                  onClick={onCloseMobile}
                />
              ))}
              <li className='mt-2'>
                <button
                  onClick={logout}
                  className={cn(
                    "flex items-center w-full px-6 py-2 transition-colors border-l-4 border-transparent text-primary hover:text-red-400",
                    isCollapsed && "justify-center px-0"
                  )}>
                  <i
                    className={cn(
                      "fa-solid fa-arrow-right-from-bracket w-5 text-center text-sm",
                      !isCollapsed && "mr-3"
                    )}></i>
                  {!isCollapsed && <span className='text-sm font-medium'>Logout</span>}
                </button>
              </li>
            </ul>
          </div>
        </nav>

        {/* Footer */}
        <div className='px-6 py-4 border-t border-[#222222] mt-auto flex flex-col items-center md:items-start'>
          {!isCollapsed && <p className='text-xs text-[#777777] mb-1'>v1.0.0</p>}
          <Link
            href='/'
            className='text-xs text-primary hover:text-red-400 flex items-center transition-colors group'
            title='Back to site'>
            {!isCollapsed && "Back to site"}{" "}
            <ArrowRight
              className={cn("w-3 h-3 transition-transform group-hover:translate-x-1", !isCollapsed && "ml-1")}
            />
          </Link>
        </div>
      </aside>
    </>
  );
}

// Sub-component for navigation items to keep the code clean
function NavItem({
  item,
  isActive,
  isCollapsed,
  onClick,
  hasChevron = false,
}: {
  item: any;
  isActive: boolean;
  isCollapsed: boolean;
  onClick: () => void;
  hasChevron?: boolean;
}) {
  return (
    <li>
      <Link
        href={item.href}
        onClick={onClick}
        className={cn(
          "flex items-center px-6 py-2 transition-colors border-l-4 relative group",
          isActive
            ? "bg-primary text-white border-white"
            : "text-[#777777] hover:text-gray-200 border-transparent hover:border-gray-600",
          isCollapsed && "justify-center px-0 py-3"
        )}
        title={isCollapsed ? item.label : undefined}>
        <div className='flex items-center w-full'>
          <i
            className={cn(
              getIconClass(item.label),
              "w-5 text-center text-sm",
              !isCollapsed && "mr-3"
            )}></i>
          {!isCollapsed && (
            <span className={cn("text-sm", isActive && "font-medium")}>
              {item.label}
            </span>
          )}
        </div>
        {!isCollapsed && hasChevron && (
          <ChevronDown className='w-3 h-3 opacity-70 shrink-0' />
        )}
      </Link>
    </li>
  );
}
