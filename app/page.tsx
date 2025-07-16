import React from "react";
import HeroSection from "@/components/ui/hero-section";
import CoursesSection from "@/components/ui/courses-section";
import TimelineDemo from "@/components/ui/timeline-demo";
import ContactFormWrapper from "@/components/ui/contact-form-wrapper";
import { Toaster } from "sonner";
import WhatIDoSection from "@/components/ui/what-i-do-section";
import ViralVideosSection from "@/components/ui/viral-videos-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Sai Nithin K - Telugu Tech YouTuber & Content Creator | sainithintech",
  description:
    "Welcome to Sai Nithin K's digital hub. Explore the journey of a prominent Telugu tech content creator with 856K+ YouTube subscribers. Discover tech reviews, tutorials, and educational courses on digital content creation.",
  keywords: [
    "Sai Nithin K",
    "sainithintech",
    "Telugu tech YouTuber",
    "Tech content creator",
    "YouTube tech channel",
    "Telugu tech reviews",
    "Tech tutorials Telugu",
    "Gadget reviews",
    "Tech news Telugu",
    "Content creation courses",
    "Digital marketing Telugu",
    "Online earning tutorials",
  ],
  openGraph: {
    title:
      "Sai Nithin K - Telugu Tech YouTuber & Content Creator | sainithintech",
    description:
      "Welcome to Sai Nithin K's digital hub. Explore the journey of a prominent Telugu tech content creator with 856K+ YouTube subscribers.",
    url: "https://sainithintech.com",
    type: "website",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Sai Nithin K - Telugu Tech YouTuber & Content Creator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Sai Nithin K - Telugu Tech YouTuber & Content Creator | sainithintech",
    description:
      "Welcome to Sai Nithin K's digital hub. Explore the journey of a prominent Telugu tech content creator with 856K+ YouTube subscribers.",
    images: ["/profile.jpg"],
  },
  alternates: {
    canonical: "https://sainithintech.com",
  },
};

export default function Home() {
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sai Nithin Tech",
    alternateName: "sainithintech.com",
    url: "https://sainithintech.com",
    description:
      "Sai Nithin K's digital hub for Telugu tech content, YouTube videos, and digital content creation courses",
    author: {
      "@type": "Person",
      name: "Sai Nithin K",
      url: "https://sainithintech.com",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://sainithintech.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sai Nithin Tech",
    alternateName: "sainithintech",
    url: "https://sainithintech.com",
    logo: "https://sainithintech.com/profile.jpg",
    description:
      "Telugu tech content creation organization focused on tech reviews, tutorials, and digital education with 856K+ YouTube subscribers",
    founder: {
      "@type": "Person",
      name: "Sai Nithin K",
    },
    sameAs: [
      "https://github.com/sainithintech",
      "https://linkedin.com/in/sainithintech",
      "https://twitter.com/sainithintech",
      "https://instagram.com/sainithintech",
      "https://youtube.com/@sainithintech",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: "https://sainithintech.com/contact",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />
      <main className="min-h-screen">
        <div id="hero" className="pt-24">
          <HeroSection />
        </div>

        <div id="what-i-do" className="md:pt-24">
          <WhatIDoSection />
        </div>

        <div id="viral-videos" className="">
          <ViralVideosSection />
        </div>

        <div id="timeline" className="md:pt-24">
          <TimelineDemo />
        </div>

        <div id="courses" className="md:pt-24">
          <CoursesSection />
        </div>

        <div
          id="contact"
          className="md:pt-24 min-h-screen py-12 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black"
        >
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                Get in Touch
              </h1>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Have a question or want to work together? Fill out the form
                below and I&apos;ll get back to you as soon as possible.
              </p>
            </div>

            <ContactFormWrapper />
            <Toaster position="top-center" />
          </div>
        </div>
      </main>
    </>
  );
}
