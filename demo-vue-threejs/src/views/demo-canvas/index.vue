<script setup lang="ts">

// 从 Vue 中引入组件挂载、卸载生命周期和 ref。
import {
  onBeforeUnmount,
  onMounted,
  ref
} from "vue";

// 引入 three.js 的全部 API，后面通过 THREE.xxx 使用。
import * as THREE from "three";

// 创建一个 ref，用来拿到模板中的容器 DOM。
const canvasHost = ref<HTMLDivElement | null>(null);

// 保存场景运行时状态，方便组件卸载时统一清理。
const sceneState: {
  animationFrameId: number;
  cleanup: (() => void) | null;
  renderer: THREE.WebGLRenderer | null;
} = {
  animationFrameId: 0,
  cleanup: null,
  renderer: null
};

// 组件挂载到页面后，再创建 Three.js 场景。
onMounted(() => {

  // 读取模板里的容器元素。
  const host = canvasHost.value;

  // 如果容器还不存在，就直接结束。
  if (!host) {
    return;
  }

  // 创建一个 3D 场景。
  const scene = new THREE.Scene();

  // 设置场景背景为黑色。
  scene.background = new THREE.Color(0x00_00_00);

  // 创建透视相机，参数依次是视角、宽高比、近裁剪面、远裁剪面。
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);

  // 把相机放到 z 轴正方向，朝向场景中心。
  camera.position.set(0, 0, 5);

  // 创建 WebGL 渲染器，antialias 开启抗锯齿。
  const renderer = new THREE.WebGLRenderer({
    antialias: true
  });

  // 把 renderer 保存起来，方便后续清理。
  sceneState.renderer = renderer;

  // 设置像素比，限制最大为 2，避免高分屏渲染开销过大。
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // 设置清屏颜色为黑色。
  renderer.setClearColor(0x00_00_00, 1);

  // 把 WebGL canvas 挂载到页面容器里。
  host.append(renderer.domElement);

  // 创建球体几何体，参数依次是半径、水平分段、垂直分段。
  const sphereGeometry = new THREE.SphereGeometry(1.2, 64, 64);

  // 创建标准材质，让球体能接受灯光并呈现立体明暗。
  const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x2D_6C_FF,
    metalness: 0.1,
    roughness: 0.45
  });

  // 用几何体和材质创建一个网格对象，也就是屏幕里的 3D 球。
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  // 把球体添加到场景中。
  scene.add(sphere);

  // 创建方向光，模拟从某个方向照过来的光源。
  const light = new THREE.DirectionalLight(0xFF_FF_FF, 2);

  // 设置方向光的位置。
  light.position.set(3, 3, 4);

  // 把方向光添加到场景中。
  scene.add(light);

  // 创建环境光，让暗面不会完全黑掉。
  const ambientLight = new THREE.AmbientLight(0x40_60_90, 0.8);

  // 把环境光添加到场景中。
  scene.add(ambientLight);

  // 根据容器尺寸更新相机比例和渲染器大小。
  const resize = (): void => {

    // 读取容器当前宽高。
    const {
      width,
      height
    } = host.getBoundingClientRect();

    // 更新相机宽高比，避免画面被拉伸。
    camera.aspect = width / height;

    // 通知相机重新计算投影矩阵。
    camera.updateProjectionMatrix();

    // 更新渲染器尺寸，false 表示不额外修改 canvas 的 CSS 尺寸。
    renderer.setSize(width, height, false);
  };

  // 每一帧执行渲染。
  const render = (): void => {

    // 让球体绕 y 轴慢慢旋转。
    sphere.rotation.y += 0.01;

    // 用当前相机把场景渲染出来。
    renderer.render(scene, camera);

    // 请求浏览器下一帧继续执行 render。
    sceneState.animationFrameId = window.requestAnimationFrame(render);
  };

  // 创建尺寸监听器，容器变化时触发 resize。
  const resizeObserver = new ResizeObserver(resize);

  // 开始监听容器尺寸。
  resizeObserver.observe(host);

  // 先执行一次尺寸计算。
  resize();

  // 开始动画渲染循环。
  render();

  // 保存清理函数，组件卸载时会调用。
  sceneState.cleanup = () => {

    // 取消正在等待的动画帧。
    window.cancelAnimationFrame(sceneState.animationFrameId);

    // 停止监听容器尺寸。
    resizeObserver.disconnect();

    // 释放球体几何体占用的 GPU 资源。
    sphereGeometry.dispose();

    // 释放球体材质占用的 GPU 资源。
    sphereMaterial.dispose();

    // 释放渲染器占用的 GPU 资源。
    renderer.dispose();

    // 从 DOM 中移除 renderer 创建的 canvas。
    renderer.domElement.remove();

    // 清空 renderer 引用。
    sceneState.renderer = null;

    // 清空清理函数引用。
    sceneState.cleanup = null;
  };
});

// 组件卸载前执行 Three.js 资源清理。
onBeforeUnmount(() => {

  // 如果存在清理函数，就调用它。
  sceneState.cleanup?.();
});
</script>

<template>
  <!--
 Three.js 渲染器会把 canvas 插入这个容器中。
-->
  <section
    ref="canvasHost"
    class="demo-canvas"
  >
  </section>
</template>

<style scoped>
/* 画布容器占满父级空间。 */
.demo-canvas {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #000000;
}

/* Three.js 自动创建的 canvas 也占满容器。 */
.demo-canvas :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
