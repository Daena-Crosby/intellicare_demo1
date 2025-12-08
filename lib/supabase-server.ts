import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

/**
 * Create Supabase Server Client
 *
 * This function creates a Supabase client for server-side operations
 * (Server Components, Route Handlers, Server Actions).
 *
 * Key features:
 * - Handles cookie-based authentication
 * - Supports server-side rendering (SSR)
 * - Automatically manages session tokens
 *
 * Environment variables required:
 * - NEXT_PUBLIC_SUPABASE_URL: Your Supabase project URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY: Your Supabase anon/public key
 *
 * Usage in Server Components:
 * ```typescript
 * import { createClient } from '@/lib/supabase-server'
 * const supabase = await createClient()
 * const { data } = await supabase.from('table_name').select()
 * ```
 */
export async function createClient() {
  // Get cookies from Next.js headers (must be awaited in Next.js 15+)
  const cookieStore = await cookies()

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      // Read all cookies for authentication
      getAll() {
        return cookieStore.getAll()
      },
      // Set cookies when authentication state changes
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}
