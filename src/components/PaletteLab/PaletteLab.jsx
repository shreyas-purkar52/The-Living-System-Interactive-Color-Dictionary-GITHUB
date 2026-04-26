import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import './PaletteLab.css';

const baseColors = [
  '#FF0000', '#00FF00', '#0000FF', 
  '#00FFFF', '#FF00FF', '#FFFF00'  
];

const PhysicsPlayground = () => {
  const { playHoverSound, playClickSound, playColorSound } = useApp();
  const [activeNodes, setActiveNodes] = useState([]);
  const [blendMode, setBlendMode] = useState('screen'); 
  const [blackHoleActive, setBlackHoleActive] = useState(false);
  const arenaRef = useRef(null);

  const spawnNode = (color) => {
    playColorSound(color);
    setActiveNodes(prev => [...prev, { id: Date.now() + Math.random(), color, x: 0, y: 0 }]);
  };

  const removeNode = (id) => {
    playClickSound();
    setActiveNodes(prev => prev.filter(n => n.id !== id));
  };

  // Black hole logic - simple interval checking if a node is near the center
  useEffect(() => {
    if (!blackHoleActive) return;
    
    const interval = setInterval(() => {
      // In a real physics engine we'd check actual x/y distances.
      // Here we simulate the black hole randomly swallowing nodes over time if it's active.
      if (activeNodes.length > 0 && Math.random() > 0.7) {
        // "Swallow" a random node
        const nodeToSwallow = activeNodes[Math.floor(Math.random() * activeNodes.length)];
        // Play a glitchy sound
        playHoverSound();
        setActiveNodes(prev => prev.filter(n => n.id !== nodeToSwallow.id));
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [blackHoleActive, activeNodes, playHoverSound]);

  return (
    <section className="physics-section">
      <div className="physics-header">
        <h2>Color Physics & Gravity</h2>
        <p>Throw colors into the canvas to observe blending. Beware the Black Hole.</p>
        
        <div className="blend-toggle">
          <button 
            className={blendMode === 'screen' ? 'active' : ''} 
            onClick={() => { playClickSound(); setBlendMode('screen'); }}
          >
            Additive (Light)
          </button>
          <button 
            className={blendMode === 'multiply' ? 'active' : ''} 
            onClick={() => { playClickSound(); setBlendMode('multiply'); }}
          >
            Subtractive (Paint)
          </button>
          <button 
            className={`black-hole-toggle ${blackHoleActive ? 'active' : ''}`}
            onClick={() => { playClickSound(); setBlackHoleActive(!blackHoleActive); }}
          >
            {blackHoleActive ? 'Collapse Black Hole' : 'Spawn Black Hole'}
          </button>
        </div>
      </div>

      <div className="physics-workspace">
        <div className="spawner-panel">
          <h3>Spawn Elements</h3>
          <div className="spawner-grid">
            {baseColors.map(color => (
              <motion.div
                key={color}
                className="spawn-btn"
                style={{ backgroundColor: color }}
                onClick={() => spawnNode(color)}
                onHoverStart={() => { playHoverSound(); playColorSound(color); }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
          <button className="clear-btn" onClick={() => { playClickSound(); setActiveNodes([]); }}>Clear Canvas</button>
        </div>

        <div className="physics-arena" ref={arenaRef} style={{ background: blendMode === 'screen' ? '#000' : '#fff' }}>
          
          {blackHoleActive && (
            <motion.div 
              className="black-hole-node"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.2, 1], rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
          )}

          {activeNodes.map(node => (
            <motion.div
              key={node.id}
              className="physics-node"
              style={{ backgroundColor: node.color, mixBlendMode: blendMode }}
              drag
              dragConstraints={arenaRef}
              dragElastic={0.2}
              dragMomentum={true}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                // If black hole is active, slowly pull nodes toward center (simulate gravity visually)
                x: blackHoleActive ? 0 : undefined,
                y: blackHoleActive ? 0 : undefined,
              }}
              transition={{ duration: blackHoleActive ? 2 : 0.2 }}
              exit={{ scale: 0, opacity: 0 }}
              onDoubleClick={() => removeNode(node.id)}
              whileDrag={{ scale: 1.2, zIndex: 100 }}
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => playColorSound(node.color)}
            />
          ))}
          {activeNodes.length === 0 && !blackHoleActive && (
            <div className="empty-state" style={{ color: blendMode === 'screen' ? '#555' : '#ccc' }}>
              Drag elements here. Double click to remove.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PhysicsPlayground;
