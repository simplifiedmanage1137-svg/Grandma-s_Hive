import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const WorkCard = ({ title, description, category, video, link }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  // --- Advanced 3D Tilt Logic ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove);
      document.body.classList.add('hide-cursor');
    } else {
      document.body.classList.remove('hide-cursor');
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.classList.remove('hide-cursor');
    };
  }, [isHovered]);

  return (
    <>
      <style>
        {`
          .hide-cursor, .hide-cursor * { cursor: none !important; }
          .perspective-container { perspective: 1200px; }
        `}
      </style>

      <motion.div
        ref={cardRef}
        className="perspective-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => window.location.href = link}
        style={{
          rotateX,
          rotateY,
          zIndex: isHovered ? 10 : 1,
        }}
      >
        <motion.div
          animate={{
            backgroundColor: isHovered ? '#000000' : 'rgba(255,255,255,0)',
            scale: isHovered ? 1.02 : 1
          }}
          style={{
            borderRadius: '24px',
            padding: '12px',
            transition: 'background-color 0.4s ease',
            cursor: 'none'
          }}
        >
          {/* Video / Image Container */}
          <div style={{
            position: 'relative',
            aspectRatio: '16/11',
            overflow: 'hidden',
            borderRadius: '18px',
            backgroundColor: '#e5e5e5'
          }}>
            <motion.video
              src={video}
              loop muted playsInline autoPlay
              animate={{
                scale: isHovered ? 1.15 : 1,
                x: isHovered ? x.get() * 20 : 0, // Magnetic movement
                y: isHovered ? y.get() * 20 : 0
              }}
              transition={{ type: 'spring', stiffness: 100, damping: 30 }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            
            {/* Dark Overlay for better text contrast */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0.4 : 0 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: '#000'
              }}
            />
          </div>

          {/* Text Content */}
          <div style={{ padding: '24px 12px 12px' }}>
            <motion.div
              animate={{ y: isHovered ? -5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 style={{
                fontSize: '26px',
                fontWeight: '900',
                color: isHovered ? '#fff' : '#000',
                margin: 0,
                letterSpacing: '-0.02em',
                transition: 'color 0.3s ease'
              }}>
                {title}
              </h3>
              
              <p style={{
                fontSize: '16px',
                color: isHovered ? '#ccc' : '#444',
                margin: '8px 0 12px',
                lineHeight: '1.4',
                transition: 'color 0.3s ease'
              }}>
                {description}
              </p>

              <div style={{
                fontSize: '12px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: isHovered ? '#0066FF' : '#999',
                transition: 'color 0.3s ease'
              }}>
                {category}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* FIXED: Custom Blue Square Cursor with correct camelCase */}
      {isHovered && (
        <motion.div
          initial={{ scale: 0, x: mousePos.x, y: mousePos.y }}
          animate={{ scale: 1, x: mousePos.x, y: mousePos.y }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '50px',
            height: '50px',
            backgroundColor: '#0066FF',
            border: '2px solid #ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 99999,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <span style={{ color: '#ffffff', fontSize: '24px', fontWeight: 'bold' }}>→</span>
        </motion.div>
      )}
    </>
  );
};

export default WorkCard;