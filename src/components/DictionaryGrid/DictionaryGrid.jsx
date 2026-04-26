import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colorDictionary } from '../../data/colors';
import { useApp } from '../../context/AppContext';
import './DictionaryGrid.css';

const InfiniteMirror = ({ color, depth = 5 }) => {
  if (depth === 0) return null;
  return (
    <div 
      className="mirror-layer" 
      style={{ 
        border: `2px solid ${color}`,
        transform: `scale(0.9) translateZ(-50px)`,
        opacity: 0.8
      }}
    >
      <InfiniteMirror color={color} depth={depth - 1} />
    </div>
  );
};

const DictionaryGrid = () => {
  const { playClickSound, playHoverSound, playColorSound } = useApp();
  const [activeTerm, setActiveTerm] = useState(null);

  const handleCardClick = (term) => {
    playClickSound();
    setActiveTerm(term);
  };

  return (
    <section className="dictionary-section">
      <div className="dictionary-header">
        <h2>The Lexicon</h2>
        <p>A living dictionary of color theory and terminology.</p>
      </div>

      <div className="grid-container">
        {colorDictionary.map((term, index) => (
          <motion.div 
            key={term.id}
            className="dictionary-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10, scale: 1.05 }}
            onHoverStart={() => {
              playHoverSound();
              if (term.hex) playColorSound(term.hex);
            }}
            onClick={() => handleCardClick(term)}
          >
            <div className="card-icon" style={{ backgroundColor: term.hex || 'var(--text-secondary)' }} />
            <h3>{term.term}</h3>
            <p>{term.shortDef}</p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeTerm && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { playClickSound(); setActiveTerm(null); }}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.8, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 100 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-btn" onClick={() => setActiveTerm(null)}>✕</button>
              
              <div className="modal-cinematic" style={{ backgroundColor: activeTerm.hex ? `${activeTerm.hex}20` : '#111' }}>
                {activeTerm.hex && (
                  <div className="mirror-container">
                    <div className="mirror-layer root-mirror" style={{ backgroundColor: activeTerm.hex }}>
                      <InfiniteMirror color={activeTerm.hex} depth={10} />
                    </div>
                  </div>
                )}
                {!activeTerm.hex && <div className="cinematic-placeholder">Cinematic Simulation Offline</div>}
              </div>

              <div className="modal-text">
                <h2>{activeTerm.term}</h2>
                <p>{activeTerm.longDef}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DictionaryGrid;
