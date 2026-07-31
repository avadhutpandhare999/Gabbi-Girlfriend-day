import React from 'react';
import { Disc, Music, Image as ImageIcon } from 'lucide-react';

interface NavbarProps {
  isPlaying: boolean;
  onToggleAudio: () => void;
  onOpenPhotoManager: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isPlaying,
  onToggleAudio,
  onOpenPhotoManager,
}) => {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-[1000] flex items-center justify-between gap-4 px-6 py-2.5 bg-[#0f0f1a]/70 backdrop-blur-xl border border-white/12 rounded-full shadow-2xl w-[calc(100%-2rem)] max-w-[650px]">
      <div className="text-sm font-bold tracking-wider flex items-center gap-2 text-white">
        <span className="text-pink-500 animate-pulse">❤️</span>
        <span>Our Universe</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onOpenPhotoManager}
          className="bg-white/8 border border-white/12 hover:bg-purple-500/20 hover:border-purple-400/50 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all duration-300"
          title="Upload real photos for Gabbii"
        >
          <ImageIcon className="w-3.5 h-3.5 text-pink-400" />
          <span className="hidden sm:inline">Photos</span>
        </button>

        <button
          onClick={onToggleAudio}
          className={`bg-white/8 border border-white/12 hover:bg-pink-500/20 hover:border-pink-500 text-white text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-all duration-300 ${
            isPlaying ? 'border-pink-500/50 bg-pink-500/10' : ''
          }`}
        >
          {isPlaying ? (
            <Disc className="w-3.5 h-3.5 text-pink-400 animate-spin-slow" />
          ) : (
            <Music className="w-3.5 h-3.5 text-gray-300" />
          )}
          <span>{isPlaying ? 'Pause Music' : 'Play Music'}</span>
        </button>
      </div>
    </header>
  );
};
