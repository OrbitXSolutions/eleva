import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import ClientWrapper from "@/components/custom/ClientWrapper";
import {
  getProductBySlug,
  getProductReviews,
} from "@/lib/common/supabase-queries";
import {
  getLocaleFromSearchParams,
  getLocaleFromRequest,
  isRTLLocale,
  getTranslations,
} from "@/lib/common/translations";
import { createSsrClient } from "@/lib/supabase/server";
import { Header } from "@radix-ui/react-accordion";
import { Footer } from "react-day-picker";
import ProductDetailsClient from "./ProductDetailsClient";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const searchParamsObj = new URLSearchParams(
    (await searchParams) as Record<string, string>
  );
  const localeFromParams = await getLocaleFromSearchParams(searchParamsObj);
  const locale =
    localeFromParams !== "en" ? localeFromParams : getLocaleFromRequest();

  // Get product for metadata
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  const productName =
    locale === "ar" ? product.name_ar || product.name_en : product.name_en;
  const productDescription =
    locale === "ar"
      ? product.description_ar || product.description_en
      : product.description_en;

  const title = `${productName} - Eleva`;
  const description =
    productDescription ||
    `Discover ${productName} - Premium fragrance available at Eleva`;

  return {
    title,
    description,
    keywords: product.keywords || "perfume, fragrance, luxury",
    openGraph: {
      title,
      description,
      type: "product",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      images: product.primary_image
        ? [
            {
              url: product.primary_image,
              width: 800,
              height: 800,
              alt: productName || "Product Image",
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: product.primary_image ? [product.primary_image] : undefined,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `/products/${slug}?lang=${locale}`,
      languages: {
        en: `/products/${slug}?lang=en`,
        ar: `/products/${slug}?lang=ar`,
      },
    },
  } as any;
}

export default async function ProductDetailsPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const searchParamsObj = new URLSearchParams(
    (await searchParams) as Record<string, string>
  );
  const localeFromParams = getLocaleFromSearchParams(searchParamsObj);
  const locale =
    localeFromParams !== "en" ? localeFromParams : await getLocaleFromRequest();
  const isRTL = isRTLLocale(locale);
  const translations = await getTranslations(locale);

  // Get user for personalized data
  const supabase = await createSsrClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch product and reviews
  const [product, reviews] = await Promise.all([
    getProductBySlug(slug, user?.user_metadata?.user_id),
    getProductBySlug(slug).then((p) => (p ? getProductReviews(p.id, 10) : [])),
  ]);

  if (!product) {
    notFound();
  }

  return <ProductDetailsClient product={product} reviews={reviews} />;
}
