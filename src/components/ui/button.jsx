import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'

import { cn } from '../utils/classnames.utils'
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'

// Define button variants with CVA (class-variance-authority)
const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground hover:bg-primary/90',
                destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                outline: 'border border-input bg-muted border-muted-foreground/5 hover:bg-background/20 hover:text-accent-foreground',
                secondary: 'bg-secondary text-secondary-foreground border border-foreground/10 box-border hover:bg-secondary/80',
                ghost: 'hover:bg-background/20 hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
)

const Button = React.forwardRef(function Button({
    className,
    tooltipContent,
    tooltipProps,
    tooltipTriggerProps,
    tooltipContentProps,
    variant,
    size,
    asChild = false,
    ...props
}, ref) {
    const Comp = asChild ? Slot : 'button'

    const button = (
        <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        />
    )

    // Only wrap with Tooltip if tooltipContent is provided
    return tooltipContent ? (
        <Tooltip {...tooltipProps}>
            <TooltipTrigger asChild {...tooltipTriggerProps}>
                {button}
            </TooltipTrigger>
            <TooltipContent {...tooltipContentProps}>
                {tooltipContent}
            </TooltipContent>
        </Tooltip>
    ) : button
})

Button.displayName = 'Button'

export { Button, buttonVariants }
