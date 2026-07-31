import React from 'react';
import { timelineMilestones } from '../data/storyData';
import { MemoryImage } from './MemoryImage';

interface TimelineProps {
  onSelectPhoto?: (photoKey: string, caption: string) => void;
}

export const Timeline: React.FC<TimelineProps> = ({ onSelectPhoto }) => {
  return (
    <section id="section-2" className="py-24 px-4 max-w-5xl mx-auto flex flex-col items-center">
      <div className="text-center mb-16 max-w-2xl">
        <span className="text-xs font-semibold tracking-[3px] uppercase text-pink-400 block mb-3">
          The Journey with gabbii my baby
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-white to-pink-300 bg-clip-text text-transparent mb-4">
          Our Story
        </h2>
        <p className="text-gray-400 text-base sm:text-lg">
          Moments that defined our journey together.
        </p>
      </div>

      <div className="relative w-full">
        {/* Timeline center line */}
        <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-[2px] bg-gradient-to-b from-pink-500 via-purple-500 to-transparent -translate-x-1/2" />

        <div className="space-y-12">
          {timelineMilestones.map((item, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <div
                key={item.id}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-pink-500 border-4 border-[#07070d] shadow-[0_0_15px_#ec4899] z-10" />

                {/* Content Card */}
                <div
                  className={`w-full md:w-[calc(50%-2.5rem)] pl-12 md:pl-0 ${
                    isEven ? 'md:text-left' : 'md:text-left'
                  }`}
                >
                  <div className="glass-card p-6 rounded-2xl hover:border-pink-500/40 hover:-translate-y-1.5 transition-all duration-300 group">
                    <div
                      onClick={() => onSelectPhoto?.(item.photoKey, `${item.title} - ${item.date}`)}
                      className="cursor-pointer overflow-hidden rounded-xl mb-4 bg-[#12121e] h-48 sm:h-56 border border-white/10"
                    >
                      <MemoryImage
                        photoKey={item.photoKey}
                        label={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-pink-400 mb-1 block">
                      {item.date}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Spacer for two column balance */}
                <div className="hidden md:block w-[calc(50%-2.5rem)]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
