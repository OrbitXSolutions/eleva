import { Suspense } from "react";
import { Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

// Separate component to use search params in RSC
function CheckEmailContent({ searchParams }: { searchParams: { email?: string } }) {
  const t = useTranslations();
  const email = decodeURIComponent(searchParams.email || "");
  return (
    <div className="max-w-md mx-auto py-16 px-6 text-center space-y-6">
      <div className="flex justify-center">
        <div className="h-16 w-16 rounded-full bg-primary-50 flex items-center justify-center">
          <Mail className="h-8 w-8 text-primary-700" />
        </div>
      </div>
      <h1 className="text-2xl font-semibold text-gray-900">
        {t("auth.forms.register.checkEmailTitle", {
          defaultValue: "Check your email"
        })}
      </h1>
      <p className="text-sm text-gray-600 leading-relaxed">
        {email ? (
          <>
            We sent a verification link to <span className="font-medium">{email}</span>. Click the link inside to activate your account.
          </>
        ) : (
          "We sent you a verification email. Please check your inbox and follow the link to complete your registration."
        )}
      </p>
      <div className="space-y-3 text-xs text-gray-500">
        <p>If you don't see the email, check your spam folder.</p>
        <p>
          Wrong email? <Link href="/auth/register" className="text-primary-700 hover:underline">Try again</Link>
        </p>
      </div>
      <div className="pt-4">
        <Button asChild className="w-full">
          <Link href="/">Return home</Link>
        </Button>
      </div>
    </div>
  );
}

export default function Page(props: any) {
  return (
    <Suspense>
      <CheckEmailContent {...props} />
    </Suspense>
  );
}
