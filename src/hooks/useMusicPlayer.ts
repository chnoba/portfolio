import { useState } from 'react';
import type { RadioStation } from '../data/stations';
import {usePersistedState} from "./useLocalStorage.ts";

export function useMusicPlayer(stations: RadioStation[]) { {
    const [index, setIndex] = usePersistedState('last-station-index', 0);
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