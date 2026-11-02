import Link from "next/link";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/hridoycoders",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.05c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.64-5.48 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12 12 0 0 0 12 .5Z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/hridoy-ahmed1/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.25 2.36 4.25 5.43v6.31ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/hridoy_ahmed_noor/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-4 w-4"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/HridoyAhmedNoor1",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7c-.8-.1-1.7-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8h3.4Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#E8E2D6] bg-[#F5F0E6] text-[#263D36] dark:border-[#263D36] dark:bg-[#0D1713] dark:text-white">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-14">
        <div className="flex flex-col items-center justify-between gap-5 text-center sm:gap-7 md:flex-row md:items-start md:text-left lg:gap-10">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#263D36] text-white dark:bg-[#D18B55] dark:text-[#121B18] sm:h-10 sm:w-10">
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
              <span className="text-lg font-extrabold tracking-tight sm:text-xl lg:text-2xl">
                BookNook<span className="text-[#D18B55]">.</span>
              </span>
            </Link>

            <p className="mx-auto mt-2 max-w-xs text-xs leading-5 text-[#66736B] sm:mt-3 sm:text-sm sm:leading-6 md:mx-0 dark:text-white/60">
              A little space for every reader. Discover your next favorite book
              and make every reading moment special.
            </p>

            <p className="mt-1.5 text-[10px] font-medium italic text-[#D18B55] sm:mt-2 sm:text-xs">
              Every book opens a new world.
            </p>
          </div>

          {/* Social Links */}
          <div className="w-full md:w-auto">
            <h3 className="text-xs font-bold uppercase tracking-wider sm:text-sm sm:tracking-[0.15em]">
              Follow My Journey
            </h3>
            <p className="mt-1 text-[11px] text-[#66736B] sm:mt-2 sm:text-sm dark:text-white/60">
              Connect with me on social media.
            </p>

            <div className="mt-3 flex justify-center gap-2 sm:mt-4 sm:gap-3 md:justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit my ${social.name} profile`}
                  title={social.name}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E8E2D6] bg-white text-[#263D36] transition-all duration-300 hover:-translate-y-1 hover:border-[#D18B55] hover:bg-[#D18B55] hover:text-white sm:h-10 sm:w-10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-[#D18B55] dark:hover:bg-[#D18B55]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="max-w-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider sm:text-sm sm:tracking-[0.15em]">
              Let's Connect
            </h3>
            <p className="mt-1 text-[11px] leading-5 text-[#66736B] sm:mt-3 sm:text-sm sm:leading-6 dark:text-white/60">
              Have a question or suggestion? Feel free to reach out.
            </p>
            <a
              href="mailto:hridoyahmednoor30@gmail.com"
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#D18B55] transition hover:text-[#B96F38] sm:mt-4 sm:gap-2 sm:text-sm dark:hover:text-[#E5A66F]"
            >
              <span>✉</span>
              Contact Me
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-5 border-t border-[#E8E2D6] pt-3 sm:mt-8 sm:pt-5 lg:mt-10 lg:pt-6 dark:border-white/10">
          <div className="flex flex-row items-center justify-between gap-2">
            <p className="text-[9px] text-[#66736B] sm:text-xs dark:text-white/50">
              © {new Date().getFullYear()} BookNook. All rights reserved.
            </p>
            <p className="text-[9px] text-[#66736B] sm:text-xs dark:text-white/50">
              Made with <span className="text-[#D18B55]">♥</span> for readers.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
