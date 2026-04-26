import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import './Conclusion.css';

const Conclusion = () => {
  const { personalityProfile, personalityColors } = useApp();

  return (
    <section className="conclusion-section" style={{ 
      background: personalityColors.length >= 3 
        ? `linear-gradient(to bottom, var(--bg-color), ${personalityColors[0]}40)` 
        : 'var(--bg-color)' 
    }}>
      <div className="conclusion-content">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Your Journey Complete
        </motion.h2>
        
        {personalityProfile && (
          <motion.div 
            className="personality-summary"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h3>{personalityProfile}</h3>
            <div className="final-palette">
              {personalityColors.map(c => (
                <div key={c} className="final-swatch" style={{ backgroundColor: c }} />
              ))}
            </div>
            <p>You have navigated the Living System. Keep exploring the frequencies of light.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Conclusion;
