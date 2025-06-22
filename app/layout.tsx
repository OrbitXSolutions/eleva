import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/custom/ClientWrapper";
import { Suspense } from "react";
import Header from "@/components/atoms/Header";
import Footer from "@/components/atoms/Footer";
import {
  getLocaleFromRequest,
  getLocaleFromSearchParams,
  getTranslations,
  isRTLLocale,
} from "@/lib/common/translations";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Eleva - Premium Fragrances for Every Occasion",
    template: "%s | Eleva",
  },
  description:
    "Discover our exquisite collection of premium perfumes. Fast delivery, 14-day returns, and authentic fragrances from top brands.",
  keywords: [
    "perfumes",
    "fragrances",
    "luxury perfumes",
    "designer perfumes",
    "cologne",
    "eau de parfum",
    "beauty",
    "cosmetics",
  ],
  authors: [{ name: "Eleva" }],
  creator: "Eleva",
  publisher: "Eleva",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://eleva.com"),
  alternates: {
    canonical: "/",
    languages: {
      en: "/?lang=en",
      ar: "/?lang=ar",
    },
  },
  openGraph: {
    title: "Eleva - Premium Fragrances for Every Occasion",
    description:
      "Discover our exquisite collection of premium perfumes. Fast delivery, 14-day returns, and authentic fragrances from top brands.",
    url: "https://eleva.com",
    siteName: "Eleva",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Eleva - Premium Fragrances",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eleva - Premium Fragrances",
    description: "Discover our exquisite collection of premium perfumes",
    images: ["/twitter-image.jpg"],
    creator: "@eleva",
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
  verification: {
    google: "your-google-verification-code",
  },
  generator: "v0.dev",
};
interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  children: React.ReactNode;
}
export default async function RootLayout({
  children,
  searchParams,
}: Readonly<Props>) {
  const params = await searchParams;
  const searchParamsObj = new URLSearchParams(params as Record<string, string>);
  const localeFromParams = getLocaleFromSearchParams(searchParamsObj);
  const locale =
    localeFromParams !== "en" ? localeFromParams : await getLocaleFromRequest();
  const isRTL = isRTLLocale(locale);
  const translations = await getTranslations(locale);
  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClientWrapper
            initialTranslations={translations}
            initialLocale={locale}
          >
            <main className="min-h-screen">
              <Suspense fallback={<div>Loading...</div>}>
                <Header />
                {children}
                <Footer />
              </Suspense>
            </main>
          </ClientWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
