// app/components/HomeSection.jsx
"use client";

import Image from "next/image";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import WaveText from "@/components/WaveText";

export default function StaticHomeSection() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Flip controls/state
  const controls = useAnimationControls();
  const swappedRef = useRef(false);

  // On mount (or theme restore), set correct face without enter transitions
  useEffect(() => {
    if (!mounted) return;
    controls.set({ rotateY: theme === "dark" ? 180 : 0 });
  }, [mounted, theme, controls]);

  async function handleFlip() {
    swappedRef.current = false;
    const target = theme === "light" ? 180 : 0; // flip to opposite face
    await controls.start({
      rotateY: target,
      transition: { duration: 0.6, ease: "easeInOut" },
    });
  }

  return (
    // 🔒 Removed the height/expand animation — this wrapper is now static
    <div className="w-full min-h-[100vh] flex items-center justify-center px-6 py-20 text-center bg-[var(--background)]">
      {/* 🔒 Removed the inner scaleY enter animation — static content container */}
      <div className="flex flex-col items-center justify-center gap-10 w-full">
        {/* Avatar wrapper (click to flip) */}
        <motion.div
          whileHover={{ scale: 1.2, boxShadow: "0 0 40px 10px var(--primary)" }} // ✅ keep glow
          transition={{ type: "spring", stiffness: 250, damping: 18 }}
          onClick={handleFlip}
          className="relative isolate h-[280px] w-[280px] cursor-pointer rounded-full p-[4px]
                     bg-gradient-to-b from-[var(--primary)]/30 to-[var(--secondary)]/20
                     hover:brightness-110 mx-auto overflow-visible"
          title="Toggle light/dark mode"
          style={{ perspective: 1000 }}
        >
          {/* Flipper: FRONT = light avatar, BACK = dark avatar */}
          <motion.div
            className="relative h-full w-full rounded-full"
            style={{ transformStyle: "preserve-3d" }}
            animate={controls} // ✅ keep flip animation
            initial={{ rotateY: 0 }}
            onUpdate={(latest) => {
              const y = ((latest?.rotateY ?? 0) % 360 + 360) % 360;
              if (!swappedRef.current && y >= 90 && y < 270) {
                setTheme(theme === "dark" ? "light" : "dark");
                swappedRef.current = true;
              }
            }}
          >
            {/* FRONT face → LIGHT */}
            <div className="absolute inset-0 rounded-full overflow-hidden [backface-visibility:hidden]">
              {mounted && (
                <Image
                  src="/brightIdea.jpg"
                  alt="Robert Lewis Light (front)"
                  fill
                  sizes="320px"
                  className="rounded-full object-cover object-[50%_35%] [backface-visibility:hidden]"
                  priority
                />
              )}
            </div>

            {/* BACK face → DARK */}
            <div className="absolute inset-0 rounded-full overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden]">
              {mounted && (
                <Image
                  src="/thinking.jpg"
                  alt="Robert Lewis Dark (back)"
                  fill
                  sizes="320px"
                  className="rounded-full object-cover [backface-visibility:hidden]"
                  priority
                />
              )}
            </div>
          </motion.div>

          {/* WaveText drops out only in light mode */}
          <AnimatePresence mode="wait">
            {mounted && theme === "light" && (
              <motion.div
                key={`drop-${theme}`}
                className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+6px)] pointer-events-none"
                initial={{ y: -24, opacity: 0, rotate: -2, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
                exit={{ y: -12, opacity: 0, rotate: 2, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.7 }}
              >
                <WaveText
                  key={`wave-${theme}`}
                  text="C A# A C A# A C G"
                  delay={0.08}
                  duration={1.6}
                  className="whitespace-nowrap text-[var(--primary)] font-semibold text-sm md:text-base"
                  letterClassName="px-1"
                  flagKey={"song2Wave"}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Headline (static) */}
        <div>
          <h1 className="text-5xl md:text-8xl font-bold text-[var(--foreground)]">Robert Lewis</h1>
          <p className="mt-6 text-3xl md:text-5xl text-[var(--accent-foreground)]/80">Professionally fun.</p>
        </div>
      </div>
    </div>
  );
}
