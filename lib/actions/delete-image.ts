"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { deleteFromCloudinary } from "@/lib/cloudinary";

export async function deleteImage(publicId: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
      return { success: false, error: "Unauthorized" };
    }

    if (!publicId) {
      return { success: false, error: "Public ID is required" };
    }

    // Delete from Cloudinary
    const result = await deleteFromCloudinary(publicId);

    if (result.result === "ok" || result.result === "not found") {
      return {
        success: true,
        message: "Image deleted successfully",
      };
    } else {
      return {
        success: false,
        error: "Failed to delete image from Cloudinary",
      };
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    return {
      success: false,
      error: "Failed to delete image. Please try again.",
    };
  }
}