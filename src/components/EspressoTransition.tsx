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

      // 1. Fast slide in from right (0 -> 160ms)
      const t1 = setTimeout(() => {
        setPhase('drip');
      }, 160);

      // 2. Coffee drip & ripple animation (160ms -> 400ms)
      const t2 = setTimeout(() => {
        setPhase('slide-out');
      }, 400);

      // 3. Fast slide out to left revealing new page (400ms -> 600ms)
      const t3 = setTimeout(() => {
        setIsActive(false);
      }, 600);

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
            duration: phase === 'drip' ? 0.24 : 0.2,
            ease: [0.25, 1, 0.5, 1],
          }}
          className="absolute inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-r from-[#211209] via-[#2c170d] to-[#1a0d06] border-x border-[#c85a17]/40 shadow-2xl transform-gpu"
        >
          {/* Burnt Orange Crema Leading Edge Lines */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#d96523] to-transparent opacity-90" />
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#d96523] to-transparent opacity-90" />

          {/* Central Coffee Dripping Artisanal Stage (60-120fps hardware accelerated) */}
          <div className="relative flex flex-col items-center justify-center p-6 text-center select-none">
            
            {/* Minimalist V60 / Portafilter Dripper & Drip Animation */}
            <div className="relative w-32 h-36 flex items-center justify-center">
              
              {/* Dripper Cone / Spout in Burnt Orange & Chocolate */}
              <div className="absolute top-2 w-14 h-9 flex flex-col items-center">
                {/* Dripper top rim */}
                <div className="w-14 h-2.5 rounded-full border-2 border-[#c85a17] bg-[#3a1d0f]" />
                {/* Cone body with fluted lines */}
                <div className="w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-t-[22px] border-t-[#c85a17] -mt-1 drop-shadow-md" />
                {/* Dripper nozzle spout */}
                <div className="w-2 h-2.5 bg-[#e87532] rounded-b-sm -mt-0.5" />
              </div>

              {/* Falling Coffee Droplet in Rich Espresso & Burnt Orange */}
              <motion.div
                initial={{ y: 24, scaleY: 0.6, scaleX: 1, opacity: 0 }}
                animate={{
                  y: [24, 30, 78],
                  scaleY: [0.6, 1.4, 1],
                  scaleX: [1, 0.8, 0.9],
                  opacity: [0, 1, 1],
                }}
                transition={{
                  duration: 0.32,
                  delay: 0.05,
                  ease: [0.55, 0.085, 0.68, 0.53],
                }}
                className="absolute top-7 w-3.5 h-4.5 rounded-full bg-gradient-to-b from-[#ff8c42] via-[#d96523] to-[#732a03] shadow-[0_0_12px_#d96523]"
              >
                {/* Specular shine on droplet */}
                <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-white/95" />
              </motion.div>

              {/* Coffee Surface & Splash Ripples below */}
              <div className="absolute bottom-5 w-24 h-6 flex items-center justify-center">
                {/* Cup ceramic rim curve */}
                <div className="absolute w-20 h-5 rounded-full border-b-2 border-[#c85a17]/70 bg-gradient-to-t from-[#150a04] to-[#2b170e]" />
                
                {/* Expanding Ripple Rings in Burnt Orange upon impact */}
                <motion.div
                  initial={{ scale: 0.2, opacity: 0 }}
                  animate={{ scale: [0.2, 1, 1.8], opacity: [0, 0.8, 0] }}
                  transition={{ duration: 0.35, delay: 0.22, ease: 'easeOut' }}
                  className="absolute w-12 h-4 rounded-full border-2 border-[#e87532]"
                />
                <motion.div
                  initial={{ scale: 0.2, opacity: 0 }}
                  animate={{ scale: [0.2, 1.3, 2.3], opacity: [0, 0.5, 0] }}
                  transition={{ duration: 0.38, delay: 0.25, ease: 'easeOut' }}
                  className="absolute w-12 h-4 rounded-full border border-[#c85a17]"
                />

                {/* Micro splash droplet bounce */}
                <motion.div
                  initial={{ y: 0, scale: 0, opacity: 0 }}
                  animate={{ y: [0, -12, 0], scale: [0, 1, 0], opacity: [0, 0.9, 0] }}
                  transition={{ duration: 0.24, delay: 0.24, ease: 'easeOut' }}
                  className="absolute w-1.5 h-1.5 rounded-full bg-[#ff9e59]"
                />
              </div>
            </div>

            {/* Elegant Typographic Transition Label */}
            <div className="mt-2 space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#e87532] font-bold block">
                {lang === 'en' ? 'Brewing Next Page' : 'Extrayendo Siguiente Página'}
              </span>
              <span className="text-xs font-serif italic text-[#dfd0c2] block opacity-90">
                Cabrera Coffee Brew House
              </span>
            </div>

          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
