"use client";

import { useEffect, useRef, useState } from "react";
import { Piano, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import * as Tone from "tone";
import { Button } from "./button";

/* ================================
   1) Unlock sequence (no timing)
   ================================ */
const TARGET_SEQUENCE = ["G", "A", "B", "Db"]; // pitch classes in order

const normalizePitch = (pc) => {
  // enharmonics
  if (pc === "Bb") return "A#";
  if (pc === "Cb") return "B";
  if (pc === "B#") return "C";
  if (pc === "Fb") return "E";
  if (pc === "E#") return "F";
  if (pc === "C#") return "Db";
  return pc;
};
const TARGET_NORM = TARGET_SEQUENCE.map(normalizePitch);

/* ===========================================
   2) Demo song — literal array (you can edit)
   - Times are in beats; durations are Tone.js strings.
   =========================================== */
const DEMO_SONG = [
  // G A B Db
  { time: 0.0,  note: "G4",  dur: "8n" },
  { time: 0.25, note: "A4",  dur: "8n" },
  { time: 0.5,  note: "B4",  dur: "8n" },
  { time: 0.75, note: "Db5", dur: "8n" },

  // Ab Bb C D
  { time: 1.0,  note: "Ab4", dur: "8n" },
  { time: 1.25, note: "Bb4", dur: "8n" },
  { time: 1.5,  note: "C5",  dur: "8n" },
  { time: 1.75, note: "D5",  dur: "8n" },

  // Ab Bb C D
  { time: 2.0,  note: "Ab4", dur: "8n" },
  { time: 2.25, note: "Bb4", dur: "8n" },
  { time: 2.5,  note: "C5",  dur: "8n" },
  { time: 2.75, note: "D5",  dur: "8n" },

  // A B Db Eb
  { time: 3.0,  note: "A4",  dur: "8n" },
  { time: 3.25, note: "B4",  dur: "8n" },
  { time: 3.5,  note: "Db5", dur: "8n" },
  { time: 3.75, note: "Eb5", dur: "8n" },

  // A B Db Eb
  { time: 4.0,  note: "A4",  dur: "8n" },
  { time: 4.25, note: "B4",  dur: "8n" },
  { time: 4.5,  note: "Db5", dur: "8n" },
  { time: 4.75, note: "Eb5", dur: "8n" },

  // Bb C D E
  { time: 5.0,  note: "Bb4", dur: "8n" },
  { time: 5.25, note: "C5",  dur: "8n" },
  { time: 5.5,  note: "D5",  dur: "8n" },
  { time: 5.75, note: "E5",  dur: "8n" },

  // Bb C D E
  { time: 6.0,  note: "Bb4", dur: "8n" },
  { time: 6.25, note: "C5",  dur: "8n" },
  { time: 6.5,  note: "D5",  dur: "8n" },
  { time: 6.75, note: "E5",  dur: "8n" },

  // B Db Eb F
  { time: 7.0,  note: "B4",  dur: "8n" },
  { time: 7.25, note: "Db5", dur: "8n" },
  { time: 7.5,  note: "Eb5", dur: "8n" },
  { time: 7.75, note: "F5",  dur: "8n" },

  // C D E Gb
  { time: 8.0,  note: "C5",  dur: "8n" },
  { time: 8.25, note: "D5",  dur: "8n" },
  { time: 8.5,  note: "E5",  dur: "8n" },
  { time: 8.75, note: "Gb5", dur: "8n" },

  // Db Eb F G
  { time: 9.0,  note: "Db5", dur: "8n" },
  { time: 9.25, note: "Eb5", dur: "8n" },
  { time: 9.5,  note: "F5",  dur: "8n" },
  { time: 9.75, note: "G5",  dur: "8n" },

  // D E Gb Ab
  { time: 10.0, note: "D5",  dur: "8n" },
  { time: 10.25,note: "E5",  dur: "8n" },
  { time: 10.5, note: "Gb5", dur: "8n" },
  { time: 10.75,note: "Ab5", dur: "8n" },

  // A Bb B C
  { time: 11.75, note: "A4",  dur: "8n" },
  { time: 12.0,  note: "Bb4", dur: "8n" },
  { time: 12.25, note: "B4",  dur: "8n" },
  { time: 12.5,  note: "C5",  dur: "2n" },
];

/* ===========================================
   3) Helpers (beats)
   =========================================== */
const durToBeats = (dur) => {
  switch (dur) {
    case "32n": return 0.125;
    case "16n": return 0.25;
    case "8n":  return 0.5;
    case "4n":  return 1;
    case "2n":  return 2;
    case "1n":  return 4;
    default: {
      const n = Number(dur);
      return Number.isFinite(n) ? n : 0.5;
    }
  }
};

const songEndBeats = (events) => {
  let end = 0;
  for (const ev of events) {
    const evEnd = ev.time + durToBeats(ev.dur);
    if (evEnd > end) end = evEnd;
  }
  return end;
};

/* ===========================================
   4) Component
   =========================================== */
export default function PianoUI() {
  const samplerRef = useRef(null);
  const partRef = useRef(null);
  const schedIdRef = useRef(null);

  const [started, setStarted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isAuto, setIsAuto] = useState(false);
  const [error, setError] = useState("");

  // visual highlighting
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

  const firstNote = MidiNumbers.fromNote("C4");
  const lastNote  = MidiNumbers.fromNote("B5");

  // Sequence matcher (no timing)
  const progressRef = useRef(0);
  const stepProgress = (playedPc) => {
    const idx = progressRef.current;
    const expected = TARGET_NORM[idx];

    if (playedPc === expected) {
      progressRef.current += 1;
    } else if (playedPc === TARGET_NORM[0]) {
      progressRef.current = 1;
    } else {
      progressRef.current = 0;
    }

    if (progressRef.current >= TARGET_NORM.length) {
      progressRef.current = 0;
      return true;
    }
    return false;
  };

  // Autoplay with start delay + visual highlights + transport cleanup
  const startAutoplay = () => {
    if (!started || !loaded || isAuto || !samplerRef.current) return;
    setIsAuto(true);

    // clear any prior schedule & part
    if (schedIdRef.current !== null) {
      Tone.Transport.clear(schedIdRef.current);
      schedIdRef.current = null;
    }
    partRef.current?.dispose();

    Tone.Transport.stop();
    Tone.Transport.position = 0;

    const startOffsetBeats = 0.25; // quarter-beat delay
    const endBeats = songEndBeats(DEMO_SONG) + startOffsetBeats;

    const part = new Tone.Part((time, ev) => {
      samplerRef.current.triggerAttackRelease(ev.note, ev.dur, time);

      const midi = Tone.Frequency(ev.note).toMidi();
      Tone.Draw.schedule(() => addActive(midi), time);

      const durSec = Tone.Time(ev.dur).toSeconds();
      Tone.Draw.schedule(() => removeActive(midi), time + durSec);
    }, DEMO_SONG.map((ev) => [ev.time, ev]));

    part.start(startOffsetBeats);
    part.stop(endBeats);
    partRef.current = part;

    schedIdRef.current = Tone.Transport.scheduleOnce(() => {
      setIsAuto(false);
      activeSetRef.current.clear();
      setActiveNotes([]);
      partRef.current?.dispose();
      partRef.current = null;
      if (schedIdRef.current !== null) {
        Tone.Transport.clear(schedIdRef.current);
        schedIdRef.current = null;
      }
      Tone.Transport.stop();
    }, endBeats);

    Tone.Transport.start();
  };

  const toNoteName = (midiNumber) =>
    Tone.Frequency(midiNumber, "midi").toNote();

  const midiToPitchClass = (midi) =>
    Tone.Frequency(midi, "midi").toNote().replace(/\d+/g, ""); // e.g. "Db"

  const isBlackKey = (midi) => [1, 3, 6, 8, 10].includes(midi % 12);

  const handlePlayNote = (midiNumber) => {
    if (!started || !loaded || !samplerRef.current) return;
    if (isAuto) return;

    const note = toNoteName(midiNumber);
    const pc = midiToPitchClass(midiNumber);

    samplerRef.current.triggerAttack(note, Tone.now());

    const matched = stepProgress(normalizePitch(pc));
    if (matched) {
      startAutoplay();
    }
  };

  const handleStopNote = (midiNumber) => {
    if (!started || !loaded || !samplerRef.current) return;
    if (isAuto) return;
    const note = toNoteName(midiNumber);
    samplerRef.current.triggerRelease(note, Tone.now());
  };

  useEffect(() => {
    return () => {
      if (schedIdRef.current !== null) {
        Tone.Transport.clear(schedIdRef.current);
        schedIdRef.current = null;
      }
      partRef.current?.dispose();
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 rounded-2xl bg-black/5 border border-white/10 overflow-x-auto">
      {!started || !loaded ? (
        <Button onClick={initAudio} className={"my-4"}>
          Click to enable audio & load piano
        </Button>
      ) : <div/> }

      {/* MOBILE LANDSCAPE FIT: scale the keyboard via Tailwind only */}
      <div className="mx-auto w-[800px] origin-top transform-gpu landscape:scale-[0.90]">
        <Piano
          noteRange={{ first: firstNote, last: lastNote }}
          playNote={handlePlayNote}
          stopNote={handleStopNote}
          width={800}
          disabled={!started || !loaded}
          activeNotes={activeNotes}
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
                }}
              >
                {midiToPitchClass(midiNumber)}
              </div>
            );
          }}
        />
      </div>
    </div>
  );
}
