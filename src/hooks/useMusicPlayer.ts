import { useState } from 'react';
import type { Radio } from 'astro:db';

type RadioStation = typeof Radio.$inferSelect;

export function useMusicPlayer(stations: RadioStation[]) { {
    const [index, setIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const current = stations[index];

    const togglePlay = () => setIsPlaying(!isPlaying);
    const next = () => setIndex((index + 1) % stations.length);
    const prev = () => setIndex((index - 1 + stations.length) % stations.length);

    return {
        current,
        isPlaying,
        togglePlay,
        next,
        prev,
        status: isPlaying ? 'PLAYING' : 'PAUSED'
    };
}
}