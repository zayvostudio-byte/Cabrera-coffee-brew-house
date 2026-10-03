import React, { useState } from 'react';
import { ReservationSection } from '../components/ReservationSection';
import { RESTAURANT_INFO } from '../data/menuData';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { usePanamaTime } from '../utils/panamaTime';
import { PanamaConciergeModal } from '../components/PanamaConciergeModal';
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  ExternalLink,
  Calendar,
  Sparkles,
  CreditCard,
  Building,
  CheckCircle2
} from 'lucide-react';

interface VisitPageProps {
  lang: Language;
  theme: 'luxury-clean' | 'dark';
}

export const VisitPage: React.FC<VisitPageProps> = ({ lang, theme }) => {
  const panamaTime = usePanamaTime();
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const t = TRANSLATIONS[lang];
  const isLight = theme === 'luxury-clean';

  return (
    <div
      className={`min-h-screen transition-colors opacity-100 ${
        isLight ? 'bg-[#faf6ee] text-[#24140b]' : 'bg-[#1c110a] text-[#fcf9f4]'
      }`}
    >
      <PanamaConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        lang={lang}
      />

      {/* Hero Header with Live Panama Country Time */}
      <section className={`border-b py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${
        isLight ? 'bg-white border-[#e4d8c7]' : 'bg-[#22150d] border-[#382215]'
      }`}>
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#c85a17] flex items-center gap-1.5 font-mono">
              <Calendar className="w-3.5 h-3.5 text-[#c85a17]" />
              <span>{lang === 'en' ? 'Plan Your Visit & Reserve' : 'Planifica tu Visita y Reserva'}</span>
            </span>

            {/* Live Panama Country Time Clock Card */}
            <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-xl border text-xs font-mono shadow-sm ${
              isLight ? 'bg-[#faf6ee] border-[#e0d3c0]' : 'bg-[#1c110a] border-[#3f271a]'
            }`}>
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${panamaTime.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-[#c85a17]'}`} />
                <span className="font-bold text-[#c85a17]">{panamaTime.panamaTimeString}</span>
                <span className={isLight ? 'text-[#6e5849]' : 'text-[#cfc1b4]'}>· Hora Oficial Panamá (UTC-5)</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                panamaTime.isOpen
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                  : 'bg-[#c85a17]/15 text-[#c85a17]'
              }`}>
                {panamaTime.isOpen ? (lang === 'en' ? 'Open Now' : 'Abierto Ahora') : (lang === 'en' ? 'Closed' : 'Cerrado')}
              </span>
            </div>
          </div>

          <h1 className={`font-serif text-3xl sm:text-5xl font-black tracking-tight ${
            isLight ? 'text-[#24140b]' : 'text-[#fcf9f4]'
          }`}>
            {lang === 'en' ? 'Experience Cabrera Brew House' : 'Vive la Experiencia Cabrera Brew House'}
          </h1>
          <p className={`text-base max-w-2xl leading-relaxed ${isLight ? 'text-[#5c4536]' : 'text-[#cfc1b4]'}`}>
            {lang === 'en'
              ? 'The premier specialty coffee micro-roastery in Panama Oeste. Reserve your table in real-time, explore our Boquete highland lots, and experience craft brunch in Costa Verde.'
              : 'La primera tostaduría de café de especialidad de Panamá Oeste. Reserva tu mesa en tiempo real, degusta nuestros microlotes de Boquete y disfruta brunch de autor en Costa Verde.'}
          </p>

          <div className="pt-2 flex flex-wrap gap-2">
            <button
              onClick={() => setIsConciergeOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#c85a17]/10 hover:bg-[#c85a17]/20 text-[#c85a17] border border-[#c85a17]/40 rounded-xl text-xs font-bold transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Ask AI Concierge (Google Search Grounded)' : 'Consultar Barista IA (Con búsqueda de Google)'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Reservation Section */}
      <ReservationSection lang={lang} theme={theme} />

      {/* Researched Venue Profile & Panama Information */}
      <section className={`border-t py-16 px-4 sm:px-6 lg:px-8 ${
        isLight ? 'bg-[#f4eee3] border-[#e4d8c7]' : 'bg-[#150d07] border-[#311c10]'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left: Location & Researched Venue Details */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#c85a17] font-mono">
                  {lang === 'en' ? 'Official Flagship Roastery' : 'Sede Principal Costa Verde'}
                </span>
                <h3 className={`font-serif text-2xl font-bold mt-1 ${isLight ? 'text-[#24140b]' : 'text-[#fcf9f4]'}`}>
                  {RESTAURANT_INFO.name}
                </h3>
                <p className={`text-xs mt-1 font-semibold ${isLight ? 'text-[#6e5849]' : 'text-[#b8a696]'}`}>
                  {lang === 'en' ? RESTAURANT_INFO.distinctionEn : RESTAURANT_INFO.distinctionEs}
                </p>
              </div>

              {/* Addresses Grid */}
              <div className="space-y-3">
                <div className={`p-4 rounded-xl border ${isLight ? 'bg-white border-[#e0d3c0]' : 'bg-[#26170f] border-[#3f271a]'}`}>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#c85a17] shrink-0 mt-0.5" />
                    <div>
                      <strong className={`block text-sm font-serif ${isLight ? 'text-[#24140b]' : 'text-[#fcf9f4]'}`}>
                        {lang === 'en' ? 'Flagship Costa Verde (Panamá Oeste)' : 'Sede Costa Verde (Panamá Oeste)'}
                      </strong>
                      <p className={`text-xs mt-0.5 ${isLight ? 'text-[#5c4536]' : 'text-[#cfc1b4]'}`}>
                        {RESTAURANT_INFO.address}
                      </p>
                      <span className="inline-block mt-1 text-[11px] text-[#c85a17] font-mono font-bold">
                        {lang === 'en' ? 'Free plaza parking available' : 'Estacionamientos gratuitos en la plaza'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border ${isLight ? 'bg-white border-[#e0d3c0]' : 'bg-[#26170f] border-[#3f271a]'}`}>
                  <div className="flex items-start gap-3">
                    <Building className="w-5 h-5 text-[#c85a17] shrink-0 mt-0.5" />
                    <div>
                      <strong className={`block text-sm font-serif ${isLight ? 'text-[#24140b]' : 'text-[#fcf9f4]'}`}>
                        {lang === 'en' ? 'Panama City Branch (Vía Argentina)' : 'Sede Ciudad de Panamá (Vía Argentina)'}
                      </strong>
                      <p className={`text-xs mt-0.5 ${isLight ? 'text-[#5c4536]' : 'text-[#cfc1b4]'}`}>
                        {RESTAURANT_INFO.addressSecondary}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Panama Payment Methods Accepted */}
              <div className={`p-4 rounded-xl border space-y-2 ${isLight ? 'bg-white border-[#e0d3c0]' : 'bg-[#26170f] border-[#3f271a]'}`}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#c85a17] flex items-center gap-1.5 font-mono">
                  <CreditCard className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Accepted Payment Methods in Panama' : 'Métodos de Pago Aceptados en Panamá'}</span>
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {RESTAURANT_INFO.acceptedPayments.map((p, idx) => (
                    <span
                      key={idx}
                      className={`text-xs px-2.5 py-1 rounded-md border font-semibold flex items-center gap-1.5 ${
                        p.includes('Yappy')
                          ? 'bg-[#0089cf]/10 border-[#0089cf]/30 text-[#0089cf]'
                          : p.includes('Nequi')
                            ? 'bg-[#e0004d]/10 border-[#e0004d]/30 text-[#e0004d]'
                            : isLight
                              ? 'bg-[#faf6ee] border-[#e0d3c0] text-[#4a3528]'
                              : 'bg-[#1c110a] border-[#3f271a] text-[#cfc1b4]'
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{p}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 bg-[#c85a17] hover:bg-[#b54d0f] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  <span>{t.openGoogleMaps}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={RESTAURANT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`px-5 py-3.5 border rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                    isLight
                      ? 'bg-white border-[#e0d3c0] text-[#128c7e] hover:bg-[#128c7e] hover:text-white'
                      : 'bg-[#26170f] border-[#3f271a] text-[#25d366] hover:bg-[#25d366] hover:text-[#1c110a]'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  <span>WhatsApp Barista (+507 6603-9178)</span>
                </a>
              </div>
            </div>

            {/* Right: Researched Official Schedule & Roastery Atmosphere */}
            <div className="lg:col-span-6 space-y-6">
              {/* Hours Grid */}
              <div className={`p-6 rounded-2xl border space-y-4 shadow-sm ${
                isLight ? 'bg-white border-[#e0d3c0]' : 'bg-[#26170f] border-[#3f271a]'
              }`}>
                <div className="flex items-center justify-between">
                  <h4 className={`font-serif font-bold text-base flex items-center gap-2 ${isLight ? 'text-[#24140b]' : 'text-[#fcf9f4]'}`}>
                    <Clock className="w-4 h-4 text-[#c85a17]" />
                    <span>{t.hoursHeading}</span>
                  </h4>
                  <span className="text-[11px] font-mono text-[#c85a17] font-bold">
                    America/Panama (UTC-5)
                  </span>
                </div>

                <div className={`space-y-3 text-xs divide-y ${isLight ? 'divide-[#f2ece2]' : 'divide-[#352015]'}`}>
                  {RESTAURANT_INFO.hours.map((h, i) => (
                    <div key={i} className="pt-3 flex items-center justify-between">
                      <span className={`font-semibold text-sm ${isLight ? 'text-[#24140b]' : 'text-[#fcf9f4]'}`}>
                        {lang === 'en' && h.daysEn ? h.daysEn : h.days}
                      </span>
                      <div className="text-right">
                        <span className="font-mono text-xs text-[#c85a17] font-bold block">
                          {h.time}
                        </span>
                        <span className={`text-[10px] ${isLight ? 'text-[#7d6756]' : 'text-[#a39080]'}`}>
                          {h.timeZone}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={`p-3.5 rounded-xl text-[11px] leading-relaxed border ${
                  isLight ? 'bg-[#faf6ee] border-[#e0d3c0] text-[#5c4536]' : 'bg-[#1c110a] border-[#3f271a] text-[#cfc1b4]'
                }`}>
                  <strong className="block text-[#c85a17] font-serif font-bold mb-0.5">
                    {lang === 'en' ? 'Specialty Roasting Mondays:' : 'Lunes de Tueste de Especialidad:'}
                  </strong>
                  {lang === 'en'
                    ? 'Our Costa Verde roastery dedicates Mondays to batch roasting highland micro-lots from Chiriquí, tasting profile quality control, and barista calibration. Dine-in reopens Tuesday at 7:00 AM.'
                    : 'Nuestra tostaduría en Costa Verde dedica los lunes al tueste artesanal de microlotes de Chiriquí, control de calidad en catas y calibración del equipo. El servicio en mesa reabre el martes a las 7:00 AM.'}
                </div>
              </div>

              {/* Exterior Visual */}
              <div className={`relative rounded-2xl overflow-hidden border shadow-xl ${
                isLight ? 'border-[#e0d3c0] bg-white' : 'border-[#3f271a] bg-[#26170f]'
              }`}>
                <div className="h-64 w-full overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=85"
                    alt="Cabrera Coffee Exterior and Entrance"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                    <div>
                      <span className="font-serif font-bold block text-sm">Plaza Paseo Costa Verde</span>
                      <span className="text-[11px] text-[#ffb076]">La Chorrera, Panamá Oeste · Estd 2018</span>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-[#c85a17] font-mono text-[11px] font-bold">
                      Local #12
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
