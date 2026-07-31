import React from 'react';
import { Heart } from 'lucide-react';

interface FinalPoemProps {
  onLoveClick: () => void;
}

export const FinalPoem: React.FC<FinalPoemProps> = ({ onLoveClick }) => {
  return (
    <section id="final-section" className="py-28 px-4 max-w-4xl mx-auto text-center">
      <div className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold leading-relaxed bg-gradient-to-r from-white via-pink-200 to-pink-400 bg-clip-text text-transparent mb-10 max-w-3xl mx-auto">
        "I don't know what tomorrow holds.<br />
        But if life gives me the chance,<br />
        I'll choose you.<br />
        Again.<br />
        Again.<br />
        And every single time."
      </div>

      <p className="text-gray-300 text-base sm:text-lg italic max-w-2xl mx-auto mb-10 leading-relaxed font-light">
        Finally Gabbbuuuu....there are 1.6 billion people in this country , in that there are 35 million undergrad students, the probability of us meeting was mathematically 0 .......this is indeed a connection gabbuuu....we ll find crores fo people..but there will not a 2nd gabbi on this entire planet....and thats how precious you are....I LOVE YOU SO MUCHHHHHHHH
      </p>

      <div className="flex justify-center mb-10">
        <Heart className="w-24 h-24 text-red-500 fill-red-500 animate-pulse-heart drop-shadow-[0_0_30px_#ec4899]" />
      </div>

      <button
        onClick={onLoveClick}
        className="px-12 py-5 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 text-white font-extrabold text-xl shadow-[0_0_40px_rgba(236,72,153,0.5)] hover:shadow-[0_0_60px_rgba(236,72,153,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        I Love You ❤️
      </button>
    </section>
  );
};
