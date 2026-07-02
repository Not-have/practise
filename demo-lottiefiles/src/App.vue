<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import lottie, { type AnimationItem } from 'lottie-web'

import { gachaMachineAnimation } from './gachaAnimation'

const animationElement = ref<HTMLDivElement | null>(null)
const isPlaying = ref(false)

let animation: AnimationItem | null = null

const handlePlay = () => {
  if (!animation || isPlaying.value) return

  isPlaying.value = true
  animation.stop()
  animation.playSegments([0, 119], true)
}

onMounted(() => {
  if (!animationElement.value) return

  animation = lottie.loadAnimation({
    container: animationElement.value,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    animationData: gachaMachineAnimation,
  })

  animation.addEventListener('complete', () => {
    isPlaying.value = false
  })
  animation.goToAndStop(0, true)
})

onBeforeUnmount(() => {
  animation?.destroy()
  animation = null
})
</script>

<template>
  <main class="demo-page">
    <section class="animation-card" aria-label="Lottie 动画播放示例">
      <div class="stage">
        <div class="lights" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div ref="animationElement" class="lottie-player" :class="{ playing: isPlaying }"></div>
      </div>

      <div class="controls">
        <p class="eyebrow">Lottie Demo</p>
        <h1>动画播放</h1>
        <button class="play-button" type="button" :disabled="isPlaying" @click="handlePlay">
          <span class="play-icon" aria-hidden="true"></span>
          {{ isPlaying ? '播放中' : '播放动画' }}
        </button>
      </div>
    </section>
  </main>
</template>

<style scoped>
:global(*) {
  box-sizing: border-box;
}

:global(body) {
  min-width: 320px;
  margin: 0;
  color: #171925;
  background:
    radial-gradient(circle at 16% 14%, rgba(255, 210, 90, 0.34), transparent 24rem),
    linear-gradient(135deg, #fff7e8 0%, #edf8ff 48%, #f7ecff 100%);
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

button {
  font: inherit;
}

.demo-page {
  display: grid;
  min-height: 100vh;
  place-items: center;
  padding: clamp(18px, 5vw, 56px);
}

.animation-card {
  display: grid;
  width: min(720px, 100%);
  min-height: min(820px, calc(100vh - 72px));
  grid-template-rows: 1fr auto;
  overflow: hidden;
  border: 2px solid rgba(23, 25, 37, 0.12);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.74);
  box-shadow: 0 24px 80px rgba(81, 75, 115, 0.16);
}

.stage {
  position: relative;
  display: grid;
  min-height: 460px;
  place-items: center;
  padding: clamp(20px, 5vw, 40px);
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.55) 1px, transparent 1px),
    linear-gradient(0deg, rgba(255, 255, 255, 0.55) 1px, transparent 1px),
    #d9f1ff;
  background-size: 34px 34px;
}

.lights {
  position: absolute;
  top: 26px;
  left: 50%;
  display: flex;
  gap: 12px;
  transform: translateX(-50%);
}

.lights span {
  width: 14px;
  height: 14px;
  border: 2px solid #171925;
  border-radius: 50%;
  background: #ffd35a;
  box-shadow: 0 0 16px rgba(255, 194, 71, 0.9);
}

.lights span:nth-child(2) {
  background: #8ce8ca;
}

.lights span:nth-child(3) {
  background: #f69ac7;
}

.lottie-player {
  width: min(78vw, 520px);
  aspect-ratio: 1;
}

.lottie-player.playing {
  animation: stage-bump 0.42s ease-in-out 3;
}

.controls {
  display: grid;
  gap: 16px;
  justify-items: center;
  padding: 28px;
  border-top: 2px solid rgba(23, 25, 37, 0.12);
  background: #fffdfa;
}

.eyebrow,
h1 {
  margin: 0;
}

.eyebrow {
  color: #cb4962;
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
}

h1 {
  font-size: clamp(2.5rem, 8vw, 5rem);
  line-height: 0.95;
}

.play-button {
  display: inline-flex;
  min-width: 168px;
  min-height: 54px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 0;
  border-radius: 999px;
  color: #171925;
  background: #ffc247;
  box-shadow: inset 0 -5px 0 rgba(23, 25, 37, 0.18), 0 14px 28px rgba(203, 73, 98, 0.22);
  cursor: pointer;
  font-weight: 900;
}

.play-button:hover:not(:disabled) {
  transform: translateY(-1px);
}

.play-button:disabled {
  cursor: wait;
  opacity: 0.72;
}

.play-icon {
  width: 0;
  height: 0;
  border-top: 9px solid transparent;
  border-bottom: 9px solid transparent;
  border-left: 15px solid #171925;
}

@keyframes stage-bump {
  0%,
  100% {
    transform: rotate(0deg);
  }

  35% {
    transform: rotate(-1.4deg) translateY(-3px);
  }

  70% {
    transform: rotate(1.4deg) translateY(2px);
  }
}

@media (max-width: 560px) {
  .demo-page {
    padding: 16px;
  }

  .animation-card {
    min-height: calc(100vh - 32px);
  }

  .stage {
    min-height: 360px;
  }
}
</style>
