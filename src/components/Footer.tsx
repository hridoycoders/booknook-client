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
    <footer className="bg-[#263d36] text-white">
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-12 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="text-xl font-extrabold sm:text-2xl">
              Book<span className="text-[#d18b55]">Nook</span>
            </Link>

            <p className="mt-2 max-w-xs text-[11px] leading-5 text-white/60 sm:text-sm sm:leading-6">
              A little space for every reader. Discover your next favorite book
              and enjoy the journey of reading.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold sm:text-sm">Explore BookNook</h3>

            <div className="mt-3 flex flex-wrap gap-2 sm:flex-col sm:items-start">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md border border-white/15 px-3 py-1.5 text-[10px] text-white/70 transition hover:border-[#d18b55] hover:text-[#d18b55] sm:border-0 sm:px-0 sm:py-1 sm:text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold sm:text-sm">Let's Connect</h3>

            <p className="mt-2 text-[11px] leading-5 text-white/60 sm:text-sm sm:leading-6">
              Have a question or suggestion? Get in touch with us.
            </p>

            <a
              href="mailto:hridoyahmednoor30@gmail.com"
              className="mt-2 inline-flex items-center gap-2 text-[11px] font-semibold text-[#d18b55] transition hover:text-white sm:text-sm"
            >
              Contact Us <span>→</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 border-t border-white/10 pt-4 sm:mt-10 sm:pt-6">
          <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
            <p className="text-[9px] text-white/50 sm:text-xs">
              © 2026 BookNook. All rights reserved.
            </p>

            <Link
              href="/"
              className="text-[9px] text-white/50 transition hover:text-[#d18b55] sm:text-xs"
            >
              Made for book lovers ♥
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
