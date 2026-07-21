<script setup lang="ts">
import {
  AmbientLight,
  Color,
  DirectionalLight,
  FogExp2,
  Group,
  PerspectiveCamera,
  Raycaster,
  Scene,
  SRGBColorSpace,
  Vector2,
  Vector3,
  WebGLRenderer
} from "three";
import { gsap } from "gsap";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import type { AgentNode, GalaxyDefinition, SceneLabel, SceneStage, TooltipState } from "../types";
import { AISystem } from "../three/AISystem";
import { CameraTransition } from "../three/CameraTransition";
import { Galaxy } from "../three/Galaxy";
import { StarField } from "../three/StarField";
import AgentInfoPanel from "./AgentInfoPanel.vue";

const canvasRef = ref<HTMLCanvasElement | null>(null);
const shellRef = ref<HTMLDivElement | null>(null);
const stage = ref<SceneStage>("universe");
const labels = ref<SceneLabel[]>([]);
const tooltip = ref<TooltipState>({
  visible: false,
  text: "",
  x: 0,
  y: 0
});
const selectedAgent = ref<AgentNode | null>(null);
const hoveredGalaxyId = ref<string | null>(null);
const hoveredPlanetId = ref<string | null>(null);
const selectedPlanetId = ref<string | null>(null);
const webglError = ref(false);

let renderer: WebGLRenderer | undefined;
let scene: Scene | undefined;
let camera: PerspectiveCamera | undefined;
let starField: StarField | undefined;
let aiSystem: AISystem | undefined;
let galaxies: Galaxy[] = [];
let animationFrame = 0;
let raycaster: Raycaster | undefined;
let reducedMotion = false;
let cameraTarget = new Vector3(0, 0, 0);
let cameraTransition: CameraTransition | undefined;
let previousFrameTime = 0;

const galaxyDefinitions: GalaxyDefinition[] = [
  {
    id: "ai",
    name: "人工智能星系",
    position: [0, 0, 0],
    color: "#55e7ff",
    accent: "#b8fbff",
    size: 5.8,
    particleCount: 2600,
    isPrimary: true
  },
  {
    id: "culture",
    name: "文化星系",
    position: [-10.6, 3.2, -3.2],
    color: "#ff72d2",
    accent: "#ffd3f2",
    size: 2.8,
    particleCount: 920
  },
  {
    id: "customer",
    name: "客户星系",
    position: [10.2, 2.8, -4.4],
    color: "#5affb2",
    accent: "#d9ffef",
    size: 2.65,
    particleCount: 860
  },
  {
    id: "rd",
    name: "研发星系",
    position: [-8.4, -4.8, 1.6],
    color: "#8e72ff",
    accent: "#d9d1ff",
    size: 2.45,
    particleCount: 820
  },
  {
    id: "knowledge",
    name: "知识星系",
    position: [8.9, -4.2, 1.2],
    color: "#58a8ff",
    accent: "#d8ecff",
    size: 2.55,
    particleCount: 860
  },
  {
    id: "operation",
    name: "运营星系",
    position: [0.4, 6.9, -3.8],
    color: "#ffd166",
    accent: "#fff2c1",
    size: 2.36,
    particleCount: 780
  }
];

