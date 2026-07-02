import { Application, Container, Graphics } from 'pixi.js'

import { getPixiGachaFrame, type PixiGachaFrame } from './pixiGachaTimeline'

// 暴露给 Vue 组件使用的最小播放器接口：
// Vue 只需要触发播放和在组件卸载时释放 Pixi 资源。
type PixiGachaPlayer = {
  destroy: () => void
  play: () => void
}

// 外部回调用于同步 Vue 的按钮状态。
// Pixi 内部只负责播放动画，不直接操作 Vue 响应式数据。
type PixiGachaOptions = {
  onComplete?: () => void
  onPlay?: () => void
}

// Pixi 里的图形按一个固定的 420x420 设计稿坐标绘制。
// 真实 DOM 容器变大或变小时，通过 root.scale 等比缩放整台机器。
const animationDurationMs = 1500
const sceneSize = 420
const inkColor = 0x171925

// 通用圆角矩形绘制方法。
// Pixi 的 Graphics API 是命令式的：先描述形状，再 fill/stroke。
const drawRect = (
  graphics: Graphics,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  color: number,
  strokeWidth = 5,
) => {
  graphics.roundRect(x, y, width, height, radius)
  graphics.fill(color)
  graphics.stroke({ color: inkColor, width: strokeWidth })
}

// 创建单颗蛋。返回 Container 而不是 Graphics，是因为一颗蛋由外壳、
// 高光和中间色带组成，后续播放时需要整体移动和旋转。
const drawEgg = (color: number, bandColor: number) => {
  const egg = new Container()

  // 外壳是蛋的主体轮廓。
  const shell = new Graphics()
  shell.ellipse(0, 0, 22, 31)
  shell.fill(color)
  shell.stroke({ color: inkColor, width: 4 })

  // 高光增加一点体积感，放在蛋壳左上方。
  const shine = new Graphics()
  shine.ellipse(-8, -10, 6, 14)
  shine.fill({ color: 0xffffff, alpha: 0.6 })
  shine.rotation = 0.45

  // 色带用于区分不同蛋的样式。
  const band = new Graphics()
  band.roundRect(-15, 7, 30, 8, 5)
  band.fill(bandColor)

  egg.addChild(shell, shine, band)
  return egg
}

// 把“时间轴计算结果”应用到 Pixi 节点上。
// 这里不计算动画，只接收 pixiGachaTimeline 产出的每一帧状态，
// 这样动画数学和 Pixi 绘制可以分开维护、分开测试。
const applyFrame = (
  frame: PixiGachaFrame,
  root: Container,
  knob: Container,
  eggs: Container[],
) => {
  // root 是整台机器的根容器，轻微旋转可以模拟机器抖动。
  root.rotation = frame.cabinetTilt

  // knob 是旋钮容器，旋转它会带着内部把手一起转。
  knob.rotation = frame.knobRotation

  // 每颗蛋按时间轴给出的坐标和旋转角度独立运动。
  frame.eggs.forEach((eggFrame, index) => {
    const egg = eggs[index]
    if (!egg) return

    egg.position.set(eggFrame.x, eggFrame.y)
    egg.rotation = eggFrame.rotation
  })
}

