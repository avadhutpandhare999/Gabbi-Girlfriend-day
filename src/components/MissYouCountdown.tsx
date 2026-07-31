import React, { useState, useEffect } from 'react';
import { MemoryImage } from './MemoryImage';

export const MissYouCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    // Target date: August 20, 2026 or ~19 days from current prompt time
    const targetDate = new Date("2026-08-20T00:00:00");

    const updateTimer = () => {
      const now = new Date();
      const diff = Math.max(0, targetDate.getTime() - now.getTime());

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days: String(d).padStart(2, '0'),
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0')
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="section-9" className="py-24 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <span className="text-xs font-semibold tracking-[3px] uppercase text-pink-400 block mb-3">
          Longing
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-white to-pink-300 bg-clip-text text-transparent">
          I Just Want To See You
        </h2>
      </div>

      <div className="glass-card p-8 sm:p-12 flex flex-col items-center text-center max-w-3xl mx-auto gap-8 shadow-2xl">
        <div className="w-full max-w-lg h-72 sm:h-80 rounded-2xl overflow-hidden border border-white/12 shadow-2xl bg-[#12121e]">
          <MemoryImage
            photoKey="photo20.jpg"
            label="I Miss You"
            className="w-full h-full object-cover"
          />
        </div>

        <p className="text-gray-300 text-lg sm:text-xl font-display italic max-w-xl">
          I really cant wait to see you again....my baby
        </p>

        <div className="w-full pt-4">
          <h3 className="text-sm font-semibold tracking-wider text-pink-400 uppercase mb-6">
            Until I Get To See My Baby Again ❤️
          </h3>

          <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-md mx-auto">
            <div className="glass-card p-4 text-center rounded-2xl">
              <span className="text-2xl sm:text-4xl font-extrabold text-white block mb-1">
                {timeLeft.days}
              </span>
              <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest font-semibold">
                Days
              </span>
            </div>

            <div className="glass-card p-4 text-center rounded-2xl">
              <span className="text-2xl sm:text-4xl font-extrabold text-white block mb-1">
                {timeLeft.hours}
              </span>
              <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest font-semibold">
                Hours
              </span>
            </div>

            <div className="glass-card p-4 text-center rounded-2xl">
              <span className="text-2xl sm:text-4xl font-extrabold text-white block mb-1">
                {timeLeft.minutes}
              </span>
              <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest font-semibold">
                Minutes
              </span>
            </div>

            <div className="glass-card p-4 text-center rounded-2xl">
              <span className="text-2xl sm:text-4xl font-extrabold text-white block mb-1">
                {timeLeft.seconds}
              </span>
              <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest font-semibold">
                Seconds
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
