import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingBag } from "lucide-react"

const newArrivals = [
  {
    id: 1,
    name: "Midnight Rose",
    brand: "Luxe Collection",
    price: 89.99,
    originalPrice: 109.99,
    image: "/placeholder.svg?height=400&width=300",
    isNew: true,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Ocean Breeze",
    brand: "Fresh Scents",
    price: 65.99,
    image: "/placeholder.svg?height=400&width=300",
    isNew: true,
    rating: 4.6,
  },
  {
    id: 3,
    name: "Golden Amber",
    brand: "Premium Line",
    price: 125.99,
    image: "/placeholder.svg?height=400&width=300",
    isNew: true,
    rating: 4.9,
  },
  {
    id: 4,
    name: "Vanilla Dreams",
    brand: "Sweet Collection",
    price: 75.99,
    image: "/placeholder.svg?height=400&width=300",
    isNew: true,
    rating: 4.7,
  },
]

export default function NewArrivals() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">New Arrivals</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Be the first to experience our latest fragrance collections</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newArrivals.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.isNew && (
                  <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    New
                  </div>
                )}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" variant="secondary" className="rounded-full p-2">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-2">
                  <p className="text-sm text-gray-500">{product.brand}</p>
                  <h3 className="font-semibold text-gray-900">{product.name}</h3>
                </div>

                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">({product.rating})</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-purple-600 text-purple-600 hover:bg-purple-50">
            View All New Arrivals
          </Button>
        </div>
      </div>
    </section>
  )
}
