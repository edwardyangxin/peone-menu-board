import React from 'react';
import { MenuCategory, MenuItem } from '../types';
import { Flame, Star, UtensilsCrossed } from 'lucide-react';
import { APP_NAME } from '../constants';

interface MenuDisplayProps {
  categories: MenuCategory[];
  highlightedItemId?: string;
}

const MenuItemRow: React.FC<{ item: MenuItem; index: number; isHighlighted: boolean }> = ({ item, index, isHighlighted }) => {
  return (
    <div 
      className={`flex justify-between items-start py-5 border-b border-dashed last:border-0 rounded-lg px-4 -mx-4 transition-all duration-500 ease-out ${
        isHighlighted 
          ? 'bg-zinc-800 border-transparent shadow-xl scale-[1.02] z-10 my-1' 
          : 'border-zinc-800 hover:bg-zinc-800/30'
      }`}
    >
      <div className="flex-1 pr-4">
        <div className="flex items-center gap-2 mb-1">
          <h3 
            className={`text-4xl font-bold transition-colors duration-300 ${
              isHighlighted 
                ? 'text-amber-400' 
                : 'text-zinc-100 group-hover:text-amber-400'
            }`}
          >
            {index + 1}. {item.name}
          </h3>
          {item.isPopular && (
            <span className="flex items-center text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
              <Star className="w-3 h-3 mr-1 fill-amber-500" /> POPULAR
            </span>
          )}
          {item.isSpicy && (
            <span className="flex items-center text-xs font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">
              <Flame className="w-3 h-3 mr-1 fill-red-500" /> SPICY
            </span>
          )}
        </div>
        {item.description && (
          <p className={`text-lg leading-snug font-light transition-colors ${isHighlighted ? 'text-zinc-300' : 'text-zinc-400'}`}>
            {item.description}
          </p>
        )}
      </div>
      <div className="flex items-end">
        <span 
          className={`text-4xl font-serif font-bold tabular-nums transition-colors duration-300 ${
            isHighlighted ? 'text-amber-400' : 'text-amber-500'
          }`}
        >
          ${item.price}
        </span>
      </div>
    </div>
  );
};

const MenuDisplay: React.FC<MenuDisplayProps> = ({ categories, highlightedItemId }) => {
  return (
    <div className="h-full w-full bg-zinc-900 rounded-3xl border border-zinc-800 shadow-2xl relative overflow-hidden flex flex-col group">
       {/* Header decorative line */}
       <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 z-20"></div>

       {/* Floating Watermark Logo - Fixed in bottom right */}
       <div className="absolute bottom-[-10px] right-[-10px] z-0 opacity-[0.08] pointer-events-none select-none transition-opacity duration-700 group-hover:opacity-[0.12]">
          <div className="flex flex-col items-center justify-center border-[6px] border-current rounded-full w-80 h-80 transform -rotate-12 text-zinc-100">
             <UtensilsCrossed size={100} strokeWidth={1} className="mb-4" />
             <span className="font-serif text-6xl font-bold tracking-widest uppercase">{APP_NAME}</span>
             <span className="text-sm tracking-[0.8em] mt-3 font-light uppercase border-t border-current pt-2 w-32 text-center">EST. 2024</span>
          </div>
       </div>

      {/* Scrollable Content Container */}
      <div className="flex-1 overflow-y-auto p-8 relative z-10 scroll-smooth">
        <div className="space-y-10 pb-10">
          {categories.map((category) => (
            <div key={category.id} className="animate-fadeInUp">
              <h2 className="text-5xl font-serif font-bold text-white mb-6 flex items-center">
                <span className="bg-zinc-800 w-10 h-10 rounded-full flex items-center justify-center mr-3 text-lg text-amber-500 border border-zinc-700 shadow-inner">
                   {category.title.charAt(0)}
                </span>
                {category.title}
                <div className="flex-1 h-px bg-zinc-800 ml-6"></div>
              </h2>
              <div className="grid gap-1">
                {category.items.map((item, idx) => (
                  <MenuItemRow 
                    key={item.id} 
                    item={item} 
                    index={idx} 
                    isHighlighted={item.id === highlightedItemId}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer Text */}
        <div className="mt-auto pt-8 text-center text-zinc-500 text-sm border-t border-zinc-800 relative z-10">
          <p>Please inform our staff of any food allergies. Prices include VAT.</p>
        </div>
      </div>
    </div>
  );
};

export default MenuDisplay;