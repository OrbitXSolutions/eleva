// lib/translations.ts
/**
 * Universal, runtime-safe translations helper.
 *
 * • Works in both Server & Client components (no "fs" / Node-only APIs)
 * • Keeps the original public API so existing imports keep working
 *   - getTranslations()
 *   - createServerTranslator()
 *   - getServerTranslator()
 *   - getLocaleFromSearchParams()
 *   - getLocaleFromRequest()
 *   - isRTLLocale()
 *
 * The JSON dictionaries must live in `public/locales/{locale}.json`
 * (e.g. /public/locales/en.json, /public/locales/ar.json).
 */

type TranslationKey = string;
export type Translations = Record<string, any>;

const DICTIONARY_CACHE = new Map<string, Translations>();

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

async function fetchDictionary(locale: string): Promise<Translations | null> {
  try {
    const res = await fetch(`/locales/${locale}.json`, {
      cache: "force-cache",
    });
    if (!res.ok) throw new Error("fetch failed");
    return (await res.json()) as Translations;
  } catch {
    return null;
  }
}

async function loadDictionary(locale: string): Promise<Translations> {
  // Serve from cache first
  if (DICTIONARY_CACHE.has(locale)) return DICTIONARY_CACHE.get(locale)!;

  const dict =
    (await fetchDictionary(locale)) || (await fetchDictionary("en")) || {}; // final fallback

  DICTIONARY_CACHE.set(locale, dict);
  return dict;
}

export function isRTLLocale(locale: string): boolean {
  return locale === "ar";
}

/* ------------------------------------------------------------------ */
/* Public API (kept for compatibility with existing code)             */
/* ------------------------------------------------------------------ */

/**
 * Returns the full dictionary for the requested locale.
 * Falls back to English if the requested locale cannot be loaded.
 */
export async function getTranslations(locale = "en"): Promise<Translations> {
  return loadDictionary(locale);
}

/**
 * Factory that returns an (async) translator bound to a locale.
 */
export async function getServerTranslator(locale = "en") {
  const dict = await loadDictionary(locale);
  return createServerTranslator(dict);
}

/**
 * Create a translator given an already-loaded dictionary.
 */
export function createServerTranslator(dict: Translations) {
  return function t(key: TranslationKey): string {
    return (
      key
        .split(".")
        .reduce<any>((acc, part) => (acc ? acc[part] : undefined), dict) ?? key
    );
  };
}

/* ------------------------------------------------------------------ */
/* Locale utilities                                                   */
/* ------------------------------------------------------------------ */

/**
 * Extract `lang` from Next.js search params
 * (used by pages receiving `searchParams` prop).
 */
export function getLocaleFromSearchParams(
  searchParams: URLSearchParams
): string {
  return searchParams.get("lang") || "en";
}

/**
 * Get locale stored in the `preferred-language` cookie on the server.
 * Falls back to "en". On the client this always returns "en".
 */
export async function getLocaleFromRequest(): Promise<string> {
  // Client environment – we have no access to cookies()
  if (typeof window !== "undefined") return "en";

  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { cookies } =
      require("next/headers") as typeof import("next/headers");
    return (await cookies()).get("preferred-language")?.value || "en";
  } catch {
    return "en";
  }
}
