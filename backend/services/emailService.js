import { createTransporter, getAdminEmail, getFromAddress } from "../config/mailer.js";

const ORGANIZATION_NAME = "Amaanitvam Foundation";
const ORGANIZATION_EMAIL = "amaanitvamfoundation@gmail.com";
const ORGANIZATION_PHONE = "+91 98999 23266";
const ORGANIZATION_ADDRESS = "H.No. 269, W.No. 2, Mehrauli, Gadaipur, South West Delhi, New Delhi, Delhi, India - 110030";

const escapeHtml = (value = "") =>
    String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");

const toHtmlParagraph = (value = "") => escapeHtml(value).replace(/\n/g, "<br>");

const formatDateTime = (value) =>
    new Date(value).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short"
    });

const renderEmailShell = ({ title, body, footerNote }) => `
    <div style="margin:0;padding:0;background:#f6f8fb;">
        <div style="max-width:680px;margin:0 auto;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#172033;">
            <div style="background:#ffffff;border:1px solid #e6ebf2;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(15,23,42,0.06);">
                <div style="background:linear-gradient(135deg,#0f1e3a 0%,#153d6f 100%);padding:24px 28px;color:#ffffff;">
                    <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;opacity:0.85;">${ORGANIZATION_NAME}</div>
                    <h1 style="margin:8px 0 0;font-size:24px;line-height:1.25;">${escapeHtml(title)}</h1>
                </div>
                <div style="padding:28px;line-height:1.7;font-size:15px;">
                    ${body}
                </div>
                <div style="padding:0 28px 28px;">
                    <div style="border-top:1px solid #e6ebf2;padding-top:18px;font-size:13px;color:#516079;">
                        ${escapeHtml(footerNote)}
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

export const sendUserAutoReplyEmail = async ({ contact }) => {
    const transporter = createTransporter();
    const fromAddress = getFromAddress();
    const submissionTime = formatDateTime(contact.submissionTimestamp || contact.createdAt || Date.now());

    const html = renderEmailShell({
        title: "Thank You for Contacting Amaanitvam Foundation",
        body: `
            <p>Dear ${escapeHtml(contact.name)},</p>
            <p>Thank you for contacting Amaanitvam Foundation. We have successfully received your message and our team will review it shortly.</p>
            <p>Our team will get in touch with you as soon as possible.</p>
            <div style="margin:24px 0;padding:18px;border-radius:12px;background:#f8fafc;border:1px solid #e6ebf2;">
                <p style="margin:0 0 8px;"><strong>Your Submission</strong></p>
                <p style="margin:0;"><strong>Subject:</strong> ${escapeHtml(contact.subject)}</p>
                <p style="margin:0;"><strong>Submitted:</strong> ${escapeHtml(submissionTime)}</p>
            </div>
            <p style="margin-bottom:0;">Regards,<br>${ORGANIZATION_NAME} Team</p>
        `,
        footerNote: `For any follow-up, contact us at ${ORGANIZATION_EMAIL} or ${ORGANIZATION_PHONE}. ${ORGANIZATION_ADDRESS}`
    });

    await transporter.sendMail({
        from: fromAddress,
        to: contact.email,
        subject: "Thank You for Contacting Amaanitvam Foundation",
        text: [
            `Dear ${contact.name},`,
            "",
            "Thank you for contacting Amaanitvam Foundation. We have successfully received your message and our team will review it shortly.",
            "Our team will get in touch with you as soon as possible.",
            "",
            "Regards,",
            `${ORGANIZATION_NAME} Team`,
            "",
            `Contact: ${ORGANIZATION_EMAIL} | ${ORGANIZATION_PHONE}`,
            ORGANIZATION_ADDRESS
        ].join("\n"),
        html
    });

    return true;
};

export const sendAdminNotificationEmail = async ({ contact }) => {
    const transporter = createTransporter();
    const fromAddress = getFromAddress();
    const adminEmail = getAdminEmail();
    const submissionTime = formatDateTime(contact.submissionTimestamp || contact.createdAt || Date.now());

    const html = renderEmailShell({
        title: "New Contact Form Submission Received",
        body: `
            <p>A new contact form submission has been received. The details are below in report format.</p>
            <table style="width:100%;border-collapse:collapse;border:1px solid #dce4ef;font-size:14px;">
                <tbody>
                    <tr><td style="padding:12px;border:1px solid #dce4ef;background:#f8fafc;font-weight:700;width:32%;">Record ID</td><td style="padding:12px;border:1px solid #dce4ef;">${escapeHtml(contact._id?.toString())}</td></tr>
                    <tr><td style="padding:12px;border:1px solid #dce4ef;background:#f8fafc;font-weight:700;">Full Name</td><td style="padding:12px;border:1px solid #dce4ef;">${escapeHtml(contact.name)}</td></tr>
                    <tr><td style="padding:12px;border:1px solid #dce4ef;background:#f8fafc;font-weight:700;">Email Address</td><td style="padding:12px;border:1px solid #dce4ef;">${escapeHtml(contact.email)}</td></tr>
                    <tr><td style="padding:12px;border:1px solid #dce4ef;background:#f8fafc;font-weight:700;">Subject</td><td style="padding:12px;border:1px solid #dce4ef;">${escapeHtml(contact.subject)}</td></tr>
                    <tr><td style="padding:12px;border:1px solid #dce4ef;background:#f8fafc;font-weight:700;">Message</td><td style="padding:12px;border:1px solid #dce4ef;white-space:pre-wrap;">${toHtmlParagraph(contact.message)}</td></tr>
                    <tr><td style="padding:12px;border:1px solid #dce4ef;background:#f8fafc;font-weight:700;">Submission Time</td><td style="padding:12px;border:1px solid #dce4ef;">${escapeHtml(submissionTime)}</td></tr>
                    <tr><td style="padding:12px;border:1px solid #dce4ef;background:#f8fafc;font-weight:700;">IP Address</td><td style="padding:12px;border:1px solid #dce4ef;">${escapeHtml(contact.ipAddress)}</td></tr>
                    <tr><td style="padding:12px;border:1px solid #dce4ef;background:#f8fafc;font-weight:700;">Browser / User Agent</td><td style="padding:12px;border:1px solid #dce4ef;">${escapeHtml(contact.userAgent)}</td></tr>
                </tbody>
            </table>
        `,
        footerNote: `This is an automated notification for ${ORGANIZATION_NAME}. Reply directly to the sender only after reviewing the submission.`
    });

    await transporter.sendMail({
        from: fromAddress,
        to: adminEmail,
        replyTo: contact.email,
        subject: "New Contact Form Submission Received",
        text: [
            "New Contact Form Submission Received",
            "",
            `Record ID: ${contact._id?.toString()}`,
            `Full Name: ${contact.name}`,
            `Email Address: ${contact.email}`,
            `Subject: ${contact.subject}`,
            `Message: ${contact.message}`,
            `Submission Time: ${submissionTime}`,
            `IP Address: ${contact.ipAddress}`,
            `Browser / User Agent: ${contact.userAgent}`
        ].join("\n"),
        html
    });

    return true;
};