"use client"

import Link from "next/link"
import { Sparkles, Crown, Users, Gem, Leaf, Star, TreePine, Flower } from "lucide-react"
import { useServerTranslation } from "@/hooks/useServerTranslation"

const categoryIcons = [
  { key: "women", icon: Sparkles, href: "/women" },
  { key: "men", icon: Crown, href: "/men" },
  { key: "unisex", icon: Users, href: "/unisex" },
  { key: "luxury", icon: Gem, href: "/luxury" },
  { key: "fresh", icon: Leaf, href: "/fresh" },
  { key: "oriental", icon: Star, href: "/oriental" },
  { key: "woody", icon: TreePine, href: "/woody" },
  { key: "floral", icon: Flower, href: "/floral" },
]

export default function Categories() {
  const { t } = useServerTranslation()

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t("categories.title")}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("categories.description")}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {categoryIcons.map((category) => {
            const Icon = category.icon
            return (
              <Link
                key={category.key}
                href={category.href}
                className="group flex flex-col items-center text-center hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-4 group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300">
                  <Icon className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{t(`categories.items.${category.key}`)}</h3>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
