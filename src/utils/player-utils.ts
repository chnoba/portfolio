export type VinylStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'error';

export const getVinylStatus = (isPlaying: boolean, mediaPlaying: boolean): VinylStatus => {
    if (isPlaying && !mediaPlaying) return 'loading';
    if (isPlaying && mediaPlaying) return 'playing';
    if (!isPlaying && mediaPlaying) return 'paused';
    return 'idle';
};