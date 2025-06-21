"use client"

import Image from "next/image"
import { Button } from "@/components/Button"
import { t, type Locale } from "@/lib/i18n"
import { motion } from "motion/react"

interface HeroProps {
  locale: Locale
}

export function Hero({ locale }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-r from-pink-50 to-purple-50 overflow-hidden">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center" dir={locale === "ar" ? "rtl" : "ltr"}>
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: locale === "ar" ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                {locale === "ar" ? (
                  <>
                    اكتشف عطرك
                    <span className="text-primary block">المثالي</span>
                  </>
                ) : (
                  <>
                    Discover Your
                    <span className="text-primary block">Perfect Scent</span>
                  </>
                )}
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">{t("hero.subtitle", locale)}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="px-8">
                {t("hero.cta.shop", locale)}
              </Button>
              <Button variant="outline" size="lg">
                {t("hero.cta.explore", locale)}
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8">
              <div>
                <div className="text-2xl font-bold text-foreground">500+</div>
                <div className="text-sm text-muted-foreground">
                  {locale === "ar" ? "علامة تجارية فاخرة" : "Premium Brands"}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">{locale === "ar" ? "عميل سعيد" : "Happy Customers"}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">
                  {locale === "ar" ? "دعم العملاء" : "Customer Support"}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: locale === "ar" ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10">
              <Image
                src="/placeholder.svg?height=600&width=500"
                alt="Luxury perfume collection"
                width={500}
                height={600}
                className="rounded-2xl shadow-2xl"
                priority
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/20 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-secondary/20 rounded-full opacity-20 blur-3xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
