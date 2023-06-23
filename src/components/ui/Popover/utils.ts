import {
  MAX_NUMBER_CHARACTERS_MONTH,
  months,
  MAXIMAL_MONTH,
  MINIMAL_MONTH,
  MINIMAL_YEAR,
} from "@/Core/Domain/dateDomain";

export const increaseMonth = (actualMonth: number): number =>
  actualMonth === MAXIMAL_MONTH ? 0 : actualMonth + 1;

export const decreaseMonth = (actualMonth: number): number =>
  actualMonth === MINIMAL_MONTH ? 11 : actualMonth - 1;

export const isValidYear = (year: number): boolean => year >= MINIMAL_YEAR;

export const decreaseYear = (actualYear: number): number =>
  isValidYear(actualYear - 1) ? actualYear - 1 : MINIMAL_YEAR;

export const getShorteningVersion = (month: string): string =>
  month.substring(0, MAX_NUMBER_CHARACTERS_MONTH);

export const sanitizingYear = (year: string): string =>
  year.replace(/[^0-9]*|[0-9]+$/g, "");

export const sanitizingMonth = (year: string): string =>
  year.replace(/[^a-zA-Z]*|[a-zA-Z]+$/g, "");

export const findClosestMatchWordWithMonth = (month: string): number => {
  const monthsArray = Object.values(months);
  const arrOfMatch = monthsArray.findIndex(
    (el) => el.toLowerCase().includes(month) || el.includes(month)
  );
  return arrOfMatch;
};
