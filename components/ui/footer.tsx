"use client";

import { Youtube, Instagram, Facebook, Twitter, AtSign } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black text-white dark:bg-zinc-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <Link
            href="https://www.youtube.com/@sainithintech"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex h-10 sm:h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium text-white backdrop-blur-3xl gap-2">
              <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">YouTube</span>
            </span>
          </Link>

          <Link
            href="https://www.instagram.com/sainithintech"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex h-10 sm:h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium text-white backdrop-blur-3xl gap-2">
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Instagram</span>
            </span>
          </Link>

          <Link
            href="https://www.facebook.com/sainithin97"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex h-10 sm:h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium text-white backdrop-blur-3xl gap-2">
              <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Facebook</span>
            </span>
          </Link>

          <Link
            href="https://x.com/sainithintech"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex h-10 sm:h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium text-white backdrop-blur-3xl gap-2">
              <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Twitter</span>
            </span>
          </Link>

          <Link
            href="https://www.threads.net/@sainithintech"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex h-10 sm:h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium text-white backdrop-blur-3xl gap-2">
              <AtSign className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Threads</span>
            </span>
          </Link>
        </div>

        <div className="text-center text-sm text-gray-400">
          <p>© {currentYear} Sai Nithin Tech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
