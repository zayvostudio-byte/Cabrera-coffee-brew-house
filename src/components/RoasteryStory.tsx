import React from 'react';
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

  return (
    <section
      id="tostaduria"
      className={`py-16 sm:py-20 relative overflow-hidden border-t transition-colors opacity-100 ${
        isLight
          ? 'bg-[#faf6ee] border-[#e4d8c7] text-[#24140b]'
          : 'bg-[#1c110a] border-[#382215] text-[#fcf9f4]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual: The Roaster Corner */}
          <div className="lg:col-span-6 space-y-4">
            <div className={`relative rounded-2xl overflow-hidden border shadow-xl ${
              isLight ? 'border-[#e0d3c0] bg-white' : 'border-[#3f271a] bg-[#26170f]'
            }`}>
              <div className="w-full h-80 sm:h-96 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=85"
                  alt="First Crack Corner Roaster"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-90" />
              </div>
              
              {/* Badge: First Crack Corner with Burnt Orange Flame */}
              <div
                className={`absolute bottom-5 left-5 right-5 p-4 rounded-xl border backdrop-blur-md flex items-center justify-between ${
                  isLight ? 'bg-white/95 border-[#e0d3c0] text-[#24140b]' : 'bg-[#1c110a]/95 border-[#442c1e] text-[#fcf9f4]'
                }`}
              >
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#c85a17] font-bold">
                    In-House Micro-Roastery
                  </span>
                  <h4 className="font-serif text-lg font-bold">
                    First Crack Corner
                  </h4>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#c85a17]/15 flex items-center justify-center text-[#c85a17] border border-[#c85a17]/30">
                  <Flame className="w-5 h-5 text-[#c85a17]" />
                </div>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border text-xs italic ${
                isLight ? 'bg-white border-[#e0d3c0] text-[#5c4536]' : 'bg-[#26170f] border-[#3f271a] text-[#cfc1b4]'
              }`}
            >
              {t.firstCrackQuote}
            </div>
          </div>

          {/* Right Text: The Kaldi Legend & Cabrera Philosophy */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#c85a17] font-mono">
              <Compass className="w-4 h-4 text-[#c85a17]" />
              <span>{t.roasteryKicker}</span>
            </div>

            <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight ${
              isLight ? 'text-[#24140b]' : 'text-[#fcf9f4]'
            }`}>
              {t.roasteryQuestion}
            </h2>

            <p className={`text-sm sm:text-base leading-relaxed ${
              isLight ? 'text-[#5c4536]' : 'text-[#cfc1b4]'
            }`}>
              {t.kaldiLegend1}
            </p>

            <p className={`text-sm sm:text-base leading-relaxed ${
              isLight ? 'text-[#5c4536]' : 'text-[#cfc1b4]'
            }`}>
              {t.kaldiLegend2}
            </p>

            {/* Feature points in Chocolate & Burnt Orange */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t ${
              isLight ? 'border-[#e4d8c7]' : 'border-[#382215]'
            }`}>
              <div className="space-y-1">
                <span className="font-serif text-base font-bold flex items-center gap-1.5">
                  <span className="text-[#c85a17]">◈</span> {t.highlandLots}
                </span>
                <p className={`text-xs ${isLight ? 'text-[#6e5849]' : 'text-[#a39080]'}`}>
                  {t.highlandLotsDesc}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-serif text-base font-bold flex items-center gap-1.5">
                  <span className="text-[#c85a17]">◈</span> {t.weeklyRoast}
                </span>
                <p className={`text-xs ${isLight ? 'text-[#6e5849]' : 'text-[#a39080]'}`}>
                  {t.weeklyRoastDesc}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
