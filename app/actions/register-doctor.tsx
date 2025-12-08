"use server"

import { Resend } from "resend"
import { createAnonClient } from "@/lib/supabase-anon"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function registerDoctor(formData: {
  name: string
  email: string
  country: string
  medicalRole: string
  specialty: string
  workPreference: string
  availability: string
  phone: string
}) {
  try {
    const supabase = createAnonClient()

    const doctorId = crypto.randomUUID()
    const createdAt = new Date().toISOString()

    console.log("[v0] Attempting to register doctor:", formData.email)

    const { data: dbData, error: dbError } = await supabase
      .from("doctors_form_data")
      .insert({
        doctor_id: doctorId,
        name: formData.name,
        email: formData.email,
        country: formData.country,
        medical_role: formData.medicalRole,
        specialty: formData.specialty,
        work_preference: formData.workPreference,
        availability: formData.availability,
        phone: formData.phone,
        createdat: createdAt,
        photo_url: null,
        approved: false,
      })
      .select()

    if (dbError) {
      console.error("[v0] Database error:", dbError.message)
      return {
        success: false,
        error: "Failed to save registration. Please try again.",
        details: dbError.message,
      }
    }

    console.log("[v0] Successfully saved to database:", doctorId)

    try {
      const webhookUrl = "https://daena.app.n8n.cloud/webhook/doctor-registration"

      const webhookPayload = {
        doctorId,
        name: formData.name,
        email: formData.email,
        country: formData.country,
        medicalRole: formData.medicalRole,
        specialty: formData.specialty,
        workPreference: formData.workPreference,
        availability: formData.availability,
        phone: formData.phone,
        createdAt,
        approved: false,
      }

      console.log("[v0] Sending notification to n8n webhook")

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookPayload),
      })

      if (!response.ok) {
        console.log("[v0] Webhook notification failed (non-critical):", response.status)
      } else {
        console.log("[v0] Webhook notification sent successfully")
      }
    } catch (webhookError) {
      console.log("[v0] Webhook error (non-critical):", webhookError)
    }

    console.log("[v0] Registration successful, sending welcome email")

    try {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <p>Hey Dr. ${formData.name},</p>

          <p>
            Thank you for your interest in the Intellibus Care Foundation. We are grateful that you are
            taking the time to explore how your skills can support our mission of strengthening healthcare
            access and response.
          </p>

          <p>
            The next step is to schedule a short introductory call. This call helps us get to know you and
            share the Care Foundation charter, the goals of the program, and how the entire mission works.
          </p>

          <p>
            Please use the link below to choose a time that works for you:<br />
            <a href="https://calendly.com/daniel-callaghan-intellibus/30min" style="color: #2563eb;">
              https://calendly.com/daniel-callaghan-intellibus/30min
            </a>
          </p>

          <p>I look forward to meeting you and learning more about your experience.</p>

          <p>
            Warm regards,<br />
            Daniel Callaghan<br />
            Intellibus Care Foundation
          </p>
        </div>
      `

      const { data: emailData, error: emailError } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: formData.email,
        subject: "Welcome to the Intellibus Care Foundation",
        html: emailHtml,
      })

      if (emailError) {
        console.error("[v0] Email error:", emailError)
        return {
          success: true,
          warning: "Registration successful, but we couldn't send the welcome email. You'll be contacted soon.",
        }
      }

      console.log("[v0] Welcome email sent successfully:", emailData?.id)
    } catch (emailError) {
      console.error("[v0] Email sending failed:", emailError)
      return {
        success: true,
        warning: "Registration successful, but we couldn't send the welcome email. You'll be contacted soon.",
      }
    }

    return { success: true }
  } catch (error) {
    console.error("[v0] Registration error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred during registration",
      details: error instanceof Error ? error.stack : String(error),
    }
  }
}
