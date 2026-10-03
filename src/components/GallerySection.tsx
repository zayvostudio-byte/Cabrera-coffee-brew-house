import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/menuData';
import { GalleryItem } from '../types';
import { Camera, Eye, X, ArrowRight } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface GallerySectionProps {
  onScrollToMenu: () => void;
  lang: Language;
  theme: 'luxury-clean' | 'dark';
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  onScrollToMenu,
  lang,
  theme,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const t = TRANSLATIONS[lang];
  const isLight = theme === 'luxury-clean';

  const categories = [
    { id: 'all', label: lang === 'en' ? 'All Spaces' : 'Todos' },
    { id: 'interior', label: lang === 'en' ? 'Interiors & Design' : 'Interiores & Ambiente' },
    { id: 'coffee', label: lang === 'en' ? 'Latte Art & Barista' : 'Arte Latte & Barismo' },
    { id: 'food', label: lang === 'en' ? 'Brunch & Kitchen' : 'Brunch & Platos' },
    { id: 'roastery', label: lang === 'en' ? 'First Crack Roastery' : 'First Crack Tostaduría' },
    { id: 'outdoor', label: lang === 'en' ? 'Sunlit Patio' : 'Terraza Exterior' },
  ];

  const filteredPhotos = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((p) => p.category === activeCategory);

  return (
    <section
      id="galeria"
      className={`py-16 sm:py-20 relative border-t transition-colors opacity-100 ${
        isLight
          ? 'bg-[#faf6ee] border-[#e4d8c7] text-[#24140b]'
          : 'bg-[#1c110a] border-[#382215] text-[#fcf9f4]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b text-left ${
          isLight ? 'border-[#e4d8c7]' : 'border-[#382215]'
        }`}>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#c85a17] font-mono mb-2">
              <Camera className="w-4 h-4 text-[#c85a17]" />
              <span>{t.galleryKicker}</span>
            </div>
            <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${
              isLight ? 'text-[#24140b]' : 'text-[#fcf9f4]'
            }`}>
              {t.galleryTitle}
            </h2>
          </div>

          {/* Category Filter Chips with Burnt Orange Active State */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all border ${
                    isActive
                      ? 'bg-[#c85a17] border-[#c85a17] text-white shadow-sm'
                      : isLight
                        ? 'bg-white border-[#e0d3c0] text-[#5c4536] hover:text-[#24140b]'
                        : 'bg-[#26170f] border-[#3f271a] text-[#cfc1b4] hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Masonry Grid (60-120fps smooth CSS render) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className={`group rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isLight
                  ? 'bg-white border-[#e0d3c0] hover:border-[#c85a17]'
                  : 'bg-[#26170f] border-[#3f271a] hover:border-[#c85a17]'
              }`}
            >
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-black/10">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="p-3 rounded-full bg-[#c85a17] text-white shadow-lg">
                    <Eye className="w-5 h-5" />
                  </span>
                </div>

                {/* Title badge in photo */}
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h4 className="font-serif font-bold text-base sm:text-lg drop-shadow">
                    {photo.title}
                  </h4>
                  <p className="text-xs text-[#cfc1b4] line-clamp-1 mt-0.5 font-light">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="max-w-3xl w-full bg-[#1c110a] border border-[#3f271a] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-96 w-full bg-black">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#c85a17] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-3 text-left">
              <h3 className="font-serif text-2xl font-bold text-[#fcf9f4]">
                {selectedPhoto.title}
              </h3>
              <p className="text-sm text-[#cfc1b4] leading-relaxed">
                {selectedPhoto.caption}
              </p>
              {selectedPhoto.relatedMenuItemId && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPhoto(null);
                    onScrollToMenu();
                  }}
                  className="mt-3 px-5 py-2.5 bg-[#c85a17] hover:bg-[#b54d0f] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2"
                >
                  <span>{lang === 'en' ? 'Order Related Item' : 'Pedir Platillo Relacionado'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
