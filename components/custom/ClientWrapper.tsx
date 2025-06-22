"use client";

import type React from "react";
import { createContext, useContext } from "react";
import { useEffect } from "react";
import SupabaseProvider from "@/components/providers/SupabaseProvider";
import { CartProvider } from "@/components/providers/CartProvider";
import { FavoritesProvider } from "@/components/providers/FavoritesProvider";
import { Toaster } from "@/components/ui/sonner";

interface TranslationContextType {
  translations: Record<string, any>;
  locale: string;
  isRTL: boolean;
}

const TranslationContext = createContext<TranslationContextType | null>(null);

export function useTranslationContext() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error(
      "useTranslationContext must be used within a TranslationProvider"
    );
  }
  return context;
}

interface ClientWrapperProps {
  children: React.ReactNode;
  initialTranslations: Record<string, any>;
  initialLocale: string;
}

export default function ClientWrapper({
  children,
  initialTranslations,
  initialLocale,
}: ClientWrapperProps) {
  const isRTL = initialLocale === "ar";

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = initialLocale;
  }, [isRTL, initialLocale]);

  const contextValue: TranslationContextType = {
    translations: initialTranslations,
    locale: initialLocale,
    isRTL,
  };

  return (
    <SupabaseProvider>
      <CartProvider>
        <FavoritesProvider>
          <TranslationContext.Provider value={contextValue}>
            <div className={isRTL ? "rtl" : "ltr"}>
              {children}
              <Toaster />
            </div>
          </TranslationContext.Provider>
        </FavoritesProvider>
      </CartProvider>
    </SupabaseProvider>
  );
}
