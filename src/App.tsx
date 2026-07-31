import React, { useState, useRef, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { UniverseCanvas } from './components/UniverseCanvas';
import { CursorGlow } from './components/CursorGlow';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Hero } from './components/Hero';
import { FirstChapter } from './components/FirstChapter';
import { Timeline } from './components/Timeline';
import { MemoryWall } from './components/MemoryWall';
import { ReasonsGrid } from './components/ReasonsGrid';
import { OpenWhenEnvelopes } from './components/OpenWhenEnvelopes';
import { PlaylistPlayer } from './components/PlaylistPlayer';
import { JournalLetter } from './components/JournalLetter';
import { ApologyCard } from './components/ApologyCard';
import { MissYouCountdown } from './components/MissYouCountdown';
import { PromisesGrid } from './components/PromisesGrid';
import { BucketList } from './components/BucketList';
import { PolaroidWall } from './components/PolaroidWall';
import { SkyConstellation } from './components/SkyConstellation';
import { FinalPoem } from './components/FinalPoem';
import { ImageModal } from './components/ImageModal';
import { VictoryModal } from './components/VictoryModal';
import { PhotoUploadModal } from './components/PhotoUploadModal';
import { ConfettiCanvas, ConfettiRef } from './components/ConfettiCanvas';

export default function App() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const confettiRef = useRef<ConfettiRef | null>(null);

  // Modal states
  const [modalPhoto, setModalPhoto] = useState<string | null>(null);
  const [modalCaption, setModalCaption] = useState<string | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);

  const [isVictoryModalOpen, setIsVictoryModalOpen] = useState<boolean>(false);
  const [isPhotoManagerOpen, setIsPhotoManagerOpen] = useState<boolean>(false);
  const [photoManagerSlot, setPhotoManagerSlot] = useState<string>('photo1.jpg');

  // Refresh state trigger when custom photo uploaded
  const [, setPhotoUpdateKey] = useState<number>(0);

  const handleOpenPhotoManager = (slotKey?: string) => {
    if (slotKey) {
      setPhotoManagerSlot(slotKey);
    }
    setIsPhotoManagerOpen(true);
  };

  // Soft Ambient Synth Fallback
  const playSynthChord = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      const freqs = [261.63, 329.63, 392.00, 493.88]; // C maj7
      freqs.forEach(f => {
        if (!audioCtxRef.current) return;
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        osc.frequency.value = f;
        gain.gain.setValueAtTime(0.015, audioCtxRef.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 4);
        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start();
        osc.stop(audioCtxRef.current.currentTime + 4);
      });
    } catch {
      // Ignore audio context errors
    }
  };

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      if (audio) audio.pause();
      setIsPlaying(false);
    } else {
      if (audio) {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Play synth chord fallback if audio file missing or autoplay blocked
          playSynthChord();
          setIsPlaying(true);
        });
      } else {
        playSynthChord();
        setIsPlaying(true);
      }
    }
  };

  // Start background audio on first user touch/click
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!isPlaying && audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Silent catch
        });
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isPlaying]);

  const handleStartStory = () => {
    if (!isPlaying) toggleAudio();
    document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openPhotoModal = (photoKey: string, caption: string) => {
    setModalPhoto(photoKey);
    setModalCaption(caption);
    setIsImageModalOpen(true);
  };

  const openEnvelopeModal = (title: string, note: string) => {
    setModalPhoto(null);
    setModalCaption(`💌 ${title}\n\n${note}`);
    setIsImageModalOpen(true);
  };

  const handleLoveClick = () => {
    confettiRef.current?.trigger();
    setIsVictoryModalOpen(true);
  };

  return (
    <div className="relative min-h-screen text-[#f8fafc] bg-[#07070d] font-sans selection:bg-pink-500 selection:text-white">
      {/* Background Audio */}
      <audio ref={audioRef} src="music/song.mp3" loop />

      {/* Top Scroll Indicator */}
      <ScrollProgressBar />

      {/* Ambient Universe Background */}
      <UniverseCanvas />

      {/* Cursor Glow */}
      <CursorGlow />

      {/* Navigation Header */}
      <Navbar
        isPlaying={isPlaying}
        onToggleAudio={toggleAudio}
        onOpenPhotoManager={() => handleOpenPhotoManager()}
      />

      {/* Main Sections */}
      <main className="relative z-10 w-full overflow-hidden">
        <Hero onStart={handleStartStory} />
        <FirstChapter />
        <Timeline onSelectPhoto={openPhotoModal} />
        <MemoryWall
          onSelectPhoto={openPhotoModal}
          onOpenPhotoManager={handleOpenPhotoManager}
          onPhotoUpdated={() => setPhotoUpdateKey(Date.now())}
        />
        <ReasonsGrid />
        <OpenWhenEnvelopes onOpenEnvelope={openEnvelopeModal} />
        <PlaylistPlayer
          isPlaying={isPlaying}
          onToggleAudio={toggleAudio}
          audioRef={audioRef}
        />
        <JournalLetter />
        <ApologyCard />
        <MissYouCountdown />
        <PromisesGrid />
        <BucketList />
        <PolaroidWall />
        <SkyConstellation />
        <FinalPoem onLoveClick={handleLoveClick} />
      </main>

      {/* Modals */}
      <ImageModal
        isOpen={isImageModalOpen}
        photoKey={modalPhoto}
        caption={modalCaption}
        onClose={() => setIsImageModalOpen(false)}
      />

      <VictoryModal
        isOpen={isVictoryModalOpen}
        onClose={() => setIsVictoryModalOpen(false)}
      />

      <PhotoUploadModal
        isOpen={isPhotoManagerOpen}
        initialSlot={photoManagerSlot}
        onClose={() => setIsPhotoManagerOpen(false)}
        onPhotoUpdated={() => setPhotoUpdateKey(Date.now())}
      />

      {/* Confetti Animation Layer */}
      <ConfettiCanvas ref={confettiRef} />
    </div>
  );
}
