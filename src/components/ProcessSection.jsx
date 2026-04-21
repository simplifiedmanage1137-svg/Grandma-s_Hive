import React from 'react';

const processes = [
  { step: '01', title: 'STRATEGY', desc: 'Defining the digital roadmap for your brand. We analyze market trends and user behavior.', color: '#111111' },
  { step: '02', title: 'DESIGN', desc: 'Crafting interfaces that feel like magic. Focus on aesthetics and seamless usability.', color: '#1a1a1a' },
  { step: '03', title: 'DEVELOP', desc: 'High-performance code that scales. Using the latest tech stack for speed.', color: '#222222' },
  { step: '04', title: 'LAUNCH', desc: 'Deploying excellence to the world. Quality assurance and final optimization.', color: '#2a2a2a' }
];

const ProcessSection = () => {
  return (
    <section className="process-outer-section">
      <div className="process-overlay"></div>
      
      <div className="container position-relative" style={{ zIndex: 10 }}>
        <div className="row">
          
          {/* Left Side - Sticky Header */}
          <div className="col-lg-5">
            <div className="sticky-box">
              <h2 className="process-heading">
                HOW WE <br /> 
                <span className="lime-text">MAKE IT.</span>
              </h2>
            </div>
          </div>

          {/* Right Side - Compact Stacked Cards */}
          <div className="col-lg-7">
            <div className="stacked-cards-container">
              {processes.map((p, i) => (
                <div 
                  key={i} 
                  className="process-card-stacked"
                  style={{ 
                    top: `${10 + i * 3}vh`,
                    zIndex: i + 1,
                    backgroundColor: p.color
                  }}
                >
                  <div className="card-content-grid">
                    <span className="step-num">{p.step}</span>
                    <div className="card-text-area">
                      <h3 className="card-title-compact">{p.title}</h3>
                      <p className="card-desc-compact">{p.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>

      <style>
        {`
          .process-outer-section {
            position: relative;
            background-color: #000;
            background-image: url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            padding: 80px 0;
            min-height: 180vh;
          }

          /* Mobile fallback for background attachment */
          @media (max-width: 768px) {
            .process-outer-section {
              background-attachment: scroll;
              min-height: auto;
              padding: 60px 0;
            }
          }

          .process-overlay {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.85);
            z-index: 1;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
          }

          .row {
            display: flex;
            flex-wrap: wrap;
            margin: 0 -15px;
          }

          .col-lg-5, .col-lg-7 {
            padding: 0 15px;
          }

          .col-lg-5 {
            flex: 0 0 41.666%;
            max-width: 41.666%;
          }

          .col-lg-7 {
            flex: 0 0 58.333%;
            max-width: 58.333%;
          }

          .sticky-box {
            position: sticky;
            top: 20vh;
            height: fit-content;
          }

          .process-heading {
            font-family: 'Lay Grotesk - Trial Black', sans-serif;
            font-size: clamp(32px, 4.5vw, 64px);
            line-height: 0.9;
            color: #ffffff;
            text-transform: uppercase;
          }

          .lime-text { 
            color: #dbff00; 
          }

          /* --- COMPACT STACKING DESIGN (DESKTOP ORIGINAL) --- */
          .stacked-cards-container {
            position: relative;
            max-width: 600px;
            margin-left: auto;
          }

          .process-card-stacked {
            position: sticky;
            min-height: 220px;
            margin-bottom: 8vh;
            padding: 40px;
            border-radius: 20px;
            border: 1px solid rgba(255,255,255,0.08);
            box-shadow: 0 -15px 30px rgba(0,0,0,0.6);
            transition: all 0.3s ease;
          }

          /* Desktop stacking animation on hover */
          .process-card-stacked:hover {
            transform: translateY(-5px);
            border-color: rgba(219, 255, 0, 0.3);
            box-shadow: 0 -20px 40px rgba(0,0,0,0.8);
          }

          .card-content-grid {
            display: flex;
            gap: 25px;
            align-items: flex-start;
          }

          .step-num {
            font-family: 'Lay Grotesk - Trial Black', sans-serif;
            color: #dbff00;
            font-size: 1rem;
            font-weight: bold;
            line-height: 1.4;
          }

          .card-title-compact {
            font-size: clamp(24px, 3vw, 38px);
            font-weight: 900;
            color: #ffffff;
            margin-bottom: 12px;
            letter-spacing: -0.5px;
            line-height: 1;
          }

          .card-desc-compact {
            font-size: 1rem;
            color: #a0a0a0;
            line-height: 1.5;
            max-width: 90%;
          }

          /* ========== RESPONSIVE STYLES (Only for mobile/tablet) ========== */
          @media (max-width: 991px) {
            .row {
              flex-direction: column;
            }
            
            .col-lg-5, .col-lg-7 {
              flex: 0 0 100%;
              max-width: 100%;
            }
            
            .sticky-box {
              position: relative;
              top: 0;
              margin-bottom: 40px;
              text-align: center;
            }
            
            .stacked-cards-container {
              max-width: 100%;
              margin-left: 0;
            }
            
            .process-card-stacked {
              position: relative;
              top: 0 !important;
              min-height: auto;
              margin-bottom: 15px;
              padding: 30px;
            }
            
            .process-card-stacked:hover {
              transform: translateX(5px);
            }
          }

          @media (max-width: 768px) {
            .process-outer-section {
              padding: 60px 0;
            }
            
            .process-heading {
              font-size: clamp(32px, 8vw, 48px);
              line-height: 1.2;
            }
          }

          @media (max-width: 576px) {
            .process-card-stacked {
              padding: 20px;
            }
            
            .card-content-grid {
              flex-direction: column;
              gap: 12px;
            }
            
            .step-num {
              font-size: 14px;
            }
            
            .card-title-compact {
              font-size: 24px;
              margin-bottom: 10px;
            }
            
            .card-desc-compact {
              font-size: 14px;
              max-width: 100%;
            }
          }

          /* Performance optimization for reduced motion */
          @media (prefers-reduced-motion: reduce) {
            .process-card-stacked {
              transition: none;
            }
            
            .process-card-stacked:hover {
              transform: none;
            }
          }
        `}
      </style>
    </section>
  );
};

export default ProcessSection;