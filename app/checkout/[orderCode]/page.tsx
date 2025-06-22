import { createSsrClient } from "@/utils/supabase/server"
import { notFound } from "next/navigation"
import CheckoutPageClient from "./CheckoutPageClient"
import { getUserAddresses, getUAEStates } from "@/lib/checkout"

interface CheckoutPageProps {
  params: Promise<{ orderCode: string }>
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { orderCode } = await params
  const supabase = await createSsrClient()

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Get order details
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        *,
        product:products (*)
      )
    `)
    .eq("code", orderCode)
    .eq("status", "draft")
    .single()

  if (orderError || !order) {
    notFound()
  }

  // Get user addresses if authenticated
  let userAddresses: any[] = []
  if (user) {
    userAddresses = await getUserAddresses(user.id)
  }

  // Get UAE states
  const uaeStates = await getUAEStates()

  return <CheckoutPageClient user={user} order={order} userAddresses={userAddresses} uaeStates={uaeStates} />
}
