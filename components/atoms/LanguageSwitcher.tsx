"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null

  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null
  return null
}

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get current language from URL params or cookies
  const localeFromParams = searchParams.get("lang")
  const localeFromCookie = getCookie("preferred-language")
  const currentLang = localeFromParams || localeFromCookie || "en"

  const toggleLanguage = () => {
    const newLang = currentLang === "en" ? "ar" : "en"
    const params = new URLSearchParams(searchParams.toString())
    params.set("lang", newLang)

    const queryString = params.toString()
    const newUrl = `${pathname}?${queryString}`

    // Use replace to avoid adding to history
    router.replace(newUrl)
  }

  return (
    <Button variant="ghost" size="sm" onClick={toggleLanguage} className="hidden md:flex items-center space-x-2">
      <Globe className="h-4 w-4" />
      <span>{currentLang === "en" ? "العربية" : "English"}</span>
    </Button>
  )
}
