import { useEffect, useState } from 'react';
import { Moon, Sun } from '../assets/icons/ThemeIcons.tsx';

export default function ThemeSwitcher() {
    const [theme, setTheme] = useState<'light' | 'dark' | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if (saved) {
            setTheme(saved);
        } else {
            const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(systemDark ? 'dark' : 'light');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);

        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    if (!theme) return <div className="w-8 h-8" />; // Tamaño similar al botón para evitar saltos

    return (
        <button
            onClick={toggleTheme}
            aria-label={`Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}
            className="flex items-center justify-center p-2.5 hover:bg-current/20 transition-all active:scale-90 select-none group [&_path]:fill-white"
        >
            {theme === 'dark' ? (
                <Moon size={24} />
            ) : (
                <Sun size={24} />
            )}
        </button>
    );
}