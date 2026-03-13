import React from 'react'
import vinylImg from "../assets/vinyl.webp";
import { useMusic } from "../contexts/MusicContext.tsx";

const PLACEHOLDER_LABEL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

export const Vinyl = () => {
    const { isPlaying, togglePlay, current } = useMusic();
    const isSpinning = (current && isPlaying);

    return (
        <div
            onClick={togglePlay}
            className="relative w-24 h-24 cursor-pointer select-none"
        >
            {/* Contenedor de Rotación Sincronizada */}
            <div
                key={current?.id || 'idle'}
                className="w-full h-full relative animate-vinyl-spin"
                style={{
                    animationPlayState: isSpinning ? 'running' : 'paused',
                    animationDelay: '0.5s',
                    pointerEvents: 'none'
                }}
            >
                {/* 1. Etiqueta (Thumbnail) centrada */}
                <div className="absolute inset-[30%] z-0 flex items-center justify-center">
                    <img
                        src={current?.thumbnail || PLACEHOLDER_LABEL}
                        alt="cover"
                        className="w-full h-full object-cover rounded-full"
                        style={{
                            // Máscara binaria (sin suavizado)
                            WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 50%)',
                            maskImage: 'radial-gradient(circle, black 50%, transparent 50%)'
                        }}
                    />
                </div>

                {/* 2. Vinilo (Capa Superior) */}
                <img
                    src={vinylImg.src}
                    alt="vinyl"
                    className="absolute inset-0 w-full h-full z-10 pixelated"
                    draggable={false}
                />
            </div>
        </div>
    )
}