"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, ArrowRight, Tag } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Offer Carousel Component
 *
 * A horizontal scrolling carousel designed to showcase healthcare volunteers/doctors.
 * Features smooth scrolling, hover animations, and responsive design.
 *
 * Key Features:
 * - Smooth horizontal scrolling with navigation buttons
 * - Framer Motion hover animations (card lifts on hover)
 * - Snap scrolling for better UX
 * - Hide scrollbar for cleaner look
 * - Navigation buttons appear on hover
 */

// Type definition for a single offer/doctor card
export interface Offer {
  id: string | number
  imageSrc: string // Doctor photo URL
  imageAlt: string // Accessibility text for image
  tag: string // Work preference: "Telemedicine", "Field Work", or "Both"
  title: string // Doctor name
  description: string // Brief bio/specialty description
  brandLogoSrc: string // Country/organization logo
  brandName: string // Country/organization name
  promoCode?: string // Optional additional info
  href: string // Link to doctor profile page
}

interface OfferCardProps {
  offer: Offer
}

/**
 * OfferCard Component
 *
 * Individual card within the carousel showing doctor information.
 * Includes hover animation that lifts the card up slightly.
 */
const OfferCard = React.forwardRef<HTMLAnchorElement, OfferCardProps>(({ offer }, ref) => (
  <motion.a
    ref={ref}
    href={offer.href}
    className="relative flex-shrink-0 w-[300px] h-[380px] rounded-2xl overflow-hidden group snap-start"
    // Hover animation: lift card up by 8px
    whileHover={{ y: -8 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    style={{ perspective: "1000px" }}
  >
    {/* Top half: Doctor Photo */}
    <img
      src={offer.imageSrc || "/placeholder.svg"}
      alt={offer.imageAlt}
      className="absolute inset-0 w-full h-2/4 object-cover transition-transform duration-500 group-hover:scale-110"
    />

    {/* Bottom half: Card Content */}
    <div className="absolute bottom-0 left-0 right-0 h-2/4 bg-card p-5 flex flex-col justify-between">
      <div className="space-y-2">
        {/* Tag (Work Preference) */}
        <div className="flex items-center text-xs text-muted-foreground">
          <Tag className="w-4 h-4 mr-2 text-primary" />
          <span>{offer.tag}</span>
        </div>

        {/* Doctor Name & Description */}
        <h3 className="text-xl font-bold text-card-foreground leading-tight">{offer.title}</h3>
        <p className="text-sm text-muted-foreground">{offer.description}</p>
      </div>

      {/* Footer: Country/Organization Info */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          <img
            src={offer.brandLogoSrc || "/placeholder.svg"}
            alt={`${offer.brandName} logo`}
            className="w-8 h-8 rounded-full bg-muted"
          />
          <div>
            <p className="text-xs font-semibold text-card-foreground">{offer.brandName}</p>
            {offer.promoCode && <p className="text-xs text-muted-foreground">{offer.promoCode}</p>}
          </div>
        </div>

        {/* Arrow icon that rotates on hover */}
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground transform transition-transform duration-300 group-hover:rotate-[-45deg] group-hover:bg-primary group-hover:text-primary-foreground">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  </motion.a>
))
OfferCard.displayName = "OfferCard"

export interface OfferCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  offers: Offer[] // Array of doctor/offer data to display
}

/**
 * OfferCarousel Component
 *
 * Main carousel container with horizontal scrolling and navigation controls.
 * Navigation buttons appear on hover for desktop users.
 */
const OfferCarousel = React.forwardRef<HTMLDivElement, OfferCarouselProps>(({ offers, className, ...props }, ref) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  /**
   * Scroll the carousel left or right
   * @param direction - "left" or "right"
   */
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = current.clientWidth * 0.8 // Scroll by 80% of container width
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div ref={ref} className={cn("relative w-full group", className)} {...props}>
      {/* Left Navigation Button (appears on hover) */}
      <button
        onClick={() => scroll("left")}
        className="absolute top-1/2 -translate-y-1/2 left-0 z-10 w-10 h-10 rounded-full bg-background/50 backdrop-blur-sm border border-border flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background/80"
        aria-label="Scroll Left"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
      >
        {offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>

      {/* Right Navigation Button (appears on hover) */}
      <button
        onClick={() => scroll("right")}
        className="absolute top-1/2 -translate-y-1/2 right-0 z-10 w-10 h-10 rounded-full bg-background/50 backdrop-blur-sm border border-border flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background/80"
        aria-label="Scroll Right"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  )
})
OfferCarousel.displayName = "OfferCarousel"

export { OfferCarousel, OfferCard }
