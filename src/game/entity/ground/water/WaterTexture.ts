import { ShaderMaterial } from "three/src/Three"

// Shader Material
export const WaterTexture = new ShaderMaterial({
  uniforms: {
    time: { value: 0 },
  },
  vertexShader: `
              varying vec2 vUv;
              void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `,
  fragmentShader: `
               uniform float time;
              varying vec2 vUv;
              void main() {
                vec2 position = vUv;
                
                // Ajout de vagues supplémentaires avec différentes fréquences et amplitudes
                float wave1 = sin(position.x * 12.0 + time * 1.2) * 0.15;
                float wave2 = cos(position.y * 18.0 + time * 0.8) * 0.1;
                float wave3 = sin((position.x + position.y) * 8.0 + time * 0.5) * 0.05;
                float wave4 = cos((position.x - position.y) * 10.0 + time * 1.5) * 0.07;
                float wave5 = sin((position.x * position.y) * 20.0 + time * 0.3) * 0.03;
                
                // Combinaison des vagues pour créer un effet plus dynamique
                float wave = wave1 + wave2 + wave3 + wave4 + wave5;
                
                // Variation de couleur en fonction des vagues
                vec3 baseColor = vec3(0.27, 0.44, 0.51);
                vec3 waveColor = vec3(wave * 0.5, wave * 0.7, wave * 0.9);
                vec3 color = baseColor + waveColor;
                
                gl_FragColor = vec4(color, 0.9);
              }
            `,
  transparent: true,
  opacity: 0.5,
})
