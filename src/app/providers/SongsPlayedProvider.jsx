"use client";

import { createContext, useContext, useMemo, useState, useCallback } from "react";

const SongsPlayedContext = createContext(null);

export function SongsPlayedProvider({ children }) {
  const [played, setPlayed] = useState({
    song1: false,
    song2: false,
    song3: false,
    song4: false,
    song5: false,
  });

  const setSongPlayed = useCallback((key, value) => {
    setPlayed((prev) => ({ ...prev, [key]: Boolean(value) }));
  }, []);

  const markDone = useCallback((key) => {
    setPlayed((prev) => ({ ...prev, [key]: true }));
    console.log(key + " has been played")
  }, []);

  const resetAll = useCallback(() => {
    setPlayed({ song1: false, song2: false, song3: false, song4: false, song5: false });
  }, []);

  const value = useMemo(
    () => ({
      played,                 // { song1, song2, ... }
      setSongPlayed,          // (key, bool)
      markDone,               // (key) -> true
      resetAll,               // reset all to false
    }),
    [played, setSongPlayed, markDone, resetAll]
  );

  return (
    <SongsPlayedContext.Provider value={value}>
      {children}
    </SongsPlayedContext.Provider>
  );
}

export function useSongsPlayed() {
  const ctx = useContext(SongsPlayedContext);
  if (!ctx) throw new Error("useSongsPlayed must be used within <SongsPlayedProvider>");
  return ctx;
}
