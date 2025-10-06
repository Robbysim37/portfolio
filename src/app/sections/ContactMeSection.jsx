"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import WordCycler from "@/components/WordCycler";

export default function ContactMe() {
  const sectionRef = useRef(null);
  const jumperRef = useRef(null);
  const cooldownRef = useRef(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  // Compute random offsets, but restrict by 300 px padding per side
  const pickRandomOffsets = () => {
    const container = sectionRef.current;
    const jumper = jumperRef.current;
    if (!container || !jumper) return { x: 0, y: 0 };

    const edgeBuffer = 50; // ↓↓↓ new restriction zone ↓↓↓
    const padding = 8;
    const cRect = container.getBoundingClientRect();
    const jRect = jumper.getBoundingClientRect();

    // Reduce total available movement area
    const usableWidth = Math.max(0, cRect.width - jRect.width - edgeBuffer * 2 - padding * 2);
    const usableHeight = Math.max(0, cRect.height - jRect.height - edgeBuffer * 2 - padding * 2);

    // Random offset in [-usable/2, +usable/2]
    const x = (Math.random() * usableWidth - usableWidth / 2);
    const y = (Math.random() * usableHeight - usableHeight / 2);

    return { x: Math.round(x), y: Math.round(y) };
  };

  const nextRandom = () => setPos(pickRandomOffsets());

  const handleHoverStart = () => {
    if (cooldownRef.current) return;
    cooldownRef.current = true;
    nextRandom();
    setTimeout(() => (cooldownRef.current = false), 150);
  };

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
            <h2 className="text-36l font-semibold tracking-wide">
                LET&apos;S&nbsp;
            <WordCycler
            className="text-6xl font-bold text-primary"
            words={["WORK", "BUILD", "PLAY"]}
            interval={2000}
            duration={0.4}
            pauseOnHover
            />
                &nbsp;TOGETHER
            </h2>

        <Button size={"lg"}>Email me!</Button>
        <Button size={"lg"}>Resume</Button>

        <motion.div
          ref={jumperRef}
          className="w-fit mx-auto z-20"
          animate={{ x: pos.x, y: pos.y }}
          transition={{ type: "spring", stiffness: 420, damping: 24 }}
          onHoverStart={handleHoverStart}
          whileHover={{ scale: 1.03 }}
        >
          <Button size={"lg"} variant={"destructive"} onClick={()=>{console.log("Button hit")}}>
            I don&apos;t want to work with you!
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
