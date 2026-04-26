import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { Wand2, Ghost } from 'lucide-react';
import './DesignSimulator.css';

const basePalettes = [
  { id: 1, name: 'Cyberpunk', colors: ['#0B0B0B', '#00F0FF', '#FF00FF'] },
  { id: 2, name: 'Organic', colors: ['#F4F1DE', '#E07A5F', '#81B29A'] },
  { id: 3, name: 'Corporate', colors: ['#F8F9FA', '#0056B3', '#D49A00'] },
  { id: 4, name: 'Terrible Mistake', colors: ['#FF0000', '#00FF00', '#0000FF'] } // Bad palette for Autopilot test
];

const culturalStyles = [
  { name: 'Tokyo Neon', colors: ['#0B0B0B', '#FF00FF', '#00FFFF'], translatorText: 'Cultural Translator: High contrast neon reflects a hyper-digital, fast-paced futuristic society.' },
  { name: 'India Festival', colors: ['#4A0E4E', '#FF5E00', '#FFD700'], translatorText: 'Cultural Translator: Vibrant, warm hues signifying energy, joy, purity, and spiritual celebration.' },
  { name: 'Nordic Minimal', colors: ['#FAFAFA', '#2C3E50', '#95A5A6'], translatorText: 'Cultural Translator: Muted, cold tones reflecting harsh winters and a cultural desire for clean, calming spaces.' }
];

const generateCritique = (colors, translatorText = null) => {
  const [bg, primary] = colors;
  const isBgDark = parseInt(bg.slice(1,3), 16) < 128;
  const isPrimaryDark = parseInt(primary.slice(1,3), 16) < 128;

  let critique = "";
  let needsFix = false;
  
  if (translatorText) {
    critique += `${translatorText}\n\n`;
  }

  if (isBgDark === isPrimaryDark) {
    critique += "⚠️ CRITICAL: Contrast ratio failure. Text is illegible.\n\n";
    needsFix = true;
  } else {
    critique += "✓ Contrast ratio acceptable.\n\n";
  }

  if (colors.includes('#FF0000') && colors.includes('#00FF00')) {
    critique += "⚠️ CRITICAL: Retinal vibration detected. Red/Green clash.\n";
    needsFix = true;
  } else {
    critique += "✓ Chromatic harmony stable.\n";
  }

  return { text: critique, needsFix };
};

