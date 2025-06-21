"use client"

import Image from "next/image"
import { Heart, ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/Button"
import { motion } from "motion/react"

interface ProductCardProps {
  id: number
  name: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  isOnSale?: boolean
  isNew?: boolean
  locale?: "en" | "ar"
}

export function ProductCard({
  id,
  name,
  brand,
  price,
  originalPrice,
  image,
  rating,
  reviews,
  isOnSale = false,
  isNew = false,
  locale = "en",
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group bg-card rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-border"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isNew && (
          <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
            {locale === "ar" ? "جديد" : "New"}
          </div>
        )}
        {isOnSale && (
          <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-medium">
            {locale === "ar" ? "تخفيض" : "Sale"}
          </div>
        )}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button size="sm" variant="secondary" className="rounded-full p-2">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button className="w-full">
            <ShoppingBag className="h-4 w-4 mr-2" />
            {locale === "ar" ? "أضف للسلة" : "Add to Cart"}
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-2">
          <p className="text-sm text-muted-foreground">{brand}</p>
          <h3 className="font-semibold text-foreground text-lg">{name}</h3>
        </div>

        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground ml-2">({reviews})</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-foreground">${price}</span>
            {originalPrice && <span className="text-sm text-muted-foreground line-through">${originalPrice}</span>}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
