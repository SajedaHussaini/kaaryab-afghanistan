"use client";

import Link from "next/link";
import {
  BriefcaseBusiness,
  Clock3,
  GraduationCap,
  Laptop,
  PlusCircle,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Trash2,
  UserCheck,
} from "lucide-react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { OpportunityCharts } from "@/components/dashboard/OpportunityCharts";
import { Badge } from "@/components/ui/Badge";
import { Button, buttonStyles } from "@/components/ui/Button";
import { StatusBadge } from "@/components/opportunities/StatusBadge";
import { DeadlineBadge } from "@/components/opportunities/DeadlineBadge";
import {
  formatDate,
  getDashboardStats,
  getRecentOpportunities,
} from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useOpportunities } from "@/context/OpportunityContext";
import { useToast } from "@/context/ToastContext";
import { useCallback, useMemo } from "react";

export function DashboardManager() {
  const { user } = useAuth();
  const {
    opportunities,
    setOpportunityStatus,
    toggleFeatured,
    deleteOpportunity,
    resetDemoData,
  } = useOpportunities();
  const { notify } = useToast();
 
  const stats = useMemo(
  () => getDashboardStats(opportunities),
  [opportunities]
);

  const recent = useMemo(
  () => getRecentOpportunities(opportunities, 7),
  [opportunities]
);
  
  const canModerate = useMemo(
  () => user?.role === "admin",
  [user]
);

  const moderate = useCallback(
  (id: string, status: "approved" | "rejected") => {
    setOpportunityStatus(id, status);

    notify({
      title: status === "approved" ? "Opportunity approved" : "Opportunity rejected",
      description: "The local approval status was updated.",
      variant: "success",
    });
  },
  [setOpportunityStatus, notify]
);

  const remove = useCallback(
  (id: string) => {
    deleteOpportunity(id);

    notify({
      title: "Opportunity deleted",
      description: "The local dashboard record was removed.",
      variant: "success",
    });
  },
  [deleteOpportunity, notify]
);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">
            Admin status:{" "}
            <span className="text-neutral-900 dark:text-white">
              {canModerate ? "active" : "view only"}
            </span>
          </p>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
            Sign in as an admin on the auth page to approve or reject
            submissions.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/add-opportunity"
            className={buttonStyles({ variant: "primary", size: "sm" })}
          >
            <PlusCircle className="h-4 w-4" aria-hidden="true" />
            Add opportunity
          </Link>
          <Button variant="outline" size="sm" onClick={resetDemoData}>
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Restore demo data
          </Button>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Total opportunities"
          value={stats.total}
          description="All approved, pending, rejected, demo, and local records."
          icon={BriefcaseBusiness}
        />
        <DashboardCard
          title="Jobs"
          value={stats.jobs}
          description="Approved job listings currently visible to users."
          icon={UserCheck}
        />
        <DashboardCard
          title="Scholarships"
          value={stats.scholarships}
          description="Approved scholarships and fellowship-style support."
          icon={GraduationCap}
        />
        <DashboardCard
          title="Internships"
          value={stats.internships}
          description="Approved internships and guided work experience."
          icon={ShieldCheck}
        />
        <DashboardCard
          title="Remote"
          value={stats.remote}
          description="Approved work or study options available online."
          icon={Laptop}
        />
        <DashboardCard
          title="Expiring soon"
          value={stats.expiringSoon}
          description="Approved opportunities closing within 14 days."
          icon={Clock3}
        />
        <DashboardCard
          title="Pending review"
          value={stats.pending}
          description="Submissions waiting for admin approval."
          icon={ShieldCheck}
        />
        <DashboardCard
          title="Featured"
          value={stats.featured}
          description="Approved records promoted on the home page."
          icon={Sparkles}
        />
      </div>

      <div className="mt-6">
        <OpportunityCharts opportunities={opportunities} />
      </div>

      <section className="mt-6 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-neutral-950 dark:text-white">
              Recent submissions
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Manage approval, featured status, and local demo records.
            </p>
          </div>
          {!canModerate ? (
            <Link
              href="/auth"
              className={buttonStyles({ variant: "outline", size: "sm" })}
            >
              Sign in as admin
            </Link>
          ) : null}
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[900px] border-separate border-spacing-0 text-left text-sm">
            <thead>
              <tr className="text-neutral-500 dark:text-neutral-400">
                <th className="border-b border-neutral-200 py-3 pr-4 font-semibold dark:border-neutral-800">
                  Opportunity
                </th>
                <th className="border-b border-neutral-200 py-3 pr-4 font-semibold dark:border-neutral-800">
                  Category
                </th>
                <th className="border-b border-neutral-200 py-3 pr-4 font-semibold dark:border-neutral-800">
                  Deadline
                </th>
                <th className="border-b border-neutral-200 py-3 pr-4 font-semibold dark:border-neutral-800">
                  Status
                </th>
                <th className="border-b border-neutral-200 py-3 pr-4 font-semibold dark:border-neutral-800">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {recent.map((opportunity) => (
                <tr key={opportunity.id} className="align-top">
                  <td className="border-b border-neutral-100 py-4 pr-4 dark:border-neutral-900">
                    <Link
                      className="font-semibold text-neutral-950 hover:text-emerald-700 dark:text-white dark:hover:text-emerald-300"
                      href={`/opportunities/${opportunity.id}`}
                    >
                      {opportunity.title}
                    </Link>
                    <p className="mt-1 text-neutral-500 dark:text-neutral-400">
                      {opportunity.organization} · {opportunity.location}
                    </p>
                  </td>
                  <td className="border-b border-neutral-100 py-4 pr-4 dark:border-neutral-900">
                    <div className="flex flex-wrap gap-2">
                      <Badge tone="green">{opportunity.category}</Badge>
                      {opportunity.featured ? (
                        <Badge tone="amber">Featured</Badge>
                      ) : null}
                    </div>
                  </td>
                  <td className="border-b border-neutral-100 py-4 pr-4 dark:border-neutral-900">
                    <p className="font-medium text-neutral-800 dark:text-neutral-100">
                      {formatDate(opportunity.deadline)}
                    </p>
                    <div className="mt-2">
                      <DeadlineBadge deadline={opportunity.deadline} />
                    </div>
                  </td>
                  <td className="border-b border-neutral-100 py-4 pr-4 dark:border-neutral-900">
                    <StatusBadge status={opportunity.status} />
                  </td>
                  <td className="border-b border-neutral-100 py-4 pr-4 dark:border-neutral-900">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={!canModerate}
                        onClick={() => moderate(opportunity.id, "approved")}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={!canModerate}
                        onClick={() => moderate(opportunity.id, "rejected")}
                      >
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        disabled={!canModerate}
                        onClick={() => toggleFeatured(opportunity.id)}
                      >
                        Feature
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        disabled={!canModerate}
                        onClick={() => remove(opportunity.id)}
                        aria-label="Delete opportunity"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
