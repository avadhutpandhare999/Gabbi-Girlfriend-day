import React from 'react';
import { Heart } from 'lucide-react';

interface VictoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#07070d]/95 z-[100000] flex flex-col items-center justify-center text-center p-6 backdrop-blur-3xl animate-fade-in">
      <Heart className="w-24 h-24 text-red-500 fill-red-500 mb-6 animate-pulse-heart drop-shadow-[0_0_40px_#ec4899]" />
      
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-pink-300 mb-4 bg-gradient-to-r from-white via-pink-300 to-purple-400 bg-clip-text text-transparent">
        Happy Girlfriend's Day ❤️
      </h1>
      
      <p className="text-lg sm:text-xl text-gray-300 max-w-lg mb-8 leading-relaxed font-light">
        Thank you for being my favorite person in the entire universe.
      </p>

      <button
        onClick={onClose}
        className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-base shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
      >
        Close & Continue
      </button>
    </div>
  );
};
