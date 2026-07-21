import gsap from "gsap";
// The current project has three installed without its declaration package.
// This view keeps the runtime dependency local and avoids changing root deps.
// @ts-expect-error three types are not installed in this project
import * as THREE from "three";

import type {
  GalaxyItem,
  PlanetLabelPosition,
  PlanetItem
} from "../types";

interface GalaxySceneOptions {
  container: HTMLElement;
  data: GalaxyItem[];
  onSelectGalaxy: (id: string) => void;
  onSelectPlanet: (id: string) => void;
  onPlanetLabelsChange?: (labels: PlanetLabelPosition[]) => void;
}

type ClickableKind = "galaxy" | "planet";

interface ClickableObject extends THREE.Object3D {
  userData: {
    id: string;
    kind: ClickableKind;
    [key: string]: unknown;
  };
}

interface PlanetCarouselItem {
  planet: PlanetItem;
  group: THREE.Group;
  mesh: THREE.Mesh;
  glow: THREE.Sprite;
  satellitePivots: THREE.Group[];
}

const CAMERA_HOME = new THREE.Vector3(0, 4.4, 12);
const CAMERA_PLANET = new THREE.Vector3(0, 1.85, 8.4);
const CAMERA_MAP = new THREE.Vector3(0.25, 1.95, 7.9);

export class GalaxyScene {
  private readonly container: HTMLElement;
  private readonly data: GalaxyItem[];
  private readonly onSelectGalaxy: (id: string) => void;
  private readonly onSelectPlanet: (id: string) => void;
  private readonly onPlanetLabelsChange?: (labels: PlanetLabelPosition[]) => void;
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
  private readonly renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  private readonly clock = new THREE.Clock();
  private readonly raycaster = new THREE.Raycaster();
  private readonly pointer = new THREE.Vector2();
  private readonly starfieldGroup = new THREE.Group();
  private readonly galaxyGroup = new THREE.Group();
  private readonly planetGroup = new THREE.Group();
  private readonly mapGroup = new THREE.Group();
  private readonly clickableObjects: ClickableObject[] = [];
  private readonly planetCarouselItems: PlanetCarouselItem[] = [];
  private frameId = 0;
  private mode: "galaxy" | "planet" | "map" | "transition" = "galaxy";
  private selectedGalaxyId = "";
  private selectedPlanetId = "";
  private isPointerDown = false;
  private hasDragged = false;
  private lastPointerX = 0;
  private lastPointerY = 0;
  private startPointerX = 0;
  private startPointerY = 0;

  constructor(options: GalaxySceneOptions) {
    this.container = options.container;
    this.data = options.data;
    this.onSelectGalaxy = options.onSelectGalaxy;
    this.onSelectPlanet = options.onSelectPlanet;
    this.onPlanetLabelsChange = options.onPlanetLabelsChange;

    this.init();
  }

  enterGalaxyOverview() {
    this.mode = "transition";
    this.selectedGalaxyId = "";
    this.selectedPlanetId = "";
    this.onPlanetLabelsChange?.([]);

    this.createGalaxyOverview();
    this.setGroupVisible(this.galaxyGroup, true);

    const tl = gsap.timeline();

    this.fadeGroup(tl, this.mapGroup, 0, 0.35, 0);
    this.fadeGroup(tl, this.planetGroup, 0, 0.35, 0);
    this.fadeGroup(tl, this.galaxyGroup, 1, 0.65, 0.18);
    tl.to(this.camera.position, {
      x: CAMERA_HOME.x,
      y: CAMERA_HOME.y,
      z: CAMERA_HOME.z,
      duration: 0.9,
      ease: "power3.inOut"
    }, 0);

    return this.timelineToPromise(tl, () => {
      this.clearGroup(this.planetGroup);
      this.clearGroup(this.mapGroup);
      this.mode = "galaxy";
    });
  }

  enterGalaxy(galaxyId: string) {
    const galaxy = this.data.find((item) => {
      return item.id === galaxyId;
    }) ?? this.getFallbackGalaxy();

    this.mode = "transition";
    this.onPlanetLabelsChange?.([]);
    this.selectedGalaxyId = galaxy.id;
    this.selectedPlanetId = "";
    this.createPlanetSystem(galaxy);
    this.setGroupVisible(this.planetGroup, true);
    this.setGroupOpacity(this.planetGroup, 0);
    this.planetGroup.scale.setScalar(0.45);
    this.preparePlanetsFromGalaxyCore(galaxy);

    const target = new THREE.Vector3(
      galaxy.position[0] * 0.14,
      0.4,
      galaxy.position[2] * 0.14
    );

    const tl = gsap.timeline();

    tl.to(this.camera.position, {
      x: CAMERA_PLANET.x + target.x,
      y: CAMERA_PLANET.y,
      z: CAMERA_PLANET.z,
      duration: 1.15,
      ease: "power3.inOut"
    }, 0);
    this.scatterGalaxy(tl, 0);
    this.fadeGroup(tl, this.galaxyGroup, 0, 1.05, 0.18);
    this.fadeGroup(tl, this.planetGroup, 1, 0.9, 0.34);
    tl.to(this.planetGroup.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 1.05,
      ease: "power3.out"
    }, 0.28);
    this.animateCarouselToActive(tl, this.planetCarouselItems[0]?.planet.id ?? "", 0.24, true);

