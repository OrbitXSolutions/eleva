import createClient from "../supabase/client";
import { createSsrClient } from "../supabase/server";
import { CartItem } from "./cart";

export interface CheckoutData {
  // User details (for guest checkout)
  email?: string;
  password?: string;
  confirmPassword?: string;

  // Address details
  fullName: string;
  phone: string;
  address: string;
  stateCode: string;
  notes?: string;

  // Address selection (for existing users)
  selectedAddressId?: number;

  // Cart items
  cartItems: CartItem[];
}

export interface CheckoutResult {
  success: boolean;
  orderId?: number;
  orderCode?: string;
  error?: string;
}

// Get user's addresses
export async function getUserAddresses(userId: number) {
  const supabase = await createSsrClient();

  const { data, error } = await supabase
    .from("addresses")
    .select(
      `
      *,
      state:states(name_en, name_ar)
    `
    )
    .eq("user_id", userId)
    .eq("is_deleted", false)
    .order("is_default", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching addresses:", error);
    return [];
  }

  return data || [];
}

// Get UAE states for dropdown
export async function getUAEStates() {
  const supabase = await createSsrClient();

  const { data, error } = await supabase
    .from("states")
    .select("code, name_en, name_ar")
    .eq("country_code", "AE")
    .order("name_en");

  if (error) {
    console.error("Error fetching UAE states:", error);
    return [];
  }

  return data || [];
}

// Create address for user
export async function createAddress(
  userId: number,
  addressData: {
    fullName: string;
    phone: string;
    address: string;
    stateCode: string;
    notes?: string;
    isDefault?: boolean;
  }
) {
  const supabase = await createSsrClient();

  // If this is set as default, unset other defaults first
  if (addressData.isDefault) {
    await supabase
      .from("addresses")
      .update({ is_default: false })
      .eq("user_id", userId);
  }

  const { data, error } = await supabase
    .from("addresses")
    .insert({
      user_id: userId,
      full_name: addressData.fullName,
      phone: addressData.phone,
      address: addressData.address,
      state_code: addressData.stateCode,
      notes: addressData.notes,
      is_default: addressData.isDefault || false,
      country_code: "AE",
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating address:", error);
    throw new Error("Failed to create address");
  }

  return data;
}

// Process checkout for authenticated user
export async function processAuthenticatedCheckout(
  userId: number,
  checkoutData: CheckoutData
): Promise<CheckoutResult> {
  const supabase = await createSsrClient();

  try {
    let addressId = checkoutData.selectedAddressId;

    // Create new address if not using existing one
    if (!addressId) {
      const newAddress = await createAddress(userId, {
        fullName: checkoutData.fullName,
        phone: checkoutData.phone,
        address: checkoutData.address,
        stateCode: checkoutData.stateCode,
        notes: checkoutData.notes,
        isDefault: false,
      });
      addressId = newAddress.id;
    }

    // Create order
    const orderCode = `ORD-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        code: orderCode,
        user_id: userId,
        address_id: addressId,
        status: "pending",
        subtotal: checkoutData.cartItems.reduce(
          (sum, item) => sum + (item.product.price || 0) * item.quantity,
          0
        ),
        total_price: checkoutData.cartItems.reduce(
          (sum, item) => sum + (item.product.price || 0) * item.quantity,
          0
        ),
        currency_code:
          checkoutData.cartItems[0]?.product.currency_code || "USD",
      })
      .select()
      .single();

    if (orderError) {
      console.error("Error creating order:", orderError);
      throw new Error("Failed to create order");
    }

    // Create order items
    const orderItems = checkoutData.cartItems.map((item) => ({
      order_id: order.id,
      product_id: item.product.id,
      quantity: item.quantity,
      price: item.product.price || 0,
      total_price: (item.product.price || 0) * item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error("Error creating order items:", itemsError);
      throw new Error("Failed to create order items");
    }

    return {
      success: true,
      orderId: order.id,
      orderCode: order.code ?? "",
    };
  } catch (error) {
    console.error("Checkout error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Checkout failed",
    };
  }
}

// Process checkout for guest user
export async function processGuestCheckout(
  checkoutData: CheckoutData
): Promise<CheckoutResult> {
  const supabase = createClient();

  try {
    // Validate guest data
    if (
      !checkoutData.email ||
      !checkoutData.password ||
      !checkoutData.confirmPassword
    ) {
      throw new Error("Email and password are required for guest checkout");
    }

    if (checkoutData.password !== checkoutData.confirmPassword) {
      throw new Error("Passwords do not match");
    }

    // Register user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: checkoutData.email,
      password: checkoutData.password,
      options: {
        data: {
          first_name: checkoutData.fullName.split(" ")[0] || "",
          last_name: checkoutData.fullName.split(" ").slice(1).join(" ") || "",
          phone: checkoutData.phone,
        },
      },
    });

    if (authError) {
      console.error("Auth error:", authError);
      throw new Error(authError.message);
    }

    if (!authData.user) {
      throw new Error("Failed to create user account");
    }

    const authUserId = authData.user.id;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const { data: user, error } = await supabase
      .from("users")
      .select("id")
      .eq("user_id", authUserId)
      .single();

    if (error) {
      console.error("Error fetching user record:", error);
      throw new Error("Failed to fetch user record");
    }

    const userId = user.id;
    // The user record should be automatically created by the trigger
    // Wait a moment for the trigger to complete

    // Create address
    const newAddress = await createAddress(userId, {
      fullName: checkoutData.fullName,
      phone: checkoutData.phone,
      address: checkoutData.address,
      stateCode: checkoutData.stateCode,
      notes: checkoutData.notes,
      isDefault: true, // First address is default
    });

    // Create order
    const orderCode = `ORD-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    const serverSupabase = await createSsrClient();
    const { data: order, error: orderError } = await serverSupabase
      .from("orders")
      .insert({
        code: orderCode,
        user_id: userId,
        address_id: newAddress.id,
        status: "pending",
        subtotal: checkoutData.cartItems.reduce(
          (sum, item) => sum + (item.product.price || 0) * item.quantity,
          0
        ),
        total_price: checkoutData.cartItems.reduce(
          (sum, item) => sum + (item.product.price || 0) * item.quantity,
          0
        ),
        currency_code:
          checkoutData.cartItems[0]?.product.currency_code || "USD",
      })
      .select()
      .single();

    if (orderError) {
      console.error("Error creating order:", orderError);
      throw new Error("Failed to create order");
    }

    // Create order items
    const orderItems = checkoutData.cartItems.map((item) => ({
      order_id: order.id,
      product_id: item.product.id,
      quantity: item.quantity,
      price: item.product.price || 0,
      total_price: (item.product.price || 0) * item.quantity,
    }));

    const { error: itemsError } = await serverSupabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error("Error creating order items:", itemsError);
      throw new Error("Failed to create order items");
    }

    return {
      success: true,
      orderId: order.id,
      orderCode: order.code ?? "",
    };
  } catch (error) {
    console.error("Guest checkout error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Checkout failed",
    };
  }
}
