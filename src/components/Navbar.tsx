"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "All Books", href: "/books" },
  { name: "Add Book", href: "/add-book" },
  { name: "My Books", href: "/my-books" },
  { name: "My Borrows", href: "/my-borrows" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const user = session?.user;

  const closeMenus = () => {
    setProfileOpen(false);
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      closeMenus();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b theme-border bg-[var(--background)]/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2.5 sm:px-6 sm:py-3 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenus}
          className="flex shrink-0 items-center gap-2 sm:gap-3"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#263D36] text-white dark:bg-[#D18B55] dark:text-[#121B18] sm:h-12 sm:w-12 sm:rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sm:h-[26px] sm:w-[26px]"
            >
              <path d="M12 7v14" />
              <path d="M3 18V5a2 2 0 0 1 2-2h4a3 3 0 0 1 3 3 3 3 0 0 1 3-3h4a2 2 0 0 1 2 2v13a1 1 0 0 1-1 1h-5a3 3 0 0 0-3 2 3 3 0 0 0-3-2H4a1 1 0 0 1-1-1Z" />
            </svg>
          </span>

          <span className="text-lg font-extrabold tracking-tight text-[#263D36] dark:text-[#F5F0E6] sm:text-[28px]">
            BookNook
          </span>
        </Link>

        {/* Desktop Navigation */}
        {!isPending && (
          <div className="hidden items-center gap-5 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-[#D18B55] dark:text-[#E5A66F]"
                    : "theme-muted hover:theme-text"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}

        {/* Right Side */}
        <div className="flex items-center gap-1 sm:gap-3">
          {/* Theme Toggle */}
          <div className="scale-[0.75] sm:scale-95">
            <ThemeToggle />
          </div>

          {/* Guest Login/Register */}
          {!isPending && !user && (
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                href="/login"
                className="rounded-lg px-4 py-2 text-sm font-semibold theme-text hover:bg-[var(--border)]"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="rounded-lg bg-[#263D36] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3B594D] dark:bg-[#D18B55] dark:text-[#121B18] dark:hover:bg-[#E5A66F]"
              >
                Register
              </Link>
            </div>
          )}

          {/* Modern Mobile Hamburger */}
          {!isPending && !user && (
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="group flex h-9 w-9 items-center justify-center rounded-xl border border-[#E8E2D6] bg-[#F5F0E6] transition-all duration-300 hover:border-[#D18B55] hover:bg-[#263D36] dark:border-[#34453D] dark:bg-[#1E2B26] dark:hover:bg-[#D18B55] lg:hidden sm:h-10 sm:w-10"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              <span className="flex w-[18px] flex-col items-center gap-[5px]">
                <span
                  className={`h-[2px] rounded-full bg-[#263D36] transition-all duration-300 group-hover:bg-white dark:bg-[#F5F0E6] dark:group-hover:bg-[#121B18] ${
                    menuOpen ? "w-5 translate-y-[7px] rotate-45" : "w-5"
                  }`}
                />
                <span
                  className={`h-[2px] rounded-full bg-[#263D36] transition-all duration-300 group-hover:bg-white dark:bg-[#F5F0E6] dark:group-hover:bg-[#121B18] ${
                    menuOpen ? "w-0 opacity-0" : "w-3"
                  }`}
                />
                <span
                  className={`h-[2px] rounded-full bg-[#263D36] transition-all duration-300 group-hover:bg-white dark:bg-[#F5F0E6] dark:group-hover:bg-[#121B18] ${
                    menuOpen ? "w-5 -translate-y-[7px] -rotate-45" : "w-4"
                  }`}
                />
              </span>
            </button>
          )}

          {/* Logged-in Profile */}
          {!isPending && user && (
            <div className="relative">
              {/* Navbar Profile Banner */}
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="flex items-center gap-1 rounded-lg border border-[#D18B55]/40 bg-[#263D36] px-1 py-0.5 text-white shadow-sm transition hover:bg-[#344F43] dark:border-[#263D36]/20 dark:bg-[#F5F0E6] dark:text-[#263D36] dark:hover:bg-white sm:gap-2.5 sm:rounded-xl sm:px-3 sm:py-2"
                aria-label="Open profile menu"
                aria-expanded={profileOpen}
              >
                {/* Profile Image */}
                <div className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-md border border-[#D18B55] bg-[#DCD5C9] text-xs font-bold text-[#263D36] sm:h-10 sm:w-10 sm:rounded-lg sm:text-sm">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "Profile"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    user.name?.charAt(0)?.toUpperCase() || "U"
                  )}
                </div>

                {/* Member Name */}
                <div className="min-w-0 text-left">
                  <p className="max-w-[65px] truncate text-[9px] font-bold sm:max-w-[140px] sm:text-sm">
                    {user.name || "User"}
                  </p>

                  <p className="text-[7px] font-medium text-[#E5A66F] dark:text-[#BD7641] sm:text-[10px]">
                    BookNook Member
                  </p>
                </div>

                {/* Dropdown Arrow */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`shrink-0 transition-transform duration-200 sm:h-4 sm:w-4 ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <>
                  <button
                    type="button"
                    aria-label="Close profile menu"
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={closeMenus}
                  />

                  <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-[#D18B55]/30 bg-[#263D36] text-white shadow-xl dark:border-[#263D36]/20 dark:bg-[#F5F0E6] dark:text-[#263D36] sm:w-72">
                    {/* Profile Banner */}
                    <div className="relative h-20 overflow-hidden bg-gradient-to-r from-[#17251F] via-[#263D36] to-[#3B594D] dark:from-[#EDE5D8] dark:via-[#F5F0E6] dark:to-[#DCD5C9]">
                      <div className="absolute -right-5 -top-10 h-28 w-28 rounded-full border-[16px] border-white/10 dark:border-[#263D36]/10" />

                      <div className="absolute -bottom-10 left-16 h-24 w-24 rounded-full bg-white/10 blur-2xl dark:bg-[#263D36]/10" />

                      <p className="absolute bottom-3 left-4 text-[10px] font-bold uppercase tracking-[2px] text-white/80 dark:text-[#263D36]/70">
                        BookNook Member
                      </p>
                    </div>

                    {/* Profile Information */}
                    <div className="relative border-b border-white/15 px-3 pb-3 dark:border-[#263D36]/15">
                      <div className="-mt-8 mb-2 flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border-[3px] border-[#263D36] bg-[#DCD5C9] text-xl font-bold text-[#263D36] shadow-md dark:border-[#F5F0E6] dark:bg-[#DCD5C9]">
                        {user.image ? (
                          <img
                            src={user.image}
                            alt={user.name || "Profile"}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          user.name?.charAt(0)?.toUpperCase() || "U"
                        )}
                      </div>

                      <h3 className="truncate text-sm font-bold">
                        {user.name || "User"}
                      </h3>

                      <p className="mt-0.5 truncate text-[11px] text-white/60 dark:text-[#263D36]/60">
                        {user.email}
                      </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="space-y-0.5 p-2">
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={closeMenus}
                          className={`block rounded-lg px-3 py-2 text-xs font-medium transition ${
                            pathname === link.href
                              ? "bg-[#F5F0E6] text-[#263D36] dark:bg-[#263D36] dark:text-white"
                              : "text-white/90 hover:bg-white/10 dark:text-[#263D36] dark:hover:bg-[#263D36]/10"
                          }`}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>

                    {/* Account Actions */}
                    <div className="border-t border-white/15 p-2 dark:border-[#263D36]/15">
                      <Link
                        href="/update-profile"
                        onClick={closeMenus}
                        className="block rounded-lg px-3 py-2 text-xs font-semibold text-[#E5A66F] transition hover:bg-white/10 dark:text-[#BD7641] dark:hover:bg-[#263D36]/10"
                      >
                        Update Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full rounded-lg px-3 py-2 text-left text-xs font-semibold text-red-300 transition hover:bg-red-500/10 dark:text-red-600 dark:hover:bg-red-500/10"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Modern Mobile Navigation */}
      {menuOpen && !user && (
        <div className="border-t border-[#E8E2D6] bg-[#F5F0E6] px-4 py-4 dark:border-[#34453D] dark:bg-[#121B18] lg:hidden">
          <div className="mx-auto max-w-7xl">
            <div className="overflow-hidden rounded-2xl border border-[#E8E2D6] bg-white p-3 shadow-lg dark:border-[#34453D] dark:bg-[#1E2B26]">
              {/* Menu Heading */}
              <div className="mb-2 px-3 py-2">
                <p className="text-xs font-bold uppercase tracking-[2px] text-[#BD7641] dark:text-[#E5A66F]">
                  Explore BookNook
                </p>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenus}
                    style={{ animationDelay: `${index * 50}ms` }}
                    className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition-all duration-200 ${
                      pathname === link.href
                        ? "bg-[#263D36] text-white shadow-sm dark:bg-[#D18B55] dark:text-[#121B18]"
                        : "text-[#263D36] hover:bg-[#F5F0E6] dark:text-[#F5F0E6] dark:hover:bg-[#34453D]"
                    }`}
                  >
                    <span>{link.name}</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-60"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </Link>
                ))}
              </div>

              {/* Login / Register */}
              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#E8E2D6] pt-4 dark:border-[#34453D]">
                <Link
                  href="/login"
                  onClick={closeMenus}
                  className="rounded-xl border border-[#E8E2D6] bg-[#F5F0E6] px-4 py-3 text-center text-sm font-bold text-[#263D36] transition hover:border-[#D18B55] hover:bg-[#EDE5D8] dark:border-[#34453D] dark:bg-[#26352E] dark:text-[#F5F0E6] dark:hover:bg-[#34453D]"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  onClick={closeMenus}
                  className="rounded-xl bg-[#263D36] px-4 py-3 text-center text-sm font-bold text-white shadow-sm transition hover:bg-[#3B594D] dark:bg-[#D18B55] dark:text-[#121B18] dark:hover:bg-[#E5A66F]"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
