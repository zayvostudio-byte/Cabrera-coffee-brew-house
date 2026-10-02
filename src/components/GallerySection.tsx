import React, { useState } from 'react';
import { motion } from 'motion/react';
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

  // Alternating animation personality presets for magazine-flip feeling
  const getCardMotion = (index: number) => {
    const pattern = index % 3;
    // Organic, non-mechanical delay
    const delay = (index % 4) * 0.08 + (index % 2 === 0 ? 0.04 : 0.01);

    if (pattern === 0) {
      // 1. Soft fade
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
      };
    } else if (pattern === 1) {
      // 2. Slight upward movement
      return {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
      };
    } else {
      // 3. Subtle scale from 0.97 to 1.0
      return {
        initial: { opacity: 0, scale: 0.97 },
        animate: { opacity: 1, scale: 1.0 },
        transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] as const },
      };
    }
  };

  return (
    <motion.section
      id="galeria"
      initial={{ opacity: 0.05 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.06 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`py-20 relative border-t transition-colors ${
        isLight ? 'bg-[#fcfbf9] border-[#e8e2d6] text-[#181513]' : 'bg-[#12100e] border-[#261f18] text-[#f7f5f0]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b text-left ${
          isLight ? 'border-[#e4ded2]' : 'border-[#261f18]'
        }`}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#b58548] mb-2">
              <Camera className="w-4 h-4" />
              <span>{t.galleryKicker}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-black tracking-tight">
              {t.galleryTitle}
            </h2>
          </motion.div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((c, idx) => (
              <motion.button
                key={c.id}
                type="button"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.03, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActiveCategory(c.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                  activeCategory === c.id
                    ? 'bg-[#b58548] text-white shadow-sm'
                    : isLight
                      ? 'bg-white text-[#685c4f] hover:text-black border border-[#ded7ca]'
                      : 'bg-[#1b1713] text-[#9c8e7f] hover:text-[#f7f5f0] border border-[#2d241c]'
                }`}
              >
                {c.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Photos Grid with magazine-style stagger and hover scale */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredPhotos.map((photo, index) => {
            const motionProps = getCardMotion(index);
            return (
              <motion.div
                key={photo.id}
                initial={motionProps.initial}
                whileInView={motionProps.animate}
                viewport={{ once: true }}
                transition={motionProps.transition}
                onClick={() => setSelectedPhoto(photo)}
                className={`group editorial-image-container relative h-72 rounded-2xl overflow-hidden cursor-pointer border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  isLight ? 'border-[#ded7ca] bg-white' : 'border-[#2e251d] bg-[#1a1613]'
                }`}
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Eye className="w-4 h-4" />
                </div>

                {/* Bottom Details */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-left space-y-1 text-white">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#ffd280] font-bold">
                    {photo.category}
                  </span>
                  <h4 className="font-serif text-base font-bold leading-snug">
                    {photo.title}
                  </h4>
                  <p className="text-[11px] text-white/80 line-clamp-2">
                    {photo.caption}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className={`relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border text-left ${
              isLight ? 'bg-white border-[#ded7ca] text-[#181513]' : 'bg-[#171310] border-[#3b3024] text-[#f7f5f0]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-black">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-full object-cover object-center"
              />
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 bg-black/70 hover:bg-black text-white rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#b58548] font-mono font-bold">
                    {selectedPhoto.category.toUpperCase()}
                  </span>
                  <h3 className="font-serif text-2xl font-bold mt-1">
                    {selectedPhoto.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedPhoto(null);
                    onScrollToMenu();
                  }}
                  className="px-4 py-2 bg-[#b58548] hover:bg-[#9c6e33] text-white text-xs font-bold uppercase tracking-wider rounded-lg shrink-0 flex items-center gap-1.5"
                >
                  <span>{t.viewInMenu}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className={`text-sm leading-relaxed ${isLight ? 'text-[#6e6356]' : 'text-[#c2b5a5]'}`}>
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
};
