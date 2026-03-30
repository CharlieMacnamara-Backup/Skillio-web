"use client";

import Link from "next/link";
import Image from "next/image";
import * as React from "react";
import { Container } from "./Container";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { logger } from "@/lib/logger";

export function Header() {
  React.useEffect(() => {
    logger.logResource("Header", "mounted");
    return () => logger.logResource("Header", "disposed");
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-none flex-col">
      <div className="h-20 pt-6">
        <Container className="pointer-events-auto">
          <div className={cn(
            "flex gap-4 items-center glass rounded-full px-4 pr-2 pl-6 py-2",
            "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md"
          )}>
            <div className="flex flex-1">
              <Link 
                href="/" 
                className="flex items-center gap-3 group"
                onClick={() => logger.logEvent("Header", "Logo clicked")}
              >
                <div className="relative h-10 w-10 flex items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-900/30 overflow-hidden shadow-sm group-hover:scale-110 transition-all duration-300">
                  <Image 
                    src="/assets/images/intro-icon-square.png" 
                    alt="Skillio Logo" 
                    width={40} 
                    height={40}
                    sizes="40px"
                    className="object-contain"
                  />
                </div>
                <span className="text-xl font-bold font-display text-zinc-900 dark:text-white tracking-tight">
                  Skillio
                </span>
              </Link>
            </div>
            
            <div className="flex flex-1 justify-center">
              <nav className="hidden md:block">
                <ul className="flex gap-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  <NavItem href="/#how-it-works">How it Works</NavItem>
                  <NavItem href="/#features">Features</NavItem>
                  <NavItem href="/#get-started">Pricing</NavItem>
                </ul>
              </nav>
            </div>

            <div className="flex justify-end items-center flex-1 gap-4">
               <ThemeToggle />
            </div>
          </div>
        </Container>
      </div>
    </header>
  )
}

function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="relative block px-3 py-2 transition hover:text-teal-600 dark:hover:text-teal-400"
        onClick={() => logger.logEvent("Header", `NavItem clicked: ${href}`)}
      >
        {children}
      </Link>
    </li>
  );
}
