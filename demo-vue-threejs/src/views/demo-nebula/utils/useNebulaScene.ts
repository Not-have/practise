import {
  onBeforeUnmount,
  onMounted,
  ref
} from "vue";

import * as THREE from "three"; // 引入 Three.js 场景运行时。

import type {
  IGalaxyObject, INebulaGalaxy, IPointerVector
} from "../types"; // 引入场景运行所需类型。
import {
  galaxies
} from "./galaxies"; // 引入星系配置数据。
import {
  createNebula
} from "./createNebula"; // 引入可复用星云创建方法。
import {
  createBackdropPlane, createBrightStarField, createSparkTexture, createStarField, disposeObject
} from "./nebulaFactory"; // 引入通用 Three.js 创建和销毁工具。

export function useNebulaScene(nebulaRef: import("vue").Ref<HTMLDivElement | null>): { // 导出星云场景组合式逻辑。
  galaxies: INebulaGalaxy[];
  activeGalaxyId: import("vue").Ref<string>;
  hoveredGalaxyId: import("vue").Ref<string>;
  isWebglFallback: import("vue").Ref<boolean>;
} {
  const activeGalaxyId = ref("ai"); // 记录当前激活星系。

  const hoveredGalaxyId = ref(""); // 记录当前鼠标悬停星系。

  const isWebglFallback = ref(false); // 记录 WebGL 是否失败并进入备用视图。

  let scene: THREE.Scene | null = null; // 保存 Three.js 场景实例。

  let camera: THREE.PerspectiveCamera | null = null; // 保存 Three.js 相机实例。

  let renderer: THREE.WebGLRenderer | null = null; // 保存 Three.js 渲染器实例。

  let frameId = 0; // 保存 requestAnimationFrame 的编号。

  let starField: THREE.Points | null = null; // 保存普通星空粒子层。

  let brightStarField: THREE.Points | null = null; // 保存亮星粒子层。

  let galaxyObjects: IGalaxyObject[] = []; // 保存渲染后的星系对象列表。

  let hoverClearTimer: ReturnType<typeof window.setTimeout> | null = null; // 保存延迟清除 hover 的计时器。

  const pointer = new THREE.Vector2(0, 0); // 创建射线检测使用的鼠标坐标。

  const raycaster = new THREE.Raycaster(); // 创建 Three.js 射线检测器。

  let pointerTarget: IPointerVector = {
    x: 0,
    y: 0
  }; // 保存鼠标目标位置。

  const pointerCurrent: IPointerVector = {
    x: 0,
    y: 0
  }; // 保存平滑后的鼠标位置。

  let cameraBaseZ = 11.25; // 保存相机基础 Z 轴距离。

  let sparkTexture: THREE.CanvasTexture | null = null; // 保存粒子发光贴图。

  let lastFrameTime = 0; // 保存上一帧时间。

  let resizeObserver: ResizeObserver | null = null; // 保存容器尺寸观察器。

  onMounted(() => { // 组件挂载时启动场景。
    initScene(); // 初始化 Three.js 场景。
  }); // 挂载回调结束。

  onBeforeUnmount(() => { // 组件卸载前清理场景。
    disposeScene(); // 释放 Three.js 和事件资源。
  }); // 卸载回调结束。

  function initScene(): void { // 初始化 Three.js 星云场景。
    const container = nebulaRef.value; // 获取画布容器节点。

    if (!container) { // 判断容器是否存在。
      return; // 容器不存在时终止初始化。
    } // 容器判断结束。

    scene = new THREE.Scene(); // 创建 Three.js 场景。
    scene.fog = new THREE.FogExp2("#020414", 0.048); // 设置深空雾效。
    camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100); // 创建透视相机。
    camera.position.set(0, 0.2, cameraBaseZ); // 设置相机初始位置。
    camera.lookAt(0, 0, 0); // 设置相机看向场景中心。

    try { // 尝试创建 WebGL 渲染器。
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false
      }); // 创建抗锯齿且不透明的渲染器。
    } catch { // 捕获 WebGL 创建失败。
      isWebglFallback.value = true; // 标记进入备用视图。
      scene = null; // 清空场景引用。
      camera = null; // 清空相机引用。

      return; // 停止初始化。
    } // 渲染器创建结束。

    isWebglFallback.value = false; // 标记 WebGL 正常可用。
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // 设置渲染像素比并限制上限。
    renderer.outputColorSpace = THREE.SRGBColorSpace; // 使用 sRGB 输出色彩空间。
    renderer.toneMapping = THREE.NoToneMapping; // 关闭 tone mapping，保留视频取样色。
    renderer.toneMappingExposure = 1; // 设置标准曝光。
    renderer.setClearColor("#020414", 1); // 设置画布清屏颜色。
    container.append(renderer.domElement); // 把 WebGL 画布挂载到容器。
    sparkTexture = createSparkTexture(); // 创建粒子发光贴图。
    scene.add(createBackdropPlane()); // 加入深色背景平面。
    starField = createStarField(sparkTexture); // 创建普通星空。
    scene.add(starField); // 加入普通星空。
    brightStarField = createBrightStarField(sparkTexture); // 创建亮星层。
    scene.add(brightStarField); // 加入亮星层。
    galaxyObjects = galaxies.map(item => { // 遍历创建全部星系对象。
      const nebula = createNebula(item.nebula, sparkTexture); // 根据配置创建可复用星云。

      nebula.group.position.set(item.position[0], item.position[1], item.position[2]); // 设置星云空间位置。
      nebula.group.rotation.z = item.rotation; // 设置星云初始倾角。
      scene?.add(nebula.group); // 把星云加入场景。

      return {
        data: item,
        nebula
      }; // 返回星系对象用于缓存。
    }); // 星系列表创建结束。
    container.addEventListener("pointermove", handlePointerMove); // 监听鼠标移动。
    container.addEventListener("pointerleave", handlePointerLeave); // 监听鼠标离开。
    container.addEventListener("click", handleClick); // 监听点击选择。
    resizeObserver = new ResizeObserver(resize); // 创建容器尺寸观察器。
    resizeObserver.observe(container); // 监听容器尺寸变化。
    resize(); // 根据当前容器尺寸适配布局。
    update(); // 启动渲染循环。
  } // initScene 结束。

  function resize(): void { // 处理容器尺寸变化。
    const container = nebulaRef.value; // 获取画布容器节点。

    if (!container || !camera || !renderer) { // 判断场景关键对象是否存在。
      return; // 关键对象不存在时跳过 resize。
    } // resize 前置判断结束。

    const rect = container.getBoundingClientRect(); // 读取容器尺寸。

    const width = Math.max(rect.width, 1); // 计算安全宽度。

    const height = Math.max(rect.height, 1); // 计算安全高度。

    camera.aspect = width / height; // 更新相机宽高比。
    cameraBaseZ = width < 680 ? 14.8 : 11.25; // 根据移动端调整相机距离。
    camera.position.z = cameraBaseZ; // 应用相机 Z 轴距离。
    camera.updateProjectionMatrix(); // 更新相机投影矩阵。
    renderer.setSize(width, height, false); // 更新渲染器尺寸。
    applyResponsiveGalaxyLayout(width); // 更新星系响应式布局。
  } // resize 结束。

  function applyResponsiveGalaxyLayout(width: number): void { // 根据宽度调整星系布局。
    const isCompact = width < 680; // 判断是否为紧凑屏幕。

    const xScale = isCompact ? 0.5 : 1; // 计算 X 轴布局缩放。

    const yScale = isCompact ? 1.08 : 1; // 计算 Y 轴布局缩放。

    const yOffset = isCompact ? -0.92 : 0; // 计算 Y 轴整体偏移。

    const galaxyScale = isCompact ? 0.82 : 1; // 计算星系整体布局缩放。

    for (const object of galaxyObjects) { // 遍历每个星系对象。
      object.nebula.group.position.set(object.data.position[0] * xScale, object.data.position[1] * yScale + yOffset, object.data.position[2]); // 更新星云位置。
      object.nebula.group.userData.layoutScale = galaxyScale; // 缓存当前布局缩放。
    } // 星系布局更新结束。
  } // applyResponsiveGalaxyLayout 结束。

  function update(): void { // 执行每帧渲染更新。
    if (!scene || !camera || !renderer) { // 判断场景关键对象是否存在。
      return; // 关键对象不存在时终止渲染。
    } // 渲染前置判断结束。

    const time = performance.now() * 0.001; // 获取当前秒级时间。

    const delta = lastFrameTime ? Math.min(time - lastFrameTime, 0.04) : 0; // 计算安全帧间隔。

    lastFrameTime = time; // 保存当前帧时间。
    pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * 0.045; // 平滑鼠标 X 值。
    pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * 0.045; // 平滑鼠标 Y 值。
    camera.position.x = 0; // 固定相机 X 位置，避免 hover 位移。
    camera.position.y = 0.2; // 固定相机 Y 位置。
    camera.position.z = cameraBaseZ; // 固定相机 Z 位置。
    camera.lookAt(0, 0, 0); // 保持相机看向场景中心。

    if (starField) { // 判断普通星空是否存在。
      starField.rotation.z = time * 0.004; // 缓慢旋转普通星空。
      starField.rotation.x = 0; // 固定普通星空 X 轴。
      starField.rotation.y = 0; // 固定普通星空 Y 轴。
    } // 普通星空更新结束。

    if (brightStarField) { // 判断亮星层是否存在。
      brightStarField.rotation.z = time * 0.006; // 缓慢旋转亮星层。
      brightStarField.rotation.x = 0; // 固定亮星层 X 轴。
      brightStarField.rotation.y = 0; // 固定亮星层 Y 轴。
    } // 亮星层更新结束。

    for (const object of galaxyObjects) { // 遍历每个星系对象。
      const isActive = activeGalaxyId.value === object.data.id; // 判断星系是否激活。

      const isHovered = hoveredGalaxyId.value === object.data.id; // 判断星系是否悬停。

      const layoutScale = Number(object.nebula.group.userData.layoutScale ?? 1); // 读取响应式布局缩放。

      const targetOpacity = isActive ? 1 : (isHovered ? 0.92 : 0.78); // 计算目标透明度。

      object.nebula.update(delta, targetOpacity, layoutScale); // 更新可复用星云实例。
    } // 星系更新结束。

    renderer.render(scene, camera); // 渲染当前帧。
    frameId = requestAnimationFrame(update); // 请求下一帧。
  } // update 结束。

  function handlePointerMove(event: PointerEvent): void { // 处理鼠标移动事件。
    const container = nebulaRef.value; // 获取画布容器节点。

    if (!container || !camera) { // 判断命中检测所需对象是否存在。
      return; // 对象不存在时跳过。
    } // 命中检测前置判断结束。

    const rect = container.getBoundingClientRect(); // 读取容器尺寸和位置。

    const x = (event.clientX - rect.left) / rect.width; // 计算容器内 X 比例。

    const y = (event.clientY - rect.top) / rect.height; // 计算容器内 Y 比例。

    pointerTarget = {
      x: (x - 0.5) * 2,
      y: (0.5 - y) * 2
    }; // 更新鼠标目标坐标。
    pointer.set(x * 2 - 1, -(y * 2 - 1)); // 转换为 Three.js NDC 坐标。
    raycaster.setFromCamera(pointer, camera); // 从相机发出射线。
    const hits = raycaster.intersectObjects(galaxyObjects.map(item => {
      return item.nebula.hitArea;
    })); // 检测射线与星云命中区的交点。

    const nextHoveredId = hits[0]?.object.userData.id ?? ""; // 读取最近命中的星系 ID。

    if (nextHoveredId) { // 判断是否命中星系。
      if (hoverClearTimer) { // 判断是否存在延迟清除计时器。
        window.clearTimeout(hoverClearTimer); // 清除延迟清除计时器。
        hoverClearTimer = null; // 重置计时器引用。
      } // 计时器清理结束。

      hoveredGalaxyId.value = nextHoveredId; // 更新悬停星系。

      return; // 命中后结束处理。
    } // 命中判断结束。

    if (!hoverClearTimer) { // 判断是否需要启动延迟清除。
      hoverClearTimer = window.setTimeout(() => { // 启动延迟清除，避免 hover 抖动。
        hoveredGalaxyId.value = ""; // 清空悬停星系。
        hoverClearTimer = null; // 重置计时器引用。
      }, 90); // 设置短延迟时间。
    } // 延迟清除判断结束。
  } // handlePointerMove 结束。

  function handlePointerLeave(): void { // 处理鼠标离开事件。
    if (hoverClearTimer) { // 判断是否存在延迟清除计时器。
      window.clearTimeout(hoverClearTimer); // 清除延迟清除计时器。
      hoverClearTimer = null; // 重置计时器引用。
    } // 计时器清理结束。

    hoveredGalaxyId.value = ""; // 清空悬停星系。
    pointerTarget = {
      x: 0,
      y: 0
    }; // 重置鼠标目标坐标。
  } // handlePointerLeave 结束。

  function handleClick(): void { // 处理点击选择事件。
    if (hoveredGalaxyId.value) { // 判断当前是否悬停星系。
      activeGalaxyId.value = hoveredGalaxyId.value; // 把悬停星系设为激活星系。
    } // 点击选择判断结束。
  } // handleClick 结束。

  function disposeScene(): void { // 销毁星云场景。
    const container = nebulaRef.value; // 获取画布容器节点。

    cancelAnimationFrame(frameId); // 停止下一帧渲染。
    container?.removeEventListener("pointermove", handlePointerMove); // 移除鼠标移动监听。
    container?.removeEventListener("pointerleave", handlePointerLeave); // 移除鼠标离开监听。
    container?.removeEventListener("click", handleClick); // 移除点击监听。
    resizeObserver?.disconnect(); // 停止容器尺寸观察。
    resizeObserver = null; // 清空容器尺寸观察器。

    if (hoverClearTimer) { // 判断是否存在延迟清除计时器。
      window.clearTimeout(hoverClearTimer); // 清除延迟清除计时器。
      hoverClearTimer = null; // 重置计时器引用。
    } // 计时器清理结束。

    if (starField) { // 判断普通星空是否存在。
      disposeObject(starField); // 释放普通星空资源。
    } // 普通星空释放结束。

    if (brightStarField) { // 判断亮星层是否存在。
      disposeObject(brightStarField); // 释放亮星层资源。
    } // 亮星层释放结束。

    for (const object of galaxyObjects) { // 遍历每个星系对象。
      object.nebula.dispose(); // 释放星云对象资源。
    } // 星系资源释放结束。

    sparkTexture?.dispose(); // 释放粒子贴图资源。
    renderer?.dispose(); // 释放渲染器资源。
    renderer?.domElement.remove(); // 移除 WebGL 画布节点。
    scene = null; // 清空场景引用。
    camera = null; // 清空相机引用。
    renderer = null; // 清空渲染器引用。
    starField = null; // 清空普通星空引用。
    brightStarField = null; // 清空亮星层引用。
    galaxyObjects = []; // 清空星系对象列表。
    sparkTexture = null; // 清空粒子贴图引用。
    lastFrameTime = 0; // 重置上一帧时间。
  } // disposeScene 结束。

  return {
    galaxies,
    activeGalaxyId,
    hoveredGalaxyId,
    isWebglFallback
  }; // 暴露模板需要的数据。
} // useNebulaScene 结束。
