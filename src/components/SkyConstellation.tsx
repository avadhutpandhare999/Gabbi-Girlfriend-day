import React, { useRef, useEffect } from 'react';

export const SkyConstellation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const stars = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1
    }));

    interface HeartPoint {
      x: number;
      y: number;
      alpha: number;
    }
    const heartPoints: HeartPoint[] = [];

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      // Generate heart shape constellation points
      for (let t = 0; t < Math.PI * 2; t += 0.3) {
        const hx = cx + 16 * Math.pow(Math.sin(t), 3) * 3;
        const hy = cy - (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * 3;
        heartPoints.push({ x: hx, y: hy, alpha: 1 });
      }
    };

    canvas.addEventListener('click', handleClick);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Background stars
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Heart constellation points
      for (let i = heartPoints.length - 1; i >= 0; i--) {
        const p = heartPoints[i];
        p.alpha -= 0.005;

        if (p.alpha <= 0) {
          heartPoints.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = '#f472b6';
        ctx.shadowColor = '#ec4899';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="section-13" className="py-24 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <span className="text-xs font-semibold tracking-[3px] uppercase text-pink-400 block mb-3">
          Interactive Starlight
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-white to-pink-300 bg-clip-text text-transparent mb-4">
          The Sky
        </h2>
        <p className="text-gray-400 text-base sm:text-lg">
          Click anywhere in the night sky to form glowing heart constellations.
        </p>
      </div>

      <div className="w-full h-96 rounded-3xl border border-white/12 bg-[#07070d]/80 relative overflow-hidden cursor-crosshair shadow-2xl">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </section>
  );
};
