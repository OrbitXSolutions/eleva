export const dynamic = "force-dynamic";
import { createSsrClient } from "@/lib/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const categorySlug = searchParams.get("category");
    const page = Number.parseInt(searchParams.get("page") || "1");
    const sort = searchParams.get("sort") || "newest";
    const limit = 8; // Changed from 20 to 8
    const offset = (page - 1) * limit;

    const supabase = await createSsrClient();

    // Get user for personalized data
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // ✅ 1. Get category_id from slug
    let categoryId: number | null = null;
    if (categorySlug) {
      const { data: catData, error: catErr } = await supabase
        .from("categories")
        .select("id")
        .or(`slug.eq.${categorySlug},slug_ar.eq.${categorySlug}`)
        .single();

      if (catErr) {
        console.error("Category lookup failed:", catErr);
      } else {
        categoryId = catData?.id ?? null;
      }
    }

    console.log("Category ID:", categoryId);

    // ✅ 2. Call the Supabase function
    const { data, error } = await (supabase.rpc as any)("search_products", {
      p_query: query,
      p_category_id: categoryId,
      p_page: page,
      p_limit: limit,
      p_sort: sort,
    });
    console.log("RPC Data:", data);
    if (error) {
      console.error("RPC Error:", error);
      return NextResponse.json(
        { error: "Failed to fetch products" },
        { status: 500 }
      );
    }

    const total = data?.length || 0;
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      products: data,
      total,
      totalPages,
      currentPage: page,
      hasMore: page < totalPages,
    });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
//     let queryBuilder = supabase
//       .from("products")
//       .select(
//         `
//         *,
//         categories:categories(*),
//         currency:currencies(*),
//         cart_items!left(quantity, user_id),
//         favorites!left(user_id)
//       `
//       )
//       .eq("is_deleted", false)
//       .not("quantity", "is", null)
//       .gte("quantity", 0);

//     // Add user-specific filters if authenticated
//     if (user?.id) {
//       queryBuilder = queryBuilder
//         .eq("cart_items.user_id", user.user_metadata.user_id)
//         .eq("favorites.user_id", user.user_metadata.user_id);
//     }

//     // Add search filter
//     if (categorySlug) {
//       queryBuilder = queryBuilder
//         .ilike("categories.slug", `%${categorySlug}%`)
//         .ilike("categories.slug_ar", `%${categorySlug}%`);
//     }

//     // Add category filter
//     if (categorySlug) {
//       queryBuilder = queryBuilder.or(
//         `slug.eq.${categorySlug},slug_ar.eq.${categorySlug}`
//       );
//     }
//     // Add sorting
//     switch (sort) {
//       case "oldest":
//         queryBuilder = queryBuilder.order("created_at", { ascending: true });
//         break;
//       case "price-low":
//         queryBuilder = queryBuilder.order("price", { ascending: true });
//         break;
//       case "price-high":
//         queryBuilder = queryBuilder.order("price", { ascending: false });
//         break;
//       case "name-az":
//         queryBuilder = queryBuilder.order("name_en", { ascending: true });
//         break;
//       case "name-za":
//         queryBuilder = queryBuilder.order("name_en", { ascending: false });
//         break;
//       case "rating-high":
//         queryBuilder = queryBuilder.order("total_rates", { ascending: false });
//         break;
//       case "rating-low":
//         queryBuilder = queryBuilder.order("total_rates", { ascending: true });
//         break;
//       default: // newest
//         queryBuilder = queryBuilder.order("created_at", { ascending: false });
//     }

//     const { data, error } = await queryBuilder.range(
//       offset,
//       offset + limit - 1
//     );

//     if (error) {
//       console.error("Error fetching products:", error);
//       return NextResponse.json(
//         { error: "Failed to fetch products" },
//         { status: 500 }
//       );
//     }

//     // Get total count for pagination
//     let countQuery = supabase
//       .from("products")
//       .select("id", { count: "exact", head: true })
//       .eq("is_deleted", false)
//       .not("quantity", "is", null)
//       .gte("quantity", 0);

//     // Apply same filters for count
//     if (query) {
//       countQuery = countQuery
//         .ilike("categories.slug", `%${categorySlug}%`)
//         .ilike("categories.slug_ar", `%${categorySlug}%`);
//     }
//     if (categorySlug) {
//       countQuery = countQuery.or(
//         `categories.slug.eq.${categorySlug},categories.slug_ar.eq.${categorySlug}`
//       );
//     }

//     const { count, error: countError } = await countQuery;

//     if (countError) {
//       console.error("Error counting products:", countError);
//     }

//     const totalProducts = count || 0;
//     const totalPages = Math.ceil(totalProducts / limit);

//     // Transform the data to include user-specific flags
//     const products: ProductWithUserData[] = (data || []).map((product) => ({
//       ...product,
//       currency: product.currency === null ? undefined : product.currency,
//       in_cart: product.cart_items && product.cart_items.length > 0,
//       cart_quantity: product.cart_items?.[0]?.quantity || null,
//       is_favorite: product.favorites && product.favorites.length > 0,
//     }));

//     return NextResponse.json({
//       products,
//       total: totalProducts,
//       totalPages,
//       currentPage: page,
//       hasMore: page < totalPages,
//     });
//   } catch (error) {
//     console.error("API Error:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
