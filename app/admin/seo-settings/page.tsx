"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    Loader2,
    Plus,
    Edit,
    Trash2,
    Search,
    Image as ImageIcon,
    ArrowLeft,
    Upload,
    X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import {
    getAllPagesSEO,
    upsertPageSEO,
    uploadOGImage,
    deletePageSEO,
    type PageSEOData,
} from "@/lib/actions/admin/seo";

const AVAILABLE_PAGES = [
    { value: "home", label: "Home Page" },
    { value: "about", label: "About Page" },
    { value: "contact", label: "Contact Page" },
    { value: "products", label: "Products Page" },
    { value: "blog", label: "Blog Page" },
];

export default function SEOSettingsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [pages, setPages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPage, setSelectedPage] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    const [formData, setFormData] = useState<PageSEOData>({
        pageName: "",
        pageTitle: "",
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
        ogTitle: "",
        ogDescription: "",
        ogImage: "",
        ogImagePublicId: "",
        twitterCard: "summary_large_image",
        twitterTitle: "",
        twitterDescription: "",
        twitterImage: "",
        canonicalUrl: "",
        robots: "index, follow",
    });

    useEffect(() => {
        if (status === "loading") return;

        if (!session || session.user?.role !== "admin") {
            router.push("/admin/auth");
            return;
        }

        fetchPages();
    }, [session, status, router]);

    const fetchPages = async () => {
        try {
            const result = await getAllPagesSEO();
            if (result.success) {
                setPages(result.pages || []);
            } else {
                toast.error(result.error || "Failed to fetch SEO pages");
            }
        } catch (error) {
            console.error("Error fetching pages:", error);
            toast.error("Failed to fetch SEO pages");
        } finally {
            setLoading(false);
        }
    };

    const handleSelectPage = (pageName: string) => {
        const existingPage = pages.find((p) => p.pageName === pageName);
        if (existingPage) {
            setFormData(existingPage);
        } else {
            setFormData({
                pageName,
                pageTitle: "",
                metaTitle: "",
                metaDescription: "",
                metaKeywords: "",
                ogTitle: "",
                ogDescription: "",
                ogImage: "",
                ogImagePublicId: "",
                twitterCard: "summary_large_image",
                twitterTitle: "",
                twitterDescription: "",
                twitterImage: "",
                canonicalUrl: "",
                robots: "index, follow",
            });
        }
        setSelectedPage(pageName);
        setIsEditing(true);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingImage(true);
        try {
            const formDataUpload = new FormData();
            formDataUpload.append("file", file);

            const result = await uploadOGImage(formDataUpload);
            if (result.success) {
                setFormData({
                    ...formData,
                    ogImage: result.url || "",
                    ogImagePublicId: result.publicId || "",
                    twitterImage: result.url || "",
                });
                toast.success("Image uploaded successfully!");
            } else {
                toast.error(result.error || "Failed to upload image");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.error("Failed to upload image");
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSave = async () => {
        if (!formData.pageName || !formData.pageTitle || !formData.metaTitle || !formData.metaDescription) {
            toast.error("Please fill in all required fields");
            return;
        }

        setIsSaving(true);
        try {
            const result = await upsertPageSEO(formData);
            if (result.success) {
                toast.success("SEO settings saved successfully!");
                fetchPages();
                setIsEditing(false);
                setSelectedPage(null);
            } else {
                toast.error(result.error || "Failed to save SEO settings");
            }
        } catch (error) {
            console.error("Error saving SEO settings:", error);
            toast.error("Failed to save SEO settings");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (pageName: string) => {
        if (!confirm(`Are you sure you want to delete SEO settings for ${pageName}?`)) return;

        try {
            const result = await deletePageSEO(pageName);
            if (result.success) {
                toast.success("SEO settings deleted successfully!");
                fetchPages();
            } else {
                toast.error(result.error || "Failed to delete SEO settings");
            }
        } catch (error) {
            console.error("Error deleting SEO settings:", error);
            toast.error("Failed to delete SEO settings");
        }
    };

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!session || session.user?.role !== "admin") {
        return null;
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <Link href="/admin/dashboard">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Dashboard
                            </Button>
                        </Link>
                    </div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        SEO Settings
                    </h1>
                    <p className="text-muted-foreground">
                        Manage SEO metadata for all pages including meta tags, Open Graph, and Twitter cards.
                    </p>
                </div>

                {!isEditing ? (
                    <>
                        {/* Add New Page */}
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle>Select a Page to Configure</CardTitle>
                                <CardDescription>
                                    Choose a page to add or edit SEO metadata
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {AVAILABLE_PAGES.map((page) => (
                                        <Button
                                            key={page.value}
                                            variant="outline"
                                            className="h-auto py-4 flex flex-col items-start gap-2"
                                            onClick={() => handleSelectPage(page.value)}
                                        >
                                            <Search className="h-5 w-5" />
                                            <span className="font-semibold">{page.label}</span>
                                            {pages.find((p) => p.pageName === page.value) && (
                                                <span className="text-xs text-muted-foreground">
                                                    ✓ Configured
                                                </span>
                                            )}
                                        </Button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Existing Pages */}
                        {pages.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Configured Pages</CardTitle>
                                    <CardDescription>
                                        Pages with SEO metadata configured
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {pages.map((page) => (
                                            <div
                                                key={page.id}
                                                className="flex items-center justify-between p-4 border border-border rounded-lg"
                                            >
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-foreground">
                                                        {AVAILABLE_PAGES.find((p) => p.value === page.pageName)?.label || page.pageName}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground line-clamp-1">
                                                        {page.metaDescription}
                                                    </p>
                                                    {page.ogImage && (
                                                        <div className="mt-2 relative w-32 h-16 rounded overflow-hidden">
                                                            <Image
                                                                src={page.ogImage}
                                                                alt="OG Image"
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleSelectPage(page.pageName)}
                                                    >
                                                        <Edit className="h-4 w-4 mr-2" />
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleDelete(page.pageName)}
                                                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </>
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Edit SEO for {AVAILABLE_PAGES.find((p) => p.value === formData.pageName)?.label || formData.pageName}
                            </CardTitle>
                            <CardDescription>
                                Configure SEO metadata, Open Graph, and Twitter card settings
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Basic SEO */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-foreground">Basic SEO</h3>
                                <div>
                                    <Label htmlFor="pageTitle">Page Title *</Label>
                                    <Input
                                        id="pageTitle"
                                        value={formData.pageTitle}
                                        onChange={(e) =>
                                            setFormData({ ...formData, pageTitle: e.target.value })
                                        }
                                        placeholder="Enter page title"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="metaTitle">Meta Title *</Label>
                                    <Input
                                        id="metaTitle"
                                        value={formData.metaTitle}
                                        onChange={(e) =>
                                            setFormData({ ...formData, metaTitle: e.target.value })
                                        }
                                        placeholder="Enter meta title (50-60 characters)"
                                        maxLength={60}
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {formData.metaTitle.length}/60 characters
                                    </p>
                                </div>
                                <div>
                                    <Label htmlFor="metaDescription">Meta Description *</Label>
                                    <Textarea
                                        id="metaDescription"
                                        value={formData.metaDescription}
                                        onChange={(e) =>
                                            setFormData({ ...formData, metaDescription: e.target.value })
                                        }
                                        placeholder="Enter meta description (150-160 characters)"
                                        maxLength={160}
                                        rows={3}
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {formData.metaDescription.length}/160 characters
                                    </p>
                                </div>
                                <div>
                                    <Label htmlFor="metaKeywords">Meta Keywords</Label>
                                    <Input
                                        id="metaKeywords"
                                        value={formData.metaKeywords}
                                        onChange={(e) =>
                                            setFormData({ ...formData, metaKeywords: e.target.value })
                                        }
                                        placeholder="keyword1, keyword2, keyword3"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="canonicalUrl">Canonical URL</Label>
                                    <Input
                                        id="canonicalUrl"
                                        value={formData.canonicalUrl}
                                        onChange={(e) =>
                                            setFormData({ ...formData, canonicalUrl: e.target.value })
                                        }
                                        placeholder="https://example.com/page"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="robots">Robots</Label>
                                    <Select
                                        value={formData.robots}
                                        onValueChange={(value) =>
                                            setFormData({ ...formData, robots: value })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="index, follow">Index, Follow</SelectItem>
                                            <SelectItem value="noindex, nofollow">No Index, No Follow</SelectItem>
                                            <SelectItem value="index, nofollow">Index, No Follow</SelectItem>
                                            <SelectItem value="noindex, follow">No Index, Follow</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Open Graph */}
                            <div className="space-y-4 pt-6 border-t border-border">
                                <h3 className="text-lg font-semibold text-foreground">Open Graph (Facebook)</h3>
                                <div>
                                    <Label htmlFor="ogTitle">OG Title</Label>
                                    <Input
                                        id="ogTitle"
                                        value={formData.ogTitle}
                                        onChange={(e) =>
                                            setFormData({ ...formData, ogTitle: e.target.value })
                                        }
                                        placeholder="Enter Open Graph title"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="ogDescription">OG Description</Label>
                                    <Textarea
                                        id="ogDescription"
                                        value={formData.ogDescription}
                                        onChange={(e) =>
                                            setFormData({ ...formData, ogDescription: e.target.value })
                                        }
                                        placeholder="Enter Open Graph description"
                                        rows={2}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="ogImage">OG Image</Label>
                                    <div className="space-y-2">
                                        {formData.ogImage && (
                                            <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border">
                                                <Image
                                                    src={formData.ogImage}
                                                    alt="OG Image Preview"
                                                    fill
                                                    className="object-cover"
                                                />
                                                <button
                                                    onClick={() =>
                                                        setFormData({
                                                            ...formData,
                                                            ogImage: "",
                                                            ogImagePublicId: "",
                                                        })
                                                    }
                                                    className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <Input
                                                id="ogImage"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                disabled={uploadingImage}
                                                className="flex-1"
                                            />
                                            {uploadingImage && (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Recommended size: 1200x630px
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Twitter Card */}
                            <div className="space-y-4 pt-6 border-t border-border">
                                <h3 className="text-lg font-semibold text-foreground">Twitter Card</h3>
                                <div>
                                    <Label htmlFor="twitterCard">Card Type</Label>
                                    <Select
                                        value={formData.twitterCard}
                                        onValueChange={(value) =>
                                            setFormData({ ...formData, twitterCard: value })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="summary">Summary</SelectItem>
                                            <SelectItem value="summary_large_image">Summary Large Image</SelectItem>
                                            <SelectItem value="app">App</SelectItem>
                                            <SelectItem value="player">Player</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="twitterTitle">Twitter Title</Label>
                                    <Input
                                        id="twitterTitle"
                                        value={formData.twitterTitle}
                                        onChange={(e) =>
                                            setFormData({ ...formData, twitterTitle: e.target.value })
                                        }
                                        placeholder="Enter Twitter card title"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="twitterDescription">Twitter Description</Label>
                                    <Textarea
                                        id="twitterDescription"
                                        value={formData.twitterDescription}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                twitterDescription: e.target.value,
                                            })
                                        }
                                        placeholder="Enter Twitter card description"
                                        rows={2}
                                    />
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 pt-6 border-t border-border">
                                <Button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="flex-1"
                                >
                                    {isSaving ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        "Save SEO Settings"
                                    )}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setSelectedPage(null);
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
