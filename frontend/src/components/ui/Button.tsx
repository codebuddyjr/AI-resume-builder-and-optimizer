import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "outline" | "ghost" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // Simple class mapping instead of using class-variance-authority for now
    let baseClass = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
    
    let variantClass = ""
    if (variant === "default") {
      variantClass = "bg-primary text-primary-foreground shadow hover:bg-primary/90"
    } else if (variant === "outline") {
      variantClass = "border border-input bg-background shadow-sm hover:bg-muted hover:text-foreground"
    } else if (variant === "ghost") {
      variantClass = "hover:bg-muted hover:text-foreground"
    } else if (variant === "secondary") {
      variantClass = "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80"
    }

    let sizeClass = ""
    if (size === "default") sizeClass = "h-9 px-4 py-2"
    else if (size === "sm") sizeClass = "h-8 rounded-md px-3 text-xs"
    else if (size === "lg") sizeClass = "h-10 rounded-md px-8"
    else if (size === "icon") sizeClass = "h-9 w-9"

    return (
      <Comp
        className={`${baseClass} ${variantClass} ${sizeClass} ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
