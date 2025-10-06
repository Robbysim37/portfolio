"use client";

import { motion } from "framer-motion";

export default function ExpandingSection({ expanded = false }) {
  return (
    <motion.div
      initial={{ height: "0vh", opacity: 0 }}
      animate={{
        height: expanded ? "100vh" : "0vh",
        opacity: expanded ? 1 : 0,
      }}
      transition={{
        duration: 12, // adjust as needed
        ease: "easeInOut",
      }}
      className="w-full overflow-hidden bg-[var(--card)] flex flex-col items-center justify-center text-center"
    >
      <h1 className="text-6xl font-bold text-[var(--foreground)]">
        Expanding Section
      </h1>
      <p className="mt-4 text-2xl text-[var(--accent-foreground)]/80">
        Controlled externally by a boolean prop.
      </p>
    </motion.div>
  );
}
