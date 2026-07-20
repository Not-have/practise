<script setup lang="ts">
import {
  ref
} from "vue";

import GalaxyCanvas from "./components/GalaxyCanvas.vue";
import {
  galaxyData
} from "./galaxyData";
import type {
  GalaxyStage
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

function handleBackGalaxy() {
  if (stage.value === "galaxy") return;

  void runTransition(async () => {
    stage.value = "galaxy";
    selectedGalaxyId.value = null;
    selectedPlanetId.value = null;
    await canvasRef.value?.enterGalaxyOverview();
  });
}

</script>

<template>
  <section class="planet-demo-02">
    <GalaxyCanvas
      ref="canvasRef"
      @select-galaxy="handleSelectGalaxy"
      @select-planet="handleSelectPlanet"
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
        disabled
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
