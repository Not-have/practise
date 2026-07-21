<script lang="ts" setup>
import {
  onBeforeUnmount,
  onMounted,
  ref
} from "vue";

import * as THREE from "three";

interface NebulaGalaxy {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  color: string;
  accent: string;
  position: [number, number, number];
  scale: number;
  rotation: number;
  arms: number;
  spin: number;
  flatten?: number;
}

interface GalaxyObject {
  data: NebulaGalaxy;
  group: THREE.Group;
  hitArea: THREE.Mesh;
}

interface NebulaOrbitData {
  radii: Float32Array;
  angles: Float32Array;
  offsetX: Float32Array;
  offsetY: Float32Array;
  z: Float32Array;
  rates: Float32Array;
  flatten: number;
}

const galaxies: NebulaGalaxy[] = [
  {
    id: "history",
    name: "文史星系",
    subtitle: "文明脉络",
    description: "以人物、时代、事件与地域为线索，观察文明如何在时间中彼此影响。",
    color: "#c4a15b",
    accent: "#fff0cf",
    position: [
      -3.82,
      1.72,
      -0.9
    ],
    scale: 0.96,
    rotation: 0.08,
    arms: 4,
    spin: 2.82,
    flatten: 0.43
  },
  {
    id: "math",
    name: "数学星系",
    subtitle: "抽象结构",
    description: "从数、形、函数到证明，把复杂问题拆成可推导、可表达的结构。",
    color: "#9bd6df",
    accent: "#efffff",
    position: [
      4.52,
      1.9,
      -1.15
    ],
    scale: 0.6,
    rotation: 0.12,
    arms: 5,
    spin: 2.55,
    flatten: 0.42
  },
  {
    id: "physics",
    name: "物理星系",
    subtitle: "自然规律",
    description: "从力与运动、电磁、能量到宇宙尺度，建立理解真实世界的科学直觉。",
    color: "#a96255",
    accent: "#ffe2d8",
    position: [
      -5.18,
      -0.95,
      -0.35
    ],
    scale: 1.1,
    rotation: 0.54,
    arms: 3,
    spin: 3.42,
    flatten: 0.54
  },
  {
    id: "ai",
    name: "人工智能星系",
    subtitle: "模型智能",
    description: "聚合数据、算法、生成能力与智能体应用，呈现 AI 学习路径的核心星域。",
    color: "#6f95e0",
    accent: "#f7f9ff",
    position: [
      0.22,
      -0.02,
      0.22
    ],
    scale: 1.32,
    rotation: -0.1,
    arms: 5,
    spin: 2.95,
    flatten: 0.52
  },
  {
    id: "biology",
    name: "生物星系",
    subtitle: "生命系统",
    description: "从细胞、遗传、生态到演化，看见生命如何组织、适应与延续。",
    color: "#3aa78f",
    accent: "#ecfff6",
    position: [
      5.02,
      -0.52,
      -0.75
    ],
    scale: 0.64,
    rotation: -0.58,
    arms: 3,
    spin: 3.1,
    flatten: 0.38
  },
  {
    id: "science",
    name: "综合科学星系",
    subtitle: "跨域探索",
    description: "连接实验、观察、归纳和验证，让不同学科的问题在同一张知识地图上对话。",
    color: "#5b91be",
    accent: "#e4f5ff",
    position: [
      -2.52,
      -2.9,
      -0.55
    ],
    scale: 0.68,
    rotation: 0.48,
    arms: 4,
    spin: 3.18,
    flatten: 0.52
  },
  {
    id: "logic",
    name: "逻辑思维星系",
    subtitle: "推理路径",
    description: "训练分类、比较、归因、假设和论证能力，让思考过程变得清晰可复盘。",
    color: "#aa8f50",
    accent: "#ffe9c4",
    position: [
      4.44,
      -2.28,
      -0.9
    ],
    scale: 0.7,
    rotation: -0.2,
    arms: 4,
    spin: 2.7,
    flatten: 0.4
  }
];

const nebulaRef = ref<HTMLDivElement | null>(null);

const activeGalaxyId = ref("ai");

const hoveredGalaxyId = ref("");

