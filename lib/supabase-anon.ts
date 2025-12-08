import { createClient } from "@supabase/supabase-js"

/**
 * Create Anonymous Supabase Client
 *
 * This function creates a Supabase client for anonymous/public operations
 * without any authentication context. Use this for public-facing features like
 * registration forms where RLS policies allow anonymous access.
 *
 * Environment variables required:
 * - NEXT_PUBLIC_SUPABASE_URL: Your Supabase project URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY: Your Supabase anon/public key
 *
 * Usage in Server Actions:
 * ```typescript
 * import { createAnonClient } from '@/lib/supabase-anon'
 * const supabase = createAnonClient()
 * const { data } = await supabase.from('table_name').insert(...)
 * ```
 */
export function createAnonClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