const agentNodes: AgentNode[] = [
  {
    id: "orchestrator",
    name: "中枢调度智能体",
    summary: "统一理解业务目标，编排模型、工具与知识资源完成复杂任务。",
    color: "#55e7ff",
    position: [0, 0, 0],
    radius: 1.62,
    tags: ["任务编排", "策略路由", "多模型协同", "审计追踪"],
    resources: ["企业流程图谱", "工具调用日志", "智能体权限矩阵"],
    resourceCount: 128
  },
  {
    id: "insight",
    name: "洞察分析智能体",
    summary: "面向经营数据生成趋势判断、异常解释与可执行建议。",
    color: "#5de2ff",
    position: [4.6, 0.5, 1.1],
    radius: 0.72,
    tags: ["指标诊断", "趋势预测", "自动报告"],
    resources: ["BI 数据集", "经营周报", "异常样本库"],
    resourceCount: 46,
    orbitRadius: 4.6,
    orbitSpeed: 0.16,
    orbitPhase: 0.2
  },
  {
    id: "service",
    name: "客户服务智能体",
    summary: "整合客户上下文、知识库和工单系统，辅助响应与升级分流。",
    color: "#ff6ecf",
    position: [-4.2, -0.2, 0.7],
    radius: 0.78,
    tags: ["意图识别", "知识检索", "工单摘要", "情绪感知"],
    resources: ["FAQ 文档", "历史会话", "服务工单"],
    resourceCount: 73,
    orbitRadius: 4.2,
    orbitSpeed: 0.13,
    orbitPhase: 2.4
  },
  {
    id: "research",
    name: "研发助手智能体",
    summary: "连接代码、文档和测试记录，帮助团队定位风险并沉淀方案。",
    color: "#9977ff",
    position: [1.8, 1.1, -3.8],
    radius: 0.74,
    tags: ["代码问答", "变更总结", "测试生成"],
    resources: ["代码仓库", "技术文档", "缺陷记录"],
    resourceCount: 91,
    orbitRadius: 3.9,
    orbitSpeed: 0.12,
    orbitPhase: 4.3
  },
  {
    id: "knowledge",
    name: "知识治理智能体",
    summary: "持续整理企业知识，识别重复、过期与缺失内容。",
    color: "#6dffb2",
    position: [-1.5, -0.7, 4.2],
    radius: 0.68,
    tags: ["知识清洗", "语义聚类", "权限治理"],
    resources: ["制度文档", "项目复盘", "权限标签"],
    resourceCount: 64,
    orbitRadius: 4.4,
    orbitSpeed: 0.105,
    orbitPhase: 5.7
  },
  {
    id: "growth",
    name: "增长运营智能体",
    summary: "围绕用户分群、活动策略和内容资产生成增长实验建议。",
    color: "#5c9dff",
    position: [0.4, -1.3, -5.1],
    radius: 0.7,
    tags: ["用户分群", "活动策略", "效果复盘"],
    resources: ["营销素材", "用户画像", "实验记录"],
    resourceCount: 58,
    orbitRadius: 5.1,
    orbitSpeed: 0.095,
    orbitPhase: 1.5
  }
];

const primaryGalaxy = computed(() => galaxyDefinitions.find((galaxy) => galaxy.isPrimary));
const showGuide = computed(() => stage.value === "universe" || stage.value === "ai-system");

onMounted(() => {
  initScene();
  window.addEventListener("resize", resizeRenderer);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeRenderer);
  cancelAnimationFrame(animationFrame);
  cameraTransition?.kill();
  disposeScene();
});

function initScene(): void {
  const canvas = canvasRef.value;
  const shell = shellRef.value;
  if (!canvas || !shell) {
    return;
  }

  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  scene = new Scene();
  scene.background = new Color("#030815");
  scene.fog = new FogExp2("#06112a", 0.022);

  try {
    renderer = new WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance"
    });
  } catch (error) {
    webglError.value = true;
    console.error(error);
    return;
  }

  renderer.outputColorSpace = SRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.65));

  camera = new PerspectiveCamera(48, 1, 0.1, 240);
  camera.position.set(0, 7, 26);
  camera.lookAt(cameraTarget);

  raycaster = new Raycaster();
  cameraTransition = new CameraTransition();

  starField = new StarField(reducedMotion ? 850 : 1500);
  scene.add(starField.points);

  const universeGroup = new Group();
  galaxies = galaxyDefinitions.map((definition) => new Galaxy(definition));
  galaxies.forEach((galaxy) => universeGroup.add(galaxy.group));
  scene.add(universeGroup);

  aiSystem = new AISystem(agentNodes);
  aiSystem.setVisibility(0);
  scene.add(aiSystem.group);

  const ambient = new AmbientLight("#82b8ff", 1.4);
  const keyLight = new DirectionalLight("#ffffff", 2.6);
  keyLight.position.set(7, 8, 10);
  scene.add(ambient, keyLight);

  resizeRenderer();
  bindCanvasEvents(canvas);
  previousFrameTime = performance.now() * 0.001;
  animate(previousFrameTime * 1000);
}

function bindCanvasEvents(canvas: HTMLCanvasElement): void {
  canvas.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointerleave", onPointerLeave);
}

function disposeScene(): void {
  const canvas = canvasRef.value;
  canvas?.removeEventListener("pointermove", onPointerMove);
  canvas?.removeEventListener("pointerdown", onPointerDown);
  canvas?.removeEventListener("pointerleave", onPointerLeave);
  starField?.dispose();
  aiSystem?.dispose();
  galaxies.forEach((galaxy) => galaxy.dispose());
  renderer?.dispose();
  galaxies = [];
}

