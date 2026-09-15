import { describe, it, expect } from "vitest";
import {
  MAJOR_SYSTEM_MAPPINGS,
  normalizeAnswer,
  validateMajorDigit,
} from "../src/domain/majorSystem";

describe("Major System Domain Mappings", () => {
  it("covers all 10 digits strictly 0 through 9", () => {
    expect(MAJOR_SYSTEM_MAPPINGS.length).toBe(10);
    const digits = MAJOR_SYSTEM_MAPPINGS.map((m) => m.digit).sort();
    expect(digits).toEqual(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
  });

  it("normalizes diverse user inputs cleanly", () => {
    expect(normalizeAnswer("  SH  ")).toBe("sh");
    expect(normalizeAnswer("soft-g")).toBe("soft-g");
    expect(normalizeAnswer(" T! ")).toBe("t");
    expect(normalizeAnswer("CH.")).toBe("ch");
  });

  it("validates digit 6 cluster accurately", () => {
    expect(validateMajorDigit("6", "sh")).toBe(true);
    expect(validateMajorDigit("6", "CH")).toBe(true);
    expect(validateMajorDigit("6", "j")).toBe(true);
    expect(validateMajorDigit("6", "soft g")).toBe(true);
    expect(validateMajorDigit("6", "k")).toBe(false);
  });

  it("validates digit 1 sounds", () => {
    expect(validateMajorDigit("1", "t")).toBe(true);
    expect(validateMajorDigit("1", "D")).toBe(true);
    expect(validateMajorDigit("1", "th")).toBe(true);
    expect(validateMajorDigit("1", "m")).toBe(false);
  });

  it("rejects invalid or unknown digits gracefully", () => {
    expect(validateMajorDigit("99", "p")).toBe(false);
    expect(validateMajorDigit("1", "")).toBe(false);
    expect(validateMajorDigit("1", "   ")).toBe(false);
  });
});

