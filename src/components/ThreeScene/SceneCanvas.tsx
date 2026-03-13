import { Canvas } from '@react-three/fiber';
import SceneSprite from './SceneSprite';
import { useState } from "react";

export default function SceneCanvas() {
    const [showBorder, setShowBorder] = useState(false);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            <Canvas
                orthographic
                camera={{ zoom: 1, position: [0, 0, 100] }}
                gl={{ antialias: false, toneMapping: 0 }}
            >
                {/* Estos no tienen parallaxFactor, por lo que no se moverán */}
                <SceneSprite type="background" />
                <SceneSprite type="character" enableShimmer={true} onHover={setShowBorder} />
                <SceneSprite type="chair" />
                <SceneSprite type="border" visible={showBorder} />

                {/* Único objeto con movimiento */}
                <SceneSprite type="mueble" parallaxFactor={0.01} />
            </Canvas>
        </div>
    );
}