function resizeRenderer(): void {
  const shell = shellRef.value;
  if (!shell || !renderer || !camera) {
    return;
  }

  const { width, height } = shell.getBoundingClientRect();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.65));
  renderer.setSize(width, height, false);
  camera.aspect = width / Math.max(height, 1);
  camera.updateProjectionMatrix();
}

function animate(frameTime: number): void {
  animationFrame = requestAnimationFrame(animate);
  if (!renderer || !scene || !camera) {
    return;
  }

  const elapsed = frameTime * 0.001;
  const delta = Math.min(Math.max(elapsed - previousFrameTime, 0), 0.033);
  previousFrameTime = elapsed;
  starField?.update(elapsed);
  galaxies.forEach((galaxy) => galaxy.update(delta, elapsed));
  aiSystem?.update(delta, elapsed);
  camera.lookAt(cameraTarget);
  renderer.render(scene, camera);
  updateLabels();
}

function onPointerMove(event: PointerEvent): void {
  if (!camera || !raycaster || stage.value === "entering") {
    return;
  }

  const pointer = pointerFromEvent(event);
  if (!pointer) {
    return;
  }

  raycaster.setFromCamera(pointer, camera);

  if (stage.value === "universe") {
    const hit = raycaster.intersectObjects(galaxies.map((galaxy) => galaxy.hitMesh), true)[0];
    const id = hit?.object.userData.id as string | undefined;
    setHoveredGalaxy(id ?? null);
    setCursor(Boolean(id));
    tooltip.value.visible = false;
    return;
  }

  const planetObjects = aiSystem?.planets.map((planet) => planet.hitMesh) ?? [];
  const hit = raycaster.intersectObjects(planetObjects, true)[0];
  const id = hit?.object.userData.id as string | undefined;
  setHoveredPlanet(id ?? null, event);
  setCursor(Boolean(id));
}

function onPointerDown(event: PointerEvent): void {
  if (stage.value === "entering") {
    return;
  }

  if (stage.value === "universe") {
    if (hoveredGalaxyId.value === "ai") {
      enterAIGalaxy();
    }
    return;
  }

  if (hoveredPlanetId.value) {
    selectPlanet(hoveredPlanetId.value);
    return;
  }

  if (stage.value === "planet-selected") {
    clearPlanetSelection();
  }
}

function onPointerLeave(): void {
  setHoveredGalaxy(null);
  setHoveredPlanet(null);
  setCursor(false);
}

function pointerFromEvent(event: PointerEvent): Vector2 | null {
  const canvas = canvasRef.value;
  if (!canvas) {
    return null;
  }

  const rect = canvas.getBoundingClientRect();
  return new Vector2(
    ((event.clientX - rect.left) / rect.width) * 2 - 1,
    -((event.clientY - rect.top) / rect.height) * 2 + 1
  );
}

function setHoveredGalaxy(id: string | null): void {
  hoveredGalaxyId.value = id;
  galaxies.forEach((galaxy) => galaxy.setHover(galaxy.definition.id === id));
}

function setHoveredPlanet(id: string | null, event?: PointerEvent): void {
  hoveredPlanetId.value = id;
  aiSystem?.setHover(id);

  const planet = id ? aiSystem?.getPlanetById(id) : undefined;
  if (planet && event) {
    tooltip.value = {
      visible: true,
      text: planet.agent.summary,
      x: event.clientX + 14,
      y: event.clientY + 14
    };
  } else {
    tooltip.value.visible = false;
  }
}

function setCursor(active: boolean): void {
  if (canvasRef.value) {
    canvasRef.value.style.cursor = active ? "pointer" : "default";
  }
}

