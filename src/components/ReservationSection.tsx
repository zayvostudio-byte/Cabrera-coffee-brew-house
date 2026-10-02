import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SeatingArea, Reservation } from '../types';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Download,
  AlertCircle,
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface ReservationSectionProps {
  onReservationConfirmed?: (res: Reservation) => void;
  lang: Language;
  theme: 'luxury-clean' | 'dark';
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  onReservationConfirmed,
  lang,
  theme,
}) => {
  const t = TRANSLATIONS[lang];
  const isLight = theme === 'luxury-clean';

  const [selectedArea, setSelectedArea] = useState<SeatingArea>('lounge');
  const [partySize, setPartySize] = useState<number>(2);
  
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [selectedTime, setSelectedTime] = useState<string>('10:30 AM');
  
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const seatingAreas = [
    {
      id: 'lounge' as SeatingArea,
      title: 'Chesterfield Leather Lounge',
      desc: lang === 'en'
        ? 'Tufted vintage leather sofa beneath suspended warm Edison lighting and herringbone wood wall. Relaxed & intimate.'
        : 'Sillón de cuero capitoné bajo el candelabro Edison y mural de madera chevron. Ambiente cálido y distendido.',
      capacity: lang === 'en' ? 'Up to 5 guests' : 'Hasta 5 pers.',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'main' as SeatingArea,
      title: lang === 'en' ? 'Main Dining & Chevron Wall' : 'Salón Principal & Muro Chevron',
      desc: lang === 'en'
        ? 'Solid wood dining tables with mustard velvet mid-century chairs. Ideal for brunch dates, family, and group celebrations.'
        : 'Mesas de madera de roble con sillas aterciopeladas mostaza. Ideal para brunch en pareja, familia o amigos.',
      capacity: lang === 'en' ? 'Up to 6 guests' : 'Hasta 6 pers.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'roastery' as SeatingArea,
      title: 'First Crack Roaster Corner',
      desc: lang === 'en'
        ? 'Adjacent to our industrial cast-iron coffee roaster and cupping bench. Experience the aroma of freshly dropped roasts.'
        : 'Junto a nuestra máquina tostadora de café industrial y barra de catación. Vive de cerca el aroma del tueste.',
      capacity: lang === 'en' ? 'Up to 4 guests' : 'Hasta 4 pers.',
      image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'patio' as SeatingArea,
      title: lang === 'en' ? 'Sunlit Patio & Umbrellas' : 'Terraza & Patio al Sol',
      desc: lang === 'en'
        ? 'Breezy outdoor terrace with cafe umbrellas and natural sunlight. 100% Pet-friendly for furry companions.'
        : 'Mesas exteriores con sombrillas frescas, luz natural y brisa. 100% Pet-friendly para tu mascota.',
      capacity: lang === 'en' ? 'Up to 4 guests' : 'Hasta 4 pers.',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const timeSlots = [
    { time: '8:30 AM', status: 'available' },
    { time: '9:30 AM', status: 'available' },
    { time: '10:30 AM', status: 'popular', label: t.popularSlot },
    { time: '11:30 AM', status: 'popular', label: t.highDemandSlot },
    { time: '12:30 PM', status: 'available' },
    { time: '1:30 PM', status: 'available' },
    { time: '2:30 PM', status: 'available' },
    { time: '3:30 PM', status: 'available' },
    { time: '4:30 PM', status: 'available' },
    { time: '5:30 PM', status: 'available' },
    { time: '6:30 PM', status: 'available' },
  ];

  const handleBookTable = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!guestName.trim()) {
      setErrorMsg(lang === 'en' ? 'Please enter primary guest name.' : 'Por favor ingresa tu nombre completo.');
      return;
    }
    if (!guestPhone.trim()) {
      setErrorMsg(lang === 'en' ? 'Please enter your WhatsApp or phone number.' : 'Por favor ingresa tu número de WhatsApp para confirmar.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const code = `RES-${Math.floor(10000 + Math.random() * 90000)}`;
      const res: Reservation = {
        id: `res-${Date.now()}`,
        code,
        guestName,
        email: guestEmail,
        phone: guestPhone,
        partySize,
        date: selectedDate,
        timeSlot: selectedTime,
        seatingArea: selectedArea,
        specialRequests: specialRequests.trim() || undefined,
        status: 'confirmed',
        createdAt: new Date().toLocaleTimeString(),
      };

      setConfirmedReservation(res);
      if (onReservationConfirmed) {
        onReservationConfirmed(res);
      }

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#b58548', '#34d399', '#ffffff'],
        });
      } catch (e) {}
    }, 1200);
  };

  const handleDownloadCalendar = () => {
    if (!confirmedReservation) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Cabrera Coffee Brew House//Reservas//EN
BEGIN:VEVENT
SUMMARY:Reservation at Cabrera Coffee Brew House (${confirmedReservation.code})
DESCRIPTION:Reservation for ${confirmedReservation.partySize} guests at ${confirmedReservation.seatingArea.toUpperCase()}. Code: ${confirmedReservation.code}
LOCATION:Plaza Cabrera, Vía Principal, Panamá
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Cabrera_Reservation_${confirmedReservation.code}.ics`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.section
      id="reservas"
      initial={{ opacity: 0.05 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.06 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`py-20 border-t relative transition-colors ${
        isLight ? 'bg-[#fcfbf9] border-[#e8e2d6] text-[#181513]' : 'bg-[#12100e] border-[#261f18] text-[#f7f5f0]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14 space-y-3"
        >
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#b58548]">
            <Calendar className="w-4 h-4" />
            <span>{t.resKicker}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-black tracking-tight">
            {t.resTitle}
          </h2>

          <p className={`text-sm leading-relaxed ${isLight ? 'text-[#6e6356]' : 'text-[#b5a99b]'}`}>
            {t.resSubtitle}
          </p>
        </motion.div>

        {confirmedReservation ? (
          /* CONFIRMED RESERVATION VOUCHER */
          <div className={`max-w-xl mx-auto rounded-2xl p-8 shadow-2xl border space-y-6 text-center animate-in zoom-in-95 duration-300 ${
            isLight ? 'bg-white border-[#ded7ca]' : 'bg-[#1a1613] border-[#3f3226]'
          }`}>
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#b58548] font-mono font-bold">
                {t.codeLabel} #{confirmedReservation.code}
              </span>
              <h3 className="font-serif text-2xl font-bold">
                {t.resConfirmedSuccess}
              </h3>
              <p className={`text-xs ${isLight ? 'text-[#706456]' : 'text-[#a6998a]'}`}>
                {t.waitingForYou}
              </p>
            </div>

            <div className={`p-5 rounded-xl border grid grid-cols-2 gap-4 text-left text-xs ${
              isLight ? 'bg-[#faf8f5] border-[#e2dacf]' : 'bg-[#14110e] border-[#2b221a]'
            }`}>
              <div>
                <span className="opacity-70 block">{t.dateLabel}</span>
                <span className="font-bold">{confirmedReservation.date}</span>
              </div>
              <div>
                <span className="opacity-70 block">{t.timeLabel}</span>
                <span className="font-bold text-[#b58548] font-mono">{confirmedReservation.timeSlot}</span>
              </div>
              <div>
                <span className="opacity-70 block">{t.guestsLabel}</span>
                <span className="font-bold">{confirmedReservation.partySize} {confirmedReservation.partySize > 1 ? (lang === 'en' ? 'guests' : 'personas') : (lang === 'en' ? 'guest' : 'persona')}</span>
              </div>
              <div>
                <span className="opacity-70 block">{t.areaAssignedLabel}</span>
                <span className="font-bold capitalize">{confirmedReservation.seatingArea}</span>
              </div>
              {confirmedReservation.specialRequests && (
                <div className={`col-span-2 pt-2 border-t ${isLight ? 'border-[#eee7db]' : 'border-[#241c16]'}`}>
                  <span className="opacity-70 block">{t.specialRequestLabel}</span>
                  <span className="italic">"{confirmedReservation.specialRequests}"</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleDownloadCalendar}
                className={`flex-1 py-3 px-4 text-xs font-semibold rounded-xl border transition-all flex items-center justify-center gap-2 ${
                  isLight
                    ? 'bg-[#f4efe7] hover:bg-[#eae3d6] border-[#ded7ca]'
                    : 'bg-[#261f18] hover:bg-[#342921] border-[#433527]'
                }`}
              >
                <Download className="w-4 h-4 text-[#b58548]" />
                <span>{t.addCalendarBtn}</span>
              </button>

              <button
                type="button"
                onClick={() => setConfirmedReservation(null)}
                className="flex-1 py-3 px-4 bg-[#b58548] hover:bg-[#9c6e33] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
              >
                {t.makeAnotherRes}
              </button>
            </div>
          </div>
        ) : (
          /* INTERACTIVE SCHEDULER FORM */
          <form onSubmit={handleBookTable} className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
            
            <div className="lg:col-span-7 space-y-8">
              {/* Step 1: Select Seating Area */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#b58548] text-white font-mono text-xs flex items-center justify-center font-bold">1</span>
                    {t.stepChooseArea}
                  </h3>
                  <span className="text-xs opacity-75">{t.areasAvailableCount}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {seatingAreas.map((area, idx) => {
                    const isSelected = selectedArea === area.id;
                    return (
                      <motion.div
                        key={area.id}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                        onClick={() => setSelectedArea(area.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between group editorial-image-container ${
                          isSelected
                            ? 'border-[#b58548] bg-[#b58548]/10 shadow-md ring-1 ring-[#b58548]'
                            : isLight ? 'border-[#ded7ca] bg-white hover:border-[#b58548]' : 'border-[#2d241c] bg-[#171310] hover:border-[#433527]'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-black/10">
                            <img
                              src={area.image}
                              alt={area.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-xs leading-snug">
                              {area.title}
                            </h4>
                            <span className="text-[10px] text-[#b58548] font-mono mt-0.5 block font-semibold">
                              {area.capacity}
                            </span>
                          </div>
                        </div>

                        <p className={`text-[11px] mt-2 leading-relaxed ${isLight ? 'text-[#706456]' : 'text-[#9c8e7f]'}`}>
                          {area.desc}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Date, Party Size & Time Slots */}
              <div className={`space-y-4 pt-4 border-t ${isLight ? 'border-[#eee7db]' : 'border-[#261f18]'}`}>
                <h3 className="font-serif text-lg font-bold flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#b58548] text-white font-mono text-xs flex items-center justify-center font-bold">2</span>
                  {t.stepDateTimeParty}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs mb-1 font-medium opacity-80">{t.reservationDate}</label>
                    <input
                      type="date"
                      min={todayStr}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className={`w-full border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#b58548] ${
                        isLight ? 'bg-white border-[#ded7ca]' : 'bg-[#1c1713] border-[#342a20] text-white'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs mb-1 font-medium opacity-80">{t.partySizeLabel}</label>
                    <div className={`flex items-center gap-1.5 border rounded-xl p-1 ${
                      isLight ? 'bg-white border-[#ded7ca]' : 'bg-[#1c1713] border-[#342a20]'
                    }`}>
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setPartySize(num)}
                          className={`flex-1 py-1.5 text-xs font-mono font-bold rounded-lg transition-all ${
                            partySize === num
                              ? 'bg-[#b58548] text-white'
                              : 'opacity-70 hover:opacity-100'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => setPartySize(8)}
                        className={`px-2 py-1.5 text-xs font-mono font-bold rounded-lg transition-all ${
                          partySize >= 7
                            ? 'bg-[#b58548] text-white'
                            : 'opacity-70 hover:opacity-100'
                        }`}
                      >
                        7+
                      </button>
                    </div>
                  </div>
                </div>

                {/* Time Slots */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium opacity-80">{t.availableSlotsLabel}</label>
                    <span className="text-[11px] text-emerald-600 font-mono font-semibold">● Live Availability</span>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {timeSlots.map((slot) => {
                      const isSelected = selectedTime === slot.time;
                      return (
                        <button
                          key={slot.time}
                          type="button"
                          onClick={() => setSelectedTime(slot.time)}
                          className={`py-2 px-1 text-center rounded-xl border text-xs font-mono font-semibold transition-all ${
                            isSelected
                              ? 'border-[#b58548] bg-[#b58548] text-white shadow-md'
                              : isLight ? 'border-[#ded7ca] bg-white text-[#706456]' : 'border-[#2d241c] bg-[#1a1613] text-[#9c8e7f]'
                          }`}
                        >
                          <div>{slot.time}</div>
                          {slot.label && (
                            <span className="text-[9px] block font-sans opacity-85">
                              {slot.label}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>

            {/* Right 5 Columns: Step 3 (Guest Details) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={`lg:col-span-5 border rounded-2xl p-6 space-y-6 flex flex-col justify-between shadow-lg ${
                isLight ? 'bg-white border-[#ded7ca]' : 'bg-[#171310] border-[#33281f]'
              }`}
            >
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#b58548] text-white font-mono text-xs flex items-center justify-center font-bold">3</span>
                  {t.stepGuestData}
                </h3>

                {errorMsg && (
                  <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl flex items-center gap-2 text-xs text-rose-800">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] mb-1 font-medium opacity-80">{t.holderName}</label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Sofia Morales"
                      className={`w-full border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#b58548] ${
                        isLight ? 'bg-[#faf8f5] border-[#ded7ca]' : 'bg-[#120f0d] border-[#332920] text-white'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] mb-1 font-medium opacity-80">{t.holderPhone}</label>
                    <input
                      type="tel"
                      required
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="+507 6200-1234"
                      className={`w-full border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#b58548] ${
                        isLight ? 'bg-[#faf8f5] border-[#ded7ca]' : 'bg-[#120f0d] border-[#332920] text-white'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] mb-1 font-medium opacity-80">{t.holderEmail}</label>
                    <input
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="sofia@email.com"
                      className={`w-full border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#b58548] ${
                        isLight ? 'bg-[#faf8f5] border-[#ded7ca]' : 'bg-[#120f0d] border-[#332920] text-white'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] mb-1 font-medium opacity-80">{t.holderSpecialReq}</label>
                    <textarea
                      rows={2}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder={t.holderSpecialReqPlaceholder}
                      className={`w-full border rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#b58548] resize-none ${
                        isLight ? 'bg-[#faf8f5] border-[#ded7ca]' : 'bg-[#120f0d] border-[#332920] text-white'
                      }`}
                    />
                  </div>
                </div>

                {/* Instant Recap */}
                <div className={`p-3.5 rounded-xl border space-y-1.5 text-xs ${
                  isLight ? 'bg-[#faf8f5] border-[#e2dacf]' : 'bg-[#120f0d] border-[#2b2118]'
                }`}>
                  <div className="flex justify-between opacity-80">
                    <span>{t.instantRecapSpace}</span>
                    <strong className="capitalize">{selectedArea}</strong>
                  </div>
                  <div className="flex justify-between opacity-80">
                    <span>{t.instantRecapTime}</span>
                    <strong className="text-[#b58548] font-mono">{selectedDate} @ {selectedTime}</strong>
                  </div>
                  <div className="flex justify-between opacity-80">
                    <span>{t.instantRecapParty}</span>
                    <strong>{partySize} {partySize > 1 ? (lang === 'en' ? 'guests' : 'personas') : (lang === 'en' ? 'guest' : 'persona')}</strong>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#b58548] hover:bg-[#9c6e33] disabled:opacity-60 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{lang === 'en' ? 'Checking table availability...' : 'Verificando disponibilidad de mesa...'}</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span>{t.confirmTableBooking}</span>
                  </>
                )}
              </button>
            </motion.div>

          </form>
        )}

      </div>
    </motion.section>
  );
};
