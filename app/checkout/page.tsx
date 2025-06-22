import ClientWrapper from "@/components/custom/ClientWrapper";
import { getUserAddresses, getUAEStates } from "@/lib/common/checkout";
import {
  getLocaleFromSearchParams,
  getLocaleFromRequest,
  isRTLLocale,
  getTranslations,
} from "@/lib/common/translations";
import { createSsrClient } from "@/lib/supabase/server";
import { Header } from "@radix-ui/react-accordion";
import { Metadata } from "next";
import { Suspense } from "react";
import { Footer } from "react-day-picker";
import CheckoutPageClient from "./CheckoutPageClient";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const searchParamsObj = new URLSearchParams(params as Record<string, string>);
  const localeFromParams = getLocaleFromSearchParams(searchParamsObj);
  const locale =
    localeFromParams !== "en" ? localeFromParams : await getLocaleFromRequest();

  const title = locale === "ar" ? "إتمام الطلب - إليفا" : "Checkout - Eleva";
  const description =
    locale === "ar"
      ? "أكمل طلبك وأدخل تفاصيل الشحن والدفع"
      : "Complete your order and enter shipping and payment details";

  return {
    title,
    description,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function CheckoutPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const searchParamsObj = new URLSearchParams(params as Record<string, string>);
  const localeFromParams = getLocaleFromSearchParams(searchParamsObj);
  const locale =
    localeFromParams !== "en" ? localeFromParams : getLocaleFromRequest();

  // Get user and addresses
  const supabase = await createSsrClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [userAddresses, uaeStates] = (await Promise.all([
    user ? getUserAddresses(user.user_metadata.user_id) : [],
    getUAEStates(),
  ])) as any;

  return (
    <CheckoutPageClient
      user={user}
      userAddresses={userAddresses}
      uaeStates={uaeStates}
    />
  );
}
