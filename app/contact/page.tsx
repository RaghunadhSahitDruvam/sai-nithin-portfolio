"use client";

import ContactForm from "@/components/ui/contact-form";
import { Toaster } from "sonner";

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

        <ContactForm />
        <Toaster position="top-center" />
      </div>
    </div>
  );
}
