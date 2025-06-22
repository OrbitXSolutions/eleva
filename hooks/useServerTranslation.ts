"use client";

import { useTranslationContext } from "@/components/custom/ClientWrapper";

type TranslationKey = string;

export function useServerTranslation() {
  const { translations, locale, isRTL } = useTranslationContext();

  const t = (key: TranslationKey): string => {
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

  return { t, locale, isRTL, isLoading: false };
}
