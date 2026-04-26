import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, RefreshCw } from 'lucide-react';
import './QuizEngine.css';

// Existing academic questions
const questions = [
  { id: 1, type: 'mcq', question: "Which color model is used for digital screens?", options: ["RGB", "CMYK", "RYB", "HSL"], answer: "RGB" },
  { id: 2, type: 'mcq', question: "What occurs when two complementary colors are placed side by side?", options: ["Simultaneous Contrast", "Desaturation", "Subtractive Blending", "Muting"], answer: "Simultaneous Contrast" },
];

const QuizEngine = () => {
  const { playClickSound } = useApp();
  const [activeTab, setActiveTab] = useState('academic'); // 'academic' or 'survival'

  // Academic State
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Survival State
  const [survivalTime, setSurvivalTime] = useState(15);
  const [survivalActive, setSurvivalActive] = useState(false);
  const [survivalScore, setSurvivalScore] = useState(0);
  const [survivalGameOver, setSurvivalGameOver] = useState(false);
  const [terribleBg, setTerribleBg] = useState('#FF0000');
  const [terribleText, setTerribleText] = useState('#00FF00'); // Unreadable contrast

  const handleAcademicAnswer = (selected) => {
    playClickSound();
    if (selected === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  // Survival Logic
  useEffect(() => {
    let timer;
    if (survivalActive && survivalTime > 0) {
      timer = setInterval(() => {
        setSurvivalTime(prev => prev - 1);
      }, 1000);
    } else if (survivalTime === 0 && survivalActive) {
      setSurvivalActive(false);
      setSurvivalGameOver(true);
    }
    return () => clearInterval(timer);
  }, [survivalActive, survivalTime]);

  const startSurvival = () => {
    playClickSound();
    setSurvivalActive(true);
    setSurvivalGameOver(false);
    setSurvivalScore(0);
    setSurvivalTime(15);
    generateBadDesign();
  };

  const generateBadDesign = () => {
    // Generate terrible contrast
    const badCombos = [
      ['#FF0000', '#00FF00'],
      ['#0000FF', '#000000'],
      ['#FFFF00', '#FFFFFF'],
      ['#FF00FF', '#00FFFF']
    ];
    const combo = badCombos[Math.floor(Math.random() * badCombos.length)];
    setTerribleBg(combo[0]);
    setTerribleText(combo[1]);
  };

  const attemptFix = (bgFix, textFix) => {
    playClickSound();
    // Simplified logic: if user picks a dark bg and light text, they survive a round
    if (bgFix === '#000000' && textFix === '#FFFFFF') {
      setSurvivalScore(prev => prev + 1);
      setSurvivalTime(prev => prev + 5); // Time extension
      generateBadDesign();
    } else {
      // Wrong fix = penalty
      setSurvivalTime(prev => Math.max(0, prev - 3));
    }
  };

  return (
    <section className="quiz-section">
      <div className="quiz-header">
        <h2>Challenge Chamber</h2>
        <div className="quiz-tabs">
          <button className={activeTab === 'academic' ? 'active' : ''} onClick={() => { playClickSound(); setActiveTab('academic'); }}>Academic Test</button>
          <button className={activeTab === 'survival' ? 'active' : ''} onClick={() => { playClickSound(); setActiveTab('survival'); }}><ShieldAlert size={16}/> Survival Mode</button>
        </div>
      </div>

      <div className="quiz-container">
        
        {/* ACADEMIC MODE */}
        {activeTab === 'academic' && (
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div key="question" className="question-card" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
                <span className="q-number">Question {currentQuestion + 1} of {questions.length}</span>
                <h3>{questions[currentQuestion].question}</h3>
                
                <div className="options-grid">
                  {questions[currentQuestion].options.map((opt, i) => (
                    <button key={i} className="option-btn" onClick={() => handleAcademicAnswer(opt)}>{opt}</button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="result" className="result-card" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                <h3>Diagnostic Complete</h3>
                <div className="score-display">
                  <span>{score}</span> / {questions.length}
                </div>
                <button className="restart-btn" onClick={() => { playClickSound(); setCurrentQuestion(0); setScore(0); setShowResult(false); }}>
                  <RefreshCw size={16} /> Retake Diagnostic
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* SURVIVAL MODE */}
        {activeTab === 'survival' && (
          <div className="survival-container">
            {!survivalActive && !survivalGameOver ? (
              <div className="survival-intro">
                <h3>Color Survival</h3>
                <p>You have 15 seconds. The UI is completely unreadable. Fix the contrast to survive and gain time.</p>
                <button className="start-btn" onClick={startSurvival}>Start Survival</button>
              </div>
            ) : survivalGameOver ? (
              <div className="survival-gameover">
                <h3>System Failure</h3>
                <p>Your eyes have melted.</p>
                <div className="score-display">Designs Fixed: {survivalScore}</div>
                <button className="restart-btn" onClick={startSurvival}>Try Again</button>
              </div>
            ) : (
              <div className="survival-arena" style={{ backgroundColor: terribleBg }}>
                <div className="timer-bar" style={{ width: `${(survivalTime / 15) * 100}%` }} />
                <h1 style={{ color: terribleText, border: `5px solid ${terribleText}` }}>DANGER: UNREADABLE</h1>
                
                <div className="fix-controls">
                  <p style={{ color: terribleText }}>Fix the UI:</p>
                  <button onClick={() => attemptFix('#000000', '#FFFFFF')}>Dark Mode Fix</button>
                  <button onClick={() => attemptFix(terribleBg, terribleText)}>Leave It (Penalty)</button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};

export default QuizEngine;
