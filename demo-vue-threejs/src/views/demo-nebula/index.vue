<script lang="tsx" setup>
import {
  ref,
  onMounted
} from "vue";

import * as THREE from "three";

const nebulaRef = ref<HTMLDivElement | null>(null);

onMounted(() => {

  // 读取模板里的容器元素。
  const ele = nebulaRef.value;

  // 如果容器还不存在，就直接结束。
  if (!ele) {
    return;
  }

  // 场景
  const scene = new THREE.Scene();

  // 创建一个长方体几何对象Geometry
  const geometry = new THREE.BoxGeometry(100, 100, 100);

  const material = new THREE.MeshBasicMaterial({
    color: 0xFF_00_00 // 0xff0000设置材质颜色为红色
  });

  // 两个参数分别为几何体geometry、材质material
  const mesh = new THREE.Mesh(geometry, material); // 网格模型对象Mesh

  // 设置网格模型在三维空间中的位置坐标，默认是坐标原点
  mesh.position.set(0, 0, 0);

  //
  scene.add(mesh);

  // 创建渲染器对象
  const renderer = new THREE.WebGLRenderer();

  // 定义threejs输出画布的尺寸
  renderer.setSize(ele.clientWidth, ele.clientHeight);

  // 添加渲染器对象
  ele.append(renderer.domElement);

  // 透视投影相机
  const camera = new THREE.PerspectiveCamera();

  // 相机位置
  camera.position.set(200, 200, 200);

  // 拍照目标
  camera.lookAt(mesh.position);

  // 让渲染器从 camera（相机）的视角，把 scene（场景）中的内容绘制到 canvas 上
  renderer.render(scene, camera);

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
