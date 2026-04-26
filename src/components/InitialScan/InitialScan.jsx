import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import './InitialScan.css';

const scanColors = [
  { hex: '#FF003C', name: 'Crimson' },
  { hex: '#06D6A0', name: 'Mint' },
  { hex: '#118AB2', name: 'Ocean' },
  { hex: '#FFD166', name: 'Sun' },
  { hex: '#073B4C', name: 'Midnight' },
  { hex: '#EF476F', name: 'Rose' },
  { hex: '#8A2BE2', name: 'Void' },
  { hex: '#FF8C00', name: 'Ember' },
  { hex: '#F8F9FA', name: 'Blank' }
];

const InitialScan = ({ onComplete }) => {
  const { setPersonalityColors, setPersonalityProfile, playClickSound } = useApp();
  const [phase, setPhase] = useState('intro'); // intro -> subconscious -> selection -> analyzing -> result
  const [subconsciousColors, setSubconsciousColors] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  // Subconscious Test Logic
  useEffect(() => {
    if (phase === 'subconscious') {
      let count = 0;
      const interval = setInterval(() => {
        const c1 = scanColors[Math.floor(Math.random() * scanColors.length)];
        const c2 = scanColors[Math.floor(Math.random() * scanColors.length)];
        setSubconsciousColors([c1, c2]);
        count++;
        if (count > 10) {
          clearInterval(interval);
          setPhase('selection');
        }
      }, 300); // Fast flashing
      return () => clearInterval(interval);
    }
  }, [phase]);

  const handleSubconsciousClick = (color) => {
    playClickSound();
    // In a real app we'd weight this. Here we just advance the timer faster.
  };

  const handleColorSelect = (color) => {
    playClickSound();
    if (selectedColors.includes(color.hex)) {
      setSelectedColors(selectedColors.filter(c => c !== color.hex));
    } else if (selectedColors.length < 3) {
      setSelectedColors([...selectedColors, color.hex]);
    }
  };

  const handleComplete = () => {
    playClickSound();
    setPhase('analyzing');
    setTimeout(() => {
      setPersonalityColors(selectedColors);
      
      // Simple personality logic based on primary color
      if (selectedColors.includes('#FF003C') || selectedColors.includes('#EF476F')) {
        setPersonalityProfile('The Aggressive Visionary');
      } else if (selectedColors.includes('#118AB2') || selectedColors.includes('#073B4C')) {
        setPersonalityProfile('The Serene Architect');
      } else {
        setPersonalityProfile('The Harmonic Observer');
      }
      
      setPhase('result');
    }, 3000);
  };

  return (
    <motion.div 
      className="scan-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      <AnimatePresence mode="wait">
        
        {phase === 'intro' && (
          <motion.div key="intro" className="scan-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <h1>Color is not what you see.</h1>
            <p>It is what you perceive.</p>
            <button className="start-scan-btn" onClick={() => { playClickSound(); setPhase('subconscious'); }}>
              Initialize System
            </button>
          </motion.div>
        )}

        {phase === 'subconscious' && (
          <motion.div key="subconscious" className="scan-content subconscious-arena" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h2>Subconscious Reaction Test</h2>
            <p>Click the color you are instinctively drawn to.</p>
            <div className="subconscious-split">
              {subconsciousColors.map((c, i) => (
                <div 
                  key={i} 
                  className="subconscious-panel" 
                  style={{ backgroundColor: c?.hex }}
                  onClick={() => handleSubconsciousClick(c)}
                />
              ))}
            </div>
          </motion.div>
        )}

        {phase === 'selection' && (
          <motion.div key="selection" className="scan-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}>
            <h2>Conscious Extraction</h2>
            <p>Select exactly 3 colors to construct your DNA.</p>
            <div className="color-grid">
              {scanColors.map(c => (
                <div 
                  key={c.hex}
                  className={`color-node ${selectedColors.includes(c.hex) ? 'selected' : ''}`}
                  style={{ backgroundColor: c.hex }}
                  onClick={() => handleColorSelect(c)}
                />
              ))}
            </div>
            <button 
              className="start-scan-btn" 
              disabled={selectedColors.length !== 3}
              onClick={handleComplete}
              style={{ opacity: selectedColors.length === 3 ? 1 : 0.5 }}
            >
              Synthesize Profile
            </button>
          </motion.div>
        )}

        {phase === 'analyzing' && (
          <motion.div key="analyzing" className="scan-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="loader" />
            <h2>Sequencing DNA...</h2>
          </motion.div>
        )}

        {phase === 'result' && (
          <motion.div key="result" className="scan-content" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <h2>Access Granted</h2>
            <p>Your global environment has been updated based on your sequence.</p>
            <button className="start-scan-btn" onClick={onComplete}>Enter The Living System</button>
          </motion.div>
        )}

      </AnimatePresence>
    </motion.div>
  );
};

export default InitialScan;
