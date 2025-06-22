import type { Metadata } from "next"
import { Suspense } from "react"
import { notFound } from "next/navigation"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import ClientWrapper from "../../components/ClientWrapper"
import SupabaseProvider from "@/components/providers/SupabaseProvider"
import { CartProvider } from "@/components/providers/CartProvider"
import { FavoritesProvider } from "@/components/providers/FavoritesProvider"
import { Toaster } from "@/components/ui/sonner"
import ProductDetailsClient from "./ProductDetailsClient"
import { getTranslations, getLocaleFromSearchParams, isRTLLocale, getLocaleFromRequest } from "@/lib/translations"
import { createSsrClient } from "@/utils/supabase/server"
import { getProductBySlug, getProductReviews } from "@/lib/supabase-queries"
import { getProductImageUrl } from "@/lib/supabase-storage"

interface PageProps {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slug } = params
  const localeFromParams = getLocaleFromSearchParams(searchParams)
  const locale = localeFromParams || getLocaleFromRequest()

  const product = await getProductBySlug(slug)

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    }
  }

  const metaTitle =
    locale === "ar" ? product.meta_title_ar || product.name_ar : product.meta_title_en || product.name_en
  const metaDescription =
    locale === "ar"
      ? product.meta_description_ar || product.description_ar
      : product.meta_description_en || product.description_en

  const metaBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://eleva.com"

  let imageUrl = `${metaBaseUrl}/og-image.jpg`
  if (product.meta_thumbnail) {
    imageUrl = getProductImageUrl(product.meta_thumbnail)
  } else if (product.primary_image) {
    imageUrl = getProductImageUrl(product.primary_image)
  }

  const images = [
    {
      url: imageUrl,
      width: 1200,
      height: 630,
      alt: metaTitle || "Product Image",
    },
  ]

  return {
    title: metaTitle || "Eleva Product",
    description: metaDescription || `Discover our premium product ${metaTitle}`,
    keywords: product.keywords || ["perfume", "fragrance", "luxury", metaTitle].join(", "),
    alternates: {
      canonical: `/products/${slug}${locale !== "en" ? `?lang=${locale}` : ""}`,
      languages: {
        "en-US": `/products/${slug}?lang=en`,
        "ar-SA": `/products/${slug}?lang=ar`,
        "x-default": `/products/${slug}?lang=en`,
      },
    },
    openGraph: {
      title: metaTitle || "Eleva Product",
      description: metaDescription || `Discover our premium product ${metaTitle}`,
      url: `/products/${slug}${locale !== "en" ? `?lang=${locale}` : ""}`,
      type: "product",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      images: images,
      ...(product.price && {
        product: {
          price: {
            amount: product.price.toString(),
            currency: product.currency?.code || "USD",
          },
          availability: product.quantity && product.quantity > 0 ? "instock" : "oos",
        },
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle || "Eleva Product",
      description: metaDescription || `Discover our premium product ${metaTitle}`,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function ProductDetailsPage({ params, searchParams }: PageProps) {
  const { slug } = params
  const localeFromParams = getLocaleFromSearchParams(searchParams)
  const locale = localeFromParams || getLocaleFromRequest()
  const isRTL = isRTLLocale(locale)
  const translations = await getTranslations(locale)

  const supabase = await createSsrClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const [product, reviews] = await Promise.all([
    getProductBySlug(slug, user?.id),
    getProductBySlug(slug).then((p) => (p ? getProductReviews(p.id, 10) : [])),
  ])

  if (!product) {
    notFound()
  }

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"}>
      <head>
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_SUPABASE_URL} />
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_SUPABASE_URL} />
      </head>
      <body>
        <SupabaseProvider>
          <CartProvider>
            <FavoritesProvider>
              <ClientWrapper initialTranslations={translations} initialLocale={locale}>
                <main className="min-h-screen bg-background">
                  <Suspense
                    fallback={
                      <div className="flex justify-center items-center h-screen">Loading product details...</div>
                    }
                  >
                    <Header />
                    <ProductDetailsClient product={product} reviews={reviews} />
                    <Footer />
                  </Suspense>
                </main>
                <Toaster richColors position={isRTL ? "top-left" : "top-right"} closeButton />
              </ClientWrapper>
            </FavoritesProvider>
          </CartProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
