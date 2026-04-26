import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { Wand2 } from 'lucide-react';
import './RealityDistortion.css';

const RealityDistortion = () => {
  const { playClickSound } = useApp();
  const [reveal, setReveal] = useState(false);
  const [afterimageReveal, setAfterimageReveal] = useState(false);

  // Custom Illusion Generator State
  const [genColor1, setGenColor1] = useState('#FF003C');
  const [genColor2, setGenColor2] = useState('#00FFFF');

  return (
    <section className="reality-section">
      <div className="reality-header">
        <h2>Reality Distortion</h2>
        <p>Color is a localized perception, not an absolute truth.</p>
      </div>

      {/* Illusion 1: Simultaneous Contrast */}
      <div className="illusion-container">
        <div className="illusion-info">
          <h3>Simultaneous Contrast</h3>
          <p>The two inner squares below appear to be completely different colors due to their surroundings. Are they?</p>
          <button 
            className="reveal-btn" 
            onClick={() => { playClickSound(); setReveal(!reveal); }}
          >
            {reveal ? 'Restore Illusion' : 'Reveal Truth'}
          </button>
        </div>

        <div className="contrast-arena">
          <motion.div 
            className="bg-panel bg-left" 
            animate={{ width: reveal ? '0%' : '50%' }}
            style={{ backgroundColor: '#FF003C' }}
          >
            <div className="inner-square" style={{ backgroundColor: '#888888' }} />
          </motion.div>
          
          <motion.div 
            className="bg-panel bg-right" 
            animate={{ width: reveal ? '0%' : '50%' }}
            style={{ backgroundColor: '#06D6A0' }}
          >
            <div className="inner-square" style={{ backgroundColor: '#888888' }} />
          </motion.div>

          <div className="truth-background">
            <div className="inner-square" style={{ backgroundColor: '#888888', transform: 'translateX(-100px)' }} />
            <div className="inner-square" style={{ backgroundColor: '#888888', transform: 'translateX(100px)' }} />
          </div>
        </div>
      </div>

      {/* Illusion 2: The Afterimage */}
      <div className="illusion-container afterimage-container">
        <div className="illusion-info">
          <h3>The Retinal Afterimage</h3>
          <p>Stare directly at the white dot in the center of the cyan square for 10 seconds. Then, click 'Flash'. Your brain will hallucinate the complementary color.</p>
          <button 
            className="reveal-btn" 
            onClick={() => { playClickSound(); setAfterimageReveal(true); setTimeout(() => setAfterimageReveal(false), 5000); }}
          >
            Flash
          </button>
        </div>

        <div className="afterimage-arena">
          <motion.div 
            className="stare-target"
            animate={{ backgroundColor: afterimageReveal ? '#FFFFFF' : '#00FFFF' }}
            transition={{ duration: 0.1 }}
          >
            {!afterimageReveal && <div className="focus-dot" />}
          </motion.div>
        </div>
      </div>

      {/* Illusion 3: Custom Illusion Generator */}
      <div className="illusion-container generator-container">
        <div className="illusion-info">
          <h3>Illusion Generator</h3>
          <p>Select any two colors to generate a custom vibrating edge and checkerboard optical illusion. High saturation complements work best.</p>
          <div className="color-pickers">
            <input type="color" value={genColor1} onChange={(e) => setGenColor1(e.target.value)} />
            <input type="color" value={genColor2} onChange={(e) => setGenColor2(e.target.value)} />
          </div>
        </div>

        <div className="generator-arena">
          <div 
            className="vibrating-edges" 
            style={{ 
              backgroundColor: genColor1, 
              border: `10px solid ${genColor2}`,
              boxShadow: `0 0 20px ${genColor1}, inset 0 0 20px ${genColor2}`
            }}
          >
            <span style={{ color: genColor2 }}>VIBRATION</span>
          </div>
          
          <div 
            className="checker-illusion"
            style={{
              background: `repeating-conic-gradient(${genColor1} 0% 25%, ${genColor2} 0% 50%) 50% / 20px 20px`
            }}
          />
        </div>
      </div>

    </section>
  );
};

export default RealityDistortion;
