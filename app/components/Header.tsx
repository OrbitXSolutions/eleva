"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingBag, Menu, X, Heart, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="hidden md:flex justify-between items-center py-2 text-sm text-gray-600 border-b">
          <div>Free shipping on orders over $100</div>
          <div className="flex space-x-4">
            <Link href="/track-order" className="hover:text-gray-900">
              Track Order
            </Link>
            <Link href="/help" className="hover:text-gray-900">
              Help
            </Link>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Luxe Perfumes
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <Link href="/women" className="text-gray-700 hover:text-gray-900 font-medium">
              Women
            </Link>
            <Link href="/men" className="text-gray-700 hover:text-gray-900 font-medium">
              Men
            </Link>
            <Link href="/unisex" className="text-gray-700 hover:text-gray-900 font-medium">
              Unisex
            </Link>
            <Link href="/brands" className="text-gray-700 hover:text-gray-900 font-medium">
              Brands
            </Link>
            <Link href="/sale" className="text-red-600 hover:text-red-700 font-medium">
              Sale
            </Link>
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2">
              <Search className="h-4 w-4 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search perfumes..."
                className="bg-transparent outline-none text-sm w-48"
              />
            </div>

            {/* Action buttons */}
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </Button>

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t py-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 mb-4">
                <Search className="h-4 w-4 text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search perfumes..."
                  className="bg-transparent outline-none text-sm flex-1"
                />
              </div>
              <Link href="/women" className="text-gray-700 hover:text-gray-900 font-medium">
                Women
              </Link>
              <Link href="/men" className="text-gray-700 hover:text-gray-900 font-medium">
                Men
              </Link>
              <Link href="/unisex" className="text-gray-700 hover:text-gray-900 font-medium">
                Unisex
              </Link>
              <Link href="/brands" className="text-gray-700 hover:text-gray-900 font-medium">
                Brands
              </Link>
              <Link href="/sale" className="text-red-600 hover:text-red-700 font-medium">
                Sale
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
