import { createSsrClient } from "@/lib/supabase/server";
import ProductsClient from "./ProductsClient";
import { getFeaturedProducts } from "@/lib/common/supabase-queries";

export default async function Products() {
  const supabase = await createSsrClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const products = await getFeaturedProducts(6, user?.user_metadata?.user_id);

  return <ProductsClient products={products} />;
}
