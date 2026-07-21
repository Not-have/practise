import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  Group,
  Mesh,
  MeshBasicMaterial,
  Points,
  ShaderMaterial,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  Texture,
  Vector3
} from "three";
import type { GalaxyDefinition } from "../types";
import { createGlowMaterial } from "./materials";

const sharedCoreGeometry = new SphereGeometry(1, 32, 24);
const sharedHitGeometry = new SphereGeometry(1, 16, 12);

export class Galaxy {
  public readonly definition: GalaxyDefinition;

  public readonly group = new Group();

  public readonly hitMesh: Mesh<SphereGeometry, MeshBasicMaterial>;

  private readonly core: Mesh<SphereGeometry, MeshBasicMaterial>;

  private readonly particles: Points<BufferGeometry, ShaderMaterial>;

  private readonly spiralMist: Sprite;

  private readonly glow: Sprite;

  private hover = false;

  private selected = false;

  private fade = 1;

  private transitionScale: number | null = null;

  constructor(definition: GalaxyDefinition) {
    this.definition = definition;
    this.group.position.set(...definition.position);
    this.group.userData.id = definition.id;

    const color = new Color(definition.color);
    const accent = new Color(definition.accent);

    this.core = new Mesh(
      sharedCoreGeometry,
      new MeshBasicMaterial({
        color: definition.isPrimary ? "#f7fbff" : color,
        transparent: true,
        opacity: definition.isPrimary ? 0.78 : 0.56,
        blending: AdditiveBlending,
        depthWrite: false
      })
    );
    this.core.scale.setScalar(definition.size * (definition.isPrimary ? 0.1 : 0.12));
    this.group.add(this.core);

    this.glow = new Sprite(createGlowMaterial(definition.color, definition.isPrimary ? 0.78 : 0.56));
    this.glow.scale.set(definition.size * 3.2, definition.size * 1.78, 1);
    this.group.add(this.glow);

    this.spiralMist = new Sprite(
      new SpriteMaterial({
        map: this.createSpiralTexture(definition),
        transparent: true,
        opacity: definition.isPrimary ? 1 : 0.88,
        blending: AdditiveBlending,
        depthWrite: false
      })
    );
    this.spiralMist.scale.set(definition.size * 2.28, definition.size * 1.28, 1);
    this.group.add(this.spiralMist);

    const attributes = this.createSpiralAttributes(definition);
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(attributes.positions, 3));
    geometry.setAttribute("aColor", new BufferAttribute(attributes.colors, 3));
    geometry.setAttribute("aSize", new BufferAttribute(attributes.sizes, 1));
    geometry.setAttribute("aAlpha", new BufferAttribute(attributes.alphas, 1));

