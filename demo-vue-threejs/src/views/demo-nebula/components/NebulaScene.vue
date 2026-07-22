<script lang="ts" setup>

// 声明 Vue 单文件组件脚本区域。
import {
  ref
} from "vue"; // 引入 Vue ref 用于绑定 DOM 容器。

import {
  useNebulaScene
} from "../utils/useNebulaScene"; // 引入星云场景组合式逻辑。

const nebulaRef = ref<HTMLDivElement | null>(null); // 创建星云画布容器引用。

const {
  galaxies, activeGalaxyId, hoveredGalaxyId, isWebglFallback
} = useNebulaScene(nebulaRef); // 启动星云场景并暴露模板状态。
</script>

<template>
  <!--
 声明组件模板。
-->
  <section
    class="nebula-page"
    :class="{ 'is-webgl-fallback': isWebglFallback }"
  >
    <!--
 星云 WebGL 画布容器。
-->
    <div
      ref="nebulaRef"
      class="nebula-canvas"
      :class="{ 'is-hovering': hoveredGalaxyId }"
    ></div>

    <!--
 WebGL 不可用时显示 CSS 备用星系。
-->
    <div
      v-if="isWebglFallback"
      class="fallback-galaxies"
    >
      <!--
 遍历生成备用星系按钮。
-->
      <button
        v-for="item in galaxies"
        :key="item.id"
        class="fallback-galaxy"
        :class="{ 'is-active': activeGalaxyId === item.id }"
        :style="{
          '--fallback-color': item.nebula.color,
          '--fallback-x': `${50 + item.position[0] * 7.8}%`,
          '--fallback-y': `${52 - item.position[1] * 14}%`,
          '--fallback-scale': item.nebula.scale
        }"
        type="button"
        @click="activeGalaxyId = item.id"
      >
        <!--
 备用星系的旋臂图形。
-->
        <span class="fallback-spiral"></span>
      </button>
    </div>

    <!--
 深空暗角遮罩。
-->
    <div class="nebula-vignette"></div>
  </section>
</template>

<style scoped>
/* 声明组件局部样式。 */
.nebula-page { /* 设置星云页面容器。 */
  position: relative; /* 作为绝对定位子元素的参照。 */
  width: 100vw; /* 铺满视口宽度。 */
  max-width: 100vw; /* 限制最大宽度不超过视口。 */
  height: 100%; /* 继承父容器高度。 */
  min-height: 620px; /* 设置桌面端最小高度。 */
  overflow: hidden; /* 隐藏星云溢出部分。 */
  color: #f4f8ff; /* 设置默认文字颜色。 */
  background: /* 设置深空背景渐变。 */
    radial-gradient(circle at 50% 40%, rgba(30, 50, 105, 0.11), transparent 40%), /* 设置中心冷蓝微光。 */
    radial-gradient(circle at 8% 82%, rgba(58, 36, 84, 0.08), transparent 30%), /* 设置左下暗紫微光。 */
    #010312; /* 设置深蓝黑底色。 */
} /* 星云页面容器样式结束。 */

.nebula-canvas { /* 设置 WebGL 画布容器。 */
  position: absolute; /* 让画布覆盖整个页面。 */
  inset: 0; /* 贴齐四个方向。 */
} /* WebGL 画布容器样式结束。 */

.nebula-canvas :deep(canvas) { /* 设置 Three.js 生成的 canvas。 */
  display: block; /* 去掉 canvas 行内空隙。 */
  width: 100%; /* 让 canvas 宽度铺满容器。 */
  height: 100%; /* 让 canvas 高度铺满容器。 */
} /* canvas 样式结束。 */

.nebula-canvas.is-hovering { /* 设置悬停星系时的画布状态。 */
  cursor: pointer; /* 展示可点击光标。 */
} /* 悬停状态样式结束。 */

.nebula-vignette { /* 设置暗角遮罩。 */
  position: absolute; /* 让遮罩覆盖页面。 */
  inset: 0; /* 贴齐四个方向。 */
  pointer-events: none; /* 避免遮罩拦截鼠标。 */
  background: /* 设置暗角和边缘压暗。 */
    linear-gradient(90deg, rgba(1, 3, 18, 0.48), transparent 22%, transparent 72%, rgba(1, 3, 18, 0.54)), /* 设置左右边缘暗角。 */
    radial-gradient(circle at center, transparent 44%, rgba(0, 0, 0, 0.4) 100%); /* 设置外围径向暗角。 */
} /* 暗角遮罩样式结束。 */

