"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Piano, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import * as Tone from "tone";
import { Button } from "./button";
import { SONGS } from "@/app/utils/songs";
import { useSongsPlayed } from "../../app/providers/SongsPlayedProvider";

/* ================================
   Exact-note Unlock Sequences
   ================================ */
const SEQUENCES = [
  { key: "song1", seq: ["G4", "A4", "B4", "Db5"] },
  { key: "song2", seq: ["C5","A#4","A4","C5","A#4","A4","C5","G4"] },
  { key: "song3", seq: ["E5","E5","E5","C5","E5","G5","G4"] },
  { key: "song4", seq: ["D5","B4","G4","E4","D5","B4","G4","B4","G4","B4"] },
  { key: "song5", seq: ["D4","D#4","E4","C5","E4","C5","E4","C5"] },
];

const normalizePitch = (pc) => {
  if (pc === "Bb") return "A#";
  if (pc === "Cb") return "B";
  if (pc === "B#") return "C";
  if (pc === "Fb") return "E";
  if (pc === "E#") return "F";
  if (pc === "C#") return "Db";
  return pc;
};

const midiToPcOct = (midi) => {
  const note = Tone.Frequency(midi, "midi").toNote(); // e.g., "C#4"
  const rawPc = note.replace(/\d+/g, "");
  const pc = normalizePitch(rawPc);
  const oct = Number(note.match(/\d+/)?.[0] ?? 0);
  return { pc, oct, note: `${pc}${oct}` };
};

