import { useState, useEffect } from 'react';

export function useSpriteHover() {
    const [hovered, setHovered] = useState(false);

    // Efecto secundario: cambiar el cursor del body
    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto';

        // Cleanup function para resetear el cursor si el componente se desmonta
        return () => { document.body.style.cursor = 'auto'; };
    }, [hovered]);

    return { hovered, setHovered };
}