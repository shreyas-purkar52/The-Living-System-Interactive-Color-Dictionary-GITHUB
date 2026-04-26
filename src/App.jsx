import { useState, useEffect } from 'react'
import { AnimatePresence, useScroll, useTransform, motion } from 'framer-motion'
import { AppProvider, useApp } from './context/AppContext'
import Header from './components/Header/Header'
import CustomCursor from './components/CustomCursor/CustomCursor'
import InitialScan from './components/InitialScan/InitialScan'
import Hero from './components/Hero/Hero'
import ColorDNA from './components/ColorDNA/ColorDNA'
import DictionaryGrid from './components/DictionaryGrid/DictionaryGrid'
import PhysicsPlayground from './components/PaletteLab/PaletteLab'
import RealityDistortion from './components/RealityDistortion/RealityDistortion'
import ColorMap from './components/ColorMap/ColorMap'
import ChallengeMode from './components/QuizEngine/QuizEngine'
import DesignSimulator from './components/DesignSimulator/DesignSimulator'
import Chameleon from './components/Chameleon/Chameleon'
import MaterialSimulator from './components/MaterialSimulator/MaterialSimulator'
import InfiniteZoom from './components/InfiniteZoom/InfiniteZoom'
import RealityControl from './components/RealityControl/RealityControl'
import Conclusion from './components/Conclusion/Conclusion'

const MainContent = () => {
  const { mode } = useApp();
  const { scrollYProgress } = useScroll();
  
  // Global Scroll Time Environment
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['var(--bg-color)', '#1a1a1a', 'var(--bg-color)']
  );

  return (
    <motion.main key="main-content" className="app-container" style={{ backgroundColor }}>
      <Header />
      <RealityControl />
      <Hero />
      <ColorDNA />
      
      {mode === 'explore' ? (
        <>
          <Chameleon />
          <MaterialSimulator />
          <PhysicsPlayground />
          <InfiniteZoom />
          <RealityDistortion />
          <DesignSimulator />
          <ColorMap />
        </>
      ) : (
        <>
          <DictionaryGrid />
          <ChallengeMode />
        </>
      )}

      <Conclusion />
    </motion.main>
  );
};

const AppController = () => {
  const { hasCompletedScan, setHasCompletedScan } = useApp();

  useEffect(() => {
    if (!hasCompletedScan) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [hasCompletedScan]);

  return (
    <>
      <CustomCursor />
      
      {/* Emotion Spectrum Global Overlay */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, width: '100vw', height: '100vh',
        pointerEvents: 'none',
        zIndex: 9998,
        backdropFilter: `hue-rotate(var(--emotion-hue, 0deg)) saturate(var(--emotion-sat, 100%))`,
        WebkitBackdropFilter: `hue-rotate(var(--emotion-hue, 0deg)) saturate(var(--emotion-sat, 100%))`
      }} />

      <AnimatePresence mode="wait">
        {!hasCompletedScan ? (
          <InitialScan key="scan" onComplete={() => setHasCompletedScan(true)} />
        ) : (
          <MainContent key="main" />
        )}
      </AnimatePresence>
    </>
  );
};

function App() {
  return (
    <AppProvider>
      <AppController />
    </AppProvider>
  )
}

export default App
