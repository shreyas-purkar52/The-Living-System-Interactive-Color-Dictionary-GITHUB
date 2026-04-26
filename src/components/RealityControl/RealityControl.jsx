import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { Settings2, EyeOff, Brain, Flame, Wind, Clock } from 'lucide-react';
import './RealityControl.css';

const RealityControl = () => {
  const { 
    timeEra, setTimeEra,
    blindMode, setBlindMode,
    perceptionDelay, setPerceptionDelay,
    heatmap, setHeatmap,
    breathing, setBreathing,
    emotionSpectrum, setEmotionSpectrum,
    playClickSound
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);

  const cycleEra = () => {
    playClickSound();
    if (timeEra === 'past') setTimeEra('present');
    else if (timeEra === 'present') setTimeEra('future');
    else setTimeEra('past');
  };

  return (
    <>
      <button 
        className="reality-panel-toggle" 
        onClick={() => { playClickSound(); setIsOpen(true); }}
        title="Open Reality Control Panel"
      >
        <Settings2 size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="reality-panel-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div 
              className="reality-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="panel-header">
                <h2>Reality Modifiers</h2>
                <button onClick={() => setIsOpen(false)}>✕</button>
              </div>

              <div className="modifier-list">
                
                <div className="modifier-item">
                  <div className="mod-info">
                    <Clock size={20} />
                    <div>
                      <h4>Time Shift</h4>
                      <p>Cycle historical aesthetics</p>
                    </div>
                  </div>
                  <button className="mod-btn" onClick={cycleEra}>{timeEra.toUpperCase()}</button>
                </div>

                <div className="modifier-item">
                  <div className="mod-info">
                    <EyeOff size={20} />
                    <div>
                      <h4>Blind Mode</h4>
                      <p>Force 100% Grayscale</p>
                    </div>
                  </div>
                  <button 
                    className={`mod-btn ${blindMode ? 'active' : ''}`} 
                    onClick={() => { playClickSound(); setBlindMode(!blindMode); }}
                  >
                    {blindMode ? 'ON' : 'OFF'}
                  </button>
                </div>

                <div className="modifier-item">
                  <div className="mod-info">
                    <Brain size={20} />
                    <div>
                      <h4>Perception Delay</h4>
                      <p>Simulate brain lag & ghosting</p>
                    </div>
                  </div>
                  <button 
                    className={`mod-btn ${perceptionDelay ? 'active' : ''}`} 
                    onClick={() => { playClickSound(); setPerceptionDelay(!perceptionDelay); }}
                  >
                    {perceptionDelay ? 'ON' : 'OFF'}
                  </button>
                </div>

                <div className="modifier-item">
                  <div className="mod-info">
                    <Flame size={20} />
                    <div>
                      <h4>Emotional Heatmap</h4>
                      <p>Visualize active/passive zones</p>
                    </div>
                  </div>
                  <button 
                    className={`mod-btn ${heatmap ? 'active' : ''}`} 
                    onClick={() => { playClickSound(); setHeatmap(!heatmap); }}
                  >
                    {heatmap ? 'ON' : 'OFF'}
                  </button>
                </div>

                <div className="modifier-item">
                  <div className="mod-info">
                    <Wind size={20} />
                    <div>
                      <h4>Color Breathing</h4>
                      <p>Rhythmic UI expansion</p>
                    </div>
                  </div>
                  <button 
                    className={`mod-btn ${breathing ? 'active' : ''}`} 
                    onClick={() => { playClickSound(); setBreathing(!breathing); }}
                  >
                    {breathing ? 'ON' : 'OFF'}
                  </button>
                </div>

                <div className="modifier-item emotion-slider-container">
                  <div className="mod-info" style={{ width: '100%', marginBottom: '10px' }}>
                    <div>
                      <h4>Emotion Spectrum</h4>
                      <p>Global hue and saturation shift</p>
                    </div>
                  </div>
                  <input 
                    type="range" 
                    min="0" max="100" 
                    value={emotionSpectrum} 
                    onChange={(e) => setEmotionSpectrum(Number(e.target.value))}
                    className="emotion-slider"
                  />
                  <div className="emotion-labels">
                    <span>Calm</span>
                    <span>Aggressive</span>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RealityControl;
