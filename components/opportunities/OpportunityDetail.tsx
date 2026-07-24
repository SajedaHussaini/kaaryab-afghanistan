"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Building2,
  CalendarDays,
  Edit,
  ExternalLink,
  MapPin,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button, buttonStyles } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { DeadlineBadge } from "@/components/opportunities/DeadlineBadge";
import { StatusBadge } from "@/components/opportunities/StatusBadge";
import { formatDate } from "@/lib/utils";
import { useOpportunities } from "@/context/OpportunityContext";
import { useSaved } from "@/context/SavedContext";
import { useToast } from "@/context/ToastContext";

export function OpportunityDetail({ id }: { id: string }) {
  const router = useRouter();
  const { getOpportunityById, deleteOpportunity } = useOpportunities();
  const { isSaved, toggleSaved } = useSaved();
  const { notify } = useToast();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const opportunity = getOpportunityById(id);

  if (!opportunity) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <EmptyState
          title="Opportunity not found"
          description="This opportunity may have been deleted or only exists in another browser."
          actionHref="/opportunities"
          actionLabel="Back to opportunities"
        />
      </div>
    );
  }

  const saved = isSaved(opportunity.id);

  const confirmDelete = useCallback(() => {
    deleteOpportunity(opportunity.id);

    notify({
      title: "Opportunity deleted",
      description: "The local demo record was removed.",
      variant: "success",
    });

    setIsDeleteOpen(false);
    router.push("/opportunities");
  }, [deleteOpportunity, notify, opportunity.id, router]);

  const openDeleteModal = useCallback(() => {
    setIsDeleteOpen(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteOpen(false);
  }, []);

  const handleToggleSaved = useCallback(() => {
    toggleSaved(opportunity.id);
  }, [toggleSaved, opportunity.id]);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/opportunities"
        className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-emerald-700 dark:text-neutral-300 dark:hover:text-emerald-300"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to opportunities
      </Link>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_20rem]">
        <article className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 sm:p-6">
          <div className="flex flex-wrap gap-2">
            <Badge tone="green">{opportunity.category}</Badge>
            <Badge tone="sky">{opportunity.type}</Badge>
            <Badge tone="violet">{opportunity.opportunityType}</Badge>
            <StatusBadge status={opportunity.status} />
            <DeadlineBadge deadline={opportunity.deadline} />
            {opportunity.source === "demo" && (
              <Badge tone="amber">Demo Data</Badge>
            )}
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-normal text-neutral-950 dark:text-white sm:text-4xl">
            {opportunity.title}
          </h1>
          <div className="mt-5 grid gap-3 text-sm text-neutral-600 dark:text-neutral-300 sm:grid-cols-2">
            <p className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-neutral-400" />
              {opportunity.organization}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-neutral-400" />
              {opportunity.location}
            </p>
            <p className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-neutral-400" />
              {formatDate(opportunity.deadline)}
            </p>
            <p className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-neutral-400" />
              {opportunity.status === "approved"
                ? "Visible to applicants"
                : "Awaiting admin decision"}
            </p>
          </div>

          <section className="mt-8">
            <h2 className="text-lg font-semibold text-neutral-950 dark:text-white">
              Description
            </h2>
            <p className="mt-3 leading-7 text-neutral-700 dark:text-neutral-300">
              {opportunity.description}
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-semibold text-neutral-950 dark:text-white">
              Requirements
            </h2>
            <ul className="mt-3 grid gap-2">
              {opportunity.requirements.map((requirement) => (
                <li
                  key={requirement}
                  className="flex gap-3 rounded-md bg-neutral-50 px-3 py-2 text-sm text-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-md bg-emerald-500" />
                  {requirement}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-semibold text-neutral-950 dark:text-white">
              Tags
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {opportunity.tags.map((tag) => (
                <Badge key={tag} tone="neutral">
                  {tag}
                </Badge>
              ))}
            </div>
          </section>
        </article>

        <aside className="h-fit rounded-lg border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
          <h2 className="text-base font-semibold text-neutral-950 dark:text-white">
            Manage opportunity
          </h2>
          <div className="mt-4 grid gap-3">
            <a
              className={buttonStyles({ variant: "primary", size: "lg" })}
              href={opportunity.applyLink}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Apply now
            </a>
            <Button
              variant={saved ? "secondary" : "outline"}
              size="lg"
              onClick={handleToggleSaved}
            >
              {saved ? (
                <BookmarkCheck className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Bookmark className="h-4 w-4" aria-hidden="true" />
              )}
              {saved ? "Saved" : "Save opportunity"}
            </Button>
            <Link
              className={buttonStyles({ variant: "outline", size: "lg" })}
              href={`/opportunities/${opportunity.id}/edit`}
            >
              <Edit className="h-4 w-4" aria-hidden="true" />
              Edit
            </Link>
            <Button
              variant="danger"
              size="lg"
              onClick={openDeleteModal}
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              Delete
            </Button>
          </div>

        </aside>
      </div>

      <Modal
        isOpen={isDeleteOpen}
        title="Delete opportunity?"
        description="This removes the local demo record from this browser. Seed data can be restored from the dashboard."
        confirmLabel="Delete"
        destructive
        onConfirm={confirmDelete}
        onClose={closeDeleteModal}
      />
    </div>
  );
}
