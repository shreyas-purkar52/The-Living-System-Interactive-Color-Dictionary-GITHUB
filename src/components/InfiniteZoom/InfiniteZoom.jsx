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
  
  // Transform scale based on scroll inside this section (capped at 150 to prevent browser render limits)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 150]);
  
  // Opacities for different zoom layers
  const layer1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]); // Solid Color
  const layer2Opacity = useTransform(scrollYProgress, [0.1, 0.2, 0.4, 0.5], [0, 1, 1, 0]); // RGB Pixels
  const layer3Opacity = useTransform(scrollYProgress, [0.4, 0.5, 0.7, 0.8], [0, 1, 1, 0]); // Noise
  const layer4Opacity = useTransform(scrollYProgress, [0.7, 0.8, 1], [0, 1, 1]); // Galaxy

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

          {/* Layer 3: Visual Perception Noise */}
          <motion.div 
            className="zoom-layer layer-noise"
            style={{ opacity: layer3Opacity }}
          />

          {/* Layer 4: Complementary Galaxy */}
          <motion.div 
            className="zoom-layer layer-galaxy"
            style={{ opacity: layer4Opacity }}
          >
            <div className="galaxy-core" style={{ backgroundColor: personalityColors[1] || '#FFBE0B' }} />
            <div className="galaxy-dust" style={{ backgroundColor: personalityColors[2] || '#FF006E' }} />
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default InfiniteZoom;
