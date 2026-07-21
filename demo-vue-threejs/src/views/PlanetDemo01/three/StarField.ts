import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Points,
  ShaderMaterial
} from "three";

export class StarField {
  public readonly points: Points<BufferGeometry, ShaderMaterial>;

  private readonly material: ShaderMaterial;

  constructor(count = 1500) {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i += 1) {
      const radius = 34 + Math.random() * 82;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3] = Math.sin(phi) * Math.cos(theta) * radius;
      positions[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * radius;
      positions[i * 3 + 2] = Math.cos(phi) * radius;
      sizes[i] = Math.random() * 1.9 + 0.45;
      phases[i] = Math.random() * Math.PI * 2;
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(positions, 3));
    geometry.setAttribute("aSize", new BufferAttribute(sizes, 1));
    geometry.setAttribute("aPhase", new BufferAttribute(phases, 1));

    this.material = new ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 1 },
        uWarp: { value: 0 }
      },
      vertexShader: `
        attribute float aSize;
        attribute float aPhase;
        uniform float uTime;
        uniform float uWarp;
        varying float vPulse;

        void main() {
          vec3 warped = position;
          vec2 direction = normalize(position.xy + vec2(0.001));
          float depth = smoothstep(-80.0, 90.0, position.z);
          warped.xy += direction * uWarp * depth * 18.0;
          warped.z += sin(uTime * 0.12 + aPhase) * 0.22;
          vec4 mvPosition = modelViewMatrix * vec4(warped, 1.0);
          vPulse = 0.72 + sin(uTime * 1.6 + aPhase) * 0.28;
          gl_PointSize = aSize * (360.0 / max(-mvPosition.z, 6.0)) * (1.0 + uWarp * 1.5);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float uOpacity;
        varying float vPulse;

        void main() {
          vec2 uv = gl_PointCoord - vec2(0.5);
          float strength = 1.0 - smoothstep(0.05, 0.5, length(uv));
          vec3 color = mix(vec3(0.45, 0.68, 1.0), vec3(1.0), vPulse);
          gl_FragColor = vec4(color, strength * vPulse * uOpacity);
        }
      `
    });

    this.points = new Points(geometry, this.material);
    this.points.frustumCulled = false;
  }

  update(elapsed: number): void {
    this.material.uniforms.uTime!.value = elapsed;
  }

  setWarp(value: number): void {
    this.material.uniforms.uWarp!.value = value;
  }

  setOpacity(value: number): void {
    this.material.uniforms.uOpacity!.value = value;
  }

  dispose(): void {
    this.points.geometry.dispose();
    this.material.dispose();
  }
}
