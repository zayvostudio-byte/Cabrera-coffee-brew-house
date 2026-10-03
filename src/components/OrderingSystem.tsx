import React, { useState, useMemo } from 'react';
import { MenuItem, MenuCategory, OrderType, CartItem } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { Search, Plus, Coffee, Clock, Sparkles } from 'lucide-react';
import { ItemCustomizerModal } from './ItemCustomizerModal';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface OrderingSystemProps {
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  onAddToCart: (cartItem: CartItem) => void;
  tableNumber: string;
  setTableNumber: (val: string) => void;
  lang: Language;
  theme: 'luxury-clean' | 'dark';
}

export const OrderingSystem: React.FC<OrderingSystemProps> = ({
  orderType,
  setOrderType,
  onAddToCart,
  tableNumber,
  setTableNumber,
  lang,
  theme,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'special' | 'popular' | 'vegetarian'>('all');
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);

  const t = TRANSLATIONS[lang];
  const isLight = theme === 'luxury-clean';

  // Category filter tabs
  const categories: { id: MenuCategory; label: string; icon: string }[] = [
    { id: 'all', label: t.catAll, icon: '✨' },
    { id: 'brunch', label: t.catBrunch, icon: '🍳' },
    { id: 'coffee', label: t.catCoffee, icon: '☕' },
    { id: 'pourover', label: t.catPourover, icon: '🧪' },
    { id: 'tea', label: t.catTea, icon: '🍵' },
    { id: 'bakery', label: t.catBakery, icon: '🥐' },
    { id: 'beverages', label: t.catBeverages, icon: '🥤' },
  ];

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q) || (item.nameEn && item.nameEn.toLowerCase().includes(q));
        const matchesDesc = item.description.toLowerCase().includes(q) || (item.descriptionEn && item.descriptionEn.toLowerCase().includes(q));
        const matchesSub = item.subcategory.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesSub) return false;
      }

      if (activeFilter === 'special' && !item.isHouseSpecial) return false;
      if (activeFilter === 'popular' && !item.isPopular) return false;
      if (activeFilter === 'vegetarian' && (!item.dietary || !item.dietary.includes('vegetarian'))) return false;

      return true;
    });
  }, [selectedCategory, searchQuery, activeFilter]);

  // Subcategories
  const subcategories = useMemo(() => {
    const list: string[] = [];
    filteredItems.forEach((it) => {
      const sub = lang === 'en' && it.subcategoryEn ? it.subcategoryEn : it.subcategory;
      if (!list.includes(sub)) {
        list.push(sub);
      }
    });
    return list;
  }, [filteredItems, lang]);

  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.availableSizes || item.allowsMilkChoice || item.allowsSyrupChoice) {
      setCustomizingItem(item);
    } else {
      const cartItemId = `${item.id}-${Date.now()}`;
      onAddToCart({
        cartItemId,
        item,
        unitPrice: item.price,
        quantity: 1,
      });
    }
  };

  return (
    <section
      id="menu"
      className={`py-12 sm:py-16 relative border-t transition-colors opacity-100 ${
        isLight
          ? 'bg-[#faf6ee] border-[#e4d8c7] text-[#24140b]'
          : 'bg-[#1c110a] border-[#382215] text-[#fcf9f4]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Solid high contrast on both mobile & desktop */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b ${
          isLight ? 'border-[#e4d8c7]' : 'border-[#382215]'
        }`}>
          <div className="text-left space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#c85a17] font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.officialMenuKicker}</span>
            </div>
            <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${
              isLight ? 'text-[#24140b]' : 'text-[#fcf9f4]'
            }`}>
              {t.menuTitle}
            </h2>
            <p className={`text-sm sm:text-base max-w-xl font-normal leading-relaxed ${
              isLight ? 'text-[#5c4536]' : 'text-[#d6c7b8]'
            }`}>
              {t.menuSubtitle}
            </p>
          </div>

          {/* Interactive Mode Bar: Dine-in vs Takeout Details */}
          <div
            className={`p-3 rounded-xl border flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shadow-sm ${
              isLight ? 'bg-white border-[#e0d3c0]' : 'bg-[#281911] border-[#442c1e]'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold ${isLight ? 'text-[#5c4536]' : 'text-[#cfc1b4]'}`}>
                {t.serviceMode}:
              </span>
              <div className={`flex p-1 rounded-lg border ${
                isLight ? 'bg-[#f4eee3] border-[#ddd0bc]' : 'bg-[#1a0f08] border-[#3b2519]'
              }`}>
                <button
                  type="button"
                  onClick={() => setOrderType('dine_in')}
                  className={`px-3 py-1.5 text-xs font-bold rounded transition-all ${
                    orderType === 'dine_in'
                      ? 'bg-[#c85a17] text-white shadow-sm'
                      : isLight ? 'text-[#5c4536] hover:text-[#24140b]' : 'text-[#b8a798] hover:text-white'
                  }`}
                >
                  {t.dineIn}
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('takeout')}
                  className={`px-3 py-1.5 text-xs font-bold rounded transition-all ${
                    orderType === 'takeout'
                      ? 'bg-[#c85a17] text-white shadow-sm'
                      : isLight ? 'text-[#5c4536] hover:text-[#24140b]' : 'text-[#b8a798] hover:text-white'
                  }`}
                >
                  {t.takeout}
                </button>
              </div>
            </div>

            {orderType === 'dine_in' ? (
              <div className={`flex items-center gap-2 border-t sm:border-t-0 sm:border-l pt-2 sm:pt-0 sm:pl-3 ${
                isLight ? 'border-[#e0d3c0]' : 'border-[#442c1e]'
              }`}>
                <span className={`text-xs font-medium whitespace-nowrap ${isLight ? 'text-[#5c4536]' : 'text-[#cfc1b4]'}`}>
                  {t.tableNumLabel}
                </span>
                <input
                  type="text"
                  placeholder="4"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className={`w-16 border rounded px-2 py-1 text-xs text-center font-mono font-bold focus:outline-none focus:border-[#c85a17] ${
                    isLight
                      ? 'bg-[#faf6ee] border-[#ddd0bc] text-[#24140b]'
                      : 'bg-[#1c110a] border-[#442c1e] text-white'
                  }`}
                />
              </div>
            ) : (
              <div className="text-xs font-mono border-t sm:border-t-0 sm:border-l pt-2 sm:pt-0 sm:pl-3 font-bold text-[#c85a17]">
                {t.readyInEstimate}
              </div>
            )}
          </div>
        </div>

        {/* Filter Toolbar & Search Bar */}
        <div className="py-6 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Category Tabs: Burnt Orange Active Pill & Chocolate Cream Inactive */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                      isSelected
                        ? 'bg-[#c85a17] text-white shadow-md font-extrabold'
                        : isLight
                          ? 'bg-white text-[#4a3426] hover:text-[#24140b] border border-[#e2d5c3] hover:border-[#c85a17]'
                          : 'bg-[#26170f] text-[#cfc1b4] hover:text-white border border-[#3e271a] hover:border-[#c85a17]'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px]">
              <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
                isLight ? 'text-[#856e5f]' : 'text-[#9c897a]'
              }`} />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full border rounded-xl pl-9 pr-4 py-2.5 text-xs font-medium focus:outline-none focus:border-[#c85a17] transition-colors ${
                  isLight
                    ? 'bg-white border-[#e0d3c0] text-[#24140b] placeholder-[#856e5f]'
                    : 'bg-[#24160e] border-[#3f271a] text-[#fcf9f4] placeholder-[#9c897a]'
                }`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold opacity-60 hover:opacity-100"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Quick Filter Segmented Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className={`font-semibold mr-1 ${isLight ? 'text-[#6e5849]' : 'text-[#b09e90]'}`}>
              {t.filterBy}:
            </span>
            {[
              { id: 'all', label: t.filterAll },
              { id: 'special', label: t.filterSpecial },
              { id: 'popular', label: t.filterPopular },
              { id: 'vegetarian', label: t.filterVeggie },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  activeFilter === f.id
                    ? 'bg-[#c85a17] border-[#c85a17] text-white shadow-sm'
                    : isLight
                      ? 'bg-white border-[#e0d3c0] text-[#5c4536] hover:text-[#24140b]'
                      : 'bg-[#26170f] border-[#3e271a] text-[#cfc1b4] hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid by Subcategories (120Hz Fast Render without heavy observers) */}
        <div className="space-y-12 pt-4 text-left">
          {subcategories.map((subcatName) => {
            const subItems = filteredItems.filter((i) => {
              const currentSub = lang === 'en' && i.subcategoryEn ? i.subcategoryEn : i.subcategory;
              return currentSub === subcatName;
            });
            if (subItems.length === 0) return null;

            return (
              <div key={subcatName} className="space-y-5">
                {/* Horizontal Section Line in Chocolate & Burnt Orange */}
                <div className="flex items-center gap-3">
                  <h3 className={`font-serif text-xl sm:text-2xl font-bold tracking-tight ${
                    isLight ? 'text-[#24140b]' : 'text-[#fcf9f4]'
                  }`}>
                    {subcatName}
                  </h3>
                  <div className={`h-[1px] flex-1 ${
                    isLight ? 'bg-gradient-to-r from-[#e4d8c7] to-transparent' : 'bg-gradient-to-r from-[#442c1e] to-transparent'
                  }`} />
                  <span className={`text-xs font-mono font-semibold ${isLight ? 'text-[#856e5f]' : 'text-[#9c897a]'}`}>
                    {subItems.length} {subItems.length === 1 ? t.optionCountSingular : t.optionsCount}
                  </span>
                </div>

                {/* Grid of Cards: 60-120fps Native CSS Performance */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {subItems.map((item) => {
                    const itemName = lang === 'en' && item.nameEn ? item.nameEn : item.name;
                    const itemDesc = lang === 'en' && item.descriptionEn ? item.descriptionEn : item.description;

                    return (
                      <div
                        key={item.id}
                        onClick={() => setCustomizingItem(item)}
                        className={`group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                          isLight
                            ? 'bg-white border-[#e6dcce] hover:border-[#c85a17]'
                            : 'bg-[#26170f] border-[#3f271a] hover:border-[#c85a17]'
                        }`}
                      >
                        <div>
                          {/* Image banner with instant hardware-accelerated presentation */}
                          <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-black/10">
                            <img
                              src={item.image}
                              alt={itemName}
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-85" />
                            
                            {/* Badges in Burnt Orange / Gold */}
                            <div className="absolute top-2.5 left-3 flex flex-wrap items-center gap-1.5 text-[11px] font-bold text-white bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md">
                              {item.isHouseSpecial && <span className="text-[#f59e0b]">★ {lang === 'en' ? 'Specialty' : 'Especialidad'}</span>}
                              {item.isHouseSpecial && item.isPopular && <span className="text-white/40">·</span>}
                              {item.isPopular && <span>{lang === 'en' ? 'Favorite' : 'Favorito'}</span>}
                              {item.dietary?.includes('vegetarian') && <span className="text-emerald-400">🌱 Veggie</span>}
                            </div>

                            {/* Price Tag with Touch of Burnt Orange */}
                            <div className="absolute bottom-2.5 right-3 bg-[#1c110af5] px-3 py-1 rounded-lg border border-[#c85a17]/50 font-mono font-bold text-sm text-[#f68b3d] shadow-md">
                              ${item.price.toFixed(2)}
                              {item.priceLarge && <span className="text-xs text-white/80"> / ${item.priceLarge.toFixed(2)}</span>}
                            </div>
                          </div>

                          {/* Text info: Solid Deep Chocolate in Cream Mode */}
                          <div className="p-4 sm:p-5 space-y-2">
                            <h4 className={`font-serif text-lg font-bold leading-snug transition-colors group-hover:text-[#c85a17] ${
                              isLight ? 'text-[#24140b]' : 'text-[#fcf9f4]'
                            }`}>
                              {itemName}
                            </h4>
                            
                            <p className={`text-xs leading-relaxed line-clamp-2 ${
                              isLight ? 'text-[#5c4536]' : 'text-[#cfc1b4]'
                            }`}>
                              {itemDesc}
                            </p>
                          </div>
                        </div>

                        {/* Card Bottom Action */}
                        <div className={`p-4 pt-0 flex items-center justify-between border-t mt-2 ${
                          isLight ? 'border-[#f2ece2]' : 'border-[#331f14]'
                        }`}>
                          <span className={`text-[11px] font-mono font-semibold flex items-center gap-1 ${
                            isLight ? 'text-[#856e5f]' : 'text-[#a39080]'
                          }`}>
                            <Clock className="w-3.5 h-3.5 text-[#c85a17]" />
                            ~{item.prepTimeMinutes} {t.prepTimeShort}
                          </span>

                          <button
                            type="button"
                            onClick={(e) => handleQuickAdd(item, e)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-[#c85a17] hover:bg-[#b34d0f] text-white shadow-sm transition-all"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>
                              {item.availableSizes || item.allowsMilkChoice || item.allowsSyrupChoice
                                ? t.customize
                                : t.add}
                            </span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {filteredItems.length === 0 && (
            <div className={`text-center py-16 rounded-2xl border space-y-3 ${
              isLight ? 'bg-white border-[#e4d8c7]' : 'bg-[#26170f] border-[#3f271a]'
            }`}>
              <Coffee className="w-12 h-12 text-[#c85a17] mx-auto" />
              <h3 className={`font-serif text-lg font-bold ${isLight ? 'text-[#24140b]' : 'text-[#fcf9f4]'}`}>
                {t.noResultsTitle}
              </h3>
              <p className={`text-xs max-w-sm mx-auto ${isLight ? 'text-[#6e5849]' : 'text-[#b09e90]'}`}>
                {t.noResultsDesc}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
                className="mt-2 px-5 py-2.5 bg-[#c85a17] hover:bg-[#b34d0f] text-white text-xs font-bold rounded-xl shadow-md transition-all"
              >
                {t.resetFilters}
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Item Customizer Modal */}
      {customizingItem && (
        <ItemCustomizerModal
          item={customizingItem}
          onClose={() => setCustomizingItem(null)}
          onAddToCart={onAddToCart}
          lang={lang}
          theme={theme}
        />
      )}
    </section>
  );
};
