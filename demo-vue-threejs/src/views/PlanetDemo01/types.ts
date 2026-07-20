import type { Vector3 } from "three";

export type SceneStage = "universe" | "entering" | "ai-system" | "planet-selected";

export interface GalaxyDefinition {
  id: string;
  name: string;
  position: [number, number, number];
  color: string;
  accent: string;
  size: number;
  particleCount: number;
  isPrimary?: boolean;
}

export interface AgentNode {
  id: string;
  name: string;
  summary: string;
  color: string;
  position: [number, number, number];
  radius: number;
  tags: string[];
  resources: string[];
  resourceCount: number;
  orbitRadius?: number;
  orbitSpeed?: number;
  orbitPhase?: number;
}

export interface SceneLabel {
  id: string;
  kind: "galaxy" | "planet";
  text: string;
  x: number;
  y: number;
  active: boolean;
  highlighted: boolean;
  visible: boolean;
}

export interface TooltipState {
  visible: boolean;
  text: string;
  x: number;
  y: number;
}

export interface PickableObject {
  userData: {
    kind: "galaxy" | "planet";
    id: string;
  };
}

export interface CameraPose {
  position: Vector3;
  target: Vector3;
}
