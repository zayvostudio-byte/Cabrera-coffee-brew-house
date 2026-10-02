import React from 'react';
import { motion } from 'motion/react';
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
  ShieldCheck,
  CreditCard
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
    <footer id="contacto" className={`border-t pt-16 pb-12 text-left transition-colors overflow-hidden ${
      isLight ? 'bg-[#f4efe7] border-[#ded7ca] text-[#181513]' : 'bg-[#0e0c0a] border-[#241d17] text-[#f7f5f0]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1 (4 cols): Brand & Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 space-y-4"
          >
            <Link to="/" className="inline-block">
              <CabreraLogo
                size="md"
                variant={isLight ? 'luxury-dark' : 'gold'}
                showSubtitle={true}
              />
            </Link>
            <p className={`text-xs leading-relaxed pt-2 ${isLight ? 'text-[#6e6356]' : 'text-[#a89b8d]'}`}>
              {t.footerDesc}
            </p>

            {/* Social & Contact Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="pt-2 flex items-center gap-3"
            >
              <a
                href="https://instagram.com/CabreraCoffee"
                target="_blank"
                rel="noreferrer"
                className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-colors ${
                  isLight
                    ? 'bg-white border-[#ded7ca] text-[#b58548] hover:bg-[#b58548] hover:text-white'
                    : 'bg-[#1a1512] border-[#33281f] text-[#b58548] hover:bg-[#b58548] hover:text-[#12100e]'
                }`}
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/CabreraCoffee"
                target="_blank"
                rel="noreferrer"
                className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-colors ${
                  isLight
                    ? 'bg-white border-[#ded7ca] text-[#b58548] hover:bg-[#b58548] hover:text-white'
                    : 'bg-[#1a1512] border-[#33281f] text-[#b58548] hover:bg-[#b58548] hover:text-[#12100e]'
                }`}
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={RESTAURANT_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1.5 px-3 py-2 border rounded-lg text-xs font-medium transition-colors ${
                  isLight
                    ? 'bg-white border-[#ded7ca] text-[#128c7e] hover:bg-[#128c7e] hover:text-white'
                    : 'bg-[#1a1512] border-[#33281f] text-[#25d366] hover:bg-[#25d366] hover:text-[#12100e]'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+507 6603-9178</span>
              </a>
            </motion.div>

            <div className="pt-2 text-[11px] font-mono text-[#b58548] font-bold">
              #THECOFFEEEXPERIENCE
            </div>
          </motion.div>

          {/* Col 2 (3 cols): Official Hours in Panama Time */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-base font-bold flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#b58548]" />
                {t.hoursHeading}
              </h4>
              <span className="font-mono text-[10px] text-[#b58548] font-semibold">
                UTC-5
              </span>
            </div>
            <div className={`space-y-2 text-xs divide-y ${isLight ? 'divide-[#ded7ca]' : 'divide-[#211a14]'}`}>
              {RESTAURANT_INFO.hours.map((h, i) => (
                <div key={i} className="pt-2 flex flex-col justify-between">
                  <span className="font-semibold">
                    {lang === 'en' && h.daysEn ? h.daysEn : h.days}
                  </span>
                  <span className={`font-mono text-[11px] ${isLight ? 'text-[#706456]' : 'text-[#a89a8a]'}`}>
                    {h.time}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Col 3 (3 cols): Location & Amenities */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 space-y-3"
          >
            <h4 className="font-serif text-base font-bold flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#b58548]" />
              {t.locationHeading}
            </h4>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-[#6e6356]' : 'text-[#b8aca0]'}`}>
              {RESTAURANT_INFO.address}
            </p>

            {/* Smooth horizontal wipe reveal for map / direction element */}
            <motion.div
              initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0.7 }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#b58548] hover:underline pt-1 font-semibold"
              >
                <span>{t.openGoogleMaps}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </motion.div>

            <div className={`pt-3 space-y-1.5 text-[11px] ${isLight ? 'text-[#6e6356]' : 'text-[#9c8e80]'}`}>
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
          </motion.div>

          {/* Col 4 (2 cols): Quick Multi-Page Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 space-y-3"
          >
            <h4 className="font-serif text-base font-bold">
              {t.quickLinksHeading}
            </h4>
            <ul className={`space-y-2 text-xs ${isLight ? 'text-[#6e6356]' : 'text-[#b0a395]'}`}>
              <li>
                <Link to="/" className="hover:text-[#b58548] transition-colors">
                  {t.navHome || 'Inicio'}
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-[#b58548] transition-colors">
                  {t.navMenu || 'Menú'}
                </Link>
              </li>
              <li>
                <Link to="/our-story" className="hover:text-[#b58548] transition-colors">
                  {t.navOurStory || 'Nuestra Historia'}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#b58548] transition-colors">
                  {t.navGallery || 'Galería'}
                </Link>
              </li>
              <li>
                <Link to="/visit" className="hover:text-[#b58548] transition-colors">
                  {t.navVisit || 'Visítanos'}
                </Link>
              </li>
            </ul>
          </motion.div>

        </div>

        {/* Bottom copyright line with Live Panama Country Time & Payments */}
        <div className={`pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
          isLight ? 'border-[#ded7ca] text-[#8c7f71]' : 'border-[#1f1914] text-[#7d7062]'
        }`}>
          <div className="flex flex-wrap items-center gap-3">
            <span>© {new Date().getFullYear()} Cabrera Coffee Brew House (Estd 2018). {t.rightsReserved}</span>
            <span className="hidden sm:inline">·</span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#b58548] font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>Hora Panamá: {panamaTime.panamaTimeString} (America/Panama · UTC-5)</span>
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono">
            <span className="text-[#a39483]">Pagos en Panamá: Yappy · Nequi · Visa · MC</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
