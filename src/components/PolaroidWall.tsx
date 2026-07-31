import React, { useState } from 'react';
import { MemoryImage } from './MemoryImage';
import { polaroidCaptions } from '../data/storyData';

interface PolaroidState {
  id: number;
  photoKey: string;
  caption: string;
  rotation: number;
  x: number;
  y: number;
  zIndex: number;
}

export const PolaroidWall: React.FC = () => {
  const [topZ, setTopZ] = useState(10);

  // Photos 21 to 30
  const initialPolaroids: PolaroidState[] = Array.from({ length: 10 }, (_, i) => {
    const photoNum = i + 21;
    // Deterministic rot based on index
    const rot = ((i * 7) % 21) - 10;
    return {
      id: photoNum,
      photoKey: `photo${photoNum}.jpg`,
      caption: polaroidCaptions[i] || `Memory #${i + 1}`,
      rotation: rot,
      x: 0,
      y: 0,
      zIndex: i + 1
    };
  });

  const [polaroids, setPolaroids] = useState<PolaroidState[]>(initialPolaroids);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (id: number, e: React.MouseEvent) => {
    setDraggingId(id);
    setTopZ(prev => prev + 1);

    setPolaroids(prev =>
      prev.map(p => (p.id === id ? { ...p, zIndex: topZ + 1 } : p))
    );

    const target = polaroids.find(p => p.id === id);
    if (target) {
      setDragStart({
        x: e.clientX - target.x,
        y: e.clientY - target.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggingId === null) return;

    setPolaroids(prev =>
      prev.map(p => {
        if (p.id === draggingId) {
          return {
            ...p,
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
          };
        }
        return p;
      })
    );
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  return (
    <section id="section-12" className="py-24 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <span className="text-xs font-semibold tracking-[3px] uppercase text-pink-400 block mb-3">
          Scattered Moments
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-white to-pink-300 bg-clip-text text-transparent mb-4">
          Polaroid Wall
        </h2>
        <p className="text-gray-400 text-base sm:text-lg">
          Drag and explore our scattered memories.
        </p>
      </div>

      <div
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative w-full min-h-[550px] flex flex-wrap items-center justify-center gap-6 p-4 select-none overflow-hidden"
      >
        {polaroids.map((p) => (
          <div
            key={p.id}
            onMouseDown={(e) => handleMouseDown(p.id, e)}
            style={{
              transform: `translate(${p.x}px, ${p.y}px) rotate(${p.rotation}deg) scale(${
                draggingId === p.id ? 1.06 : 1
              })`,
              zIndex: p.zIndex
            }}
            className="bg-white p-3 pb-6 rounded-sm shadow-[0_10px_25px_rgba(0,0,0,0.6)] w-48 sm:w-52 cursor-grab active:cursor-grabbing transition-transform duration-100 ease-out"
          >
            <div className="w-full h-48 sm:h-52 bg-[#222] overflow-hidden rounded-xs pointer-events-none">
              <MemoryImage
                photoKey={p.photoKey}
                label={`Polaroid #${p.id}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
