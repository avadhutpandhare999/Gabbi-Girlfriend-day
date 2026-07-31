import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  const [typedText, setTypedText] = useState('');
  const fullText = "When you're ready...\ncome walk through our little universe.";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 70);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20 relative">
      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-pink-500/12 border border-pink-500/30 text-pink-300 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-7 shadow-[0_0_20px_rgba(236,72,153,0.2)]">
        <span>Happy Girlfriend's Day ❤️</span>
      </div>

      <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight mb-5 bg-gradient-to-r from-white via-pink-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(236,72,153,0.3)]">
        Happy Girlfriend's Day ❤️
      </h1>

      <p className="text-lg sm:text-2xl text-gray-400 max-w-2xl mb-8 font-light leading-relaxed">
        For the most beautiful soul I've ever known.
      </p>

      <div className="min-h-[3.5rem] mb-11 text-pink-300 font-display italic text-lg sm:text-xl max-w-md whitespace-pre-line leading-relaxed">
        {typedText}
      </div>

      <button
        onClick={onStart}
        className="group relative inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-base shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:shadow-[0_0_45px_rgba(236,72,153,0.6)] transform hover:-translate-y-1 hover:scale-105 active:translate-y-0 transition-all duration-300 cursor-pointer"
      >
        <span>Begin Our Story</span>
        <Sparkles className="w-5 h-5 text-yellow-300 group-hover:rotate-12 transition-transform" />
      </button>
    </section>
  );
};
