import React, { useState, useEffect } from 'react';
import { CarouselMedia } from '../types';

interface MediaCarouselProps {
  media: CarouselMedia[];
  currentIndex: number;
}

const MediaCarousel: React.FC<MediaCarouselProps> = ({ media, currentIndex }) => {
  const [progress, setProgress] = useState(0);

  // Sync progress bar with external index changes
  useEffect(() => {
    setProgress(0);
    // Matches the duration in App.tsx
    const slideDuration = 8000; 
    
    // Update progress bar every 50ms
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + (100 / (slideDuration / 50)), 100));
    }, 50);

    return () => clearInterval(progressInterval);
  }, [currentIndex]);

  const currentItem = media[currentIndex];

  return (
    <div className="h-full w-full bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden relative shadow-2xl group">
      {/* Main Image */}
      <div className="absolute inset-0 w-full h-full">
         <img
            key={currentItem.id} // Key change triggers animation
            src={currentItem.url}
            alt={currentItem.title}
            className="w-full h-full object-cover transition-transform duration-[10000ms] ease-linear transform scale-110 group-hover:scale-100 animate-fadeIn"
            style={{ animation: 'slowZoom 15s infinite linear' }}
          />
         {/* Slight overlay for depth */}
         <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent"></div>
      </div>

      {/* Progress Bar Indicators - Moved to bottom right */}
      <div className="absolute bottom-6 right-6 flex space-x-2 z-30">
        {media.map((_, idx) => (
          <div key={idx} className="h-1.5 w-8 bg-zinc-700/50 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className={`h-full bg-amber-500 transition-all duration-300 ${idx === currentIndex ? 'opacity-100' : 'opacity-0'}`}
              style={{ width: idx === currentIndex ? `${progress}%` : '0%' }}
            ></div>
          </div>
        ))}
      </div>

      {/* Badge/Tag */}
      <div className="absolute top-6 left-6 bg-amber-500 text-zinc-950 font-bold px-4 py-1 rounded-full uppercase tracking-wider text-sm shadow-lg z-30">
        Featured
      </div>
    </div>
  );
};

export default MediaCarousel;