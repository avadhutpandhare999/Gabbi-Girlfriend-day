import React, { useRef, useState, useEffect } from 'react';
import { defaultSongs } from '../data/storyData';
import { Play, Pause, SkipBack, SkipForward, Music } from 'lucide-react';
import { MemoryImage } from './MemoryImage';

interface PlaylistPlayerProps {
  isPlaying: boolean;
  onToggleAudio: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

export const PlaylistPlayer: React.FC<PlaylistPlayerProps> = ({
  isPlaying,
  onToggleAudio,
  audioRef,
}) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(225); // 3:45 default
  const [customTrackName, setCustomTrackName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const currentSong = defaultSongs[currentSongIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
  }, [audioRef]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
  };

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % defaultSongs.length);
    setCustomTrackName(null);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prev) => (prev - 1 + defaultSongs.length) % defaultSongs.length);
    setCustomTrackName(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && audioRef.current) {
      const url = URL.createObjectURL(file);
      audioRef.current.src = url;
      setCustomTrackName(file.name.replace(/\.[^/.]+$/, ''));
      audioRef.current.play().then(() => {
        if (!isPlaying) onToggleAudio();
      }).catch(console.error);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === Infinity) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section id="section-6" className="py-24 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <span className="text-xs font-semibold tracking-[3px] uppercase text-pink-400 block mb-3">
          Music
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-white to-pink-300 bg-clip-text text-transparent mb-4">
          Our Playlist
        </h2>
        <p className="text-gray-400 text-base sm:text-lg">
          The soundtrack to our love story.
        </p>
      </div>

      <div className="glass-card max-w-md mx-auto p-8 flex flex-col items-center text-center shadow-2xl">
        <div
          className={`w-48 h-48 rounded-full border-4 border-white/12 shadow-[0_0_40px_rgba(236,72,153,0.3)] overflow-hidden mb-7 relative bg-[#12121e] ${
            isPlaying ? 'animate-spin-slow' : ''
          }`}
        >
          <MemoryImage
            photoKey={currentSong.albumArtKey}
            label={currentSong.title}
            className="w-full h-full object-cover"
          />
        </div>

        <h3 className="text-xl font-bold text-white mb-1">
          {customTrackName || currentSong.title}
        </h3>
        <p className="text-sm text-pink-400 font-medium mb-6">
          {customTrackName ? 'Custom Audio Track' : currentSong.artist}
        </p>

        <div className="w-full mb-6">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-pink-500"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center gap-6 mb-6">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full bg-white/8 border border-white/12 flex items-center justify-center text-white hover:scale-108 transition-all"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            onClick={onToggleAudio}
            className="w-16 h-16 rounded-full bg-pink-500 text-white flex items-center justify-center hover:scale-108 shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all"
          >
            {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
          </button>

          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-white/8 border border-white/12 flex items-center justify-center text-white hover:scale-108 transition-all"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        <div>
          <input
            type="file"
            ref={fileInputRef}
            accept="audio/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 rounded-full bg-white/5 border border-white/15 text-xs text-gray-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <Music className="w-3.5 h-3.5 text-pink-400" />
            <span>Select Audio Track From Device</span>
          </button>
        </div>
      </div>
    </section>
  );
};
