<script setup lang="ts">
import type { AgentNode } from "../types";

defineProps<{
  agent: AgentNode | null;
  visible: boolean;
}>();

defineEmits<{
  close: [];
}>();
</script>

<template>
  <aside
    v-if="agent"
    class="agent-panel"
    :class="{ 'agent-panel--visible': visible }"
  >
    <button
      class="agent-panel__close"
      type="button"
      aria-label="关闭智能体信息"
      @click="$emit('close')"
    >
      ×
    </button>
    <p class="agent-panel__eyebrow">
      AI Agent
    </p>
    <h2>{{ agent.name }}</h2>
    <p class="agent-panel__summary">
      {{ agent.summary }}
    </p>
    <div class="agent-panel__tags">
      <span
        v-for="tag in agent.tags"
        :key="tag"
      >
        {{ tag }}
      </span>
    </div>
    <div class="agent-panel__resources">
      <div class="agent-panel__resource-head">
        <span>相关资源</span>
        <strong>{{ agent.resourceCount }}</strong>
      </div>
      <ul>
        <li
          v-for="resource in agent.resources"
          :key="resource"
        >
          {{ resource }}
        </li>
      </ul>
    </div>
    <button
      class="agent-panel__action"
      type="button"
    >
      查看详情
    </button>
  </aside>
</template>

<style scoped>
.agent-panel {
  position: absolute;
  right: clamp(18px, 3vw, 36px);
  top: 112px;
  z-index: 4;
  width: min(360px, calc(100vw - 36px));
  padding: 22px;
  border: 1px solid rgba(127, 213, 255, 0.28);
  border-radius: 8px;
  background: linear-gradient(145deg, rgba(7, 18, 42, 0.78), rgba(9, 15, 31, 0.58));
  box-shadow: 0 0 42px rgba(43, 196, 255, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(18px);
  color: #eef9ff;
  opacity: 0;
  transform: translateX(18px);
  transition: opacity 220ms ease, transform 220ms ease;
}

.agent-panel--visible {
  opacity: 1;
  transform: translateX(0);
}

.agent-panel__close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  border: 1px solid rgba(151, 219, 255, 0.24);
  border-radius: 50%;
  background: rgba(11, 29, 57, 0.72);
  color: #c8efff;
  cursor: pointer;
  font-size: 22px;
  line-height: 1;
}

.agent-panel__eyebrow {
  margin: 0 0 8px;
  color: #7ee7ff;
  font-size: 12px;
  letter-spacing: 0;
  text-transform: uppercase;
}

.agent-panel h2 {
  margin: 0;
  max-width: calc(100% - 42px);
  color: #ffffff;
  font-size: 26px;
  line-height: 1.15;
}

.agent-panel__summary {
  margin: 12px 0 18px;
  color: rgba(226, 244, 255, 0.78);
  font-size: 14px;
  line-height: 1.7;
}

.agent-panel__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.agent-panel__tags span {
  border: 1px solid rgba(127, 213, 255, 0.26);
  border-radius: 999px;
  padding: 6px 10px;
  background: rgba(20, 67, 104, 0.34);
  color: #d8f6ff;
  font-size: 12px;
}

.agent-panel__resources {
  border-top: 1px solid rgba(127, 213, 255, 0.14);
  padding-top: 16px;
}

.agent-panel__resource-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #a9dcf4;
  font-size: 13px;
}

.agent-panel__resource-head strong {
  color: #ffffff;
  font-size: 22px;
}

.agent-panel ul {
  display: grid;
  gap: 8px;
  margin: 12px 0 20px;
  padding: 0;
  list-style: none;
}

.agent-panel li {
  border-left: 2px solid rgba(84, 218, 255, 0.54);
  padding-left: 10px;
  color: rgba(230, 246, 255, 0.82);
  font-size: 13px;
  line-height: 1.45;
}

.agent-panel__action {
  width: 100%;
  border: 1px solid rgba(111, 220, 255, 0.48);
  border-radius: 8px;
  padding: 12px 16px;
  background: linear-gradient(90deg, rgba(26, 133, 211, 0.84), rgba(110, 87, 255, 0.72));
  color: #ffffff;
  cursor: pointer;
  font-weight: 700;
  box-shadow: 0 0 24px rgba(51, 191, 255, 0.22);
}

@media (max-width: 820px) {
  .agent-panel {
    top: auto;
    right: 14px;
    bottom: 16px;
    left: 14px;
    width: auto;
    max-height: 45vh;
    overflow: auto;
  }
}
</style>
