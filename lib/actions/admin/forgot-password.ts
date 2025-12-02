"use server";

import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/email";
import { z } from "zod";
import bcrypt from "bcryptjs";

// Validation schema
const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function sendPasswordResetCode(email: string) {
  try {
    // Validate email
    const validation = emailSchema.safeParse({ email });
    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues[0]?.message || "Invalid email",
      };
    }

    // Find admin by email
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      // Don't reveal if email exists or not for security
      return {
        success: true,
        message:
          "If an account with this email exists, a password reset code has been sent.",
      };
    }

    // Generate 6-digit reset code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const resetExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Update admin with reset code
    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        verificationCode: resetCode,
        verificationExpiry: resetExpiry,
      },
    });

    // Send password reset email
    await sendPasswordResetEmail(email, resetCode);

    return {
      success: true,
      message: "Password reset code sent to your email",
    };
  } catch (error) {
    console.error("Send password reset error:", error);
    return {
      success: false,
      error: "Failed to send password reset code",
    };
  }
}

export async function verifyResetCode(email: string, code: string) {
  try {
    // Validate inputs
    if (!email || !code) {
      return {
        success: false,
        error: "Email and verification code are required",
      };
    }

    // Find admin with the email
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return {
        success: false,
        error: "Invalid email or verification code",
      };
    }

    // Check if verification code matches and is not expired
    if (
      admin.verificationCode !== code ||
      !admin.verificationExpiry ||
      new Date() > admin.verificationExpiry
    ) {
      return {
        success: false,
        error: "Invalid or expired verification code",
      };
    }

    return {
      success: true,
      message: "Verification code verified successfully",
    };
  } catch (error) {
    console.error("Verify reset code error:", error);
    return {
      success: false,
      error: "Failed to verify reset code",
    };
  }
}

export async function resetPassword(
  email: string,
  code: string,
  newPassword: string
) {
  try {
    // Validate inputs
    if (!email || !code || !newPassword) {
      return {
        success: false,
        error: "Email, verification code, and new password are required",
      };
    }

    if (newPassword.length < 6) {
      return {
        success: false,
        error: "Password must be at least 6 characters long",
      };
    }

    // Find admin with the email
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return {
        success: false,
        error: "Invalid email or verification code",
      };
    }

    // Check if verification code matches and is not expired
    if (
      admin.verificationCode !== code ||
      !admin.verificationExpiry ||
      new Date() > admin.verificationExpiry
    ) {
      return {
        success: false,
        error: "Invalid or expired verification code",
      };
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update admin password and clear verification code
    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        password: hashedPassword,
        verificationCode: null,
        verificationExpiry: null,
      },
    });

    return {
      success: true,
      message: "Password reset successfully",
    };
  } catch (error) {
    console.error("Reset password error:", error);
    return {
      success: false,
      error: "Failed to reset password",
    };
  }
}
