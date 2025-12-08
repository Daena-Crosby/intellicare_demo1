"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Menu, X } from "lucide-react"

/**
 * Main navigation header component
 * Shows admin login button or admin panel access based on authentication status
 */
export default function Header() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Check admin authentication status on mount and when pathname changes
  useEffect(() => {
    const adminSession = localStorage.getItem("admin_session")
    setIsAdminLoggedIn(adminSession === "true")
  }, [pathname])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const isActive = (href: string) => pathname === href

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 font-bold text-xl hover:opacity-80 transition"
        >
          <Image
            src="/images/image.png"
            alt="Intellibus"
            width={32}
            height={32}
            className="h-8 w-auto"
          />
          <span className="hidden sm:inline text-foreground">
            Intellibus Care
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/about"
            aria-current={isActive("/doctors") ? "page" : undefined}
            className={`transition-colors ${
              isActive("/doctors")
                ? "text-primary font-semibold border-b-2 border-primary"
                : "text-foreground hover:text-primary"
            }`}
          >
            About
          </Link>

          <Link
            href="/what-we-do"
            aria-current={isActive("/doctors") ? "page" : undefined}
            className={`transition-colors ${
              isActive("/doctors")
                ? "text-primary font-semibold border-b-2 border-primary"
                : "text-foreground hover:text-primary"
            }`}
          >
            What we Do
          </Link>
          
          <Link
            href="/doctors"
            aria-current={isActive("/doctors") ? "page" : undefined}
            className={`transition-colors ${
              isActive("/doctors")
                ? "text-primary font-semibold border-b-2 border-primary"
                : "text-foreground hover:text-primary"
            }`}
          >
            Doctors
          </Link>
          <Link
            href="/missions"
            aria-current={isActive("/missions") ? "page" : undefined}
            className={`transition-colors ${
              isActive("/missions")
                ? "text-primary font-semibold border-b-2 border-primary"
                : "text-foreground hover:text-primary"
            }`}
          >
            Missions
          </Link>

          <Link
            href="/media"
            aria-current={isActive("/doctors") ? "page" : undefined}
            className={`transition-colors ${
              isActive("/doctors")
                ? "text-primary font-semibold border-b-2 border-primary"
                : "text-foreground hover:text-primary"
            }`}
          >
            Media
          </Link>

          <Link
            href="/register"
            aria-current={isActive("/register") ? "page" : undefined}
            className={`transition-colors ${
              isActive("/register")
                ? "text-primary font-semibold border-b-2 border-primary"
                : "text-foreground hover:text-primary"
            }`}
          >
            Register
          </Link>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center gap-2">
          <Link href="/register" className="hidden md:block">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Get Started
            </Button>
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <nav className="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-4">
            <Link
              href="/"
              className={`px-4 py-3 rounded-lg transition-colors ${
                isActive("/")
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "hover:bg-muted"
              }`}
            >
              Home
            </Link>
            <Link
              href="/doctors"
              className={`px-4 py-3 rounded-lg transition-colors ${
                isActive("/doctors")
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "hover:bg-muted"
              }`}
            >
              Doctors
            </Link>
            <Link
              href="/missions"
              className={`px-4 py-3 rounded-lg transition-colors ${
                isActive("/missions")
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "hover:bg-muted"
              }`}
            >
              Missions
            </Link>
            <Link
              href="/register"
              className={`px-4 py-3 rounded-lg transition-colors ${
                isActive("/register")
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "hover:bg-muted"
              }`}
            >
              Register
            </Link>
            <Link href="/register" className="mt-2">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
