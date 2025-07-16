import nodemailer from "nodemailer";
import { ReactElement } from "react";
import { render } from "@react-email/render";
import VerificationEmail from "@/emails/verification-email";

// Get email config from env variables
const smtpHost = process.env.EMAIL_SERVER_HOST;
const smtpPort = process.env.EMAIL_SERVER_PORT
  ? parseInt(process.env.EMAIL_SERVER_PORT, 10)
  : 587; // Default port
const smtpUser = process.env.EMAIL_SERVER_USER;
const smtpPass = process.env.EMAIL_SERVER_PASSWORD;
const emailFrom = process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER;

// Basic configuration check
if (!smtpHost || !smtpUser || !smtpPass || !emailFrom) {
  console.warn(
    "WARNING: Email configuration is incomplete in environment variables (EMAIL_SERVER_HOST, EMAIL_SERVER_PORT, EMAIL_SERVER_USER, EMAIL_SERVER_PASSWORD, EMAIL_FROM). Email sending will likely fail."
  );
}

// Create Nodemailer transporter instance
const transporter =
  smtpHost && smtpUser && smtpPass && emailFrom
    ? nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // true for 465, false for other ports (STARTTLS used for 587)
        auth: {
          user: smtpUser,
          pass: smtpPass, // Use the password or App Password
        },
      })
    : null;

// Define the function signature
interface SendEmailOptions {
  to: string;
  subject: string;
  react: ReactElement; // The React Email component
}

// Implement sendEmail using Nodemailer and React Email rendering
export const sendEmail = async ({ to, subject, react }: SendEmailOptions) => {
  if (!transporter || !emailFrom) {
    console.error(
      "Nodemailer transporter is not configured due to missing environment variables."
    );
    throw new Error("Email service is not configured properly.");
  }

  try {
    // Render the React Email component to an HTML string
    console.log("Rendering React Email component...");
    const html = await render(react);
    console.log("React Email component rendered to HTML.");

    const mailOptions = {
      from: emailFrom, // Sender address
      to: to, // List of receivers
      subject: subject, // Subject line
      html: html, // HTML body
    };

    console.log(
      `Attempting to send email via Nodemailer to ${to} from ${emailFrom} with subject "${subject}"`
    );
    // Send mail with defined transport object
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully via Nodemailer:", info.messageId);
    return info; // Return Nodemailer's success info object
  } catch (error) {
    // Log the specific error during rendering or sending
    console.error("Error during email preparation or sending:", error);

    // Improve error message detail
    let errorMessage = "Failed to send email via Nodemailer.";
    if (error instanceof Error) {
      // Include the original error message which might contain more clues
      errorMessage += ` Reason: ${error.message}`;
    }

    throw new Error(errorMessage);
  }
};

// Legacy function for backward compatibility
export async function sendVerificationEmail(
  email: string,
  verificationCode: string
) {
  return await sendEmail({
    to: email,
    subject: "Admin Verification Code",
    react: VerificationEmail({ verificationCode }),
  });
}
