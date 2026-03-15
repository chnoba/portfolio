import {useEffect, useState} from "react";

export const useNowPlaying = (stationId: string) => {
    const [track, setTrack] = useState({
        title: 'Sintonizando...',
        author: '',
        artwork: ''
    });

    useEffect(() => {
        const fetchTrack = async () => {
            try {
                const res = await fetch(`/api/now-playing?id=${stationId}`);
                const newData = await res.json();
                setTrack(currentTrack => {
                    if (currentTrack.title === newData.title && currentTrack.author === newData.author) {
                        return currentTrack; // Si devolvés exactamente el mismo objeto, React NO re-renderiza
                    }
                    return newData;
                });
            } catch {
                setTrack(prev => ({ ...prev, title: 'Streaming en vivo' }));
            }
        };

        fetchTrack();
        const interval = setInterval(fetchTrack, 10000);
        return () => clearInterval(interval);
    }, [stationId]);

    return track;
};