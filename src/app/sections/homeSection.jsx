"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function HomeSection({ expanded = false }) {
  const { theme, setTheme } = useTheme();

  // Custom easing: very fast start, long slow-down tail
  const drawnOutEase = [0.11, 0.9, 0.25, 1];

  return (
    <motion.div
      initial={{ height: "0vh" }}
      animate={{ height: expanded ? "100vh" : "0vh" }}
      transition={{
        duration: 15, // a bit longer for that lingering ease-out
        ease: drawnOutEase,
      }}
      className="w-full overflow-hidden flex items-center justify-center px-6 py-20 text-center bg-[var(--background)]"
    >
      {/* Inner wrapper scales with the container */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: expanded ? 1 : 0 }}
        transition={{
          duration: 15,
          ease: drawnOutEase,
        }}
        className="origin-top transform-gpu will-change-transform flex flex-col items-center justify-center gap-10 w-full"
      >
        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.2, boxShadow: "0 0 40px 10px var(--primary)" }}
          transition={{ type: "spring", stiffness: 250, damping: 18 }}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="relative isolate h-[280px] w-[280px] cursor-pointer rounded-full p-[4px]
                     bg-gradient-to-b from-[var(--primary)]/30 to-[var(--secondary)]/20
                     hover:brightness-110 mx-auto"
          title="Toggle light/dark mode"
        >
          <div className="relative flex h-full w-full items-center justify-center rounded-full bg-[var(--card)]">
            <Image
              src="/test.png"
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
          <h1 className="text-8xl font-bold text-[var(--foreground)]">Robert Lewis</h1>
          <p className="mt-6 text-5xl text-[var(--accent-foreground)]/80">
            Professionally fun.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
