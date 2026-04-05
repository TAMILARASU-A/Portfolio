import nodemailer from "nodemailer";

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

function escapeHtml(value) {
    return String(value || "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function createTransport() {
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) {
        return null;
    }

    return nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: {
            user,
            pass,
        },
    });
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Only POST requests are allowed." });
    }

    const { name, email, message } = req.body || {};
    const trimmedName = String(name || "").trim();
    const trimmedEmail = String(email || "").trim();
    const trimmedMessage = String(message || "").trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
        return res.status(400).json({ message: "Name, email, and message are required." });
    }

    if (!isValidEmail(trimmedEmail)) {
        return res.status(400).json({ message: "Please enter a valid email address." });
    }

    const transporter = createTransport();
    if (!transporter) {
        return res.status(500).json({
            message:
                "Email service is not configured. Add SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS to .env.local.",
        });
    }

    const toEmail = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER;
    const fromEmail = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER;
    const fromName = process.env.CONTACT_FROM_NAME || "Portfolio Contact Form";

    try {
        await transporter.sendMail({
            from: `"${fromName}" <${fromEmail}>`,
            to: toEmail,
            replyTo: trimmedEmail,
            subject: `New portfolio message from ${trimmedName}`,
            text: [
                `Name: ${trimmedName}`,
                `Email: ${trimmedEmail}`,
                "",
                trimmedMessage,
            ].join("\n"),
            html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
          <h2 style="margin:0 0 12px">New portfolio message</h2>
          <p><strong>Name:</strong> ${escapeHtml(trimmedName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(trimmedEmail)}</p>
          <p><strong>Message:</strong></p>
          <div style="white-space:pre-wrap;padding:12px;border:1px solid #e5e7eb;border-radius:8px;background:#f9fafb">
            ${escapeHtml(trimmedMessage)}
          </div>
        </div>
      `,
        });

        return res.status(200).json({ message: "Message sent successfully. I will get back to you soon." });
    } catch (error) {
        console.error("Contact email error:", error);
        if (error?.code === "EAUTH") {
            return res.status(500).json({
                message:
                    "SMTP login failed. If you use Gmail, enable 2-Step Verification and use a 16-character App Password for SMTP_PASS.",
            });
        }
        return res.status(500).json({
            message: "Unable to send message right now. Please try again later.",
        });
    }
}