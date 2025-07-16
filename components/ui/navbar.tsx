"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu as MenuIcon, X } from "lucide-react";

export default function Navbar({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <div
      className={cn(
        "fixed top-4 inset-x-0 max-w-2xl mx-auto z-50 px-4",
        className
      )}
    >
      <nav className="relative rounded-full border border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input">
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-center space-x-8 px-8 py-4">
          <a
            href="#hero"
            onClick={(e) => handleScroll(e, "hero")}
            className="text-sm text-neutral-700 dark:text-neutral-200 hover:text-black dark:hover:text-white transition-colors"
          >
            Home
          </a>
          <a
            href="#what-i-do"
            onClick={(e) => handleScroll(e, "what-i-do")}
            className="text-sm text-neutral-700 dark:text-neutral-200 hover:text-black dark:hover:text-white transition-colors"
          >
            What I Do
          </a>
          <a
            href="#viral-videos"
            onClick={(e) => handleScroll(e, "viral-videos")}
            className="text-sm text-neutral-700 dark:text-neutral-200 hover:text-black dark:hover:text-white transition-colors"
          >
            Viral Videos
          </a>
          <a
            href="#timeline"
            onClick={(e) => handleScroll(e, "timeline")}
            className="text-sm text-neutral-700 dark:text-neutral-200 hover:text-black dark:hover:text-white transition-colors"
          >
            Journey
          </a>
          <a
            href="#courses"
            onClick={(e) => handleScroll(e, "courses")}
            className="text-sm text-neutral-700 dark:text-neutral-200 hover:text-black dark:hover:text-white transition-colors"
          >
            Courses
          </a>
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, "contact")}
            className="text-sm text-neutral-700 dark:text-neutral-200 hover:text-black dark:hover:text-white transition-colors"
          >
            Contact
          </a>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Menu Button and Theme Toggle */}
        <div className="md:hidden flex items-center justify-between px-4 py-2">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-800 dark:text-gray-200 p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-gray-800 dark:text-gray-200 p-2"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 py-2 bg-white dark:bg-black rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-lg">
            <a
              href="#hero"
              onClick={(e) => handleScroll(e, "hero")}
              className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              Home
            </a>
            <a
              href="#what-i-do"
              onClick={(e) => handleScroll(e, "what-i-do")}
              className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              What I Do
            </a>
            <a
              href="#viral-videos"
              onClick={(e) => handleScroll(e, "viral-videos")}
              className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              Viral Videos
            </a>
            <a
              href="#timeline"
              onClick={(e) => handleScroll(e, "timeline")}
              className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              Journey
            </a>
            <a
              href="#courses"
              onClick={(e) => handleScroll(e, "courses")}
              className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              Courses
            </a>
            <a
              href="#contact"
              onClick={(e) => handleScroll(e, "contact")}
              className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              Contact
            </a>
          </div>
        )}
      </nav>
    </div>
  );
}
