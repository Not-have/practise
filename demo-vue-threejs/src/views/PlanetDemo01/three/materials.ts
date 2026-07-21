import {
  AdditiveBlending,
  BackSide,
  CanvasTexture,
  Color,
  ShaderMaterial,
  SpriteMaterial,
  type Texture
} from "three";

export function createGlowTexture(color: string): Texture {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext("2d");

  if (context) {
    const gradient = context.createRadialGradient(64, 64, 4, 64, 64, 64);
    gradient.addColorStop(0, "rgba(255,255,255,0.9)");
    gradient.addColorStop(0.18, color);
    gradient.addColorStop(0.46, `${color}88`);
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 128, 128);
  }

  const texture = new CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function createGlowMaterial(color: string, opacity = 0.8): SpriteMaterial {
  return new SpriteMaterial({
    map: createGlowTexture(color),
    color,
    opacity,
    transparent: true,
    blending: AdditiveBlending,
    depthWrite: false
  });
}

export function createPlanetTexture(primary: string, secondary: string): Texture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 128;
  const context = canvas.getContext("2d");

  if (context) {
    const base = context.createLinearGradient(0, 0, 256, 128);
    base.addColorStop(0, primary);
    base.addColorStop(0.5, secondary);
    base.addColorStop(1, primary);
    context.fillStyle = base;
    context.fillRect(0, 0, 256, 128);

    for (let i = 0; i < 900; i += 1) {
      const x = Math.random() * 256;
      const y = Math.random() * 128;
      const radius = Math.random() * 1.7 + 0.2;
      const alpha = Math.random() * 0.18 + 0.04;
      context.fillStyle = `rgba(255,255,255,${alpha})`;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    }

    for (let band = 0; band < 12; band += 1) {
      const y = Math.random() * 128;
      context.strokeStyle = `rgba(255,255,255,${Math.random() * 0.1 + 0.04})`;
      context.lineWidth = Math.random() * 4 + 1;
      context.beginPath();
      context.moveTo(0, y);
      for (let x = 0; x <= 256; x += 16) {
        context.lineTo(x, y + Math.sin(x * 0.04 + band) * (Math.random() * 5 + 1));
      }
      context.stroke();
    }
  }

  const texture = new CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function createFresnelMaterial(color: string, opacity = 0.7): ShaderMaterial {
  const glowColor = new Color(color);

  return new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    side: BackSide,
    uniforms: {
      uColor: { value: glowColor },
      uOpacity: { value: opacity }
    },
    vertexShader: `
      varying vec3 vWorldPosition;
      varying vec3 vWorldNormal;

      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        vWorldNormal = normalize(mat3(modelMatrix) * normal);
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uOpacity;
      varying vec3 vWorldPosition;
      varying vec3 vWorldNormal;

      void main() {
        vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
        float fresnel = pow(1.0 - max(dot(viewDirection, normalize(vWorldNormal)), 0.0), 2.2);
        gl_FragColor = vec4(uColor, fresnel * uOpacity);
      }
    `
  });
}
