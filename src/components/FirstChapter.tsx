import React from 'react';
import { MemoryImage } from './MemoryImage';

export const FirstChapter: React.FC = () => {
  return (
    <section id="section-1" className="min-h-screen flex items-center justify-center py-20 px-4 max-w-5xl mx-auto">
      <div className="glass-card p-8 sm:p-12 w-full grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-8 sm:gap-12 items-center">
        <div className="relative rounded-2xl overflow-hidden border border-white/12 shadow-2xl aspect-[4/5] bg-[#12121e] group">
          <MemoryImage
            photoKey="photo1.jpg"
            label="Our First Chapter"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>

        <div className="flex flex-col gap-5">
          <span className="text-xs font-semibold tracking-[3px] uppercase text-pink-400">
            Where it all Started
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
            When i fell for your eyes
          </h2>
          <blockquote className="text-gray-300 text-lg leading-relaxed border-l-4 border-pink-500 pl-5 italic font-display">
            "From sitting in adjacent cubicles to building a whole universe together... falling for your eyes was the sweetest thing that ever happened to me."
          </blockquote>
        </div>
      </div>
    </section>
  );
};
