/**
 * https://threejs.org/docs/#api/zh/core/Object3D
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const app = document.querySelector<HTMLDivElement>('#app')!;

// 创建场景
const scene = new THREE.Scene();

// 创建相机（近大远小）
const camera = new THREE.PerspectiveCamera(
    45, // 视角
    window.innerWidth / window.innerHeight, // 窗口大小
    0.1, // 近平面
    1000 // 远平面
);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
app.appendChild(renderer.domElement);

// 创建物体
const geometry = new THREE.BoxGeometry(1, 1, 1);

// 创建材质
const parentMaterial = new THREE.MeshBasicMaterial({ color: 'azure' });
const material = new THREE.MeshBasicMaterial({ color: 'green' });

// 创建网格
const parentCube = new THREE.Mesh(geometry, parentMaterial); // 这个是父元素
const cube = new THREE.Mesh(geometry, material); // 子元素

parentCube.add(cube); // 将子元素添加到父元素

parentCube.position.set(-3, 0, 0);
parentCube.rotation.x = Math.PI / 4; // 旋转

cube.position.set(3, 0, 0); // 移动物体
cube.scale.set(1, 1, 1); // 设置立法体放大
cube.rotation.x = Math.PI / 4; // 旋转（子旋转了 90）

// 将网格添加到场景
// scene.add(cube);
scene.add(parentCube);

// 设置相机位置
camera.position.z = 5; // 蓝色
camera.position.y = 2; // 绿色
camera.position.x = 2; // 红色

camera.lookAt(0, 0, 0);

// 添加坐标器
const axesHelper = new THREE.AxesHelper(5); // 坐标系长度为 5
scene.add(axesHelper);

// 添加 轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 惯性
controls.enableDamping = true;

// 渲染
// renderer.render(scene, camera); 
// 渲染函数
function animate() {
    controls.update();
    requestAnimationFrame(animate);
    // 旋转
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();