import photo1 from '../assets/images/regenerated_image_1785460491743.jpg';
import photo2 from '../assets/images/regenerated_image_1785460494122.jpg';
import photo3 from '../assets/images/regenerated_image_1785460496153.jpg';
import photo4 from '../assets/images/regenerated_image_1785460498516.jpg';
import photo5 from '../assets/images/regenerated_image_1785460499984.jpg';
import photo6 from '../assets/images/regenerated_image_1785460501956.jpg';
import photo7 from '../assets/images/regenerated_image_1785460503475.jpg';
import playlistCover from '../assets/images/regenerated_image_1785460505070.jpg';
import photo20 from '../assets/images/regenerated_image_1785460506917.jpg';

// Local Storage photo & caption key prefixes
const STORAGE_PREFIX = 'gabbi_photo_';
const CAPTION_PREFIX = 'gabbi_caption_';

const DEFAULT_PHOTO_MAP: Record<string, string> = {
  'photo1.jpg': photo1,
  'photo2.jpg': photo2,
  'photo3.jpg': photo3,
  'photo4.jpg': photo4,
  'photo5.jpg': photo5,
  'photo6.jpg': photo6,
  'photo7.jpg': photo7,
  'playlist_cover.jpg': playlistCover,
  'photo20.jpg': photo20,
};

export function getDefaultPhoto(key: string): string | null {
  return DEFAULT_PHOTO_MAP[key] || null;
}

export function getCustomPhoto(key: string): string | null {
  try {
    return localStorage.getItem(`${STORAGE_PREFIX}${key}`);
  } catch {
    return null;
  }
}

export function saveCustomPhoto(key: string, dataUrl: string): void {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, dataUrl);
  } catch (e) {
    console.error('Failed to save photo to localStorage', e);
  }
}

export function clearCustomPhoto(key: string): void {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
  } catch (e) {
    console.error('Failed to clear photo', e);
  }
}

export function getCustomCaption(key: string, defaultCaption: string = ''): string {
  try {
    const saved = localStorage.getItem(`${CAPTION_PREFIX}${key}`);
    return saved !== null ? saved : defaultCaption;
  } catch {
    return defaultCaption;
  }
}

export function saveCustomCaption(key: string, caption: string): void {
  try {
    localStorage.setItem(`${CAPTION_PREFIX}${key}`, caption);
  } catch (e) {
    console.error('Failed to save caption to localStorage', e);
  }
}

export function clearCustomCaption(key: string): void {
  try {
    localStorage.removeItem(`${CAPTION_PREFIX}${key}`);
  } catch (e) {
    console.error('Failed to clear caption', e);
  }
}

export function generateSvgFallback(filename: string, label: string = 'Our Memory'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1f112e" />
        <stop offset="50%" stop-color="#120c1f" />
        <stop offset="100%" stop-color="#0a0712" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect width="600" height="800" fill="url(#g)"/>
    <circle cx="300" cy="360" r="120" fill="rgba(236,72,153,0.08)" stroke="rgba(236,72,153,0.2)" stroke-width="2"/>
    <path d="M300 390 C260 330, 200 370, 300 440 C400 370, 340 330, 300 390 Z" fill="#ec4899" filter="url(#glow)"/>
    <text x="300" y="520" fill="#f8fafc" font-family="sans-serif" font-size="24" font-weight="600" text-anchor="middle">${escapeXml(label)}</text>
    <text x="300" y="560" fill="#94a3b8" font-family="sans-serif" font-size="16" text-anchor="middle">${escapeXml(filename)}</text>
  </svg>`;

  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}
