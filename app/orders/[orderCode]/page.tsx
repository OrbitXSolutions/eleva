import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import OrderConfirmationClient from "./OrderConfirmationClient";
import {
  getLocaleFromSearchParams,
  getLocaleFromRequest,
  isRTLLocale,
  getTranslations,
} from "@/lib/common/translations";
import { createSsrClient } from "@/lib/supabase/server";

interface PageProps {
  params: Promise<{ orderCode: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { orderCode } = await params;

  return {
    title: `Order ${orderCode} - Eleva`,
    description: "Order confirmation and details",
    robots: {
      index: false,
      follow: false,
    },
  };
}

async function getOrderDetails(orderCode: string) {
  const supabase = await createSsrClient();

  const { data: order, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      address:addresses(*),
      order_items(
        *,
        product:products(*)
      )
    `
    )
    .eq("code", orderCode)
    .single();

  if (error) {
    console.error("Error fetching order:", error);
    return null;
  }

  return order;
}

export default async function OrderConfirmationPage({
  params,
  searchParams,
}: PageProps) {
  const { orderCode } = await params;
  const searchParamsObj = new URLSearchParams(
    (await searchParams) as Record<string, string>
  );
  const localeFromParams = getLocaleFromSearchParams(searchParamsObj);
  const locale =
    localeFromParams !== "en" ? localeFromParams : getLocaleFromRequest();

  const order = await getOrderDetails(orderCode);

  if (!order) {
    notFound();
  }

  return <OrderConfirmationClient order={order} />;
}
