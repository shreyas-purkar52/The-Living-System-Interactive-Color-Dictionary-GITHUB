import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      width: 40,
      height: 40,
      backgroundColor: 'rgba(58, 134, 255, 0.5)',
      filter: 'blur(10px)',
      scale: 1,
      mixBlendMode: 'screen'
    },
    hover: {
      x: mousePosition.x - 30,
      y: mousePosition.y - 30,
      width: 60,
      height: 60,
      backgroundColor: 'rgba(255, 0, 110, 0.7)',
      filter: 'blur(15px)',
      scale: 1.5,
      mixBlendMode: 'screen'
    }
  };

  return (
    <motion.div
      className="cursor-blob"
      variants={variants}
      animate={isHovering ? 'hover' : 'default'}
      transition={{
        type: 'tween',
        ease: 'backOut',
        duration: 0.15
      }}
    />
  );
};

export default CustomCursor;
