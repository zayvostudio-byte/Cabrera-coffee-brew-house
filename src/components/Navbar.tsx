import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CabreraLogo } from './CabreraLogo';
import { ShoppingBag, Calendar, MapPin, Menu, X, ChevronRight, Phone, Sun, Moon, Clock, Sparkles } from 'lucide-react';
import { OrderType } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { usePanamaTime } from '../utils/panamaTime';
import { PanamaConciergeModal } from './PanamaConciergeModal';

interface NavbarProps {
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  cartCount: number;
  cartSubtotal: number;
  onOpenCart: () => void;
  lang: Language;
  setLang: (l: Language) => void;
  theme: 'luxury-clean' | 'dark';
  setTheme: (t: 'luxury-clean' | 'dark') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  orderType,
  setOrderType,
  cartCount,
  cartSubtotal,
  onOpenCart,
  lang,
  setLang,
  theme,
  setTheme,
}) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);

  // Live Panama Country Time Engine (UTC-5)
  const panamaTime = usePanamaTime();
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Real multi-page navigation routes
  const navLinks = [
    { name: t.navHome || 'Home', path: '/' },
    { name: t.navMenu || 'Menu', path: '/menu' },
    { name: t.navOurStory || 'Our Story', path: '/our-story' },
    { name: t.navGallery || 'Gallery', path: '/gallery' },
    { name: t.navVisit || 'Visit', path: '/visit' },
  ];

  const isLight = theme === 'luxury-clean';

  return (
    <>
      {/* Search-Grounded Panama AI Concierge Modal */}
      <PanamaConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        lang={lang}
      />

      {/* Top micro announcement bar with live Panama Country Time */}
      <div className={`border-b text-xs py-1.5 px-4 hidden md:block transition-colors ${
        isLight
          ? 'bg-[#f4ede2] border-[#e2d5c3] text-[#5c4536]'
          : 'bg-[#150c07] border-[#2c170d] text-[#cfc1b4]'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Live Panama Status */}
            <span className="flex items-center gap-2">
              <span className={`inline-block w-2.5 h-2.5 rounded-full ${panamaTime.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-[#c85a17]'}`} />
              <strong className={isLight ? 'text-[#24140b]' : 'text-[#fcf9f4]'}>
                {panamaTime.isOpen ? (lang === 'en' ? 'Open in Panama' : 'Abierto en Panamá') : (lang === 'en' ? 'Closed in Panama' : 'Cerrado en Panamá')}
              </strong>
              <span className="flex items-center gap-1 font-mono text-[11px] text-[#c85a17] font-bold px-1.5 py-0.5 rounded bg-[#c85a17]/10">
                <Clock className="w-3 h-3 text-[#c85a17]" />
                {panamaTime.panamaTimeString} (UTC-5)
              </span>
              <span className={isLight ? 'text-[#7d6756]' : 'text-[#a39080]'}>
                · {lang === 'en' ? panamaTime.nextEventDescriptionEn : panamaTime.nextEventDescriptionEs}
              </span>
            </span>

            <span className={isLight ? 'text-[#d6c8b4]' : 'text-[#422b1d]'}>|</span>

            {/* Researched Costa Verde Address */}
            <a
              href={RESTAURANT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1 hover:text-[#c85a17] transition-colors truncate max-w-sm ${isLight ? 'text-[#5c4536]' : 'text-[#cfc1b4]'}`}
            >
              <MapPin className="w-3.5 h-3.5 text-[#c85a17] shrink-0" />
              <span className="truncate">Plaza Paseo Costa Verde, Blvd. Costa Verde, Panamá</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            {/* Google Search Grounded Concierge Quick Button */}
            <button
              type="button"
              onClick={() => setIsConciergeOpen(true)}
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#c85a17] hover:text-[#db6824] transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'AI Barista Concierge (Google Search)' : 'Concierge IA (Búsqueda en Vivo)'}</span>
            </button>

            <span className={isLight ? 'text-[#d6c8b4]' : 'text-[#422b1d]'}>|</span>

            <a
              href={RESTAURANT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#c85a17] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#c85a17]" />
              <span>+507 6603-9178</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar in Chocolate, Cream & Burnt Orange */}
      <header
        className={`sticky top-0 z-40 transition-colors duration-200 ${
          isLight
            ? isScrolled
              ? 'bg-[#ffffff]/98 shadow-sm border-b border-[#e2d5c3] py-2.5'
              : 'bg-[#faf6ee] border-b border-[#e6dac9] py-3.5'
            : isScrolled
              ? 'bg-[#1c110a]/98 shadow-md border-b border-[#382215] py-2.5'
              : 'bg-[#1c110a] border-b border-[#311e13] py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo linking to Home / */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            aria-label="Cabrera Coffee Home"
          >
            <CabreraLogo
              size="sm"
              variant={isLight ? 'luxury-dark' : 'gold'}
              showSubtitle={true}
            />
          </Link>

          {/* Center Navigation Links: Real routes with active indicator */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs font-bold uppercase tracking-wider transition-colors relative py-1 ${
                    isActive
                      ? 'text-[#c85a17] font-extrabold'
                      : isLight
                        ? 'text-[#4a3528] hover:text-[#c85a17]'
                        : 'text-[#cfc1b4] hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c85a17] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <div className={`flex items-center rounded-lg p-0.5 border text-xs font-bold ${
              isLight
                ? 'bg-[#f4ede2] border-[#ded0bd]'
                : 'bg-[#281810] border-[#3f271a]'
            }`}>
              <button
                type="button"
                onClick={() => setLang('es')}
                className={`px-2 py-1 rounded transition-all ${
                  lang === 'es'
                    ? 'bg-[#c85a17] text-white shadow-sm'
                    : isLight ? 'text-[#6e5849] hover:text-black' : 'text-[#b09e90] hover:text-white'
                }`}
                aria-label="Español"
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded transition-all ${
                  lang === 'en'
                    ? 'bg-[#c85a17] text-white shadow-sm'
                    : isLight ? 'text-[#6e5849] hover:text-black' : 'text-[#b09e90] hover:text-white'
                }`}
                aria-label="English"
              >
                EN
              </button>
            </div>

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={() => setTheme(isLight ? 'dark' : 'luxury-clean')}
              className={`p-2 rounded-lg border transition-all ${
                isLight
                  ? 'bg-white border-[#e0d3c0] text-[#4a3528] hover:bg-[#f5eee3]'
                  : 'bg-[#281810] border-[#3f271a] text-[#ffbf80] hover:bg-[#352015]'
              }`}
              title={isLight ? 'Modo Chocolate Dark' : 'Modo Cream & Chocolate'}
              aria-label="Cambiar tema visual"
            >
              {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* AI Barista Concierge Button */}
            <button
              type="button"
              onClick={() => setIsConciergeOpen(true)}
              className="p-2 rounded-lg border border-[#c85a17]/40 bg-[#c85a17]/10 hover:bg-[#c85a17]/20 text-[#c85a17] transition-all flex items-center gap-1.5 text-xs font-bold"
              title={lang === 'en' ? 'Ask AI Concierge (Google Search Grounded)' : 'Consultar Barista IA (Con búsqueda de Google)'}
            >
              <Sparkles className="w-4 h-4 text-[#c85a17]" />
              <span className="hidden xl:inline">{lang === 'en' ? 'Ask Barista' : 'Concierge IA'}</span>
            </button>

            {/* Cart Drawer Trigger with Burnt Orange Accent */}
            <button
              type="button"
              onClick={onOpenCart}
              className="relative inline-flex items-center gap-2 px-3.5 py-2 bg-[#c85a17] hover:bg-[#b54d0f] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">{t.myOrder}</span>
              {cartCount > 0 && (
                <span className="flex items-center justify-center bg-white text-[#24140b] font-mono font-bold text-xs h-5 min-w-5 px-1.5 rounded-full">
                  {cartCount}
                </span>
              )}
              {cartSubtotal > 0 && (
                <span className="hidden lg:inline font-mono font-bold border-l border-white/30 pl-2">
                  ${cartSubtotal.toFixed(2)}
                </span>
              )}
            </button>

            {/* Mobile / iPad menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg border ${
                isLight ? 'bg-white border-[#e0d3c0] text-[#24140b]' : 'bg-[#281810] border-[#3f271a] text-[#fcf9f4]'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile & iPad Navigation Drawer */}
        {mobileMenuOpen && (
          <div className={`lg:hidden border-b px-4 pt-3 pb-6 space-y-4 shadow-2xl ${
            isLight ? 'bg-[#faf6ee] border-[#e2d5c3]' : 'bg-[#1c110a] border-[#382215]'
          }`}>
            <div className={`flex items-center justify-between p-3 rounded-xl border ${
              isLight ? 'bg-white border-[#e0d3c0]' : 'bg-[#281810] border-[#3f271a]'
            }`}>
              <span className="text-xs font-bold text-[#c85a17]">{t.serviceMode}</span>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setOrderType('dine_in')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                    orderType === 'dine_in'
                      ? 'bg-[#c85a17] text-white shadow-sm'
                      : isLight ? 'text-[#5c4536]' : 'text-[#cfc1b4]'
                  }`}
                >
                  {t.dineIn}
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('takeout')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                    orderType === 'takeout'
                      ? 'bg-[#c85a17] text-white shadow-sm'
                      : isLight ? 'text-[#5c4536]' : 'text-[#cfc1b4]'
                  }`}
                >
                  {t.takeout}
                </button>
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between py-3 px-3 text-sm font-bold rounded-xl transition-colors ${
                      isActive
                        ? 'bg-[#c85a17] text-white shadow-sm'
                        : isLight
                          ? 'text-[#24140b] hover:bg-[#f2e7d7]'
                          : 'text-[#fcf9f4] hover:bg-[#281810]'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#c85a17]'}`} />
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsConciergeOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 border border-[#c85a17] text-[#c85a17] rounded-xl text-sm font-bold bg-[#c85a17]/10"
              >
                <Sparkles className="w-4 h-4" />
                <span>{lang === 'en' ? 'AI Barista Concierge (Google Search)' : 'Concierge IA (Búsqueda en Vivo)'}</span>
              </button>

              <Link
                to="/visit"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#c85a17] hover:bg-[#b54d0f] text-white rounded-xl text-sm font-bold shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.reserveTable}</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
