import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Banner() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl overflow-hidden">
          <div className="grid lg:grid-cols-2 items-center">
            {/* Content */}
            <div className="p-8 lg:p-16 text-white">
              <div className="space-y-6">
                <div className="inline-block bg-white bg-opacity-20 rounded-full px-4 py-2 text-sm font-medium">
                  Limited Time Offer
                </div>
                <h2 className="text-3xl lg:text-5xl font-bold leading-tight">
                  Summer Sale
                  <span className="block">Up to 40% Off</span>
                </h2>
                <p className="text-lg opacity-90 max-w-md">
                  Discover amazing deals on your favorite fragrances. Limited time only!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                    Shop Sale Now
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-purple-600"
                  >
                    View All Deals
                  </Button>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-64 lg:h-96">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Summer Sale Collection"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
        </div>
      </div>
    </section>
  )
}