.fallback-galaxies { /* 设置备用星系容器。 */
  position: absolute; /* 让备用容器覆盖页面。 */
  inset: 0; /* 贴齐四个方向。 */
  z-index: 1; /* 放在暗角下方、背景上方。 */
} /* 备用星系容器样式结束。 */

.fallback-galaxy { /* 设置单个备用星系按钮。 */
  position: absolute; /* 使用百分比定位到指定位置。 */
  left: var(--fallback-x); /* 使用配置计算出的 X 坐标。 */
  top: var(--fallback-y); /* 使用配置计算出的 Y 坐标。 */
  width: calc(156px * var(--fallback-scale)); /* 根据星系比例设置尺寸。 */
  aspect-ratio: 1; /* 保持正方形外框。 */
  padding: 0; /* 清除按钮默认内边距。 */
  border: 0; /* 清除按钮默认边框。 */
  color: #ffffff; /* 设置按钮文字颜色。 */
  background: transparent; /* 设置按钮背景透明。 */
  transform: translate(-50%, -50%); /* 让定位点位于按钮中心。 */
  cursor: pointer; /* 展示可点击光标。 */
} /* 单个备用星系按钮样式结束。 */

.fallback-spiral { /* 设置备用星系旋臂图形。 */
  position: absolute; /* 覆盖按钮区域。 */
  inset: 0; /* 贴齐四个方向。 */
  border-radius: 50%; /* 创建圆形外轮廓。 */
  background: /* 创建 CSS 旋涡纹理。 */
    radial-gradient(circle at center, rgba(255, 255, 255, 0.92), transparent 12%), /* 设置中心白核。 */
    repeating-conic-gradient( /* 设置重复锥形渐变旋臂。 */
      from 32deg, /* 设置旋臂起始角度。 */
      color-mix(in srgb, var(--fallback-color) 78%, white) 0deg 12deg, /* 设置亮色旋臂段。 */
      transparent 12deg 34deg /* 设置透明间隔段。 */
    ); /* 锥形渐变结束。 */
  filter: blur(0.7px) drop-shadow(0 0 14px var(--fallback-color)); /* 设置模糊和发光。 */
  opacity: 0.8; /* 设置默认透明度。 */
  transform: scaleY(0.56) rotate(-18deg); /* 压扁并旋转备用星系。 */
  animation: fallback-spin 18s linear infinite; /* 播放备用旋转动画。 */
} /* 备用星系旋臂样式结束。 */

.fallback-galaxy.is-active .fallback-spiral { /* 设置激活备用星系。 */
  opacity: 1; /* 提升激活星系透明度。 */
  filter: blur(0.4px) drop-shadow(0 0 22px var(--fallback-color)); /* 增强激活星系发光。 */
} /* 激活备用星系样式结束。 */

@keyframes fallback-spin { /* 定义备用星系旋转动画。 */
  to { /* 设置动画结束状态。 */
    transform: scaleY(0.56) rotate(342deg); /* 旋转到一圈后的角度。 */
  } /* 动画结束帧结束。 */
} /* 备用旋转动画结束。 */

@media (max-width: 900px) { /* 设置中小屏适配。 */
  .nebula-page { /* 调整页面容器。 */
    min-height: 720px; /* 增加中小屏最小高度。 */
  } /* 中小屏页面容器结束。 */
} /* 中小屏媒体查询结束。 */

@media (max-width: 640px) { /* 设置移动端适配。 */
  .nebula-page { /* 调整移动端页面容器。 */
    min-height: 760px; /* 增加移动端最小高度。 */
  } /* 移动端页面容器结束。 */

  .fallback-galaxy { /* 调整移动端备用星系。 */
    width: calc(118px * var(--fallback-scale)); /* 缩小移动端备用星系尺寸。 */
  } /* 移动端备用星系结束。 */
} /* 移动端媒体查询结束。 */
</style>
