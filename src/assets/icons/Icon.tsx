import React from 'react';

interface IconProps {
    size?: number;
    color?: string;
    children: string;
    className?: string;
    style?: React.CSSProperties;
}

export const Icon = ({
                         size = 24,
                         color = "currentColor",
                         children,
                         className = "",
                         style = {}
                     }: IconProps) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            // Combinamos el estilo obligatorio (pixelated) con el que vos pases
            style={{
                imageRendering: 'pixelated',
                ...style
            }}
        >
            <path d={children} fill={color} />
        </svg>
    );
};