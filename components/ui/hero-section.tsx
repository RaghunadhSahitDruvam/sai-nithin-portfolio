"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Youtube, Instagram, Facebook, Twitter, AtSign } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative mx-auto flex min-h-[calc(50vh-100px)] max-w-7xl flex-col items-center justify-center px-4 md:py-0">
      {/* Decorative borders */}
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>

      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-16 w-full max-w-6xl">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="relative z-10 text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-slate-700 dark:text-slate-300">
            {"Sai Nithin Tech - Simplifying Tech Across Platforms"
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: "easeInOut",
                  }}
                  className="mr-2 inline-block"
                >
                  {word}
                </motion.span>
              ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            className="relative z-10 mt-6 text-base sm:text-lg text-neutral-600 dark:text-neutral-400"
          >
            From tech news to gadget reviews and one-minute shorts - join me as
            I make technology easy, fun, and accessible for every Telugu
            speaker.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1 }}
            className="relative z-10 mt-8 flex flex-wrap items-center justify-center md:justify-start gap-4"
          >
            <a
              href="https://www.youtube.com/@sainithintech"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex h-10 sm:h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium text-white backdrop-blur-3xl gap-2">
                <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Visit My YouTube</span>
                <span className="sm:hidden">YouTube</span>
              </span>
            </a>

            <a
              href="https://www.instagram.com/sainithintech"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex h-10 sm:h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium text-white backdrop-blur-3xl gap-2">
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                Instagram
              </span>
            </a>

            <a
              href="https://www.facebook.com/sainithin97"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex h-10 sm:h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium text-white backdrop-blur-3xl gap-2">
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
                Facebook
              </span>
            </a>

            <a
              href="https://x.com/sainithintech"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex h-10 sm:h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium text-white backdrop-blur-3xl gap-2">
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                Twitter
              </span>
            </a>

            <a
              href="https://www.threads.net/@sainithintech"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex h-10 sm:h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium text-white backdrop-blur-3xl gap-2">
                <AtSign className="w-4 h-4 sm:w-5 sm:h-5" />
                Threads
              </span>
            </a>
          </motion.div>
        </div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative z-10 w-48 sm:w-64 md:w-96 aspect-square rounded-full overflow-hidden border-4 border-neutral-200 dark:border-neutral-800"
        >
          <Image
            src="/profile.jpg"
            alt="Profile"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </div>
    </div>
  );
}
