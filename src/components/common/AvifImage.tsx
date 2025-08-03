import { useState, useEffect } from 'react';

interface AvifImageProps {
  src: string;
  fallbackSrc?: string;
  alt?: string;
  className?: string;
}

/**
 * A component that renders an AVIF image with a fallback for browsers that don't support AVIF.
 * 
 * @param src The AVIF image source
 * @param fallbackSrc Optional fallback image source (defaults to a placeholder)
 * @param alt Optional alt text for the image
 * @param className Optional CSS class names
 */
const AvifImage = ({ 
  src, 
  fallbackSrc = '/placeholder.svg', 
  alt = '', 
  className = '' 
}: AvifImageProps) => {
  const [supportsAvif, setSupportsAvif] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if browser supports AVIF
    const checkAvifSupport = async () => {
      if (typeof window === 'undefined') return false;
      
      if ('createImageBitmap' in window && 'avif' in window.ImageDecoder.isTypeSupported) {
        // Modern browsers with ImageDecoder API
        return window.ImageDecoder.isTypeSupported('image/avif');
      } else {
        // Fallback detection method
        const img = new Image();
        img.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
        return new Promise<boolean>((resolve) => {
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
        });
      }
    };

    checkAvifSupport().then(setSupportsAvif);
  }, []);

  // If we haven't determined AVIF support yet, show nothing
  if (supportsAvif === null) {
    return null;
  }

  // If browser supports AVIF, use the AVIF image, otherwise use the fallback
  return (
    <img 
      src={supportsAvif ? src : fallbackSrc} 
      alt={alt} 
      className={className} 
    />
  );
};

export default AvifImage;