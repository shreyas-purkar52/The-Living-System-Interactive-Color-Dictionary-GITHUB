import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Timeline.css';

const timelineEvents = [
  {
    id: 'natural',
    era: 'Natural Pigments',
    period: 'Prehistoric - 1800s',
    desc: 'Ochre, lapis lazuli, and Tyrian purple. Colors were extracted directly from the earth, minerals, and insects. Highly localized and extremely expensive.',
    color: '#8B4513'
  },
  {
    id: 'industrial',
    era: 'Industrial Dyes',
    period: '1856 - Mid 20th Century',
    desc: 'William Perkin discovers Mauveine. Synthetic dyes democratized color, exploding the fashion industry and creating consistent, reproducible hues globally.',
    color: '#E0B0FF'
  },
  {
    id: 'digital',
    era: 'Digital Systems',
    period: 'Late 20th Century - Present',
    desc: 'RGB and HEX codes. Color became light. We moved from mixing physical pigments to precisely engineering pixels and screen luminosity.',
    color: '#00FFFF'
  }
];

const Timeline = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

  return (
    <section ref={targetRef} className="timeline-container">
      <div className="timeline-sticky">
        <h2 className="timeline-title">The Evolution of Color</h2>
        <motion.div style={{ x }} className="timeline-scroll">
          {timelineEvents.map((event, i) => (
            <div key={event.id} className="timeline-panel">
              <div className="timeline-content">
                <motion.div 
                  className="era-blob"
                  style={{ backgroundColor: event.color }}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    borderRadius: ["50%", "30%", "50%"]
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: i }}
                />
                <span className="period">{event.period}</span>
                <h3>{event.era}</h3>
                <p>{event.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;
