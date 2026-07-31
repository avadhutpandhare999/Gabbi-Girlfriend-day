import React, { useEffect, useState } from 'react';

export const CursorGlow: React.FC = () => {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [hasPointer, setHasPointer] = useState(false);

  useEffect(() => {
    // Only enable glow on devices with fine pointer (mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setHasPointer(mediaQuery.matches);

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    if (mediaQuery.matches) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!hasPointer) return null;

  return (
    <div
      className="fixed w-[400px] h-[400px] -mt-[200px] -ml-[200px] rounded-full pointer-events-none z-1 transition-transform duration-100 ease-out"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, rgba(168, 85, 247, 0.05) 40%, transparent 70%)'
      }}
    />
  );
};
