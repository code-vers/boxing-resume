"use client";

import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { ROLES } from "@/constants/roles";

const navItems = [
  { label: "Map", href: "/map" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Benefits", href: "/benefits" },
  { label: "About", href: "/about" },
  { label: "Contact us", href: "/contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isLoading } = useAuth();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const isDashboardRoute =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  const isNavItemActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);
  const isProfileActive =
    pathname === "/profile" || pathname.startsWith("/profile/");
  const isProfileIconActive = isProfileActive || isDashboardRoute;
  const profileHref = "/profile";
  const showLoggedInActions = !isLoading && Boolean(user);

  return (
    <header
      className={`relative z-30 bg-[#f1f5ec] ${
        isDashboardRoute ? "" : "border-b border-line-weak"
      }`}>
      <div className='mx-2 md:mx-12.5'>
        <div className='flex h-17 w-full items-center justify-between gap-4'>
          <div className='flex min-w-0 items-center gap-10'>
            <Link href='/' className='shrink-0' onClick={closeMobileMenu}>
              {/* <Image
                src="/home/logo.png"
                alt="Logo"
                width={194}
                height={40}
                priority
                className="h-8 w-auto sm:h-9"
              /> */}
              <p className='text-3xl font-medium'>Logo</p>
            </Link>

            {!isDashboardRoute ? (
              <nav className='hidden items-center gap-7 lg:flex'>
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-current={
                      isNavItemActive(item.href) ? "page" : undefined
                    }
                    className={`text-base transition-colors ${
                      isNavItemActive(item.href)
                        ? "text-text-brand-strong text-2xl font-bold"
                        : "font-normal text-gray-900 hover:text-text-brand-strong"
                    }`}>
                    {item.label}
                  </Link>
                ))}
              </nav>
            ) : null}
          </div>

          <div className='flex items-center gap-2 sm:gap-4'>
            <div className='hidden items-center gap-3 sm:gap-4 lg:flex'>
              {showLoggedInActions || isDashboardRoute ? (
                <>
                  {user?.role === ROLES.USER && (
                    <Link
                      href='/cart'
                      aria-label='Cart'
                      className='text-text-strong transition-colors hover:text-[#0c3173]'>
                      <ShoppingCart size={20} />
                    </Link>
                  )}
                  {showLoggedInActions ? (
                    <Link
                      href='/dashboard'
                      aria-label='Go to dashboard'
                      className='inline-flex items-center gap-2 rounded-md bg-[#516933] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#73914c]'>
                      <LayoutDashboard size={16} />
                      Dashboard
                    </Link>
                  ) : null}
                  <Link
                    href={profileHref}
                    aria-label='Go to profile'
                    className={`inline-flex h-9 w-9 overflow-hidden rounded-full border transition-colors ${
                      isProfileIconActive
                        ? "border-brand-default"
                        : "border-line-weaker hover:border-brand-default/60"
                    }`}>
                    <Image
                      src='/home/latest/latest1.jpg'
                      alt='Profile'
                      width={36}
                      height={36}
                      className='h-full w-full object-cover'
                    />
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href='/login'
                    className='rounded-md bg-[#516933] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#73914c]'>
                    Log in
                  </Link>

                  <Link
                    href='/signup'
                    className='inline-flex items-center rounded-md bg-fill-brand-strong px-3 py-2 text-sm font-medium text-white transition-colors bg-[#12418f] hover:bg-[#09244d]'>
                    Sign up
                  </Link>
                </>
              )}
            </div>

            <div className='flex items-center gap-2 lg:hidden'>
              {showLoggedInActions || isDashboardRoute ? (
                <>
                  {user?.role === ROLES.USER && (
                    <Link
                      href='/cart'
                      aria-label='Cart'
                      className='mr-1 text-text-strong transition-colors hover:text-[#0c3173]'>
                      <ShoppingCart size={18} />
                    </Link>
                  )}
                  {showLoggedInActions ? (
                    <Link
                      href='/dashboard'
                      aria-label='Go to dashboard'
                      className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#516933] text-white transition-colors hover:bg-[#73914c]'>
                      <LayoutDashboard size={16} />
                    </Link>
                  ) : null}
                  <Link
                    href={profileHref}
                    aria-label='Go to profile'
                    className={`inline-flex h-8 w-8 overflow-hidden rounded-full border transition-colors ${
                      isProfileIconActive
                        ? "border-brand-default"
                        : "border-line-weaker hover:border-brand-default/60"
                    }`}>
                    <Image
                      src='/home/latest/latest1.jpg'
                      alt='Profile'
                      width={32}
                      height={32}
                      className='h-full w-full object-cover'
                    />
                  </Link>
                </>
              ) : null}

              {!isDashboardRoute ? (
                <button
                  type='button'
                  aria-expanded={isMobileMenuOpen}
                  aria-label={
                    isMobileMenuOpen
                      ? "Close navigation menu"
                      : "Open navigation menu"
                  }
                  onClick={() => setIsMobileMenuOpen((prevState) => !prevState)}
                  className='inline-flex h-8 w-8 items-center justify-center rounded-sm border border-line-weaker text-text-strong'>
                  {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
                </button>
              ) : null}
            </div>
          </div>
        </div>

        {!isDashboardRoute && isMobileMenuOpen && (
          <div className='absolute top-full right-0 left-0 border-t border-black/5 bg-white px-4 py-4 shadow-[0_14px_30px_rgba(0,0,0,0.08)] sm:px-6'>
            <nav className='flex flex-col'>
              {navItems.map((item) => (
                <Link
                  key={`mobile-${item.label}`}
                  href={item.href}
                  onClick={closeMobileMenu}
                  aria-current={isNavItemActive(item.href) ? "page" : undefined}
                  className={`rounded-sm px-2 py-2 text-sm transition-colors ${
                    isNavItemActive(item.href)
                      ? "text-text-brand-strong font-bold"
                      : "hover:text-text-brand-strong font-normal text-gray-900 hover:bg-fill-hover"
                  }`}>
                  {item.label}
                </Link>
              ))}

              {!showLoggedInActions ? (
                <>
                  <Link
                    href='/signup'
                    onClick={closeMobileMenu}
                    className='mt-2 inline-flex h-10 items-center justify-center rounded-sm bg-fill-brand-strong px-2 text-sm font-medium text-white transition-colors hover:bg-[#12418f]'>
                    Sign up
                  </Link>

                  <Link
                    href='/login'
                    onClick={closeMobileMenu}
                    className='mt-2 inline-flex h-10 items-center justify-center rounded-sm border border-line-weaker px-2 py-2 text-sm font-medium hover:bg-fill-hover text-white hover:text-white transition-colors bg-[#516933] hover:bg-[#73914c]'>
                    Log in
                  </Link>
                </>
              ) : null}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
