"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
  showBackButton?: boolean
}

export default function AuthLayout({ children, title, subtitle, showBackButton = true }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-primary/20 via-primary/10 to-background">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
        <Image
          src="/placeholder.svg?height=800&width=600"
          alt="Luxury perfumes collection"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 flex flex-col justify-end p-12 text-white">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight">
              Discover Your
              <br />
              Perfect Fragrance
            </h1>
            <p className="text-lg text-white/90 max-w-md">
              Join thousands of fragrance enthusiasts who trust Eleva Store for premium, authentic perfumes from around
              the world.
            </p>
            <div className="flex items-center space-x-4 text-sm text-white/80">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span>Authentic Products</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 bg-background">
        <div className="w-full max-w-md mx-auto">
          {showBackButton && (
            <div className="mb-8">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          )}

          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6">
              <Image src="/placeholder-logo.svg" alt="Eleva Store" width={120} height={40} className="mx-auto" />
            </Link>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}
