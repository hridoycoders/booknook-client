import Link from "next/link";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "All Books", href: "/books" },
  { name: "Add Book", href: "/add-book" },
  { name: "My Books", href: "/my-books" },
  { name: "My Borrows", href: "/my-borrows" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#E8E2D6] bg-[#F5F0E6] text-[#263D36] dark:border-[#263D36] dark:bg-[#0D1713] dark:text-white">
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-12 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
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

            <p className="mt-2 max-w-xs text-[11px] leading-5 text-[#66736B] sm:text-sm sm:leading-6 dark:text-white/65">
              A little space for every reader. Discover your next favorite book
              and enjoy the journey of reading.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold text-[#263D36] sm:text-sm dark:text-[#F5F0E6]">
              Explore BookNook
            </h3>

            <div className="mt-3 flex flex-wrap gap-2 sm:flex-col sm:items-start">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md border border-[#E8E2D6] px-3 py-1.5 text-[10px] text-[#66736B] transition hover:border-[#D18B55] hover:text-[#D18B55] sm:border-0 sm:px-0 sm:py-1 sm:text-sm dark:border-white/15 dark:text-white/70 dark:hover:text-[#E5A66F]"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold text-[#263D36] sm:text-sm dark:text-[#F5F0E6]">
              Let's Connect
            </h3>

            <p className="mt-2 text-[11px] leading-5 text-[#66736B] sm:text-sm sm:leading-6 dark:text-white/65">
              Have a question or suggestion? Get in touch with us.
            </p>

            <a
              href="mailto:hridoyahmednoor30@gmail.com"
              className="mt-2 inline-flex items-center gap-2 text-[11px] font-semibold text-[#D18B55] transition hover:text-[#B96F38] sm:text-sm dark:text-[#D18B55] dark:hover:text-[#E5A66F]"
            >
              Contact Us <span>→</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 border-t border-[#E8E2D6] pt-4 sm:mt-10 sm:pt-6 dark:border-white/15">
          <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
            <p className="text-[9px] text-[#66736B]/75 sm:text-xs dark:text-white/50">
              © 2026 BookNook. All rights reserved.
            </p>

            <Link
              href="/"
              className="text-[9px] text-[#66736B]/75 transition hover:text-[#D18B55] sm:text-xs dark:text-white/50 dark:hover:text-[#E5A66F]"
            >
              Made for book lovers ♥
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
