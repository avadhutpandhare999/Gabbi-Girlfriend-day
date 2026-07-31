import React, { useState } from 'react';
import { Camera, Edit3, Check, X, Pencil } from 'lucide-react';
import { galleryCaptions } from '../data/storyData';
import { MemoryImage } from './MemoryImage';
import { saveCustomPhoto, getCustomCaption, saveCustomCaption } from '../utils/imageUtils';

interface MemoryWallProps {
  onSelectPhoto: (photoKey: string, caption: string) => void;
  onOpenPhotoManager?: (slotKey?: string) => void;
  onPhotoUpdated?: () => void;
}

export const MemoryWall: React.FC<MemoryWallProps> = ({
  onSelectPhoto,
  onOpenPhotoManager,
  onPhotoUpdated
}) => {
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [tempCaption, setTempCaption] = useState<string>('');

  // Photos 8 to 19
  const memoryPhotos = Array.from({ length: 12 }, (_, i) => {
    const photoNum = i + 8;
    const photoKey = `photo${photoNum}.jpg`;
    const defaultCap = galleryCaptions[i] || `Our Special Memory #${i + 1}`;
    const caption = getCustomCaption(photoKey, defaultCap);
    return {
      num: photoNum,
      photoKey,
      caption,
      defaultCap
    };
  });

  const handleDirectFileUpload = (photoKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        saveCustomPhoto(photoKey, dataUrl);
        if (onPhotoUpdated) onPhotoUpdated();
      }
    };
    reader.readAsDataURL(file);
  };

  const handleStartEditingCaption = (photoKey: string, currentCaption: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingKey(photoKey);
    setTempCaption(currentCaption);
  };

  const handleSaveCaption = (photoKey: string, e: React.MouseEvent | React.FormEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (tempCaption.trim()) {
      saveCustomCaption(photoKey, tempCaption.trim());
    }
    setEditingKey(null);
    if (onPhotoUpdated) onPhotoUpdated();
  };

  const handleCancelEditing = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingKey(null);
  };

  return (
    <section id="section-3" className="py-24 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <span className="text-xs font-semibold tracking-[3px] uppercase text-pink-400 block mb-3">
          Gallery
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-white to-pink-300 bg-clip-text text-transparent mb-4">
          Memory Wall
        </h2>
        <p className="text-gray-400 text-base sm:text-lg mb-4">
          Snapshots of laughter, adventures, and quiet bliss.
        </p>

        {onOpenPhotoManager && (
          <button
            onClick={() => onOpenPhotoManager()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 hover:bg-pink-500/20 text-xs font-medium transition-all transform hover:scale-105"
          >
            <Camera className="w-4 h-4 text-pink-400" />
            <span>Upload & Personalize Wall Photos</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {memoryPhotos.map((item) => {
          const isEditingThis = editingKey === item.photoKey;

          return (
            <div
              key={item.num}
              className="group relative rounded-2xl overflow-hidden border border-white/12 bg-[#12121e] aspect-[3/4] shadow-lg hover:shadow-[0_10px_30px_rgba(236,72,153,0.3)] transition-all duration-500 transform hover:-translate-y-1.5"
            >
              {/* Main Clickable Area to View Full Image */}
              <div
                onClick={() => onSelectPhoto(item.photoKey, item.caption)}
                className="w-full h-full cursor-pointer relative"
              >
                <MemoryImage
                  photoKey={item.photoKey}
                  label={item.caption}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Always Visible or Hover Caption Bar */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#07070d]/95 via-[#07070d]/70 to-transparent p-4 flex flex-col justify-end min-h-[40%] transition-opacity duration-300">
                  {!isEditingThis ? (
                    <div className="flex items-end justify-between gap-2">
                      <p className="text-sm font-display italic text-white/95 leading-snug line-clamp-3">
                        "{item.caption}"
                      </p>
                      <button
                        title="Edit caption"
                        onClick={(e) => handleStartEditingCaption(item.photoKey, item.caption, e)}
                        className="p-1.5 rounded-lg bg-pink-500/20 border border-pink-500/30 text-pink-300 hover:bg-pink-500 hover:text-white transition-all shrink-0 opacity-80 group-hover:opacity-100"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => handleSaveCaption(item.photoKey, e)}
                      onClick={(e) => e.stopPropagation()}
                      className="bg-black/90 p-2.5 rounded-xl border border-pink-500/50 shadow-2xl space-y-2"
                    >
                      <label className="text-[10px] font-semibold text-pink-400 block uppercase tracking-wider">
                        Edit Caption
                      </label>
                      <textarea
                        value={tempCaption}
                        onChange={(e) => setTempCaption(e.target.value)}
                        placeholder="Write a cute caption..."
                        rows={2}
                        className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 resize-none"
                        autoFocus
                      />
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={handleCancelEditing}
                          className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-gray-300 text-[11px] font-medium flex items-center gap-1"
                        >
                          <X className="w-3 h-3" />
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-3 py-1 rounded-md bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-[11px] font-semibold flex items-center gap-1 shadow-md"
                        >
                          <Check className="w-3 h-3" />
                          Save
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              {/* Top Right Action Overlay (Photo Upload & Editor) */}
              {!isEditingThis && (
                <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                  <label
                    title="Upload photo directly for this slot"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-full bg-black/60 border border-white/20 text-pink-300 hover:text-white hover:bg-pink-500/80 cursor-pointer backdrop-blur-md shadow-md transition-all hover:scale-110"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleDirectFileUpload(item.photoKey, e)}
                      className="hidden"
                    />
                  </label>

                  {onOpenPhotoManager && (
                    <button
                      title="Open full editor for this slot"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenPhotoManager(item.photoKey);
                      }}
                      className="p-2 rounded-full bg-black/60 border border-white/20 text-gray-300 hover:text-white hover:bg-purple-600/80 cursor-pointer backdrop-blur-md shadow-md transition-all hover:scale-110"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

