import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Flame, Compass } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface RoasteryStoryProps {
  lang: Language;
  theme: 'luxury-clean' | 'dark';
}

export const RoasteryStory: React.FC<RoasteryStoryProps> = ({
  lang,
  theme,
}) => {
  const t = TRANSLATIONS[lang];
  const isLight = theme === 'luxury-clean';

  // Responsive mobile check to disable parallax on mobile devices for peak performance
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Subtle parallax effect on scroll (active only on desktop)
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const subtleParallaxY = useTransform(scrollYProgress, [0, 1], [-12, 12]);

  // Serene slow-morning easing curve, slightly longer and more contemplative
  const slowMorningEase = [0.25, 1, 0.4, 1] as const;

  return (
    <motion.section
      ref={sectionRef}
      id="tostaduria"
      initial={{ opacity: 0.1 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 1.1, ease: slowMorningEase }}
      className={`py-20 relative overflow-hidden border-t transition-colors ${
        isLight ? 'bg-[#f7f5f0] border-[#e8e2d6] text-[#181513]' : 'bg-[#161310] border-[#261f18] text-[#f7f5f0]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual: The Roaster Corner with slow reveal and subtle parallax */}
          <div className="lg:col-span-6 space-y-4">
            <div className={`relative rounded-2xl overflow-hidden border shadow-2xl group editorial-image-container ${
              isLight ? 'border-[#ded7ca] bg-white' : 'border-[#3d3227] bg-[#1c1713]'
            }`}>
              <motion.div
                style={{ y: isMobile ? 0 : subtleParallaxY }}
                initial={{ scale: 1.05, opacity: 0.85 }}
                whileInView={{ scale: 1.0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: slowMorningEase }}
                className="w-full h-96 overflow-hidden relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=85"
                  alt="First Crack Corner Roaster"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-85" />
              </motion.div>
              
              {/* Badge: First Crack Corner */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute bottom-5 left-5 right-5 p-4 rounded-xl border backdrop-blur-md flex items-center justify-between ${
                  isLight ? 'bg-white/90 border-[#ded7ca] text-[#181513]' : 'bg-[#14110e]/90 border-[#3e3226] text-[#f7f5f0]'
                }`}
              >
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#b58548] font-bold">
                    In-House Micro-Roastery
                  </span>
                  <h4 className="font-serif text-lg font-bold">
                    First Crack Corner
                  </h4>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#b58548]/15 flex items-center justify-center text-[#b58548] border border-[#b58548]/30">
                  <Flame className="w-5 h-5" />
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className={`p-4 rounded-xl border text-xs italic ${
                isLight ? 'bg-white border-[#ded7ca] text-[#695d51]' : 'bg-[#1c1814] border-[#33281f] text-[#b8aca0]'
              }`}
            >
              {t.firstCrackQuote}
            </motion.div>
          </div>

          {/* Right Text: The Kaldi Legend & Cabrera Philosophy */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#b58548]"
            >
              <Compass className="w-4 h-4" />
              <span>{t.roasteryKicker}</span>
            </motion.div>

            {/* Slow upward motion on heading */}
            <motion.h2
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.05, delay: 0.25, ease: slowMorningEase }}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight"
            >
              {t.roasteryQuestion}
            </motion.h2>

            {/* Paragraphs revealed shortly afterward */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.45, ease: slowMorningEase }}
              className={`text-sm sm:text-base leading-relaxed font-light ${
                isLight ? 'text-[#5e5347]' : 'text-[#c4b8aa]'
              }`}
            >
              {t.kaldiLegend1}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.65, ease: slowMorningEase }}
              className={`text-sm sm:text-base leading-relaxed font-light ${
                isLight ? 'text-[#5e5347]' : 'text-[#c4b8aa]'
              }`}
            >
              {t.kaldiLegend2}
            </motion.p>

            {/* Feature points */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className={`grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t ${
                isLight ? 'border-[#eee7db]' : 'border-[#29221b]'
              }`}
            >
              <div className="space-y-1">
                <span className="font-serif text-base font-bold flex items-center gap-1.5">
                  <span className="text-[#b58548]">◈</span> {t.highlandLots}
                </span>
                <p className={`text-xs ${isLight ? 'text-[#7a6e60]' : 'text-[#9a8c7e]'}`}>
                  {t.highlandLotsDesc}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-serif text-base font-bold flex items-center gap-1.5">
                  <span className="text-[#b58548]">◈</span> {t.weeklyRoast}
                </span>
                <p className={`text-xs ${isLight ? 'text-[#7a6e60]' : 'text-[#9a8c7e]'}`}>
                  {t.weeklyRoastDesc}
                </p>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </motion.section>
  );
};
