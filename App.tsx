import React, { useEffect, useState } from 'react';
import Logo from './components/Logo';
import MediaCarousel from './components/MediaCarousel';
import MenuDisplay from './components/MenuDisplay';
import ConfigModal from './components/ConfigModal';
import {
  MENU_DATA,
  CAROUSEL_DATA,
  SOLD_OUT_ITEM_IDS,
  HIDDEN_MENU_ITEM_IDS,
  HIDDEN_CAROUSEL_ITEM_IDS,
} from './constants';
import { MenuCategory, CarouselMedia } from './types';
import { Settings2 } from 'lucide-react';

const CONFIG_STORAGE_KEY = 'peony-menu-board-config-v1';

interface PersistedConfig {
  menuData: MenuCategory[];
  carouselData: CarouselMedia[];
}

const buildDefaultMenuData = (): MenuCategory[] => {
  const soldOutSet = new Set(SOLD_OUT_ITEM_IDS);
  const hiddenMenuItemSet = new Set(HIDDEN_MENU_ITEM_IDS);
  return MENU_DATA.map((category) => ({
    ...category,
    items: category.items
      .filter((item) => !hiddenMenuItemSet.has(item.id))
      .map((item) => ({
        ...item,
        isSoldOut: item.isSoldOut || soldOutSet.has(item.id),
      })),
  })).filter((category) => category.items.length > 0);
};

const buildDefaultCarouselData = (): CarouselMedia[] => {
  const hiddenCarouselItemSet = new Set(HIDDEN_CAROUSEL_ITEM_IDS);
  return CAROUSEL_DATA
    .filter((item) => !hiddenCarouselItemSet.has(item.id))
    .map((item) => ({ ...item }));
};

const sanitizePersistedMenuData = (rawMenu: MenuCategory[]): MenuCategory[] => {
  const hiddenMenuItemSet = new Set(HIDDEN_MENU_ITEM_IDS);
  return rawMenu
    .map((category) => ({
      ...category,
      items: category.items.filter((item) => !hiddenMenuItemSet.has(item.id)),
    }))
    .filter((category) => category.items.length > 0);
};

const sanitizePersistedCarouselData = (rawCarousel: CarouselMedia[]): CarouselMedia[] => {
  const hiddenCarouselItemSet = new Set(HIDDEN_CAROUSEL_ITEM_IDS);
  return rawCarousel.filter((item) => !hiddenCarouselItemSet.has(item.id));
};

const loadPersistedConfig = (): PersistedConfig | null => {
  try {
    const raw = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as PersistedConfig;
    if (!parsed?.menuData || !parsed?.carouselData) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

const App: React.FC = () => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [menuData, setMenuData] = useState<MenuCategory[]>(() => buildDefaultMenuData());
  const [carouselData, setCarouselData] = useState<CarouselMedia[]>(() => buildDefaultCarouselData());

  useEffect(() => {
    const persisted = loadPersistedConfig();
    if (persisted) {
      setMenuData(sanitizePersistedMenuData(persisted.menuData));
      setCarouselData(sanitizePersistedCarouselData(persisted.carouselData));
    }
  }, []);

  useEffect(() => {
    const payload: PersistedConfig = {
      menuData,
      carouselData,
    };
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(payload));
  }, [menuData, carouselData]);

  // Main slideshow timer controls both the Carousel image and the Logo title
  useEffect(() => {
    if (carouselData.length === 0) {
      return undefined;
    }
    const slideDuration = 5000; // 5 seconds per slide
    const interval = setInterval(() => {
      setCurrentMediaIndex((prev) => (prev + 1) % carouselData.length);
    }, slideDuration);

    return () => clearInterval(interval);
  }, [carouselData.length]);

  useEffect(() => {
    if (currentMediaIndex >= carouselData.length) {
      setCurrentMediaIndex(0);
    }
  }, [currentMediaIndex, carouselData.length]);

  const currentMedia = carouselData[currentMediaIndex];

  // Calculate the ID of the menu item to highlight
  // The main_dish_id corresponds to the index of the item within the 'mains' category
  let highlightedItemId: string | undefined;
  if (currentMedia && currentMedia.main_dish_id !== undefined) {
    const mainsCategory = menuData.find(cat => cat.id === 'mains');
    // Ensure the category exists and the index is within bounds
    if (mainsCategory && mainsCategory.items[currentMedia.main_dish_id]) {
      const highlightedItem = mainsCategory.items[currentMedia.main_dish_id];
      if (!highlightedItem.isSoldOut) {
        highlightedItemId = highlightedItem.id;
      }
    }
  }

  const updateMenuItem = (
    categoryId: string,
    itemId: string,
    field: 'name' | 'description' | 'price' | 'isSoldOut',
    value: string | number | boolean,
  ) => {
    setMenuData((prev) =>
      prev.map((category) => {
        if (category.id !== categoryId) {
          return category;
        }
        return {
          ...category,
          items: category.items.map((item) =>
            item.id === itemId ? { ...item, [field]: value } : item,
          ),
        };
      }),
    );
  };
  
  const toggleMenuItemSoldOut = (categoryId: string, itemId: string, currentIsSoldOut: boolean) => {
    updateMenuItem(categoryId, itemId, 'isSoldOut', !currentIsSoldOut);
  };

  const updateCarouselItem = (itemId: string, field: 'title' | 'subtitle', value: string) => {
    setCarouselData((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, [field]: value } : item)),
    );
  };

  const resetConfig = () => {
    const defaultMenu = buildDefaultMenuData();
    const defaultCarousel = buildDefaultCarouselData();
    setMenuData(defaultMenu);
    setCarouselData(defaultCarousel);
    setCurrentMediaIndex(0);
    localStorage.removeItem(CONFIG_STORAGE_KEY);
  };

  if (!currentMedia) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center text-white">
        No carousel media configured.
      </div>
    );
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
            <MediaCarousel media={carouselData} currentIndex={currentMediaIndex} />
          </div>
        </div>

        {/* Right Column container - Menu */}
        <div className="h-full min-h-0 relative">
          <MenuDisplay
            categories={menuData}
            highlightedItemId={highlightedItemId}
            onToggleItemSoldOut={toggleMenuItemSoldOut}
          />
          <button
            type="button"
            onClick={() => setIsConfigOpen(true)}
            aria-label="Open menu configuration"
            className="absolute bottom-4 right-4 z-30 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#f3c453]/35 bg-black/25 text-[#f5dba8]/55 hover:bg-black/45 hover:text-[#f5dba8]/80"
          >
            <Settings2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <ConfigModal
        open={isConfigOpen}
        categories={menuData}
        carouselData={carouselData}
        onClose={() => setIsConfigOpen(false)}
        onReset={resetConfig}
        onUpdateMenuItem={updateMenuItem}
        onUpdateCarouselItem={updateCarouselItem}
      />
    </div>
  );
};

export default App;
