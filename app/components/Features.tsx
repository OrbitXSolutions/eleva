import { Truck, RotateCcw, Shield, Headphones, Award, Sparkles } from "lucide-react"

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Free shipping on orders over $50. Express delivery available.",
  },
  {
    icon: RotateCcw,
    title: "14-Day Returns",
    description: "Easy returns within 14 days. No questions asked.",
  },
  {
    icon: Shield,
    title: "Authentic Products",
    description: "100% genuine fragrances from authorized distributors.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer service for all your needs.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Curated selection of the finest fragrances worldwide.",
  },
  {
    icon: Sparkles,
    title: "Gift Wrapping",
    description: "Complimentary luxury gift wrapping for special occasions.",
  },
]

export default function Features() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're committed to providing you with the best fragrance shopping experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 rounded-full p-3 mr-4">
                    <Icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
