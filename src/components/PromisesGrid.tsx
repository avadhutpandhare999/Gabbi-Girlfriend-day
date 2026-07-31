import React, { useState } from 'react';
import { promisesData } from '../data/storyData';

export const PromisesGrid: React.FC = () => {
  const [keptPromises, setKeptPromises] = useState<Record<number, boolean>>({});

  const togglePromise = (id: number) => {
    setKeptPromises(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="section-10" className="py-24 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <span className="text-xs font-semibold tracking-[3px] uppercase text-pink-400 block mb-3">
          Commitment
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-white to-pink-300 bg-clip-text text-transparent mb-4">
          How I Want To Love You Better
        </h2>
        <p className="text-gray-400 text-base sm:text-lg">
          Click each card to make a permanent promise to you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {promisesData.map((promiseText, idx) => {
          const promiseNum = idx + 1;
          const isKept = !!keptPromises[promiseNum];

          return (
            <div
              key={promiseNum}
              onClick={() => togglePromise(promiseNum)}
              className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 relative group overflow-hidden ${
                isKept
                  ? 'bg-pink-500/15 border-pink-500 shadow-[0_0_25px_rgba(236,72,153,0.3)]'
                  : 'glass-card hover:border-pink-500/50 hover:-translate-y-1'
              }`}
            >
              <h4 className="text-sm font-bold text-white mb-2">
                Promise #{promiseNum}
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {promiseText}
              </p>
              <span
                className={`text-xs font-semibold block transition-colors ${
                  isKept ? 'text-pink-300' : 'text-gray-400 group-hover:text-pink-400'
                }`}
              >
                {isKept ? 'Promise Made ❤️' : 'Tap to Promise'}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
