"use client";

import { cn } from "@/lib/utils";
import {
  Radio,
  Smartphone,
  Timer,
  MessageCircle,
  Share2,
  Brain,
} from "lucide-react";

export default function WhatIDoSection() {
  const features = [
    {
      title: "🎧 Daily Telugu Tech News",
      description:
        "Latest app launches, gadget trends, tech policies & industry news—explained clearly in Telugu.",
      icon: <Radio className="w-8 h-8 text-red-500 dark:text-red-400" />,
    },
    {
      title: "📱 Gadget & App Reviews",
      description:
        "In-depth reviews of smartphones, gadgets, and apps—highlighting pros, cons, and real value.",
      icon: <Smartphone className="w-8 h-8 text-blue-500 dark:text-blue-400" />,
    },
    {
      title: "⏱ One‑Minute Tech Bytes",
      description:
        "Quick, punchy tech explainers—perfect for on-the-go viewers who want fast insights.",
      icon: <Timer className="w-8 h-8 text-green-500 dark:text-green-400" />,
    },
    {
      title: "💬 Comment Reaction Videos",
      description:
        "Interactive videos featuring and responding to viewer comments.",
      icon: (
        <MessageCircle className="w-8 h-8 text-purple-500 dark:text-purple-400" />
      ),
    },
    {
      title: "🌐 Multi‑Platform Reach",
      description:
        "Tailored tech content across YouTube, Instagram Reels, Telegram, Facebook, and more.",
      icon: <Share2 className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />,
    },
    {
      title: "💡 AI & Earning Guides",
      description:
        "Explores how to use AI tools (like ChatGPT) and tech hacks to earn money, stay safe online, and boost productivity.",
      icon: <Brain className="w-8 h-8 text-amber-500 dark:text-amber-400" />,
    },
  ];

  return (
    <section className="py-20 relative bg-white dark:bg-black">
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

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 mb-4">
            What I Do
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Creating engaging tech content across multiple platforms to educate,
            inform, and inspire
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 3) && "lg:border-l dark:border-neutral-800",
        index < 3 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
