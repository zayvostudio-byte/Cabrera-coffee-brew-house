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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
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
          ? 'bg-[#f4efe7] border-[#e2dbce] text-[#786b5e]'
          : 'bg-[#0b0a09] border-[#292420] text-[#c4b9aa]'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Live Panama Status */}
            <span className="flex items-center gap-2">
              <span className={`inline-block w-2.5 h-2.5 rounded-full ${panamaTime.isOpen ? 'bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]' : 'bg-amber-500'}`} />
              <strong className={isLight ? 'text-[#181513]' : 'text-[#f7f5f0]'}>
                {panamaTime.isOpen ? (lang === 'en' ? 'Open in Panama' : 'Abierto en Panamá') : (lang === 'en' ? 'Closed in Panama' : 'Cerrado en Panamá')}
              </strong>
              <span className="flex items-center gap-1 font-mono text-[11px] text-[#b58548] font-bold px-1.5 py-0.5 rounded bg-[#b58548]/10">
                <Clock className="w-3 h-3" />
                {panamaTime.panamaTimeString} (UTC-5)
              </span>
              <span className={isLight ? 'text-[#948777]' : 'text-[#8e8477]'}>
                · {lang === 'en' ? panamaTime.nextEventDescriptionEn : panamaTime.nextEventDescriptionEs}
              </span>
            </span>

            <span className={isLight ? 'text-[#d6cdbf]' : 'text-[#473e35]'}>|</span>

            {/* Researched Costa Verde Address */}
            <a
              href={RESTAURANT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1 hover:text-[#b58548] transition-colors truncate max-w-sm ${isLight ? 'text-[#6e6255]' : 'text-[#a69b8d]'}`}
            >
              <MapPin className="w-3.5 h-3.5 text-[#b58548] shrink-0" />
              <span className="truncate">Plaza Paseo Costa Verde, Blvd. Costa Verde, Panamá</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            {/* Google Search Grounded Concierge Quick Button */}
            <button
              type="button"
              onClick={() => setIsConciergeOpen(true)}
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#b58548] hover:text-[#d49e5d] transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'AI Barista Concierge (Google Search)' : 'Concierge IA (Búsqueda en Vivo)'}</span>
            </button>

            <span className={isLight ? 'text-[#d6cdbf]' : 'text-[#473e35]'}>|</span>

            <a
              href={RESTAURANT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#b58548] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#b58548]" />
              <span>+507 6603-9178</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isLight
            ? isScrolled
              ? 'bg-[#ffffff]/95 backdrop-blur-md shadow-md border-b border-[#e5dfd3] py-2.5'
              : 'bg-[#fcfbf9] border-b border-[#ece6dc] py-3.5'
            : isScrolled
              ? 'bg-[#12100e]/95 backdrop-blur-md shadow-2xl border-b border-[#2c2621] py-2.5'
              : 'bg-[#141210] border-b border-[#241f1a] py-3.5'
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
                  className={`text-xs font-semibold uppercase tracking-wider transition-colors relative py-1 ${
                    isActive
                      ? 'text-[#b58548] font-bold'
                      : isLight
                        ? 'text-[#5c5247] hover:text-[#181513]'
                        : 'text-[#dcd6ca] hover:text-[#f7f5f0]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#b58548] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Language Switcher */}
            <div className={`flex items-center rounded-lg p-0.5 border text-xs font-bold ${
              isLight
                ? 'bg-[#f0eae0] border-[#ddd4c4]'
                : 'bg-[#1e1a17] border-[#38312a]'
            }`}>
              <button
                type="button"
                onClick={() => setLang('es')}
                className={`px-2 py-1 rounded transition-all ${
                  lang === 'es'
                    ? 'bg-[#b58548] text-white shadow-sm'
                    : isLight ? 'text-[#6c5f52] hover:text-black' : 'text-[#a19586] hover:text-white'
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
                    ? 'bg-[#b58548] text-white shadow-sm'
                    : isLight ? 'text-[#6c5f52] hover:text-black' : 'text-[#a19586] hover:text-white'
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
                  ? 'bg-[#f4efe7] border-[#ddd4c4] text-[#615446] hover:bg-[#eae2d4]'
                  : 'bg-[#1e1a17] border-[#38312a] text-[#ffd699] hover:bg-[#2a241f]'
              }`}
              title={isLight ? 'Modo Oscuro Roastery' : 'Modo Claro Luxury'}
              aria-label="Cambiar tema visual"
            >
              {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* AI Barista Concierge Button */}
            <button
              type="button"
              onClick={() => setIsConciergeOpen(true)}
              className="p-2 rounded-lg border border-[#b58548]/40 bg-[#b58548]/15 hover:bg-[#b58548]/25 text-[#b58548] transition-all flex items-center gap-1.5 text-xs font-semibold"
              title={lang === 'en' ? 'Ask AI Concierge (Google Search Grounded)' : 'Consultar Barista IA (Con búsqueda de Google)'}
            >
              <Sparkles className="w-4 h-4 text-[#d49e5d]" />
              <span className="hidden xl:inline">{lang === 'en' ? 'Ask Barista' : 'Concierge IA'}</span>
            </button>

            {/* Cart Drawer Trigger */}
            <button
              type="button"
              onClick={onOpenCart}
              className="relative inline-flex items-center gap-2 px-3.5 py-2 bg-[#b58548] hover:bg-[#9e7036] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">{t.myOrder}</span>
              {cartCount > 0 && (
                <span className="flex items-center justify-center bg-white text-[#181513] font-mono font-bold text-xs h-5 min-w-5 px-1.5 rounded-full">
                  {cartCount}
                </span>
              )}
              {cartSubtotal > 0 && (
                <span className="hidden lg:inline font-mono font-bold border-l border-white/30 pl-2">
                  ${cartSubtotal.toFixed(2)}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg ${
                isLight ? 'text-[#38312a] hover:bg-[#eae3d6]' : 'text-[#dcd6ca] hover:bg-[#221c17]'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className={`lg:hidden border-b px-4 pt-3 pb-6 mt-2 space-y-4 shadow-xl ${
            isLight ? 'bg-[#f9f7f3] border-[#e2dacf]' : 'bg-[#161310] border-[#2c2621]'
          }`}>
            <div className="flex items-center justify-between p-2 rounded-lg border border-black/10">
              <span className="text-xs font-medium">{t.serviceMode}</span>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setOrderType('dine_in')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md ${
                    orderType === 'dine_in' ? 'bg-[#b58548] text-white' : ''
                  }`}
                >
                  {t.dineIn}
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('takeout')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md ${
                    orderType === 'takeout' ? 'bg-[#b58548] text-white' : ''
                  }`}
                >
                  {t.takeout}
                </button>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between py-2.5 px-2 text-sm font-semibold rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[#b58548]/15 text-[#b58548]'
                        : isLight ? 'text-[#3e342a] hover:bg-[#eae3d6]' : 'text-[#e5decb] hover:bg-[#261f18]'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-[#8e8477]" />
                  </Link>
                );
              })}
            </div>

            <Link
              to="/visit"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#b58548] text-white rounded-lg text-sm font-semibold shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.reserveTable}</span>
            </Link>
          </div>
        )}
      </header>
    </>
  );
};
