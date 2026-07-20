import {
  AdditiveBlending,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  SphereGeometry,
  Sprite,
  Vector3
} from "three";
import type { AgentNode } from "../types";
import {
  createFresnelMaterial,
  createGlowMaterial,
  createPlanetTexture
} from "./materials";

const sharedPlanetGeometry = new SphereGeometry(1, 48, 32);
const sharedHitGeometry = new SphereGeometry(1, 18, 14);

export class Planet {
  public readonly agent: AgentNode;

  public readonly group = new Group();

  public readonly hitMesh: Mesh<SphereGeometry, MeshBasicMaterial>;

  private readonly surface: Mesh<SphereGeometry, MeshStandardMaterial>;

  private readonly fresnel: Mesh<SphereGeometry, ReturnType<typeof createFresnelMaterial>>;

  private readonly glow: Sprite;

  private readonly basePosition: Vector3;

  private hover = false;

  private selected = false;

  private dimmed = false;

  private visibility = 0;

  constructor(agent: AgentNode) {
    this.agent = agent;
    this.basePosition = new Vector3(...agent.position);
    this.group.position.copy(this.basePosition);

    const texture = createPlanetTexture(agent.color, "#13224f");

    this.surface = new Mesh(
      sharedPlanetGeometry,
      new MeshStandardMaterial({
        color: agent.color,
        emissive: agent.color,
        emissiveIntensity: 0.28,
        map: texture,
        roughness: 0.82,
        metalness: 0.08,
        transparent: true,
        opacity: 0
      })
    );
    this.surface.scale.setScalar(agent.radius);
    this.group.add(this.surface);

    this.fresnel = new Mesh(sharedPlanetGeometry, createFresnelMaterial(agent.color, 0));
    this.fresnel.scale.setScalar(agent.radius * 1.08);
    this.group.add(this.fresnel);

    this.glow = new Sprite(createGlowMaterial(agent.color, 0));
    this.glow.scale.setScalar(agent.radius * 4.3);
    this.group.add(this.glow);

    this.hitMesh = new Mesh(
      sharedHitGeometry,
      new MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: AdditiveBlending
      })
    );
    this.hitMesh.scale.setScalar(agent.radius * 1.35);
    this.hitMesh.userData = {
      kind: "planet",
      id: agent.id
    };
    this.group.add(this.hitMesh);
  }

  update(delta: number, elapsed: number): void {
    const isOrbiting = Boolean(this.agent.orbitRadius);

    if (isOrbiting && !this.selected) {
      const radius = this.agent.orbitRadius ?? 0;
      const speed = this.agent.orbitSpeed ?? 0;
      const phase = this.agent.orbitPhase ?? 0;
      const angle = phase + elapsed * speed;
      const yBob = Math.sin(elapsed * speed * 0.9 + phase) * 0.24;
      this.group.position.set(Math.cos(angle) * radius, this.basePosition.y + yBob, Math.sin(angle) * radius * 0.58);
    } else if (!this.selected) {
      this.group.position.lerp(this.basePosition, 0.02);
    }

    this.surface.rotation.y += delta * (this.agent.radius > 1.4 ? 0.15 : 0.28);
    this.surface.rotation.x += delta * 0.035;

    const targetScale = this.selected ? 1.2 : this.hover ? 1.12 : 1;
    this.group.scale.lerp(new Vector3(targetScale, targetScale, targetScale), 0.12);

    const dim = this.dimmed ? 0.35 : 1;
    const hoverBoost = this.hover || this.selected ? 1.32 : 1;
    this.surface.material.opacity = this.visibility * dim;
    this.surface.material.emissiveIntensity = 0.2 + this.visibility * dim * hoverBoost * 0.36;
    this.fresnel.material.uniforms.uOpacity!.value = this.visibility * dim * (this.selected ? 1.05 : this.hover ? 0.86 : 0.48);
    this.glow.material.opacity = this.visibility * dim * (this.selected ? 0.8 : this.hover ? 0.62 : 0.34);
  }

  setHover(value: boolean): void {
    this.hover = value;
  }

  setSelected(value: boolean): void {
    this.selected = value;
  }

  setDimmed(value: boolean): void {
    this.dimmed = value;
  }

  setVisibility(value: number): void {
    this.visibility = value;
    this.group.visible = value > 0.01;
  }

  getWorldPosition(target = new Vector3()): Vector3 {
    return this.group.getWorldPosition(target);
  }

  getLabelPosition(target = new Vector3()): Vector3 {
    return this.getWorldPosition(target).add(new Vector3(0, -this.agent.radius * 1.55, 0));
  }

  dispose(): void {
    this.surface.material.map?.dispose();
    this.surface.material.dispose();
    this.fresnel.material.dispose();
    this.glow.material.map?.dispose();
    this.glow.material.dispose();
    this.hitMesh.material.dispose();
  }
}
