import { Button } from '@/components/ui/button';
import React from 'react';

export function GameActionButton(props) {
    return (
        <Button
            onClick={props.onClick}
            variant="ghost"
            className="pointer text-md gap-2 text-muted-foreground"
            tooltipContent={
                <div className="mx-auto flex w-fit gap-1">{props.shortcut}</div>
            }
        >
            {props.icon} {props.label}
        </Button>
    );
}
