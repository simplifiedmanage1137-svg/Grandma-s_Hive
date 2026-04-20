import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

// --- 1. 3D FLOATING CONTACT CARD ---
const FloatingContactCard = () => {
    const cardRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (rect) {
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            setMousePosition({ x: x * 20, y: y * 20 });
        }
    };

    return (
        <motion.div
            ref={cardRef}
            className="floating-contact-card glass-panel p-5 text-center position-relative"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setMousePosition({ x: 0, y: 0 });
            }}
            animate={{
                rotateX: mousePosition.y,
                rotateY: mousePosition.x,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{
                transformStyle: "preserve-3d",
                maxWidth: '400px',
                margin: '0 auto',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))',
                backdropFilter: 'blur(20px)',
                borderRadius: '30px',
                border: '1px solid rgba(219,255,0,0.2)',
            }}
        >
            <motion.div
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.3 }}
            >
                <div className="contact-icon mb-4">
                    <motion.div
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{
                            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                            scale: { duration: 2, repeat: Infinity }
                        }}
                        style={{
                            width: '80px',
                            height: '80px',
                            background: 'linear-gradient(135deg, #dbff00, #0066FF)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto'
                        }}
                    >
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 6L12 13L2 6M22 6V18C22 18.5304 21.7893 19.0391 21.4142 19.4142C21.0391 19.7893 20.5304 20 20 20H4C3.46957 20 2.96086 19.7893 2.58579 19.4142C2.21071 19.0391 2 18.5304 2 18V6M22 6L12 13L2 6" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.div>
                </div>
                <h3 className="fw-bold mb-3" style={{ color: '#dbff00' }}>Contact Us</h3>
                <p className="text-white-50 small mb-4">We'd love to hear from you. Send us a message and we'll respond within 24 hours.</p>

                <div className="contact-details text-start mt-4">
                    <div className="d-flex align-items-center gap-3 mb-3">
                        <div className="contact-detail-icon" style={{ width: '40px', height: '40px', background: 'rgba(219,255,0,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            📍
                        </div>
                        <div>
                            <h6 className="m-0 text-lime">Visit Us</h6>
                            <p className="extra-small text-white-50 m-0">123 Innovation Street, Tech Valley, CA 94025</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-3 mb-3">
                        <div className="contact-detail-icon" style={{ width: '40px', height: '40px', background: 'rgba(219,255,0,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            📞
                        </div>
                        <div>
                            <h6 className="m-0 text-lime">Call Us</h6>
                            <p className="extra-small text-white-50 m-0">+1 (555) 123-4567</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <div className="contact-detail-icon" style={{ width: '40px', height: '40px', background: 'rgba(219,255,0,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            ✉️
                        </div>
                        <div>
                            <h6 className="m-0 text-lime">Email Us</h6>
                            <p className="extra-small text-white-50 m-0">hello@grandmashive.com</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// --- 2. ANIMATED CONTACT FORM ---
const AnimatedContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
    };

    const formFields = [
        { name: 'name', label: 'Your Name', type: 'text', icon: '👤' },
        { name: 'email', label: 'Email Address', type: 'email', icon: '✉️' },
        { name: 'subject', label: 'Subject', type: 'text', icon: '📝' },
        { name: 'message', label: 'Message', type: 'textarea', icon: '💬' }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="contact-form-wrapper glass-panel p-5"
            style={{
                borderRadius: '30px',
                background: 'rgba(255,255,255,0.02)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(219,255,0,0.1)'
            }}
        >
            <h3 className="fw-bold mb-4">Send us a <span className="text-lime">Message</span></h3>

            <form onSubmit={handleSubmit}>
                {formFields.map((field) => (
                    <motion.div
                        key={field.name}
                        className="form-group mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: formFields.indexOf(field) * 0.1 }}
                    >
                        <motion.div
                            className="d-flex align-items-center gap-2 mb-2"
                            animate={{ x: focusedField === field.name ? 10 : 0 }}
                        >
                            <span className="form-icon">{field.icon}</span>
                            <label className="small fw-bold text-white-50 m-0">{field.label}</label>
                        </motion.div>

                        {field.type === 'textarea' ? (
                            <motion.textarea
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                onFocus={() => setFocusedField(field.name)}
                                onBlur={() => setFocusedField(null)}
                                rows="4"
                                className="form-control-custom w-100"
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: `1px solid ${focusedField === field.name ? '#dbff00' : 'rgba(255,255,255,0.1)'}`,
                                    borderRadius: '12px',
                                    padding: '12px 16px',
                                    color: 'white',
                                    transition: 'all 0.3s ease',
                                    resize: 'vertical'
                                }}
                                whileFocus={{ scale: 1.02 }}
                                required
                            />
                        ) : (
                            <motion.input
                                type={field.type}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                onFocus={() => setFocusedField(field.name)}
                                onBlur={() => setFocusedField(null)}
                                className="form-control-custom w-100"
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: `1px solid ${focusedField === field.name ? '#dbff00' : 'rgba(255,255,255,0.1)'}`,
                                    borderRadius: '12px',
                                    padding: '12px 16px',
                                    color: 'white',
                                    transition: 'all 0.3s ease'
                                }}
                                whileFocus={{ scale: 1.02 }}
                                required
                            />
                        )}
                    </motion.div>
                ))}

                <motion.button
                    type="submit"
                    className="submit-btn w-100"
                    whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(219,255,0,0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                        background: 'linear-gradient(135deg, #dbff00, #a6cc00)',
                        border: 'none',
                        padding: '14px',
                        borderRadius: '12px',
                        fontWeight: 'bold',
                        color: '#000',
                        fontSize: '16px',
                        cursor: 'pointer'
                    }}
                >
                    Send Message →
                </motion.button>

                <AnimatePresence>
                    {isSubmitted && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="success-message mt-3 p-3 rounded-3 text-center"
                            style={{ background: 'rgba(219,255,0,0.1)', border: '1px solid #dbff00' }}
                        >
                            <span className="text-lime">✓ Message sent successfully! We'll get back to you soon.</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>
        </motion.div>
    );
};

