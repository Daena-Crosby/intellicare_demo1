import { createBrowserClient } from "@supabase/ssr"

/**
 * Supabase Client Singleton
 *
 * This client is used for browser-side Supabase operations.
 * Uses the singleton pattern to ensure only one instance is created.
 *
 * Environment variables required:
 * - NEXT_PUBLIC_SUPABASE_URL: Your Supabase project URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY: Your Supabase anon/public key
 *
 * Usage:
 * import { supabase } from '@/lib/supabaseClient'
 * const { data, error } = await supabase.from('table_name').select()
 */

let supabaseInstance: ReturnType<typeof createBrowserClient> | null = null

export const supabase = (() => {
  // Create client only once (singleton pattern)
  if (!supabaseInstance) {
    supabaseInstance = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
  }
  return supabaseInstance
})()
