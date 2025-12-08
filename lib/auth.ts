/**
 * Authentication utilities for admin access
 * Only admins can access the dashboard to manage volunteers
 */

// Admin password - In production, use proper authentication (Supabase, Auth0, etc.)
const ADMIN_PASSWORD = "admin123"

/**
 * Check if admin is currently logged in
 */
export function getAdminSession(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("admin_session") === "true"
}

/**
 * Set or clear admin session
 */
export function setAdminSession(authenticated: boolean) {
  if (typeof window === "undefined") return
  if (authenticated) {
    localStorage.setItem("admin_session", "true")
  } else {
    localStorage.removeItem("admin_session")
  }
}

/**
 * Verify admin password (for login)
 */
export function verifyAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD
}
