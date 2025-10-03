"use client";

import { useEffect, useState } from "react";

/**
 * ids: array of section IDs to watch, e.g. ["home","piano","skills","contact"]
 * offset: pixels from top that count as "active" (tune to your navbar height)
 */
export default function TrackScroll(ids, offset = 100) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        let current = "";
        for (const id of ids) {
          const el = document.getElementById(id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          // active if the top is above the offset and the bottom is below it
          if (rect.top <= offset && rect.bottom > offset) {
            current = id;
            break;
          }
        }
        setActiveId((prev) => (prev !== current ? current : prev));
        ticking = false;
      });
    };

    onScroll(); // set initial
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, offset]);

  return activeId;
}
