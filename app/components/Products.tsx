import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingBag, Star } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Eternal Elegance",
    brand: "Prestige",
    price: 95.99,
    originalPrice: 120.99,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.9,
    reviews: 234,
    isOnSale: true,
  },
  {
    id: 2,
    name: "Wild Orchid",
    brand: "Floral Dreams",
    price: 78.99,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.7,
    reviews: 189,
    isOnSale: false,
  },
  {
    id: 3,
    name: "Mystic Woods",
    brand: "Nature's Essence",
    price: 85.99,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.8,
    reviews: 156,
    isOnSale: false,
  },
  {
    id: 4,
    name: "Royal Oud",
    brand: "Arabian Nights",
    price: 150.99,
    originalPrice: 180.99,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.9,
    reviews: 298,
    isOnSale: true,
  },
  {
    id: 5,
    name: "Fresh Citrus",
    brand: "Sunny Days",
    price: 55.99,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.5,
    reviews: 145,
    isOnSale: false,
  },
  {
    id: 6,
    name: "Black Diamond",
    brand: "Luxury Line",
    price: 199.99,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.9,
    reviews: 412,
    isOnSale: false,
  },
]

export default function Products() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Handpicked fragrances from our premium collection</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.isOnSale && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Sale
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
                  <h3 className="font-semibold text-gray-900 text-lg">{product.name}</h3>
                </div>

                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900">${product.price}</span>
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
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}
