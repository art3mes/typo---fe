import React from 'react';
import { cn } from '../utils/classnames.utils';
import { TimerStore } from '../state/timer.store';
import { useEngine } from '../state/gameEngine.store';

export const Caret = (props) => {
    const { caretPosition: pos } = useEngine('caretPosition');
    const { isRunning, isPaused } = TimerStore.useStore('isRunning', 'isPaused');

    return (
        <div
            style={{
                top: pos.y - 24 * 0.3,
                left: pos.x,
                height: '1em',
                width: '2px',
                transition: '0.1s linear',
            }}
            className={cn(
                'absolute -z-10 -translate-y-full bg-caret shadow-md',
                (isPaused || !isRunning) && 'animate-blink',
                props.className,
            )}
        />
    );
};
