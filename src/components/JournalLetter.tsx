import React from 'react';
import { longLetterText } from '../data/storyData';

export const JournalLetter: React.FC = () => {
  return (
    <section id="section-7" className="py-24 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs font-semibold tracking-[3px] uppercase text-pink-400 block mb-3">
          Journal
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-white to-pink-300 bg-clip-text text-transparent">
          A Letter For You
        </h2>
      </div>

      <div className="bg-[#14121e]/85 border border-white/12 rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        <div className="font-handwriting text-xl sm:text-2xl leading-relaxed text-gray-200 whitespace-pre-line tracking-wide">
          {longLetterText}
        </div>
      </div>
    </section>
  );
};
