// Tiny 8-bit sound engine — plain Web Audio API oscillators, no audio files,
// no external deps. Muted by default preference is respected via localStorage
// so the site never makes noise a visitor didn't ask for beyond their own clicks.
const STORAGE_KEY = "pixelops_sfx_muted";
let ctx = null;

function getContext() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    ctx = new AudioCtx();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

export function isMuted() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY) === "true";
}

export function setMuted(muted) {
  window.localStorage.setItem(STORAGE_KEY, muted ? "true" : "false");
}

function tone(freq, duration, { type = "square", gain = 0.05, delay = 0 } = {}) {
  if (isMuted()) return;
  const audio = getContext();
  if (!audio) return;
  const osc = audio.createOscillator();
  const g = audio.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  const start = audio.currentTime + delay;
  g.gain.setValueAtTime(gain, start);
  g.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(g);
  g.connect(audio.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

export function playHover() {
  tone(660, 0.045, { gain: 0.03 });
}

export function playClick() {
  tone(440, 0.06, { gain: 0.045 });
  tone(880, 0.05, { gain: 0.03, delay: 0.03 });
}

export function playHit() {
  tone(120, 0.12, { type: "sawtooth", gain: 0.07 });
}

export function playSuccess() {
  [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.09, { gain: 0.05, delay: i * 0.07 }));
}

export function playError() {
  [220, 196, 174].forEach((f, i) => tone(f, 0.12, { type: "sawtooth", gain: 0.06, delay: i * 0.09 }));
}

export function playPowerUp() {
  const notes = [392, 523, 659, 784, 1047, 1319];
  notes.forEach((f, i) => tone(f, 0.09, { gain: 0.05, delay: i * 0.055 }));
}
