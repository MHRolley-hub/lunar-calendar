import { lunarNewYearDates } from '../data/vietnameseHolidays';

export interface LunarDate {
  year: number;
  month: number;
  day: number;
}

export interface MoonPhaseInfo {
  name: string;
  description: string;
  illumination: number;
  phase: number;
}

/**
 * Convert solar (Gregorian) date to Vietnamese lunar date
 */
export function solarToLunar(solarDate: Date): LunarDate {
  const year = solarDate.getFullYear();
  let lunarNewYear = lunarNewYearDates[year];
  let lunarYear = year;

  if (solarDate < lunarNewYear) {
    lunarNewYear = lunarNewYearDates[year - 1];
    lunarYear = year - 1;
  }

  const daysDiff = Math.floor(
    (solarDate.getTime() - lunarNewYear.getTime()) / (1000 * 60 * 60 * 24)
  );
  let daysCount = daysDiff;
  let lunarMonth = 1;

  while (daysCount >= 29) {
    const monthLength = lunarMonth % 2 === 1 ? 30 : 29;
    if (daysCount >= monthLength) {
      daysCount -= monthLength;
      lunarMonth++;
    } else {
      break;
    }
  }

  const lunarDay = daysCount + 1;

  return {
    year: lunarYear,
    month: Math.max(1, Math.min(12, lunarMonth)),
    day: Math.max(1, Math.min(30, Math.floor(lunarDay))),
  };
}

/**
 * Calculate moon phase for a given date
 */
export function calculateMoonPhase(date: Date): number {
  const knownNewMoon = new Date('2000-01-06T18:14:00Z');
  const lunarCycle = 29.530588853;
  const daysSinceKnownNew =
    (date.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  const currentCycle = daysSinceKnownNew % lunarCycle;
  return currentCycle / lunarCycle;
}

/**
 * Get detailed moon phase information
 */
export function getPhaseInfo(phase: number): MoonPhaseInfo {
  const illumination = Math.abs(Math.cos(phase * 2 * Math.PI));
  let phaseName: string;
  let description: string;

  if (phase < 0.03 || phase > 0.97) {
    phaseName = 'New Moon';
    description = 'The moon is not visible';
  } else if (phase < 0.22) {
    phaseName = 'Waxing Crescent';
    description = 'Growing larger';
  } else if (phase < 0.28) {
    phaseName = 'First Quarter';
    description = 'Half illuminated';
  } else if (phase < 0.47) {
    phaseName = 'Waxing Gibbous';
    description = 'Still growing';
  } else if (phase < 0.53) {
    phaseName = 'Full Moon';
    description = 'Fully illuminated';
  } else if (phase < 0.72) {
    phaseName = 'Waning Gibbous';
    description = 'Shrinking';
  } else if (phase < 0.78) {
    phaseName = 'Last Quarter';
    description = 'Half illuminated';
  } else {
    phaseName = 'Waning Crescent';
    description = 'Shrinking';
  }

  return {
    name: phaseName,
    description,
    illumination: Math.round(illumination * 100),
    phase,
  };
}

/**
 * Get moon emoji based on phase
 */
export function getMoonEmoji(phase: number): string {
  if (phase < 0.03 || phase > 0.97) return '🌑'; // New Moon
  if (phase < 0.22) return '🌒'; // Waxing Crescent
  if (phase < 0.28) return '🌓'; // First Quarter
  if (phase < 0.47) return '🌔'; // Waxing Gibbous
  if (phase < 0.53) return '🌕'; // Full Moon
  if (phase < 0.72) return '🌖'; // Waning Gibbous
  if (phase < 0.78) return '🌗'; // Last Quarter
  return '🌘'; // Waning Crescent
}

/**
 * Format lunar date as string
 */
export function formatLunarDate(lunar: LunarDate): string {
  return `Month ${lunar.month}, Day ${lunar.day}, Year ${lunar.year}`;
}

/**
 * Get short lunar date (for widgets)
 */
export function formatLunarDateShort(lunar: LunarDate): string {
  return `${lunar.month}/${lunar.day}`;
}

/**
 * Check if a lunar date is a special day
 */
export function isSpecialLunarDay(lunarDay: number): {
  isSpecial: boolean;
  type?: 'first-day' | 'full-moon' | 'month-end';
} {
  if (lunarDay === 1) {
    return { isSpecial: true, type: 'first-day' };
  } else if (lunarDay === 15) {
    return { isSpecial: true, type: 'full-moon' };
  } else if (lunarDay >= 29) {
    return { isSpecial: true, type: 'month-end' };
  }
  return { isSpecial: false };
}
