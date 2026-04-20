import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import PageLoader from './components/PageLoader';
import Hero from './components/Hero';
import WorkSection from './components/WorkSection';
import ServicesSection from './components/ServicesSection';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import CanvasCursor from './components/CanvasCursor';
import ProcessSection from './components/ProcessSection';
import AboutSection from './components/AboutSection';
import ScrollToTop from './components/ScrollToTop';
import InsightPage from './components/InsightPage';
import ContactPage from './components/ContactPage';
import ServicesPage from './components/ServicesPage';
import ServiceDetailPage from './components/ServiceDetailPage';

function App() {
  useEffect(() => {
    // Smooth scroll for anchor links on homepage only
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
    <Router>
      <ScrollToTop />
      <PageLoader />
      <CustomCursor />
      <div className="app">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <WorkSection />
                <ProcessSection />
                <ServicesSection />
                <CanvasCursor />
              </>
            }
          />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/insights" element={<InsightPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServiceDetailPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;