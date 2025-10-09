"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useSongsPlayed } from "./providers/SongsPlayedProvider";

import { Card, CardContent } from "@/components/ui/card";

import PianoUI from "@/components/ui/piano";
import Navbar from "@/components/Navbar";
import StaticNavbar from "@/components/StaticNavbar";

import HomeSection from "./sections/homeSection";
import StaticHomeSection from "./sections/homeSectionStatic";
import WaveText from "@/components/WaveText";
import SkillsCard from "@/components/SkillsCard";
import ContactMe from "./sections/ContactMeSection";

import ZeldaCard from "./PianoCards/Zelda";
import WallaceCard from "./PianoCards/Wallace";
import MarioCard from "./PianoCards/Mario";
import ChocoboCard from "./PianoCards/Chocobo";
import EntertainerCard from "./PianoCards/Entertainer";
import LockedCard from "./PianoCards/LockedCard";
import { FcRotateToLandscape } from "react-icons/fc";

export default function Home() {
  const { played } = useSongsPlayed();
  const { resolvedTheme, setTheme } = useTheme();

  // ---- mount gate to avoid SSR/CSR flicker ----
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // ---- snapshot whether song1 was already true on first client render ----
  const unlockedOnMountRef = useRef(played.song1);

  // Track if we unlocked during this session (false -> true after mount)
  const [didUnlockThisSession, setDidUnlockThisSession] = useState(false);
  const prevSong1Ref = useRef(played.song1);
  useEffect(() => {
    if (!prevSong1Ref.current && played.song1) {
      setDidUnlockThisSession(true);
    }
    prevSong1Ref.current = played.song1;
  }, [played.song1]);

  // Convenience flags
  const isUnlocked = played.song1;
  const unlockedFromStorage =
    isUnlocked && unlockedOnMountRef.current && !didUnlockThisSession;
  const unlockedJustNow = isUnlocked && didUnlockThisSession;

  const song2Played = played.song2;
  const song3Played = played.song3;
  const song4Played = played.song4;
  const song5Played = played.song5;

  // Keep your scroll-to-id behavior
  useEffect(() => {
    const id = sessionStorage.getItem("scrollTarget");
    if (id) {
      sessionStorage.removeItem("scrollTarget");
      const el = document.getElementById(id);
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.replaceState(null, "", "/");
        });
      }
    }
  }, []);

  // ---- Theme toggle via avatar (top-right) ----
  const isDark = resolvedTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";
  const handleToggleTheme = () => setTheme(nextTheme);

  // ✅ early return AFTER all hooks
  if (!mounted) return null;

  return (
    <>
      <div className="flex-col justify-center">
        {/* HEADER AREA (render only when unlocked) */}
        {isUnlocked && (
          <div>
            {unlockedFromStorage ? <StaticNavbar /> : <Navbar />}

            <section id="home">
              {unlockedFromStorage ? (
                <StaticHomeSection />
              ) : (
                <HomeSection expanded={isUnlocked} />
              )}
            </section>
          </div>
        )}

        {/* PIANO SECTION */}
        <section
          id="piano"
          className="w-full h-fit flex flex-col justify-center items-center mt-32"
        >
          <Card className="h-fit w-fit">
            <CardContent className="w-fit h-fit">
              <p className="flex [@media(min-width:700px)]:hidden">
                Rotate your device to landscape mode!
              </p>
              <FcRotateToLandscape size={48} className="text-center w-full [@media(min-width:700px)]:hidden"/>
              <div className="hidden [@media(min-width:700px)]:block">
                <PianoUI />
              </div>
            </CardContent>
          </Card>

          {!isUnlocked && (
            <WaveText className="mt-16 text-4xl space-x-4" text={"G A B C#"} />
          )}

          {/* CARDS GRID */}
          {isUnlocked && (
            <div className="mx-auto w-full mt-16 md:max-w-6xl flex flex-row flex-wrap items-stretch content-start justify-center gap-6">
              {isUnlocked ? (
                <ZeldaCard />
              ) : (
                <LockedCard />
              )}

              {song2Played ? (
                <WallaceCard />
              ) : (
                <LockedCard clue={'My "Lightbulb" moment!'} />
              )}

              {song3Played ? (
                <MarioCard />
              ) : (
                <LockedCard clue={"Something you should know about me, I like games!"} />
              )}

              {song4Played ? (
                <ChocoboCard />
              ) : (
                <LockedCard clue={"Try very hard to be mean :("} />
              )}

              {song5Played ? (
                <EntertainerCard />
              ) : (
                <LockedCard clue={"this website is one of my projects!"} />
              )}
            </div>
          )}
        </section>

        {/* SKILLS + CONTACT */}
        {isUnlocked && (
          <div>
            <section
              id="skills"
              className="w-full mt-16 flex flex-row flex-wrap items-stretch justify-center gap-6"
            >
              <SkillsCard title="Core Web" items={["HTML5", "CSS", "Typescript", "TailwindCSS"]} />
              <SkillsCard title="Languages" items={["JavaScript", "Python", "C#", "Lua"]} />
              <SkillsCard title="Front-End Frameworks" items={["React", "Vue.js", "Angular"]} />
              <SkillsCard title="Full-Stack" items={["Next.js", "ASP.NET Core MVC", "Node.js", "RESTful APIs"]} />
              <SkillsCard title="Back-End & ORMs" items={["Express.js", ".NET", "Prisma", "Entity Framework"]} />
              <SkillsCard title="Databases & Data Platforms" items={["MySQL", "MongoDB", "Supabase"]} />
              <SkillsCard title="Tools & Platforms" items={["GitHub", "Git Bash", "VS Code", "Postman", "Vercel", "Unity"]} />
            </section>

            <section id="contact" className="w-full mt-16">
              <ContactMe />
            </section>
          </div>
        )}
      </div>
    </>
  );
}
