"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export default function WordCycler({
  words,
  interval = 2000,
  duration = 0.5,
  className = "",
  initialIndex = 0,
  pauseOnHover = false,
}) {
  const [index, setIndex] = useState(
    Math.max(0, Math.min(initialIndex, words.length - 1))
  );
  const [paused, setPaused] = useState(false);
  const [maxWidth, setMaxWidth] = useState(null);
  const reduced = useReducedMotion();

  const measureRef = useRef(null);

  const safeWords = useMemo(
    () => (Array.isArray(words) && words.length > 0 ? words : [""]),
    [words]
  );
  const currentWord = safeWords[index];

  // measure the longest word once
  useEffect(() => {
    if (!measureRef.current) return;

    const temp = document.createElement("span");
    temp.style.visibility = "hidden";
    temp.style.position = "absolute";
    temp.style.whiteSpace = "nowrap";
    temp.style.font = getComputedStyle(measureRef.current).font;
    document.body.appendChild(temp);

    let longest = 0;
    for (const w of safeWords) {
      temp.textContent = w;
      longest = Math.max(longest, temp.offsetWidth);
    }

    document.body.removeChild(temp);
    setMaxWidth(longest);
  }, [safeWords]);

  useEffect(() => {
    if (reduced) return;
    if (paused && pauseOnHover) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % safeWords.length);
    }, interval);

    return () => clearInterval(id);
  }, [interval, reduced, pauseOnHover, paused, safeWords.length]);

  return (
    <span
  ref={measureRef}
  className={`relative inline-flex items-baseline align-baseline overflow-hidden leading-tight ${className}`}
  style={{ width: maxWidth ? `${maxWidth}px` : "auto" }}
  onMouseEnter={() => pauseOnHover && setPaused(true)}
  onMouseLeave={() => pauseOnHover && setPaused(false)}
  aria-live="polite"
  aria-atomic="true"
  role="status"
>
  {/* Invisible sizer keeps height stable */}
  <span className="invisible whitespace-nowrap select-none">
    {currentWord}
  </span>

  {/* Animated layer */}
  <span className="absolute inset-0 flex items-baseline justify-center">
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={currentWord}
        initial={reduced ? { y: 0, opacity: 1 } : { y: "-100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration } }}
        exit={
          reduced
            ? { y: 0, opacity: 0 }
            : { y: "100%", opacity: 0, transition: { duration } }
        }
        className="whitespace-nowrap"
      >
        {currentWord}
      </motion.span>
    </AnimatePresence>
  </span>
</span>

  );
}