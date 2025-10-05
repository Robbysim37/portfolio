// app/utils/songs.js
export const SONGS = {
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

  song3: [ 
    { time: 0, note: "C5",  dur: "1m" },
    { time: 1,  note: "G4", dur: "1m" },
    { time: 2, note: "E4",  dur: "1m" },

    { time: 2.5,  note: "A4",  dur: "2n" },
    { time: 3,  note: "B4",  dur: "2n" },
    { time: 3.25,  note: "Bb4",  dur: "4n" },
    { time: 3.50,  note: "A4",  dur: "2n" },

    { time: 4,  note: "G4",  dur: "2n" },

    { time: 4.5,  note: "E5",  dur: "2n" },
    { time: 5,  note: "G5",  dur: "2n" },
    { time: 5.5,  note: "A5",  dur: "2n" },
    { time: 6,  note: "F5",  dur: "2n" },
    { time: 6.5,  note: "G5",  dur: "2n" },

    { time: 7,  note: "E5",  dur: "2n" },
    { time: 7.5,  note: "C5",  dur: "2n" },
    { time: 8,  note: "D5",  dur: "2n" },
    { time: 8.5,  note: "B4",  dur: "2n" },


  ],

  song4: [ 
    { time: .5, note: "B4",  dur: "8n" },
    { time: 1,  note: "A4", dur: "8n" },
    { time: 1.5, note: "G4",  dur: "8n" },
    { time: 2,  note: "G4",  dur: "8n" },

    { time: 2.5, note: "A4",  dur: "8n" },
    { time: 3,  note: "G4", dur: "8n" },
    { time: 3.5, note: "F4",  dur: "8n" },
    { time: 4,  note: "G4",  dur: "8n" },

    { time: 4.5, note: "F4",  dur: "8n" },
    { time: 5,  note: "G4", dur: "8n" },
    { time: 5.5, note: "G4",  dur: "8n" },
    { time: 6,  note: "B4",  dur: "8n" },

    { time: 6.5,  note: "D5", dur: "8n" },
    { time: 7, note: "E5",  dur: "8n" },
    { time: 7.5,  note: "F5",  dur: "8n" },
  ],

  song5: [ 
    { time: 0, note: "C5",  dur: "8n" },
    { time: .25,  note: "D5", dur: "8n" },
    { time: .5, note: "D#5",  dur: "8n" },
    { time: .75,  note: "E5",  dur: "8n" },

    { time: 1, note: "C5",  dur: "8n" },
    { time: 1.25,  note: "D5", dur: "8n" },
    { time: 1.5, note: "E5",  dur: "8n" },
    { time: 1.75,  note: "B4",  dur: "8n" },

    { time: 2, note: "D5",  dur: "8n" },
    { time: 2.5,  note: "C5",  dur: "8n" },
  ],
};


const SEQUENCES = [
  { key: "song1", seq: ["G4", "A4", "B4", "Db5"] }, 
  { key: "song2", seq: ["C5","A#4","A4","C5","A#4","A4","C5","G4"] },
  { key: "song3", seq: ["E5","E5","E5","C5","E5","G5","G4"] },
  { key: "song4", seq: ["D5","B4","G4","E4","D5","B4","G4","B4","G4","B4"] },
  { key: "song5", seq: ["D4","D#4","E4","C5","E4","C5","E4","C5",] },
];