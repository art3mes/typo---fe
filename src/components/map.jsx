import React from 'react';

export function For(props) {
    if (!props.each || props.each.length === 0) return props.whenEmpty || null;
    const content = props.each.map((item, i) => props.children(item, i));
    return <>{content}</>;
}
