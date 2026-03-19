import {useEffect, useState} from "react";

export const useNowPlaying = (stationId: string) => {
    const [track, setTrack] = useState({ title: 'SINTONIZANDO...', author: '', artwork: '' });

    useEffect(() => {
        const controller = new AbortController();

        const fetchTrack = async (signal: AbortSignal) => {
            try {
                const res = await fetch(`/api/now-playing?id=${stationId}`, { signal });
                const rawData = await res.json();

                const cleanData = {
                    title: rawData.title?.trim() || 'NO_SIGNAL',
                    author: rawData.author?.trim() || 'UNKNOWN',
                    artwork: rawData.artwork || '',
                };

                setTrack(currentTrack => {
                    if (currentTrack.title === cleanData.title && currentTrack.author === cleanData.author) {
                        return currentTrack;
                    }
                    return cleanData;
                });
            } catch (err) {
                if (err instanceof Error && err.name === 'AbortError') return;
                setTrack(prev => ({ ...prev, title: 'STREAMING_LIVE' }));
            }
        };

        void fetchTrack(controller.signal);
        const interval = setInterval(() => void fetchTrack(controller.signal), 10000);

        return () => {
            controller.abort();
            clearInterval(interval);
        };
    }, [stationId]);

    return track;
};