import { describe, expect, it } from "vitest";
import { localePath, resolveLocale, SUPPORTED_LEGAL_LOCALES } from "./localePath";

describe("resolveLocale", () => {
  it("returns the base language for supported locales", () => {
    expect(resolveLocale("es")).toBe("es");
    expect(resolveLocale("fr")).toBe("fr");
    expect(resolveLocale("ar")).toBe("ar");
  });

  it("strips the region tag (e.g. en-US → en)", () => {
    expect(resolveLocale("en-US")).toBe("en");
    expect(resolveLocale("pt-BR")).toBe("pt");
    expect(resolveLocale("zh-CN")).toBe("zh");
    expect(resolveLocale("zh-Hant-TW")).toBe("zh");
  });

  it("falls back to 'en' for unsupported locales", () => {
    expect(resolveLocale("ko")).toBe("en");
    expect(resolveLocale("hi")).toBe("en");
    expect(resolveLocale("tr-TR")).toBe("en");
  });

  it("falls back to 'en' for undefined / empty input", () => {
    expect(resolveLocale(undefined)).toBe("en");
    expect(resolveLocale("")).toBe("en");
  });
});

describe("localePath", () => {
  it("returns the root /legal path for English", () => {
    expect(localePath("en", "01-Terms-of-Service"))
      .toBe("/legal/01-Terms-of-Service.pdf");
  });

  it("returns the locale-prefixed path for non-English", () => {
    expect(localePath("fr", "02-Privacy-Policy"))
      .toBe("/legal/fr/02-Privacy-Policy.pdf");
    expect(localePath("ar", "10-Safety-Transparency-Center"))
      .toBe("/legal/ar/10-Safety-Transparency-Center.pdf");
  });

  it("works for every supported locale", () => {
    for (const locale of SUPPORTED_LEGAL_LOCALES) {
      const path = localePath(locale, "03-Cookie-Notice");
      if (locale === "en") {
        expect(path).toBe("/legal/03-Cookie-Notice.pdf");
      } else {
        expect(path).toBe(`/legal/${locale}/03-Cookie-Notice.pdf`);
      }
    }
  });
});

describe("integration: resolveLocale + localePath", () => {
  it("Brazilian visitor (pt-BR) → Portuguese PDF path", () => {
    const locale = resolveLocale("pt-BR");
    expect(localePath(locale, "02-Privacy-Policy"))
      .toBe("/legal/pt/02-Privacy-Policy.pdf");
  });

  it("Korean visitor (ko) → English fallback path", () => {
    const locale = resolveLocale("ko");
    expect(localePath(locale, "01-Terms-of-Service"))
      .toBe("/legal/01-Terms-of-Service.pdf");
  });

  it("Saudi visitor (ar-SA) → Arabic PDF path", () => {
    const locale = resolveLocale("ar-SA");
    expect(localePath(locale, "10-Safety-Transparency-Center"))
      .toBe("/legal/ar/10-Safety-Transparency-Center.pdf");
  });
});
