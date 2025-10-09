// app/utils/songs.js
export const SONGS = {
  // Zelda
  song1: [
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
  ],
  // Wallace
  song2: [ 
    { time: 0, note: "D5",  dur: "8n" },
    { time: .25,  note: "C5", dur: "8n" },
    { time: .5, note: "D5",  dur: "8n" },
    { time: .75,  note: "E5",  dur: "2n" },

    { time: 1.25, note: "D5",  dur: "8n" },
    { time: 1.5,  note: "C5", dur: "8n" },
    { time: 1.75, note: "A#4",  dur: "8n" },
    { time: 2,  note: "A4",  dur: "1m" },

    { time: 3.5, note: "C5",  dur: "4n" },
    { time: 4,  note: "A#4", dur: "16n" },
    { time: 4.25, note: "A4",  dur: "16n" },
    { time: 4.5,  note: "C5",  dur: "4n" },

    { time: 5, note: "A#4",  dur: "16n" },
    { time: 5.25,  note: "A4", dur: "16n" },
    { time: 5.5, note: "C5",  dur: "16n" },
    { time: 5.75,  note: "G4",  dur: "1m" },

    { time: 7.25, note: "D5",  dur: "16n" },
    { time: 7.5,  note: "C5", dur: "16n" },
    { time: 7.75, note: "D5",  dur: "16n" },
    { time: 8,  note: "E5",  dur: "8n" },

    { time: 8.5, note: "D5",  dur: "8n" },
    { time: 9,  note: "E5", dur: "16n" },
    { time: 9.25, note: "F5",  dur: "8n" },
    { time: 9.75,  note: "C5",  dur: "8n" },

    { time: 10.25, note: "F5",  dur: "8n" },

    // MAKE MORE IF THERE IS TIME
  ],
  // Mario
  song3: [
  { time: 0.000, note: "C5", dur: "16n" },
  { time: 0.428, note: "G4", dur: "16n" },
  { time: 0.857, note: "E4", dur: "16n" },
  { time: 1.285, note: "A4", dur: "16n" },
  { time: 1.571, note: "B4", dur: "16n" },
  { time: 1.857, note: "A#4", dur: "16n" },
  { time: 2.000, note: "A4", dur: "16n" },
  { time: 2.285, note: "G4", dur: "16n" },
  { time: 2.476, note: "E5", dur: "16n" },
  { time: 2.666, note: "G5", dur: "16n" },
  { time: 2.857, note: "A5", dur: "16n" },
  { time: 3.143, note: "F5", dur: "16n" },
  { time: 3.285, note: "G5", dur: "16n" },
  { time: 3.571, note: "E5", dur: "16n" },
  { time: 3.857, note: "C5", dur: "16n" },
  { time: 4.000, note: "D5", dur: "16n" },
  { time: 4.143, note: "B4", dur: "16n" },
  { time: 4.571, note: "C5", dur: "16n" },
  { time: 5.000, note: "G4", dur: "16n" },
  { time: 5.428, note: "E4", dur: "16n" },
  { time: 5.857, note: "A4", dur: "16n" },
  { time: 6.143, note: "B4", dur: "16n" },
  { time: 6.428, note: "A#4", dur: "16n" },
  { time: 6.571, note: "A4", dur: "16n" },
  { time: 6.857, note: "G4", dur: "16n" },
  { time: 7.047, note: "E5", dur: "16n" },
  { time: 7.238, note: "G5", dur: "16n" },
  { time: 7.428, note: "A5", dur: "16n" },
  { time: 7.714, note: "F5", dur: "16n" },
  { time: 7.857, note: "G5", dur: "16n" },
  { time: 8.143, note: "E5", dur: "16n" },
  { time: 8.428, note: "C5", dur: "16n" },
  { time: 8.571, note: "D5", dur: "16n" },
  { time: 8.713, note: "B4", dur: "16n" }
],
  // Chocobo
  song4: [
  { time: 0.000, note: "B4", dur: "2n" },
  { time: 0.594, note: "A4", dur: "8n" },
  { time: 0.794, note: "G4", dur: "8n" },

  { time: 1.005, note: "G4", dur: "16n" },
  { time: 1.103, note: "A4", dur: "16n" },
  { time: 1.204, note: "G4", dur: "8n" },
  { time: 1.401, note: "F4", dur: "8n" },

  { time: 1.600, note: "G4", dur: "2n" },
  { time: 2.203, note: "F4", dur: "8n" },
  { time: 2.410, note: "G4", dur: "8n" },
  { time: 2.625, note: "G4", dur: "16n" },

  { time: 2.723, note: "B4", dur: "16n" },
  { time: 2.824, note: "D5", dur: "8n" },
  { time: 3.021, note: "E5", dur: "8n" },
  { time: 3.220, note: "F5", dur: "2n" },

  { time: 4.014, note: "D5", dur: "4n" },
  { time: 4.424, note: "B4", dur: "8n" },
  { time: 4.621, note: "G4", dur: "8n" },
  { time: 4.820, note: "E4", dur: "8n" },

  { time: 5.020, note: "D5", dur: "8n" },
  { time: 5.221, note: "B4", dur: "8n" },
  { time: 5.423, note: "G4", dur: "8n" },
  { time: 5.630, note: "B4", dur: "4n" },

  { time: 6.044, note: "G4", dur: "4n" },
  { time: 6.440, note: "B4", dur: "2n" },
  { time: 7.034, note: "A4", dur: "8n" },
  { time: 7.234, note: "G4", dur: "8n" },

  { time: 7.445, note: "G4", dur: "16n" },
  { time: 7.543, note: "A4", dur: "16n" },
  { time: 7.644, note: "G4", dur: "8n" },
  { time: 7.841, note: "F4", dur: "8n" },

  { time: 8.040, note: "G4", dur: "2n" },
  { time: 8.639, note: "F4", dur: "8n" },
  { time: 8.842, note: "G4", dur: "8n" },
  { time: 9.054, note: "G4", dur: "16n" },

  { time: 9.151, note: "B4", dur: "16n" },
  { time: 9.252, note: "D5", dur: "8n" },
  { time: 9.449, note: "E5", dur: "8n" },
  { time: 9.649, note: "F5", dur: "2n" },

  { time: 10.450, note: "E5", dur: "4n" },
  { time: 10.861, note: "C5", dur: "8n" },
  { time: 11.058, note: "A4", dur: "8n" },
  { time: 11.257, note: "F#4", dur: "8n" },
  { time: 11.457, note: "A4", dur: "8n" },

  { time: 11.653, note: "C5", dur: "8n" },
  { time: 11.851, note: "E5", dur: "8n" },
  { time: 12.050, note: "D5", dur: "4n" },
  { time: 12.461, note: "G5", dur: "4n" },
  { time: 12.857, note: "D5", dur: "2n" }

  ],
  //Entertainer
  song5: [
  { time: 0.000000, note: "D4", dur: "16n" },
  { time: 0.214285, note: "D#4", dur: "16n" },
  { time: 0.428571, note: "E4", dur: "16n" },
  { time: 0.642857, note: "C5", dur: "8n" },
  { time: 0.857142, note: "C4", dur: "16n" },
  { time: 1.071428, note: "E4", dur: "16n" },
  { time: 1.285713, note: "C5", dur: "8n" },
  { time: 1.714284, note: "E4", dur: "16n" },
  { time: 1.928570, note: "C5", dur: "4n." },
  { time: 2.142855, note: "F3", dur: "8n" },
  { time: 2.571426, note: "C4", dur: "16n" },
  { time: 3.000000, note: "E3", dur: "8n" },
  { time: 3.214283, note: "C6", dur: "16n" },
  { time: 3.428568, note: "D6", dur: "16n" },
  { time: 3.642854, note: "D#6", dur: "16n" },
  { time: 3.857139, note: "E6", dur: "16n" },
  { time: 4.071425, note: "C6", dur: "16n" },
  { time: 4.285710, note: "D6", dur: "16n" },
  { time: 4.499996, note: "E6", dur: "8n" },
  { time: 4.714281, note: "G2", dur: "8n" },
  { time: 4.928567, note: "B5", dur: "16n" },
  { time: 5.142852, note: "D6", dur: "8n" },
  { time: 5.571423, note: "C6", dur: "4n." },
  { time: 6.000000, note: "C4", dur: "16n" },
  { time: 6.428565, note: "C4", dur: "8n" },
  { time: 6.857136, note: "D4", dur: "16n" },
  { time: 7.071422, note: "D#4", dur: "16n" },
  { time: 7.285707, note: "E4", dur: "16n" },
  { time: 7.499993, note: "C5", dur: "8n" },
  { time: 7.714278, note: "C4", dur: "16n" },
  { time: 7.928564, note: "E4", dur: "16n" },
  { time: 8.142849, note: "C5", dur: "8n" },
  { time: 8.571420, note: "E4", dur: "16n" },
  { time: 8.785706, note: "C5", dur: "4n." },
  { time: 9.000000, note: "F3", dur: "8n" },
  { time: 9.428562, note: "C4", dur: "16n" },
  { time: 9.857133, note: "E3", dur: "8n" },
  { time: 10.285698, note: "A5", dur: "16n" },
  { time: 10.499983, note: "G5", dur: "16n" },
  { time: 10.714269, note: "F#5", dur: "16n" },
  { time: 10.928555, note: "A5", dur: "16n" },
  { time: 11.142840, note: "C6", dur: "16n" },
  { time: 11.357126, note: "E6", dur: "8n" },
  { time: 11.571411, note: "D3", dur: "8n" },
  { time: 11.785697, note: "D6", dur: "16n" },
  { time: 11.999982, note: "C6", dur: "16n" },
  { time: 12.214268, note: "A5", dur: "16n" },
  { time: 12.428553, note: "D6", dur: "4n." },
],
};


const SEQUENCES = [
  { key: "song1", seq: ["G4", "A4", "B4", "Db5"] }, 
  { key: "song2", seq: ["C5","A#4","A4","C5","A#4","A4","C5","G4"] },
  { key: "song3", seq: ["E5","E5","E5","C5","E5","G5","G4"] },
  { key: "song4", seq: ["D5","B4","G4","E4","D5","B4","G4","B4","G4","B4"] },
  { key: "song5", seq: ["D4","D#4","E4","C5","E4","C5","E4","C5",] },
];