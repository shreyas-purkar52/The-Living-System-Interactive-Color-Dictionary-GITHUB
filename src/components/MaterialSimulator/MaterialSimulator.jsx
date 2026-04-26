import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { Box } from 'lucide-react';
import './MaterialSimulator.css';

const MaterialSimulator = () => {
  const { playClickSound, personalityColors } = useApp();
  const [activeColor, setActiveColor] = useState(personalityColors[0] || '#3A86FF');

  const materials = [
    { id: 'glass', name: 'Glassmorphism', desc: 'High specularity, subsurface scattering, background blur.' },
    { id: 'metal', name: 'Brushed Metal', desc: 'Anisotropic reflection, high contrast, low diffusion.' },
    { id: 'fabric', name: 'Matte Fabric', desc: 'High diffusion, micro-texture noise, zero specularity.' }
  ];

  return (
    <section className="material-section">
      <div className="material-header">
        <h2>Material Physics</h2>
        <p>Observe how a single hex code behaves completely differently based on its physical properties.</p>
      </div>

      <div className="material-controls">
        <span>Target Hex:</span>
        <input 
          type="color" 
          value={activeColor} 
          onChange={(e) => setActiveColor(e.target.value)} 
          className="material-color-picker"
        />
        <span className="hex-display">{activeColor.toUpperCase()}</span>
      </div>

      <div className="material-grid">
        {materials.map((mat, index) => (
          <motion.div 
            key={mat.id}
            className="material-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
            onMouseEnter={playClickSound}
          >
            <div className="material-preview-container">
              {/* Background gradient to show off glass/transparency */}
              <div className="preview-bg" />
              
              <motion.div 
                className={`material-sphere mat-${mat.id}`}
                style={{ '--base-color': activeColor }}
                whileHover={{ rotateY: 180, scale: 1.1 }}
                transition={{ duration: 0.8 }}
              />
            </div>
            
            <div className="material-info">
              <h3><Box size={18} /> {mat.name}</h3>
              <p>{mat.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MaterialSimulator;
