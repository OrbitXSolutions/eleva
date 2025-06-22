import type { Metadata } from "next"
import { Suspense } from "react"
import ResetPasswordForm from "./ResetPasswordForm"

export const metadata: Metadata = {
  title: "Reset Password - Eleva Store",
  description: "Create a new password for your account",
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Reset Password</h1>
          <p className="mt-2 text-sm text-muted-foreground">Enter your new password below</p>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  )
}
