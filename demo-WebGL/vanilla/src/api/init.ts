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
renderer.setSize(window.innerWidth, window.innerHeight); // 设置大小
app.appendChild(renderer.domElement); // 设置渲染的元素

// 创建物体
const geometry = new THREE.BoxGeometry(1, 1, 1);
// 创建材质
const material = new THREE.MeshBasicMaterial({ color: 'green' });
// 创建网格
const cube = new THREE.Mesh(geometry, material);

// 将网格添加到场景
scene.add(cube);

// 设置相机位置
camera.position.z = 5; // 蓝色
camera.position.y = 2; // 红色
camera.position.x = 2; // 绿色

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