"use client"

import { useEffect } from "react";
import { useSongsPlayed } from "./providers/SongsPlayedProvider";
import { Card,CardContent } from "@/components/ui/card";
import PianoUI from "@/components/ui/piano";
import Navbar from "@/components/Navbar";
import HomeSection from "./sections/homeSection"
import WaveText from "@/components/WaveText";
import SkillsCard from "@/components/SkillsCard";
import ContactMe from "./sections/ContactMeSection";
import ZeldaCard from "./PianoCards/Zelda";
import WallaceCard from "./PianoCards/Wallace";
import MarioCard from "./PianoCards/Mario";
import ChocoboCard from "./PianoCards/Chocobo";
import EntertainerCard from "./PianoCards/Entertainer";
import LockedCard from "./PianoCards/LockedCard";

export default function Home() {

  const {played} = useSongsPlayed()

  const isUnlocked = played.song1
  const song2Played = played.song2
  const song3Played = played.song3
  const song4Played = played.song4
  const song5Played = played.song5

  // This useEffect prevents the navbar from displaying sections in the URL
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

  return (
    <>
      <div className="flex-col justify-center">

        {isUnlocked && 
          <div>
          <Navbar />
          <section id="home">
            <HomeSection expanded={isUnlocked}/>
          </section>
          </div>
        }

        <section id="piano" className="w-full h-fit flex flex-col justify-center items-center mt-16">
          <Card className={"h-fit w-fit"}>
            <CardContent className={"w-fit h-fit"}>
              <p className="flex [@media(min-width:700px)]:hidden">This is where the piano would go</p>

              <div className="hidden [@media(min-width:700px)]:block">
                <PianoUI/>
              </div>
            </CardContent>
          </Card>
          {!isUnlocked && <WaveText className="mt-16 text-4xl space-x-4" text={"G A B C#"}/>}
          {isUnlocked && <div className="mx-auto w-full mt-16 max-w-6xl flex flex-row flex-wrap items-stretch content-start justify-center gap-6">
            
            {isUnlocked ? <ZeldaCard/> : <LockedCard/>}
            {song2Played ? <WallaceCard/> : <LockedCard clue={'My "Lightbulb" moment!'}/>}
            {song3Played ? <MarioCard/> : <LockedCard clue={"I do like games..."}/>}
            {song4Played ? <ChocoboCard/> : <LockedCard clue={"Try very hard to be mean :("}/>}
            {song5Played ? <EntertainerCard/> : <LockedCard clue={"this website is one of my projects!"}/>}
            
          </div>}
        </section>

          {isUnlocked && <div>
          <section
            id="skills"
            className="
              w-full mt-16
              flex flex-row flex-wrap
              items-stretch justify-center
              gap-6
            "
          >
            <SkillsCard
              title="Core Web"
              items={["HTML5", "CSS","Typescript","TailwindCSS"]}
            />
            <SkillsCard
              title="Languages"
              items={["JavaScript", "Python", "C#", "Lua"]}
            />
            <SkillsCard
              title="Front-End Frameworks"
              items={["React", "Vue.js", "Angular"]}
            />
            <SkillsCard
              title="Full-Stack"
              items={["Next.js","ASP.NET Core MVC","Node.js", "RESTful APIs"]}
            />
            <SkillsCard
              title="Back-End & ORMs"
              items={["Express.js", ".NET", "Prisma", "Entity Framework"]}
            />
            <SkillsCard
              title="Databases & Data Platforms"
              items={["MySQL", "MongoDB", "Supabase"]}
            />
            <SkillsCard
              title="Tools & Platforms"
              items={["GitHub", "Git Bash", "VS Code", "Postman", "Vercel", "Unity"]}
            />
          </section>
          <section id="contact" className="w-full">
            <ContactMe/>
          </section>
          </div>}
      </div>
    </>
  );
}
