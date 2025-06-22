"use client";

import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";

export default function CoursesSection() {
  return (
    <section className="relative w-full bg-white dark:bg-black">
      {/* Grid Background */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 mb-4">
            My Courses
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-sm sm:text-base">
            Transform your skills and unlock new opportunities with our
            comprehensive courses
          </p>
        </div>

        {/* Course Card */}
        <div className="bg-white/10 dark:bg-black/10 backdrop-blur-lg rounded-3xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="grid md:grid-cols-2 gap-6 p-4 sm:p-8">
            {/* Course Image */}
            <div className="relative h-[200px] sm:h-[300px] md:h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/images/instagram-course.png"
                alt="Instagram Course"
                fill
                className="object-cover"
              />
            </div>

            {/* Course Content */}
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-black dark:text-white mb-4">
                  Earn 1 Lakh per Month with Instagram - Complete Blueprint
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base lg:text-lg mb-8">
                  Unlock the Ultimate Blueprint to Earn Whopping 1 Lakh per
                  Month using Instagram! Your pathway to financial freedom
                  Starts Here!
                </p>

                {/* Course Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 text-sm sm:text-base">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>1 hour 40 min Hours Content</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 text-sm sm:text-base">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      />
                    </svg>
                    <span>17 Modules</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 text-sm sm:text-base">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Lifetime Access</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 text-sm sm:text-base">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      />
                    </svg>
                    <span>24/7 Support</span>
                  </div>
                </div>
              </div>

              {/* Border Magic Button */}
              <a
                href="/courses/instagram-blueprint"
                className="relative inline-flex h-10 sm:h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 w-full"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-1 text-sm sm:text-base font-medium text-white backdrop-blur-3xl">
                  Learn More →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
