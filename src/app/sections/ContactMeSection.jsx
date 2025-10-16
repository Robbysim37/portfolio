"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import WaveText from "@/components/WaveText";
import WordCycler from "@/components/WordCycler";

export const openEmail = () => {
  window.open("https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=Robbysim37@gmail.com");
};

export const downloadResume = () => {
  // Put RobertLewisResume.pdf in /public
  const link = document.createElement("a");
  link.download = "Robert Lewis Resume";
  link.href = "/RobertLewisResume.pdf";
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export default function ContactMe() {
  const sectionRef = useRef(null);
  const jumperRef = useRef(null);
  const cooldownRef = useRef(false);

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hits, setHits] = useState(0);

  // ---- detect "mobile view" (small screen + no hover capability) ----
  const [isMobileView, setIsMobileView] = useState(false);
  useEffect(() => {
    const mqHoverNone = window.matchMedia("(hover: none)");
    const mqMaxWidth = window.matchMedia("(max-width: 768px)");

    const update = () => setIsMobileView(mqHoverNone.matches && mqMaxWidth.matches);
    update();

    mqHoverNone.addEventListener?.("change", update);
    mqMaxWidth.addEventListener?.("change", update);
    return () => {
      mqHoverNone.removeEventListener?.("change", update);
      mqMaxWidth.removeEventListener?.("change", update);
    };
  }, []);

  // Compute random offsets, but restrict by 75 px padding per side
  const pickRandomOffsets = () => {
    const container = sectionRef.current;
    const jumper = jumperRef.current;
    if (!container || !jumper) return { x: 0, y: 0 };

    const edgeBuffer = 75;
    const padding = 8;
    const cRect = container.getBoundingClientRect();
    const jRect = jumper.getBoundingClientRect();

    const usableWidth = Math.max(0, cRect.width - jRect.width - edgeBuffer * 2 - padding * 2);
    const usableHeight = Math.max(0, cRect.height - jRect.height - edgeBuffer * 2 - padding * 2);

    const x = Math.random() * usableWidth - usableWidth / 2;
    const y = Math.random() * usableHeight - usableHeight / 2;

    return { x: Math.round(x), y: Math.round(y) };
  };

  const nextRandom = () => setPos(pickRandomOffsets());

  const handleHoverStart = () => {
    if (cooldownRef.current) return;
    cooldownRef.current = true;
    nextRandom();
    setTimeout(() => (cooldownRef.current = false), 150);
  };

  // NEW: on mobile view, clicking the red button also triggers the jump
  const handleDenyClick = () => {
    if (isMobileView) handleHoverStart(); // jump on tap (mobile only)
    setHits((n) => n + 1);
  };

  // start centered; recenter on resize
  useLayoutEffect(() => {
    const id = requestAnimationFrame(() => setPos({ x: 0, y: 0 }));
    const onResize = () => setPos({ x: 0, y: 0 });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100vh] overflow-hidden bg-transparent"
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
        <h2 className="text-3xl md:text-6xl font-semibold tracking-wide">
          LET&apos;S&nbsp;
          <WordCycler
            className="text-3xl md:text-6xl font-bold text-primary"
            words={["WORK", "BUILD", "PLAY"]}
            interval={2000}
            duration={0.4}
            pauseOnHover
          />
          &nbsp;TOGETHER
        </h2>

        <Button onClick={openEmail} size="lg">Email me!</Button>
        <Button onClick={downloadResume} size="lg">Resume</Button>

        {/* Jumper wrapper */}
        <motion.div
          ref={jumperRef}
          className="w-fit mx-auto z-20 flex flex-col items-center gap-2"
          animate={{ x: pos.x, y: pos.y }}
          transition={{ type: "spring", stiffness: 420, damping: 24, delay: 0.075 }}
          onHoverStart={handleHoverStart}            // desktop "hover to jump"
          whileHover={{ scale: 1.03 }}
        >
          <Button
            size="lg"
            variant="destructive"
            onClick={handleDenyClick}                // mobile "tap to jump"
          >
            I don&apos;t want to work with you!
          </Button>

          {/* Counter text (hidden at 0). Once hits >= 5, swap to WaveText */}
          {hits >= 5 ? (
            <WaveText
              text="D B G E D B G B G B"
              className="text-xl font-semibold text-primary"
              delay={0.08}
              duration={1.2}
              flagKey={"song4Wave"}
            />
          ) : (
            hits > 0 && (
              <p className="text-sm text-muted-foreground select-none">
                You clicked me {hits}/5 times!
              </p>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
