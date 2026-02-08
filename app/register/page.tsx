"use client"



import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"


interface PasswordStrength {
  score: number
  label: string
  color: string
  requirements: {
    length: boolean
    uppercase: boolean
    lowercase: boolean
    number: boolean
    special: boolean
  }
}

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  })
  const [errors, setErrors] = useState<{
    fullName?: string
    email?: string
    password?: string
    confirmPassword?: string
    phone?: string
    terms?: string
    general?: string
  }>({})
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    label: "",
    color: "",
    requirements: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false,
    },
  })

  useEffect(() => {
    const password = formData.password
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }

    const score = Object.values(requirements).filter(Boolean).length

    let label = ""
    let color = ""

    if (password.length === 0) {
      label = ""
      color = ""
    } else if (score <= 2) {
      label = "Weak"
      color = "#ef4444"
    } else if (score === 3) {
      label = "Fair"
      color = "#f59e0b"
    } else if (score === 4) {
      label = "Good"
      color = "#22c55e"
    } else {
      label = "Strong"
      color = "#5dadec"
    }

    setPasswordStrength({ score, label, color, requirements })
  }, [formData.password])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string) => {
    if (!phone) return true
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
    return phoneRegex.test(phone)
  }

  const validateForm = () => {
    const newErrors: typeof errors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    } else if (passwordStrength.score < 3) {
      newErrors.password = "Please choose a stronger password"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }

    if (!acceptTerms) {
      newErrors.terms = "You must accept the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  if (!validateForm()) return

  setIsLoading(true)
  setErrors({})

  try {
    const res = await axios.post(
      "http://localhost:5000/routes/register",
      {
        name: formData.fullName,
        email: formData.email,
        password: formData.password
      }
    )

    console.log(res.data)

    router.push("/login?registered=true")

  } catch (err: any) {
    console.log(err)

    // Backend sends error messages in 'msg' (same as login page)
    if (err.response?.data?.msg) {
      setErrors({ general: err.response.data.msg })
    } else if (err.response?.data?.message) {
      setErrors({ general: err.response.data.message })
    } else if (err.code === "ERR_NETWORK" || !err.response) {
      setErrors({ general: "Cannot reach server. Please ensure the backend is running and try again." })
    } else {
      setErrors({ general: "Registration failed. Try again." })
    }
  } finally {
    setIsLoading(false)
  }
}


  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const RequirementItem = ({ met, text }: { met: boolean; text: string }) => (
    <div className={`flex items-center gap-2 text-xs transition-colors duration-200 ${met ? "text-green-400" : "text-[#6a6a70]"}`}>
      {met ? (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
      {text}
    </div>
  )

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
      <main className="relative z-10 flex-1 flex items-center justify-center p-6 pt-24 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-[#1a1a1f] border border-[#2a2a35] rounded-2xl p-8 shadow-2xl shadow-black/20">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#5dadec]/10 rounded-2xl mb-4">
                <svg className="w-8 h-8 text-[#5dadec]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-[#e8e8ec] mb-2">Create Account</h1>
              <p className="text-[#a0a0a0]">Start your journey with PowerSense</p>
            </div>

            {/* General Error */}
            {errors.general && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm text-center">{errors.general}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Full Name Field */}
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-[#e8e8ec]">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                    focusedField === "fullName" ? "text-[#5dadec]" : "text-[#a0a0a0]"
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    onFocus={() => setFocusedField("fullName")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your full name"
                    className={`w-full h-12 pl-11 pr-4 bg-[#0d0d12] border rounded-xl text-[#e8e8ec] placeholder-[#6a6a70] outline-none transition-all duration-200 autofill:bg-[#0d0d12] autofill:text-[#e8e8ec] ${
                      errors.fullName 
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20" 
                        : "border-[#2a2a35] focus:border-[#5dadec] focus:ring-2 focus:ring-[#5dadec]/20"
                    }`}
                    style={{ backgroundColor: '#0d0d12', color: '#e8e8ec' }}
                    autoComplete="name"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-[#e8e8ec]">
                  Email Address <span className="text-red-400">*</span>
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
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your email"
                    className={`w-full h-12 pl-11 pr-4 bg-[#0d0d12] border rounded-xl text-[#e8e8ec] placeholder-[#6a6a70] outline-none transition-all duration-200 autofill:bg-[#0d0d12] autofill:text-[#e8e8ec] ${
                      errors.email 
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20" 
                        : "border-[#2a2a35] focus:border-[#5dadec] focus:ring-2 focus:ring-[#5dadec]/20"
                    }`}
                    style={{ backgroundColor: '#0d0d12', color: '#e8e8ec' }}
                    autoComplete="email"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-[#e8e8ec]">
                  Password <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                    focusedField === "password" ? "text-[#5dadec]" : "text-[#a0a0a0]"
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Create a password"
                    className={`w-full h-12 pl-11 pr-12 bg-[#0d0d12] border rounded-xl text-[#e8e8ec] placeholder-[#6a6a70] outline-none transition-all duration-200 autofill:bg-[#0d0d12] autofill:text-[#e8e8ec] ${
                      errors.password 
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20" 
                        : "border-[#2a2a35] focus:border-[#5dadec] focus:ring-2 focus:ring-[#5dadec]/20"
                    }`}
                    style={{ backgroundColor: '#0d0d12', color: '#e8e8ec' }}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a0a0a0] hover:text-[#5dadec] transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="space-y-3 mt-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-[#2a2a35] rounded-full overflow-hidden">
                        <div
                          className="h-full transition-all duration-300 rounded-full"
                          style={{
                            width: `${(passwordStrength.score / 5) * 100}%`,
                            backgroundColor: passwordStrength.color,
                          }}
                        />
                      </div>
                      <span
                        className="text-xs font-medium min-w-[50px]"
                        style={{ color: passwordStrength.color }}
                      >
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <RequirementItem met={passwordStrength.requirements.length} text="8+ characters" />
                      <RequirementItem met={passwordStrength.requirements.uppercase} text="Uppercase letter" />
                      <RequirementItem met={passwordStrength.requirements.lowercase} text="Lowercase letter" />
                      <RequirementItem met={passwordStrength.requirements.number} text="Number" />
                      <RequirementItem met={passwordStrength.requirements.special} text="Special character" />
                    </div>
                  </div>
                )}
                
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#e8e8ec]">
                  Confirm Password <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                    focusedField === "confirmPassword" ? "text-[#5dadec]" : "text-[#a0a0a0]"
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    onFocus={() => setFocusedField("confirmPassword")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Confirm your password"
                    className={`w-full h-12 pl-11 pr-12 bg-[#0d0d12] border rounded-xl text-[#e8e8ec] placeholder-[#6a6a70] outline-none transition-all duration-200 autofill:bg-[#0d0d12] autofill:text-[#e8e8ec] ${
                      errors.confirmPassword 
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20" 
                        : formData.confirmPassword && formData.password === formData.confirmPassword
                        ? "border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                        : "border-[#2a2a35] focus:border-[#5dadec] focus:ring-2 focus:ring-[#5dadec]/20"
                    }`}
                    style={{ backgroundColor: '#0d0d12', color: '#e8e8ec' }}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a0a0a0] hover:text-[#5dadec] transition-colors"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <p className="text-green-400 text-sm mt-1 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Passwords match
                  </p>
                )}
                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Phone Field (Optional) */}
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-[#e8e8ec]">
                  Phone Number <span className="text-[#6a6a70]">(optional)</span>
                </label>
                <div className="relative">
                  <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                    focusedField === "phone" ? "text-[#5dadec]" : "text-[#a0a0a0]"
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="+1 (555) 000-0000"
                    className={`w-full h-12 pl-11 pr-4 bg-[#0d0d12] border rounded-xl text-[#e8e8ec] placeholder-[#6a6a70] outline-none transition-all duration-200 autofill:bg-[#0d0d12] autofill:text-[#e8e8ec] ${
                      errors.phone 
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20" 
                        : "border-[#2a2a35] focus:border-[#5dadec] focus:ring-2 focus:ring-[#5dadec]/20"
                    }`}
                    style={{ backgroundColor: '#0d0d12', color: '#e8e8ec' }}
                    autoComplete="tel"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="space-y-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative mt-0.5">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => {
                        setAcceptTerms(e.target.checked)
                        if (errors.terms) {
                          setErrors(prev => ({ ...prev, terms: undefined }))
                        }
                      }}
                      className="peer sr-only"
                    />
                    <div className={`w-5 h-5 border rounded-md bg-[#0d0d12] peer-checked:bg-[#5dadec] peer-checked:border-[#5dadec] transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-[#5dadec]/50 ${
                      errors.terms ? "border-red-500" : "border-[#2a2a35]"
                    }`}>
                      <svg
                        className={`w-5 h-5 text-[#0d0d12] transition-opacity duration-200 ${
                          acceptTerms ? "opacity-100" : "opacity-0"
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <span className="text-sm text-[#a0a0a0] group-hover:text-[#e8e8ec] transition-colors">
                    I agree to the{" "}
                    <Link href="#" className="text-[#5dadec] hover:text-[#4a9bd9] transition-colors">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-[#5dadec] hover:text-[#4a9bd9] transition-colors">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.terms && (
                  <p className="text-red-400 text-sm">{errors.terms}</p>
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
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Sign In Link */}
            <p className="text-center text-[#a0a0a0] mt-8">
              Already have an account?{" "}
              <Link href="/login" className="text-[#5dadec] hover:text-[#4a9bd9] font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
