"use server";

import { prisma } from "@/lib/prisma";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";

export interface PageSEOData {
    id?: string;
    pageName: string;
    pageTitle: string;
    metaTitle: string;
    metaDescription: string;
    metaKeywords?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    ogImagePublicId?: string;
    twitterCard?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
    canonicalUrl?: string;
    robots?: string;
}

export async function getAllPagesSEO() {
    try {
        const pages = await prisma.pageSEO.findMany({
            orderBy: { updatedAt: "desc" },
        });

        return { success: true, pages };
    } catch (error) {
        console.error("Error fetching SEO pages:", error);
        return { success: false, error: "Failed to fetch SEO pages" };
    }
}

export async function getPageSEO(pageName: string) {
    try {
        const page = await prisma.pageSEO.findUnique({
            where: { pageName },
        });

        return { success: true, page };
    } catch (error) {
        console.error("Error fetching page SEO:", error);
        return { success: false, error: "Failed to fetch page SEO" };
    }
}

export async function upsertPageSEO(data: PageSEOData) {
    try {
        const page = await prisma.pageSEO.upsert({
            where: { pageName: data.pageName },
            update: {
                pageTitle: data.pageTitle,
                metaTitle: data.metaTitle,
                metaDescription: data.metaDescription,
                metaKeywords: data.metaKeywords,
                ogTitle: data.ogTitle,
                ogDescription: data.ogDescription,
                ogImage: data.ogImage,
                ogImagePublicId: data.ogImagePublicId,
                twitterCard: data.twitterCard,
                twitterTitle: data.twitterTitle,
                twitterDescription: data.twitterDescription,
                twitterImage: data.twitterImage,
                canonicalUrl: data.canonicalUrl,
                robots: data.robots,
            },
            create: {
                pageName: data.pageName,
                pageTitle: data.pageTitle,
                metaTitle: data.metaTitle,
                metaDescription: data.metaDescription,
                metaKeywords: data.metaKeywords,
                ogTitle: data.ogTitle,
                ogDescription: data.ogDescription,
                ogImage: data.ogImage,
                ogImagePublicId: data.ogImagePublicId,
                twitterCard: data.twitterCard,
                twitterTitle: data.twitterTitle,
                twitterDescription: data.twitterDescription,
                twitterImage: data.twitterImage,
                canonicalUrl: data.canonicalUrl,
                robots: data.robots,
            },
        });

        return { success: true, page };
    } catch (error) {
        console.error("Error upserting page SEO:", error);
        return { success: false, error: "Failed to save page SEO" };
    }
}

export async function uploadOGImage(formData: FormData) {
    try {
        const file = formData.get("file") as File;
        if (!file) {
            return { success: false, error: "No file provided" };
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result = await uploadToCloudinary(buffer, {
            folder: "portfolio/seo/og-images",
            resource_type: "image",
        });

        return {
            success: true,
            url: result.secure_url,
            publicId: result.public_id,
        };
    } catch (error) {
        console.error("Error uploading OG image:", error);
        return { success: false, error: "Failed to upload image" };
    }
}

export async function deleteOGImage(publicId: string) {
    try {
        await deleteFromCloudinary(publicId);
        return { success: true };
    } catch (error) {
        console.error("Error deleting OG image:", error);
        return { success: false, error: "Failed to delete image" };
    }
}

export async function deletePageSEO(pageName: string) {
    try {
        const page = await prisma.pageSEO.findUnique({
            where: { pageName },
        });

        if (page?.ogImagePublicId) {
            await deleteFromCloudinary(page.ogImagePublicId);
        }

        await prisma.pageSEO.delete({
            where: { pageName },
        });

        return { success: true };
    } catch (error) {
        console.error("Error deleting page SEO:", error);
        return { success: false, error: "Failed to delete page SEO" };
    }
}
