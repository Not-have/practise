<script setup lang="ts">
import {
  computed
} from "vue";
import {
  VueFlow
} from "@vue-flow/core";

import "@vue-flow/core/dist/style.css";
import "@vue-flow/core/dist/theme-default.css";

import type {
  PlanetItem,
  PlanetTask
} from "../types";

const props = defineProps<{
  planet: PlanetItem | null;
}>();

const fallbackTasks: PlanetTask[] = [
  {
    id: "intro",
    title: "什么是当前星球？",
    description: "认识这个学习主题的核心概念。",
    status: "done"
  },
  {
    id: "observe",
    title: "如何观察关键现象？",
    description: "通过示例理解知识点之间的联系。",
    status: "active"
  },
  {
    id: "practice",
    title: "完成一次探索任务",
    description: "把知识点应用到一次小挑战里。",
    status: "locked"
  }
];

const tasks = computed(() => {
  return props.planet?.tasks.length ? props.planet.tasks : fallbackTasks;
});

const pathPositions = [
  {
    x: 116,
    y: 32
  },
  {
    x: 214,
    y: 236
  },
  {
    x: 136,
    y: 440
  },
  {
    x: 244,
    y: 644
  },
  {
    x: 166,
    y: 848
  },
  {
    x: 264,
    y: 1052
  },
  {
    x: 184,
    y: 1256
  },
  {
    x: 284,
    y: 1460
  }
];

const arcPath = "M59 83 C 82 146, 126 183, 157 287 C 132 350, 92 383, 79 491 C 114 552, 167 604, 187 695 C 166 760, 111 814, 109 899 C 142 968, 196 1017, 207 1103 C 177 1170, 136 1218, 127 1307 C 163 1372, 213 1415, 227 1511";

const stepMaskHoles = computed(() => {
  return tasks.value.map((_, index) => {
    const position = pathPositions[index] ?? {
      x: index % 2 === 0 ? 166 : 264,
      y: 32 + index * 204
    };

    return {
      id: `step-mask-${index}`,
      x: position.x - 57,
      y: position.y + 51
    };
  });
});

const nodes = computed(() => {
  return tasks.value.map((task, index) => {
    const position = pathPositions[index] ?? {
      x: index % 2 === 0 ? 166 : 264,
      y: 32 + index * 204
    };

    return {
      id: task.id,
      type: "task",
      position: {
        x: position.x,
        y: position.y
      },
      data: {
        task,
        order: String(index + 1).padStart(2, "0")
      },
      draggable: false
    };
  });
});

const edges = computed(() => {
  return [];
});

const progressText = computed(() => {
  const doneCount = tasks.value.filter((task) => {
    return task.status === "done";
  }).length;

  return `${doneCount}/${tasks.value.length}`;
});

const planetTone = computed(() => {
  return {
    "--planet-tone": props.planet?.color ?? "#58f3e2"
  };
});
</script>

<template>
  <section
    class="planet-detail-map"
    :style="planetTone"
  >
    <header class="detail-header">
      <h2>{{ planet?.name ?? "星球详情" }}</h2>
      <div class="progress">
        <span>探索进度</span>
        <i />
        <strong>{{ progressText }}</strong>
      </div>
    </header>

    <div class="flow-shell">
      <svg
        class="explore-arc"
        viewBox="0 0 260 1580"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <mask id="explore-arc-gap-mask">
            <rect
              width="260"
              height="1580"
              fill="white"
            />
            <circle
              v-for="hole in stepMaskHoles"
              :key="hole.id"
              :cx="hole.x"
              :cy="hole.y"
              r="33"
              fill="black"
            />
          </mask>
        </defs>
        <path
          class="arc-main"
          :d="arcPath"
        />
        <path
          class="arc-glow"
          :d="arcPath"
        />
      </svg>
      <VueFlow
        class="explore-flow"
        :nodes="nodes"
        :edges="edges"
        :default-viewport="{ x: 0, y: 0, zoom: 1 }"
        :nodes-draggable="false"
        :nodes-connectable="false"
        :elements-selectable="false"
        :pan-on-drag="false"
        :zoom-on-scroll="false"
        :zoom-on-pinch="false"
        :zoom-on-double-click="false"
      >
        <template #node-task="{ data }">
          <article
            class="task-node"
            :class="`is-${data.task.status}`"
          >
            <span
              class="task-index"
              :class="`is-${data.task.status}`"
            >
              {{ data.order }}
            </span>
            <div class="task-copy">
              <small>
                {{
                  data.task.status === "done"
                    ? "已探索"
                    : data.task.status === "active"
                      ? "当前关卡"
                      : "未解锁"
                }}
              </small>
              <h3>{{ data.task.title }}</h3>
              <p>{{ data.task.description }}</p>
              <em>互动方式：观察示例、拖拽判断、完成一次小任务</em>
            </div>
            <div class="task-preview">
              <b />
              <b />
              <b />
            </div>
          </article>
        </template>
      </VueFlow>
    </div>
  </section>
