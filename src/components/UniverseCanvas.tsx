import React, { useEffect, useRef } from 'react';

export const UniverseCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Stars
    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.005
    }));

    // Fireflies
    const fireflies = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.5 + 0.2
    }));

    // Floating Hearts
    interface FloatingHeart {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      alpha: number;
    }
    const hearts: FloatingHeart[] = [];

    const spawnHeart = () => {
      hearts.push({
        x: Math.random() * width,
        y: height + 20,
        size: Math.random() * 12 + 10,
        speedY: Math.random() * 1.5 + 0.8,
        speedX: (Math.random() - 0.5) * 0.5,
        alpha: 1
      });
    };

    const heartInterval = setInterval(() => {
      if (hearts.length < 25) spawnHeart();
    }, 800);

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Stars
      ctx.fillStyle = '#ffffff';
      stars.forEach(s => {
        s.alpha += s.speed;
        if (s.alpha > 1 || s.alpha < 0) s.speed = -s.speed;
        ctx.globalAlpha = Math.max(0, Math.min(1, s.alpha));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Fireflies
      fireflies.forEach(f => {
        f.angle += 0.02;
        f.x += Math.cos(f.angle) * f.speed;
        f.y += Math.sin(f.angle) * f.speed;
        if (f.x < 0) f.x = width;
        if (f.x > width) f.x = 0;
        if (f.y < 0) f.y = height;
        if (f.y > height) f.y = 0;

        ctx.globalAlpha = ((Math.sin(f.angle) + 1) / 2) * 0.8;
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Floating Hearts
      for (let i = hearts.length - 1; i >= 0; i--) {
        const h = hearts[i];
        h.y -= h.speedY;
        h.x += h.speedX;
        h.alpha -= 0.003;

        if (h.alpha <= 0 || h.y < -20) {
          hearts.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = h.alpha;
        ctx.fillStyle = '#ec4899';
        ctx.font = `${h.size}px sans-serif`;
        ctx.fillText('❤️', h.x, h.y);
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(heartInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
