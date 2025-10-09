"use client";

import { createContext, useContext, useMemo, useState, useCallback, useEffect } from "react";

const SongsPlayedContext = createContext(null);

const STORAGE_KEY = "songsPlayed:v1";
const DEFAULT_STATE = {
  song1: false,
  song2: false,
  song3: false,
  song4: false,
  song5: false,
};

// Small validator to guard against malformed storage
function normalize(obj) {
  if (!obj || typeof obj !== "object") return { ...DEFAULT_STATE };
  const out = { ...DEFAULT_STATE };
  for (const k of Object.keys(out)) out[k] = Boolean(obj[k]);
  return out;
}

export function SongsPlayedProvider({ children }) {
  // Lazy-init from localStorage (client only)
  const [played, setPlayed] = useState(() => {
    if (typeof window === "undefined") return { ...DEFAULT_STATE };
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? normalize(JSON.parse(raw)) : { ...DEFAULT_STATE };
    } catch {
      return { ...DEFAULT_STATE };
    }
  });

  // Persist on change
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(played));
    } catch {
      // ignore write errors (e.g., private mode quota)
    }
  }, [played]);

  // Cross-tab sync (optional but nice)
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setPlayed(normalize(JSON.parse(e.newValue)));
        } catch {
          /* noop */
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setSongPlayed = useCallback((key, value) => {
    setPlayed((prev) => ({ ...prev, [key]: Boolean(value) }));
  }, []);

  const markDone = useCallback((key) => {
    setPlayed((prev) => ({ ...prev, [key]: true }));
    console.log(`${key} has been played`);
  }, []);

  const resetAll = useCallback(() => {
    setPlayed({ ...DEFAULT_STATE });
  }, []);

  const value = useMemo(
    () => ({
      played,          // { song1, song2, ... }
      setSongPlayed,   // (key, bool)
      markDone,        // (key) -> true
      resetAll,        // reset all to false
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
