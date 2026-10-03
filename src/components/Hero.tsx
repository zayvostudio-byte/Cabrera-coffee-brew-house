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
    <section className="relative overflow-hidden min-h-[90vh] lg:min-h-screen flex items-center justify-center border-b border-[#2d1a10] bg-[#1a0f08] text-[#fcf9f4]">
      {/* 
        ==================================================
        FULL-SCREEN CINEMATIC VIDEO BACKGROUND (60-120Hz Hardware Accelerated)
        ==================================================
      */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 transform-gpu pointer-events-none">
        {/* Fallback poster image while video loads */}
        <img
          src={posterImage}
          alt="Cabrera Coffee Brew House"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
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
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
            videoLoaded ? 'opacity-90' : 'opacity-0'
          }`}
        >
          <source src="/videos/hero-coffee.mp4" type="video/mp4" />
          <source src="/videos/hero-latte.mp4" type="video/mp4" />
        </video>

        {/* 
          ==================================================
          DEEP CHOCOLATE & BURNT ORANGE AMBIENT OVERLAYS
          ==================================================
        */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f08fa] via-[#24140be0] to-[#1a0f08b3]" />
        <div className="absolute inset-0 bg-radial-[circle_at_center] from-transparent via-[#2b170e4d] to-[#1a0f08f0]" />
      </div>

      {/* 
        ==================================================
        HERO CONTENT: CRISP, HIGH-CONTRAST & FAST
        ==================================================
      */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-24 lg:py-32 w-full text-center space-y-7">
        
        {/* Unboxed clean metadata kicker with Burnt Orange Flame */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-[#d96523] drop-shadow-sm font-mono"
        >
          <Flame className="w-4 h-4 text-[#d96523]" />
          <span>{t.heroKicker}</span>
        </motion.div>

        {/* Main Headline with Cream and Burnt Orange Accent */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-[#fcf9f4] drop-shadow-lg">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {titleParts[0]}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block text-[#e87532]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {titleParts[1]}
            </motion.span>
          </span>
        </h1>

        {/* Description: Warm Cream & Hazelnut Tone */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-xl leading-relaxed max-w-2xl mx-auto font-normal text-[#e6d8cb] drop-shadow-sm"
        >
          {t.heroDesc}
        </motion.p>

        {/* Interactive Order Mode & Quick Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="pt-2 space-y-5 flex flex-col items-center"
        >
          {/* Order Mode Selector with Burnt Orange Active Pill */}
          <div className="inline-flex p-1.5 rounded-xl gap-2 border border-[#442c1e] bg-[#24140b]/95 shadow-2xl">
            <button
              type="button"
              onClick={() => setOrderType('dine_in')}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-lg text-sm font-bold transition-all ${
                orderType === 'dine_in'
                  ? 'bg-[#c85a17] text-white shadow-md'
                  : 'text-[#cfc1b4] hover:text-[#fcf9f4]'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>{t.dineIn}</span>
            </button>
            <button
              type="button"
              onClick={() => setOrderType('takeout')}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-lg text-sm font-bold transition-all ${
                orderType === 'takeout'
                  ? 'bg-[#c85a17] text-white shadow-md'
                  : 'text-[#cfc1b4] hover:text-[#fcf9f4]'
              }`}
            >
              <Coffee className="w-4 h-4" />
              <span>{t.takeout}</span>
            </button>
          </div>

          {/* Action Buttons: Burnt Orange Primary and Deep Chocolate Secondary */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
            <button
              type="button"
              onClick={() => navigate('/menu')}
              className="px-8 py-4 bg-[#c85a17] hover:bg-[#b54d0f] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-2xl transition-all flex items-center gap-2.5"
            >
              <span>{t.exploreMenu}</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/visit')}
              className="px-7 py-4 border border-[#4a2e1d] bg-[#24150d]/90 hover:border-[#c85a17] text-[#fcf9f4] font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-xl"
            >
              <Calendar className="w-4 h-4 text-[#d96523]" />
              <span>{t.reserveLive}</span>
            </button>
          </div>
        </motion.div>

        {/* Quick Trust / Altitude & Roasting Markers */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-3 gap-6 pt-8 max-w-lg mx-auto border-t border-[#3d2417]"
        >
          <div>
            <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#fcf9f4]">100%</span>
            <span className="text-xs text-[#b8a696] block mt-0.5 font-medium">
              {t.statAltitude}
            </span>
          </div>
          <div>
            <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#fcf9f4]">18h</span>
            <span className="text-xs text-[#b8a696] block mt-0.5 font-medium">
              {t.statMaceration}
            </span>
          </div>
          <div>
            <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#d96523]">Live</span>
            <span className="text-xs text-[#b8a696] block mt-0.5 font-medium">
              {t.statLiveTracking}
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
