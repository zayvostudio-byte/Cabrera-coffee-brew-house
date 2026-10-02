import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { MenuItem, MenuCategory, OrderType, CartItem } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { Search, Plus, Coffee, Clock } from 'lucide-react';
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
    <motion.section
      id="menu"
      initial={{ opacity: 0.05 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.04 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`py-16 relative border-t transition-colors ${
        isLight ? 'bg-[#f7f5f0] border-[#e8e2d6] text-[#181513]' : 'bg-[#161310] border-[#25201b] text-[#f7f5f0]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b ${
          isLight ? 'border-[#e4ded2]' : 'border-[#29221b]'
        }`}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-left"
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#b58548] mb-2">
              <span>{t.officialMenuKicker}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-black tracking-tight">
              {t.menuTitle}
            </h2>
            <p className={`text-sm mt-2 max-w-xl ${isLight ? 'text-[#6e6356]' : 'text-[#b0a496]'}`}>
              {t.menuSubtitle}
            </p>
          </motion.div>

          {/* Interactive Mode Bar: Dine-in vs Takeout Details */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className={`p-3 rounded-xl border flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shadow-sm ${
              isLight ? 'bg-white border-[#ded7ca]' : 'bg-[#1e1914] border-[#382f25]'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium ${isLight ? 'text-[#706456]' : 'text-[#a6998a]'}`}>
                {t.serviceMode}
              </span>
              <div className={`flex p-1 rounded-lg border ${
                isLight ? 'bg-[#f4efe7] border-[#ddd4c4]' : 'bg-[#120f0d] border-[#30271e]'
              }`}>
                <button
                  type="button"
                  onClick={() => setOrderType('dine_in')}
                  className={`px-3 py-1 text-xs font-semibold rounded transition-all ${
                    orderType === 'dine_in'
                      ? 'bg-[#b58548] text-white shadow-sm'
                      : isLight ? 'text-[#706456]' : 'text-[#9c8f80]'
                  }`}
                >
                  {t.dineIn}
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('takeout')}
                  className={`px-3 py-1 text-xs font-semibold rounded transition-all ${
                    orderType === 'takeout'
                      ? 'bg-[#b58548] text-white shadow-sm'
                      : isLight ? 'text-[#706456]' : 'text-[#9c8f80]'
                  }`}
                >
                  {t.takeout}
                </button>
              </div>
            </div>

            {orderType === 'dine_in' ? (
              <div className={`flex items-center gap-2 border-t sm:border-t-0 sm:border-l pt-2 sm:pt-0 sm:pl-3 ${
                isLight ? 'border-[#e0d8cb]' : 'border-[#382f25]'
              }`}>
                <span className="text-xs whitespace-nowrap">{t.tableNumLabel}</span>
                <input
                  type="text"
                  placeholder="4"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className={`w-16 border rounded px-2 py-1 text-xs text-center font-mono focus:outline-none focus:border-[#b58548] ${
                    isLight ? 'bg-[#f4efe7] border-[#ded5c5]' : 'bg-[#120f0d] border-[#3b3024] text-white'
                  }`}
                />
              </div>
            ) : (
              <div className={`text-xs font-mono border-t sm:border-t-0 sm:border-l pt-2 sm:pt-0 sm:pl-3 font-semibold text-[#b58548] ${
                isLight ? 'border-[#e0d8cb]' : 'border-[#382f25]'
              }`}>
                {t.readyInEstimate}
              </div>
            )}
          </motion.div>
        </div>

        {/* Filter Toolbar & Search Bar */}
        <div className="py-6 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Category Tabs sequentially revealed */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {categories.map((cat, idx) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <motion.button
                    key={cat.id}
                    type="button"
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                      isSelected
                        ? 'bg-[#b58548] text-white shadow-md font-bold'
                        : isLight
                          ? 'bg-white text-[#5c5144] hover:text-black border border-[#ddd6c9]'
                          : 'bg-[#1e1914] text-[#a69a8b] hover:text-[#f7f5f0] border border-[#332920]'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px]">
              <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
                isLight ? 'text-[#9c8e7e]' : 'text-[#7d6f60]'
              }`} />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full border rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-[#b58548] ${
                  isLight
                    ? 'bg-white border-[#ded7ca] text-[#181513] placeholder-[#9c8e7e]'
                    : 'bg-[#1c1713] border-[#362b21] text-[#f7f5f0] placeholder-[#7d6f60]'
                }`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs opacity-60 hover:opacity-100"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Quick Filter Segmented Buttons */}
          <div className="flex items-center gap-2 pt-1 text-xs">
            <span className={`font-medium mr-1 ${isLight ? 'text-[#877869]' : 'text-[#877a6b]'}`}>
              {t.filterBy}
            </span>
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                activeFilter === 'all'
                  ? 'bg-[#b58548] text-white font-semibold'
                  : isLight ? 'text-[#6e6153] hover:text-black' : 'text-[#a19383] hover:text-[#f7f5f0]'
              }`}
            >
              {t.filterAll}
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('special')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                activeFilter === 'special'
                  ? 'bg-[#b58548] text-white font-semibold'
                  : isLight ? 'text-[#6e6153] hover:text-black' : 'text-[#a19383] hover:text-[#f7f5f0]'
              }`}
            >
              {t.filterSpecial}
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('popular')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                activeFilter === 'popular'
                  ? 'bg-[#b58548] text-white font-semibold'
                  : isLight ? 'text-[#6e6153] hover:text-black' : 'text-[#a19383] hover:text-[#f7f5f0]'
              }`}
            >
              {t.filterPopular}
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('vegetarian')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                activeFilter === 'vegetarian'
                  ? 'bg-[#b58548] text-white font-semibold'
                  : isLight ? 'text-[#6e6153] hover:text-black' : 'text-[#a19383] hover:text-[#f7f5f0]'
              }`}
            >
              {t.filterVeggie}
            </button>
          </div>
        </div>

        {/* Menu Items Grid by Subcategories */}
        <div className="space-y-12 pt-4 text-left">
          {subcategories.map((subcatName) => {
            const subItems = filteredItems.filter((i) => {
              const currentSub = lang === 'en' && i.subcategoryEn ? i.subcategoryEn : i.subcategory;
              return currentSub === subcatName;
            });
            if (subItems.length === 0) return null;

            return (
              <div key={subcatName} className="space-y-4">
                {/* Horizontal Divider Line drawn smoothly horizontally */}
                <div className="flex items-center gap-3">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight">
                    {subcatName}
                  </h3>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: 'left' }}
                    className={`h-[1px] flex-1 ${
                      isLight ? 'bg-gradient-to-r from-[#ddd4c5] to-transparent' : 'bg-gradient-to-r from-[#382d23] to-transparent'
                    }`}
                  />
                  <span className={`text-xs font-mono ${isLight ? 'text-[#877869]' : 'text-[#807364]'}`}>
                    {subItems.length} {subItems.length === 1 ? t.optionCountSingular : t.optionsCount}
                  </span>
                </div>

                {/* Staggered Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {subItems.map((item, itemIdx) => {
                    const itemName = lang === 'en' && item.nameEn ? item.nameEn : item.name;
                    const itemDesc = lang === 'en' && item.descriptionEn ? item.descriptionEn : item.description;

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: (itemIdx % 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                        onClick={() => setCustomizingItem(item)}
                        className={`group editorial-image-container rounded-xl overflow-hidden shadow-sm hover:shadow-xl border transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between ${
                          isLight
                            ? 'bg-white border-[#e6dfd3] hover:border-[#b58548]'
                            : 'bg-[#1a1613] border-[#2e251d] hover:border-[#524132]'
                        }`}
                      >
                        <div>
                          {/* Image banner with soft vertical mask reveal */}
                          <motion.div
                            initial={{ clipPath: 'inset(6% 0 6% 0)', opacity: 0.9 }}
                            whileInView={{ clipPath: 'inset(0% 0 0% 0)', opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="relative h-44 w-full overflow-hidden bg-black/10"
                          >
                            <img
                              src={item.image}
                              alt={itemName}
                              className="w-full h-full object-cover object-center"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                            
                            {/* Badges */}
                            <div className="absolute top-2.5 left-3 flex items-center gap-1.5 text-[11px] font-medium text-white bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded">
                              {item.isHouseSpecial && <span className="text-[#ffd280]">★ {lang === 'en' ? 'Specialty' : 'Especialidad'}</span>}
                              {item.isHouseSpecial && item.isPopular && <span className="text-white/40">·</span>}
                              {item.isPopular && <span>{lang === 'en' ? 'Favorite' : 'Favorito'}</span>}
                              {item.dietary?.includes('vegetarian') && <span className="text-emerald-400">🌱 Veggie</span>}
                            </div>

                            {/* Price Tag */}
                            <div className="absolute bottom-2.5 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded border border-white/20 font-mono font-bold text-sm text-[#ffd280]">
                              ${item.price.toFixed(2)}
                              {item.priceLarge && <span className="text-xs text-white/80"> / ${item.priceLarge.toFixed(2)}</span>}
                            </div>
                          </motion.div>

                          {/* Text info */}
                          <div className="p-4 space-y-2">
                            <h4 className="font-serif text-lg font-bold group-hover:text-[#b58548] transition-colors leading-snug">
                              {itemName}
                            </h4>
                            
                            <p className={`text-xs leading-relaxed line-clamp-2 ${
                              isLight ? 'text-[#6e6153]' : 'text-[#a89b8d]'
                            }`}>
                              {itemDesc}
                            </p>
                          </div>
                        </div>

                        {/* Card Bottom Action */}
                        <div className={`p-4 pt-0 flex items-center justify-between border-t mt-2 ${
                          isLight ? 'border-[#f0eae0]' : 'border-[#261f18]'
                        }`}>
                          <span className={`text-[11px] font-mono flex items-center gap-1 ${
                            isLight ? 'text-[#8c7e6f]' : 'text-[#786b5e]'
                          }`}>
                            <Clock className="w-3 h-3" />
                            ~{item.prepTimeMinutes} {t.prepTimeShort}
                          </span>

                          <button
                            type="button"
                            onClick={(e) => handleQuickAdd(item, e)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                              isLight
                                ? 'bg-[#f4efe7] group-hover:bg-[#b58548] text-[#2c241d] group-hover:text-white border-[#ded5c5] group-hover:border-[#b58548]'
                                : 'bg-[#251e18] group-hover:bg-[#b58548] text-[#e8ded1] group-hover:text-white border-[#3e3227] group-hover:border-[#b58548]'
                            }`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>
                              {item.availableSizes || item.allowsMilkChoice || item.allowsSyrupChoice
                                ? t.customize
                                : t.add}
                            </span>
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {filteredItems.length === 0 && (
            <div className={`text-center py-16 rounded-2xl border space-y-3 ${
              isLight ? 'bg-white border-[#e0d7c8]' : 'bg-[#1a1613] border-[#2f251c]'
            }`}>
              <Coffee className="w-12 h-12 text-[#998b7a] mx-auto" />
              <h3 className="font-serif text-lg font-bold">
                {t.noResultsTitle}
              </h3>
              <p className="text-xs text-[#8f8070] max-w-sm mx-auto">
                {t.noResultsDesc}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
                className="mt-2 px-4 py-2 bg-[#b58548] text-white text-xs font-semibold rounded-lg shadow-sm"
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
    </motion.section>
  );
};
