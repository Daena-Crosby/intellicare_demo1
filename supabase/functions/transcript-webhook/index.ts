/**
 * Supabase Edge Function: Transcript Webhook Handler
 *
 * Purpose: Receives transcript data from AI notetaking services (Fireflies, Granola, etc.)
 * and saves it to the Supabase database for processing.
 *
 * Deployment:
 * 1. Install Supabase CLI: npm install -g supabase
 * 2. Link to your project: supabase link --project-ref YOUR_PROJECT_REF
 * 3. Deploy: supabase functions deploy transcript-webhook
 *
 * Webhook URL will be: https://YOUR_PROJECT.supabase.co/functions/v1/transcript-webhook
 *
 * Expected Payload Format:
 * {
 *   "doctor_id": 123 (optional),
 *   "cohort_id": 456 (optional),
 *   "meeting_type": "group" | "one_on_one",
 *   "transcript_text": "Full transcript content here..."
 * }
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { Deno } from "https://deno.land/std@0.168.0/node/global.ts" // Import Deno to fix undeclared variable error

// CORS headers to allow webhook calls from external services
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  // Handle CORS preflight requests (OPTIONS method)
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client with service role key (full access)
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    )

    // Parse the incoming JSON payload from AI notetaking service
    const payload = await req.json()
    console.log("[v0] Received webhook payload:", payload)

    // Extract fields from payload (supports multiple naming conventions)
    const doctorId = payload.doctor_id || payload.doctorId
    const cohortId = payload.cohort_id || payload.cohortId
    const meetingType = payload.meeting_type || payload.meetingType || "group" // Default to 'group'
    const transcriptText = payload.transcript || payload.transcript_text || payload.text

    // Validate required fields
    if (!transcriptText) {
      return new Response(JSON.stringify({ error: "transcript_text is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    // Validate meeting_type constraint (must match database enum)
    if (meetingType !== "group" && meetingType !== "one_on_one") {
      return new Response(JSON.stringify({ error: "meeting_type must be 'group' or 'one_on_one'" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    // Prepare data object matching the transcripts table schema
    const transcriptData = {
      doctor_id: doctorId, // Foreign key to doctors_form_data (nullable)
      cohort_id: cohortId, // Foreign key to cohorts table (nullable)
      meeting_type: meetingType, // Enum: 'group' or 'one_on_one'
      transcript_text: transcriptText, // Full transcript content
    }

    console.log("[v0] Processed transcript data:", transcriptData)

    // Insert transcript into database
    const { data, error } = await supabaseClient.from("transcripts").insert([transcriptData]).select()

    if (error) {
      console.error("[v0] Error inserting transcript:", error)
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    console.log("[v0] Transcript saved successfully:", data)

    // Return success response with created transcript ID
    return new Response(
      JSON.stringify({
        success: true,
        message: "Transcript received and saved",
        transcript_id: data[0]?.transcript_id,
        data: data,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("[v0] Webhook processing error:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }
})
