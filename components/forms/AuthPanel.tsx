"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LogOut, ShieldCheck, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { authSchema, type AuthFormValues } from "@/lib/schemas";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

export function AuthPanel() {
  const { user, signIn, signOut } = useAuth();
  const { notify } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      name: "KaarYab Admin",
      email: "admin@kaaryab.af",
      role: "admin",
    },
  });

  const submit = (values: AuthFormValues) => {
    signIn(values);
    notify({
      title: "Signed in",
      description: `You are using the ${values.role} demo role.`,
      variant: "success",
    });
  };

  const inputClass =
    "h-11 rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:focus:ring-emerald-900";
  const labelClass =
    "text-sm font-semibold text-neutral-700 dark:text-neutral-200";
  const errorClass = "text-sm font-medium text-rose-600 dark:text-rose-300";

  return (
    <div className="mx-auto grid w-full max-w-5xl gap-6 px-4 pb-14 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
      <form
        onSubmit={handleSubmit(submit)}
        className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200">
            <UserCheck className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-neutral-950 dark:text-white">
              Mock authentication
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              LocalStorage role demo for student, organization, and admin flows.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5">
          <label className="grid gap-2">
            <span className={labelClass}>Name</span>
            <input className={inputClass} {...register("name")} />
            {errors.name ? (
              <span className={errorClass}>{errors.name.message}</span>
            ) : null}
          </label>

          <label className="grid gap-2">
            <span className={labelClass}>Email</span>
            <input className={inputClass} {...register("email")} />
            {errors.email ? (
              <span className={errorClass}>{errors.email.message}</span>
            ) : null}
          </label>

          <fieldset className="grid gap-2">
            <legend className={labelClass}>Role</legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {(["student", "organization", "admin"] as const).map((role) => (
                <label
                  key={role}
                  className="flex cursor-pointer items-center gap-2 rounded-md border border-neutral-200 bg-neutral-50 px-3 py-3 text-sm font-semibold capitalize text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
                >
                  <input
                    type="radio"
                    value={role}
                    className="h-4 w-4 accent-emerald-600"
                    {...register("role")}
                  />
                  {role}
                </label>
              ))}
            </div>
            {errors.role ? (
              <span className={errorClass}>{errors.role.message}</span>
            ) : null}
          </fieldset>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="submit">
            <UserCheck className="h-4 w-4" aria-hidden="true" />
            Sign in locally
          </Button>
          {user ? (
            <Button variant="outline" onClick={signOut}>
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Sign out
            </Button>
          ) : null}
        </div>
      </form>

      <aside className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-md bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-200">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-neutral-950 dark:text-white">
              Current session
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Stored only in this browser.
            </p>
          </div>
        </div>

        {user ? (
          <div className="mt-6 grid gap-3">
            <p className="text-2xl font-bold text-neutral-950 dark:text-white">
              {user.name}
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              {user.email}
            </p>
            <Badge tone={user.role === "admin" ? "amber" : "green"}>
              {user.role}
            </Badge>
            <p className="text-sm leading-6 text-neutral-600 dark:text-neutral-300">
              Admin users can approve, reject, delete, and feature opportunities
              from the dashboard.
            </p>
          </div>
        ) : (
          <p className="mt-6 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
            No active local session. Use the form to test role-based dashboard
            behavior.
          </p>
        )}
      </aside>
    </div>
  );
}
