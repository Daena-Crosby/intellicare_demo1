"use server"

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function deleteDoctor(doctorId: string) {
  try {
    console.log("[v0] Attempting to delete doctor:", doctorId)

    const { error } = await supabase.from("doctors_form_data").delete().eq("doctor_id", doctorId)

    if (error) {
      console.error("[v0] Delete error:", error.message)
      return {
        success: false,
        error: "Failed to delete doctor. Please try again.",
      }
    }

    console.log("[v0] Successfully deleted doctor:", doctorId)
    return { success: true }
  } catch (error) {
    console.error("[v0] Delete error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred",
    }
  }
}
