"use client";

import { Button } from "@/components/ui/button";
import { useServerTranslation } from "@/hooks/useServerTranslation";
import { ProductWithUserData } from "@/lib/types/database.types";
import ProductCard from "./ProductCard";

interface NewArrivalsClientProps {
  products: ProductWithUserData[];
}

export default function NewArrivalsClient({
  products,
}: NewArrivalsClientProps) {
  const { t } = useServerTranslation();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t("newArrivals.title")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("newArrivals.description")}
          </p>
        </div>

        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showNewBadge={true}
                />
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                className="border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                {t("newArrivals.viewAll")}
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {t("newArrivals.noProducts")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
