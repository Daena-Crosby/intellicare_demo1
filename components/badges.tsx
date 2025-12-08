import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Badge Component Variants
 *
 * Defines the visual styles for badge components using class-variance-authority (CVA).
 * Badges are used throughout the app to display:
 * - Doctor specialties (blue)
 * - Work preferences (dark)
 * - Countries (outline)
 * - Status indicators
 *
 * Variants:
 * - default: Primary colored badge with contrasting text
 * - secondary: Secondary colored badge
 * - destructive: Red badge for warnings/errors
 * - outline: Border-only badge with transparent background
 */
const badgeVariants = cva(
  // Base styles applied to all badges
  "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border border-input text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

/**
 * Badge Component
 *
 * A versatile badge component for displaying tags, labels, and status indicators.
 *
 * Usage:
 * ```tsx
 * <Badge>Default</Badge>
 * <Badge variant="secondary">Secondary</Badge>
 * <Badge variant="outline">Outlined</Badge>
 * <Badge className="bg-blue-600 text-white">Custom</Badge>
 * ```
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
