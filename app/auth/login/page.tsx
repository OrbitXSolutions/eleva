import type { Metadata } from "next"
import AuthLayout from "../AuthLayout"
import LoginForm from "./LoginForm"

export const metadata: Metadata = {
  title: "Sign In - Eleva Store",
  description: "Sign in to your account to continue shopping premium fragrances",
}

export default function LoginPage() {
  return (
    <AuthLayout title="Welcome Back" subtitle="Sign in to your account to continue">
      <LoginForm />
    </AuthLayout>
  )
}
