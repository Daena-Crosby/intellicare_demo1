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
          <div className="relative group">
            <Link
              href="/about"
              aria-current={isActive("/about") ? "page" : undefined}
              className={`transition-colors flex items-center gap-1 ${
                isActive("/about")
                  ? "text-primary font-semibold border-b-2 border-primary"
                  : "text-foreground hover:text-primary"
              }`}
            >
              About
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            
            {/* Dropdown Menu */}
            <div className="absolute left-0 top-full mt-2 w-72 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="p-2">
                <Link
                  href="/about/mission-vision"
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="mt-1 p-2 bg-primary/10 rounded-lg">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Mission & Vision</div>
                    <div className="text-sm text-muted-foreground">Our core purpose and values guiding every action</div>
                  </div>
                </Link>
                
                <Link
                  href="/about/our-story"
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="mt-1 p-2 bg-primary/10 rounded-lg">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Our Story</div>
                    <div className="text-sm text-muted-foreground">The journey of Intellibus Care Foundation</div>
                  </div>
                </Link>
                
                <Link
                  href="/about/leadership"
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="mt-1 p-2 bg-primary/10 rounded-lg">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Leadership & Governance</div>
                    <div className="text-sm text-muted-foreground">Meet our executive team and board of directors</div>
                  </div>
                </Link>
                
                <Link
                  href="/about/partners"
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="mt-1 p-2 bg-primary/10 rounded-lg">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Partners</div>
                    <div className="text-sm text-muted-foreground">Strategic partnerships amplifying our impact</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <Link
            href="/what-we-do"
            aria-current={isActive("/what-we-do") ? "page" : undefined}
            className={`transition-colors ${
              isActive("/what-we-do")
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
            aria-current={isActive("/media") ? "page" : undefined}
            className={`transition-colors ${
              isActive("/media")
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
          <Link href="/" className="hidden md:block">
            <Button className="bg-white text-primary hover:bg-gray-300/90">
              Grants
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
              href="/about"
              className={`px-4 py-3 rounded-lg transition-colors ${
                isActive("/about")
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "hover:bg-muted"
              }`}
            >
              About
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
              href="/what-we-do"
              className={`px-4 py-3 rounded-lg transition-colors ${
                isActive("/what-we-do")
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "hover:bg-muted"
              }`}
            >
              What we do
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
              href="/media"
              className={`px-4 py-3 rounded-lg transition-colors ${
                isActive("/media")
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "hover:bg-muted"
              }`}
            >
              Media
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
            <Link href="/" className="mt-0">
              <Button className="w-full bg-gray-200 text-black hover:bg-gray-300/90">
                Grants
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}