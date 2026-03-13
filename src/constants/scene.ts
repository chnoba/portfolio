// src/constants/scene.ts
import muebleImg from '../assets/closet.png';
import characterImg from '../assets/character.png';
import chairImg from '../assets/chair.png';
import backgroundImg from '../assets/background.png';
import borderImg from '../assets/border.png';

export const ROOM_RES = {
    width: 640,
    height: 360
};

export const SPRITES = {
    background: {
        width: 640,
        height: 360,
        asset: backgroundImg,
        x: 320, // Centro exacto (640 / 2)
        y: 180, // Centro exacto (360 / 2)
        z: -1,  // Detrás de todo
        interactive: false
    },
    character: {
        width: 27,
        height: 41,
        asset: characterImg,
        x: 326.4  ,
        y: 208,
        z: 0,    // Capa base (detrás de la silla)
        interactive: true,
    },
    border: {
        width: 29, // 27 + 1px de cada lado
        height: 43, // 41 + 1px de cada lado
        asset: borderImg,
        x: 326.3,    // Misma posición que el personaje
        y: 208,
        z: 0.2,   // Apenas por delante para evitar Z-fighting
        interactive: false,
    },
    chair: {
        width: 33,
        height: 41,
        asset: chairImg,
        x: 330.5, // Misma X que el personaje para que estén alineados
        y: 212, // Misma Y (o ajustá un par de píxeles si querés mover la silla)
        z: 0.1,  // Delante del personaje
        interactive: false
    },
    mueble: {
        width: 138,
        height: 127,
        asset: muebleImg,
        x: 580,   // Coordenada para que quede en la esquina inferior derecha
        y: 290,
        z: 0.5,
        interactive: false
    }
};

export const getProportionalSize = (imgW: number, imgH: number, viewport: any) => {
    // Escala base: Cuántas veces entra la altura lógica (360) en la altura real de la ventana
    const scale = viewport.height / ROOM_RES.height;

    return {
        width: imgW * scale,
        height: imgH * scale,
        scale: scale
    };
};