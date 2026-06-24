import { opportunities } from "@/data/opportunities";
import { opportunityFormSchema } from "@/lib/schemas";
import { createId, splitLines } from "@/lib/utils";

export function GET() {
  return Response.json({
    label: "Demo Data",
    data: opportunities,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = opportunityFormSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { errors: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const now = new Date().toISOString();
  const opportunity = {
    ...parsed.data,
    id: createId("submitted"),
    requirements: splitLines(parsed.data.requirements),
    tags: splitLines(parsed.data.tags),
    source: "user",
    createdAt: now,
    updatedAt: now,
  };

  return Response.json({ data: opportunity }, { status: 201 });
}
