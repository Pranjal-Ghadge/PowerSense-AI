import React, { useState } from 'react'
import logo from '../assets/logo.png'

const LoginRegister = ({ setView }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [isForgot, setIsForgot] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
    agreeToTerms: false
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const validate = () => {
    const newErrors = {}

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Enter a valid email address'
      }
    }

    // For forgot-password, only email is required
    if (!isForgot) {
      // Password validation (both login & register)
      if (!formData.password) {
        newErrors.password = 'Password is required'
      } else {
        if (formData.password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters'
        } else if (!/[A-Za-z]/.test(formData.password) || !/[0-9]/.test(formData.password)) {
          newErrors.password = 'Password must include letters and numbers'
        }
      }

      if (!isLogin) {
        // Confirm password (register only)
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = 'Please confirm your password'
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match'
        }

        if (!formData.fullName.trim()) {
          newErrors.fullName = 'Full name is required'
        }

        if (!formData.agreeToTerms) {
          newErrors.agreeToTerms = 'You must agree to the Terms and Privacy Policy'
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return

    if (isForgot) {
      console.log('Forgot password request for:', formData.email)
      alert('If this email is registered, a reset link will be sent.')
      setIsForgot(false)
      setErrors({})
      return
    }

    if (isLogin) {

      console.log('Login:', { email: formData.email, password: formData.password })
      setView() 
    } else {
   
      console.log('Register:', formData)
      setView() 
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${isLogin ? 'bg-gray-100' : 'bg-white'} py-6`}>
      <div className="fixed bottom-6 right-6 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors z-10">
        <span className="text-white text-lg font-bold">?</span>
      </div>

      <div className="w-full max-w-sm bg-white rounded-xl shadow-md px-6 py-7">
        <div className="flex justify-center mb-5">
          <img src={logo} alt="PowerSense Logo" className="w-14 h-14" />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 text-center mb-1.5">
          {isForgot ? 'Reset your password' : isLogin ? 'Welcome to PowerSense' : 'Create Account'}
        </h1>

        <p className="text-gray-500 text-center mb-6 text-sm">
          {isForgot
            ? 'Enter your registered email to receive a password reset link.'
            : isLogin
              ? 'Sign in to your account'
              : 'Join PowerSense today'}
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {!isLogin && !isForgot && (
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 border rounded-lg bg-gray-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
              )}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
              <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full px-4 py-3 border rounded-lg bg-gray-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email}</p>
            )}
          </div>

          {!isForgot && (
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={isLogin ? 'Enter your password' : 'Create a password'}
              className={`w-full px-4 py-3 border rounded-lg bg-gray-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password}</p>
            )}
          </div>
          )}

          {!isLogin && !isForgot && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className={`w-full px-4 py-3 border rounded-lg bg-gray-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          {isLogin && !isForgot && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-700"
                onClick={() => {
                  setIsForgot(true)
                  setErrors({})
                }}
              >
                Forgot password?
              </button>
            </div>
          )}

          {!isLogin && !isForgot && (
            <div className="flex items-start">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700">
                  Terms of Service
                </a>
                {' '}and{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700">
                  Privacy Policy
                </a>
              </label>
              {errors.agreeToTerms && (
                <p className="mt-1 text-xs text-red-600">{errors.agreeToTerms}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isForgot ? 'Send reset link' : isLogin ? 'Sign in' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-700 text-sm">
            {isForgot ? (
              <>
                Remember your password?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsForgot(false)
                    setIsLogin(true)
                    setErrors({})
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Back to sign in
                </button>
              </>
            ) : (
              <>
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin)
                    setIsForgot(false)
                    setErrors({})
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginRegister
