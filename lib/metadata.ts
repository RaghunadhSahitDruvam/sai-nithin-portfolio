"use server";

import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

// Default metadata values
const DEFAULT_METADATA = {
    home: {
        title: "Sai Nithin K - Telugu Tech YouTuber & Content Creator | sainithintech",
        description: "Welcome to Sai Nithin K's digital hub. Explore the journey of a prominent Telugu tech content creator with 856K+ YouTube subscribers. Discover tech reviews, tutorials, and educational courses on digital content creation.",
        keywords: "Sai Nithin K, sainithintech, Telugu tech YouTuber, Tech content creator, YouTube tech channel",
        ogImage: "/profile.jpg",
        url: "https://sainithintech.com",
    },
    products: {
        title: "Products - Sai Nithin K | sainithintech",
        description: "Explore products and recommendations from Sai Nithin K. Find the best tech products, gadgets, and tools reviewed by a trusted Telugu tech content creator.",
        keywords: "Sai Nithin K products, Tech products, Gadget recommendations, Product reviews",
        ogImage: "/profile.jpg",
        url: "https://sainithintech.com/products",
    },
    contact: {
        title: "Contact Sai Nithin K - Get in Touch | Brand Collaborations & Courses",
        description: "Contact Sai Nithin K for brand collaborations, course inquiries, YouTube partnerships, or any questions about tech content creation, digital marketing, and online education.",
        keywords: "Contact Sai Nithin K, Brand collaboration, YouTube partnership, Course inquiries",
        ogImage: "/profile.jpg",
        url: "https://sainithintech.com/contact",
    },
    about: {
        title: "About Sai Nithin K - Telugu Tech YouTuber | sainithintech",
        description: "Learn about Sai Nithin K, a prominent Telugu tech content creator with 856K+ YouTube subscribers. Discover the journey, achievements, and mission behind sainithintech.",
        keywords: "About Sai Nithin K, Telugu tech YouTuber, Content creator journey, sainithintech",
        ogImage: "/profile.jpg",
        url: "https://sainithintech.com/about",
    },
    blog: {
        title: "Blog - Sai Nithin K | Tech Articles & Tutorials",
        description: "Read the latest tech articles, tutorials, and insights from Sai Nithin K. Stay updated with tech trends, digital marketing tips, and content creation strategies.",
        keywords: "Tech blog, Tech articles, Digital marketing tips, Content creation tutorials",
        ogImage: "/profile.jpg",
        url: "https://sainithintech.com/blog",
    },
};

export async function getPageMetadata(pageName: string): Promise<Metadata> {
    try {
        // Fetch SEO data from database
        const seoData = await prisma.pageSEO.findUnique({
            where: { pageName },
        });

        // Get default values for this page
        const defaults = DEFAULT_METADATA[pageName as keyof typeof DEFAULT_METADATA] || DEFAULT_METADATA.home;

        // If no SEO data exists, return defaults
        if (!seoData) {
            return {
                title: defaults.title,
                description: defaults.description,
                keywords: defaults.keywords.split(", "),
                openGraph: {
                    title: defaults.title,
                    description: defaults.description,
                    url: defaults.url,
                    type: "website",
                    images: [
                        {
                            url: defaults.ogImage,
                            width: 1200,
                            height: 630,
                            alt: defaults.title,
                        },
                    ],
                },
                twitter: {
                    card: "summary_large_image",
                    title: defaults.title,
                    description: defaults.description,
                    images: [defaults.ogImage],
                },
                alternates: {
                    canonical: defaults.url,
                },
            };
        }

        // Build metadata from database
        const metadata: Metadata = {
            title: seoData.metaTitle || defaults.title,
            description: seoData.metaDescription || defaults.description,
        };

        // Add keywords if available
        if (seoData.metaKeywords) {
            metadata.keywords = seoData.metaKeywords.split(",").map((k) => k.trim());
        }

        // Add Open Graph metadata
        metadata.openGraph = {
            title: seoData.ogTitle || seoData.metaTitle || defaults.title,
            description: seoData.ogDescription || seoData.metaDescription || defaults.description,
            url: seoData.canonicalUrl || defaults.url,
            type: "website",
            images: seoData.ogImage
                ? [
                    {
                        url: seoData.ogImage,
                        width: 1200,
                        height: 630,
                        alt: seoData.ogTitle || seoData.metaTitle || defaults.title,
                    },
                ]
                : [
                    {
                        url: defaults.ogImage,
                        width: 1200,
                        height: 630,
                        alt: defaults.title,
                    },
                ],
        };

        // Add Twitter metadata
        metadata.twitter = {
            card: (seoData.twitterCard as "summary" | "summary_large_image" | "app" | "player") || "summary_large_image",
            title: seoData.twitterTitle || seoData.metaTitle || defaults.title,
            description: seoData.twitterDescription || seoData.metaDescription || defaults.description,
            images: seoData.twitterImage ? [seoData.twitterImage] : [defaults.ogImage],
        };

        // Add canonical URL
        if (seoData.canonicalUrl) {
            metadata.alternates = {
                canonical: seoData.canonicalUrl,
            };
        }

        // Add robots directive
        if (seoData.robots) {
            metadata.robots = seoData.robots;
        }

        return metadata;
    } catch (error) {
        console.error(`Error fetching metadata for ${pageName}:`, error);

        // Return defaults on error
        const defaults = DEFAULT_METADATA[pageName as keyof typeof DEFAULT_METADATA] || DEFAULT_METADATA.home;
        return {
            title: defaults.title,
            description: defaults.description,
            keywords: defaults.keywords.split(", "),
            openGraph: {
                title: defaults.title,
                description: defaults.description,
                url: defaults.url,
                type: "website",
                images: [
                    {
                        url: defaults.ogImage,
                        width: 1200,
                        height: 630,
                        alt: defaults.title,
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                title: defaults.title,
                description: defaults.description,
                images: [defaults.ogImage],
            },
            alternates: {
                canonical: defaults.url,
            },
        };
    }
}
