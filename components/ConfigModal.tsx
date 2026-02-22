import React from 'react';
import { MenuCategory, CarouselMedia } from '../types';
import { X } from 'lucide-react';

interface ConfigModalProps {
  open: boolean;
  categories: MenuCategory[];
  carouselData: CarouselMedia[];
  onClose: () => void;
  onReset: () => void;
  onUpdateMenuItem: (
    categoryId: string,
    itemId: string,
    field: 'name' | 'description' | 'price' | 'isSoldOut',
    value: string | number | boolean,
  ) => void;
  onUpdateCarouselItem: (itemId: string, field: 'title' | 'subtitle', value: string) => void;
}

const panelClass =
  'rounded-xl border border-white/15 bg-black/35 p-4 shadow-md';

const inputClass =
  'w-full rounded-md border border-white/20 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-amber-300/70';

const ConfigModal: React.FC<ConfigModalProps> = ({
  open,
  categories,
  carouselData,
  onClose,
  onReset,
  onUpdateMenuItem,
  onUpdateCarouselItem,
}) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-[1px] p-4 md:p-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu configuration"
        className="mx-auto h-full max-w-6xl rounded-2xl border border-[#f3c453]/50 bg-[#2e0a0c] shadow-2xl flex flex-col overflow-hidden"
      >
        <div className="flex items-center justify-between border-b border-white/15 px-4 py-3 md:px-6">
          <div>
            <h2 className="font-serif text-2xl font-bold text-white">Menu Config</h2>
            <p className="text-sm text-white/70">Edit item text, price, sold out, and featured slide copy.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close configuration modal"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/20 bg-black/30 text-white hover:bg-black/50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-auto p-4 md:p-6">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <section className={panelClass}>
              <h3 className="mb-3 text-lg font-bold text-white">Menu Items</h3>
              <div className="space-y-4">
                {categories.map((category) => (
                  <div key={category.id} className="rounded-lg border border-white/10 bg-black/20 p-3">
                    <h4 className="mb-3 text-sm font-semibold text-amber-200">{category.title}</h4>
                    <div className="space-y-3">
                      {category.items.map((item) => (
                        <div key={item.id} className="rounded-md border border-white/10 p-3">
                          <div className="mb-2 flex items-center justify-between gap-2">
                            <p className="text-xs font-semibold text-white/70">ID: {item.id}</p>
                            <label className="inline-flex items-center gap-2 text-sm text-white">
                              <input
                                type="checkbox"
                                className="h-4 w-4 accent-amber-300"
                                checked={item.isSoldOut === true}
                                onChange={(e) => onUpdateMenuItem(category.id, item.id, 'isSoldOut', e.target.checked)}
                              />
                              Sold Out
                            </label>
                          </div>
                          <div className="space-y-2">
                            <input
                              type="text"
                              className={inputClass}
                              value={item.name}
                              onChange={(e) => onUpdateMenuItem(category.id, item.id, 'name', e.target.value)}
                              placeholder="Item title"
                            />
                            <textarea
                              className={`${inputClass} min-h-20 resize-y`}
                              value={item.description ?? ''}
                              onChange={(e) => onUpdateMenuItem(category.id, item.id, 'description', e.target.value)}
                              placeholder="Item subtitle / description"
                            />
                            <label className="block text-xs text-white/70">
                              Price
                              <input
                                type="number"
                                min="0"
                                step="0.01"
                                className={`${inputClass} mt-1`}
                                value={item.price}
                                onChange={(e) => {
                                  const parsed = Number.parseFloat(e.target.value);
                                  onUpdateMenuItem(category.id, item.id, 'price', Number.isFinite(parsed) ? parsed : 0);
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className={panelClass}>
              <h3 className="mb-3 text-lg font-bold text-white">Featured Slides</h3>
              <div className="space-y-3">
                {carouselData.map((item) => (
                  <div key={item.id} className="rounded-md border border-white/10 bg-black/20 p-3">
                    <p className="mb-2 text-xs font-semibold text-white/70">Slide ID: {item.id}</p>
                    <div className="space-y-2">
                      <input
                        type="text"
                        className={inputClass}
                        value={item.title}
                        onChange={(e) => onUpdateCarouselItem(item.id, 'title', e.target.value)}
                        placeholder="Slide title"
                      />
                      <textarea
                        className={`${inputClass} min-h-20 resize-y`}
                        value={item.subtitle ?? ''}
                        onChange={(e) => onUpdateCarouselItem(item.id, 'subtitle', e.target.value)}
                        placeholder="Slide subtitle"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="border-t border-white/15 px-4 py-3 md:px-6 flex items-center justify-between gap-3">
          <p className="text-xs text-white/70">Changes are saved locally in this browser.</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onReset}
              className="rounded-md border border-white/20 bg-black/30 px-3 py-2 text-sm text-white hover:bg-black/50"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-[#f3c453] px-3 py-2 text-sm font-semibold text-[#4f0810] hover:bg-[#f7d277]"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigModal;
