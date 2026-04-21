import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'Digital Strategy',
    items: ['Information architecture', 'Zone maps and wireframes', 'Content architecture', 'User journeys', 'Product validation']
  },
  {
    title: 'Digital Design',
    items: ['UX flows', 'Design toolkits', 'Web and app design', 'Motion and interaction', 'Design systems']
  },
  {
    title: 'Development',
    items: ['Product architecture', 'Front and back-end development', 'Development infrastructure', 'CI/CD pipelines', 'QA automation and visual testing']
  }
];

const ServicesSection = () => {
  return (
    <section 
      id="services" 
      className="services-section"
    >
      {/* Background Image Layer */}
      <div className="services-bg" />
      
      {/* Glass Box Background for Left Section */}
      <div className="glass-bg-wrapper">
        <motion.div 
          className="glass-box"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />
      </div>

      <div className="services-container">
        <div className="services-grid">
          
          {/* LEFT SECTION */}
          <div className="services-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="services-content"
            >
              <p className="services-label">
                (SERVICES)
              </p>
              
              <h1 className="services-title">
                Services designed to amplify User Experience.
              </h1>
            </motion.div>
          </div>

          {/* RIGHT SECTION */}
          <div className="services-right">
            <div className="services-cards">
              {services.map((service, index) => (
                <motion.div 
                  key={service.title}
                  className="service-card"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
                  viewport={{ once: true }}
                >
                  <div className="service-column">
                    <h4 className="service-heading">{service.title}</h4>
                    <ul className="service-list">
                      {service.items.map((item, idx) => (
                        <li key={idx} className="service-item">
                          <span className="service-dot"></span>
                          <span className="service-item-text">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          .services-section {
            position: relative;
            background-color: #000;
            color: #ffffff;
            padding: clamp(60px, 15vh, 140px) 0;
            overflow: hidden;
          }

          /* Background Image Layer */
          .services-bg {
            position: absolute;
            inset: 0;
            background-image: url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426');
            background-size: cover;
            background-position: center;
            filter: blur(8px) brightness(0.4);
            z-index: 0;
          }

          /* Mobile: reduce blur for performance */
          @media (max-width: 768px) {
            .services-bg {
              filter: blur(6px) brightness(0.45);
            }
          }

          /* Glass Box Wrapper */
          .glass-bg-wrapper {
            position: absolute;
            inset: 0;
            z-index: 1;
            pointer-events: none;
          }

          .glass-box {
            position: absolute;
            top: -40px;
            left: -40px;
            right: 20px;
            bottom: -40px;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
            border-radius: 24px;
            border: 1px solid rgba(255, 255, 255, 0.15);
          }

          /* Tablet: adjust glass box */
          @media (max-width: 991px) {
            .glass-box {
              top: -30px;
              left: -30px;
              right: -30px;
              bottom: -30px;
            }
          }

          /* Mobile: remove glass box for better performance */
          @media (max-width: 576px) {
            .glass-box {
              display: none;
            }
          }

          /* Container */
          .services-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 clamp(20px, 5vw, 60px);
            position: relative;
            z-index: 10;
          }

          /* Grid Layout */
          .services-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: clamp(30px, 6vw, 80px);
            align-items: start;
          }

          /* Tablet Layout */
          @media (max-width: 991px) {
            .services-grid {
              grid-template-columns: 1fr;
              gap: 50px;
            }
          }

          /* Left Section */
          .services-left {
            position: relative;
          }

          .services-content {
            padding: 20px;
            position: relative;
          }

          @media (max-width: 991px) {
            .services-content {
              padding: 0;
              text-align: center;
            }
          }

          .services-label {
            font-family: 'Lay Grotesk - Trial Black', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            font-size: clamp(12px, 2vw, 16px);
            letter-spacing: 4px;
            color: rgba(255, 255, 255, 0.6);
            margin-bottom: clamp(20px, 4vh, 30px);
            text-transform: uppercase;
          }

          @media (max-width: 768px) {
            .services-label {
              letter-spacing: 3px;
            }
          }

          .services-title {
            font-family: 'Lay Grotesk - Trial Medium', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.1;
            font-size: clamp(32px, 6vw, 64px);
            font-weight: 700;
            letter-spacing: -0.02em;
            color: #ffffff;
            margin: 0;
          }

          @media (max-width: 768px) {
            .services-title {
              font-size: clamp(28px, 5vw, 42px);
              line-height: 1.2;
            }
          }

          /* Right Section */
          .services-right {
            position: relative;
          }

          .services-cards {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: clamp(15px, 3vw, 30px);
          }

          /* Tablet: 2 columns */
          @media (max-width: 991px) and (min-width: 577px) {
            .services-cards {
              grid-template-columns: repeat(2, 1fr);
              gap: 25px;
            }
          }

          /* Mobile: 1 column */
          @media (max-width: 576px) {
            .services-cards {
              grid-template-columns: 1fr;
              gap: 30px;
            }
          }

          .service-card {
            height: 100%;
          }

          .service-column {
            height: 100%;
            display: flex;
            flex-direction: column;
          }

          .service-heading {
            font-family: 'Lay Grotesk - Trial Black', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            font-size: clamp(16px, 2.5vw, 20px);
            text-transform: uppercase;
            color: #ffffff;
            margin-bottom: clamp(20px, 4vh, 30px);
            padding-bottom: clamp(12px, 2vh, 15px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            letter-spacing: 1px;
          }

          @media (max-width: 576px) {
            .service-heading {
              font-size: 18px;
              margin-bottom: 20px;
            }
          }

          .service-list {
            list-style: none;
            padding: 0;
            margin: 0;
            flex: 1;
          }

          .service-item {
            padding: clamp(10px, 2vh, 12px) 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            cursor: pointer;
            display: flex;
            align-items: center;
            transition: all 0.3s ease;
          }

          /* Mobile touch optimization */
          @media (max-width: 768px) {
            .service-item {
              padding: 12px 0;
              cursor: pointer;
            }
          }

          .service-dot {
            width: 0;
            height: 0;
            background-color: #0066FF;
            border-radius: 50%;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            flex-shrink: 0;
          }

          .service-item-text {
            font-size: clamp(13px, 1.8vw, 14px);
            color: rgba(255, 255, 255, 0.7);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            line-height: 1.5;
          }

          /* Hover Effects - Desktop */
          @media (hover: hover) {
            .service-item:hover {
              padding-left: 5px;
            }
            
            .service-item:hover .service-dot {
              width: 8px;
              height: 8px;
              margin-right: 12px;
            }
            
            .service-item:hover .service-item-text {
              color: #ffffff;
              transform: translateX(5px);
            }
          }

          /* Touch Effects - Mobile */
          @media (hover: none) and (pointer: coarse) {
            .service-item:active {
              opacity: 0.7;
            }
            
            .service-item:active .service-item-text {
              color: #ffffff;
            }
          }

          /* Large Desktop Screens */
          @media (min-width: 1440px) {
            .services-container {
              max-width: 1600px;
            }
            
            .services-title {
              font-size: 72px;
            }
            
            .service-heading {
              font-size: 22px;
            }
            
            .service-item-text {
              font-size: 15px;
            }
          }

          /* Small Mobile Devices */
          @media (max-width: 480px) {
            .services-section {
              padding: 50px 0;
            }
            
            .services-label {
              font-size: 11px;
              letter-spacing: 2px;
              margin-bottom: 15px;
            }
            
            .services-title {
              font-size: 28px;
            }
            
            .service-heading {
              font-size: 16px;
              margin-bottom: 15px;
            }
            
            .service-item-text {
              font-size: 13px;
            }
          }

          /* Performance Optimization */
          @media (prefers-reduced-motion: reduce) {
            .service-item,
            .service-dot,
            .service-item-text {
              transition: none;
            }
            
            .service-item:hover {
              padding-left: 0;
            }
            
            .service-item:hover .service-dot {
              width: 0;
              margin-right: 0;
            }
            
            .service-item:hover .service-item-text {
              transform: none;
            }
          }

          /* Custom scrollbar for better appearance */
          .services-section::-webkit-scrollbar {
            width: 8px;
          }
          
          .services-section::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
          }
          
          .services-section::-webkit-scrollbar-thumb {
            background: #0066FF;
            border-radius: 4px;
          }
        `}
      </style>
    </section>
  );
};

export default ServicesSection;