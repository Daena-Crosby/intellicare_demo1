"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ValueItem {
  title: string
  description: string
  imageSrc: string
}

interface ValuesScrollProps {
  values: ValueItem[]
}

export function ValuesScroll({ values }: ValuesScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(1)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener("resize", checkScroll)
    return () => window.removeEventListener("resize", checkScroll)
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400
      const newScrollLeft = scrollRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount)

      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })

      // Update active index
      const newIndex =
        direction === "left" ? Math.max(0, activeIndex - 1) : Math.min(values.length - 1, activeIndex + 1)
      setActiveIndex(newIndex)
    }
  }

  return (
    <div className="relative w-full">
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {values.map((value, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-80 snap-center transition-all duration-300 ${
              index === activeIndex ? "scale-100 opacity-100" : "scale-95 opacity-60"
            }`}
          >
            <div className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full border-2 border-border">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={value.imageSrc || "/placeholder.svg"}
                  alt={value.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-foreground">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <Button
        variant="outline"
        size="icon"
        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-background/90 backdrop-blur shadow-lg z-10 ${
          !canScrollLeft && "opacity-50 cursor-not-allowed"
        }`}
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-background/90 backdrop-blur shadow-lg z-10 ${
          !canScrollRight && "opacity-50 cursor-not-allowed"
        }`}
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-6">
        {values.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveIndex(index)
              if (scrollRef.current) {
                scrollRef.current.scrollTo({
                  left: index * 400,
                  behavior: "smooth",
                })
              }
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === activeIndex ? "bg-primary w-8" : "bg-muted-foreground/30"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
