import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top ${
        isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
      style={{
        padding: '16px 0',
        transition: 'all 0.3s ease',
        zIndex: 1000,
      }}
    >
      <div className="container">
        {/* Logo */}
        <motion.a
          className="navbar-brand text-logo-wrapper"
          href="/"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            fontFamily: "'Lay Grotesk - Trial Black', sans-serif",
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: '900',
            color: '#0e0c0c',
            textDecoration: 'none',
            letterSpacing: '-1px',
          }}
        >
          Grandma's Hive
        </motion.a>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div
          className={`collapse navbar-collapse justify-content-end ${
            isMobileMenuOpen ? 'show' : ''
          }`}
        >
          <ul className="navbar-nav gap-4 align-items-center">
            {['WORK', 'ABOUT', 'SERVICES', 'CLIENTS', 'CONTACT'].map((item) => (
              <li className="nav-item" key={item}>
                <motion.a
                  className="nav-link"
                  href={`#${item.toLowerCase()}`}
                  whileHover={{ skewX: -5 }}
                >
                  {item}
                </motion.a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 🔥 UPDATED CSS */}
      <style>
        {`
          .navbar-nav .nav-item {
            display: flex;
            align-items: center;
          }

          .navbar-nav .nav-link {
            font-family: 'Lay Grotesk - Trial Black', sans-serif;
            font-size: 24px;
            font-weight: 900;
            color: #0e0c0c !important;

            display: inline-block !important;
            width: auto !important;

            padding: 1px 4px !important; /* 👈 reduced */
            margin: 0 !important;

            line-height: 1 !important;
            border-radius: 3px; /* 👈 tighter corners */

            text-transform: uppercase;
            transition: all 0.2s ease;
          }

          .navbar-nav .nav-link:hover,
          .navbar-nav .nav-link:focus,
          .navbar-nav .nav-link:active,
          .navbar-nav .nav-link:focus-visible {
            background-color: transparent !important;
            outline: none !important;
            box-shadow: none !important;
          }

          .navbar-toggler {
            padding: 0;
            background-color: transparent;
          }

          .bg-transparent .navbar-toggler-icon {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 0, 0, 1%29' stroke-width='3' stroke-linecap='round' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
          }

          @media (max-width: 991px) {
            .navbar-collapse.show {
              background-color: #fff;
              position: absolute;
              top: 100%;
              left: 0;
              width: 100%;
              padding: 20px;
              border-radius: 12px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }

            .navbar-nav {
              gap: 10px !important;
              text-align: center;
            }

            .nav-link {
              font-size: 20px !important;
            }

            .text-logo-wrapper {
              font-size: 28px !important;
            }
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;