export type GalaxyStage = "galaxy" | "planet" | "map";

export type TaskStatus = "done" | "active" | "locked";

export interface PlanetTask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export interface PlanetItem {
  id: string;
  name: string;
  color: string;
  radius: number;
  summary: string;
  previewTitle: string;
  tasks: PlanetTask[];
}

export interface GalaxyItem {
  id: string;
  name: string;
  color: string;
  position: [number, number, number];
  summary: string;
  planets: PlanetItem[];
}

export interface PlanetLabelPosition {
  id: string;
  name: string;
  x: number;
  y: number;
  opacity: number;
  isFront: boolean;
}
