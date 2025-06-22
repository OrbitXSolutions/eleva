"use client";

import { Button } from "@/components/ui/button";
import { useServerTranslation } from "@/hooks/useServerTranslation";
import { getImageUrl } from "@/lib/common/supabase-storage";
import SafeImage from "../custom/safe-image";

export default function Banner() {
  const { t, isRTL } = useServerTranslation();

  // Banner image path - you can store this in your database or use static paths
  const bannerImagePath = "banners/summer-sale-collection.jpg";
  const bannerImageUrl = getImageUrl(bannerImagePath);

  const handleBannerImageError = (error: string, src: string) => {
    console.warn("Banner image failed to load:", { error, src });
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl overflow-hidden">
          <div className="grid lg:grid-cols-2 items-center">
            {/* Content */}
            <div className="p-8 lg:p-16 text-white">
              <div className="space-y-6">
                <div className="inline-block bg-white bg-opacity-20 rounded-full px-4 py-2 text-sm font-medium">
                  {t("banner.limitedOffer")}
                </div>
                <h2 className="text-3xl lg:text-5xl font-bold leading-tight">
                  {t("banner.title")}
                  <span className="block">{t("banner.subtitle")}</span>
                </h2>
                <p className="text-lg opacity-90 max-w-md">
                  {t("banner.description")}
                </p>
                <div
                  className={`flex flex-col sm:flex-row gap-4 ${
                    isRTL ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  <Button
                    size="lg"
                    className="bg-white text-purple-600 hover:bg-gray-100"
                  >
                    {t("banner.shopSale")}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-purple-600"
                  >
                    {t("banner.viewDeals")}
                  </Button>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-64 lg:h-96">
              <SafeImage
                src={bannerImageUrl}
                alt="Summer Sale Collection"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                fallbackType="banner"
                context="Banner promotional image"
                onImageError={handleBannerImageError}
              />
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
        </div>
      </div>
    </section>
  );
}
