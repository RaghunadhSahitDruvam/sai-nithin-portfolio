import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import ContactFormEmail from "@/emails/contact-form-email";
import React from "react";

export async function POST(req: Request) {
  try {
    const { name, email, type, message } = await req.json();

    if (!email || !name || !type || !message) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Create transporter with explicit Gmail SMTP settings
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // use SSL
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Verify transporter configuration
    await transporter.verify();

    // Render the email template
    const emailHtml = render(
      React.createElement(ContactFormEmail, {
        name,
        email,
        type,
        message,
      })
    );

    const mailOptions = {
      from: {
        name: "Portfolio Contact Form",
        address: process.env.GMAIL_USER as string,
      },
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `New Contact Form Submission: ${type}`,
      html: await emailHtml,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
