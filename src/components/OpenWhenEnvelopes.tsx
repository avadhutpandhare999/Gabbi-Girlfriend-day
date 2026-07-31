import React from 'react';
import { openWhenData } from '../data/storyData';

interface OpenWhenEnvelopesProps {
  onOpenEnvelope: (title: string, note: string) => void;
}

export const OpenWhenEnvelopes: React.FC<OpenWhenEnvelopesProps> = ({ onOpenEnvelope }) => {
  return (
    <section id="section-5" className="py-24 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <span className="text-xs font-semibold tracking-[3px] uppercase text-pink-400 block mb-3">
          Envelopes
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-white to-pink-300 bg-clip-text text-transparent mb-4">
          Open When...
        </h2>
        <p className="text-gray-400 text-base sm:text-lg">
          Little notes for whenever you need my warmth from afar.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {openWhenData.map((item) => (
          <div
            key={item.id}
            onClick={() => onOpenEnvelope(item.title, item.note)}
            className="glass-card p-7 text-center cursor-pointer hover:-translate-y-1.5 hover:border-pink-500/50 hover:shadow-[0_10px_30px_rgba(236,72,153,0.2)] transition-all duration-300 group"
          >
            <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </span>
            <h3 className="text-lg font-semibold text-white mb-2">
              {item.title}
            </h3>
            <span className="text-xs text-pink-400 font-medium">
              Click to open envelope
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
