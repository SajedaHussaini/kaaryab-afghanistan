import { opportunities } from "@/data/opportunities";
import { opportunityFormSchema } from "@/lib/schemas";
import { splitLines } from "@/lib/utils";

type OpportunityRouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: OpportunityRouteContext) {
  const { id } = await context.params;
  const opportunity = opportunities.find((item) => item.id === id);

  if (!opportunity) {
    return Response.json({ message: "Opportunity not found." }, { status: 404 });
  }

  return Response.json({ data: opportunity });
}

export async function PATCH(request: Request, context: OpportunityRouteContext) {
  const { id } = await context.params;
  const exists = opportunities.some((item) => item.id === id);

  if (!exists) {
    return Response.json({ message: "Opportunity not found." }, { status: 404 });
  }

  const body = await request.json();
  const parsed = opportunityFormSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { errors: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  return Response.json({
    data: {
      ...parsed.data,
      id,
      requirements: splitLines(parsed.data.requirements),
      tags: splitLines(parsed.data.tags),
      updatedAt: new Date().toISOString(),
    },
  });
}

export async function DELETE(
  _request: Request,
  context: OpportunityRouteContext,
) {
  const { id } = await context.params;

  return Response.json({
    deleted: true,
    id,
  });
}
