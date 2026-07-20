<script setup lang="ts">
import {
  onBeforeUnmount,
  onMounted,
  ref
} from "vue";
import {
  useResizeObserver
} from "@vueuse/core";

import {
  galaxyData
} from "../galaxyData";
import {
  GalaxyScene
} from "../three/GalaxyScene";

const emit = defineEmits<{
  selectGalaxy: [id: string];
  selectPlanet: [id: string];
}>();

const containerRef = ref<HTMLElement | null>(null);
let galaxyScene: GalaxyScene | null = null;

onMounted(() => {
  if (!containerRef.value) return;

  galaxyScene = new GalaxyScene({
    container: containerRef.value,
    data: galaxyData,
    onSelectGalaxy: (id) => {
      emit("selectGalaxy", id);
    },
    onSelectPlanet: (id) => {
      emit("selectPlanet", id);
    }
  });
});

useResizeObserver(containerRef, () => {
  galaxyScene?.resize();
});

onBeforeUnmount(() => {
  galaxyScene?.dispose();
  galaxyScene = null;
});

defineExpose({
  enterGalaxyOverview: () => {
    return galaxyScene?.enterGalaxyOverview() ?? Promise.resolve();
  },
  enterGalaxy: (galaxyId: string) => {
    return galaxyScene?.enterGalaxy(galaxyId) ?? Promise.resolve();
  },
  enterPlanetMap: (planetId: string) => {
    return galaxyScene?.enterPlanetMap(planetId) ?? Promise.resolve();
  },
  focusPlanet: (planetId: string) => {
    return galaxyScene?.focusPlanet(planetId) ?? Promise.resolve();
  },
  enterPlanetSystem: () => {
    return galaxyScene?.enterPlanetSystem() ?? Promise.resolve();
  }
});
</script>

<template>
  <div
    ref="containerRef"
    class="galaxy-canvas"
  />
</template>

<style scoped>
.galaxy-canvas {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.galaxy-canvas :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
