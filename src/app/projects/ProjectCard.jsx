"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import WaveText from "@/components/WaveText"; // 👈 import your wave text component

export default function ProjectCard({ title, imgURL, projectLink, description }) {
  return (
    <Link
      href={projectLink}
      target="_blank"
      rel="noopener noreferrer"
      className="block group focus:outline-none h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col">
        {/* Header Image */}
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

        {/* Title Below Image */}
        <div className="px-6 pt-4 pb-2">
          <CardTitle className="text-[#0a192f] dark:text-[var(--primary)] text-2xl md:text-3xl font-bold tracking-tight">
            {title}
          </CardTitle>
        </div>

        {/* Description + WaveText (conditionally for Portfolio card) */}
        <CardContent className="pt-2 flex-1 flex flex-col justify-between">
          <p className="text-sm text-muted-foreground leading-relaxed mb-2">
            {description}
          </p>

          {title === "Robert Lewis Portfolio Site" && (
            <div className="mt-auto pt-2">
              <WaveText
                text="D D# E C E C E C"
                className="text-[var(--primary)] font-semibold text-sm md:text-base"
                delay={0.12}
                duration={1.8}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
