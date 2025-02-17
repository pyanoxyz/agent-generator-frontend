import React, { useState, useEffect } from "react";

const PianoKeys = () => {
  // Notes for the piano keys (C4 to C5 octave)
  const notes = [
    { note: "C4", key: "white" },
    { note: "C#4", key: "black" },
    { note: "D4", key: "white" },
    { note: "D#4", key: "black" },
    { note: "E4", key: "white" },
    { note: "F4", key: "white" },
    { note: "F#4", key: "black" },
    { note: "G4", key: "white" },
    { note: "G#4", key: "black" },
    { note: "A4", key: "white" },
    { note: "A#4", key: "black" },
    { note: "B4", key: "white" },
  ];

  const [audioContext, setAudioContext] = useState<any>(null);

  useEffect(() => {
    setAudioContext(new (AudioContext || window.webkitAudioContext)());
  }, []);

  const playNote = (frequency) => {
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const getNoteFrequency = (note) => {
    const noteToFreq = {
      C4: 261.63,
      "C#4": 277.18,
      D4: 293.66,
      "D#4": 311.13,
      E4: 329.63,
      F4: 349.23,
      "F#4": 369.99,
      G4: 392.0,
      "G#4": 415.3,
      A4: 440.0,
      "A#4": 466.16,
      B4: 493.88,
    };
    return noteToFreq[note];
  };

  return (
    <div className="w-full h-32 flex items-end justify-center relative">
      {notes.map((note, index) => (
        <div
          key={note.note}
          className={`relative ${
            note.key === "white"
              ? "w-12 h-32 bg-white border border-gray-300 hover:bg-gray-100"
              : "w-8 h-20 bg-black hover:bg-gray-800 absolute"
          } cursor-pointer transition-colors duration-100 `}
          style={{
            left: note.key === "black" ? `${index * 48 - 16}px` : undefined,
            zIndex: note.key === "black" ? 1 : 0,
            marginLeft: note.key === "white" ? "-1px" : undefined,
          }}
          onMouseDown={() => playNote(getNoteFrequency(note.note))}
        />
      ))}
    </div>
  );
};

export default PianoKeys;
