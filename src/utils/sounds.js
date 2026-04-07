// Rich chess sounds using Web Audio API
// Piece sounds use layered white-noise bursts (percussive click) +
// low-frequency sine (wood thud) to mimic a real wooden piece on a board.

let audioCtx = null;

function ctx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  // Resume if browser suspended it
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

// Creates a short white-noise burst — the "click" of wood on wood
function noiseBuffer(ac, durationSec) {
  const sampleRate = ac.sampleRate;
  const frames = Math.ceil(sampleRate * durationSec);
  const buf = ac.createBuffer(1, frames, sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < frames; i++) data[i] = Math.random() * 2 - 1;
  return buf;
}

function playNoiseBurst(ac, startTime, durationSec, filterFreq, gain, q = 1.5) {
  const src = ac.createBufferSource();
  src.buffer = noiseBuffer(ac, durationSec);

  const filter = ac.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = filterFreq;
  filter.Q.value = q;

  const gainNode = ac.createGain();
  gainNode.gain.setValueAtTime(gain, startTime);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + durationSec);

  src.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ac.destination);
  src.start(startTime);
  src.stop(startTime + durationSec);
}

function playTone(ac, startTime, frequency, durationSec, volume, type = "sine") {
  const osc = ac.createOscillator();
  const gainNode = ac.createGain();
  osc.connect(gainNode);
  gainNode.connect(ac.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, startTime);
  gainNode.gain.setValueAtTime(volume, startTime);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + durationSec);
  osc.start(startTime);
  osc.stop(startTime + durationSec);
}

// --- Public API ---

export function playMoveSound() {
  try {
    const ac = ctx();
    const t = ac.currentTime;
    // High click (wood tap)
    playNoiseBurst(ac, t, 0.04, 3200, 0.55, 2.5);
    // Low thud (body resonance)
    playTone(ac, t, 110, 0.08, 0.18, "sine");
    // Very brief mid click
    playNoiseBurst(ac, t + 0.005, 0.025, 1200, 0.25, 3);
  } catch { /* silent */ }
}

export function playCaptureSound() {
  try {
    const ac = ctx();
    const t = ac.currentTime;
    // Harder, fuller thud — two pieces collide
    playNoiseBurst(ac, t, 0.06, 2500, 0.7, 1.8);
    playNoiseBurst(ac, t, 0.09, 700, 0.5, 1.2);
    // Deeper resonance
    playTone(ac, t, 80, 0.12, 0.25, "sine");
    playTone(ac, t + 0.01, 140, 0.08, 0.12, "sine");
  } catch { /* silent */ }
}

export function playCorrectSound() {
  try {
    const ac = ctx();
    const t = ac.currentTime;
    // Bright ascending arpeggio: C5 E5 G5
    const notes = [523.25, 659.25, 783.99];
    notes.forEach((freq, i) => {
      playTone(ac, t + i * 0.11, freq, 0.22, 0.22, "sine");
      // Add subtle harmonic
      playTone(ac, t + i * 0.11, freq * 2, 0.15, 0.06, "sine");
    });
  } catch { /* silent */ }
}

export function playWrongSound() {
  try {
    const ac = ctx();
    const t = ac.currentTime;
    // Low descending "thud-thud"
    playTone(ac, t, 220, 0.15, 0.28, "triangle");
    playTone(ac, t + 0.12, 180, 0.2, 0.22, "triangle");
    playNoiseBurst(ac, t, 0.08, 400, 0.15, 0.8);
  } catch { /* silent */ }
}

export function playCheckSound() {
  try {
    const ac = ctx();
    const t = ac.currentTime;
    // Sharp alert — two quick high clicks
    playNoiseBurst(ac, t, 0.04, 4000, 0.5, 3);
    playTone(ac, t, 880, 0.06, 0.15, "sine");
    playNoiseBurst(ac, t + 0.08, 0.04, 4000, 0.4, 3);
    playTone(ac, t + 0.08, 880, 0.06, 0.12, "sine");
  } catch { /* silent */ }
}

export function playCompletedSound() {
  try {
    const ac = ctx();
    const t = ac.currentTime;
    // C major chord arpeggiated up: C5 E5 G5 C6
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      const delay = i * 0.09;
      playTone(ac, t + delay, freq, 0.35 - i * 0.04, 0.2, "sine");
      playTone(ac, t + delay, freq * 1.5, 0.2, 0.05, "sine"); // 5th overtone
    });
    // Warm low root
    playTone(ac, t, 261.63, 0.45, 0.12, "sine");
  } catch { /* silent */ }
}

export function playStreakSound() {
  try {
    const ac = ctx();
    const t = ac.currentTime;
    // Pentatonic run upward
    const notes = [523.25, 587.33, 659.25, 783.99, 880];
    notes.forEach((freq, i) => {
      playTone(ac, t + i * 0.07, freq, 0.14, 0.18, "sine");
    });
  } catch { /* silent */ }
}
