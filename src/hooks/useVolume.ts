import { useState } from 'react';

export const useVolume = (initialVolume: number = 50) => {
    const [volume, setVolume] = useState(initialVolume);
    const [lastVolume, setLastVolume] = useState(0);

    const toggleMute = () => {
        if (volume > 0) {
            setLastVolume(volume);
            setVolume(0);
        } else {
            setVolume(lastVolume > 0 ? lastVolume : 50);
            setLastVolume(0);
        }
    };

    const updateVolume = (newVol: number) => {
        setVolume(newVol);
        if (newVol > 0) setLastVolume(0);
    };

    return { volume, toggleMute, updateVolume };
};