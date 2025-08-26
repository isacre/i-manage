import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { Cookie, calcWeekDayDiff } from "./index"

describe("Cookie Utils", () => {
  let mockDocument: any

  beforeEach(() => {
    mockDocument = {
      cookie: "test=value; other=123; session=abc123",
    }

    Object.defineProperty(global, "document", {
      value: mockDocument,
      writable: true,
    })

    Object.defineProperty(global, "window", {
      value: {},
      writable: true,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe("Cookie.get", () => {
    it("should get cookie value by name", () => {
      const value = Cookie.get("test")
      expect(value).toBe("value")
    })

    it("should get cookie value by name when multiple cookies exist", () => {
      const value = Cookie.get("other")
      expect(value).toBe("123")
    })

    it("should return undefined for non-existent cookie", () => {
      const value = Cookie.get("nonexistent")
      expect(value).toBeUndefined()
    })

    it("should handle cookies with special characters", () => {
      mockDocument.cookie = "test=value%20with%20spaces; other=123"
      const value = Cookie.get("test")
      expect(value).toBe("value%20with%20spaces")
    })

    it("should return undefined when window is not defined", () => {
      Object.defineProperty(global, "window", {
        value: undefined,
        writable: true,
      })

      const value = Cookie.get("test")
      expect(value).toBeUndefined()
    })
  })

  describe("Cookie.set", () => {
    it("should set cookie with correct attributes", () => {
      const setCookieSpy = vi.spyOn(document, "cookie", "set")

      Cookie.set("newCookie", "newValue")

      expect(setCookieSpy).toHaveBeenCalledWith("newCookie=newValue; path=/; secure; max-age=3600")
    })

    it("should not set cookie when window is not defined", () => {
      Object.defineProperty(global, "window", {
        value: undefined,
        writable: true,
      })

      const setCookieSpy = vi.spyOn(document, "cookie", "set")

      Cookie.set("newCookie", "newValue")

      expect(setCookieSpy).not.toHaveBeenCalled()
    })
  })

  describe("Cookie.delete", () => {
    it("should delete cookie by setting max-age to 0", () => {
      const setCookieSpy = vi.spyOn(document, "cookie", "set")

      Cookie.delete("test")

      expect(setCookieSpy).toHaveBeenCalledWith("test=; path=/; secure; max-age=0")
    })

    it("should not delete cookie when window is not defined", () => {
      Object.defineProperty(global, "window", {
        value: undefined,
        writable: true,
      })

      const setCookieSpy = vi.spyOn(document, "cookie", "set")

      Cookie.delete("test")

      expect(setCookieSpy).not.toHaveBeenCalled()
    })
  })
})

describe("calcWeekDayDiff", () => {
  it("should return 0 when today is a work day", () => {
    const diff = calcWeekDayDiff(1, [1, 2, 3, 4, 5]) // Tuesday, work days Mon-Fri
    expect(diff).toBe(0)
  })

  it("should calculate correct days until next work day from weekend", () => {
    const diff = calcWeekDayDiff(0, [1, 2, 3, 4, 5]) // Sunday, work days Mon-Fri
    expect(diff).toBe(1) // 1 day until Monday
  })

  it("should calculate correct days until next work day from Saturday", () => {
    const diff = calcWeekDayDiff(6, [1, 2, 3, 4, 5]) // Saturday, work days Mon-Fri
    expect(diff).toBe(1) // 1 day until Monday (Sunday is 0, Monday is 1)
  })

  it("should handle work days that include weekend", () => {
    const diff = calcWeekDayDiff(5, [1, 2, 3, 4, 5, 6]) // Friday, work days Mon-Sat
    expect(diff).toBe(0) // Friday is a work day
  })

  it("should handle work days that start mid-week", () => {
    const diff = calcWeekDayDiff(1, [3, 4, 5]) // Tuesday, work days Wed-Fri
    expect(diff).toBe(2) // 2 days until Wednesday (Tuesday is 1, Wednesday is 3)
  })

  it("should handle edge case when today is last day of week", () => {
    const diff = calcWeekDayDiff(6, [1, 2, 3]) // Saturday, work days Mon-Wed
    expect(diff).toBe(1) // 1 day until Monday (Saturday is 6, Sunday is 0, Monday is 1)
  })

  it("should handle single work day", () => {
    const diff = calcWeekDayDiff(2, [4]) // Wednesday, work day is Thursday
    expect(diff).toBe(2) // 2 days until Thursday (Wednesday is 2, Thursday is 4)
  })
})
