import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section id="about" className="py-5">
      <div className="container">
        <div className="row g-5">
          {/* Left Column - (ABOUT) - Smaller width */}
          <motion.div 
            className="col-lg-2"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-uppercase mb-4" style={{ 
              fontFamily: "'Lay Grotesk - Trial Black', sans-serif", 
              fontSize: '24px' 
            }}>
              (ABOUT)
            </p>
          </motion.div>

          {/* Right Column - All Text Content - Larger width */}
          <motion.div 
            className="col-lg-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="display-3 mb-4" style={{ 
              fontFamily: "'Lay Grotesk - Trial Medium', sans-serif",
              lineHeight: '1.1',
              fontWeight: '500'
            }}>
              Fluent in Streetwear and Software, our team of curious and creative minds seeks to provoke thought and emotion with every project.
            </h3>
            
            <p className="fs-4" style={{ 
              fontFamily: "'Lay Grotesk - Trial Medium', sans-serif",
              lineHeight: '1.5',
              color: '#0e0c0c'
            }}>
              We've successfully launched hundreds of <em>digital experiences</em>, including websites, products, apps, and e-commerce platforms, tailoring our approach to meet the needs of startups and global corporations alike.
            </p>
          </motion.div>
        </div>

        {/* Image Section */}
        <motion.div 
          className="mt-5 pt-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <img 
              src="https://framerusercontent.com/images/R4awib6TjNZjrU13Fc8KHDvZig.png" 
              alt="Team" 
              className="img-fluid rounded-4"
              style={{ maxWidth: '100%' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;