import { BellongMonth } from "generate-month-structure";

export const MINIMAL_YEAR: number = 1970;

export const MINIMAL_MONTH: number = 0;

export const MAXIMAL_MONTH: number = 11;

export const MAX_NUMBER_CHARACTERS_MONTH: number = 3;

export const isOnCurrentMonth = (bellongMonth: string) =>
  bellongMonth === BellongMonth.current;

export const formatYearAndMonthRespectingMinimalMaximal = (
  currentYear: number,
  currentMonth: number
) => {
  if (currentMonth < MINIMAL_MONTH) {
    return { year: (currentYear -= 1), month: MAXIMAL_MONTH };
  }
  return { year: (currentYear += 1), month: MINIMAL_MONTH };
};

export const getYearAndMonthAccordingToBellongMonthSet = (
  currentYear: number,
  currentMonth: number,
  bellongMonth: string
) => {
  const currentAdjust = bellongMonth === BellongMonth.previous ? -1 : +1;
  const newMonth = currentAdjust + currentMonth;
  if (newMonth <= MAXIMAL_MONTH && newMonth >= MINIMAL_MONTH) {
    return { year: currentYear, month: newMonth };
  }
  return formatYearAndMonthRespectingMinimalMaximal(currentYear, newMonth);
};
export const validateYear = (year: number) => year > MINIMAL_YEAR;

export const months: Record<string, string> = {
  "0": "JANUARY",
  "1": "FEBRUARY",
  "2": "MARCH",
  "3": "APRIL",
  "4": "MAY",
  "5": "JUNE",
  "6": "JULY",
  "7": "AUGUST",
  "8": "SEPTEMBER",
  "9": "OCTOBER",
  "10": "NOVEMBER",
  "11": "DECEMBER",
};
