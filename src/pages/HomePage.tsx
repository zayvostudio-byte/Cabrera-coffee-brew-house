import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { OrderType } from '../types';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { Utensils, Compass, Camera, MapPin, ChevronRight, Award, Flame, Coffee, Sparkles } from 'lucide-react';

interface HomePageProps {
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  lang: Language;
  theme: 'luxury-clean' | 'dark';
}

export const HomePage: React.FC<HomePageProps> = ({
  orderType,
  setOrderType,
  lang,
  theme,
}) => {
  const t = TRANSLATIONS[lang];
  const isLight = theme === 'luxury-clean';

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-0"
    >
      {/* 
        ==================================================
        FULL-SCREEN CINEMATIC VIDEO HERO
        ==================================================
      */}
      <Hero
        orderType={orderType}
        setOrderType={setOrderType}
        lang={lang}
        theme={theme}
      />

      {/* 
        ==================================================
        CURATED CAFÉ EXPERIENCE PREVIEW
        Boutique discovery cards guiding visitors into separate pages
        ==================================================
      */}
      <section className={`py-20 border-b transition-colors relative overflow-hidden ${
        isLight ? 'bg-[#fbf9f5] border-[#e8e2d6] text-[#181513]' : 'bg-[#151210] border-[#29221b] text-[#f7f5f0]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#b58548]">
              <Sparkles className="w-4 h-4" />
              <span>{lang === 'en' ? 'The Cabrera Experience' : 'La Experiencia Cabrera'}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-black tracking-tight">
              {lang === 'en' ? 'Craftsmanship in Every Cup & Plate' : 'Maestría en Cada Taza y Platillo'}
            </h2>
            <p className={`text-sm leading-relaxed ${isLight ? 'text-[#6e6356]' : 'text-[#aba092]'}`}>
              {lang === 'en'
                ? 'Discover our artisanal offerings across dedicated spaces designed for coffee lovers and brunch seekers.'
                : 'Descubre nuestra propuesta artesanal a través de espacios dedicados para los amantes del buen café y brunch.'}
            </p>
          </div>

          {/* 4 Dedicated Section Cards Linking into Real Routes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Menu & Ordering -> /menu */}
            <Link
              to="/menu"
              className={`group rounded-2xl overflow-hidden border p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                isLight
                  ? 'bg-white border-[#ded7ca] hover:border-[#b58548]'
                  : 'bg-[#1a1613] border-[#2f251d] hover:border-[#b58548]'
              }`}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#b58548]/15 border border-[#b58548]/30 flex items-center justify-center text-[#b58548] group-hover:bg-[#b58548] group-hover:text-white transition-colors">
                  <Utensils className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#b58548] font-bold">
                    {lang === 'en' ? 'Takeout & Dine-In' : 'En Mesa & Para Llevar'}
                  </span>
                  <h3 className="font-serif text-xl font-bold mt-1 group-hover:text-[#b58548] transition-colors">
                    {t.navMenu || 'Menú'}
                  </h3>
                </div>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-[#6e6356]' : 'text-[#a6998a]'}`}>
                  {lang === 'en'
                    ? 'Explore our full gourmet brunch menu, signature toasts, specialty espresso and pour-overs with online ordering.'
                    : 'Explora nuestra carta completa de brunch gourmet, tostadas de autor, espresso y filtrados con pedidos en línea.'}
                </p>
              </div>

              <div className="pt-6 flex items-center gap-1.5 text-xs font-bold text-[#b58548] group-hover:translate-x-1 transition-transform">
                <span>{lang === 'en' ? 'View Full Menu' : 'Ver Carta Completa'}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Card 2: Our Story -> /our-story */}
            <Link
              to="/our-story"
              className={`group rounded-2xl overflow-hidden border p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                isLight
                  ? 'bg-white border-[#ded7ca] hover:border-[#b58548]'
                  : 'bg-[#1a1613] border-[#2f251d] hover:border-[#b58548]'
              }`}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#b58548]/15 border border-[#b58548]/30 flex items-center justify-center text-[#b58548] group-hover:bg-[#b58548] group-hover:text-white transition-colors">
                  <Flame className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#b58548] font-bold">
                    {lang === 'en' ? 'In-House Roastery' : 'First Crack Corner'}
                  </span>
                  <h3 className="font-serif text-xl font-bold mt-1 group-hover:text-[#b58548] transition-colors">
                    {t.navOurStory || 'Nuestra Historia'}
                  </h3>
                </div>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-[#6e6356]' : 'text-[#a6998a]'}`}>
                  {lang === 'en'
                    ? 'Learn why a mountain goat stands on the portafilter, the Kaldi legend, and our micro-roasting craft.'
                    : 'Conoce por qué una cabra montesa posa sobre el portafiltro, la leyenda de Kaldi y nuestro tueste artesanal.'}
                </p>
              </div>

              <div className="pt-6 flex items-center gap-1.5 text-xs font-bold text-[#b58548] group-hover:translate-x-1 transition-transform">
                <span>{lang === 'en' ? 'Read Our Story' : 'Leer Historia'}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Card 3: Gallery -> /gallery */}
            <Link
              to="/gallery"
              className={`group rounded-2xl overflow-hidden border p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                isLight
                  ? 'bg-white border-[#ded7ca] hover:border-[#b58548]'
                  : 'bg-[#1a1613] border-[#2f251d] hover:border-[#b58548]'
              }`}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#b58548]/15 border border-[#b58548]/30 flex items-center justify-center text-[#b58548] group-hover:bg-[#b58548] group-hover:text-white transition-colors">
                  <Camera className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#b58548] font-bold">
                    #THECOFFEEEXPERIENCE
                  </span>
                  <h3 className="font-serif text-xl font-bold mt-1 group-hover:text-[#b58548] transition-colors">
                    {t.navGallery || 'Galería'}
                  </h3>
                </div>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-[#6e6356]' : 'text-[#a6998a]'}`}>
                  {lang === 'en'
                    ? 'Tour our music lounge, Chesterfield leather sofa, latte art cups, and sunlit patio spaces.'
                    : 'Recorre nuestro salón musical, sillón Chesterfield capitoné, tazas de arte latte y terraza.'}
                </p>
              </div>

              <div className="pt-6 flex items-center gap-1.5 text-xs font-bold text-[#b58548] group-hover:translate-x-1 transition-transform">
                <span>{lang === 'en' ? 'Browse Moments' : 'Ver Momentos'}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Card 4: Visit & Reservations -> /visit */}
            <Link
              to="/visit"
              className={`group rounded-2xl overflow-hidden border p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                isLight
                  ? 'bg-white border-[#ded7ca] hover:border-[#b58548]'
                  : 'bg-[#1a1613] border-[#2f251d] hover:border-[#b58548]'
              }`}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#b58548]/15 border border-[#b58548]/30 flex items-center justify-center text-[#b58548] group-hover:bg-[#b58548] group-hover:text-white transition-colors">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#b58548] font-bold">
                    {lang === 'en' ? 'Reservations & Map' : 'Reservas & Mapa'}
                  </span>
                  <h3 className="font-serif text-xl font-bold mt-1 group-hover:text-[#b58548] transition-colors">
                    {t.navVisit || 'Visítanos'}
                  </h3>
                </div>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-[#6e6356]' : 'text-[#a6998a]'}`}>
                  {lang === 'en'
                    ? 'Reserve your favorite table in real time, view opening hours, parking amenities and directions.'
                    : 'Agenda tu mesa favorita en tiempo real, consulta horarios oficiales, estacionamientos y cómo llegar.'}
                </p>
              </div>

              <div className="pt-6 flex items-center gap-1.5 text-xs font-bold text-[#b58548] group-hover:translate-x-1 transition-transform">
                <span>{lang === 'en' ? 'Plan Your Visit' : 'Planear Visita'}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>

          </div>

        </div>
      </section>
    </motion.div>
  );
};