const isWebglFallback = ref(false);

let scene: THREE.Scene | null = null;

let camera: THREE.PerspectiveCamera | null = null;

let renderer: THREE.WebGLRenderer | null = null;

let frameId = 0;

let starField: THREE.Points | null = null;

let brightStarField: THREE.Points | null = null;

let galaxyObjects: GalaxyObject[] = [];

let hoverClearTimer: ReturnType<typeof window.setTimeout> | null = null;

const pointer = new THREE.Vector2(0, 0);

const raycaster = new THREE.Raycaster();

let pointerTarget = {
  x: 0,
  y: 0
};

const pointerCurrent = {
  x: 0,
  y: 0
};

let cameraBaseZ = 11.25;

let sparkTexture: THREE.CanvasTexture | null = null;

let lastFrameTime = 0;

onMounted(() => {
  initScene();
});

onBeforeUnmount(() => {
  disposeScene();
});

function initScene() {
  const container = nebulaRef.value;

  if (!container) {
    return;
  }

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2("#020414", 0.048);

  camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0.2, cameraBaseZ);
  camera.lookAt(0, 0, 0);

  try {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false
    });
  } catch {
    isWebglFallback.value = true;
    scene = null;
    camera = null;

    return;
  }

  isWebglFallback.value = false;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.setClearColor("#020414", 1);
  container.append(renderer.domElement);

  sparkTexture = createSparkTexture();

  scene.add(createBackdropPlane());
  starField = createStarField();
  scene.add(starField);
  brightStarField = createBrightStarField();
  scene.add(brightStarField);

  galaxyObjects = galaxies.map(item => {
    const object = createGalaxyObject(item);

    scene?.add(object.group);

    return object;
  });

  container.addEventListener("pointermove", handlePointerMove);
  container.addEventListener("pointerleave", handlePointerLeave);
  container.addEventListener("click", handleClick);
  window.addEventListener("resize", resize);

  resize();
  update();
}

function createSparkTexture() {
  const canvas = document.createElement("canvas");

  const size = 128;

  const center = size / 2;

  const radius = size / 2;

  const context = canvas.getContext("2d");

  canvas.width = size;
  canvas.height = size;

  if (!context) {
    return null;
  }

  const gradient = context.createRadialGradient(center, center, 0, center, center, radius);

  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.18, "rgba(255, 255, 255, 0.95)");
  gradient.addColorStop(0.52, "rgba(255, 255, 255, 0.34)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);

  texture.needsUpdate = true;

  return texture;
}

function createBackdropPlane() {
  const geometry = new THREE.PlaneGeometry(40, 22, 1, 1);

  const material = new THREE.MeshBasicMaterial({
    color: "#020414",
    depthWrite: false,
    depthTest: false
  });

  const plane = new THREE.Mesh(geometry, material);

  plane.position.set(0, 0, -7);

  return plane;
}

