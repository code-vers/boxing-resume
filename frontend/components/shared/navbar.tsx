'use client';

import { ROLES } from '@/constants/roles';
import { useAuth } from '@/providers/auth-provider';
import { LayoutDashboard, Menu, ShoppingCart, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

/**
 * @constant navItems
 * @description Array of navigation links used to populate the desktop and mobile menus.
 * @type {Array<{label: string, href: string}>}
 */
const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Ratings', href: '/ratings' },
  { label: 'Schedule', href: '/schedule' },
  { label: 'Results', href: '/results' },
  { label: 'Champions', href: '/champions' },
  { label: 'Fighters', href: '/fighters' },
  { label: 'Events', href: '/events' },
  { label: 'Titles', href: '/titles' },
];

/**
 * @component Navbar
 * @description Main application navigation header. Features a dark-themed responsive design,
 * authenticates user state for specific call-to-actions, and handles mobile menu toggling.
 * @returns {JSX.Element} The rendered navigation bar component.
 */
export default function Navbar() {
  /**
   * @state isMobileMenuOpen
   * @description Tracks the visibility state of the mobile navigation dropdown.
   */
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = usePathname();
  const { user, isLoading, logout } = useAuth();

  /**
   * @function closeMobileMenu
   * @description Helper function to close the mobile menu when a navigation event occurs.
   * @returns {void}
   */
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  /**
   * @constant isDashboardRoute
   * @description Determines if the current route is within the dashboard area to conditionally hide standard navigation.
   * @type {boolean}
   */
  const isDashboardRoute = pathname === '/dashboard' || pathname.startsWith('/dashboard/');

  /**
   * @function isNavItemActive
   * @description Evaluates if a given navigation link matches the current active route.
   * @param {string} href - The target URL path of the navigation item.
   * @returns {boolean} True if the route is active, false otherwise.
   */
  const isNavItemActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const isProfileActive = pathname === '/profile' || pathname.startsWith('/profile/');
  const isProfileIconActive = isProfileActive || isDashboardRoute;
  const profileHref = '/profile';
  const showLoggedInActions = !isLoading && Boolean(user);

  /**
   * @section Header Container
   * @description Enforces a high z-index (z-50) to ensure the mobile dropdown and navbar
   * always sit above all other page content.
   */
  return (
    <header className='relative z-50 w-full bg-card-dark text-surface-white border-b border-stroke-strong'>
      <div className='mx-auto px-4 sm:px-6 md:px-8 xl:px-12'>
        <div className='flex h-20 w-full items-center justify-between gap-4'>
          {/* * @section Logo Brand
           * @description CSS-styled replica of the "BOXING RESUME" logo for crisp rendering on all screens.
           */}
          <div className='flex items-center'>
            <Link href='/' className='shrink-0' onClick={closeMobileMenu}>
              <div className='flex flex-col uppercase font-black leading-none tracking-wide'>
                <span className='text-[22px] sm:text-[24px] text-surface-white'>Boxing</span>
                <span className='text-[11px] sm:text-[12px] text-text-accent tracking-[0.15em]'>
                  Resume
                </span>
              </div>
            </Link>
          </div>

          {/* * @section Desktop Navigation
           * @description Hidden on mobile (lg:hidden), displayed as a flex row on large screens.
           */}
          {!isDashboardRoute && (
            <nav className='hidden lg:flex items-center gap-6 xl:gap-8'>
              {navItems.map((item) => {
                const active = isNavItemActive(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`text-[16px] font-medium transition-colors duration-200 ${
                      active ? 'text-text-accent' : 'text-text-disabled hover:text-surface-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* * @section Actions & Utilities
           * @description Contains Auth buttons, Profile icon, and Mobile Menu Toggle.
           */}
          <div className='flex items-center gap-3 sm:gap-4'>
            {/* * @block Desktop Actions
             * @description Authentication and profile links, hidden on small devices.
             */}
            <div className='hidden lg:flex items-center gap-4'>
              {showLoggedInActions || isDashboardRoute ? (
                <>
                  {user?.role === ROLES.USER && (
                    <Link
                      href='/cart'
                      aria-label='Cart'
                      className='text-text-disabled transition-colors hover:text-surface-white'
                    >
                      <ShoppingCart size={20} />
                    </Link>
                  )}
                  {showLoggedInActions && (user?.role === ROLES.ADMIN || user?.role === ROLES.MANAGER) && (
                    <Link
                      href='/dashboard'
                      aria-label='Go to dashboard'
                      className='inline-flex items-center gap-2 rounded-md border border-stroke-medium px-4 py-2 text-sm font-medium text-surface-white transition-colors hover:bg-surface-white/10'
                    >
                      <LayoutDashboard size={16} />
                      Dashboard
                    </Link>
                  )}
                  <div className='flex items-center gap-3'>
                    <Link
                      href={profileHref}
                      aria-label='Go to profile'
                      className={`inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 bg-surface-white/10 transition-all ${
                        isProfileIconActive
                          ? 'border-text-accent'
                          : 'border-stroke-medium hover:border-surface-white'
                      }`}
                    >
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name || 'Profile'}
                          className='h-full w-full object-cover'
                        />
                      ) : (
                        <span className="text-sm font-bold text-surface-white uppercase">
                          {user?.name?.charAt(0) || 'U'}
                        </span>
                      )}
                    </Link>
                    <div className="flex flex-col hidden xl:flex">
                      <span className="text-sm font-semibold text-surface-white">{user?.name}</span>
                      <span className="text-xs text-text-disabled capitalize">{user?.role?.toLowerCase()}</span>
                    </div>
                    <button
                      onClick={() => logout()}
                      className="ml-2 text-xs font-medium text-text-disabled hover:text-red-500 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href='/login'
                    className='rounded-md border border-stroke-medium px-5 py-2 text-sm font-medium text-surface-white transition-colors hover:bg-surface-white/10'
                  >
                    Log In
                  </Link>
                  <Link
                    href='/signup'
                    className='rounded-md bg-btn-primary px-5 py-2 text-sm font-medium text-surface-white transition-colors hover:bg-btn-primary-hover'
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* * @block Mobile Controls
             * @description Mobile-specific profile shortcut and hamburger menu toggle.
             */}
            <div className='flex items-center gap-3 lg:hidden'>
              {showLoggedInActions && (
                <Link
                  href={profileHref}
                  className='inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stroke-medium bg-surface-white/10'
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name || 'Profile'}
                      className='h-full w-full object-cover'
                    />
                  ) : (
                    <span className="text-xs font-bold text-surface-white uppercase">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  )}
                </Link>
              )}
              {!isDashboardRoute && (
                <button
                  type='button'
                  aria-expanded={isMobileMenuOpen}
                  aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                  onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                  className='inline-flex h-10 w-10 items-center justify-center rounded-md border border-stroke-medium text-surface-white transition-colors hover:bg-surface-white/10 active:scale-95'
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* * @section Mobile Navigation Dropdown
         * @description Absolute positioned full-width menu with explicit z-index, max-height, and scrolling
         * to prevent clipping on small devices. Includes smooth animation.
         */}
        {!isDashboardRoute && isMobileMenuOpen && (
          <div className='absolute top-full left-0 right-0 z-50 flex max-h-[calc(100vh-5rem)] flex-col overflow-y-auto border-b border-stroke-strong bg-card-dark px-4 pb-6 pt-4 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 lg:hidden'>
            <nav className='flex flex-col gap-1'>
              {navItems.map((item) => {
                const active = isNavItemActive(item.href);
                return (
                  <Link
                    key={`mobile-${item.label}`}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`rounded-md px-4 py-3.5 text-base font-medium transition-colors ${
                      active
                        ? 'bg-text-accent/10 text-text-accent'
                        : 'text-text-disabled hover:bg-surface-white/5 hover:text-surface-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {/* * @block Mobile Auth Actions
               * @description Renders prominent authentication buttons at the bottom of the mobile drawer.
               */}
              {!showLoggedInActions && (
                <div className='mt-4 flex flex-col gap-3 border-t border-stroke-medium pt-5'>
                  <Link
                    href='/login'
                    onClick={closeMobileMenu}
                    className='flex w-full items-center justify-center rounded-md border border-stroke-medium px-4 py-3.5 text-base font-medium text-surface-white hover:bg-surface-white/10 transition-colors active:bg-surface-white/20'
                  >
                    Log In
                  </Link>
                  <Link
                    href='/signup'
                    onClick={closeMobileMenu}
                    className='flex w-full items-center justify-center rounded-md bg-btn-primary px-4 py-3.5 text-base font-medium text-surface-white hover:bg-btn-primary-hover transition-colors active:scale-[0.98]'
                  >
                    Register
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
