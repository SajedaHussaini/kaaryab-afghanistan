import Link from "next/link";
import { BriefcaseBusiness, Github, Send } from "lucide-react";
import { appNavItems } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-600 text-white">
              <BriefcaseBusiness className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-bold text-neutral-950 dark:text-white">
                KaarYab Afghanistan
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Jobs, scholarships, remote work, and skill-building in one place.
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-neutral-600 dark:text-neutral-300">
            This capstone project uses demo data for learning. Verify any real
            opportunity before applying.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-normal text-neutral-500 dark:text-neutral-400">
            Explore
          </h2>
          <div className="mt-3 grid gap-2">
            {appNavItems.slice(0, 6).map((item) => (
              <Link
                className="text-sm font-medium text-neutral-700 hover:text-emerald-700 dark:text-neutral-200 dark:hover:text-emerald-300"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-normal text-neutral-500 dark:text-neutral-400">
            Capstone Links
          </h2>
          <div className="mt-3 grid gap-2">
            <Link
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-emerald-700 dark:text-neutral-200 dark:hover:text-emerald-300"
              href="/contact"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              Contact API demo
            </Link>
            <Link
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-emerald-700 dark:text-neutral-200 dark:hover:text-emerald-300"
              href="/dashboard"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              Admin approval demo
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-200 px-4 py-4 text-center text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
        Built with Next.js App Router, TypeScript, Tailwind CSS, LocalStorage,
        Zod, Recharts, and Framer Motion.
      </div>
    </footer>
  );
}
