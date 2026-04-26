import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './StoryMode.css';

const stories = [
  {
    id: 'red',
    title: 'The Energy of Red',
    content: 'A visceral reaction. Red raises the pulse, draws the eye immediately, and signifies both danger and passion.',
    bg: '#FF003C',
    animationClass: 'pulse-bg'
  },
  {
    id: 'blue',
    title: 'The Calm of Blue',
    content: 'Distance and depth. Blue slows the heart rate, providing a sense of stability, trust, and serene focus.',
    bg: '#3A86FF',
    animationClass: 'wave-bg'
  },
  {
    id: 'amber',
    title: 'The Warmth of Amber',
    content: 'Illumination and optimism. Amber catches the light, bringing approachability and energetic warmth.',
    bg: '#FFBE0B',
    animationClass: 'glow-bg'
  }
];

const StoryMode = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

  return (
    <section ref={targetRef} className="story-mode-container">
      <div className="sticky-wrapper">
        <motion.div style={{ x }} className="horizontal-scroll">
          {stories.map((story) => (
            <div 
              key={story.id} 
              className={`story-panel ${story.animationClass}`}
              style={{ backgroundColor: story.bg }}
            >
              <div className="story-content">
                <motion.h2
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.8 }}
                >
                  {story.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {story.content}
                </motion.p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StoryMode;