const DesignSimulator = () => {
  const { playClickSound, personalityColors } = useApp();
  
  const [activePalettes, setActivePalettes] = useState([...basePalettes]);
  
  useEffect(() => {
    if (personalityColors.length >= 3) {
      setActivePalettes(prev => {
        const hasDna = prev.find(p => p.id === 0);
        if (hasDna) return prev;
        return [{ id: 0, name: 'Your DNA', colors: personalityColors }, ...prev];
      });
    }
  }, [personalityColors]);

  const [activePalette, setActivePalette] = useState(basePalettes[0]);
  const [activeTab, setActiveTab] = useState('web');
  const [critique, setCritique] = useState({ text: "", needsFix: false });
  const [displayedCritique, setDisplayedCritique] = useState("");
  const [isFixing, setIsFixing] = useState(false);

  const [bg, primary, secondary] = activePalette.colors;

  useEffect(() => {
    const res = generateCritique(activePalette.colors, activePalette.translatorText);
    setCritique(res);
    setDisplayedCritique("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedCritique(res.text.substring(0, i));
      i++;
      if (i > res.text.length) clearInterval(interval);
    }, 20); 
    return () => clearInterval(interval);
  }, [activePalette]);

  const runAutopilot = () => {
    playClickSound();
    setIsFixing(true);
    setDisplayedCritique("SYSTEM OVERRIDE: Calculating harmonic adjustments...\n\nAdjusting luminance...\nShifting complementary nodes...");
    
    setTimeout(() => {
      // Fix the terrible palette
      setActivePalette({
        id: activePalette.id,
        name: activePalette.name + ' (Fixed)',
        colors: ['#1A1A1A', '#06D6A0', '#EF476F'] // A fixed, harmonic version
      });
      setIsFixing(false);
    }, 2000);
  };

  const stealStyle = (style) => {
    playClickSound();
    setActivePalette({
      id: Date.now(),
      name: `Cultural: ${style.name}`,
      colors: style.colors,
      translatorText: style.translatorText
    });
  };

  return (
    <section className="simulator-section">
      <div className="simulator-header">
        <h2>Design Simulator & Critic</h2>
        <p>Test palettes in real UI, steal cultural identities, or let the AI Autopilot fix your mistakes.</p>
      </div>

      <div className="simulator-controls">
        <div className="palette-selector">
          {activePalettes.map(p => (
            <button 
              key={p.id} 
              className={`pal-btn ${activePalette.id === p.id ? 'active' : ''}`}
              onClick={() => { playClickSound(); setActivePalette(p); }}
            >
              {p.name}
              <div className="pal-dots">
                {p.colors.map((c, i) => <span key={i} style={{ backgroundColor: c }} />)}
              </div>
            </button>
          ))}
        </div>

        <div className="identity-theft-panel">
          <span className="theft-label"><Ghost size={16}/> Cultural Influence:</span>
          {culturalStyles.map(s => (
            <button key={s.name} className="steal-btn" onClick={() => stealStyle(s)}>
              {s.name}
            </button>
          ))}
        </div>

        <div className="tab-selector">
          <button className={activeTab === 'web' ? 'active' : ''} onClick={() => { playClickSound(); setActiveTab('web'); }}>Web UI</button>
          <button className={activeTab === 'app' ? 'active' : ''} onClick={() => { playClickSound(); setActiveTab('app'); }}>Mobile App</button>
          <button className={activeTab === 'poster' ? 'active' : ''} onClick={() => { playClickSound(); setActiveTab('poster'); }}>Print Poster</button>
        </div>
      </div>

      <div className="simulator-workspace">
        <div className="simulator-display">
          <motion.div 
            className={`mockup-container ${activeTab}`}
            animate={{ backgroundColor: bg, color: primary }}
            transition={{ duration: 1 }}
          >
            {activeTab === 'web' && (
              <div className="web-mockup">
                <motion.nav style={{ borderBottom: `1px solid ${primary}` }}>
                  <span className="logo" style={{ color: primary }}>Brand</span>
                  <motion.button style={{ backgroundColor: primary, color: bg }}>Login</motion.button>
                </motion.nav>
                <div className="hero">
                  <motion.h1 style={{ color: secondary }}>Main Value Proposition</motion.h1>
                  <p>Supporting text that explains the product in detail.</p>
                  <motion.button style={{ backgroundColor: secondary, color: bg }}>Get Started</motion.button>
                </div>
              </div>
            )}

            {activeTab === 'app' && (
              <motion.div className="app-mockup" style={{ borderColor: primary }}>
                <motion.div className="app-header" style={{ backgroundColor: primary, color: bg }}>
                  Dashboard
                </motion.div>
                <div className="app-cards">
                  <motion.div className="card" style={{ backgroundColor: secondary, color: bg }}>Stat 1</motion.div>
                  <motion.div className="card" style={{ border: `1px solid ${primary}` }}>Stat 2</motion.div>
                </div>
                <motion.button className="fab" style={{ backgroundColor: primary, color: bg }}>+</motion.button>
              </motion.div>
            )}

            {activeTab === 'poster' && (
              <div className="poster-mockup">
                <motion.div className="poster-graphic" style={{ backgroundColor: primary }} />
                <motion.div className="poster-graphic-2" style={{ backgroundColor: secondary }} />
                <motion.h1 style={{ color: bg, mixBlendMode: 'difference' }}>EVENT 2026</motion.h1>
              </div>
            )}
          </motion.div>
        </div>

        {/* AI Critic Panel */}
        <div className="critic-panel">
          <div className="critic-header">
            <span className="blink-dot" /> AI Design Critic
          </div>
          <div className="critic-body">
            <pre className={isFixing ? 'fixing-text' : ''}>{displayedCritique}</pre>
          </div>
          {critique.needsFix && (
            <div className="autopilot-action">
              <button className="autopilot-btn" onClick={runAutopilot} disabled={isFixing}>
                <Wand2 size={16} /> {isFixing ? 'Fixing...' : 'Engage Design Autopilot'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DesignSimulator;
