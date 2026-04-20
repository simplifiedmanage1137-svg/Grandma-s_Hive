import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

// --- 1. COMPACT FLIP STATS CARD ---
const FlipStatsCard = ({ number, label, color, description }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div className="col-md-3 mb-3 flip-container" onMouseEnter={() => setIsFlipped(true)} onMouseLeave={() => setIsFlipped(false)}>
      <motion.div className="flip-inner" animate={{ rotateY: isFlipped ? 180 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}>
        <div className="card-face face-front">
          <div className="card-content-inner">
            <h2 className="display-4 fw-black m-0" style={{ color: color }}>{number}</h2>
            <p className="text-uppercase small fw-bold text-white-50 m-0">{label}</p>
          </div>
        </div>
        <div className="card-face face-back" style={{ border: `1px solid ${color}88` }}>
          <div className="card-content-inner text-center px-3">
            <h5 style={{ color: color }} className="mb-2 small fw-bold">IMPACT</h5>
            <p className="extra-small text-white-50 m-0">{description}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- 2. TEAM CARD WITH ANIMATED AVATAR ---
const TeamFlipCard = ({ index, member }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const hue = (index * 90) % 360;
  const borderColor = `hsl(${hue}, 80%, 60%)`;

  return (
    <div className="col-md-3 mb-3 flip-container" onMouseEnter={() => setIsFlipped(true)} onMouseLeave={() => setIsFlipped(false)}>
      <motion.div className="flip-inner" animate={{ rotateY: isFlipped ? 180 : 0 }} transition={{ duration: 0.5 }}>
        <div className="card-face face-front">
          <div className="team-layout w-100 px-3 d-flex align-items-center">
            <div className="animated-avatar-wrapper" style={{ borderColor: borderColor }}>
              <motion.div
                className="animated-avatar"
                animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ background: `linear-gradient(135deg, hsl(${hue}, 80%, 60%), hsl(${hue + 40}, 80%, 50%))` }}
              >
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="40" r="18" fill="rgba(255,255,255,0.25)" />
                  <path d="M30 70 Q50 85 70 70" stroke="rgba(255,255,255,0.5)" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <circle cx="38" cy="38" r="3" fill="white" />
                  <circle cx="62" cy="38" r="3" fill="white" />
                </svg>
              </motion.div>
              <motion.div className="avatar-ring" animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} style={{ borderColor: borderColor }} />
            </div>
            <div className="team-info text-start ms-2">
              <h6 className="m-0 fw-bold text-white extra-small">Lead Artist</h6>
              <span className="text-lime opacity-75" style={{ fontSize: '0.65rem' }}>Member {member}</span>
            </div>
          </div>
        </div>
        <div className="card-face face-back">
          <div className="card-content-inner text-center px-3">
            <h6 className="text-lime mb-1 extra-small">SKILLS</h6>
            <p className="extra-small text-white-50 m-0">3D UI, WebGL & Motion.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- 3. VIDEO CARD COMPONENT ---
const VideoCard = ({ title, description, icon, color }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="col-md-4 mb-4">
      <motion.div
        className="video-card glass-panel h-100 p-4 text-center position-relative overflow-hidden"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={{ y: isHovered ? -10 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        style={{ borderTop: `3px solid ${color}` }}
      >
        <motion.div
          className="video-card-icon mb-3 d-inline-flex align-items-center justify-content-center"
          animate={{ rotate: isHovered ? 360 : 0, scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.5 }}
          style={{ background: `${color}20`, width: '70px', height: '70px', borderRadius: '20px' }}
        >
          <span className="display-6">{icon}</span>
        </motion.div>
        <h5 className="fw-bold mb-2" style={{ color: color }}>{title}</h5>
        <p className="extra-small text-white-50">{description}</p>
        <motion.div
          className="position-absolute bottom-0 start-0 h-1 bg-lime"
          initial={{ width: '0%' }}
          animate={{ width: isHovered ? '100%' : '0%' }}
          transition={{ duration: 0.4 }}
          style={{ height: '2px' }}
        />
        <motion.span
          className="extra-small text-lime mt-2 d-inline-block cursor-pointer"
          animate={{ x: isHovered ? 5 : 0 }}
        >
          Watch Now →
        </motion.span>
      </motion.div>
    </div>
  );
};

// --- 4. FLOATING TICKER ---
const FloatingTicker = () => {
  const tickerText = "✦ THE PIXELS BEHIND ✦ THE PIXELS BEHIND ✦ THE PIXELS BEHIND ✦";

  return (
    <div className="ticker-container py-3 my-4 position-relative overflow-hidden">
      <motion.div
        className="ticker-content d-inline-block white-space-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <span className="ticker-text display-6 fw-bold me-4">{tickerText}</span>
        <span className="ticker-text display-6 fw-bold me-4">{tickerText}</span>
      </motion.div>
    </div>
  );
};

// --- 5. HERO SECTION WITH ANIMATED IMAGE (SQUARES REVEAL) ---
const HeroSection = () => {
  const [imageRevealed, setImageRevealed] = useState(false);

  // Create a 4x4 grid of squares (16 squares)
  const squares = Array(16).fill().map((_, i) => i);

  useEffect(() => {
    // Trigger reveal animation after component mounts
    const timer = setTimeout(() => setImageRevealed(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="vh-100 d-flex align-items-center position-relative overflow-hidden" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container z-3">
        <div className="row align-items-center">
          {/* Left side - Text content */}
          <div className="col-lg-6">
            <span className="badge rounded-pill border border-lime text-lime px-3 py-1 mb-3 extra-small">✦ PREMIUM STUDIO</span>
            <h1 className="hero-title fw-black m-0">
              <div>WE ARE A</div>
              <div className="text-stroke">COLLECTIVE</div>
              <div className="gradient-move">INDIVIDUALS</div>
            </h1>
          </div>

          {/* Right side - Animated Image Grid */}
          <div className="col-lg-6 mt-5 mt-lg-0">
            <div className="hero-image-container position-relative mx-auto" style={{ width: '380px', height: '380px' }}>
              {/* Blurred background */}
              <div
                className="hero-image-blur position-absolute w-100 h-100 rounded-4 overflow-hidden"
                style={{ filter: 'blur(20px)', transform: 'scale(1.1)' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop"
                  alt="Background blur"
                  className="w-100 h-100 object-fit-cover"
                />
              </div>

              {/* Main image container with grid reveal */}
              <div className="hero-image-grid position-relative w-100 h-100 rounded-4 overflow-hidden">
                {/* Actual image */}
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop"
                  alt="Hero visual"
                  className="hero-main-image w-100 h-100 object-fit-cover"
                  style={{ opacity: imageRevealed ? 1 : 0, transition: 'opacity 0.5s ease' }}
                />

                {/* Grid overlay with squares */}
                <div className="grid-overlay-reveal position-absolute top-0 start-0 w-100 h-100">
                  <div className="grid-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(4, 1fr)', width: '100%', height: '100%' }}>
                    {squares.map((square, idx) => (
                      <motion.div
                        key={idx}
                        className="grid-square"
                        style={{
                          backgroundColor: '#dbff00',
                          border: '1px solid rgba(0,0,0,0.1)',
                          backdropFilter: 'blur(4px)',
                        }}
                        initial={{ scale: 1, opacity: 0.8 }}
                        animate={imageRevealed ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 0.8 }}
                        transition={{ duration: 0.4, delay: idx * 0.02 }}
                      />
                    ))}
                  </div>
                </div>

                {/* Animated border glow */}
                <motion.div
                  className="hero-image-border position-absolute top-0 start-0 w-100 h-100 rounded-4"
                  animate={{
                    boxShadow: ['0 0 0px rgba(219,255,0,0)', '0 0 30px rgba(219,255,0,0.5)', '0 0 0px rgba(219,255,0,0)']
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ pointerEvents: 'none', border: '1px solid rgba(219,255,0,0.3)' }}
                />
              </div>

              {/* Floating particles around image */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="floating-particle position-absolute rounded-circle"
                  style={{
                    width: `${Math.random() * 6 + 2}px`,
                    height: `${Math.random() * 6 + 2}px`,
                    background: `rgba(219,255,0,${Math.random() * 0.5 + 0.2})`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, Math.random() * 20 - 10, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="orb orb-1" />
    </section>
  );
};

// --- 6. FUTURE OF INTERACTION (VIDEO PLAYBACK FIXED WITH WORKING BUTTONS) ---
const Floating3DSection = () => {
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const videoSources = [
    {
      src: 'https://framerusercontent.com/assets/hQUXKbpvYZyElXRxbNmW95ph8Q.mp4',
      title: '3D Motion Graphics Showreel',
      duration: '00:32'
    },
    {
      src: 'https://framerusercontent.com/assets/XzKm3c6TBPnQY2RLiGOpjE83OU0.mp4',
      title: 'WebGL Interactive Demo',
      duration: '00:45'
    },
    {
      src: 'https://framerusercontent.com/assets/LqHnLVpPrDaiM1FZ63ODyW25jaw.mp4',
      title: 'Real-time Particle Effects',
      duration: '00:28'
    }
  ];

  const currentSource = videoSources[currentVideoIndex].src;

  const handleVideoError = () => {
    if (currentVideoIndex < videoSources.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    } else {
      setVideoError(true);
    }
  };

  const handleNextVideo = () => {
    if (currentVideoIndex < videoSources.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    } else {
      setCurrentVideoIndex(0); // Loop back to first video
    }
  };

  const handlePreviousVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    } else {
      setCurrentVideoIndex(videoSources.length - 1); // Loop to last video
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(e => console.log('Autoplay prevented:', e));
    }
  }, [currentSource]);

  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="py-5 position-relative overflow-hidden" style={{ background: '#FFFFFF' }}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} className="p-2">
              <span className="badge mb-3 px-3 py-2 rounded-pill small fw-bold" style={{
                background: '#dbff00',
                color: '#000000'
              }}>
                ✦ FUTURISTIC ✦
              </span>
              <h2 className="display-5 fw-bold mb-3" style={{ color: '#000000' }}>
                FUTURE OF <span style={{ color: '#dbff00' }}>INTERACTION</span>
              </h2>
              <p className="small pe-md-5" style={{ color: '#666666', lineHeight: '1.6' }}>
                We transform static design into fluid, immersive experiences. Every element tells a story,
                and every motion guides users through a seamless digital journey. Welcome to the next
                generation of web interaction.
              </p>
              <div className="d-flex gap-3 mt-4">
                <div className="d-flex align-items-center gap-2">
                  <div className="rounded-circle" style={{ width: '8px', height: '8px', background: '#dbff00' }}></div>
                  <span className="extra-small" style={{ color: '#666666' }}>3D Animation</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <div className="rounded-circle" style={{ width: '8px', height: '8px', background: '#dbff00' }}></div>
                  <span className="extra-small" style={{ color: '#666666' }}>WebGL</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <div className="rounded-circle" style={{ width: '8px', height: '8px', background: '#dbff00' }}></div>
                  <span className="extra-small" style={{ color: '#666666' }}>Real-time</span>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="col-md-6 d-flex justify-content-center" style={{ perspective: '1200px' }}>
            <motion.div
              animate={{ rotateY: [0, 10, -10, 0], rotateX: [5, -5, 5] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="floating-3d-card"
            >
              <div className="overflow-hidden" style={{
                background: '#FFFFFF',
                border: '1px solid #E0E0E0',
                borderRadius: '16px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
              }}>
                <div className="p-3 d-flex justify-content-between align-items-center" style={{ borderBottom: '1px solid #E0E0E0' }}>
                  <div className="d-flex gap-2">
                    <div className="dot red" />
                    <div className="dot yellow" />
                    <div className="dot green" />
                  </div>
                  <span className="extra-small" style={{ color: '#666666' }}>▶ {videoSources[currentVideoIndex].title}</span>
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="extra-small"
                    style={{ color: '#dbff00', fontWeight: 'bold' }}
                  >
                    LIVE
                  </motion.div>
                </div>

                <div className="video-content-wrapper position-relative" style={{ height: '260px', background: '#000' }}>
                  {!videoError ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-100 h-100 object-fit-cover"
                      style={{ opacity: 0.9 }}
                      onError={handleVideoError}
                      key={currentSource}
                    >
                      <source src={currentSource} type="video/mp4" />
                    </video>
                  ) : (
                    <div className="w-100 h-100 d-flex align-items-center justify-content-center" style={{ background: '#F5F5F5' }}>
                      <div className="text-center">
                        <div className="display-1 mb-3">🎬</div>
                        <p className="small" style={{ color: '#666666' }}>Abstract 3D Animation Preview</p>
                      </div>
                    </div>
                  )}
                  <div className="video-overlay"><div className="scan-line"></div></div>
                  <div className="p-3 position-absolute bottom-0 w-100 z-2">
                    <motion.div
                      className="rounded-pill mb-2"
                      style={{ height: '2px', background: '#dbff00' }}
                      animate={{ width: ['0%', '100%'] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="d-flex justify-content-between">
                      <div className="w-50 rounded-pill" style={{ height: '1px', background: '#FFFFFF', opacity: 0.2 }} />
                      <span className="extra-small" style={{ color: '#FFFFFF', opacity: 0.7 }}>
                        {videoSources[currentVideoIndex].duration} / {videoSources[currentVideoIndex].duration}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 d-flex justify-content-between align-items-center" style={{ borderTop: '1px solid #E0E0E0' }}>
                  <div className="d-flex gap-3">
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      className="small cursor-pointer"
                      style={{ color: '#666666', cursor: 'pointer' }}
                      onClick={handlePreviousVideo}
                    >
                      ◀
                    </motion.span>
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      className="small cursor-pointer"
                      style={{ color: '#dbff00', fontWeight: 'bold', cursor: 'pointer' }}
                      onClick={handleNextVideo}
                    >
                      ▶
                    </motion.span>
                  </div>
                  <div className="d-flex gap-2">
                    <span className="extra-small" style={{ color: '#666666' }}>
                      {currentVideoIndex + 1} / {videoSources.length}
                    </span>
                  </div>
                  <span className="extra-small" style={{ color: '#666666' }}>3D RENDER | 60FPS</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 7. LET'S CHAT SECTION ---
const LetsChatSection = () => {
  return (
    <section className="py-5">
      <div className="container">
        <div className="chat-box rounded-4 p-5 text-center position-relative overflow-hidden">
          <motion.div
            className="chat-glow"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <h3 className="text-white-50 mb-3 fw-light">Are you ready to take action?</h3>
          <h1 className="display-2 fw-black mb-4 gradient-chat">LET'S CHAT.</h1>
          <motion.button
            className="btn-chat"
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(219,255,0,0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            Start a Conversation →
          </motion.button>
          <div className="chat-dots">
            <div className="dot-pulse" />
            <div className="dot-pulse delay-1" />
            <div className="dot-pulse delay-2" />
          </div>
        </div>
      </div>
    </section>
  );
};

// --- MAIN COMPONENT ---
const AboutSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Extended OUR CORE services
  const coreServices = [
    { name: '3D Motion Art', color: '#dbff00' },
    { name: 'Digital Strategy', color: '#0066FF' },
    { name: 'UI/UX Design', color: '#ff3366' },
    { name: 'WebGL Development', color: '#00ffcc' },
    { name: 'Interactive Experiences', color: '#ffaa00' }
  ];

  return (
    <div ref={containerRef} className="bg-black text-white position-relative min-vh-100">
      <div className="grid-overlay" />

      {/* 1. HERO WITH ANIMATED IMAGE */}
      <HeroSection />

      {/* 2. SERVICES - EXPANDED OUR CORE */}
      <section className="py-5" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div className="row g-0 align-items-center">
            <div className="col-md-4">
              <h2 className="h2 fw-bold m-0" style={{ color: '#000000' }}>
                OUR <span className="text-lime">CORE</span>
              </h2>
              <p className="extra-small mt-2 pe-3" style={{ color: '#666666' }}>
                Delivering excellence through innovation and creativity.
              </p>
            </div>
            <div className="col-md-8">
              {coreServices.map((service, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 10, backgroundColor: 'rgba(0,0,0,0.02)' }}
                  className="d-flex justify-content-between align-items-center py-3 border-bottom service-row px-3 rounded-2 transition-all cursor-pointer"
                  style={{
                    borderBottomColor: '#E0E0E0',
                    cursor: 'pointer'
                  }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div className="rounded-circle" style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: service.color
                    }} />
                    <h5 className="m-0 fw-light small" style={{ color: '#333333' }}>
                      {service.name}
                    </h5>
                  </div>
                  <motion.span whileHover={{ x: 5 }} className="text-lime" style={{ color: '#dbff00' }}>→</motion.span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. FLOATING TICKER */}
      <FloatingTicker />

      {/* 4. STATS */}
      <section className="py-3">
        <div className="container">
          <div className="row g-2">
            <FlipStatsCard number="15+" label="Years" color="#dbff00" description="A decade of digital perfection." />
            <FlipStatsCard number="200+" label="Projects" color="#0066FF" description="Impactful results worldwide." />
            <FlipStatsCard number="50+" label="Brands" color="#ff3366" description="Trusted partners and visionaries." />
            <FlipStatsCard number="24/7" label="Support" color="#00ffcc" description="Always awake for your success." />
          </div>
        </div>
      </section>

      {/* 5. VIDEO CARD ROW */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge bg-lime text-dark mb-2 px-3 py-2 rounded-pill small fw-bold">✦ WATCH SHOWREEL ✦</span>
            <h2 className="display-6 fw-bold">Immersive <span className="text-lime">Experiences</span></h2>
          </div>
          <div className="row">
            <VideoCard title="3D Animation" description="Stunning 3D motion graphics that bring your brand to life with fluid transitions." icon="🎬" color="#dbff00" />
            <VideoCard title="WebGL Magic" description="Interactive WebGL experiences that run smoothly on any device or browser." icon="✨" color="#0066FF" />
            <VideoCard title="Real-time FX" description="Real-time particle effects and dynamic lighting for immersive storytelling." icon="⚡" color="#ff3366" />
          </div>
        </div>
      </section>

      {/* 6. 3D PANEL SECTION */}
      <Floating3DSection />

      {/* 7. TEAM */}
      <section className="py-4">
        <div className="container text-center">
          <h2 className="h3 fw-bold mb-4">THE <span className="text-lime">MAGIC</span> MAKERS</h2>
          <div className="row g-2">
            {[1, 2, 3, 4].map((m, i) => (
              <TeamFlipCard key={i} member={m} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. LET'S CHAT SECTION */}
      <LetsChatSection />

      <style>{`
        .text-lime { color: #dbff00; }
        .bg-lime { background-color: #dbff00; }
        .fw-black { font-weight: 900; }
        .extra-small { font-size: 0.75rem; }
        .hero-title { font-size: clamp(2.5rem, 12vw, 5.5rem); line-height: 0.85; }
        .text-stroke { color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.2); }
        .border-white-10 { border-color: rgba(255,255,255,0.08) !important; }
        .cursor-pointer { cursor: pointer; }
        .transition-all { transition: all 0.3s ease; }
        .object-fit-cover { object-fit: cover; }
        
        .grid-overlay {
          position: absolute; inset: 0; pointer-events: none;
          background-image: linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        /* Hero Image Styles */
        .hero-image-container {
          position: relative;
          border-radius: 24px;
        }
        
        .hero-image-grid {
          position: relative;
          z-index: 2;
          background: #000;
        }
        
        .hero-main-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        
        .grid-overlay-reveal {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
        }
        
        .grid-square {
          width: 100%;
          height: 100%;
          background: #dbff00;
          transition: all 0.3s ease;
        }
        
        .hero-image-border {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 3;
          pointer-events: none;
        }
        
        .floating-particle {
          pointer-events: none;
          z-index: 4;
        }

        /* Flip Card Styles */
        .flip-container { perspective: 1000px; height: 160px; }
        .flip-inner { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; }
        .card-face {
          position: absolute; inset: 0; backface-visibility: hidden;
          border-radius: 20px; display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
        }
        .face-back { transform: rotateY(180deg); background: #080808; }

        /* Animated Avatar */
        .animated-avatar-wrapper { position: relative; width: 55px; height: 55px; border-radius: 50%; border: 2px solid; }
        .animated-avatar { width: 100%; height: 100%; border-radius: 50%; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .animated-avatar svg { width: 65%; height: 65%; }
        .avatar-ring { position: absolute; top: -4px; left: -4px; right: -4px; bottom: -4px; border-radius: 50%; border: 1px dashed; opacity: 0.6; }

        /* Video Card */
        .video-card { background: rgba(255,255,255,0.02); border-radius: 24px; transition: all 0.3s ease; }
        .glass-panel { backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); }

        /* Ticker */
        .ticker-container { background: rgba(219,255,0,0.05); border-top: 1px solid rgba(219,255,0,0.2); border-bottom: 1px solid rgba(219,255,0,0.2); }
        .ticker-content { white-space: nowrap; font-size: 2rem; font-weight: 900; letter-spacing: 4px; }
        .ticker-text { background: linear-gradient(90deg, #dbff00, #ffffff, #dbff00); -webkit-background-clip: text; color: transparent; font-size: 1.8rem; }

        /* Chat Section */
        .chat-box { background: linear-gradient(135deg, #0a0a0a, #050505); border: 1px solid rgba(219,255,0,0.3); position: relative; overflow: hidden; }
        .chat-glow { position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(219,255,0,0.1), transparent); pointer-events: none; }
        .gradient-chat { background: linear-gradient(135deg, #dbff00, #ffffff); -webkit-background-clip: text; color: transparent; }
        .btn-chat { background: transparent; border: 2px solid #dbff00; color: #dbff00; padding: 12px 32px; border-radius: 50px; font-weight: 700; transition: all 0.3s ease; }
        .chat-dots { position: absolute; bottom: 20px; right: 30px; display: flex; gap: 8px; }
        .dot-pulse { width: 6px; height: 6px; background: #dbff00; border-radius: 50%; animation: pulse 1.5s infinite; }
        .delay-1 { animation-delay: 0.3s; }
        .delay-2 { animation-delay: 0.6s; }

        /* Floating 3D Card */
        .floating-3d-card { width: 320px; height: 380px; transform-style: preserve-3d; }
        .dot { width: 10px; height: 10px; border-radius: 50%; }
        .dot.red { background: #ff5f56; }
        .dot.yellow { background: #ffbd2e; }
        .dot.green { background: #27c93f; }
        .video-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); pointer-events: none; }
        .scan-line { position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(90deg, transparent, #dbff00, transparent); animation: scan 3s linear infinite; opacity: 0.6; }
        
        @keyframes scan { 0% { transform: translateY(0); } 100% { transform: translateY(260px); } }
        @keyframes pulse { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.5); } }

        .cta-box { background: #050505; }
        .btn-lime-glow { background: #dbff00; color: #000; border: none; padding: 12px 30px; border-radius: 50px; font-weight: 800; box-shadow: 0 0 20px rgba(219,255,0,0.3); }
        .orb { position: absolute; width: 450px; height: 450px; filter: blur(130px); opacity: 0.12; background: #dbff00; top: 10%; left: -5%; }
        .gradient-move { background: linear-gradient(90deg, #dbff00, #fff, #dbff00); background-size: 200%; -webkit-background-clip: text; color: transparent; animation: flow 5s linear infinite; }
        
        .w-8 { width: 8px; } .h-8 { height: 8px; }
        
        @keyframes flow { to { background-position: 200%; } }
        
        @media (max-width: 768px) {
          .floating-3d-card { width: 280px; height: 340px; }
          .ticker-text { font-size: 1rem; }
          .hero-image-container { width: 280px !important; height: 280px !important; }
        }
      `}</style>
    </div>
  );
};

export default AboutSection;