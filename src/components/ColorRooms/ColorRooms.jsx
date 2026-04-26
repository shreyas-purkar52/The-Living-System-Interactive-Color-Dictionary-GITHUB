import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ColorRooms.css';

const rooms = [
  { id: 'hue', name: 'Hue Room' },
  { id: 'contrast', name: 'Contrast Room' },
  { id: 'saturation', name: 'Saturation Room' },
  { id: 'rgb-cmyk', name: 'RGB vs CMYK Room' }
];

const HueRoom = () => (
  <motion.div 
    className="room hue-room"
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
  >
    <h2>Infinite Hue</h2>
    <p>A continuous shift through the visible spectrum.</p>
  </motion.div>
);

const ContrastRoom = () => {
  const [mousePos, setMousePos] = useState(50);
  
  return (
    <motion.div 
      className="room contrast-room"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onMouseMove={(e) => setMousePos((e.clientX / window.innerWidth) * 100)}
    >
      <div className="contrast-split" style={{ width: `${mousePos}%` }}>
        <h2 className="dark-text">Contrast shifts perception</h2>
      </div>
      <div className="contrast-bg">
        <h2 className="light-text">Contrast shifts perception</h2>
      </div>
    </motion.div>
  );
};

const SaturationRoom = () => {
  const [sat, setSat] = useState(100);

  return (
    <motion.div 
      className="room saturation-room"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onMouseMove={(e) => setSat((e.clientY / window.innerHeight) * 100)}
    >
      <div className="sat-bg" style={{ filter: `grayscale(${100 - sat}%)` }}>
        <h2>Move vertically to drain color</h2>
      </div>
    </motion.div>
  );
};

const RgbCmykRoom = () => (
  <motion.div 
    className="room rgb-cmyk-room"
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
  >
    <div className="rgb-side">
      <h2 className="glowing-text">RGB (Screen / Additive)</h2>
    </div>
    <div className="cmyk-side">
      <h2 className="muted-text">CMYK (Print / Subtractive)</h2>
    </div>
  </motion.div>
);

const ColorRooms = () => {
  const [activeRoom, setActiveRoom] = useState('hue');

  return (
    <section className="color-rooms-section">
      <div className="room-nav">
        {rooms.map(room => (
          <button 
            key={room.id}
            className={`room-btn ${activeRoom === room.id ? 'active' : ''}`}
            onClick={() => setActiveRoom(room.id)}
          >
            {room.name}
          </button>
        ))}
      </div>

      <div className="room-display">
        <AnimatePresence mode="wait">
          {activeRoom === 'hue' && <HueRoom key="hue" />}
          {activeRoom === 'contrast' && <ContrastRoom key="contrast" />}
          {activeRoom === 'saturation' && <SaturationRoom key="saturation" />}
          {activeRoom === 'rgb-cmyk' && <RgbCmykRoom key="rgb-cmyk" />}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ColorRooms;