function createStarField() {
  const count = 8600;

  const geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(count * 3);

  const colors = new Float32Array(count * 3);

  const baseColor = new THREE.Color("#b7c7ee");

  const warmColor = new THREE.Color("#e4cf8f");

  const blueColor = new THREE.Color("#7fa8e2");

  for (let index = 0; index < count; index += 1) {
    const i3 = index * 3;

    const layer = Math.random();

    const color = layer > 0.92 ? warmColor : (layer > 0.68 ? blueColor : baseColor);

    const brightness = 0.34 + Math.random() * 0.72;

    positions[i3] = (Math.random() - 0.5) * 20.5;
    positions[i3 + 1] = (Math.random() - 0.5) * 12.4;
    positions[i3 + 2] = -6.5 + Math.random() * 5.6;

    colors[i3] = color.r * brightness;
    colors[i3 + 1] = color.g * brightness;
    colors[i3 + 2] = color.b * brightness;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.034,
    map: sparkTexture ?? undefined,
    transparent: true,
    opacity: 0.82,
    vertexColors: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  return new THREE.Points(geometry, material);
}

function createBrightStarField() {
  const count = 220;

  const geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(count * 3);

  const colors = new Float32Array(count * 3);

  const cool = new THREE.Color("#eaf4ff");

  const warm = new THREE.Color("#fff2bd");

  for (let index = 0; index < count; index += 1) {
    const i3 = index * 3;

    const color = Math.random() > 0.78 ? warm : cool;

    const brightness = 0.62 + Math.random() * 0.86;

    positions[i3] = (Math.random() - 0.5) * 19.2;
    positions[i3 + 1] = (Math.random() - 0.5) * 10.6;
    positions[i3 + 2] = -5.4 + Math.random() * 2.4;

    colors[i3] = color.r * brightness;
    colors[i3 + 1] = color.g * brightness;
    colors[i3 + 2] = color.b * brightness;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.115,
    map: sparkTexture ?? undefined,
    transparent: true,
    opacity: 0.82,
    vertexColors: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  return new THREE.Points(geometry, material);
}

function createGalaxyObject(data: NebulaGalaxy): GalaxyObject {
  const group = new THREE.Group();

  const isPrimaryGalaxy = data.id === "ai";

  const haze = createHazeLayer(data, isPrimaryGalaxy ? 6800 : 3600);

  const colorDust = createSpiralLayer(
      data,
      isPrimaryGalaxy ? 10800 : 6200,
      isPrimaryGalaxy ? 1.22 : 1.14,
      0.08,
      isPrimaryGalaxy ? 0.96 : 0.92,
      0.12,
      isPrimaryGalaxy ? 0.048 : 0.052
  );

  const whiteArms = createSpiralLayer(
      data,
      isPrimaryGalaxy ? 8200 : 2600,
      isPrimaryGalaxy ? 0.86 : 0.74,
      0.045,
      isPrimaryGalaxy ? 1 : 0.88,
      isPrimaryGalaxy ? 0.86 : 0.66,
      isPrimaryGalaxy ? 0.072 : 0.058
  );

  const core = createCoreLayer(data, isPrimaryGalaxy ? 1150 : 720);

  const hitArea = new THREE.Mesh(
      new THREE.CircleGeometry(1.9, 48),
      new THREE.MeshBasicMaterial({
        color: "#ffffff",
        transparent: true,
        opacity: 0,
        depthWrite: false
      })
  );

  group.position.set(data.position[0], data.position[1], data.position[2]);
  group.rotation.z = data.rotation;
  group.scale.setScalar(data.scale);

  haze.userData.nebulaSpinSpeed = 0.006 / data.scale;
  colorDust.userData.nebulaSpinSpeed = 0.024 / data.scale;
  whiteArms.userData.nebulaSpinSpeed = 0.031 / data.scale;
  core.userData.nebulaSpinSpeed = 0.004 / data.scale;

  hitArea.userData = {
    id: data.id
  };

  group.add(haze, colorDust, whiteArms, core, hitArea);

  return {
    data,
    group,
    hitArea
  };
}

function createSpiralLayer(
    data: NebulaGalaxy,
    count: number,
    radiusScale: number,
    zJitter: number,
    opacity: number,
    whiteBias: number,
    pointSize: number
) {
  const geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(count * 3);

  const colors = new Float32Array(count * 3);

  const orbitData = createOrbitData(count, data.flatten ?? 0.5);

  const galaxyColor = new THREE.Color(data.color);

  const accentColor = new THREE.Color(data.accent);

  const deepColor = new THREE.Color("#050716");

  for (let index = 0; index < count; index += 1) {
    const i3 = index * 3;

    const arm = index % data.arms;

    const radius = Math.random() ** (whiteBias > 0.5 ? 0.68 : 0.56) * 2.05 * radiusScale;

    const armAngle = (arm / data.arms) * Math.PI * 2;

    const angleSpread = whiteBias > 0.5 ? 0.13 + radius * 0.055 : 0.44 + radius * 0.16;

    const angle = armAngle + radius * data.spin * 0.76 + randomSpread(angleSpread);

    const thickness = whiteBias > 0.5 ? 0.032 + radius * 0.05 : 0.09 + radius * 0.12;

    const normalizedRadius = Math.min(radius / (2.05 * radiusScale), 1);

    const innerGlow = Math.max(0, 1 - radius / 1.58);

    const armGlow = Math.max(0, 1 - normalizedRadius * 0.82);

    const colorStrength = whiteBias > 0.5 ? 0.42 + armGlow * 0.14 : 0.82 + armGlow * 0.18;

    const highlightStrength = whiteBias > 0.5 ?
        Math.min(0.88, 0.38 + innerGlow * 0.3 - normalizedRadius * 0.08) :
        Math.min(0.34, 0.08 + innerGlow * 0.18);

    const color = deepColor.
        clone().
        lerp(galaxyColor, colorStrength).
        lerp(accentColor, highlightStrength);

    const brightness = whiteBias > 0.5 ?
        0.82 + armGlow * 0.24 + Math.random() * 0.14 :
        0.52 + armGlow * 0.32 + Math.random() * 0.2;

    const offsetX = whiteBias > 0.5 ? randomGaussian() * thickness : randomSpread(thickness);

    const offsetY = whiteBias > 0.5 ? randomGaussian() * thickness : randomSpread(thickness);

    const z = randomSpread(zJitter);

    positions[i3] = Math.cos(angle) * radius + offsetX;
    positions[i3 + 1] = Math.sin(angle) * radius * (data.flatten ?? 0.5) + offsetY;
    positions[i3 + 2] = z;

    writeOrbitData(orbitData, index, radius, angle, offsetX, offsetY, z);

    colors[i3] = color.r * brightness;
    colors[i3 + 1] = color.g * brightness;
    colors[i3 + 2] = color.b * brightness;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const points = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        size: pointSize,
        map: sparkTexture ?? undefined,
        transparent: true,
        opacity,
        vertexColors: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      })
  );

  points.userData.nebulaOrbit = orbitData;

  return points;
}