    this.particles = new Points(
      geometry,
      new ShaderMaterial({
        transparent: true,
        blending: AdditiveBlending,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uOpacity: { value: definition.isPrimary ? 2.6 : 1.85 },
          uHover: { value: 0 }
        },
        vertexShader: `
          attribute vec3 aColor;
          attribute float aSize;
          attribute float aAlpha;
          uniform float uTime;
          uniform float uHover;
          varying vec3 vColor;
          varying float vAlpha;

          void main() {
            vec3 animated = position;
            float shimmer = sin(uTime * 1.7 + position.x * 1.3 + position.y * 0.8) * 0.5 + 0.5;
            animated.z += sin(uTime * 0.45 + position.x * 0.9) * 0.018;
            vec4 mvPosition = modelViewMatrix * vec4(animated, 1.0);
            vColor = aColor * (2.2 + shimmer * 0.92 + uHover * 0.5);
            vAlpha = min(aAlpha * (1.2 + shimmer * 0.45 + uHover * 0.35), 1.0);
            gl_PointSize = aSize * (420.0 / max(-mvPosition.z, 5.0)) * (1.0 + uHover * 0.22);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform float uOpacity;
          varying vec3 vColor;
          varying float vAlpha;

          void main() {
            vec2 uv = gl_PointCoord - vec2(0.5);
            float distanceToCenter = length(uv);
            float particle = 1.0 - smoothstep(0.05, 0.5, distanceToCenter);
            gl_FragColor = vec4(vColor, min(particle * vAlpha * uOpacity, 1.0));
          }
        `
      })
    );
    this.particles.rotation.z = definition.isPrimary ? -0.12 : 0.08;
    this.group.add(this.particles);

    this.hitMesh = new Mesh(
      sharedHitGeometry,
      new MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
        depthWrite: false
      })
    );
    this.hitMesh.scale.setScalar(definition.size * 1.55);
    this.hitMesh.userData = {
      kind: "galaxy",
      id: definition.id
    };
    this.group.add(this.hitMesh);
  }

  update(delta: number, elapsed: number): void {
    const hoverBoost = this.hover || this.selected ? 2.05 : 1;
    const primaryBoost = this.definition.isPrimary ? 1.25 : 1;
    this.particles.rotation.z += delta * 0.13 * hoverBoost * primaryBoost;
    this.particles.rotation.x = Math.sin(elapsed * 0.18 + this.definition.size) * 0.025;
    this.spiralMist.material.rotation += delta * 0.04 * hoverBoost * primaryBoost;
    this.particles.material.uniforms.uTime!.value = elapsed;
    this.particles.material.uniforms.uHover!.value += (((this.hover || this.selected) ? 1 : 0) - this.particles.material.uniforms.uHover!.value) * 0.12;
    this.core.rotation.y += delta * 0.35;

    const pulse = 1 + Math.sin(elapsed * 1.4 + this.definition.size) * 0.025;
    const targetScale = (this.transitionScale ?? (this.hover || this.selected ? 1.12 : 1)) * pulse;
    this.group.scale.lerp(new Vector3(targetScale, targetScale, targetScale), 0.09);

    const active = this.hover || this.selected;
    this.core.material.opacity = this.fade * (active ? 0.9 : this.definition.isPrimary ? 0.72 : 0.5);
    this.particles.material.uniforms.uOpacity!.value = this.fade * (active ? 3.0 : this.definition.isPrimary ? 2.55 : 1.75);
    this.spiralMist.material.opacity = this.fade * (active ? 1 : this.definition.isPrimary ? 0.9 : 0.64);
    this.glow.material.opacity = this.fade * (active ? 0.9 : this.definition.isPrimary ? 0.72 : 0.5);
  }

  setHover(value: boolean): void {
    this.hover = value;
  }

  setSelected(value: boolean): void {
    this.selected = value;
  }

  setFade(value: number): void {
    this.fade = value;
    this.group.visible = value > 0.01;
  }

  setTransitionScale(value: number): void {
    this.transitionScale = value;
  }

  getLabelPosition(target = new Vector3()): Vector3 {
    return target.copy(this.group.position).add(new Vector3(0, -this.definition.size * 1.22, 0));
  }

  dispose(): void {
    this.core.material.dispose();
    this.spiralMist.material.map?.dispose();
    this.spiralMist.material.dispose();
    this.particles.geometry.dispose();
    this.particles.material.dispose();
    this.glow.material.map?.dispose();
    this.glow.material.dispose();
    this.hitMesh.material.dispose();
  }

  private createSpiralAttributes(definition: GalaxyDefinition): {
    positions: Float32Array;
    colors: Float32Array;
    sizes: Float32Array;
    alphas: Float32Array;
  } {
    const positions = new Float32Array(definition.particleCount * 3);
    const colors = new Float32Array(definition.particleCount * 3);
    const sizes = new Float32Array(definition.particleCount);
    const alphas = new Float32Array(definition.particleCount);
    const arms = definition.isPrimary ? 4 : 4;
    const white = new Color("#f8fbff");
    const blue = new Color("#a8cdfd");
    const accent = new Color(definition.accent);
    const outer = new Color(definition.color);
    const color = new Color();

    for (let i = 0; i < definition.particleCount; i += 1) {
      const isDust = Math.random() > 0.74;
      const radius = Math.pow(Math.random(), isDust ? 0.38 : 0.68) * definition.size;
      const arm = i % arms;
      const twist = radius * (definition.isPrimary ? 1.15 : 1.05);
      const armAngle = (arm / arms) * Math.PI * 2 + twist;
      const dustAngle = Math.random() * Math.PI * 2;
      const scatter = (isDust ? 0.56 : 0.08 + radius * 0.035) * definition.size * 0.16;
      const angle = isDust ? dustAngle : armAngle + (Math.random() - 0.5) * (0.22 + radius * 0.018);
      const x = Math.cos(angle) * radius * 1.08 + (Math.random() - 0.5) * scatter;
      const y = Math.sin(angle) * radius * 0.58 + (Math.random() - 0.5) * scatter * 0.72;
      const centerPull = 1 - Math.min(radius / definition.size, 1);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = (Math.random() - 0.5) * definition.size * (isDust ? 0.12 : 0.045);

      if (isDust) {
        color.copy(outer).lerp(blue, 0.55 + Math.random() * 0.3);
      } else {
        color.copy(accent).lerp(white, 0.62 + centerPull * 0.36);
      }

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      sizes[i] = (definition.isPrimary ? 0.24 : 0.18) * (isDust ? 0.84 : 1.5 + centerPull * 1.6) * (0.72 + Math.random() * 0.72);
      alphas[i] = isDust ? 0.42 + Math.random() * 0.48 : Math.min(0.95 + centerPull * 0.6, 1);
    }

    return {
      positions,
      colors,
      sizes,
      alphas
    };
  }

  private createSpiralTexture(definition: GalaxyDefinition): Texture {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext("2d");

    if (!context) {
      return new CanvasTexture(canvas);
    }

    const center = 256;
    const arms = 4;
    const accent = new Color(definition.accent);
    const color = new Color(definition.color);

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.globalCompositeOperation = "lighter";

    const coreGradient = context.createRadialGradient(center, center, 0, center, center, 78);
    coreGradient.addColorStop(0, "rgba(255,255,255,0.95)");
    coreGradient.addColorStop(0.34, `rgba(${Math.round(accent.r * 255)},${Math.round(accent.g * 255)},${Math.round(accent.b * 255)},0.42)`);
    coreGradient.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = coreGradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (let arm = 0; arm < arms; arm += 1) {
      for (let pass = 0; pass < 2; pass += 1) {
        context.save();
        context.beginPath();
        context.lineCap = "round";
        context.lineJoin = "round";
        context.shadowColor = "rgba(168,205,253,0.8)";
        context.shadowBlur = pass === 0 ? 18 : 8;
        context.strokeStyle = pass === 0 ? "rgba(140,190,255,0.24)" : "rgba(255,255,255,0.42)";
        context.lineWidth = pass === 0 ? 12 : 5;

        for (let step = 0; step < 110; step += 1) {
          const radius = 14 + step * 1.78;
          const angle = (arm / arms) * Math.PI * 2 + radius * 0.026;
          const x = center + Math.cos(angle) * radius;
          const y = center + Math.sin(angle) * radius * 0.58;

          if (step === 0) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        }

        context.stroke();
        context.restore();
      }
    }

    for (let i = 0; i < 8200; i += 1) {
      const isDust = Math.random() > 0.72;
      const arm = i % arms;
      const radius = Math.pow(Math.random(), isDust ? 0.36 : 0.68) * 218;
      const twist = radius * 0.026;
      const angle = isDust ? Math.random() * Math.PI * 2 : (arm / arms) * Math.PI * 2 + twist + (Math.random() - 0.5) * (0.18 + radius * 0.0018);
      const spread = isDust ? 28 + radius * 0.08 : 4 + radius * 0.028;
      const x = center + Math.cos(angle) * radius + (Math.random() - 0.5) * spread;
      const y = center + Math.sin(angle) * radius * 0.58 + (Math.random() - 0.5) * spread * 0.72;
      const centerBoost = 1 - Math.min(radius / 218, 1);
      const dotSize = isDust ? Math.random() * 0.9 + 0.25 : Math.random() * 2.4 + 0.85 + centerBoost * 1.7;
      const alpha = isDust ? Math.random() * 0.16 + 0.05 : Math.random() * 0.28 + 0.48 + centerBoost * 0.26;
      const mix = isDust ? 0.3 : 0.86 + centerBoost * 0.12;
      const drawColor = color.clone().lerp(accent, 0.55).lerp(new Color("#ffffff"), mix);

      context.fillStyle = `rgba(${Math.round(drawColor.r * 255)},${Math.round(drawColor.g * 255)},${Math.round(drawColor.b * 255)},${alpha})`;
      context.beginPath();
      context.arc(x, y, dotSize, 0, Math.PI * 2);
      context.fill();
    }

    const texture = new CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }
}
