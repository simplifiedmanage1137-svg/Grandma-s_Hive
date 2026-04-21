import React, { useState, useEffect, useRef } from 'react';

const Hero = () => {
  const [imagesTrail, setImagesTrail] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const containerRef = useRef(null);
  const lastPosition = useRef({ x: 0, y: 0 });
  const currentIndex = useRef(0);

  const MOVE_THRESHOLD = 50;

  const imageDatabase = [
    'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop',
  ];

  // Detect touch device
  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);
    return () => window.removeEventListener('resize', checkTouchDevice);
  }, []);

  // Handle adding trail image
  const addTrailImage = (x, y) => {
    const imageSrc = imageDatabase[currentIndex.current];
    currentIndex.current = (currentIndex.current + 1) % imageDatabase.length;

    const newImage = {
      id: Date.now() + Math.random(),
      src: imageSrc,
      x,
      y,
      rotation: Math.random() * 14 - 7,
    };

    setImagesTrail((prev) => [...prev, newImage]);

    setTimeout(() => {
      setImagesTrail((prev) => prev.filter((img) => img.id !== newImage.id));
    }, 1000);
  };

  // Throttled mouse/touch move handler
  const handleMove = (clientX, clientY) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Check boundaries
    if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;

    const dx = x - lastPosition.current.x;
    const dy = y - lastPosition.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < MOVE_THRESHOLD) return;

    lastPosition.current = { x, y };
    addTrailImage(x, y);
  };

  // Mouse event handlers (desktop only)
  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e) => {
      if (!isHovering) return;
      handleMove(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovering, isTouchDevice]);

  // Touch event handlers for mobile
  useEffect(() => {
    if (!isTouchDevice) return;

    const handleTouchStart = (e) => {
      setIsHovering(true);
      const touch = e.touches[0];
      if (touch) {
        lastPosition.current = { x: 0, y: 0 }; // Reset position on touch start
        handleMove(touch.clientX, touch.clientY);
      }
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      if (touch && isHovering) {
        handleMove(touch.clientX, touch.clientY);
      }
    };

    const handleTouchEnd = () => {
      setIsHovering(false);
      setImagesTrail([]);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart);
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd);
      container.addEventListener('touchcancel', handleTouchEnd);
      
      return () => {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
        container.removeEventListener('touchcancel', handleTouchEnd);
      };
    }
  }, [isTouchDevice, isHovering]);

  const renderWaveText = (text, baseDelay = 0) => {
    return text.split("").map((char, i) => (
      <span key={i} className="wave-char" style={{ "--idx": i + baseDelay }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <>
      <div
        className="hero"
        ref={containerRef}
        onMouseEnter={() => !isTouchDevice && setIsHovering(true)}
        onMouseLeave={() => !isTouchDevice && setIsHovering(false)}
      >
        <div className="text-layer">
          <h1 className="hero-title strange">
            {renderWaveText("GRANDMA'S")}
          </h1>
          <h1 className="hero-title pixels">
            {renderWaveText("HIVE", 7)}
          </h1>
        </div>

        <div className="trail-layer">
          {imagesTrail.map((img) => (
            <div
              key={img.id}
              className="trail-img-box"
              style={{
                left: img.x,
                top: img.y,
                transform: `translate(-50%, -50%) rotate(${img.rotation}deg)`
              }}
            >
              <img src={img.src} alt="Portfolio Work" loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile instruction text */}
      {isTouchDevice && (
        <div className="mobile-instruction">
          👆 Touch and drag on the screen above to see images
        </div>
      )}

      <div className="sub-text-section">
        <div className="sub-text-content">
          <p className="description-wave">
            {renderWaveText("We are an international studio collective that helps brands craft unique digital experiences.", 0)}
          </p>
        </div>
      </div>

      <style>{`
        .hero {
          position: relative;
          width: 100%;
          height: 100vh;
          background: #f8f9fa; 
          overflow: hidden;
          cursor: crosshair;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Touch device adjustments */
        @media (hover: none) and (pointer: coarse) {
          .hero {
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
          }
        }

        .text-layer {
          position: relative;
          z-index: 50; 
          pointer-events: none;
          text-align: center;
        }

        .hero-title {
          font-family: 'Inter', sans-serif;
          font-weight: 900;
          font-size: 14vw;
          line-height: 0.9;
          margin: 0;
          color: #111;
          display: flex;
          justify-content: center;
        }

        .pixels {
          color: transparent;
          -webkit-text-stroke: 1.5px #111;
        }

        /* Mobile instruction text */
        .mobile-instruction {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.7);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          z-index: 1000;
          pointer-events: none;
          white-space: nowrap;
          font-family: sans-serif;
          animation: fadeOut 3s ease-out forwards;
        }

        @keyframes fadeOut {
          0% { opacity: 1; }
          70% { opacity: 1; }
          100% { opacity: 0; visibility: hidden; }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 14vw;
          }
        }

        @media (max-width: 480px) {
          .pixels {
            -webkit-text-stroke: 1px #111;
          }
        }

        /* --- WATER WAVE ANIMATION CORE --- */
        .wave-char {
          display: inline-block;
          animation: waterWave 3s ease-in-out infinite;
          animation-delay: calc(var(--idx) * 0.1s);
          transform-origin: center bottom;
        }

        @keyframes waterWave {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          33% {
            transform: translateY(-15px) rotate(2deg) scaleX(1.05);
          }
          66% {
            transform: translateY(10px) rotate(-2deg) scaleX(0.95);
          }
        }

        @media (max-width: 768px) {
          @keyframes waterWave {
            0%, 100% {
              transform: translateY(0) rotate(0deg);
            }
            33% {
              transform: translateY(-8px) rotate(1deg) scaleX(1.03);
            }
            66% {
              transform: translateY(6px) rotate(-1deg) scaleX(0.97);
            }
          }
        }

        .trail-layer {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
        }

        .trail-img-box {
          position: absolute;
          width: 300px;
          height: 200px;
          overflow: hidden;
          border-radius: 4px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          animation: fadePop 1s ease-out forwards;
          border: 1px solid rgba(255,255,255,0.9);
          pointer-events: none;
        }

        .trail-img-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @keyframes fadePop {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
          20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1.1); }
        }

        /* Responsive trail images */
        @media (max-width: 768px) {
          .trail-img-box {
            width: 180px;
            height: 120px;
          }
        }

        @media (max-width: 480px) {
          .trail-img-box {
            width: 140px;
            height: 93px;
          }
        }

        /* Description Wave Styles */
        .sub-text-section {
          padding: 100px 60px;
          background: #f8f9fa;
          overflow: hidden;
        }

        .description-wave {
          font-family: sans-serif;
          font-size: 3.5vw;
          line-height: 1.3;
          font-weight: 500;
          color: #222;
          max-width: 90%;
        }

        .description-wave .wave-char {
          animation-duration: 5s;
          animation-delay: calc(var(--idx) * 0.05s);
        }

        @media (max-width: 768px) {
          .sub-text-section {
            padding: 60px 30px;
          }
          .description-wave {
            font-size: 24px;
            max-width: 100%;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .description-wave {
            font-size: 3vw;
          }
        }

        /* Important: Ensure touch events work properly */
        .hero {
          touch-action: none; /* Prevents scrolling while touching the hero area */
          user-select: none; /* Prevents text selection on mobile */
          -webkit-user-select: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .wave-char {
            animation: none;
          }
          .trail-img-box {
            animation: fadePop 0.5s ease-out forwards;
          }
        }
      `}</style>
    </>
  );
};

export default Hero;