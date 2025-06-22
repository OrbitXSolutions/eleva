import type { Metadata } from "next"
import AuthLayout from "../AuthLayout"
import RegisterForm from "./RegisterForm"

export const metadata: Metadata = {
  title: "Create Account - Eleva Store",
  description: "Join Eleva Store and discover premium fragrances from around the world",
}

export default function RegisterPage() {
  return (
    <AuthLayout title="Create Account" subtitle="Join Eleva Store and discover premium fragrances">
      <RegisterForm />
    </AuthLayout>
  )
}
