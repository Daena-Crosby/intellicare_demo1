"use client"

import { useRef, useState, useEffect } from "react"

interface ValueItem {
  title: string
  description: string
  imageSrc: string
}

interface VerticalValuesScrollProps {
  values: ValueItem[]
}

export function VerticalValuesScroll({ values }: VerticalValuesScrollProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return

      const scrollPosition = scrollRef.current.scrollTop
      const sectionHeight = scrollRef.current.clientHeight
      const newIndex = Math.round(scrollPosition / sectionHeight)

      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < values.length) {
        setActiveIndex(newIndex)
      }
    }

    const scrollContainer = scrollRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll)
      return () => scrollContainer.removeEventListener("scroll", handleScroll)
    }
  }, [activeIndex, values.length])

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-8 items-stretch h-full">
        {/* Left side - Text content */}
        <div
          ref={scrollRef}
          className="h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide ml-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {values.map((value, index) => (
            <div key={index} className="h-full flex flex-col justify-center snap-start snap-always px-4 lg:px-6">
              <div
                className={`transition-all duration-500 ${
                  index === activeIndex ? "opacity-100 translate-x-0" : "opacity-30 -translate-x-6"
                }`}
              >
                <h3 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">{value.title}</h3>
                <p className="text-lg lg:text-xl text-primary-foreground/90 leading-relaxed">{value.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right side - Image */}
        <div className="relative h-full hidden lg:flex items-stretch">
          <div className="relative w-full h-full">
            {values.map((value, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ${
                  index === activeIndex ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 z-0"
                }`}
              >
                <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src={value.imageSrc || "/placeholder.svg"}
                    alt={value.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator dots */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
        {values.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollTo({
                  top: index * scrollRef.current.clientHeight,
                  behavior: "smooth",
                })
              }
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === activeIndex ? "bg-primary-foreground h-8" : "bg-primary-foreground/30"
            }`}
            aria-label={`Go to ${values[index].title}`}
          />
        ))}
      </div>
    </div>
  )
}
