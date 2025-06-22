"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useSupabase } from "@/components/providers/SupabaseProvider"
import { User, LogOut, LogIn } from "lucide-react"

export default function AuthButton() {
  const { supabase, user, loading } = useSupabase()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
    } catch (error) {
      console.error("Error signing in:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error("Error signing out:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (loading) {
    return (
      <Button variant="ghost" size="sm" disabled>
        <User className="h-5 w-5" />
      </Button>
    )
  }

  if (user) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={handleSignOut}
        disabled={isLoading}
        className="flex items-center gap-2"
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden md:inline">Sign Out</span>
      </Button>
    )
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleSignIn} disabled={isLoading} className="flex items-center gap-2">
      <LogIn className="h-4 w-4" />
      <span className="hidden md:inline">Sign In</span>
    </Button>
  )
}
