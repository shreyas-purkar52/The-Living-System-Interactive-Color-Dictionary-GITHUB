import { useApp } from '../../context/AppContext';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Skull, Clock } from 'lucide-react';
import './Header.css';

const Header = () => {
  const { 
    mode, setMode, 
    theme, setTheme, 
    timeEra, setTimeEra,
    synesthesiaMode, setSynesthesiaMode, 
    chaosMode, setChaosMode, 
    playClickSound 
  } = useApp();

  const cycleEra = () => {
    playClickSound();
    if (timeEra === 'past') setTimeEra('present');
    else if (timeEra === 'present') setTimeEra('future');
    else setTimeEra('past');
  };

  return (
    <motion.header 
      className="global-header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <div className="header-logo">Color Dictionary</div>
      
      <div className="header-controls">
        
        {/* Era Toggle */}
        <button 
          className={`era-toggle ${timeEra}`}
          onClick={cycleEra}
          title={`Current Era: ${timeEra.toUpperCase()}`}
        >
          <Clock size={16} /> <span>{timeEra.toUpperCase()}</span>
        </button>

        {/* Chaos Toggle */}
        <button 
          className={`chaos-toggle ${chaosMode ? 'active' : ''}`}
          onClick={() => { playClickSound(); setChaosMode(!chaosMode); }}
          title="DON'T CLICK THIS"
        >
          <Skull size={20} />
          {chaosMode && <span> RESTORE HARMONY</span>}
        </button>

        <button 
          className={`synesthesia-toggle ${synesthesiaMode ? 'active' : ''}`}
          onClick={() => { playClickSound(); setSynesthesiaMode(!synesthesiaMode); }}
          title="Toggle Synesthesia Mode (Hear Colors)"
        >
          {synesthesiaMode ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>

        <div className="mode-switch">
          <button 
            className={mode === 'learn' ? 'active' : ''} 
            onClick={() => { playClickSound(); setMode('learn'); }}
          >
            Learn Mode
          </button>
          <button 
            className={mode === 'explore' ? 'active' : ''} 
            onClick={() => { playClickSound(); setMode('explore'); }}
          >
            Explore Mode
          </button>
        </div>

        <div className="theme-switch">
          <select value={theme} onChange={(e) => { playClickSound(); setTheme(e.target.value); }}>
            <option value="dark">Dark Theme</option>
            <option value="light">Light Theme</option>
            <option value="neon">Neon Theme</option>
          </select>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