function enterAIGalaxy(): void {
  if (!camera || !cameraTransition || !starField || !aiSystem) {
    return;
  }

  const galaxy = galaxies.find((item) => item.definition.id === "ai");
  if (!galaxy) {
    return;
  }

  stage.value = "entering";
  selectedAgent.value = null;
  selectedPlanetId.value = null;
  setHoveredGalaxy("ai");
  galaxy.setSelected(true);
  setCursor(false);

  const transitionValues = {
    fade: 1,
    aiVisibility: 0,
    warp: 0,
    primaryScale: 1
  };

  const applyTransition = (): void => {
    starField?.setWarp(transitionValues.warp);
    galaxies.forEach((item) => {
      const isPrimary = item.definition.id === "ai";
      item.setFade(isPrimary ? Math.max(transitionValues.fade, 0.08) : transitionValues.fade * 0.55);
      if (isPrimary) {
        item.setTransitionScale(transitionValues.primaryScale);
      }
    });
    aiSystem?.setVisibility(transitionValues.aiVisibility);
  };

  const timeline = cameraTransition.enterGalaxy({
    camera,
    target: cameraTarget,
    galaxyPosition: galaxy.group.position.clone(),
    reducedMotion,
    onRush: () => {
      setHoveredGalaxy(null);
      galaxy.setSelected(true);
    },
    onArrive: () => {
      aiSystem?.setVisibility(Math.max(transitionValues.aiVisibility, 0.15));
    },
    onComplete: () => {
      transitionValues.fade = 0;
      transitionValues.warp = 0;
      transitionValues.aiVisibility = 1;
      applyTransition();
      galaxy.setSelected(false);
      stage.value = "ai-system";
    }
  });

  timeline.to(transitionValues, {
    warp: reducedMotion ? 0.3 : 1,
    duration: reducedMotion ? 0.12 : 1.15,
    ease: "power2.in",
    onUpdate: applyTransition
  }, 0.45 * (reducedMotion ? 0.18 : 1));

  timeline.to(transitionValues, {
    fade: 0,
    primaryScale: reducedMotion ? 1.6 : 3.15,
    duration: reducedMotion ? 0.18 : 1.55,
    ease: "power2.inOut",
    onUpdate: applyTransition
  }, 0.52 * (reducedMotion ? 0.18 : 1));

  timeline.to(transitionValues, {
    aiVisibility: 1,
    warp: 0,
    duration: reducedMotion ? 0.18 : 0.82,
    ease: "power2.out",
    onUpdate: applyTransition
  }, reducedMotion ? 0.2 : 1.95);
}

function selectPlanet(id: string): void {
  if (!camera || !cameraTransition || !aiSystem) {
    return;
  }

  const planet = aiSystem.getPlanetById(id);
  if (!planet) {
    return;
  }

  const position = planet.getWorldPosition(new Vector3());
  selectedPlanetId.value = id;
  selectedAgent.value = planet.agent;
  stage.value = "planet-selected";
  aiSystem.setSelected(id);
  tooltip.value.visible = false;

  cameraTransition.focusPlanet({
    camera,
    target: cameraTarget,
    planetPosition: position,
    reducedMotion
  });
}

function clearPlanetSelection(): void {
  if (!camera || !cameraTransition || !aiSystem) {
    return;
  }

  selectedPlanetId.value = null;
  selectedAgent.value = null;
  stage.value = "ai-system";
  aiSystem.setSelected(null);
  cameraTransition.resetToAISystem(camera, cameraTarget, reducedMotion);
}

function updateLabels(): void {
  if (!camera || !renderer) {
    return;
  }

  const size = renderer.getSize(new Vector2());
  const nextLabels: SceneLabel[] = [];

  if (stage.value === "universe" || stage.value === "entering") {
    galaxies.forEach((galaxy) => {
      const projected = projectWorldPosition(galaxy.getLabelPosition(new Vector3()), size.x, size.y);
      nextLabels.push({
        id: galaxy.definition.id,
        kind: "galaxy",
        text: galaxy.definition.name,
        x: projected.x,
        y: projected.y,
        active: galaxy.definition.id === "ai",
        highlighted: hoveredGalaxyId.value === galaxy.definition.id,
        visible: projected.visible && (stage.value === "universe" || galaxy.definition.id === "ai")
      });
    });
  }

  if (stage.value === "ai-system" || stage.value === "planet-selected") {
    aiSystem?.planets.forEach((planet) => {
      const projected = projectWorldPosition(planet.getLabelPosition(new Vector3()), size.x, size.y);
      nextLabels.push({
        id: planet.agent.id,
        kind: "planet",
        text: planet.agent.name,
        x: projected.x,
        y: projected.y,
        active: selectedPlanetId.value === planet.agent.id,
        highlighted: hoveredPlanetId.value === planet.agent.id,
        visible: projected.visible
      });
    });
  }

  labels.value = nextLabels;
}

