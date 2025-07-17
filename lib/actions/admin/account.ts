"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

// Validation schemas
const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const passwordSchema = z.object({
  oldPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters long"),
});

export async function updateAdminEmail(email: string) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || session.user.role !== "admin") {
      return {
        success: false,
        error: "Unauthorized access",
      };
    }

    // Validate email
    const validation = emailSchema.safeParse({ email });
    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues[0]?.message || "Invalid email",
      };
    }

    // Check if email already exists for another admin
    const existingAdmin = await prisma.admin.findFirst({
      where: {
        email: email,
        id: {
          not: session.user.id,
        },
      },
    });

    if (existingAdmin) {
      return {
        success: false,
        error: "Email already exists",
      };
    }

    // Update admin email
    await prisma.admin.update({
      where: {
        id: session.user.id,
      },
      data: {
        email: email,
      },
    });

    return {
      success: true,
      message: "Email updated successfully",
    };
  } catch (error) {
    console.error("Error updating email:", error);
    return {
      success: false,
      error: "Failed to update email",
    };
  }
}

export async function updateAdminPassword(oldPassword: string, newPassword: string) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || session.user.role !== "admin") {
      return {
        success: false,
        error: "Unauthorized access",
      };
    }

    // Validate passwords
    const validation = passwordSchema.safeParse({ oldPassword, newPassword });
    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues[0]?.message || "Invalid password",
      };
    }

    // Get current admin with password
    const admin = await prisma.admin.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        password: true,
      },
    });

    if (!admin || !admin.password) {
      return {
        success: false,
        error: "Admin not found or no password set",
      };
    }

    // Verify old password
    const isOldPasswordValid = await bcrypt.compare(oldPassword, admin.password);
    if (!isOldPasswordValid) {
      return {
        success: false,
        error: "Current password is incorrect",
      };
    }

    // Check if new password is different from old password
    const isSamePassword = await bcrypt.compare(newPassword, admin.password);
    if (isSamePassword) {
      return {
        success: false,
        error: "New password must be different from current password",
      };
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    // Update admin password
    await prisma.admin.update({
      where: {
        id: session.user.id,
      },
      data: {
        password: hashedNewPassword,
      },
    });

    return {
      success: true,
      message: "Password updated successfully",
    };
  } catch (error) {
    console.error("Error updating password:", error);
    return {
      success: false,
      error: "Failed to update password",
    };
  }
}

export async function getAdminProfile() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || session.user.role !== "admin") {
      return {
        success: false,
        error: "Unauthorized access",
      };
    }

    const admin = await prisma.admin.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!admin) {
      return {
        success: false,
        error: "Admin not found",
      };
    }

    return {
      success: true,
      admin: {
        ...admin,
        name: "Admin",
        role: "admin",
      },
    };
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    return {
      success: false,
      error: "Failed to fetch profile",
    };
  }
}