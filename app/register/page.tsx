"use client"

import Link from "next/link"
import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import { registerDoctor } from "@/app/actions/register-doctor"
import { ErrorToast } from "@/components/error-toast"
import { SuccessToast } from "@/components/success-toast"

/**
 * Doctor Registration Page Component
 * Handles volunteer healthcare professional registration
 */
const RegisterPage = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    medicalrole: "",
    specialty: "",
    workPreference: "", // Options: Telemedicine, Field Work, or Both
    availability: "",
    phone: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage(null)
    setSuccessMessage(null)

    try {
      console.log("[v0] Submitting registration form")
      const result = await registerDoctor(formData)

      console.log("[v0] Registration result:", result)

      if (!result.success) {
        const errorMsg = result.error || "Registration failed. Please try again."
        setErrorMessage(errorMsg)
        return
      }

      setFormData({
        name: "",
        email: "",
        country: "",
        medicalrole: "",
        specialty: "",
        workPreference: "",
        availability: "",
        phone: "",
      })

      const successMsg =
        result.warning || "Thank you for joining the Intellibus Care Foundation! Check your email for next steps."
      setSuccessMessage(successMsg)

      setTimeout(() => {
        router.push("/")
      }, 3000)
    } catch (error) {
      console.error("[v0] Registration error:", error)
      setErrorMessage("An unexpected error occurred. Please try again or contact support.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header />
      {errorMessage && <ErrorToast message={errorMessage} onClose={() => setErrorMessage(null)} />}
      {successMessage && <SuccessToast message={successMessage} onClose={() => setSuccessMessage(null)} />}
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-12">
        <div className="max-w-2xl mx-auto px-4">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-primary mb-6 hover:text-primary/80 transition"
          >
            <ChevronLeft size={20} />
            Back to Home
          </button>

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Join Our Mission</h1>
            <p className="text-lg text-slate-600">
              Register to become part of the Intellibus Care Foundation healthcare network
            </p>
          </div>

          <Card className="p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Personal Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Dr. Jane Smith"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="jane@example.com"
                      className="w-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Phone *</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+1 (555) 123-4567"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Country *</label>
                      <Input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        placeholder="Jamaica"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Professional Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Medical Role *</label>
                    <select
                      name="medicalrole"
                      value={formData.medicalrole}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select a role</option>
                      <option value="Doctor">Doctor</option>
                      <option value="Nurse">Nurse</option>
                      <option value="Paramedic">Paramedic</option>
                      <option value="Therapist">Therapist</option>
                      <option value="Psychologist">Psychologist</option>
                      <option value="Social Worker">Social Worker</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Specialty *</label>
                    <Input
                      type="text"
                      name="specialty"
                      value={formData.specialty}
                      onChange={handleChange}
                      required
                      placeholder="e.g., Emergency Medicine, Mental Health, Pediatrics"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Work Preference *</label>
                    <select
                      name="workPreference"
                      value={formData.workPreference}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select preference</option>
                      <option value="Telemedicine">Telemedicine (Remote care from US/anywhere)</option>
                      <option value="Field Work">Field Work (On-site in Jamaica)</option>
                      <option value="Both">Both (Telemedicine + Field Work)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Availability</label>
                    <Textarea
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      placeholder="e.g., Weekends only, 5 hours per week, specific dates"
                      rows={3}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold transition"
                >
                  {isLoading ? "Registering..." : "Complete Registration"}
                </Button>
              </div>

              <p className="text-xs text-slate-500 text-center">
                By registering, you agree to our terms and will receive updates about the Care Foundation
              </p>
              <p className="text-center">
                <Link href="/admin-login" className="text-xs text-blue-600 text-center underline">
                  Login as Admin
                </Link>
              </p>
            </form>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default RegisterPage
