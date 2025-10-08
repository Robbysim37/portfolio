// app/components/ProjectCard.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
          <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight">
            {title}
          </CardTitle>
        </div>

        {/* Description */}
        <CardContent className="pt-2 flex-1">
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
