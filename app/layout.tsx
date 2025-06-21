import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { headers } from "next/headers"
import type { Locale } from "@/lib/i18n"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const locale = (headersList.get("x-locale") as Locale) || "en"

  const isArabic = locale === "ar"

  return {
    title: {
      default: isArabic ? "إليفا - عطور فاخرة لكل مناسبة" : "Eleva Store - Premium Fragrances for Every Occasion",
      template: isArabic ? "%s | إليفا" : "%s | Eleva Store",
    },
    description: isArabic
      ? "اكتشف مجموعتنا الرائعة من العطور الفاخرة. توصيل سريع، إرجاع خلال 14 يوم، وعطور أصلية من أفضل العلامات التجارية."
      : "Discover our exquisite collection of premium perfumes. Fast delivery, 14-day returns, and authentic fragrances from top brands.",
    keywords: isArabic
      ? ["عطور", "عطور فاخرة", "عطور نسائية", "عطور رجالية", "كولونيا", "أو دو بارفان"]
      : ["perfumes", "fragrances", "luxury perfumes", "designer perfumes", "cologne", "eau de parfum"],
    authors: [{ name: "Eleva Store" }],
    creator: "Eleva Store",
    publisher: "Eleva Store",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL("https://eleva-store.com"),
    alternates: {
      canonical: "/",
      languages: {
        en: "/",
        ar: "/?lang=ar",
      },
    },
    openGraph: {
      title: isArabic ? "إليفا - عطور فاخرة لكل مناسبة" : "Eleva Store - Premium Fragrances for Every Occasion",
      description: isArabic
        ? "اكتشف مجموعتنا الرائعة من العطور الفاخرة"
        : "Discover our exquisite collection of premium perfumes",
      url: "https://eleva-store.com",
      siteName: "Eleva Store",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Eleva Store - Premium Fragrances",
        },
      ],
      locale: isArabic ? "ar_SA" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: isArabic ? "إليفا - عطور فاخرة" : "Eleva Store - Premium Fragrances",
      description: isArabic
        ? "اكتشف مجموعتنا الرائعة من العطور الفاخرة"
        : "Discover our exquisite collection of premium perfumes",
      images: ["/twitter-image.jpg"],
      creator: "@elevastore",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const locale = (headersList.get("x-locale") as Locale) || "en"

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#9333ea" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
