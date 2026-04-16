import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const images = [
  { id: 1, url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200", title: "Strategy" },
  { id: 2, url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200", title: "Marketing" },
  { id: 3, url: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=1200", title: "Design" },
  { id: 4, url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200", title: "Growth" },
  { id: 5, url: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=1200", title: "Analytics" },
  { id: 6, url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200", title: "Development" },
  { id: 7, url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200", title: "Innovation" },
  { id: 8, url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200", title: "Teamwork" },
];

const CARD_WIDTH = 40;  // vw
const GAP = 15;         // vw

const HorizontalScrollSection = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  const totalCards = images.length;

  /**
   * ✅ TRUE SNAP LOGIC
   */
  const x = useTransform(scrollYProgress, (value) => {
    const index = Math.round(value * (totalCards - 1)); // 🔥 snap to nearest card
    const move = index * (CARD_WIDTH + GAP);
    return `-${move}vw`;
  });

  /**
   * ✅ Smooth snapping animation
   */
  const smoothX = useSpring(x, {
    stiffness: 120,
    damping: 20,
  });

  return (
    <section
      ref={targetRef}
      style={{
        height: `${images.length * 100}vh`,
        backgroundColor: "#0e0c0c",
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center'
        }}
      >

        {/* CENTER BOX */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: `${CARD_WIDTH}vw`,
            height: '55vh',
            border: '1px solid rgba(255,255,255,0.3)',
            zIndex: 10,
            pointerEvents: 'none',
            boxShadow: '0 0 0 2000px rgba(0,0,0,0.85)'
          }}
        />

        {/* TRACK */}
        <motion.div
          style={{
            x: smoothX,
            display: 'flex',
            paddingLeft: `calc(50vw - ${CARD_WIDTH / 2}vw)` // 🔥 perfect center alignment
          }}
        >
          {images.map((item) => (
            <div
              key={item.id}
              style={{
                minWidth: `${CARD_WIDTH}vw`,
                height: '55vh',
                marginRight: `${GAP}vw`
              }}
            >
              <ImageItem item={item} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ImageItem = ({ item }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <img
        src={item.url}
        alt={item.title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          color: '#fff',
          fontWeight: 'bold'
        }}
      >
        {item.title}
      </div>
    </div>
  );
};

export default HorizontalScrollSection;