import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_DOWNLOADS = 10_000;

type InquiryBody = {
  name?: string;
  email?: string;
  showName?: string;
  downloads?: string | number;
  message?: string;
};

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: InquiryBody;
  try {
    body = (await request.json()) as InquiryBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const name = (body.name || "").toString().trim();
  const email = (body.email || "").toString().trim();
  const showName = (body.showName || "").toString().trim();
  const downloadsRaw = body.downloads?.toString().trim() || "";
  const message = (body.message || "").toString().trim();

  // Validate required fields
  if (!name || !email || !showName || !downloadsRaw) {
    return NextResponse.json(
      { error: "Please fill in your name, email, show name, and downloads." },
      { status: 400 }
    );
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: "That email address looks off — double-check it?" },
      { status: 400 }
    );
  }

  const downloadsNum = parseInt(downloadsRaw.replace(/[^0-9]/g, ""), 10);
  if (Number.isNaN(downloadsNum) || downloadsNum <= 0) {
    return NextResponse.json(
      { error: "Downloads should be a number (just digits — '50000' is fine)." },
      { status: 400 }
    );
  }
  if (downloadsNum < MIN_DOWNLOADS) {
    return NextResponse.json(
      {
        error: `We currently work with shows at 10K+ downloads per episode. Yours is at ${downloadsNum.toLocaleString()} — get in touch once you cross that line and we'll talk.`,
      },
      { status: 400 }
    );
  }

  // Length guards (anti-spam)
  if (name.length > 200 || email.length > 200 || showName.length > 200) {
    return NextResponse.json({ error: "One of those fields is too long." }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "Message is too long (5,000 char max)." }, { status: 400 });
  }

  // Resend setup
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.INQUIRY_TO_EMAIL || "brady@podcastrep.com";

  if (!apiKey || apiKey.includes("REPLACE_ME")) {
    console.error("[inquiry] RESEND_API_KEY missing or placeholder");
    return NextResponse.json(
      { error: "Email service isn't configured yet. Please email brady@podcastrep.com directly." },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  const subject = `New PodcastRep inquiry — ${showName} (${downloadsNum.toLocaleString()} downloads/ep)`;

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 580px; margin: 0 auto; color: #1a1a1a;">
      <h2 style="margin: 0 0 24px; font-size: 20px;">New PodcastRep Inquiry</h2>
      <table style="border-collapse: collapse; width: 100%; font-size: 14px;">
        <tr><td style="padding: 8px 0; color: #666; width: 140px;">Name</td><td style="padding: 8px 0;"><strong>${escapeHtml(name)}</strong></td></tr>
        <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #d92d20;">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #666;">Show name</td><td style="padding: 8px 0;"><strong>${escapeHtml(showName)}</strong></td></tr>
        <tr><td style="padding: 8px 0; color: #666;">Downloads / episode</td><td style="padding: 8px 0;"><strong>${downloadsNum.toLocaleString()}</strong></td></tr>
      </table>
      ${message ? `<div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #eee;"><div style="color: #666; font-size: 14px; margin-bottom: 8px;">Message</div><div style="white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${escapeHtml(message)}</div></div>` : ""}
      <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #eee; color: #999; font-size: 12px;">
        Sent from the podcastrep.com inquiry form. Reply directly to respond to ${escapeHtml(name)}.
      </div>
    </div>
  `;

  const text = [
    `New PodcastRep Inquiry`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `Show name: ${showName}`,
    `Downloads / episode: ${downloadsNum.toLocaleString()}`,
    message ? `\nMessage:\n${message}` : "",
    ``,
    `--`,
    `Sent from the podcastrep.com inquiry form.`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const result = await resend.emails.send({
      // podcastrep.com is verified on Resend → we send from our own domain.
      from: "PodcastRep <brady@podcastrep.com>",
      to: [toEmail],
      replyTo: email,
      subject,
      html,
      text,
    });

    if (result.error) {
      console.error("[inquiry] Resend returned error:", result.error);
      return NextResponse.json(
        { error: "We couldn't send your message right now. Please try again or email brady@podcastrep.com directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[inquiry] Resend threw:", err);
    return NextResponse.json(
      { error: "Something went wrong on our end. Please try again in a moment." },
      { status: 500 }
    );
  }
}
