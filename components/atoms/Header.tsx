"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useServerTranslation } from "@/hooks/useServerTranslation";
import LanguageSwitcher from "./LanguageSwitcher";
import LoadingIndicator from "./LoadingIndicator";
import { useCart } from "@/components/providers/CartProvider";
import { usePathname } from "next/navigation";
import AuthButton from "./AuthButton";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, isRTL } = useServerTranslation();
  const { cart } = useCart();
  const pathname = usePathname();

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return (
        pathname === "/" ||
        (!pathname.includes("/products") &&
          !pathname.includes("/gifts") &&
          !pathname.includes("/about"))
      );
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="hidden md:flex justify-between items-center py-2 text-sm text-gray-600 border-b">
          <div>{t("header.topBar.freeShipping")}</div>
          <div className="flex gap-4">
            <Link href="/track-order" className="hover:text-gray-900">
              {t("header.topBar.trackOrder")}
            </Link>
            <Link href="/help" className="hover:text-gray-900">
              {t("header.topBar.help")}
            </Link>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900">
            {t("header.brand")}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-8">
            <Link
              href="/"
              className={`font-medium transition-colors flex items-center gap-2 ${
                isActiveLink("/")
                  ? "text-secondary border-b-2 border-secondary pb-1"
                  : "text-primary hover:text-gray-900"
              }`}
            >
              {t("header.nav.home")}
              <LoadingIndicator loaderClassName="text-secondary" />
            </Link>
            <Link
              href="/products"
              className={`font-medium transition-colors flex items-center gap-2 ${
                isActiveLink("/products")
                  ? "text-secondary border-b-2 border-secondary pb-1"
                  : "text-primary hover:text-gray-900"
              }`}
            >
              {t("header.nav.products")}
              <LoadingIndicator loaderClassName="text-secondary" />
            </Link>
            <Link
              href="/gifts"
              className={`font-medium transition-colors flex items-center gap-2 ${
                isActiveLink("/gifts")
                  ? "text-secondary border-b-2 border-secondary pb-1"
                  : "text-primary hover:text-gray-900"
              }`}
            >
              {t("header.nav.gifts")}
              <LoadingIndicator loaderClassName="text-secondary" />
            </Link>
            <Link
              href="/about"
              className={`font-medium transition-colors flex items-center gap-2 ${
                isActiveLink("/about")
                  ? "text-secondary border-b-2 border-secondary pb-1"
                  : "text-primary hover:text-gray-900"
              }`}
            >
              {t("header.nav.about")}
              <LoadingIndicator loaderClassName="text-secondary" />
            </Link>
          </nav>

          {/* Search and Actions */}
          <div
            className={`flex items-center space-x-4 ${
              isRTL ? "space-x-reverse" : ""
            }`}
          >
            {/* Search */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2">
              <Search
                className={`h-4 w-4 text-gray-500 ${isRTL ? "ml-2" : "mr-2"}`}
              />
              <input
                type="text"
                placeholder={t("header.search")}
                className="bg-transparent outline-none text-sm w-48"
                dir={isRTL ? "rtl" : "ltr"}
              />
            </div>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Action buttons */}
            <AuthButton />
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Heart className="h-5 w-5" />
            </Button>
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {cart.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.items.length}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t py-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 mb-4">
                <Search
                  className={`h-4 w-4 text-gray-500 ${isRTL ? "ml-2" : "mr-2"}`}
                />
                <input
                  type="text"
                  placeholder={t("header.search")}
                  className="bg-transparent outline-none text-sm flex-1"
                  dir={isRTL ? "rtl" : "ltr"}
                />
              </div>
              <Link
                href="/"
                className={`font-medium transition-colors flex items-center gap-2 ${
                  isActiveLink("/")
                    ? "text-secondary bg-purple-50 px-3 py-2 rounded-lg"
                    : "text-primary hover:text-gray-900"
                }`}
              >
                {t("header.nav.home")}
                <LoadingIndicator loaderClassName="text-secondary" />
              </Link>
              <Link
                href="/products"
                className={`font-medium transition-colors flex items-center gap-2 ${
                  isActiveLink("/products")
                    ? "text-secondary bg-purple-50 px-3 py-2 rounded-lg"
                    : "text-primary hover:text-gray-900"
                }`}
              >
                {t("header.nav.products")}
                <LoadingIndicator loaderClassName="text-secondary" />
              </Link>
              <Link
                href="/gifts"
                className={`font-medium transition-colors flex items-center gap-2 ${
                  isActiveLink("/gifts")
                    ? "text-secondary bg-purple-50 px-3 py-2 rounded-lg"
                    : "text-primary hover:text-gray-900"
                }`}
              >
                {t("header.nav.gifts")}
                <LoadingIndicator loaderClassName="text-secondary" />
              </Link>
              <Link
                href="/about"
                className={`font-medium transition-colors flex items-center gap-2 ${
                  isActiveLink("/about")
                    ? "text-secondary bg-purple-50 px-3 py-2 rounded-lg"
                    : "text-primary hover:text-gray-900"
                }`}
              >
                {t("header.nav.about")}
                <LoadingIndicator loaderClassName="text-secondary" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
