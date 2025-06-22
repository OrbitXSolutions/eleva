import Banner from "@/components/atoms/Banner";
import Categories from "@/components/atoms/Categories";
import Features from "@/components/atoms/Features";
import Hero from "@/components/atoms/Hero";
import NewArrivals from "@/components/atoms/NewArrivals";
import Products from "@/components/atoms/Products";
import Reviews from "@/components/atoms/Reviews";
import {
  getLocaleFromSearchParams,
  getLocaleFromRequest,
  getTranslations,
} from "@/lib/common/translations";
import { Contact } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const params = await searchParams;
  const searchParamsObj = new URLSearchParams(params as Record<string, string>);
  const localeFromParams = getLocaleFromSearchParams(searchParamsObj);

  // Use locale from params if available, otherwise from cookies/headers
  const locale =
    localeFromParams !== "en" ? localeFromParams : await getLocaleFromRequest();
  const translations = await getTranslations(locale);

  const title =
    locale === "ar"
      ? "إليفا - عطور فاخرة لكل مناسبة"
      : "Eleva - Premium Fragrances for Every Occasion";
  const description =
    locale === "ar"
      ? "اكتشف مجموعتنا الرائعة من العطور الفاخرة. توصيل سريع، إرجاع خلال 14 يوم، وعطور أصلية من أفضل العلامات التجارية."
      : "Discover our exquisite collection of premium perfumes. Fast delivery, 14-day returns, and authentic fragrances from top brands.";

  return {
    title,
    description,
    keywords:
      locale === "ar"
        ? "عطور، عطور فاخرة، عطور مصممة، كولونيا، أو دو بارفان، جمال، مستحضرات تجميل"
        : "perfumes, fragrances, luxury perfumes, designer perfumes, cologne, eau de parfum, beauty, cosmetics",
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
      canonical: `/?lang=${locale}`,
      languages: {
        en: "/?lang=en",
        ar: "/?lang=ar",
      },
    },
  };
}

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <NewArrivals />
      <Banner />
      <Products />
      <Features />
      <Reviews />
      <Contact />
    </>
  );
}
