import { useTexture } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import { useRef, useEffect, useMemo, useState} from 'react';
import * as THREE from 'three';
import { SPRITES } from '../../constants/scene';
import { useSpriteTransform } from '../../hooks/useSpriteTransform';
import { useSpriteHover } from '../../hooks/useSpriteHover';
import { ShimmerMaterial } from '../../shaders/ShimmerMaterial'; // Nombre corregido

interface Props {
    type: keyof typeof SPRITES;
    parallaxFactor?: number;
    onHover?: (isHovered: boolean) => void;
    visible?: boolean;
    enableShimmer?: boolean;
}

export default function SceneSprite({ type, parallaxFactor = 0, onHover, visible = true, enableShimmer = false }: Props) {
    const data = SPRITES[type];
    const { viewport, camera } = useThree();

    // Referencias para los materiales
    const standardMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
    const shimmerMaterialInstance = useMemo(() => new ShimmerMaterial(), []);

    // --- TU LÓGICA DE RESOLUCIÓN (MANTENIDA INTACTA) ---
    const currentViewport = viewport.getCurrentViewport(camera, new THREE.Vector3(0, 0, data.z));
    const scale = Math.max(currentViewport.width / 640, currentViewport.height / 360);
    const w = data.width * scale;
    const h = data.height * scale;
    // ----------------------------------------------------

    const { meshRef } = useSpriteTransform(data, parallaxFactor);
    const { hovered, setHovered } = useSpriteHover();
    const [isPressed, setIsPressed] = useState(false);

    useEffect(() => {
        if (!data.interactive) return;

        // Manejamos las clases en el body (nuestro CSS se encarga del resto)
        if (hovered) {
            document.body.classList.add('is-hovering');
        } else {
            document.body.classList.remove('is-hovering');
        }

        if (isPressed) {
            document.body.classList.add('is-clicking');
        } else {
            document.body.classList.remove('is-clicking');
        }

        return () => {
            document.body.classList.remove('is-hovering');
            document.body.classList.remove('is-clicking');
        };
    }, [hovered, isPressed, data.interactive]);

    const texture = useTexture(data.asset.src);
    texture.magFilter = texture.minFilter = THREE.NearestFilter;
    texture.colorSpace = THREE.SRGBColorSpace
    const isCharacter = type === 'character';

    useFrame((state) => {
        const targetOpacity = visible ? 1 : 0;

        if (isCharacter && enableShimmer) {
            // Actualizamos los parámetros del shader directamente en la instancia
            shimmerMaterialInstance.uMap = texture;
            shimmerMaterialInstance.uTime = state.clock.elapsedTime;
            // Suavizado de opacidad para el shader
            shimmerMaterialInstance.uOpacity = THREE.MathUtils.lerp(shimmerMaterialInstance.uOpacity, targetOpacity, 0.05);
        } else if (standardMaterialRef.current) {
            // Suavizado de opacidad para material estándar
            standardMaterialRef.current.opacity = THREE.MathUtils.lerp(standardMaterialRef.current.opacity, targetOpacity, 0.05);
        }
    });

    return (
        <mesh
            ref={meshRef}
            onPointerOver={() => {
                if (data.interactive) {
                    setHovered(true);
                    onHover?.(true);
                }
            }}
            onPointerOut={() => {
                if (data.interactive) {
                    setHovered(false);
                    onHover?.(false);
                }
            }}
        >
            <planeGeometry args={[w, h]} />

            {isCharacter && enableShimmer ? (
                /* Usamos 'primitive' para inyectar el material manual sin
                   necesidad de registrarlo en IntrinsicElements */
                <primitive object={shimmerMaterialInstance} attach="material" transparent />
            ) : (
                <meshBasicMaterial
                    ref={standardMaterialRef}
                    map={texture}
                    transparent={true}
                    opacity={type === 'border' ? 0 : 1}
                />
            )}
        </mesh>
    );
}