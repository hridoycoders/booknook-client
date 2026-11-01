"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "All Books", href: "/books" },
  { name: "Add Book", href: "/add-book" },
  { name: "My Books", href: "/my-books" },
  { name: "My Borrows", href: "/my-borrows" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  const linkClass = (href: string) =>
    `whitespace-nowrap rounded-md px-3 py-2 text-[13px] font-semibold transition-colors ${
      isActive(href)
        ? "bg-[#263d36] text-white"
        : "text-[#66736b] hover:bg-[#f0ebe1] hover:text-[#263d36]"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[#e8e2d6] bg-[#ffffff]/95 backdrop-blur-md">
      <nav className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="shrink-0 text-[25px] font-extrabold tracking-tight text-[#263d36]"
        >
          BookNook<span className="text-[#d18b55]">.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden flex-1 items-center justify-center gap-1 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClass(link.href)}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden shrink-0 items-center gap-4 xl:flex">
          <Link
            href="/login"
            className="text-sm font-semibold text-[#263d36] transition hover:text-[#d18b55]"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="rounded-md bg-[#263d36] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3b594d]"
          >
            Registration
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-[#e8e2d6] text-[#263d36] transition hover:bg-[#f5f0e6] xl:hidden"
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile / Tablet Menu */}
      {menuOpen && (
        <div className="border-t border-[#e8e2d6] bg-white px-4 py-5 shadow-lg xl:hidden sm:px-6">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={linkClass(link.href)}
              >
                {link.name}
              </Link>
            ))}

            <div className="mt-3 flex flex-col gap-3 border-t border-[#e8e2d6] pt-4 sm:flex-row">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="rounded-md border border-[#263d36] px-5 py-2.5 text-center text-sm font-semibold text-[#263d36] transition hover:bg-[#f5f0e6]"
              >
                Login
              </Link>

              <Link
                href="/signup"
                onClick={() => setMenuOpen(false)}
                className="rounded-md bg-[#263d36] px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#3b594d]"
              >
                Registration
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
