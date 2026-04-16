import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import PageLoader from './components/PageLoader';
import Hero from './components/Hero';
import WorkSection from './components/WorkSection';
import ServicesSection from './components/ServicesSection';
import ClientsSection from './components/ClientsSection';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import CanvasCursor from './components/CanvasCursor';
import HorizontalScrollSection from './components/HorizontalScrollSection';
import ProcessSection from './components/ProcessSection';
import Capabilities from './components/Capabilities';

function App() {
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }, []);

  return (
    <>
      <PageLoader />
      <CustomCursor />
      <div className="app">
        <Navbar />
        <Hero />
        <WorkSection />
        <ProcessSection />
        {/* <AboutSection /> */}
        <HorizontalScrollSection />
        <ServicesSection />
        {/* <ClientsSection /> */}
        <CanvasCursor />
        {/* <InteractiveBanner />; */}
        <Capabilities />
        <Footer />
      </div>
    </>
  );
}

export default App;