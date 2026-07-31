import React from 'react';
import { apologyLetterText } from '../data/storyData';

export const ApologyCard: React.FC = () => {
  return (
    <section id="section-8" className="py-24 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <span className="text-xs font-semibold tracking-[3px] uppercase text-pink-400 block mb-3">
          Vulnerability
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-white to-pink-300 bg-clip-text text-transparent mb-4">
          A Heart I Owe You
        </h2>
        <p className="text-gray-400 text-base sm:text-lg">
          A sincere promise from the bottom of my soul.
        </p>
      </div>

      <div className="bg-radial from-pink-500/10 via-[#0f0f1a]/90 to-[#07070d] border border-pink-500/25 rounded-3xl p-8 sm:p-14 shadow-[0_0_50px_rgba(236,72,153,0.15)] backdrop-blur-xl">
        <div className="font-handwriting text-xl sm:text-2xl leading-relaxed text-gray-200 whitespace-pre-line tracking-wide">
          {apologyLetterText}
        </div>
      </div>
    </section>
  );
};
