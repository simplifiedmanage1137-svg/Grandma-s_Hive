import React from 'react';
import { motion } from 'framer-motion';

const capabilities = [
  {
    title: 'UI/UX',
    number: '1',
    image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1000'
  },
  {
    title: 'Branding',
    number: '2',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000'
  },
  {
    title: 'Motion',
    number: '3',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000'
  },
  {
    title: 'Web3',
    number: '4',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000'
  }
];

const Capabilities = () => {
  return (
    <section style={{ backgroundColor: '#f4f4f4', padding: '60px 0' }}>
      <div className="container">
        <div
          className="row g-0"
          style={{
            borderTop: '1px solid rgba(0,0,0,0.1)',
            borderLeft: '1px solid rgba(0,0,0,0.1)'
          }}
        >
          {capabilities.map((cap, idx) => (
            <div
              key={idx}
              className="col-md-6 capability-box"
              style={{
                height: '300px', // 🔥 reduced from 450px
                position: 'relative',
                overflow: 'hidden',
                borderRight: '1px solid rgba(0,0,0,0.1)',
                borderBottom: '1px solid rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#111',
                cursor: 'pointer'
              }}
            >
              {/* Background Image Animation */}
              <motion.img
                src={cap.image}
                alt={cap.title}
                animate={{
                  x: ['0%', '-10%', '0%']
                }}
                transition={{
                  duration: 25,
                  ease: 'linear',
                  repeat: Infinity,
                  repeatType: 'mirror'
                }}
                style={{
                  position: 'absolute',
                  width: '115%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 1
                }}
              />

              {/* Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  zIndex: 2
                }}
              />

              {/* Title */}
              <motion.h2
                animate={{
                  y: [0, -6, 0] // slightly reduced movement
                }}
                transition={{
                  duration: 4,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'mirror',
                  delay: idx * 0.2
                }}
                style={{
                  fontSize: 'clamp(24px, 4vw, 45px)', // 🔥 smaller text
                  textTransform: 'uppercase',
                  color: '#fff',
                  fontWeight: '900',
                  zIndex: 3,
                  margin: 0
                }}
              >
                {cap.title}
              </motion.h2>

              {/* Glow Circle */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{
                  duration: 3,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'mirror'
                }}
                style={{
                  position: 'absolute',
                  bottom: '15px',
                  left: '15px',
                  width: '45px', // 🔥 reduced
                  height: '45px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #dbff00, transparent)',
                  zIndex: 4
                }}
              />

              {/* Number */}
              <motion.span
                animate={{
                  color: ['rgba(255,255,255,0.5)', '#fff', 'rgba(255,255,255,0.5)']
                }}
                transition={{
                  duration: 5,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'mirror',
                  delay: idx * 0.3
                }}
                style={{
                  position: 'absolute',
                  left: '22px',
                  bottom: '18px',
                  fontSize: '14px', // 🔥 smaller
                  fontWeight: '900',
                  zIndex: 5
                }}
              >
                {cap.number}
              </motion.span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;