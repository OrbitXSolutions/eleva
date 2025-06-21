import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    id: 1,
    name: "Women",
    description: "Elegant & Feminine",
    image: "/placeholder.svg?height=300&width=300",
    href: "/women",
  },
  {
    id: 2,
    name: "Men",
    description: "Bold & Masculine",
    image: "/placeholder.svg?height=300&width=300",
    href: "/men",
  },
  {
    id: 3,
    name: "Unisex",
    description: "For Everyone",
    image: "/placeholder.svg?height=300&width=300",
    href: "/unisex",
  },
  {
    id: 4,
    name: "Luxury",
    description: "Premium Collection",
    image: "/placeholder.svg?height=300&width=300",
    href: "/luxury",
  },
]

export default function Categories() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Shop by Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Discover fragrances tailored to your style and personality</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group relative overflow-hidden rounded-2xl bg-gray-100 aspect-square hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                <p className="text-sm opacity-90">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
