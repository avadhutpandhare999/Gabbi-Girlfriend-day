import React, { useState } from 'react';
import { reasonsList } from '../data/storyData';
import { Heart } from 'lucide-react';

export const ReasonsGrid: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleFlip = (id: number) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="section-4" className="py-24 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <span className="text-xs font-semibold tracking-[3px] uppercase text-pink-400 block mb-3">
          From My Heart
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-white to-pink-300 bg-clip-text text-transparent mb-4">
          20 Reasons I Love You
        </h2>
        <p className="text-gray-400 text-base sm:text-lg">
          Click on each card to reveal why you mean the world to me.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {reasonsList.map((reason, idx) => {
          const cardNum = idx + 1;
          const isFlipped = !!flippedCards[cardNum];

          return (
            <div
              key={cardNum}
              onClick={() => toggleFlip(cardNum)}
              className={`flip-card h-48 cursor-pointer ${isFlipped ? 'flipped' : ''}`}
            >
              <div className="flip-card-inner rounded-2xl">
                {/* Front */}
                <div className="flip-card-front bg-[#12121c]/80 border border-white/12 p-6 flex flex-col items-center justify-center text-center shadow-xl hover:border-pink-500/40 transition-colors">
                  <span className="absolute top-3 left-4 text-xs font-mono text-gray-500">
                    #{cardNum}
                  </span>
                  <Heart className="w-9 h-9 text-pink-500 fill-pink-500/20 mb-2 animate-pulse-heart" />
                  <span className="text-xs text-gray-400 font-medium">Click to Reveal</span>
                </div>

                {/* Back */}
                <div className="flip-card-back bg-gradient-to-br from-pink-500/20 via-purple-600/20 to-black/80 border border-pink-500/40 p-6 flex items-center justify-center text-center text-sm sm:text-base font-medium text-white leading-relaxed shadow-2xl backdrop-blur-md">
                  {reason}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
