"use client";

export default function SkillsCard({
  title = "Front-End",
  items = [
    "HTML5, CSS3, JS (ES6)",
    "jQuery",
    "React + Vite, MUI, Bootstrap",
    "Shopify Liquid",
    "Responsive & UX/UI Design",
  ],
}) {
  return (
    <div
      className="
        relative mx-auto w-full max-w-sm
        rounded-3xl border border-[var(--border)]/40
        bg-[var(--card)] text-[var(--card-foreground)]
        p-6 sm:p-7

        /* base lighting */
        shadow-[inset_0_1px_0_rgba(255,255,255,.05),0_18px_40px_-20px_rgba(0,0,0,.75)]

        /* smooth change */
        transition-shadow duration-500

        /* glow on hover (adds a third shadow layer) */
        hover:shadow-[inset_0_1px_0_rgba(255,255,255,.05),0_18px_40px_-20px_rgba(0,0,0,.75),0_0_44px_10px_var(--primary)]
      "
    >
      {/* subtle top highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-4 -top-1 h-8 rounded-full blur-xl opacity-60"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,.12), rgba(255,255,255,0))",
        }}
      />

      {/* title */}
      <h2
        className="mb-5 text-center text-3xl font-extrabold tracking-wide"
        style={{ color: "var(--primary)" }}
      >
        {title}
      </h2>

      {/* list */}
      <ul className="space-y-4 pl-5">
        {items.map((t, i) => (
          <li
            key={i}
            className="list-disc text-base leading-7 text-[var(--foreground)]/85"
          >
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
