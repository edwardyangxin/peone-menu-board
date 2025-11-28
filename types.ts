export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  isPopular?: boolean;
  isSpicy?: boolean;
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