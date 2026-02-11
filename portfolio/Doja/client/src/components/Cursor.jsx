import React, { useEffect, useRef } from 'react';

const Cursor = () => {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const outline = outlineRef.current;

    const moveCursor = (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      // Muovi il punto subito
      if (dot) {
        dot.style.left = `${posX}px`;
        dot.style.top = `${posY}px`;
      }
      
      // Muovi il cerchio con animazione (Keyframe effect del tuo script)
      if (outline) {
        outline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
      }
    };

    // Effetto Hover sui link
    const addHover = () => {
        if(outline) outline.classList.add('cursor-hover'); 
        if(dot) dot.style.transform = 'translate(-50%, -50%) scale(0.5)';
    };
    const removeHover = () => {
        if(outline) outline.classList.remove('cursor-hover');
        if(dot) dot.style.transform = 'translate(-50%, -50%) scale(1)';
    };

    window.addEventListener('mousemove', moveCursor);
    
    // Cerchiamo tutti gli elementi cliccabili
    const clickables = document.querySelectorAll('button, a, input, .cursor-pointer');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', addHover);
        el.addEventListener('mouseleave', removeHover);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      clickables.forEach(el => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden lg:block fixed top-0 left-0 w-2 h-2 bg-amber-500 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"></div>
      <div ref={outlineRef} className="cursor-outline hidden lg:block fixed top-0 left-0 w-8 h-8 border border-amber-500/50 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-300"></div>
    </>
  );
};

export default Cursor;