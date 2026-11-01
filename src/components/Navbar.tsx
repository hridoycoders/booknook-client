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

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const user = session?.user;

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      setProfileOpen(false);
      setMenuOpen(false);
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const closeMenus = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b theme-border bg-[var(--background)]/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenus}
          className="flex shrink-0 items-center gap-2"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#263D36] text-white dark:bg-[#D18B55] dark:text-[#121B18]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 7v14" />
              <path d="M3 18V5a2 2 0 0 1 2-2h4a3 3 0 0 1 3 3 3 3 0 0 1 3-3h4a2 2 0 0 1 2 2v13a1 1 0 0 1-1 1h-5a3 3 0 0 0-3 2 3 3 0 0 0-3-2H4a1 1 0 0 1-1-1Z" />
            </svg>
          </span>

          <span className="text-xl font-bold tracking-tight text-[#263D36] dark:text-[#F5F0E6] sm:text-2xl">
            BookNook
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 lg:flex">
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

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Login / Register */}
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
                className="rounded-lg bg-[#263D36] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#344F45] dark:bg-[#D18B55] dark:text-[#121B18] dark:hover:bg-[#E5A66F]"
              >
                Register
              </Link>
            </div>
          )}

          {/* Profile */}
          {!isPending && user && (
            <div className="relative">
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#263D36] bg-[#DCD5C9] text-sm font-bold text-[#263D36] shadow-sm transition hover:border-[#D18B55] dark:border-[#D18B55] dark:bg-[#34453D] dark:text-[#F5F0E6]"
                aria-expanded={profileOpen}
                aria-label="Open profile menu"
              >
                {user.name?.charAt(0)?.toUpperCase() || "U"}
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-3 w-56 overflow-hidden rounded-xl border theme-border theme-card shadow-lg">
                  <div className="border-b theme-border px-4 py-3">
                    <p className="truncate text-sm font-semibold theme-text">
                      {user.name || "User"}
                    </p>
                    <p className="truncate text-xs theme-muted">{user.email}</p>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-3 text-sm theme-text transition hover:bg-[var(--background)]"
                  >
                    My Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-xl theme-text transition hover:bg-[var(--border)] lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="m18 6-12 12M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t theme-border theme-bg px-4 py-3 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenus}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                  pathname === link.href
                    ? "bg-[#263D36] text-white dark:bg-[#D18B55] dark:text-[#121B18]"
                    : "theme-text hover:bg-[var(--border)]"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Login / Register */}
            {!isPending && !user && (
              <div className="mt-2 flex gap-2 border-t theme-border pt-3 sm:hidden">
                <Link
                  href="/login"
                  onClick={closeMenus}
                  className="flex-1 rounded-lg border theme-border px-4 py-2.5 text-center text-sm font-semibold theme-text"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  onClick={closeMenus}
                  className="flex-1 rounded-lg bg-[#263D36] px-4 py-2.5 text-center text-sm font-semibold text-white dark:bg-[#D18B55] dark:text-[#121B18]"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
