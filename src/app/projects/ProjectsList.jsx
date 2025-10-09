"use client";

import { useEffect, useRef } from "react";
import ProjectCard from "./ProjectCard";
import projectsArr from "../DATA/projects";

export default function ProjectsList() {
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const getCards = () => Array.from(grid.querySelectorAll('[data-slot="card"]'));

    const measureAndSet = () => {
      const cards = getCards();
      if (!cards.length) return;

      // Reset any previous min-heights before measuring
      cards.forEach((el) => (el.style.minHeight = "auto"));

      // Measure tallest
      let maxH = 0;
      for (const el of cards) {
        const h = el.getBoundingClientRect().height;
        if (h > maxH) maxH = h;
      }

      // Apply uniform min-height
      const px = Math.ceil(maxH) + "px";
      cards.forEach((el) => (el.style.minHeight = px));
    };

    // Re-measure on window resize
    const onResize = () => measureAndSet();
    window.addEventListener("resize", onResize);

    // Re-measure whenever any card’s content size changes
    const ro = new ResizeObserver(measureAndSet);
    getCards().forEach((el) => ro.observe(el));

    // Initial measure (a tiny delay helps after images/fonts paint)
    const t = setTimeout(measureAndSet, 0);

    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      clearTimeout(t);
    };
  }, []);

  return (
    <section id="projects" className="w-full py-12">
      <div className="mx-auto w-[90%] max-w-7xl flex flex-col items-center">
        <h2 className="w-full text-6xl font-bold tracking-tight mb-6 text-center md:text-left">
          Projects
        </h2>

        {/* Responsive Grid; cards will auto-stretch vertically, JS sets uniform min-height */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        >
          {projectsArr.map((proj) => (
            <ProjectCard
              key={proj.title}
              title={proj.title}
              imgURL={proj.imgURL}
              projectLink={proj.projectLink}
              description={proj.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
