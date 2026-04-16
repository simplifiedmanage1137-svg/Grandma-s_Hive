import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <footer 
      id="contact" 
      style={{ 
        backgroundColor: '#0a0a0a', 
        color: '#ffffff',
        padding: '100px 0 40px 0',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.05)'
      }}
    >
      {/* 1. Ghost Text - Lowered Z-Index to prevent overlap */}
      <div style={{
        position: 'absolute',
        bottom: '-5%',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 'clamp(100px, 20vw, 350px)',
        fontFamily: "'Lay Grotesk - Trial Black', sans-serif",
        lineHeight: 0.7,
        opacity: 0.03, 
        color: '#ffffff',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        zIndex: 1, // Stay behind content
        width: '100%',
        textAlign: 'center'
      }}>
        STRANGE
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <motion.div 
          className="row g-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Left Column: Primary Contact */}
          <motion.div className="col-lg-6" variants={itemVariants}>
            <p style={{ 
              letterSpacing: '3px', 
              fontWeight: '600', 
              fontSize: '13px',
              color: '#dbff00',
              marginBottom: '30px'
            }}>
              / CONNECT WITH US
            </p>
            <h2 style={{ 
              fontFamily: "'Lay Grotesk - Trial Black', sans-serif", 
              fontSize: 'clamp(44px, 8vw, 85px)', 
              lineHeight: 0.9,
              marginBottom: '40px',
              letterSpacing: '-2px',
              textTransform: 'uppercase'
            }}>
              WANT TO<br />WORK?
            </h2>
            <div className="d-flex flex-column gap-2">
              <a href="mailto:hello@strangepixels.co" className="footer-link-main">hello@strangepixels.co</a>
              <a href="tel:+523338155238" className="footer-link-main">+52 33 3815 5238</a>
            </div>
          </motion.div>

          {/* Right Column: Locations */}
          <div className="col-lg-6">
            <div className="row g-4 h-100 align-items-end">
              <motion.div className="col-md-6" variants={itemVariants}>
                <h4 className="location-title">GUADALAJARA</h4>
                <address className="location-text">
                  Calzada de los Paraisos 239,<br />
                  Guadalajara, Mexico, 45054
                </address>
                <div className="mt-4 d-flex flex-wrap gap-2">
                  <div className="social-pill">INSTAGRAM</div>
                  <div className="social-pill">LINKEDIN</div>
                </div>
              </motion.div>

              <motion.div className="col-md-6" variants={itemVariants}>
                <h4 className="location-title">NEW YORK</h4>
                <address className="location-text">
                  348 6th Ave, FL 3<br />
                  Brooklyn, NY 11215
                </address>
                <div className="mt-4 d-flex flex-wrap gap-2">
                  <div className="social-pill">BEHANCE</div>
                  <div className="social-pill">DRIBBBLE</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Credits Bar */}
        <motion.div 
          className="row mt-5 pt-5 align-items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          <div className="col-md-6">
            <p className="mb-0" style={{ fontWeight: '400', color: '#666', fontSize: '12px' }}>
              All rights reserved ©2026 — Strange Pixels
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-0" style={{ fontSize: '12px', color: '#666' }}>
              Built with precision by <span style={{ color: '#dbff00' }}>Strange Family</span>
            </p>
          </div>
        </motion.div>
      </div>

      <style>
        {`
          .footer-link-main {
            font-family: 'Lay Grotesk - Trial Medium', sans-serif;
            font-size: clamp(18px, 2vw, 24px);
            color: #ffffff;
            text-decoration: none;
            width: fit-content;
            transition: all 0.3s ease;
            border-bottom: 1px solid transparent;
          }

          .footer-link-main:hover {
            color: #dbff00;
            border-bottom: 1px solid #dbff00;
          }

          .location-title {
            font-family: 'Lay Grotesk - Trial Black', sans-serif;
            font-size: 14px;
            margin-bottom: 15px;
            letter-spacing: 2px;
            color: #666;
          }

          .location-text {
            font-family: 'Lay Grotesk - Trial Medium', sans-serif;
            font-size: 15px;
            line-height: 1.5;
            font-style: normal;
            color: #aaa;
          }

          .social-pill {
            padding: 6px 14px;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 50px;
            font-size: 10px;
            font-weight: bold;
            cursor: pointer;
            transition: 0.3s;
            color: #fff;
          }

          .social-pill:hover {
            background-color: #dbff00;
            color: #000;
            border-color: #dbff00;
          }

          @media (max-width: 991px) {
            footer { padding: 60px 0 40px 0; }
            .col-lg-6 { margin-bottom: 40px; }
            .text-md-end { text-align: left !important; margin-top: 10px; }
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;