"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { logger } from "@/lib/logger";

/**
 * Standard Next.js Dark Mode Toggle - Declarative Approach
 */
export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    logger.logResource("ThemeToggle", "mounted");
    return () => logger.logResource("ThemeToggle", "disposed");
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 animate-pulse border border-transparent" />
    );
  }

  const toggleTheme = () => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    logger.logStateChange("Theme", theme, nextTheme);
    setTheme(nextTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-900 transition-all hover:bg-zinc-50 border border-zinc-200/50 shadow-sm dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:border-zinc-700/30"
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-teal-400" />
    </button>
  );
}
