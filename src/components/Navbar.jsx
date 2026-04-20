import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Services data with images
  const services = [
    { id: 1, name: '3D Motion Art', path: '/services/1', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=60&h=60&fit=crop' },
    { id: 2, name: 'Digital Strategy', path: '/services/2', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=60&h=60&fit=crop' },
    { id: 3, name: 'UI/UX Design', path: '/services/3', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=60&h=60&fit=crop' },
    { id: 4, name: 'WebGL Development', path: '/services/4', image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=60&h=60&fit=crop' },
    { id: 5, name: 'Interactive Experiences', path: '/services/5', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=60&h=60&fit=crop' },
    { id: 6, name: 'Brand Identity', path: '/services/6', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=60&h=60&fit=crop' },
    { id: 7, name: 'Mobile App Development', path: '/services/7', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=60&h=60&fit=crop' },
    { id: 8, name: 'E-commerce Solutions', path: '/services/8', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=60&h=60&fit=crop' },
    { id: 9, name: 'AI & Machine Learning', path: '/services/9', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=60&h=60&fit=crop' },
    { id: 10, name: 'Cloud Solutions', path: '/services/10', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=60&h=60&fit=crop' }
  ];

  // Full service details for navigation
  const getFullServiceDetails = (service) => {
    const serviceDetails = {
      1: { fullDesc: 'We create breathtaking 3D motion graphics that captivate audiences and elevate your brand story.', features: ['Custom 3D Animations', 'Product Visualizations', 'Abstract Motion Graphics', 'Cinematic 3D Sequences', 'Real-time 3D Rendering'], technologies: ['Blender', 'Cinema 4D', 'After Effects', 'Three.js'], color: '#dbff00', icon: '🎨' },
      2: { fullDesc: 'Our digital strategists work with you to develop comprehensive plans that align with your business goals.', features: ['Market Analysis', 'Competitor Research', 'User Journey Mapping', 'ROI Forecasting', 'Growth Strategies'], technologies: ['Google Analytics', 'SEMrush', 'Hotjar', 'Tableau'], color: '#0066FF', icon: '📊' },
      3: { fullDesc: 'We design beautiful, user-centered interfaces that are both functional and aesthetically pleasing.', features: ['User Research', 'Wireframing & Prototyping', 'UI Design Systems', 'Usability Testing', 'Accessibility Design'], technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision'], color: '#ff3366', icon: '🎯' },
      4: { fullDesc: 'Leverage the power of WebGL to create stunning 3D experiences directly in the browser.', features: ['3D Product Configurators', 'Interactive Environments', 'Particle Systems', 'Shader Development', 'Performance Optimization'], technologies: ['Three.js', 'WebGL', 'Babylon.js', 'ShaderToy'], color: '#00ffcc', icon: '🌐' },
      5: { fullDesc: 'Create memorable interactive experiences that engage users and drive conversions.', features: ['Gamification', 'Interactive Storytelling', 'Gesture Controls', 'VR/AR Experiences', 'Touch Interfaces'], technologies: ['Unity', 'WebXR', 'GSAP', 'React Spring'], color: '#ffaa00', icon: '🎮' },
      6: { fullDesc: 'Build a strong brand identity that resonates with your audience.', features: ['Logo Design', 'Brand Guidelines', 'Visual Identity Systems', 'Brand Strategy', 'Brand Voice Development'], technologies: ['Illustrator', 'Photoshop', 'Procreate', 'FontForge'], color: '#dbff00', icon: '💎' },
      7: { fullDesc: 'Develop high-performance mobile applications for iOS and Android.', features: ['iOS Development', 'Android Development', 'Cross-platform Apps', 'App Store Optimization', 'Mobile UI/UX'], technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin'], color: '#0066FF', icon: '📱' },
      8: { fullDesc: 'Build feature-rich e-commerce platforms that drive sales and provide seamless shopping experiences.', features: ['Custom E-commerce Development', 'Payment Gateway Integration', 'Inventory Management', 'Shopping Cart Optimization', 'SEO for E-commerce'], technologies: ['Shopify', 'WooCommerce', 'Magento', 'Stripe'], color: '#ff3366', icon: '🛒' },
      9: { fullDesc: 'Harness the power of artificial intelligence to automate processes, gain insights, and deliver personalized experiences.', features: ['Predictive Analytics', 'Natural Language Processing', 'Computer Vision', 'Recommendation Systems', 'Chatbot Development'], technologies: ['TensorFlow', 'PyTorch', 'OpenAI', 'Scikit-learn'], color: '#00ffcc', icon: '🤖' },
      10: { fullDesc: 'Migrate and manage your infrastructure on the cloud for better scalability, security, and cost-efficiency.', features: ['Cloud Migration', 'DevOps Services', 'Serverless Architecture', 'Cloud Security', 'Cost Optimization'], technologies: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes'], color: '#ffaa00', icon: '☁️' }
    };
    return serviceDetails[service.id] || {};
  };

  // Function to handle navigation
  const handleNavigation = (item) => {
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
    
    if (item === 'HOME') {
      navigate('/');
    } else if (item === 'ABOUT') {
      navigate('/about');
    } else if (item === 'SERVICES') {
      navigate('/services');
    } else if (item === 'CONTACT') {
      navigate('/contact');
    } else if (item === 'INSIGHTS') {
      navigate('/insights');
    }
  };

  const handleServiceClick = (service) => {
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
    const details = getFullServiceDetails(service);
    navigate(service.path, { state: { service: { ...service, ...details } } });
  };

  const handleViewAllServices = () => {
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
    navigate('/services');
  };

  const navTabs = ['HOME', 'ABOUT', 'SERVICES', 'CONTACT', 'INSIGHTS'];

  // Determine if a tab is active
  const isActive = (item) => {
    if (item === 'HOME' && location.pathname === '/') return true;
    if (item === 'ABOUT' && location.pathname === '/about') return true;
    if (item === 'SERVICES' && location.pathname === '/services') return true;
    if (item === 'CONTACT' && location.pathname === '/contact') return true;
    if (item === 'INSIGHTS' && location.pathname === '/insights') return true;
    return false;
  };

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top ${isScrolled ? 'scrolled' : ''}`}
      style={{
        padding: '8px 0',  // Reduced from 16px to 8px
        transition: 'all 0.3s ease',
        zIndex: 1000,
        background: '#FFFFFF',
        boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.1)' : '0 2px 10px rgba(0,0,0,0.05)',
      }}
    >
      <div className="container">
        {/* Logo */}
        <motion.a
          className="navbar-brand text-logo-wrapper"
          onClick={() => navigate('/')}
          style={{
            fontFamily: "'Lay Grotesk - Trial Black', sans-serif",
            fontSize: 'clamp(24px, 3.5vw, 34px)',  // Reduced from 28px-40px to 24px-34px
            fontWeight: '900',
            color: '#000000',
            textDecoration: 'none',
            letterSpacing: '-1px',
            cursor: 'pointer',
            transition: 'color 0.3s ease',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Grandma's Hive
        </motion.a>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            backgroundColor: '#f0f0f0',
            borderRadius: '8px',
            padding: '6px 10px',  // Reduced padding
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div
          className={`collapse navbar-collapse justify-content-end ${
            isMobileMenuOpen ? 'show' : ''
          }`}
        >
          <ul className="navbar-nav gap-3 align-items-center">  {/* Reduced gap from 4 to 3 */}
            {navTabs.map((item) => (
              <li className="nav-item position-relative" key={item} ref={item === 'SERVICES' ? dropdownRef : null}>
                {item === 'SERVICES' ? (
                  <>
                    <motion.button
                      className={`nav-link-btn ${isActive(item) ? 'active' : ''}`}
                      onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                      whileHover={{ skewX: -5 }}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#000000',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      {item}
                      <span style={{ 
                        display: 'inline-block', 
                        transition: 'transform 0.3s ease',
                        transform: isServicesDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        fontSize: '12px'  // Reduced from 14px
                      }}>▼</span>
                    </motion.button>
                    
                    {/* Dropdown Menu */}
                    {isServicesDropdownOpen && (
                      <div className="services-dropdown">
                        <div className="dropdown-header">
                          <h6>OUR SERVICES</h6>
                          <button onClick={handleViewAllServices} className="view-all-btn">View All →</button>
                        </div>
                        <div className="dropdown-services-grid">
                          {services.map((service, idx) => (
                            <div
                              key={idx}
                              className="dropdown-service-item"
                              onClick={() => handleServiceClick(service)}
                            >
                              <div className="service-image-wrapper">
                                <img src={service.image} alt={service.name} className="service-dropdown-image" />
                              </div>
                              <div className="service-info">
                                <span className="service-name">{service.name}</span>
                                <span className="service-arrow">→</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="dropdown-footer">
                          <button onClick={handleViewAllServices} className="view-all-mobile">View All 10+ Services →</button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <motion.button
                    className={`nav-link-btn ${isActive(item) ? 'active' : ''}`}
                    onClick={() => handleNavigation(item)}
                    whileHover={{ skewX: -5 }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#000000',
                    }}
                  >
                    {item}
                  </motion.button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>
        {`
          .navbar-nav .nav-item {
            display: flex;
            align-items: center;
          }

          .navbar-nav .nav-link-btn {
            font-family: 'Lay Grotesk - Trial Black', sans-serif;
            font-size: 20px;  /* Reduced from 24px to 20px */
            font-weight: 900;
            display: inline-block !important;
            width: auto !important;
            padding: 0px 4px !important;  /* Reduced padding */
            margin: 0 !important;
            line-height: 1 !important;
            border-radius: 3px;
            text-transform: uppercase;
            transition: all 0.2s ease;
            text-decoration: none;
            background: none;
            border: none;
            cursor: pointer;
            color: #000000 !important;
          }

          .navbar-nav .nav-link-btn:hover {
            background-color: transparent !important;
            outline: none !important;
            color: #dbff00 !important;
          }

          .navbar-nav .nav-link-btn.active {
            color: #dbff00 !important;
            position: relative;
          }

          .navbar-nav .nav-link-btn.active::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            right: 0;
            height: 2px;
            background-color: #dbff00;
          }

          /* Dropdown Styles - White Background */
          .services-dropdown {
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            margin-top: 10px;  /* Reduced from 15px */
            background: #FFFFFF;
            border-radius: 16px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
            width: 520px;
            overflow: hidden;
            z-index: 1001;
            animation: dropdownFadeIn 0.3s ease;
            border: 1px solid rgba(0,0,0,0.1);
          }

          @keyframes dropdownFadeIn {
            from {
              opacity: 0;
              transform: translateX(-50%) translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
            }
          }

          .dropdown-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 20px;  /* Reduced from 15px */
            background: #f8f8f8;
            border-bottom: 1px solid #eee;
          }

          .dropdown-header h6 {
            margin: 0;
            font-size: 11px;  /* Reduced from 12px */
            font-weight: 700;
            color: #333;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .view-all-btn {
            background: none;
            border: none;
            color: #dbff00;
            font-size: 11px;  /* Reduced from 12px */
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .view-all-btn:hover {
            transform: translateX(3px);
            color: #a6cc00;
          }

          /* Grid layout for services - 3 items per row */
          .dropdown-services-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            padding: 8px;  /* Reduced from 10px */
            gap: 5px;
          }

          .dropdown-service-item {
            display: flex;
            align-items: center;
            gap: 8px;  /* Reduced from 10px */
            padding: 8px;  /* Reduced from 10px */
            cursor: pointer;
            transition: all 0.3s ease;
            border-radius: 8px;  /* Reduced from 10px */
            background: transparent;
          }

          .dropdown-service-item:hover {
            background: rgba(219,255,0,0.1);
            transform: translateX(5px);
          }

          .service-image-wrapper {
            width: 40px;  /* Reduced from 45px */
            height: 40px;  /* Reduced from 45px */
            border-radius: 8px;  /* Reduced from 10px */
            overflow: hidden;
            flex-shrink: 0;
          }

          .service-dropdown-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .service-info {
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 5px;
          }

          .service-name {
            font-size: 11px;  /* Reduced from 12px */
            font-weight: 600;
            transition: color 0.3s ease;
            color: #000000;
            line-height: 1.3;
          }

          .service-arrow {
            font-size: 12px;  /* Reduced from 14px */
            font-weight: bold;
            color: #999;
            transition: all 0.3s ease;
            flex-shrink: 0;
          }

          .dropdown-service-item:hover .service-arrow {
            color: #dbff00;
            transform: translateX(3px);
          }

          .dropdown-footer {
            padding: 10px 20px;  /* Reduced from 12px */
            background: #f8f8f8;
            border-top: 1px solid #eee;
            text-align: center;
          }

          .view-all-mobile {
            background: none;
            border: none;
            color: #dbff00;
            font-size: 11px;  /* Reduced from 13px */
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            transition: all 0.3s ease;
          }

          .view-all-mobile:hover {
            transform: translateX(5px);
            color: #a6cc00;
          }

          @media (max-width: 991px) {
            .navbar-collapse.show {
              background-color: #FFFFFF !important;
              position: absolute;
              top: 100%;
              left: 0;
              width: 100%;
              padding: 15px;  /* Reduced from 20px */
              border-radius: 12px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            .navbar-collapse.show .nav-link-btn {
              color: #000000 !important;
              font-size: 18px !important;  /* Reduced for mobile */
            }
            .navbar-nav {
              gap: 8px !important;  /* Reduced from 10px */
              text-align: center;
            }
            .navbar-nav .nav-link-btn {
              font-size: 18px;  /* Reduced from 20px */
              padding: 6px 4px !important;  /* Reduced from 8px */
            }
            
            /* Mobile dropdown styles */
            .services-dropdown {
              position: static;
              transform: none;
              margin-top: 8px;  /* Reduced from 10px */
              margin-bottom: 8px;  /* Reduced from 10px */
              width: 100%;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            
            .dropdown-services-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 8px;  /* Reduced from 10px */
            }
            
            @keyframes dropdownFadeIn {
              from {
                opacity: 0;
                transform: translateY(-10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          }

          @media (max-width: 480px) {
            .dropdown-services-grid {
              grid-template-columns: repeat(1, 1fr);
            }
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;