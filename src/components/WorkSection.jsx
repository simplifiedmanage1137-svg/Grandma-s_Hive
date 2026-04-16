import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import WorkCard from './WorkCard';

const workItems = [
  {
    id: 1,
    title: 'Wing',
    description: 'Eco-friendly drone Delivery Solutions',
    category: 'Marketing Website',
    video: 'https://framerusercontent.com/assets/hQUXKbpvYZyElXRxbNmW95ph8Q.mp4',
    link: '/work/wing'
  },
  {
    id: 2,
    title: 'Fantom',
    description: 'Rollerskating and Music',
    category: 'Marketing Website & Ecommerce',
    video: 'https://framerusercontent.com/assets/XzKm3c6TBPnQY2RLiGOpjE83OU0.mp4',
    link: '/work/fantom'
  },
  {
    id: 3,
    title: 'Swisher',
    description: 'Pre-rolled Blunt Experience',
    category: 'Marketing Website',
    video: 'https://framerusercontent.com/assets/LqHnLVpPrDaiM1FZ63ODyW25jaw.mp4',
    link: '/work/swisher'
  }
];

const WorkSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    requestAnimationFrame(() => {
      setMousePos({ x: e.clientX, y: e.clientY });
    });
  }, []);

  useEffect(() => {
    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'none';
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = '';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = '';
    };
  }, [isHovered, handleMouseMove]);

  return (
    <section id="work" className="py-5">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-5"
        >
          <p className="text-uppercase mb-3" style={{ fontFamily: "'Lay Grotesk - Trial Black', sans-serif", fontSize: '24px' }}>Selected Work</p>
        </motion.div>

        <div className="row g-4">
          {workItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="col-md-6 col-lg-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <WorkCard {...item} />
            </motion.div>
          ))}
        </div>

        <div className="row mt-5">
          <div className="col-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="d-flex justify-content-end"
            >
              <div 
                className="work-more-wrapper"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="work-more-content">
                  <h3 className="eager-text">eager for more?</h3>
                  <a href="/work" className="work-link">
                    <span className="work-link-text">SEE SOME OTHER WORK WE HAVE DONE</span>
                    <span className="work-link-arrow">→</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- Updated Scrolling Text Section with Image --- */}
      <div className="scrolling-text-container-with-bg">
        {/* Dark Overlay for Text Readability */}
        <div className="scrolling-bg-overlay"></div>
        
        <div className="scrolling-text-wrapper">
          <div className="scrolling-text">
            MAKE LOVE, NOT NOISE &nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;
            MAKE LOVE, NOT NOISE &nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;
            MAKE LOVE, NOT NOISE &nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;
            MAKE LOVE, NOT NOISE &nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;
          </div>
          <div className="scrolling-text">
            MAKE LOVE, NOT NOISE &nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;
            MAKE LOVE, NOT NOISE &nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;
            MAKE LOVE, NOT NOISE &nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;
            MAKE LOVE, NOT NOISE &nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;
          </div>
        </div>
      </div>

      {/* Custom Blue Square Cursor */}
      {isHovered && (
        <div
          style={{
            position: 'fixed',
            top: mousePos.y,
            left: mousePos.x,
            width: '40px',
            height: '40px',
            backgroundColor: '#0066FF',
            border: '2px solid #ffffff',
            borderRadius: '0px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 99999,
            transition: 'transform 0.05s ease',
          }}
        >
          <span style={{ color: '#ffffff', fontSize: '24px', fontWeight: 'bold', marginLeft: '4px' }}>→</span>
        </div>
      )}

      <style>
        {`
          .work-more-wrapper {
            display: inline-block;
            cursor: pointer;
          }

          .work-more-content {
            text-align: left;
            padding: 16px 24px;
            border-radius: 12px;
            transition: background-color 0.3s ease;
          }

          .work-more-wrapper:hover .work-more-content {
            background-color: #000000;
          }

          .work-more-wrapper:hover .eager-text,
          .work-more-wrapper:hover .work-link-text,
          .work-more-wrapper:hover .work-link-arrow {
            color: #ffffff;
          }

          .eager-text {
            font-size: 24px;
            font-weight: 400;
            margin-bottom: 8px;
            color: #000;
            letter-spacing: -0.02em;
            transition: color 0.3s ease;
          }

          .work-link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            text-decoration: none;
            position: relative;
          }

          .work-link-text {
            font-size: 12px;
            letter-spacing: 1.5px;
            font-weight: 500;
            color: #000;
          }

          .work-link-arrow {
            font-size: 16px;
            color: #000;
          }

          .work-link:hover .work-link-text,
          .work-link:hover .work-link-arrow {
            color: #0066FF;
          }

          /* --- BACKGROUND SCROLLING TEXT STYLES --- */
          .scrolling-text-container-with-bg {
            width: 100%;
            height: 350px; /* Fixed height for impact */
            overflow: hidden;
            margin-top: 60px;
            position: relative;
            display: flex;
            align-items: center;
            /* Social Media Marketing Image Background */
            background-image: url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop');
            background-size: cover;
            background-position: center;
            background-attachment: fixed; /* Parallax effect */
          }

          .scrolling-bg-overlay {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.4); /* Darkens the image for white text contrast */
            z-index: 1;
          }

          .scrolling-text-wrapper {
            display: flex;
            white-space: nowrap;
            z-index: 2;
            animation: scrollText 40s linear infinite;
          }

          .scrolling-text {
            display: inline-block;
            font-size: clamp(60px, 12vw, 120px);
            font-weight: 900;
            letter-spacing: -2px;
            color: #ffffff; /* White text on dark image overlay */
            font-family: 'Lay Grotesk - Trial Black', sans-serif;
            text-transform: uppercase;
          }

          @keyframes scrollText {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          @media (max-width: 768px) {
            .scrolling-text-container-with-bg { height: 200px; }
            .scrolling-text { font-size: 40px; }
            .d-flex.justify-content-end { justify-content: center !important; }
          }
        `}
      </style>
    </section>
  );
};

export default WorkSection;