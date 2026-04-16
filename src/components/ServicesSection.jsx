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
      style={{ 
        position: 'relative',
        backgroundColor: '#000',
        color: '#ffffff', 
        padding: '140px 0',
        overflow: 'hidden',
      }}
    >
      {/* 1. Background Image Layer (Kam blur aur dark overlay ke saath) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url("https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(8px) brightness(0.4)', // Blur kam kar diya taaki image pehchani ja sake
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="row g-5 align-items-start">
          
          {/* --- LEFT SECTION --- */}
          <div className="col-lg-5" style={{ position: 'relative' }}>
            {/* 2. Glass Box (Iske peeche wali image zyada blur hogi) */}
            <motion.div 
              style={{
                position: 'absolute',
                top: '-40px',
                left: '-40px',
                right: '20px',
                bottom: '-40px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(25px)', // Sirf box ke andar zyada blur
                WebkitBackdropFilter: 'blur(25px)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                zIndex: -1,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              style={{ padding: '20px' }}
            >
              <p style={{ 
                fontFamily: "'Lay Grotesk - Trial Black', sans-serif", 
                fontSize: '16px',
                letterSpacing: '4px',
                color: 'rgba(255,255,255,0.6)',
                marginBottom: '30px'
              }}>
                (SERVICES)
              </p>
              
              <h1 style={{ 
                fontFamily: "'Lay Grotesk - Trial Medium', sans-serif",
                lineHeight: '1.05',
                fontSize: 'clamp(38px, 5vw, 64px)',
                fontWeight: '700',
                letterSpacing: '-0.03em',
                color: '#ffffff',
              }}>
                Services designed to amplify User Experience.
              </h1>
            </motion.div>
          </div>

          {/* --- RIGHT SECTION --- */}
          <div className="col-lg-7">
            <div className="row g-4">
              {services.map((service, index) => (
                <motion.div 
                  key={service.title}
                  className="col-md-4"
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
                          <span className="dot"></span>
                          <span className="item-text">{item}</span>
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
          .service-heading {
            font-family: 'Lay Grotesk - Trial Black', sans-serif;
            font-size: 20px;
            text-transform: uppercase;
            color: #ffffff;
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 1px solid rgba(255,255,255,0.2);
          }

          .service-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .service-item {
            padding: 12px 0;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            cursor: pointer;
            display: flex;
            align-items: center;
          }

          .dot {
            width: 0;
            height: 0;
            background-color: #0066FF;
            border-radius: 50%;
            transition: all 0.3s ease;
          }

          .item-text {
            font-size: 14px;
            color: rgba(255,255,255,0.7);
            transition: all 0.3s ease;
          }

          .service-item:hover .dot {
            width: 8px;
            height: 8px;
            margin-right: 12px;
          }

          .service-item:hover .item-text {
            color: #ffffff;
            transform: translateX(5px);
          }
        `}
      </style>
    </section>
  );
};

export default ServicesSection;