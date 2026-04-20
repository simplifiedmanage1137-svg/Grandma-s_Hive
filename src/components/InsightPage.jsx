import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

// --- 1. INSIGHT STAT CARD (Flip variant for insights) ---
const InsightStatCard = ({ number, label, color, trend, description }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div className="col-md-3 mb-3 flip-container" onMouseEnter={() => setIsFlipped(true)} onMouseLeave={() => setIsFlipped(false)}>
      <motion.div className="flip-inner" animate={{ rotateY: isFlipped ? 180 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}>
        <div className="card-face face-front">
          <div className="card-content-inner text-center">
            <h2 className="display-4 fw-black m-0" style={{ color: color }}>{number}</h2>
            <p className="text-uppercase small fw-bold text-white-50 m-0">{label}</p>
            <span className="extra-small text-lime mt-1">{trend}</span>
          </div>
        </div>
        <div className="card-face face-back" style={{ border: `1px solid ${color}88` }}>
          <div className="card-content-inner text-center px-3">
            <h5 style={{ color: color }} className="mb-2 small fw-bold">INSIGHT</h5>
            <p className="extra-small text-white-50 m-0">{description}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- 2. BLOG/ARTICLE CARD ---
const InsightArticleCard = ({ article, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const colors = ['#dbff00', '#0066FF', '#ff3366', '#00ffcc', '#ffaa00'];
  const color = colors[index % colors.length];
  
  return (
    <div className="col-md-4 mb-4">
      <motion.div 
        className="article-card glass-panel h-100 overflow-hidden"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={{ y: isHovered ? -8 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <div className="article-image-wrapper position-relative overflow-hidden" style={{ height: '200px' }}>
          <motion.img 
            src={article.image} 
            alt={article.title}
            className="w-100 h-100 object-fit-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="article-category position-absolute top-0 start-0 m-3 px-3 py-1 rounded-pill" style={{ background: color, color: '#000', fontSize: '0.7rem', fontWeight: 'bold' }}>
            {article.category}
          </div>
        </div>
        <div className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="extra-small text-white-50">{article.date}</span>
            <span className="extra-small text-white-50">{article.readTime} min read</span>
          </div>
          <h5 className="fw-bold mb-2" style={{ color: 'white' }}>{article.title}</h5>
          <p className="extra-small text-white-50 mb-3">{article.excerpt}</p>
          <motion.div 
            className="d-flex align-items-center gap-2 cursor-pointer"
            animate={{ x: isHovered ? 5 : 0 }}
            style={{ color: color }}
          >
            <span className="small fw-bold">Read Insight</span>
            <motion.span animate={{ x: isHovered ? 3 : 0 }}>→</motion.span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

// --- 3. DATA VISUALIZATION CARD (UPDATED WITH WHITE BACKGROUND) ---
const DataVizCard = () => {
  const data = [
    { label: '3D Integration', value: 85, color: '#dbff00' },
    { label: 'WebGL Adoption', value: 72, color: '#0066FF' },
    { label: 'Real-time UX', value: 68, color: '#ff3366' },
    { label: 'Immersive Tech', value: 91, color: '#00ffcc' },
  ];
  
  return (
    <div className="col-md-6 mb-4">
      <div className="white-glass-panel p-4 h-100" style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #E0E0E0',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
      }}>
        <h4 className="fw-bold mb-4" style={{ color: '#000000' }}>
          Industry <span style={{ color: '#dbff00' }}>Trends 2024</span>
        </h4>
        {data.map((item, idx) => (
          <motion.div key={idx} className="mb-3">
            <div className="d-flex justify-content-between mb-1">
              <span className="extra-small" style={{ color: '#666666' }}>{item.label}</span>
              <span className="extra-small" style={{ color: item.color, fontWeight: 'bold' }}>{item.value}%</span>
            </div>
            <div className="progress-bar-bg" style={{ background: '#E8E8E8', borderRadius: '10px', height: '8px' }}>
              <motion.div 
                className="progress-bar-fill rounded-pill"
                style={{ background: item.color, height: '8px', width: '0%' }}
                whileInView={{ width: `${item.value}%` }}
                transition={{ duration: 1, delay: idx * 0.1 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- 4. TESTIMONIAL/QUOTE CARD (UPDATED WITH WHITE BACKGROUND) ---
const InsightQuoteCard = () => {
  return (
    <div className="col-md-6 mb-4">
      <div className="white-glass-panel p-4 h-100 d-flex flex-column justify-content-center" style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #E0E0E0',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="display-1" style={{ color: '#dbff00', opacity: 0.5 }}>"</span>
          <p className="fw-light mb-3" style={{ fontSize: '1.2rem', color: '#333333' }}>
            The future of digital interaction lies in seamless, immersive experiences that feel natural and intuitive.
          </p>
          <div className="d-flex align-items-center gap-3">
            <div className="quote-avatar rounded-circle" style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #dbff00, #0066FF)' }} />
            <div>
              <h6 className="m-0 fw-bold" style={{ color: '#000000' }}>Sarah Chen</h6>
              <span className="extra-small" style={{ color: '#666666' }}>Director of Innovation, TechVision</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// --- 5. TIMELINE COMPONENT ---
const InsightTimeline = () => {
  const timelineEvents = [
    { year: '2021', title: 'Research Phase', description: 'Explored emerging 3D web technologies', color: '#dbff00' },
    { year: '2022', title: 'Prototype Development', description: 'Built first WebGL prototypes', color: '#0066FF' },
    { year: '2023', title: 'Beta Launch', description: 'Released to early adopters', color: '#ff3366' },
    { year: '2024', title: 'Global Expansion', description: 'Scaling to enterprise clients', color: '#00ffcc' },
  ];
  
  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <span className="badge bg-lime text-dark mb-2 px-3 py-2 rounded-pill small fw-bold">✦ OUR JOURNEY ✦</span>
          <h2 className="display-6 fw-bold">Evolution of <span className="text-lime">Innovation</span></h2>
        </div>
        <div className="timeline-wrapper position-relative">
          <div className="timeline-line position-absolute start-50 translate-x-n50 h-100" style={{ width: '2px', background: 'rgba(219,255,0,0.3)' }} />
          <div className="row">
            {timelineEvents.map((event, idx) => (
              <motion.div 
                key={idx}
                className={`col-md-6 mb-4 ${idx % 2 === 0 ? 'pe-md-5 text-end' : 'ps-md-5 offset-md-6'}`}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className="timeline-card glass-panel p-4 position-relative" style={{ borderLeft: `3px solid ${event.color}` }}>
                  <div className="timeline-dot position-absolute" style={{ 
                    width: '12px', height: '12px', background: event.color, borderRadius: '50%',
                    top: '20px', [idx % 2 === 0 ? 'right' : 'left']: '-36px'
                  }} />
                  <span className="badge mb-2" style={{ background: event.color, color: '#000' }}>{event.year}</span>
                  <h5 className="fw-bold mb-2">{event.title}</h5>
                  <p className="extra-small text-white-50 m-0">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 6. FLOATING TICKER (Variant) ---
const InsightTicker = () => {
  const tickerText = "✦ DATA-DRIVEN INSIGHTS ✦ FUTURE TRENDS ✦ INDUSTRY ANALYTICS ✦";
  
  return (
    <div className="ticker-container py-3 my-4 position-relative overflow-hidden">
      <motion.div 
        className="ticker-content d-inline-block white-space-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <span className="ticker-text display-6 fw-bold me-4">{tickerText}</span>
        <span className="ticker-text display-6 fw-bold me-4">{tickerText}</span>
      </motion.div>
    </div>
  );
};

// --- 7. NEWSLETTER SIGNUP ---
const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  
  return (
    <section className="py-5">
      <div className="container">
        <motion.div 
          className="newsletter-box rounded-4 p-5 text-center position-relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="newsletter-glow position-absolute top-0 start-0 w-100 h-100" style={{ background: 'radial-gradient(circle at center, rgba(219,255,0,0.1), transparent)', pointerEvents: 'none' }} />
          <h3 className="fw-bold mb-3">Stay <span className="text-lime">Insightful</span></h3>
          <p className="text-white-50 mb-4">Get weekly insights delivered to your inbox</p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <input 
              type="email" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
  );
};

// --- 8. HERO SECTION FOR INSIGHT PAGE (UPDATED WITH WHITE BACKGROUND) ---
const InsightHero = () => {
  return (
    <section className="insight-hero-white d-flex align-items-center position-relative overflow-hidden " style={{
      minHeight: '100vh',
      background: '#FFFFFF',
      paddingTop: '120px'
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
            ✦ KNOWLEDGE HUB ✦
          </span>
          <h1 className="hero-title-insight fw-black mb-4" style={{ color: '#000000' }}>
            Insights That<br />
            <span style={{ color: '#dbff00' }}>Shape Tomorrow</span>
          </h1>
          <p className="mx-auto" style={{ 
            maxWidth: '600px',
            color: '#666666'
          }}>
            Explore cutting-edge research, industry trends, and expert perspectives on the future of digital interaction.
          </p>
          
          {/* Animated search bar */}
          <motion.div 
            className="search-bar mx-auto mt-5 d-flex align-items-center justify-content-between"
            style={{ background: '#F8F9FA', borderRadius: '50px', padding: '4px', maxWidth: '450px', border: '1px solid #E0E0E0' }}
            whileHover={{ borderColor: '#dbff00' }}
          >
            <input 
              type="text" 
              placeholder="Search insights..."
              className="bg-transparent border-0 px-4 py-2 w-100"
              style={{ outline: 'none', color: '#000000' }}
            />
            <motion.div className="search-icon px-3 py-2 rounded-pill" style={{ background: '#dbff00', color: '#000', cursor: 'pointer' }}>
              🔍
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      <div className="orb-insight" style={{ position: 'absolute', width: '600px', height: '600px', filter: 'blur(150px)', opacity: 0.05, background: '#dbff00', top: '-10%', right: '-10%' }} />
    </section>
  );
};

// --- MAIN INSIGHT PAGE COMPONENT ---
const InsightPage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  const articles = [
    {
      title: "The Rise of WebGL in Modern Web Design",
      excerpt: "How 3D graphics are transforming user experiences across industries.",
      category: "TECHNOLOGY",
      date: "Apr 15, 2024",
      readTime: 5,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop"
    },
    {
      title: "Real-time Interactions: The New Standard",
      excerpt: "Why users expect instant feedback and how to deliver it seamlessly.",
      category: "UX TRENDS",
      date: "Apr 10, 2024",
      readTime: 4,
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=200&fit=crop"
    },
    {
      title: "Future of Immersive Digital Experiences",
      excerpt: "From AR to VR, what's next for interactive web technologies.",
      category: "INNOVATION",
      date: "Apr 5, 2024",
      readTime: 7,
      image: "https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=400&h=200&fit=crop"
    },
    {
      title: "Performance Optimization for 3D Web",
      excerpt: "Best practices for smooth 60fps experiences across all devices.",
      category: "DEVELOPMENT",
      date: "Mar 28, 2024",
      readTime: 6,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop"
    },
    {
      title: "Designing for the Metaverse",
      excerpt: "Principles for creating engaging virtual spaces that users love.",
      category: "DESIGN",
      date: "Mar 20, 2024",
      readTime: 8,
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=200&fit=crop"
    },
    {
      title: "AI-Powered Personalization",
      excerpt: "How machine learning is revolutionizing user experiences.",
      category: "AI TECH",
      date: "Mar 15, 2024",
      readTime: 5,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop"
    }
  ];

  return (
    <div ref={containerRef} className="bg-black text-white position-relative min-vh-100">
      <div className="grid-overlay" />

      {/* Hero Section - White Background */}
      <InsightHero />

      {/* Stats Section */}
      <section className="py-4">
        <div className="container">
          <div className="row g-2">
            <InsightStatCard number="150+" label="Research Papers" color="#dbff00" trend="↑ 45% YoY" description="Peer-reviewed studies published" />
            <InsightStatCard number="50K+" label="Active Readers" color="#0066FF" trend="↑ 120% YoY" description="Global community members" />
            <InsightStatCard number="24+" label="Industry Reports" color="#ff3366" trend="New in 2024" description="Comprehensive market analysis" />
            <InsightStatCard number="15" label="Expert Contributors" color="#00ffcc" trend="Global experts" description="Leading voices in tech" />
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge bg-lime text-dark mb-2 px-3 py-2 rounded-pill small fw-bold">✦ LATEST INSIGHTS ✦</span>
            <h2 className="display-6 fw-bold">Featured <span className="text-lime">Articles</span></h2>
          </div>
          <div className="row">
            {articles.slice(0, 3).map((article, idx) => (
              <InsightArticleCard key={idx} article={article} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Data Visualization + Quote Row - ENTIRE SECTION WITH WHITE BACKGROUND */}
      <section className="py-5" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div className="row">
            <DataVizCard />
            <InsightQuoteCard />
          </div>
        </div>
      </section>

      {/* Floating Ticker */}
      <InsightTicker />

      {/* Timeline Section */}
      <InsightTimeline />

      {/* More Articles */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="h3 fw-bold">More <span className="text-lime">Insights</span></h2>
          </div>
          <div className="row">
            {articles.slice(3, 6).map((article, idx) => (
              <InsightArticleCard key={idx} article={article} index={idx + 3} />
            ))}
          </div>
          <div className="text-center mt-4">
            <motion.button 
              className="btn-outline-lime"
              whileHover={{ scale: 1.05 }}
              style={{ background: 'transparent', border: '2px solid #dbff00', color: '#dbff00', padding: '10px 30px', borderRadius: '50px', fontWeight: 'bold' }}
            >
              Load More Insights →
            </motion.button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      <style>{`
        .text-lime { color: #dbff00; }
        .bg-lime { background-color: #dbff00; }
        .fw-black { font-weight: 900; }
        .extra-small { font-size: 0.75rem; }
        .hero-title-insight { font-size: clamp(2.5rem, 8vw, 4.5rem); line-height: 1.2; }
        .border-white-10 { border-color: rgba(255,255,255,0.08) !important; }
        .cursor-pointer { cursor: pointer; }
        .object-fit-cover { object-fit: cover; }
        
        .grid-overlay {
          position: absolute; inset: 0; pointer-events: none;
          background-image: linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 40px 40px;
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

        /* Article Card */
        .article-card { background: rgba(255,255,255,0.02); border-radius: 20px; transition: all 0.3s ease; border: 1px solid rgba(255,255,255,0.1); }
        .glass-panel { backdrop-filter: blur(10px); }

        /* Ticker */
        .ticker-container { background: rgba(219,255,0,0.05); border-top: 1px solid rgba(219,255,0,0.2); border-bottom: 1px solid rgba(219,255,0,0.2); }
        .ticker-content { white-space: nowrap; font-size: 2rem; font-weight: 900; letter-spacing: 4px; }
        .ticker-text { background: linear-gradient(90deg, #dbff00, #ffffff, #dbff00); -webkit-background-clip: text; color: transparent; font-size: 1.5rem; }

        /* Timeline */
        .timeline-wrapper { position: relative; }
        .translate-x-n50 { transform: translateX(-50%); }
        
        /* Newsletter */
        .newsletter-box { background: linear-gradient(135deg, #0a0a0a, #050505); border: 1px solid rgba(219,255,0,0.2); }
        .newsletter-input:focus { outline: none; border: 1px solid #dbff00; }
        
        /* Buttons */
        .btn-lime-glow { 
          background: #dbff00; color: #000; border: none; padding: 12px 30px; 
          border-radius: 50px; font-weight: 800; transition: all 0.3s ease;
          box-shadow: 0 0 20px rgba(219,255,0,0.3);
        }
        .btn-lime-glow:hover {
          transform: scale(1.05);
          box-shadow: 0 0 30px rgba(219,255,0,0.5);
        }
        
        .btn-outline-lime:hover {
          background: #dbff00;
          color: #000;
        }
        
        .cta-box { background: #050505; }
        
        /* Progress Bar */
        .progress-bar-bg { background: rgba(255,255,255,0.1); }
        
        .insight-hero-white {
          position: relative;
        }
        
        @media (max-width: 768px) {
          .ticker-text { font-size: 0.9rem; }
          .hero-title-insight { font-size: 2rem; }
        }
      `}</style>
    </div>
  );
};

export default InsightPage;