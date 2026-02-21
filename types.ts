
export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  showNumber?: boolean;
  originalPrice?: number; // Optional: if defined, shows this as the struck-through price
  isPopular?: boolean;
  isSpicy?: boolean;
  isComingSoon?: boolean;
  isPromotion?: boolean;
  isSeasonalSpecial?: boolean;
}

export interface MenuCategory {
  id: string;
  title: string;
  items: MenuItem[];
}

export interface CarouselMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  subtitle?: string;
  main_dish_id?: number;
}
