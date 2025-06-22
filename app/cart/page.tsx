import type { Metadata } from "next";
import { Suspense } from "react";

import CartPageClient from "./CartPageClient";
import ClientWrapper from "@/components/custom/ClientWrapper";
import {
  getLocaleFromSearchParams,
  getLocaleFromRequest,
  isRTLLocale,
  getTranslations,
} from "@/lib/common/translations";
import { Header } from "@radix-ui/react-accordion";
import { Footer } from "react-day-picker";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const searchParamsObj = new URLSearchParams(params as Record<string, string>);
  const localeFromParams = getLocaleFromSearchParams(searchParamsObj);
  const locale =
    localeFromParams !== "en" ? localeFromParams : getLocaleFromRequest();

  const title =
    locale === "ar" ? "سلة التسوق - إليفا" : "Shopping Cart - Eleva";
  const description =
    locale === "ar"
      ? "راجع عناصر سلة التسوق الخاصة بك وأكمل عملية الشراء"
      : "Review your cart items and complete your purchase";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "ar" ? "ar_SA" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `/cart?lang=${locale}`,
      languages: {
        en: "/cart?lang=en",
        ar: "/cart?lang=ar",
      },
    },
  };
}

export default async function CartPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const searchParamsObj = new URLSearchParams(params as Record<string, string>);
  const localeFromParams = getLocaleFromSearchParams(searchParamsObj);
  const locale =
    localeFromParams !== "en" ? localeFromParams : getLocaleFromRequest();

  return <CartPageClient />;
}
