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

function handleBackPlanet() {
  if (stage.value !== "map") return;

  void runTransition(async () => {
    stage.value = "planet";
    selectedPlanetId.value = null;
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
    />
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
</style>
