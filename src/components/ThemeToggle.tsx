"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!mounted) {
    return <div className="h-10 w-10 rounded-full" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light Mode" : "Dark Mode"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E2D6] bg-white text-lg transition hover:bg-[#F5F0E6] dark:border-[#34453D] dark:bg-[#1E2B26] dark:hover:bg-[#34453D]"
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}
