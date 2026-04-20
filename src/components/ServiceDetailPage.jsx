import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

const ServiceDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [relatedServices, setRelatedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('features');
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0.8]), { stiffness: 100, damping: 30 });

  // All services data for related services
  const allServices = [
    {
      id: 1,
      title: '3D Motion Art',
      shortDesc: 'Stunning 3D animations that bring your brand to life',
      fullDesc: 'We create breathtaking 3D motion graphics that captivate audiences and elevate your brand story.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
      icon: '🎨',
      color: '#dbff00',
      features: ['Custom 3D Animations', 'Product Visualizations', 'Abstract Motion Graphics', 'Cinematic 3D Sequences', 'Real-time 3D Rendering'],
      technologies: ['Blender', 'Cinema 4D', 'After Effects', 'Three.js'],
      benefits: ['Increased Engagement', 'Better Brand Recall', 'Higher Conversion Rates', 'Enhanced User Experience'],
      process: ['Discovery', 'Concept Development', '3D Modeling', 'Animation', 'Review', 'Final Delivery'],
      testimonials: [
        { name: 'John Doe', role: 'Creative Director', text: 'Amazing work! The 3D animations transformed our brand.', rating: 5 },
        { name: 'Jane Smith', role: 'Marketing Head', text: 'Best creative team we have worked with!', rating: 5 }
      ]
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
      technologies: ['Google Analytics', 'SEMrush', 'Hotjar', 'Tableau'],
      benefits: ['Data-Driven Decisions', 'Competitive Advantage', 'Increased ROI', 'Market Leadership'],
      process: ['Research', 'Strategy Formulation', 'Implementation', 'Execution', 'Monitoring', 'Optimization'],
      testimonials: [
        { name: 'Mike Johnson', role: 'CEO', text: 'Their strategy increased our revenue by 200%!', rating: 5 }
      ]
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
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision'],
      benefits: ['Improved User Satisfaction', 'Higher Retention Rates', 'Reduced Development Costs', 'Faster Time to Market'],
      process: ['Research', 'Wireframing', 'Visual Design', 'Prototyping', 'Testing', 'Delivery'],
      testimonials: []
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
      technologies: ['Three.js', 'WebGL', 'Babylon.js', 'ShaderToy'],
      benefits: ['Immersive Experiences', 'Cross-Platform Compatibility', 'High Performance', 'Interactive Visualizations'],
      process: ['Analysis', '3D Asset Creation', 'Development', 'Integration', 'Testing', 'Optimization'],
      testimonials: []
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
      technologies: ['Unity', 'WebXR', 'GSAP', 'React Spring'],
      benefits: ['Increased User Engagement', 'Higher Conversion Rates', 'Brand Differentiation', 'Memorable Experiences'],
      process: ['Concept', 'Interactive Design', 'Development', 'User Testing', 'Launch', 'Optimization'],
      testimonials: []
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
      technologies: ['Illustrator', 'Photoshop', 'Procreate', 'FontForge'],
      benefits: ['Brand Recognition', 'Customer Loyalty', 'Professional Image', 'Market Differentiation'],
      process: ['Discovery', 'Strategy', 'Visual Identity', 'Guidelines', 'Asset Delivery'],
      testimonials: []
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
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
      benefits: ['Wider Audience Reach', 'Native Performance', 'Cost-Effective Solutions', 'Faster Development'],
      process: ['Ideation', 'UI/UX Design', 'Development', 'Testing', 'Deployment', 'Maintenance'],
      testimonials: []
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
      technologies: ['Shopify', 'WooCommerce', 'Magento', 'Stripe'],
      benefits: ['Increased Sales', 'Better Customer Experience', 'Scalable Platform', 'Secure Transactions'],
      process: ['Requirement Analysis', 'Platform Selection', 'Custom Development', 'Payment Integration', 'Launch', 'Support'],
      testimonials: []
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
      technologies: ['TensorFlow', 'PyTorch', 'OpenAI', 'Scikit-learn'],
      benefits: ['Automated Processes', 'Data-Driven Insights', 'Personalized Experiences', 'Competitive Advantage'],
      process: ['Problem Identification', 'Data Collection', 'Model Development', 'Training', 'Testing', 'Deployment'],
      testimonials: []
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
      technologies: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes'],
      benefits: ['Scalability', 'Cost Efficiency', 'Enhanced Security', 'Global Reach'],
      process: ['Assessment', 'Migration Planning', 'Implementation', 'Testing', 'Optimization', 'Support'],
      testimonials: []
    }
  ];

  useEffect(() => {
    setLoading(true);
    if (location.state && location.state.service) {
      const currentService = location.state.service;
      // Get full service details from allServices
      const fullService = allServices.find(s => s.id === currentService.id) || currentService;
      setService(fullService);
      
      const otherServices = allServices.filter(s => s.id !== fullService.id);
      const randomRelated = otherServices.sort(() => 0.5 - Math.random()).slice(0, 3);
      setRelatedServices(randomRelated);
      setLoading(false);
    } else {
      navigate('/services');
    }
  }, [location, navigate]);

  const handleRelatedServiceClick = (relatedService) => {
    navigate(`/services/${relatedService.id}`, { state: { service: relatedService } });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading state
  if (loading || !service) {
    return (
      <div className="bg-black text-white min-vh-100 d-flex align-items-center justify-content-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="spinner-grow text-lime mb-3" role="status" style={{ width: '50px', height: '50px' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-white">Loading service details...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white position-relative min-vh-100">
      <div className="grid-overlay" />

      {/* Advanced Hero Section with Parallax */}
      <section ref={heroRef} className="service-hero-advanced position-relative overflow-hidden" style={{
        minHeight: '100vh',
        background: '#FFFFFF',
        position: 'relative'
      }}>
        {/* Animated Background Particles */}
        <div className="hero-particles">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              style={{
                position: 'absolute',
                width: Math.random() * 4 + 1,
                height: Math.random() * 4 + 1,
                background: service.color,
                borderRadius: '50%',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.3
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0, 0.5, 0]
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>

        <Container className="position-relative z-3" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
          <Row className="align-items-center">
            <Col lg={7}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  style={{ display: 'inline-block' }}
                >
                  <span className="badge rounded-pill px-4 py-2 mb-4" style={{
                    background: `linear-gradient(135deg, ${service.color}, ${service.color}80)`,
                    color: '#000000',
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    letterSpacing: '2px'
                  }}>
                    ✦ {service.title && service.title.toUpperCase()} ✦
                  </span>
                </motion.div>
                
                <motion.h1
                  className="display-2 fw-bold mb-4"
                  style={{ color: '#000000' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  {service.title}
                  <motion.span
                    style={{ color: service.color, display: 'inline-block' }}
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ✦
                  </motion.span>
                </motion.h1>
                
                <motion.p
                  className="lead mb-4"
                  style={{ color: '#666666', fontSize: '1.1rem', lineHeight: '1.6' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  {service.fullDesc}
                </motion.p>
                
                <motion.div
                  className="d-flex gap-3 flex-wrap"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <motion.button
                    onClick={() => navigate('/services')}
                    style={{
                      background: 'transparent',
                      border: `2px solid ${service.color}`,
                      color: service.color,
                      padding: '12px 28px',
                      borderRadius: '50px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ← All Services
                  </motion.button>
                  
                  <motion.button
                    onClick={() => navigate('/contact')}
                    style={{
                      background: service.color,
                      border: 'none',
                      color: '#000000',
                      padding: '12px 32px',
                      borderRadius: '50px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    whileHover={{ scale: 1.05, boxShadow: `0 0 25px ${service.color}` }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started →
                  </motion.button>
                </motion.div>

                {/* Stats Row */}
                <motion.div
                  className="d-flex gap-5 mt-5 pt-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <div>
                    <h3 className="display-6 fw-bold mb-0" style={{ color: service.color }}>500+</h3>
                    <p className="small" style={{ color: '#666666' }}>Projects Done</p>
                  </div>
                  <div>
                    <h3 className="display-6 fw-bold mb-0" style={{ color: service.color }}>150+</h3>
                    <p className="small" style={{ color: '#666666' }}>Happy Clients</p>
                  </div>
                  <div>
                    <h3 className="display-6 fw-bold mb-0" style={{ color: service.color }}>24/7</h3>
                    <p className="small" style={{ color: '#666666' }}>Support</p>
                  </div>
                </motion.div>
              </motion.div>
            </Col>
            
            <Col lg={5} className="mt-5 mt-lg-0">
              <motion.div
                initial={{ opacity: 0, x: 50, rotateY: 90 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                style={{ perspective: '1000px' }}
              >
                <div className="hero-image-wrapper position-relative">
                  <motion.div
                    className="image-glow"
                    style={{
                      position: 'absolute',
                      inset: '-20px',
                      background: `radial-gradient(circle, ${service.color}40, transparent)`,
                      borderRadius: '30px',
                      filter: 'blur(30px)'
                    }}
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <img
                    src={service.image}
                    alt={service.title}
                    className="hero-image-main"
                    style={{
                      width: '100%',
                      borderRadius: '24px',
                      position: 'relative',
                      zIndex: 2,
                      boxShadow: `0 20px 40px rgba(0,0,0,0.2)`
                    }}
                  />
                  <motion.div
                    className="position-absolute bottom-0 start-0 m-4 d-flex align-items-center gap-2"
                    style={{
                      background: 'rgba(0,0,0,0.7)',
                      backdropFilter: 'blur(10px)',
                      padding: '8px 16px',
                      borderRadius: '50px',
                      zIndex: 3
                    }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      style={{ fontSize: '20px' }}
                    >
                      {service.icon}
                    </motion.span>
                    <span className="small" style={{ color: '#FFFFFF' }}>{service.title}</span>
                  </motion.div>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Tab Section */}
      <section className="py-5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 className="display-5 fw-bold">Everything You Need to <span style={{ color: service.color }}>Know</span></h2>
            <p className="text-white-50 mx-auto" style={{ maxWidth: '600px' }}>
              Comprehensive details about our {service.title} service
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            className="d-flex justify-content-center gap-3 mb-5 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {['features', 'technologies', 'benefits', 'process'].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-2 rounded-pill"
                style={{
                  background: activeTab === tab ? service.color : 'rgba(255,255,255,0.05)',
                  color: activeTab === tab ? '#000000' : '#FFFFFF',
                  border: 'none',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            {/* Features Tab */}
            {activeTab === 'features' && (
              <motion.div
                key="features"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Row className="g-4">
                  {service.features && service.features.map((feature, idx) => (
                    <Col md={6} lg={4} key={idx}>
                      <motion.div
                        className="feature-card p-4 rounded-4 h-100"
                        style={{
                          background: 'rgba(255,255,255,0.02)',
                          border: `1px solid ${service.color}20`,
                          transition: 'all 0.3s ease'
                        }}
                        whileHover={{ y: -10, borderColor: service.color }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <motion.div
                          className="feature-icon mb-3 d-inline-flex align-items-center justify-content-center"
                          style={{
                            width: '50px',
                            height: '50px',
                            background: `${service.color}20`,
                            borderRadius: '15px',
                            fontSize: '24px'
                          }}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          ✓
                        </motion.div>
                        <h5 className="fw-bold mb-2" style={{ color: service.color }}>{feature}</h5>
                      </motion.div>
                    </Col>
                  ))}
                </Row>
              </motion.div>
            )}

            {/* Technologies Tab */}
            {activeTab === 'technologies' && (
              <motion.div
                key="technologies"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Row className="g-4">
                  {service.technologies && service.technologies.map((tech, idx) => (
                    <Col md={4} lg={3} key={idx}>
                      <motion.div
                        className="tech-card p-4 text-center rounded-4"
                        style={{
                          background: 'rgba(255,255,255,0.02)',
                          border: `1px solid ${service.color}30`,
                          transition: 'all 0.3s ease'
                        }}
                        whileHover={{ scale: 1.05, borderColor: service.color }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          style={{ fontSize: '32px', marginBottom: '15px' }}
                        >
                          {idx === 0 ? '⚡' : idx === 1 ? '💻' : idx === 2 ? '🎨' : '🔧'}
                        </motion.div>
                        <h6 className="fw-bold mb-0" style={{ color: service.color }}>{tech}</h6>
                      </motion.div>
                    </Col>
                  ))}
                </Row>
              </motion.div>
            )}

            {/* Benefits Tab */}
            {activeTab === 'benefits' && service.benefits && (
              <motion.div
                key="benefits"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Row className="g-4">
                  {service.benefits.map((benefit, idx) => (
                    <Col md={6} key={idx}>
                      <motion.div
                        className="benefit-card p-4 rounded-4 d-flex gap-3"
                        style={{
                          background: `linear-gradient(135deg, ${service.color}10, transparent)`,
                          border: `1px solid ${service.color}20`,
                          transition: 'all 0.3s ease'
                        }}
                        whileHover={{ x: 10, borderColor: service.color }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          style={{ fontSize: '32px' }}
                        >
                          {idx === 0 ? '🚀' : idx === 1 ? '💎' : idx === 2 ? '🎯' : '⭐'}
                        </motion.div>
                        <div>
                          <h5 className="fw-bold mb-1" style={{ color: service.color }}>{benefit}</h5>
                        </div>
                      </motion.div>
                    </Col>
                  ))}
                </Row>
              </motion.div>
            )}

            {/* Process Tab */}
            {activeTab === 'process' && service.process && (
              <motion.div
                key="process"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="process-timeline position-relative">
                  {service.process.map((step, idx) => (
                    <motion.div
                      key={idx}
                      className="process-step d-flex align-items-start gap-4 mb-4 p-4 rounded-4"
                      style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: `1px solid ${service.color}20`
                      }}
                      whileHover={{ x: 10, borderColor: service.color }}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <motion.div
                        className="step-number d-flex align-items-center justify-content-center"
                        style={{
                          width: '50px',
                          height: '50px',
                          background: service.color,
                          borderRadius: '50%',
                          fontSize: '20px',
                          fontWeight: 'bold',
                          color: '#000000'
                        }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {idx + 1}
                      </motion.div>
                      <div>
                        <h5 className="fw-bold mb-1" style={{ color: service.color }}>{step}</h5>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </section>

      {/* Stats Counter Section */}
      <section className="py-5" style={{ background: `linear-gradient(135deg, ${service.color}08, #000000)` }}>
        <Container>
          <Row className="g-4 text-center">
            <Col md={3} sm={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.h2
                  className="display-3 fw-bold mb-2"
                  style={{ color: service.color }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  500+
                </motion.h2>
                <p className="text-white-50">Projects Completed</p>
              </motion.div>
            </Col>
            <Col md={3} sm={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <motion.h2
                  className="display-3 fw-bold mb-2"
                  style={{ color: service.color }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  150+
                </motion.h2>
                <p className="text-white-50">Happy Clients</p>
              </motion.div>
            </Col>
            <Col md={3} sm={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <motion.h2
                  className="display-3 fw-bold mb-2"
                  style={{ color: service.color }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  24/7
                </motion.h2>
                <p className="text-white-50">Support Available</p>
              </motion.div>
            </Col>
            <Col md={3} sm={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <motion.h2
                  className="display-3 fw-bold mb-2"
                  style={{ color: service.color }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                >
                  100%
                </motion.h2>
                <p className="text-white-50">Client Satisfaction</p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Related Services Section - Enhanced */}
      <section className="py-5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 className="display-5 fw-bold">Related <span style={{ color: service.color }}>Services</span></h2>
            <p className="text-white-50 mx-auto" style={{ maxWidth: '600px' }}>
              Explore more services we offer that might interest you
            </p>
          </motion.div>
          
          <Row>
            {relatedServices.map((relatedService, idx) => (
              <Col lg={4} md={6} className="mb-4" key={relatedService.id}>
                <motion.div
                  className="related-service-card h-100"
                  onClick={() => handleRelatedServiceClick(relatedService)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -15 }}
                  style={{
                    cursor: 'pointer',
                    background: 'rgba(255,255,255,0.02)',
                    border: `1px solid ${relatedService.color}30`,
                    borderRadius: '20px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div className="position-relative overflow-hidden" style={{ height: '200px' }}>
                    <motion.img
                      src={relatedService.image}
                      alt={relatedService.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div
                      className="position-absolute bottom-0 start-0 m-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: '45px',
                        height: '45px',
                        background: `linear-gradient(135deg, ${relatedService.color}, ${relatedService.color}80)`,
                        borderRadius: '12px',
                        fontSize: '22px'
                      }}
                    >
                      {relatedService.icon}
                    </div>
                  </div>
                  <div className="p-4">
                    <h5 className="fw-bold mb-2" style={{ color: relatedService.color }}>{relatedService.title}</h5>
                    <p className="small text-white-50 mb-3">{relatedService.shortDesc}</p>
                    <motion.div
                      className="d-flex align-items-center gap-2"
                      style={{ color: relatedService.color }}
                      whileHover={{ x: 5 }}
                    >
                      <span className="small fw-bold">Learn More</span>
                      <span>→</span>
                    </motion.div>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section - Advanced */}
      <section className="py-5">
        <Container>
          <motion.div
            className="cta-advanced rounded-5 p-5 text-center position-relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              background: `linear-gradient(135deg, ${service.color}15, #0a0a0a)`,
              border: `1px solid ${service.color}30`
            }}
          >
            <motion.div
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{
                background: `radial-gradient(circle at 30% 50%, ${service.color}20, transparent)`,
                pointerEvents: 'none'
              }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            <motion.h2
              className="display-4 fw-bold mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Ready to Get <span style={{ color: service.color }}>Started</span>?
            </motion.h2>
            
            <motion.p
              className="text-white-50 mb-4 mx-auto"
              style={{ maxWidth: '500px' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Let's discuss how our {service.title} services can benefit your business
            </motion.p>
            
            <motion.button
              onClick={() => navigate('/contact')}
              style={{
                background: service.color,
                color: '#000',
                border: 'none',
                padding: '14px 40px',
                borderRadius: '50px',
                fontWeight: 'bold',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${service.color}` }}
              whileTap={{ scale: 0.95 }}
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
              Contact Us Today →
            </motion.button>
          </motion.div>
        </Container>
      </section>

      <style>{`
        .text-lime { color: #dbff00; }
        .text-white-50 { color: rgba(255,255,255,0.5); }
        .bg-black { background-color: #000; }
        .min-vh-100 { min-height: 100vh; }
        .fw-bold { font-weight: 700; }
        .display-2 { font-size: clamp(2.5rem, 5vw, 4rem); }
        .display-5 { font-size: clamp(1.8rem, 4vw, 2.5rem); }
        
        .grid-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), 
                            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        .service-hero-advanced {
          position: relative;
        }

        .hero-image-main {
          transition: all 0.3s ease;
        }

        .feature-card, .tech-card, .benefit-card, .related-service-card {
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .process-step {
          transition: all 0.3s ease;
        }

        .cta-advanced {
          position: relative;
          transition: all 0.3s ease;
        }

        @media (max-width: 768px) {
          .display-2 {
            font-size: 2rem !important;
          }
          .lead {
            font-size: 0.9rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ServiceDetailPage;