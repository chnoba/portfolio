import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';

export const ShimmerMaterial = shaderMaterial(
    {
        uMap: new THREE.Texture(),
        uTime: 0,
        uColor: new THREE.Color('#ffffff'),
        uOpacity: 1.0,
    },
    // Vertex Shader
    `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
    // Fragment Shader
    `
  uniform sampler2D uMap;
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec2 vUv;

  // Función para corregir el color y que no se vea oscuro
  vec3 LinearToSRGB(vec3 color) {
    return pow(color, vec3(1.0 / 2.2));
  }

  void main() {
    vec4 texColor = texture2D(uMap, vUv);
    
    if (texColor.a < 0.1) discard;

    // Brillo diagonal
    float progress = mod(uTime * 1.5, 2.5) - 0.5;
    float currentPos = vUv.x + vUv.y;
    float shine = step(progress, currentPos) * step(currentPos, progress + 0.15);
    
    // Mezclamos el color
    vec3 finalColor = mix(texColor.rgb, uColor, shine * 0.4);

    // APLICAMOS LA CORRECCIÓN DE COLOR AQUÍ
    // Esto devuelve el brillo original que perdiste al usar un shader
    gl_FragColor = vec4(LinearToSRGB(finalColor), uOpacity * texColor.a);
  }
  `
);