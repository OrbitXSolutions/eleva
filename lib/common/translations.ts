import { headers, cookies } from "next/headers";
import { readFile } from "fs/promises";
import path from "path";

type TranslationKey = string;
type Translations = Record<string, any>;

const translationCache = new Map<string, Translations>();

export async function getTranslations(locale?: string): Promise<Translations> {
  // Get locale from parameter, headers, cookies, or default to English
  let finalLocale = locale;

  if (!finalLocale) {
    const headersList = await headers();
    finalLocale = headersList.get("x-language") || "en";
  }

  if (translationCache.has(finalLocale))
    return translationCache.get(finalLocale)!;

  const load = async (lang: string) => {
    const filePath = path.join(
      process.cwd(),
      "public",
      "locales",
      `${lang}.json`
    );
    const file = await readFile(filePath, "utf8");
    return JSON.parse(file) as Translations;
  };

  try {
    const data = await load(finalLocale);
    translationCache.set(finalLocale, data);
    return data;
  } catch {
    if (finalLocale !== "en") {
      try {
        const fallback = await load("en");
        translationCache.set(finalLocale, fallback);
        return fallback;
      } catch {
        return {};
      }
    }
    return {};
  }
}

export function createServerTranslator(translations: Translations) {
  return function t(key: TranslationKey): string {
    const keys = key.split(".");
    let value = translations;

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return typeof value === "string" ? value : key;
  };
}

export async function getServerTranslator(locale?: string) {
  const translations = await getTranslations(locale);
  return createServerTranslator(translations);
}

export function getLocaleFromSearchParams(
  searchParams: URLSearchParams
): string {
  return searchParams.get("lang") || "en";
}

export async function getLocaleFromRequest(): Promise<string> {
  // This function can be used in server components to get locale from cookies/headers
  try {
    const cookieStore = cookies();
    const langCookie = (await cookieStore).get("preferred-language");
    return langCookie?.value || "en";
  } catch {
    return "en";
  }
}

export function isRTLLocale(locale: string): boolean {
  return locale === "ar";
}
