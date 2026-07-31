import React, { useState, useEffect } from 'react';
import { getCustomPhoto, getDefaultPhoto, generateSvgFallback } from '../utils/imageUtils';

interface MemoryImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  photoKey: string;
  label?: string;
  className?: string;
}

export const MemoryImage: React.FC<MemoryImageProps> = ({ photoKey, label, className = '', alt, ...props }) => {
  const [src, setSrc] = useState<string>('');
  const [errorOccurred, setErrorOccurred] = useState<boolean>(false);

  useEffect(() => {
    setErrorOccurred(false);
    // Check if custom user uploaded photo exists in localStorage
    const custom = getCustomPhoto(photoKey);
    if (custom) {
      setSrc(custom);
    } else {
      const defaultImg = getDefaultPhoto(photoKey);
      if (defaultImg) {
        setSrc(defaultImg);
      } else {
        setSrc(`images/${photoKey}`);
      }
    }
  }, [photoKey]);

  const handleError = () => {
    if (!errorOccurred) {
      setErrorOccurred(true);
      setSrc(generateSvgFallback(photoKey, label || alt || 'Our Memory'));
    }
  };

  return (
    <img
      src={src}
      alt={alt || label || photoKey}
      onError={handleError}
      className={className}
      {...props}
    />
  );
};
