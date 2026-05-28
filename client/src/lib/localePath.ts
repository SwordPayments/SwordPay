export const SUPPORTED_LEGAL_LOCALES = new Set([
  "en", "es", "fr", "de", "pt", "ja", "zh", "ar",
]);

export function resolveLocale(lang: string | undefined): string {
  const base = (lang || "en").split("-")[0];
  return SUPPORTED_LEGAL_LOCALES.has(base) ? base : "en";
}

export function localePath(locale: string, slug: string): string {
  return locale === "en"
    ? `/legal/${slug}.pdf`
    : `/legal/${locale}/${slug}.pdf`;
}
