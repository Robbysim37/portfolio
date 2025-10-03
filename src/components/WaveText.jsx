"use client";

import { motion } from "framer-motion";

export default function WaveText({
  text,
  delay = 0.1,
  duration = 1.5,
  className = "text-foreground font-sans",
  letterClassName = "",
}) {
  // Group words/letters by spaces — e.g. "G A B C#" → ["G", "A", "B", "C#"]
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
