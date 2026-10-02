import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../i18n/translations';

interface CoffeeDripTransitionProps {
  pathname: string;
  lang: Language;
}

export const EspressoTransition: React.FC<CoffeeDripTransitionProps> = ({ pathname, lang }) => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'slide-in' | 'drip' | 'slide-out'>('slide-in');
  const prevPathRef = useRef(pathname);
  const isFirstMount = useRef(true);

  useEffect(() => {
    // Skip on first initial page load so site loads immediately
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      setIsActive(true);
      setPhase('slide-in');

      // 1. Slide in from right (0 -> 180ms)
      const t1 = setTimeout(() => {
        setPhase('drip');
      }, 180);

      // 2. Coffee drip & ripple animation (180ms -> 460ms)
      const t2 = setTimeout(() => {
        setPhase('slide-out');
      }, 460);

      // 3. Slide out to left revealing new page (460ms -> 720ms)
      const t3 = setTimeout(() => {
        setIsActive(false);
      }, 720);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [pathname]);

  if (!isActive) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`coffee-slide-${pathname}`}
          initial={{ x: '100%' }}
          animate={{
            x: phase === 'slide-in' ? '0%' : phase === 'drip' ? '0%' : '-100%',
          }}
          transition={{
            duration: phase === 'drip' ? 0.28 : 0.24,
            ease: [0.25, 1, 0.5, 1],
          }}
          className="absolute inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-r from-[#241710]/95 via-[#2f1e14]/95 to-[#1c120c]/95 backdrop-blur-xl border-x border-[#b58548]/30 shadow-[0_0_80px_rgba(181,133,72,0.35)]"
        >
          {/* Subtle Warm Espresso Lighting Vignette */}
          <div className="absolute inset-0 bg-radial-[circle_at_center] from-[#b58548]/15 via-transparent to-black/40 pointer-events-none" />

          {/* Golden Crema Leading Edge Lines */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#d49e5d] to-transparent opacity-80" />
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#d49e5d] to-transparent opacity-80" />

          {/* Central Coffee Dripping Artisanal Stage */}
          <div className="relative flex flex-col items-center justify-center p-6 text-center select-none">
            
            {/* Minimalist V60 / Portafilter Dripper & Drip Animation */}
            <div className="relative w-32 h-36 flex items-center justify-center">
              
              {/* Dripper Cone / Spout */}
              <div className="absolute top-2 w-14 h-9 flex flex-col items-center">
                {/* Dripper top rim */}
                <div className="w-14 h-2.5 rounded-full border-2 border-[#b58548] bg-[#3a2519]" />
                {/* Cone body with fluted lines */}
                <div className="w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-t-[22px] border-t-[#b58548]/90 -mt-1 drop-shadow-[0_2px_8px_rgba(181,133,72,0.4)]" />
                {/* Dripper nozzle spout */}
                <div className="w-2 h-2.5 bg-[#d49e5d] rounded-b-sm -mt-0.5 shadow-sm" />
              </div>

              {/* Falling Coffee Droplet */}
              <motion.div
                initial={{ y: 24, scaleY: 0.6, scaleX: 1, opacity: 0 }}
                animate={{
                  y: [24, 30, 78],
                  scaleY: [0.6, 1.4, 1],
                  scaleX: [1, 0.8, 0.9],
                  opacity: [0, 1, 1],
                }}
                transition={{
                  duration: 0.38,
                  delay: 0.08,
                  ease: [0.55, 0.085, 0.68, 0.53],
                }}
                className="absolute top-7 w-3.5 h-4.5 rounded-full bg-gradient-to-b from-[#ffd391] via-[#c6833b] to-[#6e3b12] shadow-[0_0_10px_#e5a95d]"
              >
                {/* Specular shine on droplet */}
                <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-white/90" />
              </motion.div>

              {/* Coffee Surface & Splash Ripples below */}
              <div className="absolute bottom-5 w-24 h-6 flex items-center justify-center">
                {/* Cup ceramic rim curve */}
                <div className="absolute w-20 h-5 rounded-full border-b-2 border-[#b58548]/60 bg-gradient-to-t from-[#1b110a] to-[#2e1c11]/80" />
                
                {/* Expanding Ripple Rings upon droplet impact */}
                <motion.div
                  initial={{ scale: 0.2, opacity: 0 }}
                  animate={{ scale: [0.2, 1, 1.8], opacity: [0, 0.8, 0] }}
                  transition={{ duration: 0.42, delay: 0.28, ease: 'easeOut' }}
                  className="absolute w-12 h-4 rounded-full border-2 border-[#e5ad67]"
                />
                <motion.div
                  initial={{ scale: 0.2, opacity: 0 }}
                  animate={{ scale: [0.2, 1.3, 2.3], opacity: [0, 0.6, 0] }}
                  transition={{ duration: 0.45, delay: 0.32, ease: 'easeOut' }}
                  className="absolute w-12 h-4 rounded-full border border-[#b58548]/80"
                />

                {/* Micro splash droplet bounce */}
                <motion.div
                  initial={{ y: 0, scale: 0, opacity: 0 }}
                  animate={{ y: [0, -14, 0], scale: [0, 1, 0], opacity: [0, 0.9, 0] }}
                  transition={{ duration: 0.28, delay: 0.3, ease: 'easeOut' }}
                  className="absolute w-1.5 h-1.5 rounded-full bg-[#ffd391] shadow-sm"
                />

                {/* Soft Rising Steam Wisps */}
                <motion.div
                  initial={{ y: 0, opacity: 0, scaleX: 0.5 }}
                  animate={{ y: -24, opacity: [0, 0.5, 0], scaleX: [0.5, 1.2, 1.8] }}
                  transition={{ duration: 0.45, delay: 0.25, ease: 'easeOut' }}
                  className="absolute -top-3 w-8 h-4 rounded-full bg-white/20 blur-[3px]"
                />
              </div>
            </div>

            {/* Elegant Typographic Transition Label */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.12 }}
              className="mt-2 space-y-1"
            >
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#d49e5d] font-bold block">
                {lang === 'en' ? 'Brewing Next Page' : 'Extrayendo Siguiente Página'}
              </span>
              <span className="text-xs font-serif italic text-[#cbbba9] block opacity-85">
                Cabrera Coffee Brew House
              </span>
            </motion.div>

          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
