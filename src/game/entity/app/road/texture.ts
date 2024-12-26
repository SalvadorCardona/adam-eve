import { Color, DoubleSide, ShaderMaterial } from "three/src/Three"

// Vertex Shader
const vertexShaderGround = `
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

// Fragment Shader
const fragmentShaderGround = `
uniform vec3 uColor;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  // Basic lighting
  vec3 light = vec3(0.5, 0.2, 1.0);
  light = normalize(light);

  // Cartoon shading
  float intensity = dot(light, vNormal);
  float d = smoothstep(0.2, 0.8, intensity);

  // Apply cartoon effect to color
  vec3 color = uColor;
  color = mix(vec3(0.0), color, d);

  // Outline effect
  float edge = 1.0 - smoothstep(0.0, 0.1, abs(intensity));
  color = mix(color, vec3(0.0), edge);

  gl_FragColor = vec4(color, 1.0);
}
`

// Shader Material
export const GroundMaterial = new ShaderMaterial({
  uniforms: {
    uColor: { value: new Color(0x333333) }, // Road color
  },
  vertexShader: vertexShaderGround,
  fragmentShader: fragmentShaderGround,
  side: DoubleSide,
})

const vertexShader = `
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

// Fragment Shader
const fragmentShader = `
uniform vec3 uColor;
uniform float uTime;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  // Simple wave effect
  float wave = sin(vPosition.x * 10.0 + uTime) * 0.1 + sin(vPosition.y * 10.0 + uTime) * 0.1;

  // Basic lighting
  vec3 light = vec3(0.5, 0.2, 1.0);
  light = normalize(light);

  // Cartoon shading
  float intensity = dot(light, vNormal);
  float d = smoothstep(0.2, 0.8, intensity);

  // Apply wave effect to color
  vec3 color = uColor + wave * 0.1;
  color = mix(vec3(0.0), color, d);

  // Outline effect
  float edge = 1.0 - smoothstep(0.0, 0.1, abs(intensity));
  color = mix(color, vec3(0.0), edge);

  gl_FragColor = vec4(color, 1.0);
}
`

// Shader Material
export const WerMaterial = new ShaderMaterial({
  uniforms: {
    uColor: { value: new Color(0x1e90ff) }, // Water color
    uTime: { value: 0.0 },
  },
  vertexShader,
  fragmentShader,
  side: DoubleSide,
})