function projectWorldPosition(position: Vector3, width: number, height: number): { x: number; y: number; visible: boolean } {
  const vector = position.clone().project(camera as PerspectiveCamera);
  return {
    x: (vector.x * 0.5 + 0.5) * width,
    y: (-vector.y * 0.5 + 0.5) * height,
    visible: vector.z > -1 && vector.z < 1
  };
}

function handleLabelPointerDown(label: SceneLabel): void {
  if (label.kind === "galaxy" && label.id === "ai" && stage.value === "universe") {
    enterAIGalaxy();
    return;
  }

  if (label.kind === "planet" && stage.value !== "entering") {
    selectPlanet(label.id);
  }
}
</script>

<template>
  <section
    ref="shellRef"
    class="universe-scene"
    :class="`universe-scene--${stage}`"
  >
    <canvas
      ref="canvasRef"
      class="universe-scene__canvas"
      aria-label="企业宇宙到 AI 星系内部的交互式 3D 场景"
    />

    <div
      v-if="webglError"
      class="scene-webgl-fallback"
    >
      <p>当前浏览器未能创建 WebGL 上下文</p>
      <span>请开启硬件加速或使用支持 WebGL 的浏览器查看 3D 企业宇宙。</span>
    </div>

    <div class="scene-nav">
      <strong>Enterprise Universe</strong>
      <span>{{ stage === "universe" ? "企业宇宙" : "AI 星系内部" }}</span>
    </div>

    <div class="scene-stats">
      <div>
        <strong>{{ galaxyDefinitions.length }}</strong>
        <span>星系</span>
      </div>
      <div>
        <strong>{{ agentNodes.length }}</strong>
        <span>智能体</span>
      </div>
    </div>

    <aside
      v-if="showGuide"
      class="scene-guide"
    >
      <p>{{ stage === "universe" ? "选择中央星系" : "选择智能体星球" }}</p>
      <h1>{{ stage === "universe" ? primaryGalaxy?.name : "AI Agent System" }}</h1>
      <span>
        {{ stage === "universe"
          ? "悬停任意星系查看反馈，点击中央人工智能星系进入内部。"
          : "悬停星球查看能力摘要，点击后相机会靠近并展示资源信息。" }}
      </span>
    </aside>

    <div class="scene-labels">
      <button
        v-for="label in labels"
        v-show="label.visible"
        :key="`${label.kind}-${label.id}`"
        class="scene-label"
        :class="{
          'scene-label--active': label.active,
          'scene-label--highlighted': label.highlighted
        }"
        type="button"
        :style="{ transform: `translate3d(${label.x}px, ${label.y}px, 0)` }"
        @pointerdown.stop="handleLabelPointerDown(label)"
      >
        {{ label.text }}
      </button>
    </div>

    <div
      v-if="tooltip.visible"
      class="scene-tooltip"
      :style="{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }"
    >
      {{ tooltip.text }}
    </div>

    <AgentInfoPanel
      :agent="selectedAgent"
      :visible="stage === 'planet-selected'"
      @close="clearPlanetSelection"
    />
  </section>
</template>

<style scoped>
.universe-scene {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 42%, rgba(23, 76, 143, 0.22), transparent 36%),
    linear-gradient(180deg, #020614 0%, #040817 52%, #02040b 100%);
  color: #eef8ff;
  isolation: isolate;
}

.universe-scene__canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  animation: scene-fade-in 900ms ease both;
}