export const createPixiGachaAnimation = async (
  host: HTMLElement,
  options: PixiGachaOptions = {},
): Promise<PixiGachaPlayer> => {
  // Pixi v8 的 Application 需要先 new，再异步 init。
  // 这里根据宿主 DOM 的宽度创建一个正方形画布。
  const app = new Application()
  const hostSize = Math.max(host.clientWidth, 320)

  await app.init({
    width: hostSize,
    height: hostSize,
    backgroundAlpha: 0,
    antialias: true,
    autoDensity: true,
    resolution: window.devicePixelRatio || 1,
  })

  // 把 Pixi 创建的 canvas 放进 Vue 模板里的容器。
  // replaceChildren 可以避免热更新或重复挂载时残留旧 canvas。
  host.replaceChildren(app.canvas)

  // root 是场景根节点。pivot 放在设计稿中心点后，旋转和缩放都会围绕中心发生。
  const root = new Container()
  root.pivot.set(sceneSize / 2, sceneSize / 2)
  root.position.set(hostSize / 2, hostSize / 2)
  app.stage.addChild(root)

  // 下面开始绘制静态机器结构：柜体、玻璃球、前面板、出口和旋钮。
  // 这些图形只创建一次，播放时主要改位置/旋转，不重复重绘节点。
  const cabinet = new Graphics()
  drawRect(cabinet, 95, 200, 230, 220, 32, 0xef4f67, 7)

  // 玻璃球只画描边，让里面的蛋保持可见。
  const bowl = new Graphics()
  bowl.circle(210, 142, 102)
  bowl.stroke({ color: inkColor, width: 7 })

  // 玻璃高光单独放在玻璃球上层。
  const shine = new Graphics()
  shine.ellipse(168, 92, 30, 14)
  shine.fill({ color: 0xffffff, alpha: 0.78 })
  shine.rotation = -0.08

  // 前面板和出口在机器正面，层级需要压在柜体和部分蛋的上方。
  const front = new Graphics()
  drawRect(front, 144, 292, 132, 88, 20, 0xffffff, 6)

  const tray = new Graphics()
  drawRect(tray, 162, 350, 96, 34, 16, 0xffc247, 5)

  // 旋钮由一个容器承载：把手和圆盘都放进去，旋转容器即可整体旋转。
  const knob = new Container()
  knob.position.set(210, 315)
  const knobDisc = new Graphics()
  knobDisc.circle(0, 0, 40)
  knobDisc.fill(0xffc247)
  knobDisc.stroke({ color: inkColor, width: 6 })
  const knobHandle = new Graphics()
  drawRect(knobHandle, -9, -31, 18, 62, 9, 0xffffff, 4)
  knob.addChild(knobHandle, knobDisc)

  // 三颗蛋放在玻璃球内部，播放时由时间轴驱动它们摇动。
  const eggs = [
    drawEgg(0xffd35a, 0xff8a3d),
    drawEgg(0xf69ac7, 0xaa4d88),
    drawEgg(0x8ce8ca, 0x2f9c87),
  ]

  // Pixi 的显示层级由 addChild 顺序决定：越后添加越靠上。
  // 当前顺序让蛋在柜体之上、玻璃描边之下，旋钮和出口在最前面。
  root.addChild(cabinet, ...eggs, bowl, shine, front, knob, tray)

  // 容器尺寸变化时同步调整 canvas 尺寸，并等比缩放 420x420 的设计稿坐标。
  const resize = () => {
    const nextSize = Math.max(host.clientWidth, 320)
    app.renderer.resize(nextSize, nextSize)
    root.position.set(nextSize / 2, nextSize / 2)
    root.scale.set(nextSize / sceneSize)
  }

  resize()
  window.addEventListener('resize', resize)

  // startedAt 记录本轮播放开始时间，playing 控制 ticker 是否推进动画。
  let startedAt = 0
  let playing = false

  // progress 是 0-1 的播放进度。时间轴模块会把进度转换为每个对象的帧状态。
  const renderProgress = (progress: number) => {
    applyFrame(getPixiGachaFrame(progress), root, knob, eggs)
  }

  // Pixi 的 ticker 会在每一帧调用。播放期间根据真实时间计算进度，
  // 达到 1 后停止，并通知 Vue 把按钮状态恢复。
  const tick = () => {
    if (!playing) return

    const progress = (performance.now() - startedAt) / animationDurationMs
    renderProgress(progress)

    if (progress >= 1) {
      playing = false
      options.onComplete?.()
    }
  }

  app.ticker.add(tick)

  // 初始化时先渲染第 0 帧，让页面首次出现时就有静止画面。
  renderProgress(0)

  return {
    // 从头开始播放。重复点击由 Vue 的按钮 disabled 和这里的 playing 状态共同保护。
    play: () => {
      playing = true
      startedAt = performance.now()
      options.onPlay?.()
      renderProgress(0)
    },
    // Vue 组件卸载时必须清理 ticker、resize 监听和 WebGL/canvas 资源。
    destroy: () => {
      window.removeEventListener('resize', resize)
      app.ticker.remove(tick)
      app.destroy(true)
    },
  }
}
