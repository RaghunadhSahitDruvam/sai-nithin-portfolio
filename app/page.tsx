import React from "react";
import HeroSection from "@/components/ui/hero-section";
import CoursesSection from "@/components/ui/courses-section";
import TimelineDemo from "@/components/ui/timeline-demo";
import ContactForm from "@/components/ui/contact-form";
import { Toaster } from "sonner";
import WhatIDoSection from "@/components/ui/what-i-do-section";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div id="hero" className="pt-24">
        <HeroSection />
      </div>

      <div id="what-i-do" className="pt-24">
        <WhatIDoSection />
      </div>

      <div id="timeline" className="pt-24">
        <TimelineDemo />
      </div>

      <div id="courses" className="pt-24">
        <CoursesSection />
      </div>

      <div
        id="contact"
        className="pt-24 min-h-screen py-12 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black"
      >
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

          <ContactForm />
          <Toaster position="top-center" />
        </div>
      </div>
    </main>
  );
}
