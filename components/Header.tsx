"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingBag, Menu, X, Heart, User } from "lucide-react"
import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { t, type Locale } from "@/lib/i18n"

interface HeaderProps {
  locale: Locale
}

export function Header({ locale }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background shadow-sm border-b border-border">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="hidden md:flex justify-between items-center py-2 text-sm text-muted-foreground border-b border-border">
          <div>{locale === "ar" ? "شحن مجاني للطلبات أكثر من $100" : "Free shipping on orders over $100"}</div>
          <div className="flex space-x-4">
            <Link href="/track-order" className="hover:text-foreground">
              {locale === "ar" ? "تتبع الطلب" : "Track Order"}
            </Link>
            <Link href="/help" className="hover:text-foreground">
              {locale === "ar" ? "مساعدة" : "Help"}
            </Link>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-foreground">
            {locale === "ar" ? "إليفا" : "Eleva"}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8" dir={locale === "ar" ? "rtl" : "ltr"}>
            <Link href="/women" className="text-muted-foreground hover:text-foreground font-medium">
              {t("nav.women", locale)}
            </Link>
            <Link href="/men" className="text-muted-foreground hover:text-foreground font-medium">
              {t("nav.men", locale)}
            </Link>
            <Link href="/unisex" className="text-muted-foreground hover:text-foreground font-medium">
              {t("nav.unisex", locale)}
            </Link>
            <Link href="/brands" className="text-muted-foreground hover:text-foreground font-medium">
              {t("nav.brands", locale)}
            </Link>
            <Link href="/sale" className="text-destructive hover:text-destructive/80 font-medium">
              {t("nav.sale", locale)}
            </Link>
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex items-center bg-muted rounded-full px-4 py-2">
              <Search className="h-4 w-4 text-muted-foreground mr-2" />
              <Input
                type="text"
                placeholder={t("nav.search", locale)}
                className="bg-transparent border-0 outline-none text-sm w-48 shadow-none focus-visible:ring-0"
              />
            </div>

            {/* Language Toggle */}
            <Link
              href={locale === "ar" ? "/" : "/?lang=ar"}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {locale === "ar" ? "EN" : "عربي"}
            </Link>

            {/* Action buttons */}
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
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
          <div className="lg:hidden border-t border-border py-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center bg-muted rounded-full px-4 py-2 mb-4">
                <Search className="h-4 w-4 text-muted-foreground mr-2" />
                <Input
                  type="text"
                  placeholder={t("nav.search", locale)}
                  className="bg-transparent border-0 outline-none text-sm flex-1 shadow-none focus-visible:ring-0"
                />
              </div>
              <Link href="/women" className="text-muted-foreground hover:text-foreground font-medium">
                {t("nav.women", locale)}
              </Link>
              <Link href="/men" className="text-muted-foreground hover:text-foreground font-medium">
                {t("nav.men", locale)}
              </Link>
              <Link href="/unisex" className="text-muted-foreground hover:text-foreground font-medium">
                {t("nav.unisex", locale)}
              </Link>
              <Link href="/brands" className="text-muted-foreground hover:text-foreground font-medium">
                {t("nav.brands", locale)}
              </Link>
              <Link href="/sale" className="text-destructive hover:text-destructive/80 font-medium">
                {t("nav.sale", locale)}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