// --- 3. SOCIAL MEDIA SECTION WITH 3D CARDS ---
const SocialConnect = () => {
    const socialLinks = [
        { name: 'Instagram', icon: '📷', color: '#E4405F', link: '#' },
        { name: 'Twitter', icon: '🐦', color: '#1DA1F2', link: '#' },
        { name: 'LinkedIn', icon: '🔗', color: '#0077B5', link: '#' },
        { name: 'GitHub', icon: '💻', color: '#333', link: '#' },
        { name: 'Dribbble', icon: '🎨', color: '#EA4C89', link: '#' },
        { name: 'Behance', icon: '✨', color: '#1769FF', link: '#' }
    ];

    return (
        <section className="py-5" style={{ background: '#FFFFFF' }}>
            <div className="container">
                <div className="text-center mb-5">
                    <span className="badge mb-2 px-3 py-2 rounded-pill small fw-bold" style={{
                        background: '#dbff00',
                        color: '#000000'
                    }}>
                        ✦ CONNECT WITH US ✦
                    </span>
                    <h2 className="display-6 fw-bold" style={{ color: '#000000' }}>
                        Follow Our <span style={{ color: '#dbff00' }}>Journey</span>
                    </h2>
                </div>
                <div className="row g-4">
                    {socialLinks.map((social, idx) => (
                        <div className="col-md-4 col-lg-2" key={idx}>
                            <motion.a
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-card d-block text-center p-4 rounded-4"
                                style={{
                                    background: '#F8F9FA',
                                    border: `1px solid #E0E0E0`,
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                                whileHover={{
                                    y: -10,
                                    background: `linear-gradient(135deg, ${social.color}10, #FFFFFF)`,
                                    borderColor: social.color
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <motion.div
                                    className="social-icon mb-3"
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    style={{ fontSize: '40px' }}
                                >
                                    {social.icon}
                                </motion.div>
                                <h6 className="fw-bold m-0" style={{ color: '#333333' }}>{social.name}</h6>
                                <motion.span
                                    className="extra-small d-inline-block mt-2"
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    style={{ color: social.color, opacity: 0.8 }}
                                >
                                    Follow →
                                </motion.span>
                            </motion.a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


// --- 5. HERO SECTION FOR CONTACT PAGE (WITH INCREASED PADDING TOP) ---
const ContactHero = () => {
    return (
        <section className="contact-hero d-flex align-items-center position-relative overflow-hidden" style={{
            minHeight: '70vh',
            paddingTop: '120px',
            paddingBottom: '80px',
            background: '#FFFFFF'
        }}>
            <div className="container z-3">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <span className="badge rounded-pill px-3 py-2 mb-3 extra-small" style={{
                        background: '#dbff00',
                        color: '#000000',
                        border: 'none',
                        fontWeight: 'bold',
                        fontSize: '0.7rem',
                        letterSpacing: '1px'
                    }}>
                        ✦ GET IN TOUCH ✦
                    </span>
                    <h1 className="hero-title-contact fw-black mb-4" style={{ color: '#000000' }}>
                        Let's Start a <br />
                        <span style={{ color: '#dbff00' }}>Conversation</span>
                    </h1>
                    <p className="mx-auto" style={{
                        maxWidth: '600px',
                        color: '#666666',
                        fontSize: '1.1rem',
                        lineHeight: '1.6',
                        marginBottom: '2rem'
                    }}>
                        Whether you have a project in mind or just want to say hello, we'd love to hear from you.
                    </p>

                    {/* Added CTA Button for better visibility */}
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="mt-2"
                        style={{
                            background: '#dbff00',
                            color: '#000000',
                            border: 'none',
                            padding: '12px 32px',
                            borderRadius: '50px',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: '0 0 20px rgba(219,255,0,0.5)',
                            background: '#cce600'
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Start a Project →
                    </motion.button>
                </motion.div>
            </div>

            {/* Animated background elements - adjusted opacity for white background */}
            <div className="orb-contact" style={{
                position: 'absolute',
                width: '400px',
                height: '400px',
                filter: 'blur(100px)',
                opacity: 0.08,
                background: '#dbff00',
                top: '20%',
                left: '-10%',
                pointerEvents: 'none'
            }} />
            <div className="orb-contact" style={{
                position: 'absolute',
                width: '500px',
                height: '500px',
                filter: 'blur(120px)',
                opacity: 0.05,
                background: '#0066FF',
                bottom: '-20%',
                right: '-10%',
                pointerEvents: 'none'
            }} />

            {/* Floating particles - adjusted opacity for white background */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    className="floating-particle-contact"
                    style={{
                        position: 'absolute',
                        width: `${Math.random() * 4 + 2}px`,
                        height: `${Math.random() * 4 + 2}px`,
                        background: `rgba(219,255,0,${Math.random() * 0.3 + 0.1})`,
                        borderRadius: '50%',
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        pointerEvents: 'none'
                    }}
                    animate={{
                        y: [0, -50, 0],
                        x: [0, Math.random() * 30 - 15, 0],
                        opacity: [0, 0.6, 0]
                    }}
                    transition={{
                        duration: Math.random() * 5 + 3,
                        repeat: Infinity,
                        delay: Math.random() * 2
                    }}
                />
            ))}
        </section>
    );
};

// --- 6. OFFICE HOURS CARD ---
const OfficeHours = () => {
    const hours = [
        { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM', active: true },
        { day: 'Saturday', hours: '10:00 AM - 4:00 PM', active: false },
        { day: 'Sunday', hours: 'Closed', active: false }
    ];

    return (
        <motion.div
            className="office-hours glass-panel p-5 mt-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
                borderRadius: '30px',
                background: 'rgba(255,255,255,0.02)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(219,255,0,0.1)'
            }}
        >
            <h4 className="fw-bold mb-4 text-center">Office <span className="text-lime">Hours</span></h4>
            {hours.map((slot, idx) => (
                <motion.div
                    key={idx}
                    className="d-flex justify-content-between align-items-center py-2 border-bottom border-white-10"
                    whileHover={{ x: 10, backgroundColor: 'rgba(219,255,0,0.05)' }}
                    style={{ padding: '0 10px', borderRadius: '8px' }}
                >
                    <span className="small text-white-50">{slot.day}</span>
                    <span className={`small ${slot.active ? 'text-lime' : 'text-white-50'}`}>{slot.hours}</span>
                </motion.div>
            ))}
        </motion.div>
    );
};

// --- MAIN CONTACT PAGE COMPONENT ---
const ContactPage = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    return (
        <div ref={containerRef} className="bg-black text-white position-relative min-vh-100">
            <div className="grid-overlay" />

            {/* Hero Section */}
            <ContactHero />

            {/* Main Contact Section */}
            <section className="py-5">
                <div className="container">
                    <div className="row g-4">
                        {/* Left Column - Contact Info */}
                        <div className="col-lg-5">
                            <FloatingContactCard />
                            <OfficeHours />
                        </div>

                        {/* Right Column - Contact Form */}
                        <div className="col-lg-7">
                            <AnimatedContactForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Connect Section */}
            <SocialConnect />

            {/* Newsletter Section */}
            <section className="py-5">
                <div className="container">
                    <motion.div
                        className="newsletter-box rounded-4 p-5 text-center position-relative overflow-hidden"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        style={{
                            background: 'linear-gradient(135deg, #0a0a0a, #050505)',
                            border: '1px solid rgba(219,255,0,0.2)'
                        }}
                    >
                        <div className="newsletter-glow position-absolute top-0 start-0 w-100 h-100" style={{ background: 'radial-gradient(circle at center, rgba(219,255,0,0.1), transparent)', pointerEvents: 'none' }} />
                        <h3 className="fw-bold mb-3">Subscribe to our <span className="text-lime">Newsletter</span></h3>
                        <p className="text-white-50 mb-4">Get the latest updates and exclusive offers straight to your inbox</p>
                        <div className="d-flex justify-content-center gap-3 flex-wrap">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="newsletter-input px-4 py-2 rounded-pill border-0"
                                style={{ background: 'rgba(255,255,255,0.1)', color: 'white', width: '280px' }}
                            />
                            <motion.button
                                className="btn-lime-glow"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Subscribe →
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>

            <style>{`
        .text-lime { color: #dbff00; }
        .bg-lime { background-color: #dbff00; }
        .fw-black { font-weight: 900; }
        .extra-small { font-size: 0.75rem; }
        .hero-title-contact { font-size: clamp(2.5rem, 8vw, 4.5rem); line-height: 1.2; }
        .border-white-10 { border-color: rgba(255,255,255,0.08) !important; }
        
        .grid-overlay {
          position: absolute; inset: 0; pointer-events: none;
          background-image: linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), 
                            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .glass-panel {
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .contact-hero {
          padding-top: 120px;
          margin-top: 0;
        }

        .floating-contact-card {
          transform-style: preserve-3d;
          transition: all 0.3s ease;
        }

        .form-control-custom:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(219,255,0,0.2);
        }

        .form-control-custom::placeholder {
          color: rgba(255,255,255,0.3);
        }

        .social-card {
          transition: all 0.3s ease;
        }

        .map-container {
          position: relative;
          overflow: hidden;
        }

        .map-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .newsletter-input:focus {
          outline: none;
          border: 1px solid #dbff00;
        }

        .btn-lime-glow { 
          background: #dbff00; 
          color: #000; 
          border: none; 
          padding: 12px 30px; 
          border-radius: 50px; 
          font-weight: 800; 
          transition: all 0.3s ease;
          box-shadow: 0 0 20px rgba(219,255,0,0.3);
          cursor: pointer;
        }

        .btn-lime-glow:hover {
          transform: scale(1.05);
          box-shadow: 0 0 30px rgba(219,255,0,0.5);
        }

        .cta-box { 
          background: #050505; 
        }

        @media (max-width: 768px) {
          .hero-title-contact { font-size: 2rem; }
          .contact-hero {
            padding-top: 100px;
            min-height: 60vh;
          }
          .floating-contact-card {
            margin-bottom: 20px;
          }
        }

        @media (max-width: 480px) {
          .contact-hero {
            padding-top: 90px;
          }
        }
      `}</style>
        </div>
    );
};

export default ContactPage;