import type { Metadata } from "next"
import AuthLayout from "../AuthLayout"
import ForgotPasswordForm from "./ForgotPasswordForm"

export const metadata: Metadata = {
  title: "Reset Password - Eleva Store",
  description: "Reset your password to regain access to your account",
}

export default function ForgotPasswordPage() {
  return (
    <AuthLayout title="Reset Password" subtitle="Enter your email or phone to receive reset instructions">
      <ForgotPasswordForm />
    </AuthLayout>
  )
}
