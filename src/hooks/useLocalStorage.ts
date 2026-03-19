import { useState, useEffect } from 'react';

export function usePersistedState<T>(key: string, defaultValue: T) {
    const [state, setState] = useState<T>(defaultValue);

    useEffect(() => {
        const saved = localStorage.getItem(key);

        if (saved) {
            try {
                setState(JSON.parse(saved));
            } catch (e) {
                console.error("Error parsing storage", e);
            }
        }
    }, [key]);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState] as const;
}