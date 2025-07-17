"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/lib/email";

export async function sendVerificationCode(email: string, password: string) {
  try {
    // Validate input
    if (!email || !password) {
      return { success: false, error: "Email and password are required" };
    }

    // Check if email matches admin email from env
    if (email !== process.env.ADMIN_EMAIL) {
      return { success: false, error: "Invalid credentials" };
    }

    // Find admin
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return { success: false, error: "Invalid credentials" };
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return { success: false, error: "Invalid credentials" };
    }

    // Generate new verification code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const verificationExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Update admin with new verification code
    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        verificationCode,
        verificationExpiry,
      },
    });

    // Send verification email
    await sendVerificationEmail(email, verificationCode);

    return {
      success: true,
      message: "Verification code sent to your email",
    };
  } catch (error) {
    console.error("Send verification error:", error);
    return { success: false, error: "Internal server error" };
  }
}