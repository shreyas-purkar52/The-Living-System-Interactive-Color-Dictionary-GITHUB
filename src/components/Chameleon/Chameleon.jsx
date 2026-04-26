import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { Camera, CameraOff } from 'lucide-react';
import './Chameleon.css';

const Chameleon = () => {
  const { setPersonalityColors, playClickSound } = useApp();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [extractedColor, setExtractedColor] = useState('#000000');
  const [error, setError] = useState(null);

  const startCamera = async () => {
    playClickSound();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsActive(true);
        setError(null);
      }
    } catch (err) {
      setError("Camera access denied or unavailable.");
    }
  };

  const stopCamera = () => {
    playClickSound();
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
    setIsActive(false);
  };

  const analyzeFrame = () => {
    if (!videoRef.current || !canvasRef.current || !isActive) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    // Draw current video frame to canvas
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    
    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    
    let r = 0, g = 0, b = 0;
    const pixelCount = imageData.length / 4;

    for (let i = 0; i < imageData.length; i += 4) {
      r += imageData[i];
      g += imageData[i + 1];
      b += imageData[i + 2];
    }

    r = Math.floor(r / pixelCount);
    g = Math.floor(g / pixelCount);
    b = Math.floor(b / pixelCount);

    const hex = `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase()}`;
    setExtractedColor(hex);
    
    // We update the personality colors globally to reflect the live environment
    // We generate complementary secondary colors based on the live primary
    const invR = 255 - r, invG = 255 - g, invB = 255 - b;
    const invHex = `#${(1 << 24 | invR << 16 | invG << 8 | invB).toString(16).slice(1).toUpperCase()}`;
    setPersonalityColors([hex, invHex, '#ffffff']);
  };

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(analyzeFrame, 500); // Analyze twice a second
    }
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <section className="chameleon-section">
      <div className="chameleon-header">
        <h2>The Chameleon Engine</h2>
        <p>Extract color theory directly from your physical environment.</p>
      </div>

      <div className="chameleon-workspace">
        <div className="camera-feed" style={{ borderColor: extractedColor }}>
          <video ref={videoRef} autoPlay playsInline muted style={{ display: isActive ? 'block' : 'none' }} />
          <canvas ref={canvasRef} width="64" height="64" style={{ display: 'none' }} />
          
          {!isActive && (
            <div className="camera-placeholder">
              <Camera size={48} opacity={0.5} />
              <p>Camera inactive</p>
            </div>
          )}

          {error && <div className="camera-error">{error}</div>}

          <div className="camera-controls">
            {!isActive ? (
              <button onClick={startCamera}>Start Live Extraction</button>
            ) : (
              <button className="stop" onClick={stopCamera}><CameraOff size={16}/> Stop Extraction</button>
            )}
          </div>
        </div>

        <div className="extraction-data">
          <h3>Live Extraction</h3>
          <AnimatePresence>
            {isActive ? (
              <motion.div 
                className="live-color-card"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ backgroundColor: extractedColor }}
              >
                <div className="hex-readout">{extractedColor}</div>
                <div className="scanning-bar" />
              </motion.div>
            ) : (
              <div className="waiting-state">Waiting for video feed...</div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Chameleon;
