"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "./3d-card";
import { Youtube, Instagram, Users } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="md:py-20 bg-dot-pattern relative">
      {/* Background decoration */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/70 via-transparent to-transparent dark:from-black/50"></div>

      <div className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-700 dark:text-slate-300 mb-4">
            What I Do
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
            Passionate about sharing knowledge and building a tech community
            through various platforms
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-5">
          {/* YouTube Card */}
          <CardContainer>
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white flex items-center gap-2"
              >
                <Youtube className="w-6 h-6 text-red-600" />
                YouTube Content Creator
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                Creating in-depth tech tutorials and project walkthroughs to
                help developers learn and grow
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <img
                  src="/images/youtube-banner.jpg"
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="YouTube Channel Banner"
                />
              </CardItem>
              <div className="flex justify-between items-center mt-10">
                <CardItem
                  translateZ={20}
                  as="a"
                  href="https://www.youtube.com/@sainithintech"
                  target="_blank"
                  className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    Visit Channel →
                  </span>
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>

          {/* Instagram Card */}
          <CardContainer>
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-purple-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white flex items-center gap-2"
              >
                <Instagram className="w-6 h-6 text-pink-600" />
                Instagram Tech Tips
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                Sharing quick tech tips, coding insights, and development best
                practices in bite-sized content
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <img
                  src="/images/instagram-banner.jpg"
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="Instagram Profile"
                />
              </CardItem>
              <div className="flex justify-between items-center mt-10">
                <CardItem
                  translateZ={20}
                  as="a"
                  href="https://www.instagram.com/sainithintech"
                  target="_blank"
                  className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    Follow Me →
                  </span>
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>

          {/* Community Card */}
          <CardContainer>
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-blue-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white flex items-center gap-2"
              >
                <Users className="w-6 h-6 text-blue-600" />
                Community Engagement
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                Building and nurturing a community of developers through active
                engagement and support
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <img
                  src="/images/community-banner.jpg"
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="Community Engagement"
                />
              </CardItem>
              <div className="flex justify-between items-center mt-10">
                <CardItem
                  translateZ={20}
                  as="button"
                  className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    Join Community →
                  </span>
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        </div>
      </div>
    </section>
  );
}
