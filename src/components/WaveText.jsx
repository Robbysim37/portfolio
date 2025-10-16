"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useSongsPlayed } from "@/app/providers/SongsPlayedProvider"; // adjust path if needed

export default function WaveText({
  text,
  delay = 0.1,
  duration = 1.5,
  className = "text-foreground font-sans",
  letterClassName = "",
  /** NEW: which provider key to flip when rendered, e.g. "song1Wave" */
  flagKey, // string | undefined
}) {
  const { markDone } = useSongsPlayed();

  // ✅ Mark as done automatically when rendered
  useEffect(() => {
    if (flagKey) {
      markDone(flagKey);
      // optional: console.log(`WaveText rendered -> ${flagKey} set to true`);
    }
  }, [flagKey, markDone]);

  // Split text into groups (e.g., "G A B C#" → ["G", "A", "B", "C#"])
  const groups = text.split(" ");

  return (
    <div className={`flex gap-2 ${className}`}>
      {groups.map((group, i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -10, 0] }}
          transition={{
            repeat: Infinity,
            duration,
            ease: "easeInOut",
            delay: i * delay,
          }}
          className={`inline-block ${letterClassName}`}
        >
          {group}
        </motion.span>
      ))}
    </div>
  );
}
