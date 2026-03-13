import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function useSpriteTransform(data: any, parallaxFactor: number) {
    const meshRef = useRef<THREE.Mesh>(null!);
    const { viewport, camera } = useThree();

    useFrame((state) => {
        if (!meshRef.current) return;

        const { width, height } = viewport;
        const scale = Math.max(width / 640, height / 360);

        // Posición base desde el archivo de constantes
        const targetBaseX = (data.x - 320) * scale;
        const targetBaseY = -(data.y - 180) * scale;

        // Cálculo del movimiento Parallax (X e Y)
        // Multiplicamos por la escala para que el movimiento sea proporcional al tamaño
        const parallaxX = (state.pointer.x * (width / 2)) * parallaxFactor;
        const parallaxY = (state.pointer.y * (height / 2)) * parallaxFactor;

        // Aplicamos el movimiento suave con lerp
        meshRef.current.position.x = THREE.MathUtils.lerp(
            meshRef.current.position.x,
            targetBaseX + parallaxX,
            0.02
        );
        meshRef.current.position.y = THREE.MathUtils.lerp(
            meshRef.current.position.y,
            targetBaseY + parallaxY,
            0.02
        );
    });

    return { meshRef };
}