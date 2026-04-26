import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import './Hero.css';

const Hero = () => {
  const containerRef = useRef(null);
  const { personalityColors } = useApp();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({ target: containerRef });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 200]);
  
  // Spring physics for mouse repulsion
  const springConfig = { damping: 25, stiffness: 120 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const c1 = personalityColors[0] || 'var(--accent-blue)';
  const c2 = personalityColors[1] || 'var(--accent-magenta)';
  const c3 = personalityColors[2] || 'var(--accent-amber)';

  return (
    <section ref={containerRef} className="hero-section">
      <motion.div 
        className="fluid-layer fluid-1"
        style={{
          background: `radial-gradient(circle at ${100 - mousePos.x}% ${100 - mousePos.y}%, ${c1} 0%, transparent 50%)`,
          y: yParallax
        }}
      />
      <motion.div 
        className="fluid-layer fluid-2"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${100 - mousePos.y}%, ${c2} 0%, transparent 60%)`,
          y: useTransform(scrollYProgress, [0, 1], [0, -100])
        }}
      />
      <motion.div 
        className="fluid-layer fluid-3"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${c3} 0%, transparent 40%)`,
          y: useTransform(scrollYProgress, [0, 1], [0, 50])
        }}
      />

      <div className="repulsion-field" style={{
        background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, var(--bg-color) 0%, transparent 20%)`
      }} />

      <div className="hero-content">
        <motion.h1 
          className="hero-title genesis-title"
          initial={{ opacity: 0, filter: 'blur(20px)', scale: 1.2 }}
          animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          Color: A Living System
        </motion.h1>
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          A responsive ecosystem where color behaves, reacts, and teaches.
        </motion.p>
      </div>

      <div className="scroll-indicator">
        <motion.div
          className="mouse"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
};

export default Hero;