function createCoreLayer(data: NebulaGalaxy, count: number) {
  const geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(count * 3);

  const colors = new Float32Array(count * 3);

  const orbitData = createOrbitData(count, data.flatten ?? 0.5);

  const accentColor = new THREE.Color(data.accent);

  const coreColor = accentColor.clone().lerp(new THREE.Color("#ffffff"), 0.38);

  for (let index = 0; index < count; index += 1) {
    const i3 = index * 3;

    const radius = Math.random() ** 1.62 * 0.55;

    const angle = Math.random() * Math.PI * 2;

    const color = accentColor.clone().lerp(coreColor, 0.62 + Math.random() * 0.22);

    const brightness = 1.04 + Math.random() * 0.38;

    const offsetX = randomSpread(0.055);

    const offsetY = randomSpread(0.035);

    const z = randomSpread(0.025);

    positions[i3] = Math.cos(angle) * radius + offsetX;
    positions[i3 + 1] = Math.sin(angle) * radius * (data.flatten ?? 0.5) + offsetY;
    positions[i3 + 2] = z;

    writeOrbitData(orbitData, index, radius, angle, offsetX, offsetY, z, 1.2);

    colors[i3] = color.r * brightness;
    colors[i3 + 1] = color.g * brightness;
    colors[i3 + 2] = color.b * brightness;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const points = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        size: 0.07,
        map: sparkTexture ?? undefined,
        transparent: true,
        opacity: 0.94,
        vertexColors: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      })
  );

  points.userData.nebulaOrbit = orbitData;

  return points;
}

