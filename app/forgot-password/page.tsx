"use client"

import { useState } from "react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setError("Email is required")
      return
    }
    
    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsSubmitted(true)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0d0d12] flex flex-col">
        {/* Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#5dadec]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#5dadec]/5 rounded-full blur-3xl" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#5dadec]/20 to-transparent" />
        </div>

        {/* Header - fixed to top left */}
        <header className="fixed top-0 left-0 right-0 z-50 p-6 bg-[#0d0d12]/95 backdrop-blur-sm border-b border-[#2a2a35]/50">
          <Link href="/" className="inline-flex items-center gap-2 text-[#e8e8ec] hover:text-[#5dadec] transition-colors">
            <svg className="w-8 h-8 text-[#5dadec]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span className="text-xl font-bold">PowerSense</span>
          </Link>
        </header>

        {/* Main Content */}
        <main className="relative z-10 flex-1 flex items-center justify-center p-6 pt-24">
          <div className="w-full max-w-md">
            <div className="bg-[#1a1a1f] border border-[#2a2a35] rounded-2xl p-8 shadow-2xl shadow-black/20 text-center">
              {/* Success Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/10 rounded-full mb-6">
                <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <h1 className="text-2xl font-bold text-[#e8e8ec] mb-2">Check Your Email</h1>
              <p className="text-[#a0a0a0] mb-6">
                We&apos;ve sent a password reset link to
              </p>
              <p className="text-[#5dadec] font-medium mb-8 break-all">{email}</p>

              <div className="space-y-4">
                <p className="text-sm text-[#6a6a70]">
                  Didn&apos;t receive the email? Check your spam folder or
                </p>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isLoading}
                  className="text-[#5dadec] hover:text-[#4a9bd9] font-medium transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Sending..." : "Click to resend"}
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-[#2a2a35]">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-[#a0a0a0] hover:text-[#e8e8ec] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to sign in
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0d0d12] flex flex-col">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#5dadec]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#5dadec]/5 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#5dadec]/20 to-transparent" />
      </div>

      {/* Header - fixed to top left */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6 bg-[#0d0d12]/95 backdrop-blur-sm border-b border-[#2a2a35]/50">
        <Link href="/" className="inline-flex items-center gap-2 text-[#e8e8ec] hover:text-[#5dadec] transition-colors">
          <svg className="w-8 h-8 text-[#5dadec]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          <span className="text-xl font-bold">PowerSense</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-6 pt-24">
        <div className="w-full max-w-md">
          <div className="bg-[#1a1a1f] border border-[#2a2a35] rounded-2xl p-8 shadow-2xl shadow-black/20">
            {/* Back Link */}
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-[#a0a0a0] hover:text-[#e8e8ec] transition-colors mb-8"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to sign in
            </Link>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#5dadec]/10 rounded-2xl mb-4">
                <svg className="w-8 h-8 text-[#5dadec]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-[#e8e8ec] mb-2">Forgot Password?</h1>
              <p className="text-[#a0a0a0]">
                No worries! Enter your email and we&apos;ll send you a reset link.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-[#e8e8ec]">
                  Email Address
                </label>
                <div className="relative">
                  <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                    focusedField === "email" ? "text-[#5dadec]" : "text-[#a0a0a0]"
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (error) setError("")
                    }}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your email"
                    className={`w-full h-12 pl-11 pr-4 bg-[#0d0d12] border rounded-xl text-[#e8e8ec] placeholder-[#6a6a70] outline-none transition-all duration-200 autofill:bg-[#0d0d12] autofill:text-[#e8e8ec] ${
                      error 
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20" 
                        : "border-[#2a2a35] focus:border-[#5dadec] focus:ring-2 focus:ring-[#5dadec]/20"
                    }`}
                    style={{ backgroundColor: '#0d0d12', color: '#e8e8ec' }}
                    autoComplete="email"
                  />
                </div>
                {error && (
                  <p className="text-red-400 text-sm mt-1">{error}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#5dadec] hover:bg-[#4a9bd9] text-[#0d0d12] font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Reset Link
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Help Text */}
            <p className="text-center text-[#6a6a70] text-sm mt-8">
              Remember your password?{" "}
              <Link href="/login" className="text-[#5dadec] hover:text-[#4a9bd9] transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
