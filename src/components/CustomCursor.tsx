import { useEffect, useState, useCallback } from 'react';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [cursorState, setCursorState] = useState<'normal' | 'pointer' | 'click'>('normal');
    const [isVisible, setIsVisible] = useState(false);

    // Función para evaluar el estado actual (la sacamos para reutilizarla)
    const updateCursorState = useCallback((target: HTMLElement) => {
        const isInteractive = !!target.closest('button, a, input[type="range"], .cursor-pointer, .vinyl');
        const isSceneHovering = document.body.classList.contains('is-hovering');

        setCursorState((prev) => {
            if (prev === 'click') return 'click';
            return (isInteractive || isSceneHovering) ? 'pointer' : 'normal';
        });
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true);
            setPosition({ x: e.clientX, y: e.clientY });
            updateCursorState(e.target as HTMLElement);
        };

        const handleMouseDown = () => {
            setCursorState((prev) => (prev === 'pointer' ? 'click' : prev));
        };

        const handleMouseUp = (e: MouseEvent) => {
            // Al soltar, forzamos la re-evaluación del estado
            const target = e.target as HTMLElement;
            const isInteractive = !!target.closest('button, a, input[type="range"], .cursor-pointer, .vinyl');
            const isSceneHovering = document.body.classList.contains('is-hovering');
            setCursorState((isInteractive || isSceneHovering) ? 'pointer' : 'normal');
        };

        // RESET TOTAL: Se dispara al volver a la pestaña o al salir
        const resetAllStates = () => {
            setIsVisible(false);
            setCursorState('normal');
            // Limpiamos clases del body por si quedaron trabadas
            document.body.classList.remove('is-clicking', 'is-hovering');
        };

        const handleWindowFocus = () => {
            setIsVisible(true);
        };

        const handleMouseOut = (e: MouseEvent) => {
            if (!e.relatedTarget) setIsVisible(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseout', handleMouseOut);

        // Eventos de ventana para evitar el bug de las pestañas
        window.addEventListener('blur', resetAllStates);
        window.addEventListener('focus', handleWindowFocus);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseout', handleMouseOut);
            window.removeEventListener('blur', resetAllStates);
            window.removeEventListener('focus', handleWindowFocus);
        };
    }, [isVisible, updateCursorState]);

    const config = {
        normal:  { img: '/cursors/cursor.png',  size: 48 },
        pointer: { img: '/cursors/pointer.png', size: 60 },
        click:   { img: '/cursors/click.png',   size: 48 },
    };

    const current = config[cursorState] || config.normal;

    return (
        <div
            className="custom-cursor"
            aria-hidden="true"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: `${current.size}px`,
                height: `${current.size}px`,
                backgroundImage: `url(${current.img})`,
                position: 'fixed',
                pointerEvents: 'none',
                zIndex: 99999,
                transform: 'translate(-5%, -5%)',
                imageRendering: 'pixelated',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                display: isVisible ? 'block' : 'none',
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.1s linear, width 0.2s ease, height 0.2s ease',
            }}
        />
    );
}