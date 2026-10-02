import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Coffee, Utensils, Calendar, Flame, ChevronRight } from 'lucide-react';
import { OrderType } from '../types';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface HeroProps {
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  lang: Language;
  theme: 'luxury-clean' | 'dark';
}

export const Hero: React.FC<HeroProps> = ({
  orderType,
  setOrderType,
  lang,
  theme,
}) => {
  const navigate = useNavigate();
  const t = TRANSLATIONS[lang];

  const [videoLoaded, setVideoLoaded] = useState(false);

  // Split title into two natural lines for staggered upward reveal
  const titleParts = lang === 'en'
    ? ['The craft of specialty coffee', '& gourmet brunch.']
    : ['El arte del café de especialidad', 'y brunch artesanal.'];

  const posterImage = 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1920&q=85';

  return (
    <section className="relative overflow-hidden min-h-[92vh] lg:min-h-screen flex items-center justify-center border-b border-[#25201b] bg-[#12100e] text-[#f7f5f0]">
      {/* 
        ==================================================
        FULL-SCREEN CINEMATIC VIDEO BACKGROUND
        ==================================================
        Plays local espresso & barista video directly with zero CORS/referer issues.
        Covers the complete hero area with object-fit: cover.
      */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        {/* Fallback poster image while video loads */}
        <img
          src={posterImage}
          alt="Cabrera Coffee Brew House"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Local cinematic coffee video stream */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={posterImage}
          onLoadedData={() => setVideoLoaded(true)}
          onCanPlay={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-90' : 'opacity-0'
          }`}
        >
          <source src="/videos/hero-coffee.mp4" type="video/mp4" />
          <source src="/videos/hero-latte.mp4" type="video/mp4" />
        </video>

        {/* 
          ==================================================
          SUBTLE WARM ESPRESSO OVERLAY
          ==================================================
          Leaves the video clearly visible while ensuring crisp text readability
        */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12100ef2] via-[#14100dc2] to-[#12100ea8] pointer-events-none" />
        <div className="absolute inset-0 bg-radial-[circle_at_center] from-transparent via-[#1a140f55] to-[#12100ef0] pointer-events-none" />
        
        {/* Subtle rising steam drift layer over video */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-35">
          <div className="absolute bottom-10 left-1/4 w-36 h-56 bg-gradient-to-t from-white/20 to-transparent rounded-full blur-2xl steam-rising-1" />
          <div className="absolute bottom-14 left-1/3 w-40 h-64 bg-gradient-to-t from-[#d49e5d]/15 to-transparent rounded-full blur-3xl steam-rising-2" />
        </div>
      </div>

      {/* 
        ==================================================
        HERO CONTENT (UNOBSTRUCTED & CENTERED)
        ==================================================
        Floating card removed so the background video is fully showcased.
      */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 lg:py-28 w-full text-center space-y-7">
        
        {/* Unboxed clean metadata kicker */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#d89e58] drop-shadow-sm"
        >
          <Flame className="w-4 h-4 text-[#d89e58]" />
          <span>{t.heroKicker}</span>
        </motion.div>

        {/* Main Headline with soft fade and line stagger */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-[#fbf9f5] drop-shadow-lg">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {titleParts[0]}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block text-[#e8b577]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {titleParts[1]}
            </motion.span>
          </span>
        </h1>

        {/* Description - appears shortly afterward */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-xl leading-relaxed max-w-2xl mx-auto font-light text-[#ded5c7] drop-shadow-sm"
        >
          {t.heroDesc}
        </motion.p>

        {/* Interactive Order Mode & Quick Buttons - appear last */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="pt-3 space-y-5 flex flex-col items-center"
        >
          {/* Order Mode Pre-selection Card */}
          <div className="inline-flex p-1.5 rounded-xl gap-2 border border-[#44362a] bg-[#1a1512]/90 backdrop-blur-md shadow-2xl">
            <button
              type="button"
              onClick={() => setOrderType('dine_in')}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-lg text-sm font-semibold transition-all ${
                orderType === 'dine_in'
                  ? 'bg-[#b58548] text-white shadow-md font-bold'
                  : 'text-[#c7baa8] hover:text-[#f7f5f0]'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>{t.dineIn}</span>
            </button>
            <button
              type="button"
              onClick={() => setOrderType('takeout')}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-lg text-sm font-semibold transition-all ${
                orderType === 'takeout'
                  ? 'bg-[#b58548] text-white shadow-md font-bold'
                  : 'text-[#c7baa8] hover:text-[#f7f5f0]'
              }`}
            >
              <Coffee className="w-4 h-4" />
              <span>{t.takeout}</span>
            </button>
          </div>

          {/* Action Buttons: Navigate to real routes /menu and /visit */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
            <button
              type="button"
              onClick={() => navigate('/menu')}
              className="px-8 py-4 bg-[#b58548] hover:bg-[#9c6e33] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-2xl hover:shadow-3xl transition-all flex items-center gap-2.5"
            >
              <span>{t.exploreMenu}</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/visit')}
              className="px-7 py-4 border border-[#524031] bg-[#1e1814]/85 backdrop-blur-md hover:border-[#b58548] text-[#f7f5f0] font-semibold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-xl"
            >
              <Calendar className="w-4 h-4 text-[#d49e5d]" />
              <span>{t.reserveLive}</span>
            </button>
          </div>
        </motion.div>

        {/* Quick Trust / Feature Unboxed Markers */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-3 gap-6 pt-8 max-w-lg mx-auto border-t border-[#33281f]/80"
        >
          <div>
            <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#fbf9f5]">100%</span>
            <span className="text-xs text-[#a89b8d] block mt-0.5">
              {t.statAltitude}
            </span>
          </div>
          <div>
            <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#fbf9f5]">18h</span>
            <span className="text-xs text-[#a89b8d] block mt-0.5">
              {t.statMaceration}
            </span>
          </div>
          <div>
            <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#d49e5d]">Live</span>
            <span className="text-xs text-[#a89b8d] block mt-0.5">
              {t.statLiveTracking}
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
