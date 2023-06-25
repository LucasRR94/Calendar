import {
  validateMonth,
  validateYear,
} from "@/components/ui/StructureOfMonth/utils";

describe("validateMonth", () => {
  it("correctly accept month", () => {
    expect(validateMonth(0)).toBeTruthy();
    expect(validateMonth(11)).toBeTruthy();
  });

  it("correctly reject malformed month", () => {
    expect(validateMonth(-1)).toBeFalsy();
    expect(validateMonth(12)).toBeFalsy();
  });
});

describe("validateYear", () => {
  it("correctly accept years", () => {
    expect(validateYear(1970)).toBeTruthy();
    expect(validateYear(2023)).toBeTruthy();
  });

  it("correctly reject malformed month", () => {
    expect(validateYear(197)).toBeFalsy();
    expect(validateYear(1969)).toBeFalsy();
  });
});
