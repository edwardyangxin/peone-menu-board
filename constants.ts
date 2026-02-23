
import { CarouselMedia, MenuCategory } from './types';

export const APP_NAME = "Peoné";
export const SOLD_OUT_ITEM_IDS = []; // Configurable sold-out item IDs
export const HIDDEN_MENU_ITEM_IDS = ['m7']; // Hide Chicken Fried Rice / Chow Mein for now
export const HIDDEN_CAROUSEL_ITEM_IDS = ['4', '5']; // Hide fried rice / chow mein slides for now

export const CAROUSEL_DATA: CarouselMedia[] = [
  // {
  //   id: '1',
  //   type: 'image',
  //   url: 'https://files.catbox.moe/nshry9.png',
  //   title: 'Teriyaki Beef',
  //   subtitle: 'with broccoli, cabbage, and carrot',
  //   main_dish_id: 0
  // },
  // {
  //   id: '1.2',
  //   type: 'image',
  //   url: 'https://files.catbox.moe/ky94r2.png',
  //   title: 'Teriyaki Chicken',
  //   subtitle: 'with broccoli, cabbage, and carrot',
  //   main_dish_id: 1
  // },
  // {
  //   id: '2',
  //   type: 'image',
  //   url: 'https://files.catbox.moe/z454kr.png',
  //   title: 'Teriyaki beef and chicken with soba',
  //   subtitle: 'with broccoli, cabbage, and carrot',
  //   main_dish_id: 1
  // },
  {
    id: '3',
    type: 'image',
    // url: 'https://files.catbox.moe/a81k5x.png', // ori. image 
    // url: 'https://files.catbox.moe/yc8x3q.png', // promotion image
    url: './hotdog_promo_v3.png',
    title: 'Hot Dog',
    subtitle: 'Japanese BBQ',
    main_dish_id: 3
  },
  {
    id: '4',
    type: 'image',
    url: './fried_rice.png',
    title: 'Chicken Fried Rice',
    subtitle: 'chicken, corn, and carrots',
    main_dish_id: 4
  },
  {
    id: '5',
    type: 'image',
    url: './fried_soba.png',
    title: 'Chow Mein',
    subtitle: 'chicken and cabbage',
    main_dish_id: 4
  },
  // {
  //   id: '4',
  //   type: 'image',
  //   url: 'https://picsum.photos/800/600?random=4',
  //   title: 'Premium Cocktails',
  //   subtitle: 'Mixology at its finest'
  // }
];

export const MENU_DATA: MenuCategory[] = [
  // {
  //   id: 'starters',
  //   title: 'Starters',
  //   items: [
  //     { id: 's1', name: 'Truffle Fries', price: 12, description: 'Parmesan, truffle oil, herbs' },
  //     { id: 's2', name: 'Calamari Fritti', price: 16, isPopular: true, description: 'Spicy marinara, lemon aioli' },
  //     { id: 's3', name: 'Bruschetta', price: 10, description: 'Tomato, basil, balsamic glaze' },
  //   ]
  // },
  {
    id: 'mains',
    title: 'Food & Drinks',
    items: [
      { id: 'm1', name: 'Teriyaki Beef With Rice', price: 12.99, isPopular: true, description: 'Beef with broccoli, cabbage, and carrot, served with rice' },
      { id: 'm2', name: 'Teriyaki Chicken With Rice', price: 12.99, isPopular: true, description: 'Chicken with broccoli, cabbage, and carrot, served with rice' },
      { id: 'm3', name: 'Teriyaki Beef and Chicken Combo With Rice', price: 13.99, isPopular: false, description: 'Beef and chicken with broccoli, cabbage, and carrot, served with rice' },
      { 
        id: 'm4', 
        name: 'Hot Dog', 
        price: 5.99, 
        originalPrice: 6.99, // Promotion config
        isPopular: true, 
        isSpicy: false, 
        isComingSoon: false, 
        isPromotion: true,
        description: 'Japanese BBQ' 
      },
      { id: 'm7', name: 'Chicken Fried Rice/Chow Mein', price: 7.99, isPopular: true, isSeasonalSpecial: true, description: 'Chicken Fried Rice with corn and carrots. Chow Mein with chicken and cabbage.' },
      // { id: 'm4', name: 'Wild Mushroom Risotto', price: 26, description: 'Arborio rice, parmesan crisp' },
      // { id: 'm5', name: 'Classic Burger', price: 18, description: 'Angus beef, cheddar, brioche bun' },
      { id: 'm5', name: 'Soft Drink', price: 2, showNumber: false, description: 'Pepsi, Diet Pepsi, Canada Dry or similar soft drinks' },
      { id: 'm6', name: 'Bottled Water', price: 1, showNumber: false },
    ]
  },
  // {
  //   id: 'drinks',
  //   title: 'Beverages',
  //   items: [
  //     { id: 'd1', name: 'Soft Drink', price: 2 },
  //     { id: 'd2', name: 'Bottled Water', price: 1 },
  //     // { id: 'd3', name: 'Sparkling Water', price: 4 },
  //   ]
  // }
];
