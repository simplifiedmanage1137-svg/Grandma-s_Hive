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
                    top: `${10 + i * 3}vh`, // Vertical stacking spacing
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

          .process-overlay {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.85);
            z-index: 1;
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

          .lime-text { color: #dbff00; }

          /* --- COMPACT STACKING DESIGN --- */
          .stacked-cards-container {
            position: relative;
            max-width: 600px; /* Card ki width limit ki hai taaki wo stretched na lage */
            margin-left: auto; /* Right alignment */
          }

          .process-card-stacked {
            position: sticky;
            min-height: 220px; /* Pehle 400px tha, ab size kam kar di hai */
            margin-bottom: 8vh;
            padding: 40px;
            border-radius: 20px;
            border: 1px solid rgba(255,255,255,0.08);
            box-shadow: 0 -15px 30px rgba(0,0,0,0.6);
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

          @media (max-width: 991px) {
            .stacked-cards-container { max-width: 100%; }
            .sticky-box { position: relative; top: 0; margin-bottom: 40px; }
            .process-card-stacked { 
              position: relative; 
              min-height: auto; 
              top: 0 !important;
              margin-bottom: 15px;
              padding: 30px;
            }
          }
        `}
      </style>
    </section>
  );
};

export default ProcessSection;