import {
  MINIMAL_YEAR,
  MINIMAL_MONTH,
  MAXIMAL_MONTH,
} from "../../../Core/Domain/dateDomain";

export const validateMonth = (month: number): boolean =>
  month >= MINIMAL_MONTH && month <= MAXIMAL_MONTH;

export const validateYear = (year: number): boolean => year >= MINIMAL_YEAR;
