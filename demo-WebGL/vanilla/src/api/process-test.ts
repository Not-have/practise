import * as THREE from 'three';

// 创建场景
const scene = new THREE.Scene();

// 创建相机（近大远小）
const camera = new THREE.PerspectiveCamera(
    45, // 视角
    window.innerWidth / window.innerHeight, // 窗口大小比例
    0.1, // 近平面
    1000 // 远平面
);

camera.position.z = 5; // 蓝色  // 设置相机位置
camera.position.y = 2; // 红色
camera.position.x = 2; // 绿色

camera.lookAt(0, 0, 0); // 旋转对象以面向世界空间中的点

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // 设置大小
document.body.appendChild(renderer.domElement); // 设置渲染的元素(document.body 可以改为指定的 DOM)

// 创建物体
const geometry = new THREE.BoxGeometry(1, 1, 1);

// 创建材质
const material = new THREE.MeshBasicMaterial({ color: 'green' });

// 创建网格
const cube = new THREE.Mesh(geometry, material); // 将物体和材质，添加进网格

// 将网格添加到场景
scene.add(cube);

// 添加坐标器
const axesHelper = new THREE.AxesHelper(10); // 坐标系长度为 5
scene.add(axesHelper);

// 添加 轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 惯性

// 渲染
function animate() {
    controls.update(); // 不加这个无法进行拖动
    /**
     * 在Three.js中，requestAnimationFrame是用于执行动画循环的函数。它接受一个回调函数作为参数，该回调函数在浏览器准备好更新动画帧时执行。这样做的好处是，它会根据浏览器的刷新率来调整动画的帧率，以便达到更好的性能和流畅度。
     */
    requestAnimationFrame(animate);
    // 旋转
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();