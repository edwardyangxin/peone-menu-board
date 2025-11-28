import { CarouselMedia, MenuCategory } from './types';

export const APP_NAME = "Peoné";

export const CAROUSEL_DATA: CarouselMedia[] = [
  {
    id: '1',
    type: 'image',
    url: 'https://files.catbox.moe/nshry9.png',
    title: 'Teriyaki Beef',
    subtitle: 'with broccoli, cabbage, and carrot',
    main_dish_id: 0
  },
  {
    id: '1.2',
    type: 'image',
    url: 'https://files.catbox.moe/ky94r2.png',
    title: 'Teriyaki Chicken',
    subtitle: 'with broccoli, cabbage, and carrot',
    main_dish_id: 1
  },
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
    url: 'https://files.catbox.moe/a81k5x.png',
    title: 'Hot Dog',
    subtitle: 'with BBQ or Teriyaki sauce',
    main_dish_id: 3
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
      { id: 'm3', name: 'Teriyaki Beef and Chicken Combo With Rice', price: 13.99, isPopular: true, description: 'Beef and chicken with broccoli, cabbage, and carrot, served with rice' },
      { id: 'm4', name: 'Hot Dog', price: 6.99, isPopular: true, isSpicy: false, description: 'with BBQ or Teriyaki sauce' },
      // { id: 'm4', name: 'Wild Mushroom Risotto', price: 26, description: 'Arborio rice, parmesan crisp' },
      // { id: 'm5', name: 'Classic Burger', price: 18, description: 'Angus beef, cheddar, brioche bun' },
      { id: 'm5', name: 'Soft Drink', price: 2, description: 'Pepsi, Diet Pepsi, Canada Dry or similar soft drinks' },
      { id: 'm6', name: 'Bottled Water', price: 1 },
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