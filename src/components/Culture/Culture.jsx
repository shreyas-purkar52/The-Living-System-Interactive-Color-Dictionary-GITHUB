import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Culture.css';

const culturalData = [
  {
    id: 'red',
    hex: '#FF003C',
    name: 'Red',
    emotion: 'Passion, Danger, Energy',
    global: 'In Western cultures, red signifies danger, excitement, and love. In Asian markets, it indicates rising stock prices.',
    india: 'In India, red is highly auspicious. It is the color of purity, fertility, and prosperity, predominantly worn by brides and used heavily in festivals like Durga Puja.'
  },
  {
    id: 'yellow',
    hex: '#FFBE0B',
    name: 'Yellow',
    emotion: 'Joy, Optimism, Caution',
    global: 'Globally, it catches the eye quickly (taxis, signs). In Egypt, it is the color of mourning.',
    india: 'In India, yellow (Haldi) signifies sanctity, peace, and knowledge. It is used in the Haldi ceremony before weddings to purify and bless the couple.'
  },
  {
    id: 'white',
    hex: '#FFFFFF',
    name: 'White',
    emotion: 'Purity, Cleanliness, Void',
    global: 'In Western cultures, white means purity and peace (weddings).',
    india: 'In India, white is the color of mourning and is worn at funerals, representing the cycle of death and rebirth.'
  }
];

const Culture = () => {
  const [selectedColor, setSelectedColor] = useState(null);

  return (
    <section className="culture-section">
      <div className="culture-header">
        <h2>Cultural Semantics</h2>
        <p>Color meaning changes drastically across borders.</p>
      </div>

      <div className="culture-grid">
        {culturalData.map(color => (
          <motion.div
            key={color.id}
            className="culture-block"
            style={{ backgroundColor: color.hex, color: color.id === 'white' ? '#000' : '#fff' }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedColor(color)}
          >
            <h3>{color.name}</h3>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedColor && (
          <motion.div
            className="culture-modal"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <div className="modal-content" style={{ borderColor: selectedColor.hex }}>
              <button className="close-btn" onClick={() => setSelectedColor(null)}>✕</button>
              <h3 style={{ color: selectedColor.hex }}>{selectedColor.name}</h3>
              
              <div className="info-group">
                <h4>Emotional Baseline</h4>
                <p>{selectedColor.emotion}</p>
              </div>

              <div className="info-group">
                <h4>Global Context</h4>
                <p>{selectedColor.global}</p>
              </div>

              <div className="info-group highlight-india">
                <h4>Context: India</h4>
                <p>{selectedColor.india}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Culture;
