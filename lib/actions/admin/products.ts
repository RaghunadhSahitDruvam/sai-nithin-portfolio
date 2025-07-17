"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { deleteFromCloudinary, extractPublicId } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

const productSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  link: z.string().url("Invalid URL format"),
  image: z.string().url("Invalid image URL"),
});

const productUpdateSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title too long")
    .optional(),
  link: z.string().url("Invalid URL format").optional(),
  image: z.string().url("Invalid image URL").optional(),
});

export async function getAdminProducts(
  page: number = 1,
  limit: number = 10,
  search: string = ""
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.role !== "admin") {
      return { success: false, error: "Unauthorized" };
    }

    const skip = (page - 1) * limit;

    const where = search
      ? {
          title: {
            contains: search,
            mode: "insensitive" as const,
          },
        }
      : {};

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return {
      success: true,
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { success: false, error: "Internal server error" };
  }
}

export async function createProduct(data: {
  title: string;
  link: string;
  image: string;
}) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.role !== "admin") {
      return { success: false, error: "Unauthorized" };
    }

    const validatedData = productSchema.parse(data);

    const product = await prisma.product.create({
      data: validatedData,
    });

    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/products");
    revalidatePath("/products");

    return { success: true, product };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation error",
        details: error.issues,
      };
    }

    console.error("Error creating product:", error);
    return { success: false, error: "Internal server error" };
  }
}

export async function getProductById(id: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
      return { success: false, error: "Unauthorized" };
    }

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return { success: false, error: "Product not found" };
    }

    return { success: true, product };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { success: false, error: "Internal server error" };
  }
}

export async function updateProduct(
  id: string,
  data: {
    title?: string;
    link?: string;
    image?: string;
  },
  originalImageUrl?: string
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
      return { success: false, error: "Unauthorized" };
    }

    const validatedData = productUpdateSchema.parse(data);

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return { success: false, error: "Product not found" };
    }

    // If image is being updated, delete the old one from Cloudinary
    const imageToDelete = originalImageUrl || existingProduct.image;
    if (validatedData.image && validatedData.image !== imageToDelete) {
      try {
        const publicId = extractPublicId(imageToDelete);
        if (publicId) {
          await deleteFromCloudinary(publicId);
        }
      } catch (error) {
        console.error("Error deleting old image from Cloudinary:", error);
        // Continue with update even if image deletion fails
      }
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: validatedData,
    });

    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/products");
    revalidatePath("/products");

    return { success: true, product: updatedProduct };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation error",
        details: error.issues,
      };
    }

    console.error("Error updating product:", error);
    return { success: false, error: "Internal server error" };
  }
}

export async function deleteProduct(id: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
      return { success: false, error: "Unauthorized" };
    }

    // Get product to delete image from Cloudinary
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return { success: false, error: "Product not found" };
    }

    // Delete image from Cloudinary
    try {
      const publicId = extractPublicId(product.image);
      if (publicId) {
        await deleteFromCloudinary(publicId);
      }
    } catch (error) {
      console.error("Error deleting image from Cloudinary:", error);
      // Continue with product deletion even if image deletion fails
    }

    // Delete product from database
    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/products");
    revalidatePath("/products");

    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: "Internal server error" };
  }
}