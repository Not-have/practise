<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import lottie, { type AnimationItem } from 'lottie-web'

import { gachaMachineAnimation } from './gachaAnimation'
import { drawEgg, eggPrizes, type EggDrawResult } from './gachaMachine'

const machineElement = ref<HTMLDivElement | null>(null)
const currentEgg = ref<EggDrawResult | null>(null)
const drawHistory = ref<EggDrawResult[]>([])
const isDrawing = ref(false)
const hasDrawn = ref(false)

let machineAnimation: AnimationItem | null = null

const pullCount = computed(() => drawHistory.value.length)
const nextPreview = computed(() => eggPrizes[pullCount.value % eggPrizes.length] ?? eggPrizes[0])
const resultEggStyle = computed(() => ({
  '--egg-color': currentEgg.value?.color ?? nextPreview.value.color,
  '--egg-accent': currentEgg.value?.accent ?? nextPreview.value.accent,
}))

const playMachineAnimation = () =>
  new Promise<void>((resolve) => {
    if (!machineAnimation) {
      window.setTimeout(resolve, 900)
      return
    }

    let finished = false
    const finish = () => {
      if (finished) return
      finished = true
      machineAnimation?.removeEventListener('complete', finish)
      resolve()
    }

    machineAnimation.removeEventListener('complete', finish)
    machineAnimation.addEventListener('complete', finish)
    machineAnimation.setSpeed(1.35)
    machineAnimation.stop()
    machineAnimation.playSegments([0, 119], true)
    window.setTimeout(finish, 1900)
  })

const handleDraw = async () => {
  if (isDrawing.value) return

  isDrawing.value = true

  try {
    await playMachineAnimation()
    const result = drawEgg()
    currentEgg.value = result
    hasDrawn.value = true
    drawHistory.value = [result, ...drawHistory.value].slice(0, 5)
  } finally {
    isDrawing.value = false
  }
}

onMounted(() => {
  if (!machineElement.value) return

  machineAnimation = lottie.loadAnimation({
    container: machineElement.value,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    animationData: gachaMachineAnimation,
  })
  machineAnimation.goToAndStop(0, true)
})

onBeforeUnmount(() => {
  machineAnimation?.destroy()
  machineAnimation = null
})
</script>

<template>
  <main class="gacha-page">
    <section class="machine-panel" aria-label="扭蛋机抽奖">
      <div class="machine-stage">
        <div class="machine-lights" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div ref="machineElement" class="lottie-machine" :class="{ shaking: isDrawing }"></div>
      </div>

      <div class="control-panel">
        <p class="eyebrow">Lottie Gacha</p>
        <h1>扭蛋机</h1>
        <button class="draw-button" type="button" :disabled="isDrawing" @click="handleDraw">
          <span class="coin-icon" aria-hidden="true"></span>
          {{ isDrawing ? '抽取中' : '投币抽蛋' }}
        </button>
      </div>
    </section>

    <section class="result-panel" aria-live="polite">
      <div class="result-showcase">
        <div class="egg-display" :class="{ revealed: hasDrawn }" :style="resultEggStyle">
          <span class="egg-gloss"></span>
          <span class="egg-band"></span>
        </div>
        <div>
          <p class="result-label">{{ hasDrawn ? '本次结果' : '待抽取' }}</p>
          <h2>{{ currentEgg?.name ?? '下一颗蛋正在机器里' }}</h2>
          <p class="result-copy">
            {{ currentEgg ? `${currentEgg.rarity} · ${currentEgg.kind}` : '点击按钮后会产出一颗蛋' }}
          </p>
        </div>
      </div>

      <div class="history-strip" aria-label="抽奖记录">
        <article v-for="egg in drawHistory" :key="egg.serial" class="history-item">
          <span
            class="history-egg"
            :style="{ '--egg-color': egg.color, '--egg-accent': egg.accent }"
            aria-hidden="true"
          ></span>
          <span>{{ egg.name }}</span>
        </article>
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

.gacha-page {
  display: grid;
  min-height: 100vh;
  grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
  gap: 32px;
  align-items: center;
  padding: clamp(24px, 5vw, 64px);
}

.machine-panel,
.result-panel {
  border: 2px solid rgba(23, 25, 37, 0.12);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.74);
  box-shadow: 0 24px 80px rgba(81, 75, 115, 0.16);
}

.machine-panel {
  display: grid;
  min-height: min(720px, calc(100vh - 96px));
  grid-template-rows: 1fr auto;
  overflow: hidden;
}

.machine-stage {
  position: relative;
  display: grid;
  min-height: 480px;
  place-items: center;
  padding: 28px;
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.55) 1px, transparent 1px),
    linear-gradient(0deg, rgba(255, 255, 255, 0.55) 1px, transparent 1px),
    #d9f1ff;
  background-size: 34px 34px;
}

