import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  Points,
  PointsMaterial,
  Vector3
} from "three";
import type { AgentNode } from "../types";
import { Planet } from "./Planet";

export class AISystem {
  public readonly group = new Group();

  public readonly planets: Planet[];

  private readonly dust: Points<BufferGeometry, PointsMaterial>;

  private visibility = 0;

  constructor(agents: AgentNode[]) {
    this.planets = agents.map((agent) => new Planet(agent));
    this.planets.forEach((planet) => {
      this.group.add(planet.group);
    });

    const dustCount = 560;
    const positions = new Float32Array(dustCount * 3);
    const color = new Color("#8fdfff");

    for (let i = 0; i < dustCount; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.5 + Math.random() * 8.4;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1.3;
      positions[i * 3 + 2] = Math.sin(angle) * radius * 0.52;
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(positions, 3));
    this.dust = new Points(
      geometry,
      new PointsMaterial({
        color,
        size: 0.045,
        transparent: true,
        opacity: 0,
        blending: AdditiveBlending,
        depthWrite: false
      })
    );
    this.group.add(this.dust);
    this.group.visible = false;
  }

  update(delta: number, elapsed: number): void {
    this.dust.rotation.y += delta * 0.045;
    this.dust.rotation.z = Math.sin(elapsed * 0.18) * 0.05;
    this.dust.material.opacity = this.visibility * 0.62;

    this.planets.forEach((planet) => {
      planet.update(delta, elapsed);
    });
  }

  setVisibility(value: number): void {
    this.visibility = value;
    this.group.visible = value > 0.01;
    this.planets.forEach((planet) => planet.setVisibility(value));
  }

  setHover(id: string | null): void {
    this.planets.forEach((planet) => planet.setHover(planet.agent.id === id));
  }

  setSelected(id: string | null): void {
    this.planets.forEach((planet) => {
      const selected = planet.agent.id === id;
      planet.setSelected(selected);
      planet.setDimmed(Boolean(id) && !selected);
    });
  }

  getPlanetById(id: string): Planet | undefined {
    return this.planets.find((planet) => planet.agent.id === id);
  }

  getDefaultTarget(target = new Vector3()): Vector3 {
    return target.set(0, 0.3, 0);
  }

  dispose(): void {
    this.planets.forEach((planet) => planet.dispose());
    this.dust.geometry.dispose();
    this.dust.material.dispose();
  }
}
