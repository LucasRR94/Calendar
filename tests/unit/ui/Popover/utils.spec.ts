import {
  increaseMonth,
  decreaseMonth,
  isValidYear,
  decreaseYear,
  getShorteningVersion,
  sanitizingYear,
  sanitizingMonth,
  findClosestMatchWordWithMonth,
} from "../../../../src/components/ui/Popover/utils";

describe("increaseMonth", () => {
  it("correctly increase when is smallest than the max value month", () => {
    const currentMonth = 1;
    expect(increaseMonth(currentMonth)).toBe(2);
  });

  it("correctly do not increase month when is equal to max value month", () => {
    const currentMonth = 11;
    expect(increaseMonth(currentMonth)).toBe(0);
  });
});

describe("decreaseMonth", () => {
  it("correctly decrease when is bigger than minimal limit", () => {
    const currentMonth = 1;
    expect(decreaseMonth(currentMonth)).toBe(0);
  });

  it("correctly do not decrease when is equals to minimal limit", () => {
    const currentMonth = 0;
    expect(decreaseMonth(currentMonth)).toBe(11);
  });
});

describe("isValidYear", () => {
  it("correctly validate when is bigger than minimal limit", () => {
    const currentYear = 1970;
    expect(isValidYear(currentYear)).toBeTruthy();
  });

  it("correctly do not validate when is smaller than inferior limit", () => {
    const currentYear = 1969;
    expect(isValidYear(currentYear)).toBeFalsy();
  });
});

describe("decreaseYear", () => {
  it("correctly decrease year when is bigger than minimal limit", () => {
    const currentYear = 1971;
    expect(decreaseYear(currentYear)).toEqual(1970);
  });

  it("correctly do not decrease when is smaller than inferior limit", () => {
    const currentYear = 1969;
    expect(decreaseYear(currentYear)).toEqual(1970);
  });
});

describe("getShorteningVersion", () => {
  it("correctly shorts a word bigger than the limit", () => {
    const word = "test phrase";
    expect(getShorteningVersion(word)).toEqual("tes");
  });

  it("correctly do not shorts the phrase once it already in the size", () => {
    const word = "tes";
    expect(getShorteningVersion(word)).toEqual("tes");
  });
});

describe("sanitizingYear", () => {
  it("correctly removes other characters with exception of numbers, when a number at middle of the phrase", () => {
    const phrase =
      "1ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()-_=+[]{}|;:',.<>/?`~ ";
    expect(sanitizingYear(phrase)).toEqual("1");
  });

  it("correctly removes other characters with exception of numbers, when a number at start of the phrase", () => {
    const phrase =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijk1lmnopqrstuvwxyz!@#$%^&*()-_=+[]{}|;:',.<>/?`~ ";
    expect(sanitizingYear(phrase)).toEqual("1");
  });

  it("correctly removes other characters with exception of numbers, when a number at end of the phrase", () => {
    const phrase =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()-_=+[]{}|;:',.<>/?`~ 1";
    expect(sanitizingYear(phrase)).toEqual("1");
  });

  it("correctly do not sanitizes the phrase once it respect only numbers", () => {
    const phrase = "123456890";
    expect(sanitizingYear(phrase)).toEqual(phrase);
  });
});

describe("sanitizingMonth", () => {
  it("correctly removes other characters with exception of letters, when a letter at middle of the phrase", () => {
    const phrase = "a1234567890!@#$%^&*()-_=+[]{}|;:',.<>/?`~ ";
    expect(sanitizingMonth(phrase)).toEqual("a");
  });

  it("correctly removes other characters with exception of letters, when a letter at start of the phrase", () => {
    const phrase = "1234567890!@#$%^&*()a-_=+[]{}|;:',.<>/?`~ ";
    expect(sanitizingMonth(phrase)).toEqual("a");
  });

  it("correctly removes other characters with exception of letters, when a letter at end of the phrase", () => {
    const phrase = "1234567890!@#$%^&*()-_=+[]{}|;:',.<>/?`~ a";
    expect(sanitizingMonth(phrase)).toEqual("a");
  });

  it("correctly do not sanitize the phrase once it respect only letters", () => {
    const phrase = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    expect(sanitizingMonth(phrase)).toEqual(phrase);
  });
});

describe("findClosestMatchWordWithMonth", () => {
  it("correctly returns a month more close to the match in lower case, when exacly match", () => {
    const typedAnswer = "june";
    expect(findClosestMatchWordWithMonth(typedAnswer)).toEqual(5);
  });

  it("correctly returns a month more close to the match in upper case, when exacly match", () => {
    const typedAnswer = "june".toUpperCase();
    expect(findClosestMatchWordWithMonth(typedAnswer)).toEqual(5);
  });

  it("correctly returns a month more close to the match in lower case and partially", () => {
    const typedAnswer = "jun";
    expect(findClosestMatchWordWithMonth(typedAnswer)).toEqual(5);
  });

  it("correctly returns a month more close to the match in upper case and partially", () => {
    const typedAnswer = "jun".toUpperCase();
    expect(findClosestMatchWordWithMonth(typedAnswer)).toEqual(5);
  });

  it("correctly the first month found when substring have more than one match", () => {
    const typedAnswer = "ju".toUpperCase();
    expect(findClosestMatchWordWithMonth(typedAnswer)).toEqual(5);
  });

  it("correctly returns an number when out of month options", () => {
    const typedAnswer = "strangeAnswer".toUpperCase();
    expect(findClosestMatchWordWithMonth(typedAnswer)).toEqual(-1);
  });
});
