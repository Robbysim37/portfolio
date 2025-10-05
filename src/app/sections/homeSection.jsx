"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function HomeSection() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="mx-auto flex w-full h-[90vh] flex-col items-center justify-center gap-10 px-6 py-20 text-center">
      {/* Avatar */}
      <motion.div
        whileHover={{
          scale: 1.2,
          boxShadow: "0 0 40px 10px var(--primary)",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 18 }}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="relative isolate h-[280px] w-[280px] cursor-pointer rounded-full p-[4px]
                   bg-gradient-to-b from-[var(--primary)]/30 to-[var(--secondary)]/20
                   hover:brightness-110"
        title="Toggle light/dark mode"
      >
        <div className="relative flex h-full w-full items-center justify-center rounded-full bg-[var(--card)]">
          <Image
            src="/avatar-nicholas.jpg" // replace with your image
            alt="Robert Lewis Lightbulb"
            fill
            sizes="320px"
            className="rounded-full object-cover"
            priority
          />
        </div>
      </motion.div>

      {/* Text */}
      <div>
        <h1 className="text-4xl font-bold text-[var(--foreground)]">Robert Lewis</h1>
        <p className="mt-6 text-[var(--accent-foreground)]/80">Professionally fun.</p>
      </div>
    </div>
  );
}
