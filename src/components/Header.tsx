"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import * as React from "react";
import { Container } from "./Container";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function Header() {
  const t = useTranslations("Header");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-none flex-col">
      <div className="h-20 pt-4 md:pt-6">
        <Container className="pointer-events-auto">
          <div className={cn(
            "flex gap-3 md:gap-4 items-center glass rounded-full px-3 pr-2 pl-4 md:px-4 md:pl-6 py-1.5 md:py-2",
            "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md"
          )}>
            <div className="flex flex-1">
              <Link 
                href="/" 
                className="flex items-center gap-2 md:gap-3 group"
              >
                <div className="relative h-10 w-10 flex items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-900/30 overflow-hidden shadow-sm group-hover:scale-110 transition-all duration-300">
                  <Image 
                    src="/assets/images/intro-icon-square.png" 
                    alt={t("logoAlt")} 
                    width={40} 
                    height={40}
                    sizes="40px"
                    className="object-contain"
                  />
                </div>
                <span className="text-xl font-bold font-display tracking-tight text-zinc-900 dark:text-white">
                  Skillio
                </span>
              </Link>
            </div>
            
            <div className="flex flex-1 justify-center">
              <nav className="hidden md:block">
                <ul className="flex gap-1 md:gap-1.5 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  <NavItem href="/#features">{t("nav.features")}</NavItem>
                  <NavItem href="/#pricing">{t("nav.pricing")}</NavItem>
                  <NavItem href="/#how-it-works">{t("nav.howItWorks")}</NavItem>
                </ul>
              </nav>
            </div>

            <div className="flex justify-end items-center flex-1 gap-3 md:gap-4">
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
        className="relative block px-4 py-3 min-h-[44px] min-w-[44px] flex items-center transition hover:text-teal-600 dark:hover:text-teal-400"
      >
        {children}
      </Link>
    </li>
  );
}
