"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BriefcaseBusiness, LogOut, Menu, Moon, Sun, User, X } from "lucide-react";
import { useState } from "react";
import { appNavItems } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { buttonStyles } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/95">
      <nav className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3"
          onClick={() => setIsOpen(false)}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-emerald-600 text-white">
            <BriefcaseBusiness className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-bold text-neutral-950 dark:text-white">
              KaarYab Afghanistan
            </span>
            <span className="block text-xs font-medium text-neutral-500 dark:text-neutral-400">
              Opportunity Finder
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {appNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-semibold text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-white",
                pathname === item.href &&
                  "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Badge className="hidden sm:inline-flex" tone="amber">
            Demo Data
          </Badge>
          <button
            type="button"
            className={buttonStyles({ variant: "ghost", size: "icon" })}
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Moon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>

          {user ? (
            <button
              type="button"
              className={buttonStyles({
                variant: "outline",
                size: "sm",
                className: "hidden sm:inline-flex",
              })}
              onClick={signOut}
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Sign out
            </button>
          ) : (
            <Link
              href="/auth"
              className={buttonStyles({
                variant: "secondary",
                size: "sm",
                className: "hidden sm:inline-flex",
              })}
            >
              <User className="h-4 w-4" aria-hidden="true" />
              Sign in
            </Link>
          )}

          <button
            type="button"
            className={buttonStyles({
              variant: "outline",
              size: "icon",
              className: "lg:hidden",
            })}
            onClick={() => setIsOpen((current) => !current)}
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {isOpen ? (
        <div className="border-t border-neutral-200 bg-white px-4 py-4 dark:border-neutral-800 dark:bg-neutral-950 lg:hidden">
          <div className="mx-auto grid w-full max-w-7xl gap-2">
            {appNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-900",
                  pathname === item.href &&
                    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200",
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-wrap items-center gap-2 border-t border-neutral-200 pt-3 dark:border-neutral-800">
              <Badge tone="amber">Demo Data</Badge>
              {user ? (
                <button
                  type="button"
                  className={buttonStyles({ variant: "outline", size: "sm" })}
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  Sign out
                </button>
              ) : (
                <Link
                  href="/auth"
                  className={buttonStyles({ variant: "secondary", size: "sm" })}
                  onClick={() => setIsOpen(false)}
                >
                  <User className="h-4 w-4" aria-hidden="true" />
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
