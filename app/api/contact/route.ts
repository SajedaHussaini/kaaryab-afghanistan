import { Resend } from "resend";
import { contactSchema } from "@/lib/schemas";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { errors: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const { error } = await resend.emails.send({
      from: "KaarYab <onboarding@resend.dev>",
      to: "hussainisajeda9@gmail.com",
      subject: parsed.data.topic,
      html: `
<div style="max-width:600px;margin:auto;font-family:Arial,sans-serif;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:24px;">

  <table style="width:100%;border-collapse:collapse;">
    <tr>
      <td style="padding:10px 0;font-weight:bold;">Name: </td>
      <td>${parsed.data.name}</td>
    </tr>

    <tr>
      <td style="padding:10px 0;font-weight:bold;">Email: </td>
      <td>${parsed.data.email}</td>
    </tr>

  </table>

  <div style="margin-top:24px;">
    <h3 style="margin-bottom:10px;color:#111827;">Message</h3>

    <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;white-space:pre-wrap;">
      ${parsed.data.message}
    </div>
  </div>

  <hr style="margin:24px 0;border:none;border-top:1px solid #e5e7eb;">

  <p style="font-size:13px;color:#6b7280;">
    This message was sent from the
    <strong>KaarYab Afghanistan</strong> contact form.
  </p>
</div>
`,
    });

    if (error) {
      return Response.json(
        { message: error.message },
        { status: 500 }
      );
    }

    return Response.json({
      ok: true,
      message: "Your message has been sent successfully.",
    });
  } catch {
    return Response.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
