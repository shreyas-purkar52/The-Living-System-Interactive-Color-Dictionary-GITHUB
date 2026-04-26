import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import './ColorMap.css';

import mapWest from '../../assets/map_west.png';
import mapEast from '../../assets/map_east.png';
import mapIndia from '../../assets/map_india.png';

const regions = [
  {
    id: 'west',
    name: 'Western Cultures',
    image: mapWest,
    x: 100, y: 150,
    meanings: {
      red: 'Danger, Love, Excitement',
      white: 'Purity, Peace, Weddings',
      yellow: 'Caution, Joy'
    }
  },
  {
    id: 'asia',
    name: 'Eastern Cultures',
    image: mapEast,
    x: 350, y: 150,
    meanings: {
      red: 'Prosperity, Luck, Stock Market Gains',
      white: 'Mourning, Death, Funerals',
      yellow: 'Sacred, Royal, Imperial'
    }
  },
  {
    id: 'india',
    name: 'India',
    image: mapIndia,
    x: 600, y: 150,
    meanings: {
      red: 'Purity, Fertility, Auspiciousness (Bridal wear)',
      white: 'Mourning, Rebirth',
      yellow: 'Sanctity, Knowledge (Haldi ceremony)'
    }
  }
];

const ColorMap = () => {
  const [activeRegion, setActiveRegion] = useState(null);
  const { playClickSound, playHoverSound } = useApp();

  return (
    <section className="map-section">
      <div className="map-header">
        <h2>Global Color Map</h2>
        <p>Explore how geographical and cultural boundaries shift color perception.</p>
      </div>

      <div className="map-container">
        <svg viewBox="0 0 800 400" className="world-svg">
          {/* Abstract Grid Background */}
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {regions.map((region) => (
            <g key={region.id} transform={`translate(${region.x}, ${region.y})`}>
              <motion.image
                href={region.image}
                width="140"
                height="140"
                x="-20"
                y="-10"
                className={`region-image ${activeRegion?.id === region.id ? 'active' : ''}`}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1, filter: 'brightness(1.5) drop-shadow(0 0 20px var(--accent-blue))' }}
                onClick={() => { playClickSound(); setActiveRegion(region); }}
                onHoverStart={playHoverSound}
                transition={{ type: 'spring' }}
                style={{ cursor: 'pointer', mixBlendMode: 'screen', transformOrigin: '50px 60px' }}
              />
              <text x="50" y="-20" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle" pointerEvents="none" style={{ textShadow: '0px 2px 10px rgba(0,0,0,0.8)' }}>
                {region.name}
              </text>
            </g>
          ))}
        </svg>

        <AnimatePresence>
          {activeRegion && (
            <motion.div
              className="region-modal"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
            >
              <button className="close-btn" onClick={() => setActiveRegion(null)}>✕</button>
              <h3>{activeRegion.name}</h3>

              <div className="meaning-list">
                <div className="meaning-item">
                  <div className="color-dot" style={{ backgroundColor: 'red' }} />
                  <p>{activeRegion.meanings.red}</p>
                </div>
                <div className="meaning-item">
                  <div className="color-dot" style={{ backgroundColor: 'white' }} />
                  <p>{activeRegion.meanings.white}</p>
                </div>
                <div className="meaning-item">
                  <div className="color-dot" style={{ backgroundColor: 'yellow' }} />
                  <p>{activeRegion.meanings.yellow}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ColorMap;
