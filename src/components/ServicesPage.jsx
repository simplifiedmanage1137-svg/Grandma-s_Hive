import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

// Advanced Service Card with 3D Tilt Effect
const ServiceCard = ({ service, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePosition({ x: x * 20, y: y * 20 });
    }
  };

  return (
    <Col lg={3} md={4} sm={6} className="mb-4">
      <motion.div
        ref={cardRef}
        className="service-card"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePosition({ x: 0, y: 0 });
        }}
        onClick={() => onClick(service)}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true, margin: "-50px" }}
        animate={{
          rotateX: mousePosition.y,
          rotateY: mousePosition.x,
        }}
        style={{
          transformStyle: "preserve-3d",
          cursor: 'pointer',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))',
          border: `1px solid ${isHovered ? service.color : 'rgba(219,255,0,0.2)'}`,
          borderRadius: '24px',
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isHovered ? `0 20px 40px -12px ${service.color}40` : 'none'
        }}
      >
        {/* Animated Gradient Background */}
        <motion.div
          className="card-gradient"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 50% 0%, ${service.color}, transparent)`,
            pointerEvents: 'none'
          }}
        />
        
        {/* Service Image with Parallax */}
        <div className="position-relative overflow-hidden" style={{ height: '240px' }}>
          <motion.img
            src={service.image}
            alt={service.title}
            className="w-100 h-100"
            style={{
              objectFit: 'cover',
              transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            animate={{
              scale: isHovered ? 1.15 : 1,
              y: mousePosition.y * -2
            }}
          />
          <motion.div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
              opacity: isHovered ? 0.8 : 0.6,
              transition: 'opacity 0.3s ease'
            }}
          />

          {/* Animated Service Icon */}
          <motion.div
            className="position-absolute bottom-0 start-0 m-3 d-flex align-items-center justify-content-center"
            style={{
              width: '55px',
              height: '55px',
              background: `linear-gradient(135deg, ${service.color}, ${service.color}80)`,
              borderRadius: '16px',
              fontSize: '28px',
              boxShadow: `0 4px 15px ${service.color}40`
            }}
            animate={{
              rotate: isHovered ? 360 : 0,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.5 }}
          >
            {service.icon}
          </motion.div>
        </div>

        {/* Service Content */}
        <div className="p-4">
          <motion.h5
            className="fw-bold mb-2"
            style={{ color: service.color }}
            animate={{ x: isHovered ? 5 : 0 }}
          >
            {service.title}
          </motion.h5>
          <p className="small text-white-50 mb-3">{service.shortDesc}</p>

          <motion.div
            className="d-flex align-items-center gap-2"
            animate={{ x: isHovered ? 5 : 0 }}
            style={{ color: service.color }}
          >
            <span className="small fw-bold">Learn More</span>
            <motion.span
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ repeat: isHovered ? Infinity : 0, duration: 0.8 }}
            >
              →
            </motion.span>
          </motion.div>
        </div>

        {/* Animated Bottom Border */}
        <motion.div
          className="position-absolute bottom-0 start-0"
          style={{
            height: '3px',
            background: `linear-gradient(90deg, ${service.color}, transparent)`,
            borderRadius: '2px'
          }}
          initial={{ width: '0%' }}
          animate={{ width: isHovered ? '100%' : '0%' }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </Col>
  );
};

// Advanced Hero Section with Particles
const ServicesHero = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 5
  }));

  return (
    <section className="services-hero position-relative overflow-hidden" style={{
      minHeight: '70vh',
      background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
      paddingTop: '120px',
      paddingBottom: '80px'
    }}>
      {/* Animated Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="position-absolute rounded-circle"
          style={{
            width: particle.size,
            height: particle.size,
            background: '#dbff00',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: 0.3
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        />
      ))}

      <Container className="position-relative z-3">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <Badge
              className="px-4 py-2 mb-4 rounded-pill"
              style={{
                fontSize: '0.75rem',
                fontWeight: 'bold',
                letterSpacing: '2px',
                background: '#dbff00',
                color: '#000000',
                border: 'none'
              }}
            >
              ✦ WHAT WE OFFER ✦
            </Badge>
          </motion.div>
          
          <motion.h1
            className="display-3 fw-bold mb-4"
            style={{ color: '#000000' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Our{' '}
            <span className="gradient-text" style={{
              background: 'linear-gradient(135deg, #dbff00, #a6cc00)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent'
            }}>
              Services
            </span>
          </motion.h1>
          
          <motion.p
            className="mx-auto"
            style={{
              maxWidth: '600px',
              color: '#666666',
              fontSize: '1.1rem',
              lineHeight: '1.6'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            We provide cutting-edge digital solutions that transform ideas into extraordinary experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <button
              className="mt-4"
              style={{
                background: 'transparent',
                border: '2px solid #dbff00',
                color: '#000000',
                padding: '12px 32px',
                borderRadius: '50px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#dbff00';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.transform = 'scale(1)';
              }}
            >
              Explore All →
            </button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

// Animated Stats Section
const ServicesStats = () => {
  const stats = [
    { number: '500+', label: 'Projects Completed', color: '#dbff00', icon: '🚀' },
    { number: '150+', label: 'Happy Clients', color: '#0066FF', icon: '😊' },
    { number: '24/7', label: 'Support Available', color: '#ff3366', icon: '🛡️' },
    { number: '10+', label: 'Expert Services', color: '#00ffcc', icon: '💎' }
  ];

  return (
    <section className="py-5 position-relative" style={{ background: '#000000' }}>
      <Container>
        <Row className="g-4">
          {stats.map((stat, idx) => (
            <Col md={3} sm={6} key={idx}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="stat-card p-4 text-center rounded-4"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                  border: `1px solid ${stat.color}30`,
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease'
                }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{ fontSize: '40px', marginBottom: '15px' }}
                >
                  {stat.icon}
                </motion.div>
                <motion.h2
                  className="display-4 fw-bold mb-2"
                  style={{ color: stat.color }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {stat.number}
                </motion.h2>
                <p className="small m-0" style={{ color: 'rgba(255,255,255,0.7)' }}>{stat.label}</p>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

// Advanced Floating Ticker
const ServicesTicker = () => {
  const tickerText = "✦ INNOVATION ✦ CREATIVITY ✦ EXCELLENCE ✦ TECHNOLOGY ✦ DESIGN ✦";
  
  return (
    <div className="ticker-wrapper position-relative overflow-hidden py-4" style={{
      background: 'linear-gradient(90deg, #dbff0010, #dbff0020, #dbff0010)',
      borderTop: '1px solid rgba(219,255,0,0.2)',
      borderBottom: '1px solid rgba(219,255,0,0.2)'
    }}>
      <motion.div
        className="ticker-content d-flex"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ whiteSpace: 'nowrap' }}
      >
        {[...Array(2)].map((_, i) => (
          <div key={i} className="d-flex">
            {tickerText.split('✦').map((text, idx) => (
              text && (
                <span key={idx} className="mx-3" style={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(90deg, #dbff00, #ffffff, #dbff00)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}>
                  ✦ {text.trim()} ✦
                </span>
              )
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// Main Services Page Component
const ServicesPage = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const services = [
    // Your services array here (same as before)
    {
      id: 1,
      title: '3D Motion Art',
      shortDesc: 'Stunning 3D animations that bring your brand to life',
      fullDesc: 'We create breathtaking 3D motion graphics that captivate audiences and elevate your brand story.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
      icon: '🎨',
      color: '#dbff00',
      features: ['Custom 3D Animations', 'Product Visualizations', 'Abstract Motion Graphics', 'Cinematic 3D Sequences', 'Real-time 3D Rendering'],
      technologies: ['Blender', 'Cinema 4D', 'After Effects', 'Three.js']
    },
    {
      id: 2,
      title: 'Digital Strategy',
      shortDesc: 'Data-driven strategies for digital success',
      fullDesc: 'Our digital strategists work with you to develop comprehensive plans that align with your business goals.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      icon: '📊',
      color: '#0066FF',
      features: ['Market Analysis', 'Competitor Research', 'User Journey Mapping', 'ROI Forecasting', 'Growth Strategies'],
      technologies: ['Google Analytics', 'SEMrush', 'Hotjar', 'Tableau']
    },
    {
      id: 3,
      title: 'UI/UX Design',
      shortDesc: 'Intuitive interfaces that users love',
      fullDesc: 'We design beautiful, user-centered interfaces that are both functional and aesthetically pleasing.',
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=400&fit=crop',
      icon: '🎯',
      color: '#ff3366',
      features: ['User Research', 'Wireframing & Prototyping', 'UI Design Systems', 'Usability Testing', 'Accessibility Design'],
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision']
    },
    {
      id: 4,
      title: 'WebGL Development',
      shortDesc: 'Interactive 3D web experiences',
      fullDesc: 'Leverage the power of WebGL to create stunning 3D experiences directly in the browser.',
      image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop',
      icon: '🌐',
      color: '#00ffcc',
      features: ['3D Product Configurators', 'Interactive Environments', 'Particle Systems', 'Shader Development', 'Performance Optimization'],
      technologies: ['Three.js', 'WebGL', 'Babylon.js', 'ShaderToy']
    },
    {
      id: 5,
      title: 'Interactive Experiences',
      shortDesc: 'Engaging interactive digital solutions',
      fullDesc: 'Create memorable interactive experiences that engage users and drive conversions.',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop',
      icon: '🎮',
      color: '#ffaa00',
      features: ['Gamification', 'Interactive Storytelling', 'Gesture Controls', 'VR/AR Experiences', 'Touch Interfaces'],
      technologies: ['Unity', 'WebXR', 'GSAP', 'React Spring']
    },
    {
      id: 6,
      title: 'Brand Identity',
      shortDesc: 'Unique brand identities that stand out',
      fullDesc: 'Build a strong brand identity that resonates with your audience.',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop',
      icon: '💎',
      color: '#dbff00',
      features: ['Logo Design', 'Brand Guidelines', 'Visual Identity Systems', 'Brand Strategy', 'Brand Voice Development'],
      technologies: ['Illustrator', 'Photoshop', 'Procreate', 'FontForge']
    },
    {
      id: 7,
      title: 'Mobile App Development',
      shortDesc: 'Native and cross-platform mobile apps',
      fullDesc: 'Develop high-performance mobile applications for iOS and Android.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
      icon: '📱',
      color: '#0066FF',
      features: ['iOS Development', 'Android Development', 'Cross-platform Apps', 'App Store Optimization', 'Mobile UI/UX'],
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin']
    },
    {
      id: 8,
      title: 'E-commerce Solutions',
      shortDesc: 'Powerful online stores that sell',
      fullDesc: 'Build feature-rich e-commerce platforms that drive sales and provide seamless shopping experiences.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      icon: '🛒',
      color: '#ff3366',
      features: ['Custom E-commerce Development', 'Payment Gateway Integration', 'Inventory Management', 'Shopping Cart Optimization', 'SEO for E-commerce'],
      technologies: ['Shopify', 'WooCommerce', 'Magento', 'Stripe']
    },
    {
      id: 9,
      title: 'AI & Machine Learning',
      shortDesc: 'Intelligent solutions powered by AI',
      fullDesc: 'Harness the power of artificial intelligence to automate processes, gain insights, and deliver personalized experiences.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
      icon: '🤖',
      color: '#00ffcc',
      features: ['Predictive Analytics', 'Natural Language Processing', 'Computer Vision', 'Recommendation Systems', 'Chatbot Development'],
      technologies: ['TensorFlow', 'PyTorch', 'OpenAI', 'Scikit-learn']
    },
    {
      id: 10,
      title: 'Cloud Solutions',
      shortDesc: 'Scalable cloud infrastructure and services',
      fullDesc: 'Migrate and manage your infrastructure on the cloud for better scalability, security, and cost-efficiency.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
      icon: '☁️',
      color: '#ffaa00',
      features: ['Cloud Migration', 'DevOps Services', 'Serverless Architecture', 'Cloud Security', 'Cost Optimization'],
      technologies: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes']
    }
  ];

  const handleServiceClick = (service) => {
    navigate(`/services/${service.id}`, { state: { service } });
  };

  return (
    <div ref={containerRef} className="bg-black text-white position-relative min-vh-100">
      {/* Scroll Progress Bar */}
      <motion.div
        className="position-fixed top-0 start-0 end-0"
        style={{
          height: '3px',
          background: 'linear-gradient(90deg, #dbff00, #a6cc00)',
          transformOrigin: '0%',
          zIndex: 10000
        }}
        animate={{ scaleX }}
      />

      <div className="grid-overlay" />

      <ServicesHero />
      <ServicesStats />
      <ServicesTicker />

      {/* Services Grid Section */}
      <section className="py-5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-5"
          >
            <Badge className="mb-2 px-3 py-2 rounded-pill" style={{
              background: 'linear-gradient(135deg, #dbff00, #a6cc00)',
              color: '#000000'
            }}>
              ✦ OUR EXPERTISE ✦
            </Badge>
            <h2 className="display-5 fw-bold">What <span className="text-lime">We Do</span></h2>
            <p className="text-white-50 mx-auto" style={{ maxWidth: '600px' }}>
              Explore our comprehensive range of digital services designed to help your business thrive
            </p>
          </motion.div>

          <Row>
            {services.map((service, idx) => (
              <ServiceCard key={service.id} service={service} index={idx} onClick={handleServiceClick} />
            ))}
          </Row>
        </Container>
      </section>

      {/* Advanced CTA Section */}
      <section className="py-5">
        <Container>
          <motion.div
            className="cta-large rounded-4 p-5 text-center position-relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              background: 'linear-gradient(135deg, rgba(219,255,0,0.15), rgba(0,0,0,0.9))',
              border: '1px solid rgba(219,255,0,0.3)'
            }}
          >
            <motion.div
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{
                background: 'radial-gradient(circle at 30% 50%, rgba(219,255,0,0.1), transparent)',
                pointerEvents: 'none'
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            <h2 className="display-5 fw-bold mb-3">
              Ready to <span className="text-lime">Transform</span> Your Business?
            </h2>
            <p className="text-white-50 mb-4">Let's discuss how our services can help you achieve your goals</p>
            
            <motion.button
              className="btn-lime-glow"
              onClick={() => navigate('/contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: '#dbff00',
                color: '#000',
                border: 'none',
                padding: '14px 40px',
                borderRadius: '50px',
                fontWeight: '800',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <motion.span
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  transform: 'skewX(-20deg)'
                }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              Start a Project →
            </motion.button>
          </motion.div>
        </Container>
      </section>

      <style>{`
        .text-lime { color: #dbff00; }
        .text-white-50 { color: rgba(255,255,255,0.5); }
        .bg-black { background-color: #000; }
        .min-vh-100 { min-height: 100vh; }
        .position-relative { position: relative; }
        .overflow-hidden { overflow: hidden; }
        
        .grid-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), 
                            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        .service-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          transform-style: preserve-3d;
        }

        .btn-lime-glow {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .btn-lime-glow:hover {
          transform: scale(1.05);
          box-shadow: 0 0 30px rgba(219,255,0,0.5);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .stat-card {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ServicesPage;