import React from 'react';
import { X } from 'lucide-react';
import { MemoryImage } from './MemoryImage';

interface ImageModalProps {
  isOpen: boolean;
  photoKey: string | null;
  caption: string | null;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ isOpen, photoKey, caption, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-[#07070d]/92 backdrop-blur-2xl z-[10000] flex items-center justify-center p-4 transition-opacity duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-3xl w-full text-center flex flex-col items-center"
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-pink-400 p-2 text-2xl transition-colors cursor-pointer"
        >
          <X className="w-8 h-8" />
        </button>

        {photoKey && (
          <div className="max-h-[70vh] rounded-2xl overflow-hidden border border-white/15 shadow-2xl mb-5 bg-[#12121e]">
            <MemoryImage
              photoKey={photoKey}
              label={caption || 'Memory'}
              className="max-h-[70vh] w-auto max-w-full object-contain mx-auto"
            />
          </div>
        )}

        {caption && (
          <div className="text-white text-lg sm:text-xl font-display italic leading-relaxed max-w-xl bg-black/40 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
            {caption}
          </div>
        )}
      </div>
    </div>
  );
};
