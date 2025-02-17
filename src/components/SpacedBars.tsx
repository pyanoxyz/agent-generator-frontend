import { useEffect, useRef, useState } from "react";
// import horizontalGreenLine from "../assets/greenHrLine.png";

export default function VerticalBars({ height = "h-[240px]" }) {
  const [audioContext, setAudioContext] = useState<any>(null);
  const activeNotesRef = useRef(new Map());

  useEffect(() => {
    setAudioContext(new (AudioContext || window.webkitAudioContext)());
    return () => {
      // Cleanup all active notes when component unmounts
      stopAllNotes();
    };
  }, []);

  const stopAllNotes = () => {
    activeNotesRef.current.forEach((nodes) => {
      stopNote(nodes);
    });
    activeNotesRef.current.clear();
  };

  // Function to generate random bar groups
  const generateRandomGroups = () => {
    const groups = [];
    const possibleCounts = [1, 2, 3, 4]; // possible number of bars in a group

    // Generate groups until we reach around 20 total bars
    let totalBars = 0;
    while (totalBars < 40) {
      const count = possibleCounts[Math.floor(Math.random() * possibleCounts.length)];
      // Only add group if it won't exceed 20 bars
      if (totalBars + count <= 20) {
        groups.push({ count, gap: 4 });
        totalBars += count;
      } else {
        break;
      }
    }

    return groups;
  };

  const barGroups = generateRandomGroups();
  const stopNote = (nodes) => {
    const { oscillators, gains, masterGain } = nodes;
    const now = audioContext.currentTime;

    // Gentle release to avoid clicks
    masterGain.gain.cancelScheduledValues(now);
    masterGain.gain.setValueAtTime(masterGain.gain.value, now);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    // Stop oscillators after release
    setTimeout(() => {
      oscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch (e) {
          // Ignore errors if oscillator is already stopped
        }
      });
      gains.forEach((gain) => gain.disconnect());
      masterGain.disconnect();
    }, 100);
  };

  const createPianoSound = (note, frequency) => {
    if (!audioContext) return;
    // Stop previous sound for this note if it exists
    if (activeNotesRef.current.has(note)) {
      stopNote(activeNotesRef.current.get(note));
      activeNotesRef.current.delete(note);
    }

    // Create audio nodes
    const masterGain = audioContext.createGain();
    const compressor = audioContext.createDynamicsCompressor();

    // Create multiple oscillators for richer sound
    const oscillators = [];
    const gains = [];

    // Main note
    const osc1 = audioContext.createOscillator();
    const gain1 = audioContext.createGain();
    osc1.type = "triangle";
    osc1.frequency.setValueAtTime(frequency, audioContext.currentTime);
    gain1.gain.setValueAtTime(0.6, audioContext.currentTime);
    oscillators.push(osc1);
    gains.push(gain1);

    // Overtone 1 (one octave up)
    const osc2 = audioContext.createOscillator();
    const gain2 = audioContext.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(frequency * 2, audioContext.currentTime);
    gain2.gain.setValueAtTime(0.2, audioContext.currentTime);
    oscillators.push(osc2);
    gains.push(gain2);

    // Subtle detuned oscillator for richness
    const osc3 = audioContext.createOscillator();
    const gain3 = audioContext.createGain();
    osc3.type = "sine";
    osc3.frequency.setValueAtTime(frequency * 1.001, audioContext.currentTime);
    gain3.gain.setValueAtTime(0.1, audioContext.currentTime);
    oscillators.push(osc3);
    gains.push(gain3);

    // Connect the audio graph
    masterGain.connect(compressor);
    compressor.connect(audioContext.destination);

    oscillators.forEach((osc, index) => {
      osc.connect(gains[index]);
      gains[index].connect(masterGain);
    });

    // Set compressor parameters
    compressor.threshold.setValueAtTime(-24, audioContext.currentTime);
    compressor.knee.setValueAtTime(30, audioContext.currentTime);
    compressor.ratio.setValueAtTime(12, audioContext.currentTime);
    compressor.attack.setValueAtTime(0.003, audioContext.currentTime);
    compressor.release.setValueAtTime(0.25, audioContext.currentTime);

    // Piano-like envelope
    masterGain.gain.setValueAtTime(0, audioContext.currentTime);
    masterGain.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.01);
    masterGain.gain.exponentialRampToValueAtTime(0.3, audioContext.currentTime + 0.5);
    masterGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 3);

    // Start all oscillators
    oscillators.forEach((osc) => osc.start());

    activeNotesRef.current.set(note, { oscillators, gains, masterGain });

    // Stop and cleanup
    // setTimeout(() => {
    //   oscillators.forEach((osc) => osc.stop());
    //   setTimeout(() => {
    //     masterGain.disconnect();
    //     compressor.disconnect();
    //     gains.forEach((gain) => gain.disconnect());
    //   }, 100);
    // }, 3000);
    // Cleanup after note is finished
    setTimeout(() => {
      if (activeNotesRef.current.has(note)) {
        stopNote(activeNotesRef.current.get(note));
        activeNotesRef.current.delete(note);
      }
    }, 1500);
  };

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

  const onMouseEnter = () => {
    const noteKey = notes[Math.trunc(Math.random() * notes.length)];
    createPianoSound(noteKey.note, getNoteFrequency(noteKey.note));
  };

  return (
    <div className="w-full flex items-end">
      {barGroups.map((group, groupIndex) => (
        <div
          key={groupIndex}
          className="flex w-full h-60 mr-8 gap-1 items-end" // space between groups
        >
          {Array.from({ length: group.count }).map((_, barIndex) => (
            <div
              key={barIndex}
              className={`bg-repeat-x bg-black ${height} w-[50px]`}
              onMouseEnter={onMouseEnter}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
