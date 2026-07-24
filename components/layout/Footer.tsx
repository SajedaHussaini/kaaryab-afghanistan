import Link from "next/link";
import {
  BriefcaseBusiness,
  GitBranch,
  Bird,
  Share2,
} from "lucide-react";
import { appNavItems } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Column 1 */}
        <div>
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-600 text-white">
              <BriefcaseBusiness className="h-5 w-5" />
            </span>

            <span className="text-xl font-bold text-emerald-600">
              KaarYab Afghanistan
            </span>
          </Link>

          <p className="mt-5 text-sm leading-7 text-neutral-600 dark:text-neutral-300">
            Helping Afghan youth discover jobs, internships,
            scholarships, and career opportunities in one place.
          </p>

          <span className="mt-5 inline-flex rounded-md bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
            Demo Data – Educational Purposes Only
          </span>
        </div>

        {/* Column 2 */}
        <div>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-white">
            Quick Links
          </h2>

          <div className="mt-4 flex flex-col gap-3">
            {appNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-neutral-600 transition hover:text-emerald-600 dark:text-neutral-300 dark:hover:text-emerald-300"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>


        {/* Column 3 */}
        <div>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-white">
            Features
          </h2>

          <ul className="mt-4 space-y-3 text-sm text-neutral-600 dark:text-neutral-300">
            <li>• Advanced Search</li>
            <li>• Verified Opportunities</li>
            <li>• Save Opportunities</li>
            <li>• Deadline Tracking</li>
            <li>• CV Builder</li>
            <li>• Easy Navigation</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-white">
            Contact
          </h2>

          <div className="mt-4 flex flex-col gap-4">
            <Link
              href="https://github.com/SajedaHussaini"
              className="inline-flex items-center gap-2 text-sm text-neutral-600 transition hover:text-emerald-600 dark:text-neutral-300 dark:hover:text-emerald-300"
            >
              <GitBranch className="h-4 w-4" />
              GitHub
            </Link>

            <Link
              href="https://www.linkedin.com/in/sajeda-hussaini-183613396?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              className="inline-flex items-center gap-2 text-sm text-neutral-600 transition hover:text-emerald-600 dark:text-neutral-300 dark:hover:text-emerald-300"
            >
              <Share2 className="h-4 w-4" />
              LinkedIn
            </Link>

            <Link
              href="https://x.com/HussainiSajeda"
              className="inline-flex items-center gap-2 text-sm text-neutral-600 transition hover:text-emerald-600 dark:text-neutral-300 dark:hover:text-emerald-300"
            >
              <Bird className="h-4 w-4" />
              X (Twitter)
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-200 px-4 py-5 text-center text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
        © 2026 KaarYab Afghanistan. All rights reserved.
      </div>
    </footer>
  );
}