    return this.timelineToPromise(tl, () => {
      this.setGroupVisible(this.galaxyGroup, false);
      this.mode = "planet";
      this.selectedPlanetId = this.planetCarouselItems[0]?.planet.id ?? "";
    });
  }

  enterPlanetMap(planetId: string) {
    const galaxy = this.data.find((item) => {
      return item.id === this.selectedGalaxyId;
    }) ?? this.getFallbackGalaxy();
    const planet = galaxy.planets.find((item) => {
      return item.id === planetId;
    }) ?? this.getFallbackPlanet(galaxy);
    const activeItem = this.planetCarouselItems.find((item) => {
      return item.planet.id === planet.id;
    });

    this.mode = "transition";
    this.selectedPlanetId = planet.id;
    this.clearGroup(this.mapGroup);
    this.setGroupVisible(this.planetGroup, true);

    const tl = gsap.timeline();

    if (activeItem) {
      this.planetCarouselItems.forEach((item) => {
        if (item.planet.id !== planet.id) {
          this.fadeGroup(tl, item.group, 0, 0.45, 0);
        }
      });

      tl.to(activeItem.group.position, {
        x: -4.2,
        y: -0.62,
        z: 0.24,
        duration: 0.95,
        ease: "power3.inOut"
      }, 0);
      tl.to(activeItem.group.scale, {
        x: 3.12,
        y: 3.12,
        z: 3.12,
        duration: 0.95,
        ease: "power3.inOut"
      }, 0);
      tl.to(activeItem.glow.scale, {
        x: planet.radius * 1.9,
        y: planet.radius * 1.9,
        z: planet.radius * 1.9,
        duration: 0.95,
        ease: "power3.inOut"
      }, 0);
      this.fadeGroup(tl, activeItem.group, 1, 0.55, 0);
      tl.call(() => {
        this.setPlanetEmissive(activeItem.mesh, 0.2);
      }, undefined, 0.2);
    } else {
      this.createPlanetMap(planet);
      this.setGroupVisible(this.mapGroup, true);
      this.setGroupOpacity(this.mapGroup, 0);
      this.mapGroup.scale.setScalar(0.5);
      this.fadeGroup(tl, this.planetGroup, 0.05, 0.55, 0);
      this.fadeGroup(tl, this.mapGroup, 1, 0.8, 0.2);
      tl.to(this.mapGroup.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.85,
        ease: "power3.out"
      }, 0.15);
    }

    tl.to(this.camera.position, {
      x: CAMERA_MAP.x,
      y: CAMERA_MAP.y,
      z: CAMERA_MAP.z,
      duration: 1,
      ease: "power3.inOut"
    }, 0);

    return this.timelineToPromise(tl, () => {
      this.setGroupVisible(this.mapGroup, false);
      this.mode = "map";
    });
  }

  enterPlanetSystem() {
    const galaxy = this.data.find((item) => {
      return item.id === this.selectedGalaxyId;
    }) ?? this.getFallbackGalaxy();

    this.mode = "transition";
    this.selectedPlanetId = "";
    this.onPlanetLabelsChange?.([]);
    this.createPlanetSystem(galaxy);
    this.setGroupVisible(this.planetGroup, true);
    this.setGroupOpacity(this.planetGroup, 0);
    this.layoutCarousel(this.selectedPlanetId || this.planetCarouselItems[0]?.planet.id || "");

    const tl = gsap.timeline();

    this.fadeGroup(tl, this.mapGroup, 0, 0.4, 0);
    this.fadeGroup(tl, this.planetGroup, 1, 0.65, 0.15);
    tl.to(this.camera.position, {
      x: CAMERA_PLANET.x,
      y: CAMERA_PLANET.y,
      z: CAMERA_PLANET.z,
      duration: 0.8,
      ease: "power3.inOut"
    }, 0);

    return this.timelineToPromise(tl, () => {
      this.setGroupVisible(this.mapGroup, false);
      this.clearGroup(this.mapGroup);
      this.mode = "planet";
    });
  }

  focusPlanet(planetId: string) {
    if (this.mode !== "planet" || this.selectedPlanetId === planetId) {
      this.selectedPlanetId = planetId;
      return Promise.resolve();
    }

    this.mode = "transition";

    const tl = gsap.timeline();

    this.animateCarouselToActive(tl, planetId, 0, false);

    return this.timelineToPromise(tl, () => {
      this.selectedPlanetId = planetId;
      this.mode = "planet";
    });
  }

  resize() {
    const rect = this.container.getBoundingClientRect();
    const width = Math.max(rect.width, 1);
    const height = Math.max(rect.height, 1);

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  dispose() {
    cancelAnimationFrame(this.frameId);
    this.container.removeEventListener("pointerdown", this.handlePointerDown);
    window.removeEventListener("pointermove", this.handlePointerMove);
    window.removeEventListener("pointerup", this.handlePointerUp);
    window.removeEventListener("pointercancel", this.handlePointerCancel);
    this.clearGroup(this.starfieldGroup);
    this.clearGroup(this.galaxyGroup);
    this.clearGroup(this.planetGroup);
    this.clearGroup(this.mapGroup);
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }

  private init() {
    this.scene.fog = new THREE.FogExp2("#050816", 0.028);
    this.camera.position.copy(CAMERA_HOME);
    this.camera.lookAt(0, 0, 0);

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor("#050816", 1);
    this.container.appendChild(this.renderer.domElement);

    this.scene.add(this.starfieldGroup);
    this.scene.add(this.galaxyGroup);
    this.scene.add(this.planetGroup);
    this.scene.add(this.mapGroup);
    this.planetGroup.visible = false;
    this.mapGroup.visible = false;

    this.initLights();
    this.createStarfield();
    this.createGalaxyOverview();
    this.bindEvents();
    this.resize();
    this.update();
  }

  private initLights() {
    const ambient = new THREE.AmbientLight("#8ea7ff", 1.5);
    const mainLight = new THREE.PointLight("#ffffff", 10, 40);
    const accentLight = new THREE.PointLight("#4bf8ff", 6, 30);

    mainLight.position.set(3, 5, 6);
    accentLight.position.set(-5, 2, 2);
    this.scene.add(ambient, mainLight, accentLight);
  }

  private createStarfield() {
    const geometry = new THREE.BufferGeometry();
    const count = 1600;
    const positions = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const i3 = index * 3;

      positions[i3] = (Math.random() - 0.5) * 42;
      positions[i3 + 1] = (Math.random() - 0.5) * 24;
      positions[i3 + 2] = (Math.random() - 0.5) * 28;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: "#dfe9ff",
      size: 0.025,
      transparent: true,
      opacity: 0.7,
      depthWrite: false
    });
    const points = new THREE.Points(geometry, material);

    this.starfieldGroup.add(points);
  }

  private createGalaxyOverview() {
    this.clearGroup(this.galaxyGroup);
    this.removeClickable("galaxy");

    this.data.forEach((galaxy) => {
      const group = new THREE.Group();
      const points = this.createSpiralGalaxy(galaxy.color, galaxy.id === "ai" ? 2600 : 1500);
      const core = this.createGlowSprite(galaxy.color, galaxy.id === "ai" ? 2.6 : 1.8, 0.35);

      group.position.set(...galaxy.position);
      group.scale.setScalar(galaxy.id === "ai" ? 1.15 : 0.85);
      group.userData = {
        id: galaxy.id,
        kind: "galaxy"
      };
      points.userData = group.userData;
      core.userData = group.userData;

      group.add(points, core);
      this.galaxyGroup.add(group);
      this.clickableObjects.push(points as ClickableObject);
    });

    this.setGroupOpacity(this.galaxyGroup, 1);
  }

  private createPlanetSystem(galaxy: GalaxyItem) {
    this.clearGroup(this.planetGroup);
    this.removeClickable("planet");
    this.planetCarouselItems.length = 0;

    galaxy.planets.forEach((planet, index) => {
      const itemGroup = new THREE.Group();
      const mesh = this.createPlanetMesh(planet, 0.42);
      const glow = this.createGlowSprite(planet.color, planet.radius * 0.95, 0.3);

      mesh.userData = {
        id: planet.id,
        kind: "planet"
      };
      glow.userData = mesh.userData;
      itemGroup.userData = {
        id: planet.id,
        kind: "planet",
        carouselIndex: index
      };

      itemGroup.add(glow, mesh);
      this.planetGroup.add(itemGroup);
      this.planetCarouselItems.push({
        planet,
        group: itemGroup,
        mesh,
        glow,
        satellitePivots: this.createPlanetSatellites(itemGroup, planet)
      });
      this.clickableObjects.push(mesh as ClickableObject);
    });

    this.selectedPlanetId = this.selectedPlanetId || galaxy.planets[0]?.id || "";
    this.layoutCarousel(this.selectedPlanetId);
  }

  private preparePlanetsFromGalaxyCore(galaxy: GalaxyItem) {
    const origin = new THREE.Vector3(
      galaxy.position[0] * 0.16,
      galaxy.position[1] * 0.12,
      0
    );

    this.planetCarouselItems.forEach((item) => {
      item.group.position.copy(origin);
      item.group.scale.setScalar(0.08);
      item.group.userData.ringAngle = 0;
    });
  }

  private layoutCarousel(activePlanetId: string) {
    const activeIndex = Math.max(0, this.planetCarouselItems.findIndex((item) => {
      return item.planet.id === activePlanetId;
    }));

    this.planetCarouselItems.forEach((item, index) => {
      const angle = (index - activeIndex) / this.planetCarouselItems.length * Math.PI * 2;

      item.group.userData.ringAngle = angle;
      this.applyCarouselPose(item, angle);
    });
  }

  private animateCarouselToActive(tl: gsap.core.Timeline, activePlanetId: string, position: number, fromCore: boolean) {
    const activeIndex = this.planetCarouselItems.findIndex((item) => {
      return item.planet.id === activePlanetId;
    });

    if (activeIndex < 0) return;

    const currentIndex = Math.max(0, this.planetCarouselItems.findIndex((item) => {
      return item.planet.id === this.selectedPlanetId;
    }));
    const count = Math.max(this.planetCarouselItems.length, 1);
    const step = Math.PI * 2 / count;
    const clockwiseSteps = fromCore ? activeIndex : (activeIndex - currentIndex + count) % count;

    this.planetCarouselItems.forEach((item, index) => {
      const startAngle = fromCore
        ? 0
        : Number(item.group.userData.ringAngle ?? (index - currentIndex) * step);
      const state = {
        angle: startAngle
      };
      const finalAngle = (index - activeIndex) * step;
      const clockwiseFinalAngle = fromCore
        ? finalAngle
        : startAngle - clockwiseSteps * step;

      tl.to(state, {
        angle: clockwiseFinalAngle,
        duration: fromCore ? 1.25 : 0.95,
        ease: "power3.inOut",
        onUpdate: () => {
          this.applyCarouselPose(item, state.angle);
        },
        onComplete: () => {
          item.group.userData.ringAngle = finalAngle;
          this.applyCarouselPose(item, finalAngle);
        }
      }, position);
    });
  }

  private applyCarouselPose(item: PlanetCarouselItem, angle: number) {
    const frontWeight = (Math.cos(angle) + 1) / 2;
    const depthWeight = frontWeight ** 1.7;
    const x = Math.sin(angle) * (3.25 + (1 - frontWeight) * 0.95);
    const y = -0.12 + (1 - frontWeight) * 0.34;
    const z = -4.15 + depthWeight * 6.4;
    const scale = 0.32 + depthWeight * 0.9;
    const glowScale = item.planet.radius * (0.76 + depthWeight * 1.05);
    const opacity = 0.26 + depthWeight * 0.74;
    const glowOpacity = 0.18 + depthWeight * 0.62;

    item.group.position.set(x, y, z);
    item.group.scale.setScalar(scale);
    item.glow.scale.set(glowScale, glowScale, glowScale);
    item.group.renderOrder = Math.round(depthWeight * 100);
    item.group.userData.labelOpacity = 0.22 + depthWeight * 0.78;
    this.setGroupOpacity(item.group, opacity);
    this.setMaterialOpacity(item.glow, glowOpacity);
    this.setPlanetEmissive(item.mesh, 0.06 + depthWeight * 0.16);

    item.mesh.userData.isFront = frontWeight > 0.92;
  }

  private createPlanetMap(planet: PlanetItem) {
    this.clearGroup(this.mapGroup);

    const planetMesh = this.createPlanetMesh(planet, 1.32);
    const glow = this.createGlowSprite(planet.color, 3.05, 0.48);
    const orbit = this.createOrbit(1.72, planet.color, 0.26);

    planetMesh.position.set(-4.2, -0.62, 0.24);
    glow.position.copy(planetMesh.position);
    orbit.position.copy(planetMesh.position);
    orbit.rotation.x = Math.PI * 0.52;
    orbit.rotation.z = Math.PI * 0.08;
    this.setPlanetEmissive(planetMesh, 0.2);
    this.mapGroup.add(glow, planetMesh, orbit);

    const path = new THREE.Group();

    planet.tasks.forEach((task, index) => {
      const progress = planet.tasks.length <= 1 ? 0 : index / (planet.tasks.length - 1);
      const angle = -Math.PI * 0.55 + progress * Math.PI * 0.95;
      const radius = 1.95;
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(task.status === "active" ? 0.13 : 0.1, 24, 24),
        new THREE.MeshBasicMaterial({
          color: task.status === "locked" ? "#1c2943" : planet.color,
          transparent: true,
          opacity: task.status === "locked" ? 0.55 : 1
        })
      );

      node.position.set(
        -4.2 + Math.cos(angle) * radius,
        -0.6 + Math.sin(angle) * radius * 0.86,
        0.2
      );
      path.add(node);
    });

    this.mapGroup.add(path);
  }

  private createSpiralGalaxy(color: string, count: number) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const baseColor = new THREE.Color(color);
    const coreColor = new THREE.Color("#ffffff");
    const branchCount = 4;

    for (let index = 0; index < count; index += 1) {
      const i3 = index * 3;
      const radius = Math.random() ** 0.55 * 1.8;
      const branchAngle = index % branchCount / branchCount * Math.PI * 2;
      const spinAngle = radius * 3.8;
      const randomness = Math.max(0.02, radius * 0.16);
      const mixedColor = coreColor.clone().lerp(baseColor, Math.min(radius / 1.8, 1));

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * randomness;
      positions[i3 + 1] = (Math.random() - 0.5) * 0.12;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * randomness;

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    return new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        size: 0.032,
        vertexColors: true,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
  }

  private createPlanetMesh(planet: PlanetItem, scale: number) {
    const geometry = new THREE.SphereGeometry(planet.radius * scale, 64, 64);
    const texture = this.createPlanetTexture(planet);
    const material = new THREE.MeshStandardMaterial({
      color: planet.color,
      map: texture,
      roughness: 0.58,
      metalness: 0.08,
      emissive: planet.color,
      emissiveIntensity: 0.16
    });

    return new THREE.Mesh(geometry, material);
  }

  private createPlanetSatellites(parent: THREE.Group, planet: PlanetItem) {
    const orbitRadius = Math.max(0.82, planet.radius * 0.66);
    const orbitColor = new THREE.Color(planet.color).lerp(new THREE.Color("#ffffff"), 0.55);
    const satellitePivots: THREE.Group[] = [];
    const orbit = this.createSatelliteOrbit(planet, orbitRadius, `#${orbitColor.getHexString()}`);

    parent.add(orbit);

    const satelliteCount = planet.id === "language" || planet.id === "gen-ai" ? 2 : 1;

    for (let index = 0; index < satelliteCount; index += 1) {
      const pivot = new THREE.Group();
      const satelliteSize = 0.055 + this.hashNumber(planet.id, index + 3) * 0.035;
      const satellite = new THREE.Mesh(
        new THREE.SphereGeometry(satelliteSize, 18, 18),
        new THREE.MeshStandardMaterial({
          color: index % 2 === 0 ? "#d8ecff" : planet.color,
          roughness: 0.5,
          metalness: 0.12,
          emissive: index % 2 === 0 ? "#9fcaff" : planet.color,
          emissiveIntensity: 0.18
        })
      );
      const angle = Math.PI * 2 / satelliteCount * index + this.hashNumber(planet.id, index + 5) * Math.PI;

      pivot.rotation.y = angle;
      satellite.position.x = orbitRadius;
      pivot.userData.speed = 0.35 + this.hashNumber(planet.id, index + 7) * 0.38;
      pivot.add(satellite);
      parent.add(pivot);
      satellitePivots.push(pivot);
    }

    return satellitePivots;
  }

  private createPlanetTexture(planet: PlanetItem) {
    const canvas = document.createElement("canvas");
    const size = 256;
    const context = canvas.getContext("2d");

    canvas.width = size;
    canvas.height = size;

    if (context) {
      this.paintPlanetTexture(context, planet, size);
    }

    const texture = new THREE.CanvasTexture(canvas);

    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.anisotropy = 4;
    return texture;
  }

  private paintPlanetTexture(context: CanvasRenderingContext2D, planet: PlanetItem, size: number) {
    const palette = this.getPlanetPalette(planet);
    const gradient = context.createLinearGradient(0, 0, size, size);

    gradient.addColorStop(0, palette.light);
    gradient.addColorStop(0.48, palette.base);
    gradient.addColorStop(1, palette.dark);
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);

    if (planet.id === "language") {
      this.paintCloudOceanTexture(context, planet, size, palette);
    } else if (planet.id === "gen-ai") {
      this.paintNebulaTexture(context, planet, size, palette);
    } else if (planet.id === "robotics") {
      this.paintGasBandsTexture(context, planet, size, palette);
    } else if (planet.id === "robot") {
      this.paintMoonTexture(context, planet, size, palette);
    } else if (planet.id === "physics") {
      this.paintSolarTexture(context, planet, size, palette);
    } else {
      this.paintRockTexture(context, planet, size, palette);
    }

    this.paintFineGrain(context, planet, size, palette);
  }

  private paintNebulaTexture(
    context: CanvasRenderingContext2D,
    planet: PlanetItem,
    size: number,
    palette: ReturnType<GalaxyScene["getPlanetPalette"]>
  ) {
    context.globalAlpha = 0.2;
    for (let index = 0; index < 18; index += 1) {
      const x = this.hashNumber(planet.id, index * 13) * size;
      const y = this.hashNumber(planet.id, index * 17) * size;
      const radius = 24 + this.hashNumber(planet.id, index * 19) * 44;
      const gradient = context.createRadialGradient(x, y, 0, x, y, radius);

      gradient.addColorStop(0, index % 2 === 0 ? "#ffffff" : palette.light);
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    }

    context.globalAlpha = 0.42;
    for (let index = 0; index < 72; index += 1) {
      const x = this.hashNumber(planet.id, index * 31) * size;
      const y = this.hashNumber(planet.id, index * 37) * size;

      context.fillStyle = index % 3 === 0 ? "#ffffff" : palette.light;
      context.fillRect(x, y, 2.2, 2.2);
    }
    context.globalAlpha = 1;
  }

  private paintCloudOceanTexture(
    context: CanvasRenderingContext2D,
    planet: PlanetItem,
    size: number,
    palette: ReturnType<GalaxyScene["getPlanetPalette"]>
  ) {
    context.globalAlpha = 0.55;
    for (let index = 0; index < 20; index += 1) {
      const x = this.hashNumber(planet.id, index * 23) * size;
      const y = this.hashNumber(planet.id, index * 29) * size;
      const width = 42 + this.hashNumber(planet.id, index * 31) * 72;
      const height = 14 + this.hashNumber(planet.id, index * 41) * 32;

      context.fillStyle = index % 2 === 0 ? "#d9fff6" : "#5fb997";
      context.beginPath();
      context.ellipse(x, y, width, height, this.hashNumber(planet.id, index) * Math.PI, 0, Math.PI * 2);
      context.fill();
    }
    context.globalAlpha = 0.28;
    this.paintWavyBands(context, planet, size, "#ffffff", 18, 2.5);
    context.globalAlpha = 1;
  }

  private paintGasBandsTexture(
    context: CanvasRenderingContext2D,
    planet: PlanetItem,
    size: number,
    palette: ReturnType<GalaxyScene["getPlanetPalette"]>
  ) {
    for (let y = -8; y < size + 8; y += 18) {
      context.globalAlpha = 0.5;
      context.fillStyle = y % 36 === 0 ? palette.light : palette.dark;
      context.fillRect(0, y, size, 8 + this.hashNumber(planet.id, y) * 12);
    }
    context.globalAlpha = 0.38;
    this.paintWavyBands(context, planet, size, "#ffffff", 14, 4);
    context.globalAlpha = 1;
  }

  private paintMoonTexture(
    context: CanvasRenderingContext2D,
    planet: PlanetItem,
    size: number,
    palette: ReturnType<GalaxyScene["getPlanetPalette"]>
  ) {
    context.globalAlpha = 0.5;
    for (let index = 0; index < 36; index += 1) {
      const x = this.hashNumber(planet.id, index * 43) * size;
      const y = this.hashNumber(planet.id, index * 47) * size;
      const radius = 5 + this.hashNumber(planet.id, index * 53) * 18;

      context.fillStyle = index % 2 === 0 ? palette.dark : palette.light;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    }
    context.globalAlpha = 1;
  }

  private paintSolarTexture(
    context: CanvasRenderingContext2D,
    planet: PlanetItem,
    size: number,
    palette: ReturnType<GalaxyScene["getPlanetPalette"]>
  ) {
    context.globalAlpha = 0.38;
    for (let index = 0; index < 32; index += 1) {
      const x = this.hashNumber(planet.id, index * 7) * size;
      const y = this.hashNumber(planet.id, index * 9) * size;
      const radius = 10 + this.hashNumber(planet.id, index * 11) * 28;

      context.fillStyle = index % 2 === 0 ? "#fff1a8" : "#ff8d36";
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    }
    context.globalAlpha = 0.28;
    this.paintWavyBands(context, planet, size, "#fff7c9", 22, 7);
    context.globalAlpha = 1;
  }

  private paintRockTexture(
    context: CanvasRenderingContext2D,
    planet: PlanetItem,
    size: number,
    palette: ReturnType<GalaxyScene["getPlanetPalette"]>
  ) {
    context.globalAlpha = 0.42;
    for (let index = 0; index < 46; index += 1) {
      const x = this.hashNumber(planet.id, index * 5) * size;
      const y = this.hashNumber(planet.id, index * 7) * size;
      const radius = 4 + this.hashNumber(planet.id, index * 13) * 20;

      context.fillStyle = index % 2 === 0 ? palette.light : palette.dark;
      context.beginPath();
      context.ellipse(x, y, radius * 1.5, radius, this.hashNumber(planet.id, index) * Math.PI, 0, Math.PI * 2);
      context.fill();
    }
    context.globalAlpha = 1;
  }

  private paintWavyBands(
    context: CanvasRenderingContext2D,
    planet: PlanetItem,
    size: number,
    color: string,
    step: number,
    width: number
  ) {
    for (let y = -20; y < size + 20; y += step) {
      context.beginPath();
      for (let x = -10; x <= size + 10; x += 10) {
        const wave = Math.sin((x + this.hashNumber(planet.id, y) * 80) * 0.035) * 7;
        const offset = Math.sin(y * 0.12 + this.hashNumber(planet.id, x) * 6) * 5;

        if (x === -10) {
          context.moveTo(x, y + wave + offset);
        } else {
          context.lineTo(x, y + wave + offset);
        }
      }
      context.lineWidth = width + this.hashNumber(planet.id, y + 13) * width;
      context.strokeStyle = color;
      context.stroke();
    }
  }

  private paintFineGrain(
    context: CanvasRenderingContext2D,
    planet: PlanetItem,
    size: number,
    palette: ReturnType<GalaxyScene["getPlanetPalette"]>
  ) {
    context.globalAlpha = 0.18;
    for (let index = 0; index < 120; index += 1) {
      const x = this.hashNumber(planet.id, index * 61) * size;
      const y = this.hashNumber(planet.id, index * 67) * size;

      context.fillStyle = index % 2 === 0 ? "#ffffff" : palette.dark;
      context.fillRect(x, y, 1.4, 1.4);
    }
    context.globalAlpha = 1;
  }

  private getPlanetPalette(planet: PlanetItem) {
    const palettes: Record<string, {
      base: string;
      dark: string;
      light: string;
    }> = {
      language: {
        base: "#31e5d2",
        dark: "#10836f",
        light: "#ccfff5"
      },
      "gen-ai": {
        base: "#f04bd4",
        dark: "#782d91",
        light: "#ffd1ff"
      },
      robotics: {
        base: "#5b73ff",
        dark: "#263b8f",
        light: "#d2dcff"
      },
      robot: {
        base: "#9fb3c7",
        dark: "#526474",
        light: "#f0f7ff"
      },
      physics: {
        base: "#ff9f35",
        dark: "#a94c24",
        light: "#fff2a8"
      },
      history: {
        base: "#ff7b9c",
        dark: "#8f3b52",
        light: "#ffd4df"
      }
    };

    return palettes[planet.id] ?? {
      base: planet.color,
      dark: new THREE.Color(planet.color).lerp(new THREE.Color("#111827"), 0.45).getStyle(),
      light: new THREE.Color(planet.color).lerp(new THREE.Color("#ffffff"), 0.45).getStyle()
    };
  }

  private hashNumber(seed: string, salt: number) {
    let hash = 2166136261 + salt;

    for (let index = 0; index < seed.length; index += 1) {
      hash ^= seed.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }

    return (hash >>> 0) / 4294967295;
  }

  private createSatelliteOrbit(planet: PlanetItem, radius: number, color: string) {
    if (planet.id === "language" || planet.id === "robot") {
      return this.createLineSatelliteOrbit(radius, color, 0.34);
    }

    return this.createOrbit(radius, color, 0.42);
  }

  private createLineSatelliteOrbit(radius: number, color: string, opacity: number) {
    const curve = new THREE.EllipseCurve(0, 0, radius, radius * 0.72, 0, Math.PI * 2);
    const points = curve.getPoints(128).map((point: {
      x: number;
      y: number;
    }) => {
      return new THREE.Vector3(point.x, 0, point.y);
    });
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    return new THREE.LineLoop(geometry, material);
  }

  private createOrbit(radius: number, color: string, opacity: number) {
    const group = new THREE.Group();
    const colorValue = new THREE.Color(color);
    const brightGeometry = new THREE.BufferGeometry();
    const dustGeometry = new THREE.BufferGeometry();
    const brightCount = 64;
    const dustCount = 220;
    const brightPositions = new Float32Array(brightCount * 3);
    const dustPositions = new Float32Array(dustCount * 3);

    for (let index = 0; index < brightCount; index += 1) {
      const i3 = index * 3;
      const angle = index / brightCount * Math.PI * 2;
      const jitter = (Math.random() - 0.5) * 0.018;

      brightPositions[i3] = Math.cos(angle) * (radius + jitter);
      brightPositions[i3 + 1] = (Math.random() - 0.5) * 0.014;
      brightPositions[i3 + 2] = Math.sin(angle) * (radius * 0.72 + jitter);
    }

    for (let index = 0; index < dustCount; index += 1) {
      const i3 = index * 3;
      const angle = Math.random() * Math.PI * 2;
      const band = (Math.random() - 0.5) * 0.13;
      const localRadius = radius + band;

      dustPositions[i3] = Math.cos(angle) * localRadius;
      dustPositions[i3 + 1] = (Math.random() - 0.5) * 0.035;
      dustPositions[i3 + 2] = Math.sin(angle) * (localRadius * 0.72);
    }

    brightGeometry.setAttribute("position", new THREE.BufferAttribute(brightPositions, 3));
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));

    group.add(
      new THREE.Points(
        dustGeometry,
        new THREE.PointsMaterial({
          color: `#${colorValue.clone().lerp(new THREE.Color("#ffffff"), 0.25).getHexString()}`,
          size: 0.014,
          transparent: true,
          opacity: opacity * 0.45,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        })
      ),
      new THREE.Points(
        brightGeometry,
        new THREE.PointsMaterial({
          color,
          size: 0.02,
          transparent: true,
          opacity,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        })
      )
    );

    return group;
  }

  private createGlowSprite(color: string, size: number, opacity: number) {
    const canvas = document.createElement("canvas");
    const canvasSize = 128;
    const context = canvas.getContext("2d");

    canvas.width = canvasSize;
    canvas.height = canvasSize;

    if (context) {
      const gradient = context.createRadialGradient(64, 64, 4, 64, 64, 64);

      gradient.addColorStop(0, "rgba(255,255,255,0.95)");
      gradient.addColorStop(0.25, color);
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, canvasSize, canvasSize);
    }

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({
      map: texture,
      color,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const sprite = new THREE.Sprite(material);

    sprite.scale.set(size, size, size);
    return sprite;
  }

  private bindEvents() {
    this.container.addEventListener("pointerdown", this.handlePointerDown);
    window.addEventListener("pointermove", this.handlePointerMove);
    window.addEventListener("pointerup", this.handlePointerUp);
    window.addEventListener("pointercancel", this.handlePointerCancel);
  }

  private handlePointerDown = (event: PointerEvent) => {
    if (this.mode === "transition") return;

    this.isPointerDown = true;
    this.hasDragged = false;
    this.startPointerX = event.clientX;
    this.startPointerY = event.clientY;
    this.lastPointerX = event.clientX;
    this.lastPointerY = event.clientY;
  };

  private handlePointerMove = (event: PointerEvent) => {
    if (!this.isPointerDown || this.mode === "transition") return;

    const deltaX = event.clientX - this.lastPointerX;
    const deltaY = event.clientY - this.lastPointerY;
    const totalX = event.clientX - this.startPointerX;
    const totalY = event.clientY - this.startPointerY;

    if (Math.hypot(totalX, totalY) > 4) {
      this.hasDragged = true;
    }

    if (this.hasDragged) {
      this.rotateCameraByDrag(deltaX, deltaY);
    }

    this.lastPointerX = event.clientX;
    this.lastPointerY = event.clientY;
  };

  private handlePointerUp = (event: PointerEvent) => {
    if (!this.isPointerDown) return;

    this.isPointerDown = false;

    if (this.mode === "transition" || this.hasDragged) {
      return;
    }

    const rect = this.container.getBoundingClientRect();
    this.pointer.x = (event.clientX - rect.left) / rect.width * 2 - 1;
    this.pointer.y = -((event.clientY - rect.top) / rect.height * 2 - 1);

    this.raycaster.setFromCamera(this.pointer, this.camera);

    const activeObjects = this.clickableObjects.filter((object) => {
      return object.userData.kind === this.mode || (this.mode === "planet" && object.userData.kind === "planet");
    });
    const intersections = this.raycaster.intersectObjects(activeObjects, true);
    const hit = intersections[0]?.object as ClickableObject | undefined;

    if (!hit) return;

    if (hit.userData.kind === "galaxy" && this.mode === "galaxy") {
      this.onSelectGalaxy(hit.userData.id);
    }

    if (hit.userData.kind === "planet" && this.mode === "planet") {
      this.onSelectPlanet(hit.userData.id);
    }
  };

  private handlePointerCancel = () => {
    this.isPointerDown = false;
    this.hasDragged = false;
  };

  private rotateCameraByDrag(deltaX: number, deltaY: number) {
    const target = new THREE.Vector3(0, 0, 0);
    const offset = this.camera.position.clone().sub(target);
    const spherical = new THREE.Spherical().setFromVector3(offset);

    spherical.theta -= deltaX * 0.006;
    spherical.phi += deltaY * 0.0045;
    spherical.phi = Math.max(0.42, Math.min(2.25, spherical.phi));

    offset.setFromSpherical(spherical);
    this.camera.position.copy(target).add(offset);
    this.camera.lookAt(target);
  }

  private update = () => {
    const delta = this.clock.getDelta();

    this.starfieldGroup.rotation.y += delta * 0.012;
    this.galaxyGroup.children.forEach((item: typeof THREE.Object3D, index: number) => {
      item.rotation.y += delta * (0.08 + index * 0.02);
    });
    this.planetCarouselItems.forEach((item) => {
      item.mesh.rotation.y += delta * 0.34;
      item.satellitePivots.forEach((pivot) => {
        pivot.rotation.y += delta * Number(pivot.userData.speed ?? 0.4);
      });
    });
    this.mapGroup.children.forEach((item: typeof THREE.Object3D) => {
      if (item instanceof THREE.Mesh) {
        item.rotation.y += delta * 0.22;
      }
    });

    this.camera.lookAt(0, 0, 0);
    this.renderer.render(this.scene, this.camera);
    this.emitPlanetLabels();
    this.frameId = requestAnimationFrame(this.update);
  };

  private emitPlanetLabels() {
    if (!this.onPlanetLabelsChange) return;

    if (this.mode !== "planet") {
      this.onPlanetLabelsChange([]);
      return;
    }

    const rect = this.container.getBoundingClientRect();
    const labels = this.planetCarouselItems.map((item) => {
      const worldPosition = item.group.localToWorld(
        new THREE.Vector3(0, -item.planet.radius * 0.52, 0)
      );
      const projected = worldPosition.project(this.camera);

      return {
        id: item.planet.id,
        name: item.planet.name,
        x: (projected.x * 0.5 + 0.5) * rect.width,
        y: (-projected.y * 0.5 + 0.5) * rect.height,
        opacity: Number(item.group.userData.labelOpacity ?? 1),
        isFront: Boolean(item.mesh.userData.isFront)
      };
    }).filter((label) => {
      return label.x > -80 && label.x < rect.width + 80 && label.y > -60 && label.y < rect.height + 80;
    });

    this.onPlanetLabelsChange(labels);
  }

  private removeClickable(kind: ClickableKind) {
    for (let index = this.clickableObjects.length - 1; index >= 0; index -= 1) {
      const object = this.clickableObjects[index];

      if (object?.userData.kind === kind) {
        this.clickableObjects.splice(index, 1);
      }
    }
  }

  private scatterGalaxy(tl: gsap.core.Timeline, position: number) {
    this.galaxyGroup.children.forEach((item: typeof THREE.Object3D, index: number) => {
      const direction = item.position.clone();

      if (direction.length() < 0.1) {
        direction.set(index % 2 === 0 ? 1 : -1, index % 3 - 1, 0.2);
      }

      direction.normalize();

      tl.to(item.position, {
        x: item.position.x + direction.x * 3.2,
        y: item.position.y + direction.y * 1.4,
        z: item.position.z + direction.z * 1.8,
        duration: 1.1,
        ease: "power2.inOut"
      }, position);
      tl.to(item.scale, {
        x: item.scale.x * 1.85,
        y: item.scale.y * 1.85,
        z: item.scale.z * 1.85,
        duration: 1.05,
        ease: "power2.out"
      }, position);
    });
  }

  private fadeGroup(tl: gsap.core.Timeline, group: THREE.Group, opacity: number, duration: number, position: number) {
    const state = {
      opacity: this.getGroupOpacity(group)
    };

    tl.to(state, {
      opacity,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        this.setGroupOpacity(group, state.opacity);
      }
    }, position);
  }

  private getGroupOpacity(group: THREE.Group) {
    let opacity = 1;

    group.traverse((object: typeof THREE.Object3D) => {
      const material = (object as THREE.Mesh).material;

      if (material && !Array.isArray(material)) {
        opacity = material.opacity;
      }
    });

    return opacity;
  }

  private setGroupOpacity(group: THREE.Group, opacity: number) {
    group.traverse((object: typeof THREE.Object3D) => {
      const material = (object as THREE.Mesh).material;

      if (!material) return;

      const materials = Array.isArray(material) ? material : [material];

      materials.forEach((item) => {
        item.transparent = true;
        item.opacity = opacity;
      });
    });
  }

  private setMaterialOpacity(object: THREE.Object3D, opacity: number) {
    const material = (object as THREE.Mesh).material;

    if (!material) return;

    const materials = Array.isArray(material) ? material : [material];

    materials.forEach((item) => {
      item.transparent = true;
      item.opacity = opacity;
    });
  }

  private setPlanetEmissive(mesh: THREE.Mesh, emissiveIntensity: number) {
    const material = mesh.material as THREE.MeshStandardMaterial | THREE.MeshStandardMaterial[];
    const materials = Array.isArray(material) ? material : [material];

    materials.forEach((item) => {
      item.emissiveIntensity = emissiveIntensity;
    });
  }

  private setGroupVisible(group: THREE.Group, visible: boolean) {
    group.visible = visible;
  }

  private clearGroup(group: THREE.Group) {
    while (group.children.length) {
      const child = group.children.pop();

      if (!child) continue;
      this.disposeObject(child);
    }
  }

  private disposeObject(object: THREE.Object3D) {
    object.traverse((child: typeof THREE.Object3D) => {
      const mesh = child as THREE.Mesh;

      mesh.geometry?.dispose();

      const material = mesh.material;
      const materials = Array.isArray(material) ? material : material ? [material] : [];

      materials.forEach((item) => {
        const materialWithMap = item as THREE.Material & {
          map?: THREE.Texture;
        };

        materialWithMap.map?.dispose();
        item.dispose();
      });
    });
  }

  private timelineToPromise(tl: gsap.core.Timeline, onComplete?: () => void) {
    return new Promise<void>((resolve) => {
      tl.eventCallback("onComplete", () => {
        onComplete?.();
        resolve();
      });
    });
  }

  private getFallbackGalaxy() {
    const galaxy = this.data[0];

    if (!galaxy) {
      throw new Error("GalaxyScene requires at least one galaxy item.");
    }

    return galaxy;
  }

  private getFallbackPlanet(galaxy: GalaxyItem) {
    const planet = galaxy.planets[0];

    if (!planet) {
      throw new Error("GalaxyScene requires at least one planet item.");
    }

    return planet;
  }
}