function createHazeLayer(data: NebulaGalaxy, count: number) {
  const geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(count * 3);

  const colors = new Float32Array(count * 3);

  const orbitData = createOrbitData(count, (data.flatten ?? 0.5) * 0.88);

  const galaxyColor = new THREE.Color(data.color);

  const deepColor = new THREE.Color("#050716");

  const isPrimaryGalaxy = data.id === "ai";

  for (let index = 0; index < count; index += 1) {
    const i3 = index * 3;

    const radius = Math.random() ** (isPrimaryGalaxy ? 0.42 : 0.36) * (isPrimaryGalaxy ? 2.88 : 2.58);

    const angle = Math.random() * Math.PI * 2;

    const normalizedRadius = Math.min(radius / (isPrimaryGalaxy ? 2.88 : 2.58), 1);

    const color = deepColor.clone().lerp(galaxyColor, (isPrimaryGalaxy ? 0.72 : 0.58) + (1 - normalizedRadius) * 0.22);

    const brightness = (isPrimaryGalaxy ? 0.22 : 0.18) + (1 - normalizedRadius) * 0.18 + Math.random() * 0.16;

    const offsetX = randomSpread(0.13);

    const offsetY = randomSpread(0.14);

    const z = randomSpread(0.1);

    positions[i3] = Math.cos(angle) * radius + offsetX;
    positions[i3 + 1] = Math.sin(angle) * radius * ((data.flatten ?? 0.5) * 0.88) + offsetY;
    positions[i3 + 2] = z;

    writeOrbitData(orbitData, index, radius, angle, offsetX, offsetY, z, 0.28);

    colors[i3] = color.r * brightness;
    colors[i3 + 1] = color.g * brightness;
    colors[i3 + 2] = color.b * brightness;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const points = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        size: 0.046,
        map: sparkTexture ?? undefined,
        transparent: true,
        opacity: 0.78,
        vertexColors: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      })
  );

  points.userData.nebulaOrbit = orbitData;

  return points;
}

function createOrbitData(count: number, flatten: number): NebulaOrbitData {
  return {
    radii: new Float32Array(count),
    angles: new Float32Array(count),
    offsetX: new Float32Array(count),
    offsetY: new Float32Array(count),
    z: new Float32Array(count),
    rates: new Float32Array(count),
    flatten
  };
}

function writeOrbitData(
    orbitData: NebulaOrbitData,
    index: number,
    radius: number,
    angle: number,
    offsetX: number,
    offsetY: number,
    z: number,
    rateScale = 1
) {
  orbitData.radii[index] = radius;
  orbitData.angles[index] = angle;
  orbitData.offsetX[index] = offsetX;
  orbitData.offsetY[index] = offsetY;
  orbitData.z[index] = z;
  orbitData.rates[index] = (0.985 + Math.random() * 0.03) * rateScale;
}

function randomSpread(scale: number) {
  return (Math.random() - 0.5) * scale;
}

function randomGaussian() {
  const u = Math.max(Math.random(), Number.EPSILON);

  const v = Math.max(Math.random(), Number.EPSILON);

  return Math.sqrt(-2 * Math.log(u)) * Math.cos(Math.PI * 2 * v) * 0.5;
}

function resize() {
  const container = nebulaRef.value;

  if (!container || !camera || !renderer) {
    return;
  }

  const rect = container.getBoundingClientRect();

  const width = Math.max(rect.width, 1);

  const height = Math.max(rect.height, 1);

  camera.aspect = width / height;
  cameraBaseZ = width < 680 ? 14.8 : 11.25;
  camera.position.z = cameraBaseZ;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
  applyResponsiveGalaxyLayout(width);
}

function applyResponsiveGalaxyLayout(width: number) {
  const isCompact = width < 680;

  const xScale = isCompact ? 0.5 : 1;

  const yScale = isCompact ? 1.08 : 1;

  const yOffset = isCompact ? -0.92 : 0;

  const galaxyScale = isCompact ? 0.82 : 1;

  for (const object of galaxyObjects) {
    object.group.position.set(
        object.data.position[0] * xScale,
        object.data.position[1] * yScale + yOffset,
        object.data.position[2]
    );
    object.group.userData.layoutScale = galaxyScale;
  }
}

