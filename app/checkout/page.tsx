import type { Metadata } from "next"
import { Suspense } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import ClientWrapper from "../components/ClientWrapper"
import CheckoutPageClient from "./CheckoutPageClient"
import { getTranslations, getLocaleFromSearchParams, isRTLLocale, getLocaleFromRequest } from "@/lib/translations"
import { createSsrClient } from "@/utils/supabase/server"
import { getUserAddresses, getUAEStates } from "@/lib/checkout"

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams
  const searchParamsObj = new URLSearchParams(params as Record<string, string>)
  const localeFromParams = getLocaleFromSearchParams(searchParamsObj)
  const locale = localeFromParams !== "en" ? localeFromParams : getLocaleFromRequest()

  const title = locale === "ar" ? "إتمام الطلب - إليفا" : "Checkout - Eleva"
  const description =
    locale === "ar"
      ? "أكمل طلبك وأدخل تفاصيل الشحن والدفع"
      : "Complete your order and enter shipping and payment details"

  return {
    title,
    description,
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default async function CheckoutPage({ searchParams }: PageProps) {
  const params = await searchParams
  const searchParamsObj = new URLSearchParams(params as Record<string, string>)
  const localeFromParams = getLocaleFromSearchParams(searchParamsObj)
  const locale = localeFromParams !== "en" ? localeFromParams : getLocaleFromRequest()
  const isRTL = isRTLLocale(locale)
  const translations = await getTranslations(locale)

  // Get user and addresses
  const supabase = await createSsrClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const [userAddresses, uaeStates] = await Promise.all([user ? getUserAddresses(user.id) : [], getUAEStates()])

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"}>
      <body>
        <ClientWrapper initialTranslations={translations} initialLocale={locale}>
          <main className="min-h-screen">
            <Suspense fallback={<div>Loading...</div>}>
              <Header />
              <CheckoutPageClient user={user} userAddresses={userAddresses} uaeStates={uaeStates} />
              <Footer />
            </Suspense>
          </main>
        </ClientWrapper>
      </body>
    </html>
  )
}
