import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import './ColorWheel.css';

const colors = [
  { hue: 0, name: 'Red', hex: '#FF0000' },
  { hue: 60, name: 'Yellow', hex: '#FFFF00' },
  { hue: 120, name: 'Green', hex: '#00FF00' },
  { hue: 180, name: 'Cyan', hex: '#00FFFF' },
  { hue: 240, name: 'Blue', hex: '#0000FF' },
  { hue: 300, name: 'Magenta', hex: '#FF00FF' }
];

const ColorWheel = () => {
  const rotation = useMotionValue(0);
  const backgroundHue = useTransform(rotation, value => {
    // Normalize rotation to 0-360
    let hue = (value % 360 + 360) % 360;
    return `hsla(${hue}, 100%, 50%, 0.1)`;
  });

  const [activeInfo, setActiveInfo] = useState(null);

  return (
    <section className="wheel-section">
      <motion.div 
        className="wheel-background"
        style={{ backgroundColor: backgroundHue }}
      />
      
      <div className="wheel-container">
        <div className="wheel-info">
          <h2>The Spectrum</h2>
          <p>Drag the wheel to explore hues. Click a segment for details.</p>
          {activeInfo && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="info-panel"
            >
              <h3 style={{ color: activeInfo.hex }}>{activeInfo.name}</h3>
              <p>Hue: {activeInfo.hue}°</p>
            </motion.div>
          )}
        </div>

        <div className="wheel-wrapper">
          <motion.div
            className="draggable-wheel"
            style={{ rotate: rotation }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDrag={(e, info) => {
              rotation.set(rotation.get() + info.delta.x * 0.5);
            }}
          >
            {colors.map((color, i) => {
              const rotationAngle = i * 60;
              return (
                <div 
                  key={color.hue}
                  className="wheel-segment"
                  style={{ 
                    transform: `rotate(${rotationAngle}deg) skewY(-30deg)`,
                    backgroundColor: `hsl(${color.hue}, 100%, 50%)`
                  }}
                  onClick={() => setActiveInfo(color)}
                />
              );
            })}
            <div className="wheel-center" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ColorWheel;
