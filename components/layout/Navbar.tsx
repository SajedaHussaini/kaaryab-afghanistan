"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BriefcaseBusiness, LogOut, Menu, Moon, Sun, User, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { appNavItems } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { buttonStyles } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
  setIsOpen((current) => !current);
}, []);

const closeMenu = useCallback(() => {
  setIsOpen(false);
}, []);

const handleSignOut = useCallback(() => {
  signOut();
  setIsOpen(false);
}, [signOut]);

  const navItems = useMemo(
  () =>
    user
      ? appNavItems
      : appNavItems.filter(
          (item) =>
            !["/dashboard", "/saved", "/cv-builder"].includes(item.href)
        ),
  [user]
);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/95">
      <nav className="mx-auto flex min-h-14 sm:min-h-16 w-full max-w-7xl items-center justify-between gap-2 sm:gap-4 px-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 sm:gap-3"
          onClick={closeMenu}
        >
          <span className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-md bg-emerald-600 text-white">
            <BriefcaseBusiness className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-lg sm:text-xl lg:text-2xl font-bold text-emerald-600 hover:text-emerald-500">
              KaarYab
            </span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-semibold text-black-600 transition hover:bg-neutral-100 hover:text-black-950 dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-white",
                pathname === item.href &&
                "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
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

          <div className="hidden lg:flex items-center gap-2">
            {user ? (
              <button
                type="button"
                className={buttonStyles({
                  variant: "outline",
                  size: "sm",
                })}
                onClick={signOut}
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            ) : (
              <Link
                href="/auth"
                className={buttonStyles({
                  variant: "secondary",
                  size: "sm",
                })}
              >
                <User className="h-4 w-4" />
                Sign in
              </Link>
            )}
          </div>

          <button
            type="button"
            className={buttonStyles({
              variant: "outline",
              size: "icon",
              className: "h-8 w-8 lg:hidden",
            })}
            onClick={toggleMenu}
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {isOpen ? (
        <div className="border-t border-neutral-200 bg-white px-3 sm:px-4 py-4 dark:border-neutral-800 dark:bg-neutral-950 lg:hidden">
          <div className="mx-auto grid w-full max-w-7xl gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-3 text-base font-semibold text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-900",
                  pathname === item.href &&
                  "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200",
                )}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 border-t border-neutral-200 pt-4 dark:border-neutral-800">
              <div className="flex flex-col gap-3">

                {user ? (
                  <button
                    type="button"
                    className={buttonStyles({
                      variant: "outline",
                      size: "lg",
                      className: "w-full justify-center",
                    })}
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                ) : (
                  <Link
                    href="/auth"
                    className={buttonStyles({
                      variant: "secondary",
                      size: "lg",
                      className: "w-full justify-center",
                    })}
                    //  
                    onClick={closeMenu}
                  >
                    <User className="h-4 w-4" />
                    Sign in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

