"use client"

import { useEffect,useState } from "react";
import Navbar from "@/components/Navbar";
import Unlocked from "./pageStates/Unlocked";
import Locked from "./pageStates/Locked";
import { Button } from "@/components/ui/button";

export default function Home() {

  const [locked,setLocked] = useState(true)

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
      <Navbar />
      <Unlocked/>
      
    </>
  );
}
