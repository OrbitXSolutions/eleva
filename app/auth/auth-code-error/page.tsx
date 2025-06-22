import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AuthCodeError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Authentication Error</h1>
          <p className="text-gray-600 mb-6">
            Sorry, we couldn't sign you in. There was an issue with the authentication process.
          </p>
          <Link href="/">
            <Button className="w-full">Return to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
