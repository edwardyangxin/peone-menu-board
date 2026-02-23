import React from 'react';
import { MenuCategory, MenuItem } from '../types';
import { Flame, Star, UtensilsCrossed, Clock, Megaphone, Sparkles, CircleOff } from 'lucide-react';

interface MenuDisplayProps {
  categories: MenuCategory[];
  highlightedItemId?: string;
  onToggleItemSoldOut?: (categoryId: string, itemId: string, currentIsSoldOut: boolean) => void;
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

const MenuItemRow: React.FC<{
  categoryId: string;
  item: MenuItem;
  index: number;
  isHighlighted: boolean;
  onToggleItemSoldOut?: (categoryId: string, itemId: string, currentIsSoldOut: boolean) => void;
}> = ({ categoryId, item, index, isHighlighted, onToggleItemSoldOut }) => {
  const shouldShowNumber = item.showNumber !== false;
  const isSoldOut = item.isSoldOut === true;
  const descriptionIndentClass = shouldShowNumber ? 'pl-[4vh]' : 'pl-[0.2vh]';
  const effectiveHighlight = isHighlighted && !isSoldOut;
  const isClickable = typeof onToggleItemSoldOut === 'function';

  return (
    <button
      type="button"
      onClick={() => onToggleItemSoldOut?.(categoryId, item.id, isSoldOut)}
      className={`w-full text-left flex justify-between items-start px-[1.6vh] py-[0.85vh] rounded-[1.1vh] transition-all duration-300 ${
        effectiveHighlight
          ? 'bg-[#f9c62b] text-[#4f0810] shadow-[inset_0_0_0_1px_rgba(125,10,19,0.2)]'
          : isSoldOut
            ? 'bg-[#6d0b12]/35 text-[#f8d2d2]/70'
            : 'text-white'
      } ${isClickable ? 'cursor-pointer hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f9c62b]/70' : ''}`}
      aria-label={`${item.name} sold out toggle`}
      disabled={!isClickable}
    >
      <div className="flex-1 pr-[1.5vh] min-w-0">
        <div className="flex items-center gap-[0.8vh] mb-[0.35vh] flex-wrap">
          {shouldShowNumber && (
            <span
              className={`w-[3.2vh] h-[3.2vh] rounded-full flex items-center justify-center text-[2vh] font-black leading-none shrink-0 ${
                effectiveHighlight ? 'bg-[#7d0a13] text-[#f9c62b]' : 'bg-[#f9c62b] text-[#7d0a13]'
              }`}
            >
              {index + 1}
            </span>
          )}

          <h3 className={`font-extrabold leading-none text-[4vh] md:text-[3.9vh] ${effectiveHighlight ? 'text-[#5a0810]' : isSoldOut ? 'text-[#ffd6d6]/80 line-through' : 'text-white'}`}>
            {item.name}
          </h3>

          <div className="flex gap-[0.45vh] flex-wrap">
            {item.isPopular && (
              <TagPill
                highlighted={effectiveHighlight}
                icon={<Star className="w-[1.25vh] h-[1.25vh] mr-[0.25vh] fill-current" />}
              >
                POPULAR
              </TagPill>
            )}
            {item.isSpicy && (
              <TagPill
                highlighted={effectiveHighlight}
                icon={<Flame className="w-[1.25vh] h-[1.25vh] mr-[0.25vh] fill-current" />}
              >
                SPICY
              </TagPill>
            )}
            {item.isComingSoon && (
              <TagPill
                highlighted={effectiveHighlight}
                icon={<Clock className="w-[1.25vh] h-[1.25vh] mr-[0.25vh]" />}
              >
                COMING SOON
              </TagPill>
            )}
            {item.isPromotion && (
              <TagPill
                highlighted={effectiveHighlight}
                icon={<Megaphone className="w-[1.25vh] h-[1.25vh] mr-[0.25vh] fill-current" />}
              >
                PROMOTION
              </TagPill>
            )}
            {item.isSeasonalSpecial && (
              <TagPill
                highlighted={effectiveHighlight}
                icon={<Sparkles className="w-[1.25vh] h-[1.25vh] mr-[0.25vh]" />}
              >
                SEASONAL SPECIAL
              </TagPill>
            )}
            {isSoldOut && (
              <TagPill
                highlighted={false}
                icon={<CircleOff className="w-[1.25vh] h-[1.25vh] mr-[0.25vh]" />}
              >
                SOLD OUT
              </TagPill>
            )}
          </div>
        </div>

        {item.description && (
          <p
            className={`leading-tight text-[2.05vh] ${descriptionIndentClass} ${
              effectiveHighlight ? 'text-[#5a0810]/95 font-semibold' : isSoldOut ? 'text-[#f3c4c4]/65 font-medium' : 'text-[#f5d8d8] font-medium'
            }`}
          >
            {item.description}
          </p>
        )}
      </div>

      <div className="flex flex-col items-end justify-start pt-[0.2vh] shrink-0">
        {isSoldOut ? (
          <span className="font-black tabular-nums text-[3.2vh] leading-none text-[#ffd9a4]">
            SOLD OUT
          </span>
        ) : item.originalPrice ? (
          <>
            <span
              className={`line-through text-[2.25vh] leading-none mb-[0.3vh] ${
                effectiveHighlight ? 'text-[#7d0a13]/70' : 'text-[#f5d8d8]/70'
              }`}
            >
              ${item.originalPrice}
            </span>
            <span className={`font-black tabular-nums text-[4.6vh] leading-none ${effectiveHighlight ? 'text-[#5a0810]' : 'text-white'}`}>
              ${item.price}
            </span>
          </>
        ) : (
          <span className={`font-black tabular-nums text-[4.6vh] leading-none ${effectiveHighlight ? 'text-[#5a0810]' : 'text-white'}`}>
            ${item.price}
          </span>
        )}
      </div>
    </button>
  );
};

const MenuDisplay: React.FC<MenuDisplayProps> = ({ categories, highlightedItemId, onToggleItemSoldOut }) => {
  return (
    <div className="h-full w-full bg-gradient-to-br from-[#e31f33] via-[#c8162a] to-[#93101e] rounded-3xl border border-[#f3c453]/78 shadow-2xl relative overflow-hidden flex flex-col">
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
                <MenuItemRow
                  key={item.id}
                  categoryId={category.id}
                  item={item}
                  index={idx}
                  isHighlighted={item.id === highlightedItemId}
                  onToggleItemSoldOut={onToggleItemSoldOut}
                />
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
