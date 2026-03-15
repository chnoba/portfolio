import React from 'react'
import vinylImg from "../assets/vinyl.webp";
import { useMusic } from "../contexts/MusicContext.tsx";
import type { VinylStatus } from "../utils/player-utils.ts";

interface VinylProps {
    status: VinylStatus;
    artwork: string;
}

export const Vinyl = ({ status, artwork }: VinylProps) => {
    const { togglePlay, current } = useMusic();

    const isSpinning = status === 'playing';
    const isLoading = status === 'loading';

    return (
        <div
            onClick={togglePlay}
            className="relative w-36 h-36 cursor-pointer select-none group flex items-center justify-center"
        >
            {/* Contenedor de Rotación */}
            <div
                key={current?.id || 'idle'}
                className="w-full h-full relative animate-vinyl-spin"
                style={{
                    animationPlayState: isSpinning ? 'running' : 'paused',
                    animationDelay: '0.5s',
                    pointerEvents: 'none'
                }}
            >
                {/* 1. Capa del Artwork (Fondo) */}
                <div className="absolute inset-[30%] z-0 overflow-hidden rounded-full bg-neutral-900">
                    {!isLoading && (
                        <img
                            src={artwork || current.thumbnail}
                            className={`w-full h-full object-cover transition-opacity duration-500 ${status === 'paused' ? 'opacity-50' : 'opacity-100'}`}
                            style={{
                                WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 50%)',
                                maskImage: 'radial-gradient(circle, black 50%, transparent 50%)'
                            }}
                        />
                    )}
                </div>

                {/* 2. Capa del Vinilo (Medio)
                   Aplicamos gris y brillo SOLO si isLoading es true
                */}
                <img
                    src={vinylImg.src}
                    alt="vinyl"
                    className={`absolute inset-0 w-full h-full z-10 pixelated transition-all duration-500 
                        ${isLoading ? 'grayscale brightness-30' : 'grayscale-0 brightness-100'}`}
                    draggable={false}
                />

                {/* 3. Capa de Carga (Superior)
                   Al estar fuera del div del artwork y tener z-20,
                   está por encima del vinilo y no se corta.
                */}
                {isLoading && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center">
                        <div className="flex gap-3"> {/* Gap aumentado para que no se amontonen */}
                            <span className="w-2 h-2 bg-white animate-bounce [animation-timing-function:steps(2)]" />
                            <span className="w-2 h-2 bg-white animate-bounce [animation-timing-function:steps(2)] [animation-delay:150ms]" />
                            <span className="w-2 h-2 bg-white animate-bounce [animation-timing-function:steps(2)] [animation-delay:300ms]" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}