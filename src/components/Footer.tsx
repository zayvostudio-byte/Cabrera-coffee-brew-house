import React from 'react';
import { Link } from 'react-router-dom';
import { CabreraLogo } from './CabreraLogo';
import { RESTAURANT_INFO } from '../data/menuData';
import { usePanamaTime } from '../utils/panamaTime';
import {
  MapPin,
  Clock,
  Instagram,
  Facebook,
  ExternalLink,
  Check,
  Phone,
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface FooterProps {
  lang: Language;
  theme: 'luxury-clean' | 'dark';
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  theme,
}) => {
  const panamaTime = usePanamaTime();
  const t = TRANSLATIONS[lang];
  const isLight = theme === 'luxury-clean';

  return (
    <footer id="contacto" className={`border-t pt-14 pb-10 text-left transition-colors overflow-hidden ${
      isLight ? 'bg-[#f4ede2] border-[#e2d5c3] text-[#24140b]' : 'bg-[#150c07] border-[#2c170d] text-[#fcf9f4]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1 (4 cols): Brand & Philosophy */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <CabreraLogo
                size="md"
                variant={isLight ? 'luxury-dark' : 'gold'}
                showSubtitle={true}
              />
            </Link>
            <p className={`text-xs leading-relaxed pt-2 ${isLight ? 'text-[#5c4536]' : 'text-[#cfc1b4]'}`}>
              {t.footerDesc}
            </p>

            {/* Social & Contact Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com/CabreraCoffee"
                target="_blank"
                rel="noreferrer"
                className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors ${
                  isLight
                    ? 'bg-white border-[#e0d3c0] text-[#c85a17] hover:bg-[#c85a17] hover:text-white'
                    : 'bg-[#24140b] border-[#3f271a] text-[#c85a17] hover:bg-[#c85a17] hover:text-white'
                }`}
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/CabreraCoffee"
                target="_blank"
                rel="noreferrer"
                className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors ${
                  isLight
                    ? 'bg-white border-[#e0d3c0] text-[#c85a17] hover:bg-[#c85a17] hover:text-white'
                    : 'bg-[#24140b] border-[#3f271a] text-[#c85a17] hover:bg-[#c85a17] hover:text-white'
                }`}
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={RESTAURANT_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1.5 px-3 py-2 border rounded-xl text-xs font-bold transition-colors ${
                  isLight
                    ? 'bg-white border-[#e0d3c0] text-[#128c7e] hover:bg-[#128c7e] hover:text-white'
                    : 'bg-[#24140b] border-[#3f271a] text-[#25d366] hover:bg-[#25d366] hover:text-[#1c110a]'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+507 6603-9178</span>
              </a>
            </div>

            <div className="pt-2 text-[11px] font-mono text-[#c85a17] font-bold">
              #THECOFFEEEXPERIENCE
            </div>
          </div>

          {/* Col 2 (3 cols): Official Hours in Panama Time */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-base font-bold flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#c85a17]" />
                <span>{t.hoursHeading}</span>
              </h4>
              <span className="font-mono text-[10px] text-[#c85a17] font-bold">
                UTC-5
              </span>
            </div>
            <div className={`space-y-2 text-xs divide-y ${isLight ? 'divide-[#e6dcce]' : 'divide-[#28170e]'}`}>
              {RESTAURANT_INFO.hours.map((h, i) => (
                <div key={i} className="pt-2 flex flex-col justify-between">
                  <span className="font-semibold">
                    {lang === 'en' && h.daysEn ? h.daysEn : h.days}
                  </span>
                  <span className={`font-mono text-[11px] font-bold ${isLight ? 'text-[#c85a17]' : 'text-[#e87532]'}`}>
                    {h.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3 (3 cols): Location & Amenities */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-base font-bold flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#c85a17]" />
              <span>{t.locationHeading}</span>
            </h4>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-[#5c4536]' : 'text-[#cfc1b4]'}`}>
              {RESTAURANT_INFO.address}
            </p>

            <a
              href={RESTAURANT_INFO.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#c85a17] hover:underline pt-1 font-bold"
            >
              <span>{t.openGoogleMaps}</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <div className={`pt-3 space-y-1.5 text-[11px] ${isLight ? 'text-[#5c4536]' : 'text-[#b09e90]'}`}>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.amenityParking}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.amenityWifi}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.amenityPet}</span>
              </div>
            </div>
          </div>

          {/* Col 4 (2 cols): Quick Multi-Page Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-base font-bold">
              {t.quickLinksHeading}
            </h4>
            <ul className={`space-y-2 text-xs font-semibold ${isLight ? 'text-[#5c4536]' : 'text-[#cfc1b4]'}`}>
              <li>
                <Link to="/" className="hover:text-[#c85a17] transition-colors">
                  {t.navHome || 'Inicio'}
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-[#c85a17] transition-colors">
                  {t.navMenu || 'Menú'}
                </Link>
              </li>
              <li>
                <Link to="/our-story" className="hover:text-[#c85a17] transition-colors">
                  {t.navOurStory || 'Nuestra Historia'}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#c85a17] transition-colors">
                  {t.navGallery || 'Galería'}
                </Link>
              </li>
              <li>
                <Link to="/visit" className="hover:text-[#c85a17] transition-colors">
                  {t.navVisit || 'Visítanos'}
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line with Live Panama Country Time & Payments */}
        <div className={`pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
          isLight ? 'border-[#e2d5c3] text-[#6e5849]' : 'border-[#26150d] text-[#9c897a]'
        }`}>
          <div className="flex flex-wrap items-center gap-3">
            <span>© {new Date().getFullYear()} Cabrera Coffee Brew House (Estd 2018). {t.rightsReserved}</span>
            <span className="hidden sm:inline">·</span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#c85a17] font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>Hora Panamá: {panamaTime.panamaTimeString} (America/Panama · UTC-5)</span>
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono font-semibold">
            <span className="text-[#c85a17]">Pagos en Panamá: Yappy · Nequi · Visa · MC</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
