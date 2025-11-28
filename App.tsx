import React, { useState, useEffect } from 'react';
import Logo from './components/Logo';
import MediaCarousel from './components/MediaCarousel';
import MenuDisplay from './components/MenuDisplay';
import { MENU_DATA, CAROUSEL_DATA } from './constants';

const App: React.FC = () => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  // Main slideshow timer controls both the Carousel image and the Logo title
  useEffect(() => {
    const slideDuration = 8000; // 8 seconds per slide
    const interval = setInterval(() => {
      setCurrentMediaIndex((prev) => (prev + 1) % CAROUSEL_DATA.length);
    }, slideDuration);

    return () => clearInterval(interval);
  }, []);

  const currentMedia = CAROUSEL_DATA[currentMediaIndex];

  // Calculate the ID of the menu item to highlight
  // The main_dish_id corresponds to the index of the item within the 'mains' category
  let highlightedItemId: string | undefined;
  if (currentMedia.main_dish_id !== undefined) {
    const mainsCategory = MENU_DATA.find(cat => cat.id === 'mains');
    // Ensure the category exists and the index is within bounds
    if (mainsCategory && mainsCategory.items[currentMedia.main_dish_id]) {
      highlightedItemId = mainsCategory.items[currentMedia.main_dish_id].id;
    }
  }

  return (
    <div className="w-screen h-screen bg-black overflow-hidden">
      {/* 
        Grid Layout Definition
        We use a 12-column grid that fills the entire viewport width and height.
        - Left column (Logo/Title + Carousel) takes 4 columns (approx 33%)
        - Right column (Menu) takes 8 columns (approx 67%)
        Padding and gaps adjust based on screen size to maximize space usage.
      */}
      <div className="w-full h-full grid grid-cols-12 gap-4 p-4 md:gap-6 md:p-6 lg:gap-8 lg:p-8">
        
        {/* Left Column container */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 md:gap-6 lg:gap-8 h-full min-h-0">
          
          {/* Top-Left: Now displays the Title and Subtitle of the current image */}
          {/* Using percentage height to maintain proportion regardless of screen height */}
          <div className="h-[20%] min-h-[160px] shrink-0">
            <Logo title={currentMedia.title} subtitle={currentMedia.subtitle} />
          </div>
          
          {/* Bottom-Left: Carousel Area (Image only) */}
          <div className="flex-1 min-h-0">
            <MediaCarousel media={CAROUSEL_DATA} currentIndex={currentMediaIndex} />
          </div>
          
        </div>

        {/* Right Column container - Menu */}
        <div className="col-span-12 lg:col-span-8 h-full min-h-0">
          <MenuDisplay categories={MENU_DATA} highlightedItemId={highlightedItemId} />
        </div>
        
      </div>
    </div>
  );
};

export default App;