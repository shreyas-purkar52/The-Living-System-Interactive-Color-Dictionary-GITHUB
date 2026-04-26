import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import './EntryExperience.css';

const EntryExperience = ({ onEnter }) => {
  const [phase, setPhase] = useState('lines'); // lines -> wave -> text -> exit

  useEffect(() => {
    // Sequence the entry animation
    const seq1 = setTimeout(() => setPhase('wave'), 2000);
    const seq2 = setTimeout(() => setPhase('text'), 3500);
    const seq3 = setTimeout(() => setPhase('exit'), 7000);
    const seq4 = setTimeout(onEnter, 8000);

    return () => {
      clearTimeout(seq1);
      clearTimeout(seq2);
      clearTimeout(seq3);
      clearTimeout(seq4);
    };
  }, [onEnter]);

  return (
    <motion.div
      className="entry-container"
      initial={{ opacity: 1 }}
      animate={phase === 'exit' ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      exit={{ opacity: 0 }}
    >
      <AnimatePresence>
        {phase === 'lines' && (
          <motion.div
            key="lines"
            className="lines-container"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="line line-blue"
              initial={{ x: '-100vw' }}
              animate={{ x: '100vw' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
            <motion.div
              className="line line-magenta"
              initial={{ x: '100vw' }}
              animate={{ x: '-100vw' }}
              transition={{ duration: 2, ease: 'easeInOut', delay: 0.2 }}
            />
            <motion.div
              className="line line-amber"
              initial={{ y: '-100vh' }}
              animate={{ y: '100vh' }}
              transition={{ duration: 2, ease: 'easeInOut', delay: 0.4 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(phase === 'wave' || phase === 'text') && (
          <motion.div
            key="wave"
            className="gradient-wave"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'circOut' }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === 'text' && (
          <motion.div
            key="text"
            className="text-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            <h2>Color is not what you see.</h2>
            <h2 className="highlight">It is what you perceive.</h2>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EntryExperience;
