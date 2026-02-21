import React from 'react';
import { MenuCategory, MenuItem } from '../types';
import { Flame, Star, UtensilsCrossed, Clock, Megaphone, Sparkles } from 'lucide-react';

interface MenuDisplayProps {
  categories: MenuCategory[];
  highlightedItemId?: string;
}

const TagPill: React.FC<{ children: React.ReactNode; icon?: React.ReactNode; highlighted?: boolean }> = ({ children, icon, highlighted }) => (
  <span
    className={`inline-flex items-center font-extrabold px-[0.75vh] py-[0.2vh] rounded-full text-[1.35vh] tracking-wide ${
      highlighted ? 'bg-[#7d0a13] text-[#f9c62b]' : 'bg-[#f9c62b] text-[#5e0a11]'
    }`}
  >
    {icon}
    {children}
  </span>
);

const MenuItemRow: React.FC<{ item: MenuItem; index: number; isHighlighted: boolean }> = ({ item, index, isHighlighted }) => {
  const shouldShowNumber = item.showNumber !== false;
  const descriptionIndentClass = shouldShowNumber ? 'pl-[4vh]' : 'pl-[0.2vh]';

  return (
    <div
      className={`flex justify-between items-start px-[1.6vh] py-[0.85vh] rounded-[1.1vh] transition-all duration-300 ${
        isHighlighted ? 'bg-[#f9c62b] text-[#4f0810] shadow-[inset_0_0_0_1px_rgba(125,10,19,0.2)]' : 'text-white'
      }`}
    >
      <div className="flex-1 pr-[1.5vh] min-w-0">
        <div className="flex items-center gap-[0.8vh] mb-[0.35vh] flex-wrap">
          {shouldShowNumber && (
            <span
              className={`w-[3.2vh] h-[3.2vh] rounded-full flex items-center justify-center text-[2vh] font-black leading-none shrink-0 ${
                isHighlighted ? 'bg-[#7d0a13] text-[#f9c62b]' : 'bg-[#f9c62b] text-[#7d0a13]'
              }`}
            >
              {index + 1}
            </span>
          )}

          <h3 className={`font-extrabold leading-none text-[4vh] md:text-[3.9vh] ${isHighlighted ? 'text-[#5a0810]' : 'text-white'}`}>
            {item.name}
          </h3>

          <div className="flex gap-[0.45vh] flex-wrap">
            {item.isPopular && (
              <TagPill
                highlighted={isHighlighted}
                icon={<Star className="w-[1.25vh] h-[1.25vh] mr-[0.25vh] fill-current" />}
              >
                POPULAR
              </TagPill>
            )}
            {item.isSpicy && (
              <TagPill
                highlighted={isHighlighted}
                icon={<Flame className="w-[1.25vh] h-[1.25vh] mr-[0.25vh] fill-current" />}
              >
                SPICY
              </TagPill>
            )}
            {item.isComingSoon && (
              <TagPill
                highlighted={isHighlighted}
                icon={<Clock className="w-[1.25vh] h-[1.25vh] mr-[0.25vh]" />}
              >
                COMING SOON
              </TagPill>
            )}
            {item.isPromotion && (
              <TagPill
                highlighted={isHighlighted}
                icon={<Megaphone className="w-[1.25vh] h-[1.25vh] mr-[0.25vh] fill-current" />}
              >
                PROMOTION
              </TagPill>
            )}
            {item.isSeasonalSpecial && (
              <TagPill
                highlighted={isHighlighted}
                icon={<Sparkles className="w-[1.25vh] h-[1.25vh] mr-[0.25vh]" />}
              >
                SEASONAL SPECIAL
              </TagPill>
            )}
          </div>
        </div>

        {item.description && (
          <p
            className={`leading-tight text-[2.05vh] ${descriptionIndentClass} ${
              isHighlighted ? 'text-[#5a0810]/95 font-semibold' : 'text-[#f5d8d8] font-medium'
            }`}
          >
            {item.description}
          </p>
        )}
      </div>

      <div className="flex flex-col items-end justify-start pt-[0.2vh] shrink-0">
        {item.originalPrice ? (
          <>
            <span
              className={`line-through text-[2.25vh] leading-none mb-[0.3vh] ${
                isHighlighted ? 'text-[#7d0a13]/70' : 'text-[#f5d8d8]/70'
              }`}
            >
              ${item.originalPrice}
            </span>
            <span className={`font-black tabular-nums text-[4.6vh] leading-none ${isHighlighted ? 'text-[#5a0810]' : 'text-white'}`}>
              ${item.price}
            </span>
          </>
        ) : (
          <span className={`font-black tabular-nums text-[4.6vh] leading-none ${isHighlighted ? 'text-[#5a0810]' : 'text-white'}`}>
            ${item.price}
          </span>
        )}
      </div>
    </div>
  );
};

const MenuDisplay: React.FC<MenuDisplayProps> = ({ categories, highlightedItemId }) => {
  return (
    <div className="h-full w-full bg-gradient-to-br from-[#b60f1b] via-[#9a0d18] to-[#760a13] rounded-3xl border border-[#f3c453]/70 shadow-2xl relative overflow-hidden flex flex-col">
      <div className="absolute top-0 left-0 w-full h-[0.9vh] bg-gradient-to-r from-[#ffde7a] via-[#f9c62b] to-[#ffde7a] z-20"></div>

      <div className="flex-1 flex flex-col p-[3.5vh] relative z-10 h-full justify-between">
        {categories.map((category, catIdx) => (
          <div key={category.id} className={`flex flex-col ${catIdx === categories.length - 1 ? 'flex-[1.45]' : 'flex-1'} min-h-0`}>
            <h2 className="font-serif font-bold text-white mb-[1.8vh] flex items-center text-[4.4vh] shrink-0">
              <span className="bg-[#7d0a13] w-[5.6vh] h-[5.6vh] rounded-full flex items-center justify-center mr-[1.3vh] text-[#f9c62b] border border-[#f3c453]/60 shadow-inner">
                <UtensilsCrossed className="w-[2.6vh] h-[2.6vh]" strokeWidth={2.1} />
              </span>
              {category.title}
              <div className="flex-1 h-px bg-[#f3c453]/40 ml-[1.8vh]"></div>
            </h2>

            <div className="flex-1 flex flex-col justify-evenly gap-[0.3vh]">
              {category.items.map((item, idx) => (
                <MenuItemRow key={item.id} item={item} index={idx} isHighlighted={item.id === highlightedItemId} />
              ))}
            </div>

            {catIdx !== categories.length - 1 && <div className="h-[2.6vh] shrink-0"></div>}
          </div>
        ))}

        <div className="text-center text-[#ffe8c7]/90 border-t border-[#f3c453]/45 pt-[2vh] mt-[1vh] shrink-0 text-[1.8vh] font-medium">
          <p>Please inform our staff of any food allergies.</p>
        </div>
      </div>
    </div>
  );
};

export default MenuDisplay;
