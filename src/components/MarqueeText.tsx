import React, { useRef, useEffect, useState } from 'react';

interface MarqueeTextProps {
    children: string;
    play?: boolean;
    speed?: number;
    bounce?: boolean;
    gradient?: boolean;
    className?: string;
}

export const MarqueeText: React.FC<MarqueeTextProps> = ({
                                                            children,
                                                            play = true,
                                                            speed = 35,
                                                            bounce = true,
                                                            gradient = false,
                                                            className = ""
                                                        }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const [distance, setDistance] = useState(0);

    // Definimos el ancho del gradiente (w-12 en Tailwind = 48px)
    const GRADIENT_WIDTH = 48;

    useEffect(() => {
        const calculate = () => {
            if (containerRef.current && textRef.current) {
                const containerW = containerRef.current.getBoundingClientRect().width;
                const textW = textRef.current.getBoundingClientRect().width;

                if (textW > containerW) {
                    // CÁLCULO LÓGICO:
                    // Distancia = (Ancho Texto - Ancho Contenedor) + Ancho Gradiente + Buffer
                    const extraSpace = gradient ? (GRADIENT_WIDTH /2) : 0;
                    const totalDistance = (textW - containerW) + extraSpace + 4;

                    setDistance(Math.ceil(totalDistance));
                } else {
                    setDistance(0);
                }
            }
        };

        calculate();
        const timer = setTimeout(calculate, 500); // Buffer para carga de fuentes

        const resizeObserver = new ResizeObserver(calculate);
        if (containerRef.current) resizeObserver.observe(containerRef.current);

        return () => {
            clearTimeout(timer);
            resizeObserver.disconnect();
        };
    }, [children, gradient]);

    const duration = distance / speed;

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden w-full min-w-0 ${className}`}
            style={{
                // @ts-ignore
                '--distance': `${distance}px`,
                '--duration': `${duration}s`
            } as React.CSSProperties}
        >
            <span
                ref={textRef}
                className={`marquee-content ${
                    play && distance > 0
                        ? (bounce ? 'animate-marquee-bounce' : 'animate-marquee')
                        : 'is-paused'
                }`}
            >
                {children}
            </span>

            {/* Gradiente a la derecha */}
            {gradient && distance > 0 && (
                <div
                    style={{ width: `${GRADIENT_WIDTH}px` }}
                    className="absolute top-0 right-0 h-full pointer-events-none bg-gradient-to-l from-background-dark-green to-transparent z-10"
                />
            )}
        </div>
    );
};