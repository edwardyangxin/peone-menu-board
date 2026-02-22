import React, { useMemo, useState, useEffect } from 'react';
import Logo from './components/Logo';
import MediaCarousel from './components/MediaCarousel';
import MenuDisplay from './components/MenuDisplay';
import { MENU_DATA, CAROUSEL_DATA, SOLD_OUT_ITEM_IDS } from './constants';

const App: React.FC = () => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const soldOutItemIdSet = useMemo(() => new Set(SOLD_OUT_ITEM_IDS), []);
  const menuDataWithSoldOut = useMemo(
    () =>
      MENU_DATA.map((category) => ({
        ...category,
        items: category.items.map((item) => ({
          ...item,
          isSoldOut: item.isSoldOut || soldOutItemIdSet.has(item.id),
        })),
      })),
    [soldOutItemIdSet],
  );

  // Main slideshow timer controls both the Carousel image and the Logo title
  useEffect(() => {
    const slideDuration = 5000; // 5 seconds per slide
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
    const mainsCategory = menuDataWithSoldOut.find(cat => cat.id === 'mains');
    // Ensure the category exists and the index is within bounds
    if (mainsCategory && mainsCategory.items[currentMedia.main_dish_id]) {
      const highlightedItem = mainsCategory.items[currentMedia.main_dish_id];
      if (!highlightedItem.isSoldOut) {
        highlightedItemId = highlightedItem.id;
      }
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
      <div className="w-full h-full grid grid-cols-[30%_70%] gap-4 p-4 md:gap-6 md:p-6 lg:gap-8 lg:p-8">
        {/* Left Column: width-driven layout */}
        <div className="h-full min-h-0 grid grid-rows-[1fr_auto] gap-4 md:gap-6 lg:gap-8">
          {/* Top-Left: flexible area (takes remaining height) */}
          <div className="min-h-0">
            <Logo title={currentMedia.title} subtitle={currentMedia.subtitle} />
          </div>

          {/* Bottom-Left: height is derived from left-column width via fixed aspect ratio */}
          <div className="w-full aspect-[3/4]">
            <MediaCarousel media={CAROUSEL_DATA} currentIndex={currentMediaIndex} />
          </div>
        </div>

        {/* Right Column container - Menu */}
        <div className="h-full min-h-0">
          <MenuDisplay categories={menuDataWithSoldOut} highlightedItemId={highlightedItemId} />
        </div>
      </div>
    </div>
  );
};

export default App;