.machine-lights {
  position: absolute;
  top: 26px;
  left: 50%;
  display: flex;
  gap: 12px;
  transform: translateX(-50%);
}

.machine-lights span {
  width: 14px;
  height: 14px;
  border: 2px solid #171925;
  border-radius: 50%;
  background: #ffd35a;
  box-shadow: 0 0 16px rgba(255, 194, 71, 0.9);
}

.machine-lights span:nth-child(2) {
  background: #8ce8ca;
}

.machine-lights span:nth-child(3) {
  background: #f69ac7;
}

.lottie-machine {
  width: min(78vw, 520px);
  aspect-ratio: 1;
}

.lottie-machine.shaking {
  animation: cabinet-bump 0.42s ease-in-out 3;
}

.control-panel {
  display: grid;
  gap: 16px;
  justify-items: center;
  padding: 28px;
  border-top: 2px solid rgba(23, 25, 37, 0.12);
  background: #fffdfa;
}

.eyebrow {
  margin: 0;
  color: #cb4962;
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
}

h1,
h2,
p {
  margin: 0;
}

h1 {
  font-size: clamp(2.5rem, 6vw, 5rem);
  line-height: 0.95;
}

.draw-button {
  display: inline-flex;
  min-width: 178px;
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

.draw-button:hover:not(:disabled) {
  transform: translateY(-1px);
}

.draw-button:disabled {
  cursor: wait;
  opacity: 0.72;
}

.coin-icon {
  width: 22px;
  height: 22px;
  border: 3px solid #171925;
  border-radius: 50%;
  background: #fff8bf;
}

.result-panel {
  display: grid;
  gap: 22px;
  padding: clamp(22px, 4vw, 34px);
}

.result-showcase {
  display: grid;
  gap: 24px;
  align-items: center;
  grid-template-columns: 132px minmax(0, 1fr);
}

.egg-display {
  position: relative;
  width: 120px;
  height: 156px;
  border: 6px solid #171925;
  border-radius: 58% 58% 48% 48% / 66% 66% 42% 42%;
  background: var(--egg-color);
  box-shadow: inset -18px -20px 0 rgba(23, 25, 37, 0.1), 0 18px 34px rgba(81, 75, 115, 0.2);
  transform: rotate(-8deg) scale(0.96);
  transition:
    background 200ms ease,
    transform 320ms ease;
}

.egg-display.revealed {
  animation: egg-pop 520ms cubic-bezier(0.2, 1.35, 0.34, 1) both;
}

.egg-gloss {
  position: absolute;
  top: 26px;
  left: 28px;
  width: 24px;
  height: 46px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.64);
  transform: rotate(26deg);
}

.egg-band {
  position: absolute;
  right: 14px;
  bottom: 34px;
  left: 14px;
  height: 18px;
  border-radius: 999px;
  background: var(--egg-accent);
}

.result-label {
  color: #cb4962;
  font-size: 0.8rem;
  font-weight: 900;
}

.result-showcase h2 {
  margin-top: 6px;
  font-size: clamp(1.6rem, 4vw, 2.6rem);
  line-height: 1.05;
}

.result-copy {
  margin-top: 10px;
  color: #64677a;
  font-weight: 700;
}

.history-strip {
  display: grid;
  gap: 10px;
}

.history-item {
  display: flex;
  min-height: 52px;
  align-items: center;
  gap: 12px;
  border: 2px solid rgba(23, 25, 37, 0.1);
  border-radius: 8px;
  padding: 10px 12px;
  background: #ffffff;
  font-weight: 800;
}

.history-egg {
  width: 28px;
  height: 36px;
  flex: 0 0 auto;
  border: 3px solid #171925;
  border-radius: 58% 58% 48% 48% / 66% 66% 42% 42%;
  background:
    linear-gradient(180deg, transparent 0 56%, var(--egg-accent) 56% 70%, transparent 70%),
    var(--egg-color);
}

@keyframes cabinet-bump {
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

@keyframes egg-pop {
  0% {
    transform: rotate(-8deg) scale(0.72) translateY(18px);
  }

  72% {
    transform: rotate(5deg) scale(1.08) translateY(-4px);
  }

  100% {
    transform: rotate(-4deg) scale(1) translateY(0);
  }
}

@media (max-width: 860px) {
  .gacha-page {
    grid-template-columns: 1fr;
  }

  .machine-panel {
    min-height: auto;
  }

  .machine-stage {
    min-height: 380px;
  }
}

@media (max-width: 560px) {
  .gacha-page {
    gap: 18px;
    padding: 16px;
  }

  .result-showcase {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
  }

  .egg-display {
    width: 104px;
    height: 136px;
  }
}
</style>
