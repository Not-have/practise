<script lang="tsx" setup>
import {
  ref,
  onMounted
} from "vue";

import * as THREE from "three";
import {
  OrbitControls
} from "three/addons/controls/OrbitControls.js";

const nebulaRef = ref<HTMLDivElement | null>(null);

onMounted(() => {

  // 读取模板里的容器元素。
  const ele = nebulaRef.value;

  // 如果容器还不存在，就直接结束。
  if (!ele) {
    return;
  }

  // 初始化相机、场景、渲染器等

  const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 3000);

  camera.position.set(100, 100, 100);
  camera.lookAt(0, 0, 0);

  // 创建场景
  const scene = new THREE.Scene();

  // 创建渲染器
  const renderer = new THREE.WebGLRenderer({
    antialias: true
  });

  ele.append(renderer.domElement);

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  // 创建控制器
  const controls = new OrbitControls(camera, renderer.domElement);

  controls.target.set(0, 0, 0);
  controls.update();

  // 创建一个简单的立方体
  const geometry = new THREE.BoxGeometry(10, 10, 10);

  const material = new THREE.MeshBasicMaterial({
    color: 0x00_FF_00
  });

  const cube = new THREE.Mesh(geometry, material);

  scene.add(cube);

  // 动画循环
  function animate() {
    requestAnimationFrame(animate);
    controls.update();

    // 让立方体旋转起来
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();

  const axesHelper = new THREE.AxesHelper(30);

  scene.add(axesHelper);

  const gridHelper = new THREE.GridHelper(50, 10);

  scene.add(gridHelper);

});
</script>
<template>
  <div ref="nebulaRef"></div>
</template>
<style scoped>
div {
  width: 100%;
  height: 100%;
}
</style>
