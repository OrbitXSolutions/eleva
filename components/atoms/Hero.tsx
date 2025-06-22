"use client";

import { Button } from "@/components/ui/button";
import { useServerTranslation } from "@/hooks/useServerTranslation";
import { getImageUrl } from "@/lib/common/supabase-storage";
import SafeImage from "../custom/safe-image";

export default function Hero() {
  const { t, isRTL } = useServerTranslation();

  // You can store the hero image path in your database or use a static path
  const heroImagePath = "hero/luxury-perfume-collection.jpg";
  const heroImageUrl = getImageUrl(heroImagePath);

  const handleHeroImageError = (error: string, src: string) => {
    console.warn("Hero image failed to load:", { error, src });
  };

  return (
    <section className="relative bg-gradient-to-r from-pink-50 to-purple-50 overflow-hidden">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {t("hero.title")}
                <span className="text-secondary block">
                  {t("hero.titleHighlight")}
                </span>
              </h1>
              <p className="text-lg text-gray-600 max-w-lg">
                {t("hero.description")}
              </p>
            </div>

            <div
              className={`flex flex-col sm:flex-row gap-4 ${
                isRTL ? "sm:flex-row-reverse" : ""
              }`}
            >
              <Button
                size="lg"
                className="bg-secondary hover:bg-purple-700 text-white px-8"
              >
                {t("hero.shopNow")}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-secondary text-secondary hover:bg-purple-50"
              >
                {t("hero.exploreCollections")}
              </Button>
            </div>

            {/* Stats */}
            <div
              className={`flex gap-8 pt-8 ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <div>
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">
                  {t("hero.stats.brands")}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">
                  {t("hero.stats.customers")}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">
                  {t("hero.stats.support")}
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10 flex justify-center">
              <SafeImage
                src={heroImageUrl}
                alt="Luxury perfume collection"
                width={500}
                height={600}
                className="rounded-2xl shadow-2xl object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                fallbackType="hero"
                context="Hero section main image"
                onImageError={handleHeroImageError}
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-pink-200 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
