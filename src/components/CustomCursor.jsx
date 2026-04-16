import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredElement, setHoveredElement] = useState(null);
  const [hoveredElementRect, setHoveredElementRect] = useState(null);
  
  // Mouse position with spring animation for smooth following
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  
  // Size animation
  const cursorSize = useSpring(20, springConfig);
  const cursorRadius = useSpring(4, springConfig);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    const handleMouseEnter = () => {
      cursorSize.set(20);
      cursorRadius.set(4);
    };
    
    const handleMouseLeave = () => {
      cursorSize.set(16);
      cursorRadius.set(2);
    };
    
    // Handle hover on focusable elements
    const handleElementMouseEnter = (e) => {
      const target = e.target.closest('a, button, [data-cursor], [data-blobity]');
      if (target) {
        const rect = target.getBoundingClientRect();
        setHoveredElementRect(rect);
        setIsHovering(true);
        setHoveredElement(target);
        
        // Get custom attributes if any
        const customSize = target.getAttribute('data-cursor-size');
        const customRadius = target.getAttribute('data-cursor-radius');
        
        cursorSize.set(customSize ? parseInt(customSize) : 20);
        cursorRadius.set(customRadius ? parseInt(customRadius) : 12);
      }
    };
    
    const handleElementMouseLeave = () => {
      setIsHovering(false);
      setHoveredElement(null);
      setHoveredElementRect(null);
      cursorSize.set(16);
      cursorRadius.set(4);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleElementMouseEnter);
    document.addEventListener('mouseout', handleElementMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleElementMouseEnter);
      document.removeEventListener('mouseout', handleElementMouseLeave);
    };
  }, [mouseX, mouseY, cursorSize, cursorRadius]);
  
  // For morphing effect when hovering over elements
  const morphX = useSpring(isHovering && hoveredElementRect ? hoveredElementRect.left + hoveredElementRect.width / 2 : 0, springConfig);
  const morphY = useSpring(isHovering && hoveredElementRect ? hoveredElementRect.top + hoveredElementRect.height / 2 : 0, springConfig);
  const morphWidth = useSpring(isHovering && hoveredElementRect ? hoveredElementRect.width : 16, springConfig);
  const morphHeight = useSpring(isHovering && hoveredElementRect ? hoveredElementRect.height : 16, springConfig);
  
  useEffect(() => {
    if (isHovering && hoveredElementRect) {
      morphX.set(hoveredElementRect.left + hoveredElementRect.width / 2);
      morphY.set(hoveredElementRect.top + hoveredElementRect.height / 2);
      morphWidth.set(hoveredElementRect.width + 20);
      morphHeight.set(hoveredElementRect.height + 20);
    } else {
      morphX.set(0);
      morphY.set(0);
      morphWidth.set(16);
      morphHeight.set(16);
    }
  }, [isHovering, hoveredElementRect, morphX, morphY, morphWidth, morphHeight]);
  
  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);
  
  return (
    <>
      {/* Main cursor circle */}
      <motion.div
        ref={cursorRef}
        className="custom-cursor"
        style={{
          x: cursorX,
          y: cursorY,
          width: cursorSize,
          height: cursorSize,
          borderRadius: cursorRadius,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      
      {/* Morphing element for hover effects */}
      {isHovering && hoveredElementRect && (
        <motion.div
          className="custom-cursor-morph"
          style={{
            x: morphX,
            y: morphY,
            width: morphWidth,
            height: morphHeight,
            translateX: '-50%',
            translateY: '-50%',
            borderRadius: 12,
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      <style jsx>{`
        .custom-cursor {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 9999;
          background: radial-gradient(circle, rgba(219,255,0,0.8) 0%, rgba(219,255,0,0.3) 100%);
          backdrop-filter: blur(2px);
          mix-blend-mode: difference;
          transition: width 0.2s ease, height 0.2s ease, border-radius 0.2s ease;
        }
        
        .custom-cursor-morph {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 9998;
          background: rgba(219, 255, 0, 0.15);
          border: 1px solid rgba(219, 255, 0, 0.5);
          transition: width 0.2s ease, height 0.2s ease;
        }
        
        /* Hide cursor on interactive elements */
        a, button, [data-cursor], [data-blobity] {
          cursor: none;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;