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
      className={`flex justify-between items-center px-[2vh] -mx-[2vh] rounded-lg transition-all duration-500 ease-out ${
        isHighlighted 
          ? 'border-transparent shadow-xl scale-[1.02] z-10' 
          : 'border-transparent hover:bg-zinc-800/30'
      }`}
    >
      <div className="flex-1 pr-[2vh]">
        <div className="flex items-center gap-[1vh] mb-[0.5vh]">
          <h3 
            className={`font-bold leading-none transition-colors duration-300 text-[3.2vh] ${
              isHighlighted 
                ? 'text-amber-500' 
                : 'text-zinc-100 group-hover:text-amber-500'
            }`}
          >
            {index + 1}. {item.name}
          </h3>
          <div className="flex gap-[0.5vh]">
            {item.isPopular && (
              <span className="flex items-center font-bold text-amber-500 bg-amber-500/10 px-[0.8vh] py-[0.2vh] rounded-full border border-amber-500/20 text-[1.5vh]">
                <Star className="w-[1.5vh] h-[1.5vh] mr-[0.5vh] fill-amber-500" /> POPULAR
              </span>
            )}
            {item.isSpicy && (
              <span className="flex items-center font-bold text-red-500 bg-red-500/10 px-[0.8vh] py-[0.2vh] rounded-full border border-red-500/20 text-[1.5vh]">
                <Flame className="w-[1.5vh] h-[1.5vh] mr-[0.5vh] fill-red-500" /> SPICY
              </span>
            )}
          </div>
        </div>
        {item.description && (
          <p className={`leading-tight font-light transition-colors text-[2vh] ${isHighlighted ? 'text-amber-500' : 'text-zinc-400'}`}>
            {item.description}
          </p>
        )}
      </div>
      <div className="flex items-end">
        <span 
          className={`font-serif font-bold tabular-nums transition-colors duration-300 text-[3.5vh] ${
            isHighlighted ? 'text-amber-500' : 'text-amber-500'
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
       <div className="absolute top-0 left-0 w-full h-[1vh] bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 z-20"></div>

       {/* Custom Styles for Lightbox Effect */}
       <style>{`
         @keyframes neon-pulse {
           0%, 100% { 
             opacity: 0.3; 
             filter: drop-shadow(0 0 2px rgba(225, 29, 72, 0.3));
           }
           50% { 
             opacity: 1; 
             filter: drop-shadow(0 0 10px rgba(255, 40, 90, 0.8)) drop-shadow(0 0 30px rgba(255, 40, 90, 0.4));
           }
         }
       `}</style>

       {/* Floating Watermark Logo - "Lightbox" Effect */}
       <div 
          className="absolute bottom-[-2vh] right-[-2vh] z-0 pointer-events-none select-none text-rose-600"
          style={{ animation: 'neon-pulse 4s ease-in-out infinite' }}
       >
          <div className="flex flex-col items-center justify-center border-[0.6vh] border-current rounded-full w-[40vh] h-[40vh] transform -rotate-12 shadow-inner bg-rose-950/10">
             <UtensilsCrossed className="mb-[2vh] w-[12vh] h-[12vh]" strokeWidth={1} />
             <span className="font-serif text-[7vh] font-bold tracking-widest uppercase">{APP_NAME}</span>
             <span className="text-[1.8vh] tracking-[0.8em] mt-[1vh] font-light uppercase border-t border-current pt-[1vh] w-[15vh] text-center">EST. 2024</span>
          </div>
       </div>

      {/* Auto-fitting Content Container */}
      <div className="flex-1 flex flex-col p-[4vh] relative z-10 h-full justify-between">
        
        {/* Distribute categories evenly */}
        {categories.map((category, catIdx) => (
          <div key={category.id} className={`flex flex-col ${catIdx === categories.length - 1 ? 'flex-[1.5]' : 'flex-1'} min-h-0`}>
            {/* Category Header */}
            <h2 className="font-serif font-bold text-white mb-[2vh] flex items-center text-[4.5vh] shrink-0">
              <span className="bg-zinc-800 w-[6vh] h-[6vh] rounded-full flex items-center justify-center mr-[1.5vh] text-[2.5vh] text-amber-500 border border-zinc-700 shadow-inner">
                 {category.title.charAt(0)}
              </span>
              {category.title}
              <div className="flex-1 h-px bg-zinc-800 ml-[2vh]"></div>
            </h2>
            
            {/* Items Grid - Distributes items evenly in the remaining space */}
            <div className="flex-1 flex flex-col justify-evenly">
              {category.items.map((item, idx) => (
                <MenuItemRow 
                  key={item.id} 
                  item={item} 
                  index={idx} 
                  isHighlighted={item.id === highlightedItemId}
                />
              ))}
            </div>
            
            {/* Spacer between categories if not last */}
            {catIdx !== categories.length - 1 && <div className="h-[3vh] shrink-0"></div>}
          </div>
        ))}

        {/* Footer Text */}
        <div className="text-center text-zinc-500 border-t border-zinc-800 pt-[2vh] mt-[1vh] shrink-0 text-[1.8vh]">
          <p>Please inform our staff of any food allergies. Prices include VAT.</p>
        </div>
      </div>
    </div>
  );
};

export default MenuDisplay;