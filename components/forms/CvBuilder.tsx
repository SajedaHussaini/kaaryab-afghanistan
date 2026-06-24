"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Download, FileText } from "lucide-react";
import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { cvSchema, type CvFormValues } from "@/lib/schemas";
import { splitLines } from "@/lib/utils";
import { useToast } from "@/context/ToastContext";

const defaultCv: CvFormValues = {
  fullName: "Sajeda Hussaini",
  headline: "Frontend Developer | React and Next.js",
  email: "sajeda@example.com",
  phone: "+93 700 000 000",
  location: "Kabul, Afghanistan",
  summary:
    "Motivated junior developer building accessible web applications with React, Next.js, and Tailwind CSS.",
  education: "Computer Science student, Kabul",
  skills: "React, Next.js, TypeScript, Tailwind CSS, GitHub",
  experience:
    "Built capstone projects, responsive dashboards, and form-based applications using modern frontend tools.",
  links: "https://github.com/example\nhttps://linkedin.com/in/example",
};

export function CvBuilder() {
  const { notify } = useToast();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CvFormValues>({
    resolver: zodResolver(cvSchema),
    defaultValues: defaultCv,
    mode: "onBlur",
  });
  const watchedValues = useWatch({ control });
  const preview: CvFormValues = { ...defaultCv, ...watchedValues };

  const skills = useMemo(() => splitLines(preview.skills ?? ""), [preview.skills]);

  const generatePdf = async (values: CvFormValues) => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    const margin = 16;
    let y = 18;

    const addHeading = (text: string) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(text, margin, y);
      y += 7;
      doc.setDrawColor(5, 150, 105);
      doc.line(margin, y - 3, 195, y - 3);
    };

    const addBody = (text: string) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(text, 178);
      doc.text(lines, margin, y);
      y += lines.length * 5 + 6;
    };

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(values.fullName, margin, y);
    y += 8;
    doc.setFontSize(12);
    doc.setTextColor(5, 150, 105);
    doc.text(values.headline, margin, y);
    y += 8;
    doc.setTextColor(40, 40, 40);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`${values.email} | ${values.phone} | ${values.location}`, margin, y);
    y += 12;

    addHeading("Summary");
    addBody(values.summary);
    addHeading("Education");
    addBody(values.education);
    addHeading("Skills");
    addBody(values.skills);
    addHeading("Experience");
    addBody(values.experience);

    if (values.links) {
      addHeading("Links");
      addBody(values.links);
    }

    doc.save(`${values.fullName.toLowerCase().replaceAll(" ", "-")}-cv.pdf`);
    notify({
      title: "CV downloaded",
      description: "Your PDF was generated in the browser.",
      variant: "success",
    });
  };

  const inputClass =
    "h-11 rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:focus:ring-emerald-900";
  const textareaClass =
    "min-h-28 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm leading-6 text-neutral-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:focus:ring-emerald-900";
  const labelClass =
    "text-sm font-semibold text-neutral-700 dark:text-neutral-200";
  const errorClass = "text-sm font-medium text-rose-600 dark:text-rose-300";

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-14 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
      <form
        onSubmit={handleSubmit(generatePdf)}
        className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200">
            <FileText className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-neutral-950 dark:text-white">
              PDF CV builder
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Fill the fields and download a clean one-page PDF.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="grid gap-2">
            <span className={labelClass}>Full name</span>
            <input className={inputClass} {...register("fullName")} />
            {errors.fullName ? (
              <span className={errorClass}>{errors.fullName.message}</span>
            ) : null}
          </label>

          <label className="grid gap-2">
            <span className={labelClass}>Headline</span>
            <input className={inputClass} {...register("headline")} />
            {errors.headline ? (
              <span className={errorClass}>{errors.headline.message}</span>
            ) : null}
          </label>

          <label className="grid gap-2">
            <span className={labelClass}>Email</span>
            <input className={inputClass} {...register("email")} />
            {errors.email ? (
              <span className={errorClass}>{errors.email.message}</span>
            ) : null}
          </label>

          <label className="grid gap-2">
            <span className={labelClass}>Phone</span>
            <input className={inputClass} {...register("phone")} />
            {errors.phone ? (
              <span className={errorClass}>{errors.phone.message}</span>
            ) : null}
          </label>

          <label className="grid gap-2 md:col-span-2">
            <span className={labelClass}>Location</span>
            <input className={inputClass} {...register("location")} />
            {errors.location ? (
              <span className={errorClass}>{errors.location.message}</span>
            ) : null}
          </label>

          <label className="grid gap-2 md:col-span-2">
            <span className={labelClass}>Summary</span>
            <textarea className={textareaClass} {...register("summary")} />
            {errors.summary ? (
              <span className={errorClass}>{errors.summary.message}</span>
            ) : null}
          </label>

          <label className="grid gap-2">
            <span className={labelClass}>Education</span>
            <textarea className={textareaClass} {...register("education")} />
            {errors.education ? (
              <span className={errorClass}>{errors.education.message}</span>
            ) : null}
          </label>

          <label className="grid gap-2">
            <span className={labelClass}>Skills</span>
            <textarea className={textareaClass} {...register("skills")} />
            {errors.skills ? (
              <span className={errorClass}>{errors.skills.message}</span>
            ) : null}
          </label>

          <label className="grid gap-2 md:col-span-2">
            <span className={labelClass}>Experience</span>
            <textarea className={textareaClass} {...register("experience")} />
            {errors.experience ? (
              <span className={errorClass}>{errors.experience.message}</span>
            ) : null}
          </label>

          <label className="grid gap-2 md:col-span-2">
            <span className={labelClass}>Links</span>
            <textarea className={textareaClass} {...register("links")} />
            {errors.links ? (
              <span className={errorClass}>{errors.links.message}</span>
            ) : null}
          </label>
        </div>

        <div className="mt-6 flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            <Download className="h-4 w-4" aria-hidden="true" />
            {isSubmitting ? "Generating..." : "Download PDF"}
          </Button>
        </div>
      </form>

      <aside className="h-fit rounded-lg border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
        <p className="text-sm font-semibold uppercase tracking-normal text-emerald-700 dark:text-emerald-300">
          Live preview
        </p>
        <h2 className="mt-3 text-3xl font-bold text-neutral-950 dark:text-white">
          {preview.fullName}
        </h2>
        <p className="mt-1 font-semibold text-emerald-700 dark:text-emerald-300">
          {preview.headline}
        </p>
        <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
          {preview.email} · {preview.phone} · {preview.location}
        </p>
        <div className="mt-6 grid gap-5 text-sm leading-6 text-neutral-700 dark:text-neutral-300">
          <section>
            <h3 className="font-bold text-neutral-950 dark:text-white">Summary</h3>
            <p className="mt-1">{preview.summary}</p>
          </section>
          <section>
            <h3 className="font-bold text-neutral-950 dark:text-white">Skills</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200"
                  key={skill}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
          <section>
            <h3 className="font-bold text-neutral-950 dark:text-white">
              Experience
            </h3>
            <p className="mt-1">{preview.experience}</p>
          </section>
        </div>
      </aside>
    </div>
  );
}
