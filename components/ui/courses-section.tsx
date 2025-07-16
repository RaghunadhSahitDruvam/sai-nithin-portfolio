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
        <div className="bg-white/10 dark:bg-black/10 backdrop-blur-lg rounded-3xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 relative">
          {/* Urgency Badge */}
          <div className="absolute top-4 right-4 z-20">
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-bold animate-pulse">
              🔥 Limited Time Offer!
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 p-4 sm:p-8 pt-16 sm:pt-20">
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
                {/* Price Section with Urgency */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl sm:text-3xl font-bold text-green-500">
                      ₹489
                    </span>
                    <span className="text-lg text-neutral-500 line-through">
                      ₹2,999
                    </span>
                    <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs font-bold">
                      84% OFF
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-red-500 text-sm font-medium">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>⏰ Only some hours left at this price!</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-black dark:text-white mb-4">
                  Earn 1 Lakh per Month with Instagram - Complete Blueprint
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base lg:text-lg mb-6">
                  Unlock the Ultimate Blueprint to Earn Whopping 1 Lakh per
                  Month using Instagram! Your pathway to financial freedom
                  Starts Here!
                </p>

                {/* Social Proof */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-6">
                  <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 text-sm">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">
                      2,847+ students already enrolled
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="flex text-yellow-400">⭐⭐⭐⭐⭐</div>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      (4.6/5 from 14 reviews)
                    </span>
                  </div>
                </div>

                {/* Course Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
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
                href="https://www.reachdigitalacademy.com/courses/Course-1-6836d47076aebc496ca0def4?page=checkout&rzpCashfreeRedirectToPreCheckoutFlow=true&reqparams=pid%3Dp1&newCheckoutFlowParams=%2Ft%2Fpublic%2Fpre-checkout%2Fsingle-checkout%3FcourseId%3D6836d47076aebc496ca0def4%26pid%3Dp1%26orderId%3DaldKP175263354503281%26courseAmount%3D489.0%26pg%3Dcashfree%26currencyCode%3DINR%26transactionId%3D687710c9fa53163cb955dbc7"
                target="_blank"
                className="relative inline-flex h-12 sm:h-14 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 w-full mb-3"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-green-700 px-4 py-1 text-sm sm:text-base font-bold text-white backdrop-blur-3xl">
                  🚀 Enroll Now ➡
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
