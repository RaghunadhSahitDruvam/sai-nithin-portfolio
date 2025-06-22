"use client";

import React from "react";
import Carousel from "./carousel";
import { Youtube, Instagram, Award, Star } from "lucide-react";

export default function AchievementsSection() {
  const achievementsData = [
    {
      title: "10K+ YouTube Subscribers",
      description:
        "Growing community of tech enthusiasts learning and building together",
      button: "Visit Channel",
      src: "/images/youtube-achievement.jpg",
      icon: <Youtube className="w-12 h-12 text-red-500" />,
    },
    {
      title: "5K+ Instagram Followers",
      description:
        "Sharing daily tech tips and insights with a growing audience",
      button: "Follow Me",
      src: "/images/instagram-achievement.jpg",
      icon: <Instagram className="w-12 h-12 text-pink-500" />,
    },
    {
      title: "Featured on Dev Community",
      description: "Recognized for contributions to the developer community",
      button: "Read More",
      src: "/images/featured-achievement.jpg",
      icon: <Award className="w-12 h-12 text-yellow-500" />,
    },
    {
      title: "Top Tech Educator",
      description: "Making complex tech concepts simple and accessible",
      button: "Learn More",
      src: "/images/educator-achievement.jpg",
      icon: <Star className="w-12 h-12 text-blue-500" />,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black relative">
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />

      <div className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-700 dark:text-slate-300 mb-4">
            Achievements
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
            Milestones and recognition in the tech community
          </p>
        </div>

        <div className="relative overflow-hidden w-full h-full">
          <Carousel slides={achievementsData} />
        </div>
      </div>
    </section>
  );
}
