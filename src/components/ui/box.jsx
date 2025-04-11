import {
    forwardRef,
    useRef,
    useEffect,
    useImperativeHandle,
} from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../utils/classnames.utils'
import { TimerStore } from '@/state/timer.store'

export const Box = forwardRef(function Box(
    {
        onClickOutside,
        asChild = false,
        gameResponsive = false,
        className,
        children,
        ...props
    },
    forwardedRef
) {
    const Comp = asChild ? Slot : 'div'
    const localRef = useRef(null)

    const { isRunning, isPaused } = TimerStore.useStore('isRunning', 'isPaused')

    useImperativeHandle(forwardedRef, () => localRef.current)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (localRef.current && !localRef.current.contains(e.target)) {
                onClickOutside?.(e)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [onClickOutside])

    return (
        <Comp
            ref={localRef}
            className={cn(
                'transition-opacity',
                className,
                gameResponsive && isRunning && !isPaused && 'opacity-0'
            )}
            {...props}
        >
            {children}
        </Comp>
    )
})
