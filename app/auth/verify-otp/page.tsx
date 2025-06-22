import type { Metadata } from "next"
import { Suspense } from "react"
import AuthLayout from "../AuthLayout"
import OtpForm from "./OtpForm"

export const metadata: Metadata = {
  title: "Verify Phone - Eleva Store",
  description: "Verify your phone number to complete registration",
}

export default function VerifyOtpPage() {
  return (
    <AuthLayout
      title="Verify Your Phone"
      subtitle="We've sent a 6-digit code to your phone number"
      showBackButton={false}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <OtpForm />
      </Suspense>
    </AuthLayout>
  )
}
