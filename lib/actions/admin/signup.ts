"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/lib/email";

export async function signupAdmin(email: string, password: string) {
  try {
    // Validate input
    if (!email || !password) {
      return { success: false, error: "Email and password are required" };
    }

    // Check if email matches admin email from env
    if (email !== process.env.ADMIN_EMAIL) {
      return { success: false, error: "Invalid credentials" };
    }

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      return { success: false, error: "Admin already exists" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate verification code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const verificationExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create admin
    await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        verificationCode,
        verificationExpiry,
      },
    });

    // Send verification email
    await sendVerificationEmail(email, verificationCode);

    return {
      success: true,
      message: "Admin created successfully. Please check your email for verification code.",
    };
  } catch (error) {
    console.error("Signup error:", error);
    return { success: false, error: "Internal server error" };
  }
}