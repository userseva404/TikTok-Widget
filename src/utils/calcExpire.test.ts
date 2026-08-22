import { afterEach, describe, expect, test, vi } from "vitest";
import { calcExpire } from "./calcExpire";

describe("calcExpire", () => {
  test("returns an ISO string N seconds in the future", () => {
    const startPoint = 100;
    const date = new Date(startPoint);
    vi.setSystemTime(date);
    expect(calcExpire(86400)).toBe(
      new Date(startPoint + 86400 * 1000).toISOString(),
    );
  });
  test("throws when expires_in is negative", () => {
    const startPoint = 100;
    const date = new Date(startPoint);
    vi.setSystemTime(date);
    expect(() => calcExpire(-10)).toThrow(Error);
  });
  test("Check if 0 is valid", () => {
    const startPoint = 100;
    const date = new Date(startPoint);
    vi.setSystemTime(date);
    expect(calcExpire(0)).toBe(new Date(startPoint + 0 * 1000).toISOString());
  });
  afterEach(() => {
    vi.useRealTimers();
  });
});
