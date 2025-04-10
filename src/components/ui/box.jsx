import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { cn } from '@/utils/class-names.utils'
import { Slot } from '@radix-ui/react-slot'
import { TimerStore } from '@/state/timer.store'

export const Box = forwardRef(
    ({ onClickOutside, asChild, gameResponsive = false, ...props }, forwardedRef) => {
        const Comp = asChild ? Slot : 'div'

        const ref = useRef(null)
        const { isRunning, isPaused } = TimerStore.useStore('isRunning', 'isPaused')

        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                onClickOutside && onClickOutside(e)
            }
        }

        useImperativeHandle(forwardedRef, () => ref.current, [])

        useEffect(() => {
            document.addEventListener('mousedown', handleClickOutside)
            return () => {
                document.removeEventListener('mousedown', handleClickOutside)
            }
        })

        return (
            <Comp
                ref={ref}
                {...props}
                className={cn(
                    'transition-opacity',
                    props.className,
                    gameResponsive && !isPaused && isRunning && 'opacity-0'
                )}
            >
                {props.children}
            </Comp>
        )
    }
)