</template>

<style scoped>
.planet-detail-map {
  position: absolute;
  inset: 0 0 0 30%;
  z-index: 2;
  display: grid;
  grid-template-rows: 78px 1fr;
  color: #f7fbff;
  pointer-events: auto;
  background: transparent;
}

.detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 28px 8px;
}

.detail-header h2 {
  margin: 0;
  font-size: 20px;
  letter-spacing: 0;
}

.progress {
  display: grid;
  grid-template-columns: auto 150px auto;
  gap: 10px;
  align-items: center;
  color: #dce7ff;
  font-size: 13px;
  font-weight: 700;
}

.progress i {
  display: block;
  height: 7px;
  overflow: hidden;
  border-radius: 999px;
  background:
    linear-gradient(90deg, #58f3e2 0 48%, #7d7cff 48% 64%, transparent 64%),
    rgba(255, 255, 255, 0.13);
}

.flow-shell {
  position: relative;
  overflow: hidden auto;
  padding-bottom: 120px;
  scrollbar-width: thin;
  scrollbar-color: rgba(102, 195, 255, 0.68) rgba(255, 255, 255, 0.08);
}

.flow-shell::-webkit-scrollbar {
  width: 4px;
}

.flow-shell::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.06);
}

.flow-shell::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: rgba(102, 195, 255, 0.72);
}

.explore-arc {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 260px;
  height: 1580px;
  overflow: visible;
  pointer-events: none;
}

.explore-arc path {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  mask: url("#explore-arc-gap-mask");
}

.arc-main {
  stroke: color-mix(in srgb, var(--planet-tone) 58%, #8fdcff);
  stroke-width: 4.5;
  stroke-dasharray: 20 26;
}

.arc-glow {
  stroke: color-mix(in srgb, var(--planet-tone) 34%, #6fb5ff);
  stroke-width: 8;
  stroke-dasharray: 20 26;
  opacity: 0.34;
  filter: blur(0.6px);
}

.explore-flow {
  width: 100%;
  height: max(100%, 1580px);
  background: transparent;
}

.explore-flow :deep(.vue-flow__viewport) {
  z-index: 2;
}

.explore-flow :deep(.vue-flow__pane) {
  cursor: default;
}

.explore-flow :deep(.vue-flow__node) {
  width: clamp(340px, 42vw, 520px);
}

.explore-flow :deep(.vue-flow__handle) {
  opacity: 0;
}

.explore-flow :deep(.vue-flow__edge-path) {
  display: none;
}

.task-node {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 118px;
  gap: 18px;
  min-height: 104px;
  padding: 14px 16px;
  border: 1px solid rgba(88, 181, 221, 0.42);
  border-radius: 8px;
  background: rgba(7, 18, 42, 0.82);
  box-shadow: 0 18px 46px rgba(0, 0, 0, 0.24);
  backdrop-filter: blur(12px);
}

.task-node.is-active {
  border-color: rgba(89, 189, 255, 0.88);
  background: rgba(13, 38, 82, 0.88);
  box-shadow:
    0 0 0 1px rgba(111, 206, 255, 0.14),
    0 18px 58px rgba(29, 119, 255, 0.22);
}

.task-node.is-locked {
  opacity: 0.45;
}

.task-index {
  position: absolute;
  z-index: 4;
  top: 30px;
  left: -78px;
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border-radius: 50%;
  background: linear-gradient(135deg, #61f4bd, #74c9ff);
  color: #052038;
  font-size: 12px;
  font-weight: 900;
  box-shadow:
    0 0 0 5px rgba(82, 242, 196, 0.13),
    0 0 20px rgba(98, 240, 211, 0.38);
}

.task-index.is-active {
  background: linear-gradient(135deg, #7fe7ff, #5595ff);
  box-shadow:
    0 0 0 5px rgba(100, 170, 255, 0.16),
    0 0 24px rgba(98, 184, 255, 0.48);
}

.task-index.is-locked {
  background: #17253f;
  color: rgba(202, 219, 255, 0.68);
  box-shadow:
    0 0 0 5px rgba(68, 88, 126, 0.12),
    0 0 18px rgba(51, 83, 132, 0.18);
}

.task-copy small {
  display: inline-flex;
  margin-bottom: 6px;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(72, 230, 174, 0.14);
  color: #72f0c8;
  font-size: 11px;
  font-style: normal;
}

.task-copy h3 {
  margin: 0;
  color: #ffffff;
  font-size: 16px;
}

.task-copy p,
.task-copy em {
  display: block;
  margin-top: 7px;
  color: #c5d5f1;
  font-size: 12px;
  font-style: normal;
  line-height: 1.55;
}

.task-preview {
  display: flex;
  gap: 7px;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
}

.task-preview b {
  display: block;
  width: 24px;
  height: 24px;
  border: 1px solid rgba(151, 183, 235, 0.56);
  border-radius: 4px;
  background: rgba(79, 122, 183, 0.18);
}
</style>
