import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext();

const hexToHSL = (hex) => {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h * 360, s, l };
};

const pentatonicScale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
const dissonantScale = [261.63, 277.18, 311.13, 369.99, 415.30, 466.16];

export const AppProvider = ({ children }) => {
  const [mode, setMode] = useState('explore'); 
  const [theme, setTheme] = useState('dark');
  
  // Omniverse Modifiers
  const [timeEra, setTimeEra] = useState('present'); // 'past', 'present', 'future'
  const [synesthesiaMode, setSynesthesiaMode] = useState(false);
  const [chaosMode, setChaosMode] = useState(false);
  const [blindMode, setBlindMode] = useState(false);
  const [perceptionDelay, setPerceptionDelay] = useState(false);
  const [heatmap, setHeatmap] = useState(false);
  const [breathing, setBreathing] = useState(false);
  
  // Emotion Spectrum (0 = Calm/Serene, 50 = Neutral, 100 = Aggressive/High Energy)
  const [emotionSpectrum, setEmotionSpectrum] = useState(50);
  
  const [hasCompletedScan, setHasCompletedScan] = useState(false);
  const [personalityColors, setPersonalityColors] = useState([]);
  const [personalityProfile, setPersonalityProfile] = useState(null);

  const [audioCtx, setAudioCtx] = useState(null);

  useEffect(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) setAudioCtx(new AudioContext());
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Manage Global Classes
    document.body.className = '';
    if (chaosMode) document.body.classList.add('chaos-mode-active');
    if (blindMode) document.body.classList.add('blind-mode-active');
    if (perceptionDelay) document.body.classList.add('perception-delay-active');
    if (heatmap) document.body.classList.add('heatmap-active');
    if (breathing) document.body.classList.add('breathing-active');
    
    document.body.classList.add(`era-${timeEra}`);

    // Manage Emotion Spectrum
    // Calm (0) -> shift hues to cool (-30deg), lower sat
    // Aggressive (100) -> shift hues to warm/red (+30deg), max sat
    const hueShift = (emotionSpectrum - 50) * 0.6; // -30 to +30 deg
    const satShift = (emotionSpectrum - 50) * 1;   // -50% to +50%
    document.documentElement.style.setProperty('--emotion-hue', `${hueShift}deg`);
    document.documentElement.style.setProperty('--emotion-sat', `${100 + satShift}%`);

  }, [theme, chaosMode, blindMode, perceptionDelay, heatmap, breathing, timeEra, emotionSpectrum]);

  const playHoverSound = useCallback(() => {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = chaosMode ? 'sawtooth' : (timeEra === 'past' ? 'sine' : 'triangle');
      
      let freq = chaosMode ? 100 : 400;
      if (timeEra === 'past') freq = 200; 
      if (timeEra === 'future') freq = 800; 

      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
      
      const delay = perceptionDelay ? 0.3 : 0;
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1 + delay);
      
      if (timeEra === 'past') {
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 500;
        osc.connect(filter);
        filter.connect(gain);
      } else {
        osc.connect(gain);
      }
      
      gain.connect(audioCtx.destination);
      osc.start(audioCtx.currentTime + delay);
      osc.stop(audioCtx.currentTime + 0.1 + delay);
    } catch(e) {}
  }, [audioCtx, chaosMode, timeEra, perceptionDelay]);
  const playClickSound = useCallback(() => {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = chaosMode ? 'square' : 'triangle';
      
      let startFreq = chaosMode ? 150 : 300;
      let endFreq = chaosMode ? 500 : 50;

      if (timeEra === 'future') { startFreq = 1200; endFreq = 200; }
      if (timeEra === 'past') { startFreq = 200; endFreq = 50; }

      const delay = perceptionDelay ? 0.3 : 0;

      osc.frequency.setValueAtTime(startFreq, audioCtx.currentTime + delay);
      osc.frequency.exponentialRampToValueAtTime(endFreq, audioCtx.currentTime + 0.2 + delay);
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2 + delay);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(audioCtx.currentTime + delay);
      osc.stop(audioCtx.currentTime + 0.2 + delay);
    } catch(e) {}
  }, [audioCtx, chaosMode, timeEra, perceptionDelay]);

  const playColorSound = useCallback((hexCode) => {
    if (!audioCtx || !synesthesiaMode) return;
    try {
      const { h, s, l } = hexToHSL(hexCode);
      const scale = chaosMode ? dissonantScale : pentatonicScale;
      const scaleIndex = Math.floor((h / 360) * scale.length);
      const frequency = scale[Math.min(scaleIndex, scale.length - 1)];

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = chaosMode ? 'sawtooth' : (s > 0.5 ? 'triangle' : 'sine');
      
      const delay = perceptionDelay ? 0.5 : 0;
      osc.frequency.setValueAtTime(frequency, audioCtx.currentTime + delay);
      
      gain.gain.setValueAtTime(0, audioCtx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(chaosMode ? 0.1 : 0.05, audioCtx.currentTime + 0.1 + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.5 + delay);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(audioCtx.currentTime + delay);
      osc.stop(audioCtx.currentTime + 1.5 + delay);
    } catch(e) {}
  }, [audioCtx, synesthesiaMode, chaosMode, perceptionDelay]);

  useEffect(() => {
    if (personalityColors.length >= 3 && !chaosMode) {
      document.documentElement.style.setProperty('--accent-primary', personalityColors[0]);
      document.documentElement.style.setProperty('--accent-secondary', personalityColors[1]);
      document.documentElement.style.setProperty('--accent-tertiary', personalityColors[2]);
    } else if (chaosMode) {
      document.documentElement.style.setProperty('--accent-primary', '#00FF00'); 
      document.documentElement.style.setProperty('--accent-secondary', '#FF00FF'); 
      document.documentElement.style.setProperty('--bg-color', '#FF0000'); 
      document.documentElement.style.setProperty('--text-primary', '#0000FF'); 
    }
  }, [personalityColors, chaosMode]);

  return (
    <AppContext.Provider value={{ 
      mode, setMode, 
      theme, setTheme,
      timeEra, setTimeEra,
      hasCompletedScan, setHasCompletedScan,
      personalityColors, setPersonalityColors,
      personalityProfile, setPersonalityProfile,
      synesthesiaMode, setSynesthesiaMode,
      chaosMode, setChaosMode,
      blindMode, setBlindMode,
      perceptionDelay, setPerceptionDelay,
      heatmap, setHeatmap,
      breathing, setBreathing,
      emotionSpectrum, setEmotionSpectrum,
      playHoverSound, playClickSound, playColorSound
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
