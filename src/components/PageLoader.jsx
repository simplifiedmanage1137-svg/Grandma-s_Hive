import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={styles.overlay}
        >
          {/* Outer glow pulse */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            style={styles.glowPulse}
          />

          <div style={styles.loaderWrapper}>
            {/* Outer ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              style={styles.outerRing}
            >
              <svg width="220" height="220" viewBox="0 0 220 220">
                <circle
                  cx="110" cy="110" r="100"
                  fill="none"
                  stroke="#dbff00"
                  strokeWidth="2.5"
                  strokeDasharray="8 10"
                  strokeLinecap="round"
                  opacity="0.6"
                />
                {/* Glowing accent dot on outer ring */}
                <circle cx="110" cy="10" r="4" fill="#dbff00" opacity="0.95" />
              </svg>
            </motion.div>

            {/* Middle ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              style={styles.middleRing}
            >
              <svg width="160" height="160" viewBox="0 0 160 160">
                <circle
                  cx="80" cy="80" r="70"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeDasharray="5 14"
                  strokeLinecap="round"
                  opacity="0.25"
                />
                {/* Glowing accent dot on middle ring */}
                <circle cx="80" cy="10" r="3" fill="#ffffff" opacity="0.8" />
              </svg>
            </motion.div>

            {/* Inner ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
              style={styles.innerRing}
            >
              <svg width="90" height="90" viewBox="0 0 90 90">
                <circle
                  cx="45" cy="45" r="36"
                  fill="none"
                  stroke="#dbff00"
                  strokeWidth="2"
                  strokeDasharray="4 8"
                  strokeLinecap="round"
                  opacity="0.9"
                />
                <circle cx="45" cy="9" r="3" fill="#dbff00" opacity="1" />
              </svg>
            </motion.div>

            {/* Center pulsing dot */}
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              style={styles.centerDot}
            />
          </div>

          {/* Brand name */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={styles.brandText}
          >
            Grandma's Hive
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    width: '100vw',
    height: '100vh',
    background: '#0e0c0c',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99999,
  },
  glowPulse: {
    position: 'absolute',
    width: '260px',
    height: '260px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(219,255,0,0.18) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  loaderWrapper: {
    position: 'relative',
    width: '220px',
    height: '220px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerRing: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  middleRing: {
    position: 'absolute',
    top: '30px',
    left: '30px',
  },
  innerRing: {
    position: 'absolute',
    top: '65px',
    left: '65px',
  },
  centerDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: '#dbff00',
    boxShadow: '0 0 12px 4px rgba(219,255,0,0.6)',
    position: 'absolute',
  },
  brandText: {
    marginTop: '40px',
    fontFamily: "'Lay Grotesk Black', sans-serif",
    fontSize: '18px',
    letterSpacing: '0.15em',
    color: 'rgba(255,255,255,0.5)',
    textTransform: 'uppercase',
  },
};

export default PageLoader;