.scene-nav {
  position: absolute;
  top: 22px;
  left: clamp(18px, 3vw, 36px);
  right: clamp(18px, 3vw, 36px);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  height: 54px;
  border: 1px solid rgba(139, 219, 255, 0.18);
  border-radius: 8px;
  padding: 0 18px;
  background: rgba(4, 13, 31, 0.42);
  box-shadow: 0 0 32px rgba(40, 177, 255, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(16px);
}

.scene-nav strong {
  color: #ffffff;
  font-size: 15px;
}

.scene-nav span {
  color: rgba(213, 241, 255, 0.7);
  font-size: 13px;
}

.scene-stats {
  position: absolute;
  top: 96px;
  left: clamp(18px, 3vw, 36px);
  z-index: 3;
  display: flex;
  gap: 10px;
}

.scene-stats div {
  min-width: 92px;
  border: 1px solid rgba(139, 219, 255, 0.2);
  border-radius: 8px;
  padding: 12px 14px;
  background: rgba(5, 16, 37, 0.52);
  box-shadow: 0 0 24px rgba(44, 183, 255, 0.1);
  backdrop-filter: blur(14px);
}

.scene-stats strong {
  display: block;
  color: #ffffff;
  font-size: 24px;
  line-height: 1;
}

.scene-stats span {
  display: block;
  margin-top: 5px;
  color: rgba(210, 239, 255, 0.66);
  font-size: 12px;
}

.scene-guide {
  position: absolute;
  right: clamp(18px, 3vw, 36px);
  top: 96px;
  z-index: 3;
  width: min(330px, calc(100vw - 36px));
  border: 1px solid rgba(139, 219, 255, 0.2);
  border-radius: 8px;
  padding: 18px;
  background: rgba(5, 16, 37, 0.48);
  box-shadow: 0 0 32px rgba(44, 183, 255, 0.11);
  backdrop-filter: blur(16px);
  transition: opacity 220ms ease, transform 220ms ease;
}

.universe-scene--planet-selected .scene-guide {
  opacity: 0;
  pointer-events: none;
  transform: translateX(12px);
}

.scene-guide p {
  margin: 0 0 8px;
  color: #76e7ff;
  font-size: 12px;
}

.scene-guide h1 {
  margin: 0 0 10px;
  color: #ffffff;
  font-size: clamp(24px, 3vw, 34px);
  line-height: 1.1;
}

.scene-guide span {
  display: block;
  color: rgba(224, 244, 255, 0.72);
  font-size: 13px;
  line-height: 1.7;
}

.scene-labels {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
}

.scene-label {
  position: absolute;
  left: 0;
  top: 0;
  max-width: 180px;
  border: 1px solid rgba(122, 216, 255, 0.22);
  border-radius: 999px;
  padding: 7px 11px;
  background: rgba(6, 19, 42, 0.62);
  box-shadow: 0 0 18px rgba(72, 201, 255, 0.12);
  color: rgba(232, 249, 255, 0.82);
  cursor: pointer;
  font-size: 12px;
  line-height: 1;
  white-space: nowrap;
  pointer-events: auto;
  translate: -50% -50%;
  backdrop-filter: blur(10px);
  transition: border-color 160ms ease, color 160ms ease, box-shadow 160ms ease, background 160ms ease;
}

.scene-label--active,
.scene-label--highlighted {
  border-color: rgba(128, 235, 255, 0.65);
  background: rgba(17, 68, 106, 0.72);
  box-shadow: 0 0 28px rgba(72, 213, 255, 0.28);
  color: #ffffff;
}

.scene-tooltip {
  position: fixed;
  z-index: 5;
  max-width: 260px;
  border: 1px solid rgba(139, 219, 255, 0.25);
  border-radius: 8px;
  padding: 10px 12px;
  background: rgba(4, 13, 31, 0.76);
  box-shadow: 0 0 24px rgba(44, 183, 255, 0.14);
  color: rgba(231, 248, 255, 0.86);
  font-size: 12px;
  line-height: 1.55;
  pointer-events: none;
  backdrop-filter: blur(14px);
}

.scene-webgl-fallback {
  position: absolute;
  left: 50%;
  top: 52%;
  z-index: 4;
  width: min(420px, calc(100vw - 40px));
  border: 1px solid rgba(139, 219, 255, 0.24);
  border-radius: 8px;
  padding: 20px;
  background: rgba(5, 16, 37, 0.64);
  box-shadow: 0 0 34px rgba(44, 183, 255, 0.14);
  text-align: center;
  transform: translate(-50%, -50%);
  backdrop-filter: blur(16px);
}

.scene-webgl-fallback p {
  margin: 0 0 8px;
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
}

.scene-webgl-fallback span {
  color: rgba(224, 244, 255, 0.72);
  font-size: 13px;
  line-height: 1.6;
}

@keyframes scene-fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@media (max-width: 820px) {
  .scene-nav {
    top: 14px;
    height: 48px;
  }

  .scene-stats {
    top: 76px;
    left: 14px;
  }

  .scene-stats div {
    min-width: 76px;
    padding: 10px 12px;
  }

  .scene-guide {
    top: auto;
    right: 14px;
    bottom: 16px;
    left: 14px;
    width: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .universe-scene__canvas {
    animation-duration: 120ms;
  }

  .scene-guide,
  .scene-label {
    transition-duration: 80ms;
  }
}
</style>
