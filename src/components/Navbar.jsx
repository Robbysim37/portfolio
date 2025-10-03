"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import useTrackScroll from "@/app/utils/trackScroll"; // custom hook
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const nav = [
  { label: "Home", href: "#home", type: "section", id: "home" },
  { label: "Piano", href: "#piano", type: "section", id: "piano" },
  { label: "Technical Skills", href: "#skills", type: "section", id: "skills" },
  { label: "Contact Me", href: "#contact", type: "section", id: "contact" },
  { label: "About me", href: "/about", type: "route" },
  { label: "Projects", href: "/projects", type: "route" },
];

function NavA({ href, children, isActive, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative px-3 py-2 text-lg font-medium transition-colors",
        isActive
          ? "text-primary after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-current after:content-['']"
          : "text-[#E0E1DD] hover:text-primary"
      )}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // avoid hydration flicker for active styles
  useEffect(() => setMounted(true), []);

  // always call hook; enable only on "/"
  const activeId = useTrackScroll(
    ["home", "piano", "skills", "contact"],
    100,
    pathname === "/"
  );

  // smooth-scroll section links; keep URL clean (no hash)
  const onSectionClick = (id, closeSheet) => (e) => {
    if (pathname === "/") {
      e.preventDefault();
      closeSheet?.();
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", "/");
      }
    } else {
      closeSheet?.();
      sessionStorage.setItem("scrollTarget", id); // Home page will scroll on mount
      // allow Link to navigate to "/"
    }
  };

  const renderLink = (item, closeSheet) => {
    if (item.type === "section") {
      const isActive = mounted && pathname === "/" && activeId === item.id;
      return (
        <NavA
          key={item.label}
          href="/" // always "/" so URL stays clean
          isActive={isActive}
          onClick={onSectionClick(item.id, closeSheet ? () => setOpen(false) : undefined)}
        >
          {item.label}
        </NavA>
      );
    }

    const isActive = pathname === item.href;
    return (
      <NavA
        key={item.label}
        href={item.href}
        isActive={isActive}
        onClick={closeSheet ? () => setOpen(false) : undefined}
      >
        {item.label}
      </NavA>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Avatar + Name (scrolls to #home without hash) */}
        <Link
          href="/"
          onClick={onSectionClick("home")}
          className="flex items-center gap-3"
        >
          <Avatar className="h-10 w-10 rounded-full">
            {/* <AvatarImage src="/logo.png" alt="Logo" /> */}
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold flex items-center justify-center">
              RL
            </AvatarFallback>
          </Avatar>
          <span className="font-semibold text-lg">Robert Lewis</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4">
          {nav.map((item) => renderLink(item))}
        </nav>

        {/* Mobile nav */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" aria-label="Open menu">
                ☰
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-4 flex flex-col gap-2">
                {nav.map((item) => (
                  <SheetClose asChild key={item.label}>
                    {renderLink(item, /* closeSheet */ true)}
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
