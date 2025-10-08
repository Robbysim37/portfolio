import * as React from "react";
import { cn } from "@/lib/utils";

/* ---------------- Base Card ---------------- */
function Card({ className, ...props }) {
  return (
    <div
      data-slot="card"
      className={cn(
        // increased rounding from xl → 3xl
        "bg-card text-card-foreground flex flex-col gap-6 rounded-3xl border py-6 shadow-sm transition-all duration-500",
        // glow + hover scale effect
        "hover:shadow-[0_0_40px_6px_var(--primary)] hover:scale-[1.02]",
        className
      )}
      {...props}
    />
  );
}

/* ---------------- Header ---------------- */
function CardHeader({ className, ...props }) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  );
}

/* ---------------- Title ---------------- */
function CardTitle({ className, ...props }) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "leading-none font-semibold text-[var(--primary)] transition-colors duration-300",
        className
      )}
      {...props}
    />
  );
}

/* ---------------- Description ---------------- */
function CardDescription({ className, ...props }) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

/* ---------------- Action ---------------- */
function CardAction({ className, ...props }) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

/* ---------------- Content ---------------- */
function CardContent({ className, ...props }) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 transition-colors duration-300", className)}
      {...props}
    />
  );
}

/* ---------------- Footer ---------------- */
function CardFooter({ className, ...props }) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

/* ---------------- Export ---------------- */
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
