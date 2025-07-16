import ContactFormWrapper from "@/components/ui/contact-form-wrapper";
import { Toaster } from "sonner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Sai Nithin K - Get in Touch | Brand Collaborations & Courses",
  description: "Contact Sai Nithin K for brand collaborations, course inquiries, YouTube partnerships, or any questions about tech content creation, digital marketing, and online education.",
  keywords: [
    "Contact Sai Nithin K",
    "sainithintech contact",
    "Brand collaboration",
    "YouTube partnership",
    "Course inquiries",
    "Tech content creator contact",
    "Digital marketing consultation",
    "Content creation services",
    "Telugu tech YouTuber contact",
    "Influencer collaboration"
  ],
  openGraph: {
    title: "Contact Sai Nithin K - Get in Touch | Brand Collaborations & Courses",
    description: "Contact Sai Nithin K for brand collaborations, course inquiries, YouTube partnerships, or any questions about tech content creation and digital marketing.",
    url: "https://sainithintech.com/contact",
    type: "website",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Sai Nithin K - Telugu Tech YouTuber & Content Creator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Sai Nithin K - Get in Touch | Brand Collaborations & Courses",
    description: "Contact Sai Nithin K for brand collaborations, course inquiries, YouTube partnerships, or any questions about tech content creation and digital marketing.",
    images: ["/profile.jpg"],
  },
  alternates: {
    canonical: "https://sainithintech.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Get in Touch
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a question or want to work together? Fill out the form below
            and I&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <ContactFormWrapper />
        <Toaster position="top-center" />
      </div>
    </div>
  );
}
