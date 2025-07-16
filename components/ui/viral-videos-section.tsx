"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Play, Eye, Calendar } from "lucide-react";
import Link from "next/link";

export default function ViralVideosSection() {
  const viralVideos = [
    {
      id: 1,
      title: "5 Crazy Tips & Tricks – చూసినోడికి చేసినంత",
      views: "735K",
      publishedAgo: "3.1 years ago",
      link: "https://www.youtube.com/watch?v=zd2jRRIrYO4",
      thumbnail: `https://img.youtube.com/vi/zd2jRRIrYO4/maxresdefault.jpg`,
    },
    {
      id: 2,
      title:
        "How to Translate Any Video into Any Language – Dub Any Video in 2 Minutes",
      views: "500K+",
      publishedAgo: "5.1 years ago",
      link: "https://www.youtube.com/watch?v=yL17uK2mhe0",
      thumbnail: `https://img.youtube.com/vi/yL17uK2mhe0/maxresdefault.jpg`,
    },
    {
      id: 3,
      title:
        "100% Confirm Tatkal Ticket in Telugu – How to Book Tatkal Tickets in 5 Seconds",
      views: "400K+",
      publishedAgo: "7.8 years ago",
      link: "https://www.youtube.com/watch?v=0ZXEMZTlkMA",
      thumbnail: `https://img.youtube.com/vi/0ZXEMZTlkMA/maxresdefault.jpg`,
    },
    {
      id: 4,
      title: "Good Income Work from Home with Amazon",
      views: "350K+",
      publishedAgo: "6.0 years ago",
      link: "https://www.youtube.com/watch?v=2kT8hXyAI38",
      thumbnail: `https://img.youtube.com/vi/2kT8hXyAI38/maxresdefault.jpg`,
    },
    {
      id: 5,
      title: "గూగుల్లో ఇవి చేయకూడదు – Don't Do This on Google",
      views: "300K+",
      publishedAgo: "6.0 years ago",
      link: "https://www.youtube.com/watch?v=sBtwSqs6_40",
      thumbnail: `https://img.youtube.com/vi/sBtwSqs6_40/maxresdefault.jpg`,
    },
    {
      id: 6,
      title: "Reason Phone Battery Drains Fast – Sai Nithin in Telugu",
      views: "846K",
      publishedAgo: "6.0 years ago",
      link: "https://www.youtube.com/watch?v=pohAF3G9Piw",
      thumbnail: `https://img.youtube.com/vi/pohAF3G9Piw/maxresdefault.jpg`,
    },
  ];

  return (
    <section className="py-1  relative bg-white dark:bg-black">
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
        <div className="text-center mb-5 md:mb-5">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-500 mb-3 md:mb-4">
            Viral Videos
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-sm md:text-base px-4">
            Discover the most popular tech content that has captivated millions
            of viewers
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {viralVideos.map((video) => (
            <CardContainer key={video.id} className="">
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-[200px] md:h-[300px] rounded-xl p-1 md:p-1 border">
                {/* Video Thumbnail */}
                <CardItem translateZ="50" className="w-full mb-4">
                  <Link
                    href={video.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="relative w-full h-40 md:h-48 rounded-xl overflow-hidden bg-gradient-to-br from-purple-500 to-blue-500">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder-video.svg";
                        }}
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                        <div className="bg-red-600 rounded-full p-3">
                          <Play className="w-6 h-6 text-white fill-white" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </CardItem>

                {/* Video Title */}
                <CardItem
                  translateZ="60"
                  className="text-base md:text-lg font-bold text-neutral-800 dark:text-white mb-2 md:mb-3 line-clamp-2"
                >
                  {video.title}
                </CardItem>

                {/* Video Stats */}
                <CardItem
                  translateZ="40"
                  className="flex items-center justify-between text-xs md:text-sm text-neutral-600 dark:text-neutral-400 mb-3 md:mb-4"
                >
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{video.views} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{video.publishedAgo}</span>
                  </div>
                </CardItem>

                {/* Watch Button */}
                <CardItem translateZ="80" className="w-full">
                  <a
                    href={video.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 w-full"
                  >
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-1 text-sm font-medium text-white backdrop-blur-3xl gap-2">
                      <Play className="w-4 h-4" />
                      Watch Now
                    </span>
                  </a>
                </CardItem>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>
    </section>
  );
}
