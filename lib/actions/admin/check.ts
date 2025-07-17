"use server";

import { prisma } from "@/lib/prisma";

export async function checkAdminExists() {
  try {
    const adminCount = await prisma.admin.count();
    return { success: true, hasAdmin: adminCount > 0 };
  } catch (error) {
    console.error("Check admin error:", error);
    return { success: false, error: "Internal server error" };
  }
}