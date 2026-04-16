import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const InteractiveBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const bannerRef = useRef(null);
  
  // Images for different cursor positions
  const images = [
    {
      id: 1,
      url: "https://framerusercontent.com/images/hQUXKbpvYZyElXRxbNmW95ph8Q.mp4", // Wing video
      title: "Wing",
      position: "left"
    },
    {
      id: 2,
      url: "https://framerusercontent.com/images/XzKm3c6TBPnQY2RLiGOpjE83OU0.mp4", // Fantom video
      title: "Fantom",
      position: "center-left"
    },
    {
      id: 3,
      url: "https://framerusercontent.com/images/LqHnLVpPrDaiM1FZ63ODyW25jaw.mp4", // Swisher video
      title: "Swisher",
      position: "center"
    },
    {
      id: 4,
      url: "https://framerusercontent.com/images/R4awib6TjNZjrU13Fc8KHDvZig.png", // Team image
      title: "Team",
      position: "center-right"
    },
    {
      id: 5,
      url: "https://framerusercontent.com/images/9xtgo3K6XQ9xDg87e8qbD1QWPk.svg", // Logo
      title: "Logo",
      position: "right"
    }
  ];
  
  // Mouse position tracking with spring for smooth animation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  
  // Calculate which image to show based on cursor position
  const updateImageByCursor = (x, containerWidth) => {
    const percentage = (x / containerWidth) * 100;
    
    if (percentage < 20) {
      setActiveIndex(0); // Leftmost
    } else if (percentage < 40) {
      setActiveIndex(1); // Center-left
    } else if (percentage < 60) {
      setActiveIndex(2); // Center
    } else if (percentage < 80) {
      setActiveIndex(3); // Center-right
    } else {
      setActiveIndex(4); // Rightmost
    }
  };
  
  const handleMouseMove = (e) => {
    if (!bannerRef.current) return;
    
    const rect = bannerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setCursorPosition({ x, y });
    mouseX.set(x);
    mouseY.set(y);
    
    updateImageByCursor(x, rect.width);
  };
  
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    setActiveIndex(2); // Reset to center image
  };
  
  return (
    <section 
      ref={bannerRef}
      className="interactive-banner"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#0e0c0c',
        cursor: 'none'
      }}
    >
      {/* Background Images/Video */}
      <div className="banner-media-container">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            className="banner-media"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: activeIndex === index ? 1 : 0,
              scale: activeIndex === index ? 1 : 1.1,
              filter: activeIndex === index ? 'blur(0px)' : 'blur(10px)'
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              pointerEvents: 'none'
            }}
          >
            {image.url.endsWith('.mp4') ? (
              <video
                src={image.url}
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <img
                src={image.url}
                alt={image.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Gradient Overlay for better text readability */}
      <div 
        className="banner-overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%)',
          pointerEvents: 'none'
        }}
      />
      
      {/* Content */}
      <div className="banner-content" style={{
        position: 'relative',
        zIndex: 10,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
        padding: '0 20px'
      }}>
        <motion.h1
          key={activeIndex}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "'Lay Grotesk - Trial Black', sans-serif",
            fontSize: 'clamp(2rem, 8vw, 6rem)',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          {images[activeIndex].title}
        </motion.h1>
        
        <motion.p
          key={`desc-${activeIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontFamily: "'Lay Grotesk - Trial Medium', sans-serif",
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            maxWidth: '600px',
            margin: '0 auto'
          }}
        >
          Move your cursor across the screen to explore our work
        </motion.p>
        
        {/* Cursor indicator */}
        {isHovering && (
          <motion.div
            className="cursor-indicator"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              position: 'absolute',
              left: cursorPosition.x,
              top: cursorPosition.y,
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(219,255,0,0.3) 0%, rgba(219,255,0,0) 70%)',
              pointerEvents: 'none',
              transform: 'translate(-50%, -50%)',
              zIndex: 20
            }}
          />
        )}
      </div>
      
      {/* Position indicators */}
      <div className="position-indicators" style={{
        position: 'absolute',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '12px',
        zIndex: 20
      }}>
        {images.map((_, index) => (
          <div
            key={index}
            style={{
              width: activeIndex === index ? '40px' : '8px',
              height: '8px',
              borderRadius: '4px',
              backgroundColor: activeIndex === index ? '#dbff00' : 'rgba(255,255,255,0.5)',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        .interactive-banner {
          position: relative;
          cursor: none;
        }
        
        .banner-media-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        @media (max-width: 768px) {
          .interactive-banner {
            cursor: auto;
          }
          
          .cursor-indicator {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default InteractiveBanner;