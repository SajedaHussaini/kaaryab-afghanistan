export function LoadingState({ label = "Loading" }: { label?: string }) {
  return (
    <div className="grid min-h-64 place-items-center">
      <div className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-700 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200">
        <span className="h-3 w-3 animate-pulse rounded-md bg-emerald-500" />
        {label}
      </div>
    </div>
  );
}
