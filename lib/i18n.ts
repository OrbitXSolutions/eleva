export type Locale = "en" | "ar"

export const defaultLocale: Locale = "en"

export const locales: Locale[] = ["en", "ar"]

export function getLocaleFromSearchParams(searchParams: URLSearchParams): Locale {
  const lang = searchParams.get("lang")
  return lang === "ar" ? "ar" : "en"
}

export const translations = {
  en: {
    // Navigation
    "nav.women": "Women",
    "nav.men": "Men",
    "nav.unisex": "Unisex",
    "nav.brands": "Brands",
    "nav.sale": "Sale",
    "nav.search": "Search perfumes...",

    // Hero
    "hero.title": "Discover Your Perfect Scent",
    "hero.subtitle": "Explore our curated collection of premium fragrances from the world's most prestigious brands.",
    "hero.cta.shop": "Shop Now",
    "hero.cta.explore": "Explore Collections",

    // Categories
    "categories.title": "Shop by Categories",
    "categories.subtitle": "Discover fragrances tailored to your style and personality",
    "categories.women": "Women",
    "categories.men": "Men",
    "categories.unisex": "Unisex",
    "categories.luxury": "Luxury",

    // Products
    "products.new": "New",
    "products.sale": "Sale",
    "products.addToCart": "Add to Cart",
    "products.viewAll": "View All Products",

    // Features
    "features.title": "Why Choose Us",
    "features.fastDelivery": "Fast Delivery",
    "features.returns": "14-Day Returns",
    "features.authentic": "Authentic Products",
    "features.support": "24/7 Support",

    // Contact
    "contact.title": "Get in Touch",
    "contact.firstName": "First Name",
    "contact.lastName": "Last Name",
    "contact.email": "Email",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.send": "Send Message",

    // Footer
    "footer.newsletter": "Newsletter",
    "footer.subscribe": "Subscribe to get updates on new arrivals and exclusive offers.",
  },
  ar: {
    // Navigation
    "nav.women": "نساء",
    "nav.men": "رجال",
    "nav.unisex": "للجنسين",
    "nav.brands": "العلامات التجارية",
    "nav.sale": "تخفيضات",
    "nav.search": "البحث عن العطور...",

    // Hero
    "hero.title": "اكتشف عطرك المثالي",
    "hero.subtitle": "استكشف مجموعتنا المنتقاة من العطور الفاخرة من أرقى العلامات التجارية في العالم.",
    "hero.cta.shop": "تسوق الآن",
    "hero.cta.explore": "استكشف المجموعات",

    // Categories
    "categories.title": "تسوق حسب الفئات",
    "categories.subtitle": "اكتشف العطور المناسبة لأسلوبك وشخصيتك",
    "categories.women": "نساء",
    "categories.men": "رجال",
    "categories.unisex": "للجنسين",
    "categories.luxury": "فاخر",

    // Products
    "products.new": "جديد",
    "products.sale": "تخفيض",
    "products.addToCart": "أضف للسلة",
    "products.viewAll": "عرض جميع المنتجات",

    // Features
    "features.title": "لماذا تختارنا",
    "features.fastDelivery": "توصيل سريع",
    "features.returns": "إرجاع خلال 14 يوم",
    "features.authentic": "منتجات أصلية",
    "features.support": "دعم 24/7",

    // Contact
    "contact.title": "تواصل معنا",
    "contact.firstName": "الاسم الأول",
    "contact.lastName": "اسم العائلة",
    "contact.email": "البريد الإلكتروني",
    "contact.subject": "الموضوع",
    "contact.message": "الرسالة",
    "contact.send": "إرسال الرسالة",

    // Footer
    "footer.newsletter": "النشرة الإخبارية",
    "footer.subscribe": "اشترك للحصول على تحديثات حول الوصولات الجديدة والعروض الحصرية.",
  },
}

export function t(key: string, locale: Locale = "en"): string {
  return translations[locale][key as keyof (typeof translations)[typeof locale]] || key
}
