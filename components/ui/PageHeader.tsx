import { Badge } from "@/components/ui/Badge";
import { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow?: string;
   title: ReactNode;
  description: string;
  badge?: string;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  badge,
}: PageHeaderProps) {
  return (
    <header className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-3xl text-center">
    <div className="flex flex-wrap items-center justify-center gap-2">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-normal text-emerald-700 dark:text-emerald-300">
          {eyebrow}
        </p>
      ) : null}

      {badge ? <Badge tone="amber">{badge}</Badge> : null}
    </div>

    <h1 className="mt-3 text-3xl font-bold tracking-normal text-neutral-950 dark:text-white sm:text-4xl">
      {title}
    </h1>

    <p className="mt-4 text-base leading-7 text-neutral-600 dark:text-neutral-300">
      {description}
    </p>
  </div>
</header>
  );
}
