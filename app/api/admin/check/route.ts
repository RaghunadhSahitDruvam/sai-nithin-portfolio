import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const adminCount = await prisma.admin.count();

    return NextResponse.json({ hasAdmin: adminCount > 0 }, { status: 200 });
  } catch (error) {
    console.error("Check admin error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
