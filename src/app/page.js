"use client"



import { useEffect } from "react";
import Unlocked from "./pageStates/Unlocked";
import Locked from "./pageStates/Locked";

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
    <Locked/>
  );
}
