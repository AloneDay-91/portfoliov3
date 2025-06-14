import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded border px-1 text-[10px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
          green: 'border-transparent border dark:border-green-400/50 dark:bg-green-400/10 dark:text-green-500 bg-green-400/20 text-green-600',
        blue: 'border-transparent border border-blue-400/50 bg-blue-400/10 text-blue-500',
        red: 'border-transparent border dark:border-red-400/50 dark:bg-red-400/10 dark:text-red-500 bg-red-400/20 text-red-600',
        yellow: 'border-transparent border dark:border-yellow-400/50 dark:bg-yellow-400/10 dark:text-yellow-500 bg-yellow-400/20 text-yellow-600',
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
