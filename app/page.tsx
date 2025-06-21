import { headers } from "next/headers"
import { Header } from "@/app/components/Header"
import { Hero } from "@/app/components/Hero"
import { ProductCard } from "@/components/ProductCard"
import { ContactForm } from "@/components/ContactForm"
import { prisma } from "@/lib/prisma"
import { createClient } from "@/utils/supabase/server"
import type { Locale } from "@/lib/i18n"

// Mock data for demonstration
const mockProducts = [
  {
    id: 1,
    name: "Midnight Rose",
    brand: "Luxe Collection",
    price: 89.99,
    originalPrice: 109.99,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.8,
    reviews: 234,
    isNew: true,
  },
  {
    id: 2,
    name: "Ocean Breeze",
    brand: "Fresh Scents",
    price: 65.99,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.6,
    reviews: 189,
    isNew: true,
  },
  {
    id: 3,
    name: "Golden Amber",
    brand: "Premium Line",
    price: 125.99,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.9,
    reviews: 156,
    isNew: true,
  },
  {
    id: 4,
    name: "Vanilla Dreams",
    brand: "Sweet Collection",
    price: 75.99,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.7,
    reviews: 145,
    isNew: true,
  },
]

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function HomePage({ searchParams }: PageProps) {
  const headersList = await headers()
  const locale = (headersList.get("x-locale") as Locale) || "en"

  // Get user session
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Fetch products from database (fallback to mock data)
  let products = mockProducts
  try {
    const dbProducts = await prisma.product.findMany({
      where: { isDeleted: false },
      take: 8,
      orderBy: { createdAt: "desc" },
    })

    if (dbProducts.length > 0) {
      products = dbProducts.map((product) => ({
        id: Number(product.id),
        name: locale === "ar" ? product.nameAr || product.nameEn || "" : product.nameEn || "",
        brand: "Premium Brand", // You might want to add brand relation
        price: product.price || 0,
        originalPrice: product.oldPrice || undefined,
        image: product.primaryImage || "/placeholder.svg?height=400&width=300",
        rating: (product.totalRates || 0) / Math.max(Number(product.ratesCount) || 1, 1),
        reviews: Number(product.ratesCount) || 0,
        isNew: new Date(product.createdAt).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 days
      }))
    }
  } catch (error) {
    console.error("Error fetching products:", error)
    // Use mock data as fallback
  }

  return (
    <main className="min-h-screen" dir={locale === "ar" ? "rtl" : "ltr"}>
      <Header locale={locale} />
      <Hero locale={locale} />

      {/* New Arrivals Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {locale === "ar" ? "الوصولات الجديدة" : "New Arrivals"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {locale === "ar"
                ? "كن أول من يجرب مجموعات العطور الجديدة لدينا"
                : "Be the first to experience our latest fragrance collections"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {locale === "ar" ? "تواصل معنا" : "Get in Touch"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {locale === "ar"
                ? "هل لديك أسئلة حول عطورنا؟ نحن هنا لمساعدتك في العثور على عطرك المثالي."
                : "Have questions about our fragrances? We're here to help you find your perfect scent."}
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <ContactForm locale={locale} />
          </div>
        </div>
      </section>
    </main>
  )
}