function update() {
  if (!scene || !camera || !renderer) {
    return;
  }

  const time = performance.now() * 0.001;

  const delta = lastFrameTime ? Math.min(time - lastFrameTime, 0.04) : 0;

  lastFrameTime = time;

  pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * 0.045;
  pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * 0.045;

  camera.position.x = 0;
  camera.position.y = 0.2;
  camera.position.z = cameraBaseZ;
  camera.lookAt(0, 0, 0);

  if (starField) {
    starField.rotation.z = time * 0.004;
    starField.rotation.x = 0;
    starField.rotation.y = 0;
  }

  if (brightStarField) {
    brightStarField.rotation.z = time * 0.006;
    brightStarField.rotation.x = 0;
    brightStarField.rotation.y = 0;
  }

  for (const object of galaxyObjects) {
    const isActive = activeGalaxyId.value === object.data.id;

    const isHovered = hoveredGalaxyId.value === object.data.id;

    const layoutScale = Number(object.group.userData.layoutScale ?? 1);

    const targetScale = object.data.scale * layoutScale;

    const targetOpacity = isActive ? 1 : (isHovered ? 0.92 : 0.78);

    object.group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.06);
    object.group.children.forEach(child => {
      if (!(child instanceof THREE.Points)) {
        return;
      }

      animateNebulaLayer(child, delta);

      const material = getObjectMaterial(child);

      if (material && "opacity" in material) {
        material.opacity += (targetOpacity - material.opacity) * 0.04;
      }
    });
  }

  renderer.render(scene, camera);
  frameId = requestAnimationFrame(update);
}

function animateNebulaLayer(points: THREE.Points, delta: number) {
  const orbitData = points.userData.nebulaOrbit as NebulaOrbitData | undefined;

  const spinSpeed = Number(points.userData.nebulaSpinSpeed ?? 0);

  if (!orbitData || !spinSpeed || delta <= 0) {
    return;
  }

  const positionAttribute = points.geometry.getAttribute("position") as THREE.BufferAttribute;

  const positions = positionAttribute.array as Float32Array;

  const phase = Number(points.userData.nebulaSpinPhase ?? 0) + spinSpeed * delta;

  points.userData.nebulaSpinPhase = phase;

  for (let index = 0; index < orbitData.radii.length; index += 1) {
    const i3 = index * 3;

    const angle = orbitData.angles[index] + phase * orbitData.rates[index];

    const radius = orbitData.radii[index];

    positions[i3] = Math.cos(angle) * radius + orbitData.offsetX[index];
    positions[i3 + 1] = Math.sin(angle) * radius * orbitData.flatten + orbitData.offsetY[index];
    positions[i3 + 2] = orbitData.z[index];
  }

  positionAttribute.needsUpdate = true;
}

function getObjectMaterial(object: THREE.Object3D) {
  const mesh = object as THREE.Points | THREE.Mesh;

  return Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
}

function handlePointerMove(event: PointerEvent) {
  const container = nebulaRef.value;

  if (!container || !camera) {
    return;
  }

  const rect = container.getBoundingClientRect();

  const x = (event.clientX - rect.left) / rect.width;

  const y = (event.clientY - rect.top) / rect.height;

  pointerTarget = {
    x: (x - 0.5) * 2,
    y: (0.5 - y) * 2
  };

  pointer.set(x * 2 - 1, -(y * 2 - 1));
  raycaster.setFromCamera(pointer, camera);

  const hits = raycaster.intersectObjects(galaxyObjects.map(item => {
    return item.hitArea;
  }));

  const nextHoveredId = hits[0]?.object.userData.id ?? "";

  if (nextHoveredId) {
    if (hoverClearTimer) {
      window.clearTimeout(hoverClearTimer);
      hoverClearTimer = null;
    }

    hoveredGalaxyId.value = nextHoveredId;

    return;
  }

  if (!hoverClearTimer) {
    hoverClearTimer = window.setTimeout(() => {
      hoveredGalaxyId.value = "";
      hoverClearTimer = null;
    }, 90);
  }
}

function handlePointerLeave() {
  if (hoverClearTimer) {
    window.clearTimeout(hoverClearTimer);
    hoverClearTimer = null;
  }

  hoveredGalaxyId.value = "";
  pointerTarget = {
    x: 0,
    y: 0
  };
}

function handleClick() {
  if (hoveredGalaxyId.value) {
    activeGalaxyId.value = hoveredGalaxyId.value;
  }
}

