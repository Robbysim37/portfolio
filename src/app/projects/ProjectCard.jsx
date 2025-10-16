"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import WaveText from "@/components/WaveText";

export default function ProjectCard({ title, imgURL, projectLink, description }) {
  // handle file download
  const handleDownload = (e) => {
    e.preventDefault(); // prevent normal link navigation
    const link = document.createElement("a");
    link.download = "boxDefender.xlsm"; // change filename if needed
    link.href = "/boxDefender.xlsm"; // make sure this file exists in your /public directory
    link.click();
    link.remove();
  };

  const isBoxDefender = title === "Box Defender Excel";
  const isPortfolio = title === "Robert Lewis Portfolio Site";

  return (
    <div
      // Conditionally attach click event
      onClick={isBoxDefender ? handleDownload : undefined}
      className={`block group focus:outline-none h-full ${
        isBoxDefender ? "cursor-pointer" : ""
      }`}
    >
      {/* Use Link only if it’s not the download project */}
      {isBoxDefender ? (
        <Card className="overflow-hidden h-full flex flex-col">
          <CardHeader className="relative flex justify-center items-center p-0 overflow-hidden">
            <div className="relative w-[calc(100%-1rem)] h-40 md:h-48 mx-auto rounded-2xl overflow-hidden">
              <Image
                src={imgURL}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={false}
              />
            </div>
          </CardHeader>

          <div className="px-6 pt-4 pb-2">
            <CardTitle className="text-[#0a192f] dark:text-[var(--primary)] text-2xl md:text-3xl font-bold tracking-tight">
              {title}
            </CardTitle>
          </div>

          <CardContent className="pt-2 flex-1 flex flex-col justify-between">
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              {description}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Link
          href={projectLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block group focus:outline-none h-full"
        >
          <Card className="overflow-hidden h-full flex flex-col">
            <CardHeader className="relative flex justify-center items-center p-0 overflow-hidden">
              <div className="relative w-[calc(100%-1rem)] h-40 md:h-48 mx-auto rounded-2xl overflow-hidden">
                <Image
                  src={imgURL}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={false}
                />
              </div>
            </CardHeader>

            <div className="px-6 pt-4 pb-2">
              <CardTitle className="text-[#0a192f] dark:text-[var(--primary)] text-2xl md:text-3xl font-bold tracking-tight">
                {title}
              </CardTitle>
            </div>

            <CardContent className="pt-2 flex-1 flex flex-col justify-between">
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                {description}
              </p>

              {isPortfolio && (
                <div className="mt-auto pt-2">
                  <WaveText
                    text="D D# E C E C E C"
                    className="text-[var(--primary)] font-semibold text-sm md:text-base"
                    delay={0.12}
                    duration={1.8}
                    flagKey={"song5Wave"}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </Link>
      )}
    </div>
  );
}