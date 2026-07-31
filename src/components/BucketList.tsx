import React, { useState } from 'react';
import { bucketItemsData } from '../data/storyData';

export const BucketList: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const toggleCheck = (id: number) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="section-11" className="py-24 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <span className="text-xs font-semibold tracking-[3px] uppercase text-pink-400 block mb-3">
          Dreams
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-white to-pink-300 bg-clip-text text-transparent mb-4">
          Our Bucket List
        </h2>
        <p className="text-gray-400 text-base sm:text-lg">
          All the memories waiting for us in tomorrow.
        </p>
      </div>

      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        {bucketItemsData.map((itemText, idx) => {
          const isChecked = !!checkedItems[idx];

          return (
            <div
              key={idx}
              onClick={() => toggleCheck(idx)}
              className={`glass-card p-5 rounded-2xl flex items-center gap-4 cursor-pointer hover:border-pink-500/40 transition-all ${
                isChecked ? 'border-pink-500/60 bg-pink-500/10' : ''
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
                  isChecked
                    ? 'bg-pink-500 border-pink-500 text-white shadow-[0_0_10px_#ec4899]'
                    : 'border-gray-500 text-transparent'
                }`}
              >
                {isChecked ? '❤️' : ''}
              </div>

              <span
                className={`text-base sm:text-lg transition-all ${
                  isChecked ? 'text-white font-medium line-through decoration-pink-500/60' : 'text-gray-200'
                }`}
              >
                {itemText}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
