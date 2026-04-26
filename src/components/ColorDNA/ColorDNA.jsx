import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { Dna } from 'lucide-react';
import './ColorDNA.css';

const ColorDNA = () => {
  const { personalityColors, setPersonalityColors, playClickSound, playHoverSound } = useApp();
  const [nodes, setNodes] = useState([]);
  const [isMutating, setIsMutating] = useState(false);

  useEffect(() => {
    if (personalityColors.length >= 3) {
      setNodes([
        { id: 'primary', color: personalityColors[0], x: 150, y: 150, label: 'Primary Core' },
        { id: 'secondary', color: personalityColors[1], x: 450, y: 100, label: 'Secondary Harmonic' },
        { id: 'contrast', color: personalityColors[2], x: 300, y: 300, label: 'Contrast Node' },
      ]);
    }
  }, [personalityColors]);

  const mutatePalette = () => {
    playClickSound();
    setIsMutating(true);
    
    setTimeout(() => {
      // Generate slightly shifted/mutated colors
      const newColors = personalityColors.map(c => {
        let hex = c.replace('#', '');
        let r = parseInt(hex.substring(0,2), 16);
        let g = parseInt(hex.substring(2,4), 16);
        let b = parseInt(hex.substring(4,6), 16);
        
        // Randomly shift RGB values by -30 to +30
        r = Math.min(255, Math.max(0, r + Math.floor(Math.random() * 60) - 30));
        g = Math.min(255, Math.max(0, g + Math.floor(Math.random() * 60) - 30));
        b = Math.min(255, Math.max(0, b + Math.floor(Math.random() * 60) - 30));
        
        return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase()}`;
      });

      setPersonalityColors(newColors);
      setIsMutating(false);
      playHoverSound();
    }, 1500);
  };

  if (nodes.length === 0) return null;

  return (
    <section className="dna-section">
      <div className="dna-header">
        <h2>Your Color DNA</h2>
        <p>The visual structure of your personality profile.</p>
        <button 
          className="mutate-btn" 
          onClick={mutatePalette} 
          disabled={isMutating}
        >
          <Dna size={16} /> {isMutating ? 'Mutating DNA...' : 'Force Mutation'}
        </button>
      </div>

      <div className="dna-canvas">
        <svg className="dna-network" width="100%" height="100%" viewBox="0 0 600 400">
          <motion.line 
            x1={nodes[0].x} y1={nodes[0].y} 
            x2={nodes[1].x} y2={nodes[1].y} 
            stroke="var(--card-border)" strokeWidth="2" strokeDasharray="5,5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.line 
            x1={nodes[1].x} y1={nodes[1].y} 
            x2={nodes[2].x} y2={nodes[2].y} 
            stroke="var(--card-border)" strokeWidth="2" strokeDasharray="5,5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.line 
            x1={nodes[2].x} y1={nodes[2].y} 
            x2={nodes[0].x} y2={nodes[0].y} 
            stroke="var(--card-border)" strokeWidth="2" strokeDasharray="5,5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
          />
        </svg>

        {nodes.map((node, index) => (
          <motion.div 
            key={node.id}
            className={`dna-node ${isMutating ? 'mutating' : ''}`}
            style={{ 
              backgroundColor: node.color,
              left: `calc(${(node.x / 600) * 100}% - 30px)`,
              top: `calc(${(node.y / 400) * 100}% - 30px)`
            }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', delay: index * 0.3 }}
            whileHover={{ scale: 1.2 }}
            onHoverStart={playHoverSound}
          >
            <div className="node-tooltip">{node.label}</div>
            <div className="node-pulse" style={{ backgroundColor: node.color }} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ColorDNA;