const SEQS_NORM = SEQUENCES.map((s) => ({
  key: s.key,
  seq: s.seq.map((step) => {
    const m = step.match(/^([A-G][b#]?)(\d+)$/);
    const pc = normalizePitch(m[1]);
    const oct = Number(m[2]);
    return `${pc}${oct}`;
  }),
}));

const durToSeconds = (dur) => Tone.Time(dur).toSeconds();
const songEndSeconds = (events) =>
  Math.max(...events.map((ev) => (ev.time ?? 0) + durToSeconds(ev.dur)));

/* ===== Helper: count white keys in [first, last] ===== */
const isWhiteMidi = (m) => {
  const pc = m % 12; // C=0
  return [0, 2, 4, 5, 7, 9, 11].includes(pc);
};
const countWhiteKeys = (firstMidi, lastMidi) => {
  let c = 0;
  for (let m = firstMidi; m <= lastMidi; m++) {
    if (isWhiteMidi(m)) c++;
  }
  return c;
};

export default function PianoUI() {
  const samplerRef = useRef(null);
  const partRef = useRef(null);
  const schedIdRef = useRef(null);

  const [started, setStarted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isAuto, setIsAuto] = useState(false);
  const [error, setError] = useState("");
  const [pianoKey, setPianoKey] = useState(0); // force-remount key

  const { markDone } = useSongsPlayed();

  // === Note range (ends at B5) ===
  const firstNote = MidiNumbers.fromNote("D4");
  const lastNote = MidiNumbers.fromNote("B5");

  // === Active keys UI ===
  const activeSetRef = useRef(new Set());
  const [activeNotes, setActiveNotes] = useState([]);
  const addActive = (midi) => {
    const s = activeSetRef.current;
    s.add(midi);
    setActiveNotes(Array.from(s));
  };
  const removeActive = (midi) => {
    const s = activeSetRef.current;
    s.delete(midi);
    setActiveNotes(Array.from(s));
  };

  /* ========= Responsive sizing: small mode when 700px–850px ========= */
  const [winW, setWinW] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const isSmall = winW >= 700 && winW <= 850;

  const WHITE_KEY_PX = isSmall ? 22 : 28;
  const whiteCount = useMemo(
    () => countWhiteKeys(firstNote, lastNote),
    [firstNote, lastNote]
  );
  const pianoWidth = useMemo(
    () => Math.max(whiteCount * WHITE_KEY_PX, isSmall ? 560 : 850),
    [whiteCount, WHITE_KEY_PX, isSmall]
  );

  /* ========= Audio init ========= */
  const initAudio = async () => {
    try {
      setError("");
      await Tone.start();
      await Tone.getContext().resume();

      if (!samplerRef.current) {
        const reverb = new Tone.Reverb({ decay: 2.5, wet: 0.15 }).toDestination();
        await reverb.generate();

        samplerRef.current = new Tone.Sampler({
          urls: {
            A1: "A1.mp3",
            C2: "C2.mp3",
            "D#2": "Ds2.mp3",
            "F#2": "Fs2.mp3",
            A2: "A2.mp3",
            C3: "C3.mp3",
            "D#3": "Ds3.mp3",
            "F#3": "Fs3.mp3",
            A3: "A3.mp3",
            C4: "C4.mp3",
            "D#4": "Ds4.mp3",
            "F#4": "Fs4.mp3",
            A4: "A4.mp3",
            C5: "C5.mp3",
            "D#5": "Ds5.mp3",
            "F#5": "Fs5.mp3",
            A5: "A5.mp3",
            C6: "C6.mp3",
            "D#6": "Ds6.mp3",
            "F#6": "Fs6.mp3",
          },
          release: 1.5,
          baseUrl: "https://tonejs.github.io/audio/salamander/",
          onload: () => setLoaded(true),
          onerror: (e) => setError(String(e || "Sampler load error")),
        }).connect(reverb);
      }

      await Tone.loaded();
      setLoaded(true);
      setStarted(true);
    } catch (e) {
      console.error(e);
      setError(String(e));
    }
  };

  /* ================================
     Exact-note sequence progress
     ================================ */
  const buildInitialProgressMap = () =>
    Object.fromEntries(SEQS_NORM.map((s) => [s.key, 0]));
  const progressMapRef = useRef(buildInitialProgressMap());

  const stepProgressAll = (midiNumber) => {
    const { note } = midiToPcOct(midiNumber);
    let winner = null;

    for (const { key, seq } of SEQS_NORM) {
      let idx = progressMapRef.current[key];
      const expected = seq[idx];

      if (note === expected) {
        idx += 1;
      } else if (note === seq[0]) {
        idx = 1;
      } else {
        idx = 0;
      }

      progressMapRef.current[key] = idx;
      if (idx >= seq.length && winner == null) winner = key;
    }

    if (winner) progressMapRef.current = buildInitialProgressMap();
    return winner;
  };

  /* ========= Helpers to end autoplay cleanly ========= */
  const dispatchGlobalMouseUp = () => {
    try {
      const ev = new MouseEvent("mouseup", { bubbles: true });
      window.dispatchEvent(ev);
      document.dispatchEvent(ev);
      document.body && document.body.dispatchEvent(ev);
    } catch {}
  };

  const finishAutoplayCleanup = () => {
    setIsAuto(false);
    activeSetRef.current.clear();
    setActiveNotes([]);
    // Force a re-mount of the Piano to reset internal mouse state
    setPianoKey((k) => k + 1);
    // Also broadcast a mouseup in case React-Piano's window listeners are stuck
    dispatchGlobalMouseUp();
  };

  /* ========= Autoplay ========= */
  const startAutoplayFor = (songKey) => {
    if (!started || !loaded || isAuto || !samplerRef.current) return;

    const events = SONGS[songKey];
    if (!events?.length) return;

    setIsAuto(true);
    markDone(songKey);

    // Clear any previous schedules
    if (schedIdRef.current !== null) {
      Tone.Transport.clear(schedIdRef.current);
      schedIdRef.current = null;
    }
    if (partRef.current) {
      partRef.current.dispose();
      partRef.current = null;
    }
    Tone.Transport.stop();
    Tone.Transport.position = 0;

    const startOffsetSec = 0.25;
    const endSec = songEndSeconds(events) + startOffsetSec;

    const part = new Tone.Part((time, ev) => {
      samplerRef.current.triggerAttackRelease(ev.note, ev.dur, time);
      const midi = Tone.Frequency(ev.note).toMidi();
      const durSec = Tone.Time(ev.dur).toSeconds();
      Tone.Draw.schedule(() => addActive(midi), time);
      Tone.Draw.schedule(() => removeActive(midi), time + durSec);
    }, events.map((ev) => [(ev.time ?? 0) + startOffsetSec, ev]));

    part.start(0);
    part.stop(endSec);
    partRef.current = part;

    schedIdRef.current = Tone.Transport.scheduleOnce(() => {
      if (partRef.current) {
        partRef.current.dispose();
        partRef.current = null;
      }
      if (schedIdRef.current !== null) {
        Tone.Transport.clear(schedIdRef.current);
        schedIdRef.current = null;
      }
      Tone.Transport.stop();
      finishAutoplayCleanup();
    }, endSec);

    Tone.Transport.start();
  };

  /* ========= Note handling ========= */
  const toNoteName = (midiNumber) => Tone.Frequency(midiNumber, "midi").toNote();
  const midiToPitchClass = (midi) =>
    Tone.Frequency(midi, "midi").toNote().replace(/\d+/g, "");
  const isBlackKey = (midi) => [1, 3, 6, 8, 10].includes(midi % 12);

  const handlePlayNote = (midiNumber) => {
    if (!started || !loaded || !samplerRef.current) return;
    if (isAuto) return; // ignore input during autoplay

    const noteName = toNoteName(midiNumber);
    samplerRef.current.triggerAttack(noteName, Tone.now());

    const matchedKey = stepProgressAll(midiNumber);
    if (matchedKey) startAutoplayFor(matchedKey);
  };

  const handleStopNote = (midiNumber) => {
    if (!started || !loaded || !samplerRef.current) return;
    if (isAuto) return; // ignore input during autoplay
    const noteName = toNoteName(midiNumber);
    samplerRef.current.triggerRelease(noteName, Tone.now());
  };

  /* ========= Cleanup ========= */
  useEffect(() => {
    return () => {
      if (schedIdRef.current !== null) {
        Tone.Transport.clear(schedIdRef.current);
        schedIdRef.current = null;
      }
      if (partRef.current) {
        partRef.current.dispose();
        partRef.current = null;
      }
      try { Tone.Transport.stop(); } catch {}
      try { samplerRef.current?.dispose(); } catch {}
      // Make sure mouse state is clean on unmount
      dispatchGlobalMouseUp();
    };
  }, []);

  /* ========= Render ========= */
  return (
    <div className="w-full mx-auto p-4 rounded-2xl bg-black/5 border border-white/10">
      {!started || !loaded ? (
        <Button onClick={initAudio} className="my-4">
          Click to enable audio & load piano
        </Button>
      ) : null}

      {error && <div className="mt-2 text-sm text-red-500">{error}</div>}

      {/* Scroll container so wide ranges don't compress */}
      <div className="w-full overflow-x-auto">
        <div
          className="inline-block select-none"
          onMouseLeave={dispatchGlobalMouseUp}
        >
          <Piano
            key={pianoKey}                         // <— Force remount after autoplay
            noteRange={{ first: firstNote, last: lastNote }}
            playNote={handlePlayNote}
            stopNote={handleStopNote}
            width={pianoWidth}
            activeNotes={activeNotes}
            playOnMouseOver={false}                // <— Prevent hover play
            renderNoteLabel={({ midiNumber }) => {
              const black = isBlackKey(midiNumber);
              return (
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    paddingBottom: black ? 6 : 8,
                    pointerEvents: "none",
                    fontSize: 11,
                    fontWeight: 600,
                    color: black ? "#fff" : "#000",
                    textShadow: black ? "0 1px 2px rgba(0,0,0,.7)" : "none",
                    lineHeight: 1,
                  }}
                >
                  {midiToPitchClass(midiNumber)}
                </div>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}
