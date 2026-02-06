import React, { createContext, useContext } from 'react';
import { useMusicPlayer } from '../hooks/useMusicPlayer';
import { useVolume } from '../hooks/useVolume';
import type { Radio } from 'astro:db';

type RadioStation = typeof Radio.$inferSelect;

interface MusicContextType {
    current: RadioStation;
    isPlaying: boolean;
    togglePlay: () => void;
    next: () => void;
    prev: () => void;
    volume: number;
    updateVolume: (v: number) => void;
    toggleMute: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider = ({ children, stations }: { children: React.ReactNode, stations: RadioStation[] }) => {
    const music = useMusicPlayer(stations);
    const volumeData = useVolume(50);

    const value = { ...music, ...volumeData };

    return (
        <MusicContext.Provider value={value}>
            {children}
        </MusicContext.Provider>
    );
};

export const useMusic = () => {
    const context = useContext(MusicContext);
    if (!context) throw new Error("useMusic debe usarse dentro de MusicProvider");
    return context;
};