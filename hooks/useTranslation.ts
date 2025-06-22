"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

type TranslationKey = string
type Translations = Record<string, any>

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null

  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null
  return null
}

function setCookie(name: string, value: string, days = 365) {
  if (typeof document === "undefined") return

  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
}

export function useTranslation() {
  const [translations, setTranslations] = useState<Translations>({})
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()

  // Get locale from URL params, cookies, or default to English
  const localeFromParams = searchParams.get("lang")
  const localeFromCookie = getCookie("preferred-language")
  const locale = localeFromParams || localeFromCookie || "en"
  const isRTL = locale === "ar"

  useEffect(() => {
    // Save locale to cookie if it came from URL params
    if (localeFromParams && localeFromParams !== localeFromCookie) {
      setCookie("preferred-language", localeFromParams)
    }
  }, [localeFromParams, localeFromCookie])

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/locales/${locale}.json`)
        const data = await response.json()
        setTranslations(data)
      } catch (error) {
        console.error("Failed to load translations:", error)
        // Fallback to English
        if (locale !== "en") {
          try {
            const fallbackResponse = await fetch("/locales/en.json")
            const fallbackData = await fallbackResponse.json()
            setTranslations(fallbackData)
          } catch (fallbackError) {
            console.error("Failed to load fallback translations:", fallbackError)
            setTranslations({})
          }
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadTranslations()
  }, [locale])

  const t = (key: TranslationKey): string => {
    const keys = key.split(".")
    let value = translations

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        return key // Return key if translation not found
      }
    }

    return typeof value === "string" ? value : key
  }

  return { t, locale, isRTL, isLoading }
}

// Server-side compatible translation hook
export function useServerTranslation(initialTranslations: Translations, initialLocale: string) {
  const [translations] = useState<Translations>(initialTranslations)
  const [locale] = useState(initialLocale)
  const isRTL = locale === "ar"

  const t = (key: TranslationKey): string => {
    const keys = key.split(".")
    let value = translations

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        return key // Return key if translation not found
      }
    }

    return typeof value === "string" ? value : key
  }

  return { t, locale, isRTL, isLoading: false }
}
