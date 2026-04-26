import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import './InfiniteZoom.css';

const InfiniteZoom = () => {
  const { personalityColors } = useApp();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Transform scale based on scroll inside this section (capped at 5 since viewport is 100vw, to prevent GPU crash)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);
  
  const layer1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.3], [1, 1, 0]); // Solid Color
  const layer2Opacity = useTransform(scrollYProgress, [0, 1], [1, 1]); // Keep RGB visible entire time

  const targetColor = personalityColors[0] || '#3A86FF';

  return (
    <section ref={containerRef} className="zoom-section">
      <div className="zoom-sticky">
        <div className="zoom-header">
          <h2>Infinite Universe</h2>
          <p>Scroll down to break through the surface of perception.</p>
        </div>

        <motion.div className="zoom-viewport" style={{ scale }}>
          
          {/* Layer 1: Solid Color Surface */}
          <motion.div 
            className="zoom-layer layer-solid"
            style={{ backgroundColor: targetColor, opacity: layer1Opacity }}
          />

          {/* Layer 2: RGB Sub-pixels */}
          <motion.div 
            className="zoom-layer layer-rgb"
            style={{ opacity: layer2Opacity }}
          >
            <div className="rgb-stripes" />
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default InfiniteZoom;