function disposeScene() {
  const container = nebulaRef.value;

  cancelAnimationFrame(frameId);
  container?.removeEventListener("pointermove", handlePointerMove);
  container?.removeEventListener("pointerleave", handlePointerLeave);
  container?.removeEventListener("click", handleClick);
  window.removeEventListener("resize", resize);

  if (hoverClearTimer) {
    window.clearTimeout(hoverClearTimer);
    hoverClearTimer = null;
  }

  if (starField) {
    disposeObject(starField);
  }

  if (brightStarField) {
    disposeObject(brightStarField);
  }

  for (const object of galaxyObjects) {
    disposeObject(object.group);
  }

  sparkTexture?.dispose();
  renderer?.dispose();
  renderer?.domElement.remove();

  scene = null;
  camera = null;
  renderer = null;
  starField = null;
  brightStarField = null;
  galaxyObjects = [];
  sparkTexture = null;
}

function disposeObject(object: THREE.Object3D) {
  object.traverse(child => {
    const geometryOwner = child as THREE.Mesh | THREE.Points;

    const material = getObjectMaterial(child);

    geometryOwner.geometry?.dispose();
    material?.dispose();
  });
}
</script>

<template>
  <section
    class="nebula-page"
    :class="{ 'is-webgl-fallback': isWebglFallback }"
  >
    <div
      ref="nebulaRef"
      class="nebula-canvas"
      :class="{ 'is-hovering': hoveredGalaxyId }"
    ></div>

    <div
      v-if="isWebglFallback"
      class="fallback-galaxies"
    >
      <button
        v-for="item in galaxies"
        :key="item.id"
        class="fallback-galaxy"
        :class="{ 'is-active': activeGalaxyId === item.id }"
        :style="{
          '--fallback-color': item.color,
          '--fallback-x': `${50 + item.position[0] * 7.8}%`,
          '--fallback-y': `${52 - item.position[1] * 14}%`,
          '--fallback-scale': item.scale
        }"
        type="button"
        @click="activeGalaxyId = item.id"
      >
        <span class="fallback-spiral"></span>
      </button>
    </div>

    <div class="nebula-vignette"></div>
  </section>
</template>

<style scoped>
.nebula-page {
  position: relative;
  width: 100vw;
  max-width: 100vw;
  height: 100%;
  min-height: 620px;
  overflow: hidden;
  color: #f4f8ff;
  background:
    radial-gradient(circle at 50% 40%, rgba(30, 50, 105, 0.11), transparent 40%),
    radial-gradient(circle at 8% 82%, rgba(58, 36, 84, 0.08), transparent 30%),
    #010312;
}

.nebula-canvas {
  position: absolute;
  inset: 0;
}

.nebula-canvas :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}

.nebula-canvas.is-hovering {
  cursor: pointer;
}

.nebula-vignette {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(90deg, rgba(1, 3, 18, 0.48), transparent 22%, transparent 72%, rgba(1, 3, 18, 0.54)),
    radial-gradient(circle at center, transparent 44%, rgba(0, 0, 0, 0.4) 100%);
}

.fallback-galaxies {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.fallback-galaxy {
  position: absolute;
  left: var(--fallback-x);
  top: var(--fallback-y);
  width: calc(156px * var(--fallback-scale));
  aspect-ratio: 1;
  padding: 0;
  border: 0;
  color: #ffffff;
  background: transparent;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

.fallback-spiral {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background:
    radial-gradient(circle at center, rgba(255, 255, 255, 0.92), transparent 12%),
    repeating-conic-gradient(
      from 32deg,
      color-mix(in srgb, var(--fallback-color) 78%, white) 0deg 12deg,
      transparent 12deg 34deg
    );
  filter: blur(0.7px) drop-shadow(0 0 14px var(--fallback-color));
  opacity: 0.8;
  transform: scaleY(0.56) rotate(-18deg);
  animation: fallback-spin 18s linear infinite;
}

.fallback-galaxy.is-active .fallback-spiral {
  opacity: 1;
  filter: blur(0.4px) drop-shadow(0 0 22px var(--fallback-color));
}

@keyframes fallback-spin {
  to {
    transform: scaleY(0.56) rotate(342deg);
  }
}

@media (max-width: 900px) {
  .nebula-page {
    min-height: 720px;
  }
}

@media (max-width: 640px) {
  .nebula-page {
    min-height: 760px;
  }

  .fallback-galaxy {
    width: calc(118px * var(--fallback-scale));
  }
}
</style>
