import {
  isOnCurrentMonth,
  formatYearAndMonthRespectingMinimalMaximal,
  getYearAndMonthAccordingToBellongMonthSet,
  validateYear,
  months,
} from "@/Core/Domain/dateDomain";
import { BellongMonth } from "generate-month-structure";
describe("isOnCurrentMonth", () => {
  it("correctly returns true when current month is inserted", () => {
    expect(isOnCurrentMonth(BellongMonth.current)).toBe(true);
  });

  it("correctly returns false when previous month is inserted", () => {
    expect(isOnCurrentMonth(BellongMonth.previous)).toBe(false);
  });

  it("correctly returns false when next month is inserted", () => {
    expect(isOnCurrentMonth(BellongMonth.next)).toBe(false);
  });
});

describe("formatYearAndMonthRespectingMinimalMaximal", () => {
  it("correctly decrease year when month bigger than the allow interval", () => {
    expect(formatYearAndMonthRespectingMinimalMaximal(2000, -1)).toEqual({
      year: 1999,
      month: 11,
    });
  });

  it("correctly decrease year when month smallest than the allow interval", () => {
    expect(formatYearAndMonthRespectingMinimalMaximal(2000, 12)).toEqual({
      year: 2001,
      month: 0,
    });
  });
});

describe("getYearAndMonthAccordingToBellongMonthSet", () => {
  it("correctly adjust month when next and is inside the allow interval", () => {
    expect(
      getYearAndMonthAccordingToBellongMonthSet(1999, 0, BellongMonth.next)
    ).toStrictEqual({ year: 1999, month: 1 });
  });

  it("correctly adjust month when next and is outside the allow interval", () => {
    expect(
      getYearAndMonthAccordingToBellongMonthSet(1999, 11, BellongMonth.next)
    ).toStrictEqual({ year: 2000, month: 0 });
  });

  it("correctly adjust month when previous and is inside the allow interval", () => {
    expect(
      getYearAndMonthAccordingToBellongMonthSet(1999, 1, BellongMonth.previous)
    ).toStrictEqual({ year: 1999, month: 0 });
  });

  it("correctly adjust month when previous and is outside the allow interval", () => {
    expect(
      getYearAndMonthAccordingToBellongMonthSet(2000, 0, BellongMonth.previous)
    ).toStrictEqual({ year: 1999, month: 11 });
  });
});

describe("validateYear", () => {
  it("correctly return true the year inside range", () => {
    expect(validateYear(2000)).toBeTruthy();
  });

  it("correctly return false the year inside range", () => {
    expect(validateYear(1969)).toBeFalsy();
  });
});

describe("months", () => {
  it("correctly returns all the months mapped", () => {
    const monthsStructure = months;
    expect(monthsStructure[0]).toBe("JANUARY");
    expect(monthsStructure[1]).toBe("FEBRUARY");
    expect(monthsStructure[2]).toBe("MARCH");
    expect(monthsStructure[3]).toBe("APRIL");
    expect(monthsStructure[4]).toBe("MAY");
    expect(monthsStructure[5]).toBe("JUNE");
    expect(monthsStructure[6]).toBe("JULY");
    expect(monthsStructure[7]).toBe("AUGUST");
    expect(monthsStructure[8]).toBe("SEPTEMBER");
    expect(monthsStructure[9]).toBe("OCTOBER");
    expect(monthsStructure[10]).toBe("NOVEMBER");
    expect(monthsStructure[11]).toBe("DECEMBER");
  });
});
