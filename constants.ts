import { CarouselMedia, MenuCategory } from './types';

export const APP_NAME = "Peoné";

export const CAROUSEL_DATA: CarouselMedia[] = [
  {
    id: '1',
    type: 'image',
    url: 'https://files.catbox.moe/nshry9.png',
    title: 'Teriyaki beef with rice',
    subtitle: 'with broccoli, cabbage, and carrot',
    main_dish_id: 0
  },
  {
    id: '1.2',
    type: 'image',
    url: 'https://files.catbox.moe/ky94r2.png',
    title: 'Teriyaki chicken with rice',
    subtitle: 'with broccoli, cabbage, and carrot',
    main_dish_id: 0
  },
  {
    id: '2',
    type: 'image',
    url: 'https://files.catbox.moe/z454kr.png',
    title: 'Teriyaki beef and chicken with soba',
    subtitle: 'with broccoli, cabbage, and carrot',
    main_dish_id: 1
  },
  {
    id: '3',
    type: 'image',
    url: 'https://files.catbox.moe/a81k5x.png',
    title: 'Hot Dog',
    subtitle: 'with BBQ or Teriyaki sauce',
    main_dish_id: 2
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
    title: 'Main Dishes',
    items: [
      { id: 'm1', name: 'Teriyaki Beef or Chicken With Rice/Soba', price: 12.99, isPopular: true, description: 'Beef or chicken with broccoli, cabbage, and carrot, served with rice or soba' },
      { id: 'm2', name: 'Teriyaki Beef and Chicken Combo With Rice/Soba', price: 13.99, description: 'Beef and chicken with broccoli, cabbage, and carrot, served with rice or soba' },
      { id: 'm3', name: 'Hot Dog', price: 5.99, isPopular: true, isSpicy: false, description: 'with BBQ or Teriyaki sauce' },
      // { id: 'm4', name: 'Wild Mushroom Risotto', price: 26, description: 'Arborio rice, parmesan crisp' },
      // { id: 'm5', name: 'Classic Burger', price: 18, description: 'Angus beef, cheddar, brioche bun' },
    ]
  },
  {
    id: 'drinks',
    title: 'Beverages',
    items: [
      { id: 'd1', name: 'Soft Drink', price: 2 },
      { id: 'd2', name: 'Bottled Water', price: 1 },
      // { id: 'd3', name: 'Sparkling Water', price: 4 },
    ]
  }
];