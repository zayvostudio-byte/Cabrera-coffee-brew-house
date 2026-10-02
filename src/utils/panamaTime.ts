import { useState, useEffect } from 'react';

export interface PanamaSchedule {
  dayNameEs: string;
  dayNameEn: string;
  openHour: number; // e.g., 7 for 7am, 8 for 8am
  openMinute: number;
  closeHour: number; // e.g., 19 for 7pm
  closeMinute: number; // e.g., 30 for 7:30pm
  isClosedAllDay?: boolean;
  formattedEs: string;
  formattedEn: string;
}

// Researched official schedule for Cabrera Coffee Brew House (Costa Verde Flagship)
export const PANAMA_WEEKLY_SCHEDULE: Record<number, PanamaSchedule> = {
  0: { // Sunday
    dayNameEs: 'Domingo',
    dayNameEn: 'Sunday',
    openHour: 8,
    openMinute: 0,
    closeHour: 16,
    closeMinute: 0,
    isClosedAllDay: false,
    formattedEs: '8:00 AM – 4:00 PM',
    formattedEn: '8:00 AM – 4:00 PM',
  },
  1: { // Monday - Closed for roasting & maintenance
    dayNameEs: 'Lunes',
    dayNameEn: 'Monday',
    openHour: 0,
    openMinute: 0,
    closeHour: 0,
    closeMinute: 0,
    isClosedAllDay: true,
    formattedEs: 'Cerrado (Día de Tostaduría & Mantenimiento)',
    formattedEn: 'Closed (Specialty Roasting & Team Day)',
  },
  2: { // Tuesday
    dayNameEs: 'Martes',
    dayNameEn: 'Tuesday',
    openHour: 7,
    openMinute: 0,
    closeHour: 19,
    closeMinute: 30,
    formattedEs: '7:00 AM – 7:30 PM',
    formattedEn: '7:00 AM – 7:30 PM',
  },
  3: { // Wednesday
    dayNameEs: 'Miércoles',
    dayNameEn: 'Wednesday',
    openHour: 7,
    openMinute: 0,
    closeHour: 19,
    closeMinute: 30,
    formattedEs: '7:00 AM – 7:30 PM',
    formattedEn: '7:00 AM – 7:30 PM',
  },
  4: { // Thursday
    dayNameEs: 'Jueves',
    dayNameEn: 'Thursday',
    openHour: 7,
    openMinute: 0,
    closeHour: 19,
    closeMinute: 30,
    formattedEs: '7:00 AM – 7:30 PM',
    formattedEn: '7:00 AM – 7:30 PM',
  },
  5: { // Friday
    dayNameEs: 'Viernes',
    dayNameEn: 'Friday',
    openHour: 7,
    openMinute: 0,
    closeHour: 19,
    closeMinute: 30,
    formattedEs: '7:00 AM – 7:30 PM',
    formattedEn: '7:00 AM – 7:30 PM',
  },
  6: { // Saturday
    dayNameEs: 'Sábado',
    dayNameEn: 'Saturday',
    openHour: 8,
    openMinute: 0,
    closeHour: 19,
    closeMinute: 30,
    formattedEs: '8:00 AM – 7:30 PM',
    formattedEn: '8:00 AM – 7:30 PM',
  },
};

export interface PanamaTimeStatus {
  panamaTimeString: string; // e.g. "2:34 PM"
  panamaDateString: string; // e.g. "Viernes, 2 de Octubre"
  isOpen: boolean;
  statusBadgeEs: string;
  statusBadgeEn: string;
  nextEventDescriptionEs: string;
  nextEventDescriptionEn: string;
  currentDayIndex: number;
}

export function getPanamaCurrentDate(): Date {
  // Convert current UTC time to America/Panama (UTC-5, without daylight saving)
  const now = new Date();
  const panamaString = now.toLocaleString('en-US', { timeZone: 'America/Panama' });
  return new Date(panamaString);
}

