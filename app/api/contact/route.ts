import { contactSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { errors: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  return Response.json({
    ok: true,
    message:
      "Thanks for contacting KaarYab Afghanistan. This demo API accepted the message.",
    data: parsed.data,
  });
}
