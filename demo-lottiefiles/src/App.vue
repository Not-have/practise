<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import lottie, { type AnimationItem } from 'lottie-web'

import gachaMachineAnimation from './assets/ZS.json'
import { createPixiGachaAnimation } from './pixiGachaAnimation'

const lottieElement = ref<HTMLDivElement | null>(null)
const pixiElement = ref<HTMLDivElement | null>(null)
const isLottiePlaying = ref(false)
const isPixiPlaying = ref(false)

let lottieAnimation: AnimationItem | null = null
let pixiAnimation: Awaited<ReturnType<typeof createPixiGachaAnimation>> | null = null

const lottieEndFrame = Math.max(0, Math.floor((gachaMachineAnimation as { op?: number }).op ?? 120) - 1)

const handleLottiePlay = () => {
  if (!lottieAnimation || isLottiePlaying.value) return

  isLottiePlaying.value = true
  lottieAnimation.stop()
  lottieAnimation.playSegments([0, lottieEndFrame], true)
}

const handlePixiPlay = () => {
  if (!pixiAnimation || isPixiPlaying.value) return

  pixiAnimation.play()
}

onMounted(async () => {
  if (lottieElement.value) {
    lottieAnimation = lottie.loadAnimation({
      container: lottieElement.value,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: gachaMachineAnimation,
    })

    lottieAnimation.addEventListener('complete', () => {
      isLottiePlaying.value = false
    })
    lottieAnimation.goToAndStop(0, true)
  }

  if (pixiElement.value) {
    pixiAnimation = await createPixiGachaAnimation(pixiElement.value, {
      onPlay: () => {
        isPixiPlaying.value = true
      },
      onComplete: () => {
        isPixiPlaying.value = false
      },
    })
  }
})

onBeforeUnmount(() => {
  lottieAnimation?.destroy()
  lottieAnimation = null
  pixiAnimation?.destroy()
  pixiAnimation = null
})
</script>

<template>
  <main class="demo-page">
    <section class="player-card" aria-label="Lottie 动画播放示例">
      <div class="stage">
        <div class="lights" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div ref="lottieElement" class="animation-player lottie-player"></div>
      </div>

      <div class="controls">
        <p class="eyebrow">Lottie</p>
        <h1>JSON 动画</h1>
        <button class="play-button" type="button" :disabled="isLottiePlaying" @click="handleLottiePlay">
          <span class="play-icon" aria-hidden="true"></span>
          {{ isLottiePlaying ? '播放中' : '播放动画' }}
        </button>
      </div>
    </section>

    <section class="player-card" aria-label="Pixi.js 动画播放示例">
      <div class="stage">
        <div class="lights" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div ref="pixiElement" class="animation-player pixi-player"></div>
      </div>

      <div class="controls">
        <p class="eyebrow">Pixi.js</p>
        <h1>Canvas 动画</h1>
        <button class="play-button" type="button" :disabled="isPixiPlaying" @click="handlePixiPlay">
          <span class="play-icon" aria-hidden="true"></span>
          {{ isPixiPlaying ? '播放中' : '播放动画' }}
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
  grid-template-columns: repeat(2, minmax(320px, 1fr));
  gap: clamp(18px, 4vw, 34px);
  align-items: center;
  padding: clamp(18px, 4vw, 48px);
}

.player-card {
  display: grid;
  min-height: min(800px, calc(100vh - 72px));
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
  min-height: 420px;
  place-items: center;
  padding: clamp(20px, 4vw, 36px);
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

.animation-player {
  width: min(34vw, 520px);
  min-width: 280px;
  aspect-ratio: 1;
}

.pixi-player canvas {
  display: block;
  width: 100%;
  height: 100%;
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
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1;
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

@media (max-width: 860px) {
  .demo-page {
    grid-template-columns: 1fr;
  }

  .animation-player {
    width: min(78vw, 520px);
  }
}

@media (max-width: 560px) {
  .demo-page {
    padding: 16px;
  }

  .player-card {
    min-height: auto;
  }

  .stage {
    min-height: 340px;
  }
}
</style>
