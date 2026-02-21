
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
    const slideDuration = 5000; 
    
    // Update progress bar every 50ms
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + (100 / (slideDuration / 50)), 100));
    }, 50);

    return () => clearInterval(progressInterval);
  }, [currentIndex]);

  const currentItem = media[currentIndex];

  return (
    <div className="h-full w-full bg-gradient-to-br from-[#2a0f0e] via-[#1f0908] to-[#120505] rounded-3xl border border-[#f3c453]/60 overflow-hidden relative shadow-2xl group">
      {/* Custom Animation Styles */}
      <style>{`
         @keyframes fadeInScale {
           from { opacity: 0; transform: scale(0.98); }
           to { opacity: 1; transform: scale(1); }
         }
         .animate-fadeInScale {
           animation: fadeInScale 0.8s ease-out forwards;
         }
       `}</style>

      {/* Background Layer: Blurred version of image to fill space and provide ambiance */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
         <img
            key={`bg-${currentItem.id}`}
            src={currentItem.url}
            alt=""
            className="w-full h-full object-cover blur-2xl opacity-40 scale-125 transition-all duration-1000"
          />
         {/* Dark overlay to ensure text/ui readability if needed */}
         <div className="absolute inset-0 bg-[#2b0b0d]/20"></div>
      </div>

      {/* Main Layer: Sharp image fitted to container height (Height priority) */}
      {/* Keep full image content visible inside fixed 9:16 frame */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
         <img
            key={currentItem.id}
            src={currentItem.url}
            alt={currentItem.title}
            className="w-full h-full object-contain animate-fadeInScale drop-shadow-2xl z-10"
          />
      </div>

      {/* Progress Bar Indicators - Moved to bottom right */}
      <div className="absolute bottom-6 right-6 flex space-x-2 z-30">
        {media.map((_, idx) => (
          <div key={idx} className="h-1.5 w-8 bg-[#f3c453]/25 rounded-full overflow-hidden backdrop-blur-sm shadow-sm">
            <div 
              className={`h-full bg-[#f9c62b] transition-all duration-300 ${idx === currentIndex ? 'opacity-100' : 'opacity-0'}`}
              style={{ width: idx === currentIndex ? `${progress}%` : '0%' }}
            ></div>
          </div>
        ))}
      </div>

      {/* Badge/Tag */}
      <div className="absolute top-6 left-6 bg-[#f9c62b] text-[#5e0a11] font-black px-4 py-1 rounded-full uppercase tracking-wider text-sm shadow-lg z-30">
        Featured
      </div>
    </div>
  );
};

export default MediaCarousel;
