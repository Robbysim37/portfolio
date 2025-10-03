"use client"

import { Card, CardContent } from "@/components/ui/card";
import Playground from "./playground";
import PianoUI from "@/components/ui/piano";

import { useEffect } from "react";

export default function Home() {

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
    <div className="flex-col justify-center">
      
      {/* <Playground/> */}

      <section id="home" className="min-h-screen bg-red-500">
        <div className="h-16 w-full invisible" aria-hidden="true" />
      </section>
      <section id="piano" className="w-full h-[100vh] bg-blue-500 flex justify-center">
        <Card className={"w-fit h-fit"}>
          <CardContent className={"w-fit h-fit"}>
            <p className="flex [@media(min-width:700px)]:hidden">This is where the piano would go</p>

            <div className="hidden [@media(min-width:700px)]:block">
              <PianoUI/>
            </div>
          </CardContent>
      </Card>
      </section>
      <section id="skills" className="w-full h-[100vh] bg-green-500"></section>
      <section id="contact" className="w-full h-[100vh] bg-yellow-500"></section>
    </div>
  );
}
