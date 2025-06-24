import { CookiesKeys } from "@/lib/constants/cookies-keys";
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
//   const { cookies, headers } = await import("next/headers");
  const cookieStore = await cookies();
  const locale = cookieStore.get(CookiesKeys.NEXT_LOCALE)?.value || "en";

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
