<script setup lang="ts">
import {
  computed,
  ref
} from "vue";

import GalaxyCanvas from "./components/GalaxyCanvas.vue";
import PlanetDetailMap from "./components/PlanetDetailMap.vue";
import {
  galaxyData
} from "./galaxyData";
import type {
  GalaxyStage,
  PlanetLabelPosition
} from "./types";

type GalaxyCanvasExpose = {
  enterGalaxyOverview: () => Promise<void>;
  enterGalaxy: (galaxyId: string) => Promise<void>;
  enterPlanetMap: (planetId: string) => Promise<void>;
  focusPlanet: (planetId: string) => Promise<void>;
  enterPlanetSystem: () => Promise<void>;
};

const stage = ref<GalaxyStage>("galaxy");
const selectedGalaxyId = ref<string | null>(null);
const selectedPlanetId = ref<string | null>(null);
const isAnimating = ref(false);
const canvasRef = ref<GalaxyCanvasExpose | null>(null);
const planetLabels = ref<PlanetLabelPosition[]>([]);

const selectedGalaxy = computed(() => {
  return galaxyData.find((item) => {
    return item.id === selectedGalaxyId.value;
  }) ?? null;
});

const selectedPlanet = computed(() => {
  return selectedGalaxy.value?.planets.find((item) => {
    return item.id === selectedPlanetId.value;
  }) ?? null;
});

async function runTransition(action: () => Promise<void>) {
  if (isAnimating.value) return;

  isAnimating.value = true;

  try {
    await action();
  } finally {
    isAnimating.value = false;
  }
}

function handleSelectGalaxy(galaxyId: string) {
  void runTransition(async () => {
    selectedGalaxyId.value = galaxyId;
    selectedPlanetId.value = null;
    stage.value = "planet";
    await canvasRef.value?.enterGalaxy(galaxyId);
    selectedPlanetId.value = galaxyData.find((item) => {
      return item.id === galaxyId;
    })?.planets[0]?.id ?? null;
  });
}

function handleSelectPlanet(planetId: string) {
  void runTransition(async () => {
    selectedPlanetId.value = planetId;
    stage.value = "planet";
    await canvasRef.value?.focusPlanet(planetId);
  });
}

function handleOpenPlanetDetail(planetId: string) {
  void runTransition(async () => {
    selectedPlanetId.value = planetId;
    stage.value = "map";
    await canvasRef.value?.enterPlanetMap(planetId);
  });
}

function handleBackGalaxy() {
  if (stage.value === "galaxy") return;

  void runTransition(async () => {
    stage.value = "galaxy";
    selectedGalaxyId.value = null;
    selectedPlanetId.value = null;
    await canvasRef.value?.enterGalaxyOverview();
  });
}

function handleBackPlanetSystem() {
  if (stage.value !== "map") return;

  void runTransition(async () => {
    stage.value = "planet";
    await canvasRef.value?.enterPlanetSystem();
  });
}

</script>

<template>
  <section class="planet-demo-02">
    <GalaxyCanvas
      ref="canvasRef"
      @select-galaxy="handleSelectGalaxy"
      @select-planet="handleSelectPlanet"
      @update-planet-labels="planetLabels = $event"
    />

    <div
      v-if="stage === 'planet'"
      class="planet-label-layer"
    >
      <button
        v-for="label in planetLabels"
        :key="label.id"
        type="button"
        class="planet-name"
        :class="{ front: label.isFront }"
        :style="{
          left: `${label.x}px`,
          top: `${label.y}px`,
          opacity: label.opacity
        }"
        @click.stop="handleOpenPlanetDetail(label.id)"
      >
        {{ label.name }}
      </button>
    </div>

    <PlanetDetailMap
      v-if="stage === 'map'"
      :planet="selectedPlanet"
    />

    <nav class="view-tabs">
      <button
        type="button"
        :class="{ active: stage === 'galaxy' }"
        :disabled="isAnimating"
        @click="handleBackGalaxy"
      >
        宇宙
      </button>
      <button
        type="button"
        :class="{ active: stage === 'planet' }"
        :disabled="stage === 'galaxy' || isAnimating"
        @click="handleBackPlanetSystem"
      >
        星系
      </button>
      <button
        type="button"
        :class="{ active: stage === 'map' }"
        disabled
      >
        星球
      </button>
    </nav>
  </section>
</template>

<style scoped>
.planet-demo-02 {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 640px;
  overflow: hidden;
  background:
    radial-gradient(circle at 42% 48%, rgba(56, 91, 180, 0.2), transparent 32%),
    #050816;
}

.planet-label-layer {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
}

.planet-name {
  position: absolute;
  min-width: 98px;
  padding: 5px 10px;
  border: 0;
  border-radius: 999px;
  background: rgba(7, 18, 42, 0.42);
  color: rgba(255, 255, 255, 0.9);
  font-size: 13px;
  font-weight: 800;
  text-shadow: 0 0 12px rgba(113, 211, 255, 0.6);
  white-space: nowrap;
  cursor: pointer;
  pointer-events: auto;
  transform: translate(-50%, 4px);
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.planet-name.front {
  color: #ffffff;
  font-size: 16px;
  background: rgba(18, 44, 86, 0.5);
}

.planet-name:hover {
  background: rgba(47, 122, 220, 0.72);
  transform: translate(-50%, 0);
}

.view-tabs {
  position: absolute;
  right: 22px;
  bottom: 18px;
  z-index: 3;
  display: inline-flex;
  gap: 5px;
  align-items: center;
  padding: 6px;
  border: 1px solid rgba(84, 145, 255, 0.42);
  border-radius: 999px;
  background: rgba(20, 55, 118, 0.56);
  box-shadow:
    0 0 24px rgba(39, 117, 255, 0.2),
    inset 0 0 18px rgba(105, 168, 255, 0.16);
  backdrop-filter: blur(12px);
}

.view-tabs button {
  min-width: 68px;
  height: 34px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: rgba(214, 229, 255, 0.72);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.view-tabs button::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-right: 7px;
  border: 1px solid currentColor;
  border-radius: 50%;
  vertical-align: 1px;
}

.view-tabs button.active {
  background: linear-gradient(135deg, rgba(57, 134, 255, 0.95), rgba(66, 99, 205, 0.95));
  color: #ffffff;
  box-shadow: 0 0 18px rgba(90, 166, 255, 0.42);
}

.view-tabs button:disabled {
  cursor: default;
}
</style>
