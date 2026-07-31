import React, { useState, useEffect } from 'react';
import { Heart, Upload, X, Trash2, Check, Pencil } from 'lucide-react';
import { saveCustomPhoto, getCustomPhoto, clearCustomPhoto, getCustomCaption, saveCustomCaption } from '../utils/imageUtils';
import { galleryCaptions } from '../data/storyData';

interface PhotoUploadModalProps {
  isOpen: boolean;
  initialSlot?: string;
  onClose: () => void;
  onPhotoUpdated: () => void;
}

export const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({
  isOpen,
  initialSlot = 'photo1.jpg',
  onClose,
  onPhotoUpdated
}) => {
  const [selectedSlot, setSelectedSlot] = useState<string>(initialSlot);
  const [preview, setPreview] = useState<string | null>(getCustomPhoto(initialSlot));
  const [slotCaption, setSlotCaption] = useState<string>('');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [captionSaved, setCaptionSaved] = useState<boolean>(false);

  const getDefaultCaption = (slot: string) => {
    const match = slot.match(/photo(\d+)\.jpg/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num >= 8 && num <= 19) {
        return galleryCaptions[num - 8] || `Memory #${num}`;
      }
    }
    return `Memory Slot ${slot.replace('.jpg', '')}`;
  };

  useEffect(() => {
    if (isOpen) {
      const slot = initialSlot || 'photo1.jpg';
      setSelectedSlot(slot);
      setPreview(getCustomPhoto(slot));
      setSlotCaption(getCustomCaption(slot, getDefaultCaption(slot)));
      setSavedSuccess(false);
      setCaptionSaved(false);
    }
  }, [isOpen, initialSlot]);

  if (!isOpen) return null;

  const handleSlotChange = (slot: string) => {
    setSelectedSlot(slot);
    setPreview(getCustomPhoto(slot));
    setSlotCaption(getCustomCaption(slot, getDefaultCaption(slot)));
    setSavedSuccess(false);
    setCaptionSaved(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setPreview(dataUrl);
        saveCustomPhoto(selectedSlot, dataUrl);
        setSavedSuccess(true);
        onPhotoUpdated();
        setTimeout(() => setSavedSuccess(false), 2000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveCaption = () => {
    if (slotCaption.trim()) {
      saveCustomCaption(selectedSlot, slotCaption.trim());
      setCaptionSaved(true);
      onPhotoUpdated();
      setTimeout(() => setCaptionSaved(false), 2000);
    }
  };

  const handleClearPhoto = () => {
    clearCustomPhoto(selectedSlot);
    setPreview(null);
    onPhotoUpdated();
  };

  // Generate 30 slots
  const slots = Array.from({ length: 30 }, (_, i) => `photo${i + 1}.jpg`);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[10000] flex items-center justify-center p-4">
      <div className="bg-[#12121e] border border-white/15 rounded-2xl max-w-2xl w-full p-6 text-white relative shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
            <h3 className="text-xl font-bold font-display">Personalize Photos & Captions</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-gray-300 mt-3 mb-3">
          Select any memory slot below to upload your real photos and edit captions! Changes save automatically in your browser.
        </p>

        <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 mb-4 max-h-36 overflow-y-auto p-1 border border-white/10 rounded-xl bg-black/30">
          {slots.map((slot) => {
            const hasCustom = !!getCustomPhoto(slot);
            const isSelected = selectedSlot === slot;
            return (
              <button
                key={slot}
                onClick={() => handleSlotChange(slot)}
                className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-all text-center relative ${
                  isSelected
                    ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30 ring-2 ring-pink-300'
                    : hasCustom
                    ? 'bg-purple-900/50 border border-purple-400/40 text-purple-200 hover:bg-purple-800/50'
                    : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                }`}
              >
                {slot.replace('.jpg', '')}
                {hasCustom && <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-pink-400"></span>}
              </button>
            );
          })}
        </div>

        <div className="flex-1 flex flex-col sm:flex-row gap-6 items-center justify-center p-4 bg-black/40 border border-white/10 rounded-xl overflow-y-auto">
          <div className="w-44 h-56 shrink-0 rounded-xl border border-white/20 bg-[#07070d] overflow-hidden flex items-center justify-center relative shadow-lg">
            {preview ? (
              <img src={preview} alt={selectedSlot} className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-4 text-gray-400">
                <Heart className="w-10 h-10 mx-auto mb-2 text-pink-500/40" />
                <span className="text-xs block">Default SVG Placeholder</span>
                <span className="text-[10px] text-gray-500 mt-1 block">({selectedSlot})</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 w-full">
            <div>
              <label className="text-xs font-semibold text-pink-300 block mb-1">
                Upload Photo for {selectedSlot}
              </label>
              <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 font-semibold text-xs cursor-pointer shadow-lg shadow-pink-500/20 transition-all">
                <Upload className="w-4 h-4" />
                <span>Choose Image File...</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Edit Caption Input */}
            <div>
              <label className="text-xs font-semibold text-purple-300 flex items-center gap-1 mb-1">
                <Pencil className="w-3 h-3 text-purple-400" />
                Edit Caption for {selectedSlot}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={slotCaption}
                  onChange={(e) => setSlotCaption(e.target.value)}
                  placeholder="Type a custom caption..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-pink-400"
                />
                <button
                  onClick={handleSaveCaption}
                  className="px-3 py-1.5 rounded-lg bg-pink-500/20 border border-pink-500/40 text-pink-300 hover:bg-pink-500 hover:text-white text-xs font-medium transition-colors"
                >
                  Save
                </button>
              </div>
              {captionSaved && (
                <span className="text-[11px] text-emerald-400 font-medium mt-1 block">
                  Caption saved!
                </span>
              )}
            </div>

            {preview && (
              <button
                onClick={handleClearPhoto}
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/30 text-xs transition-colors self-start mt-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Custom Photo</span>
              </button>
            )}

            {savedSuccess && (
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                <Check className="w-4 h-4" />
                <span>Photo Saved Successfully!</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