export function getPanamaStatus(): PanamaTimeStatus {
  const panamaDate = getPanamaCurrentDate();
  const dayIndex = panamaDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const hours = panamaDate.getHours();
  const minutes = panamaDate.getMinutes();
  const currentTotalMinutes = hours * 60 + minutes;

  const todaySchedule = PANAMA_WEEKLY_SCHEDULE[dayIndex];

  let isOpen = false;
  let statusBadgeEs = 'Cerrado';
  let statusBadgeEn = 'Closed';
  let nextEventDescriptionEs = '';
  let nextEventDescriptionEn = '';

  if (!todaySchedule.isClosedAllDay) {
    const openTotalMinutes = todaySchedule.openHour * 60 + todaySchedule.openMinute;
    const closeTotalMinutes = todaySchedule.closeHour * 60 + todaySchedule.closeMinute;

    if (currentTotalMinutes >= openTotalMinutes && currentTotalMinutes < closeTotalMinutes) {
      isOpen = true;
      const minutesRemaining = closeTotalMinutes - currentTotalMinutes;
      const closingTimeStr = todaySchedule.closeHour > 12 
        ? `${todaySchedule.closeHour - 12}:${todaySchedule.closeMinute.toString().padStart(2, '0')} PM`
        : `${todaySchedule.closeHour}:${todaySchedule.closeMinute.toString().padStart(2, '0')} AM`;

      statusBadgeEs = 'Abierto Ahora';
      statusBadgeEn = 'Open Now';

      if (minutesRemaining <= 60) {
        nextEventDescriptionEs = `Cierra pronto (${minutesRemaining} min) · Cierre a las ${closingTimeStr}`;
        nextEventDescriptionEn = `Closing soon (${minutesRemaining}m) · Closes at ${closingTimeStr}`;
      } else {
        nextEventDescriptionEs = `Hoy abierto hasta las ${closingTimeStr}`;
        nextEventDescriptionEn = `Open today until ${closingTimeStr}`;
      }
    } else if (currentTotalMinutes < openTotalMinutes) {
      // Before opening today
      const openTimeStr = `${todaySchedule.openHour}:${todaySchedule.openMinute.toString().padStart(2, '0')} AM`;
      statusBadgeEs = 'Cerrado en este momento';
      statusBadgeEn = 'Currently Closed';
      nextEventDescriptionEs = `Abre hoy a las ${openTimeStr} (Hora de Panamá)`;
      nextEventDescriptionEn = `Opens today at ${openTimeStr} (Panama Time)`;
    } else {
      // After closing today, find next opening day
      statusBadgeEs = 'Cerrado por hoy';
      statusBadgeEn = 'Closed for the day';
      const nextDay = (dayIndex + 1) % 7;
      const nextSchedule = PANAMA_WEEKLY_SCHEDULE[nextDay];
      if (nextSchedule.isClosedAllDay) {
        nextEventDescriptionEs = `Lunes cerrado por tueste · Reabre el Martes 7:00 AM`;
        nextEventDescriptionEn = `Monday closed for roasting · Reopens Tuesday 7:00 AM`;
      } else {
        nextEventDescriptionEs = `Reabre mañana a las ${nextSchedule.openHour}:00 AM`;
        nextEventDescriptionEn = `Reopens tomorrow at ${nextSchedule.openHour}:00 AM`;
      }
    }
  } else {
    // Monday
    statusBadgeEs = 'Cerrado por Tueste';
    statusBadgeEn = 'Closed for Roasting';
    nextEventDescriptionEs = 'Hoy lunes: Tueste artesanal in-house · Abre Martes 7:00 AM';
    nextEventDescriptionEn = 'Monday: In-house artisanal roasting · Opens Tuesday 7:00 AM';
  }

  // Format 12-hour time string
  const displayHours = hours % 12 || 12;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const panamaTimeString = `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;

  const monthNamesEs = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const monthNamesEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const dayNameEs = todaySchedule.dayNameEs;
  const dayNameEn = todaySchedule.dayNameEn;
  const dateNum = panamaDate.getDate();
  const panamaDateString = `${dayNameEs}, ${dateNum} de ${monthNamesEs[panamaDate.getMonth()]}`;

  return {
    panamaTimeString,
    panamaDateString,
    isOpen,
    statusBadgeEs,
    statusBadgeEn,
    nextEventDescriptionEs,
    nextEventDescriptionEn,
    currentDayIndex: dayIndex,
  };
}

export function usePanamaTime() {
  const [status, setStatus] = useState<PanamaTimeStatus>(getPanamaStatus);

  useEffect(() => {
    // Update every 10 seconds for real-time responsiveness
    const timer = setInterval(() => {
      setStatus(getPanamaStatus());
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return status;
}
