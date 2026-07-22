import * as THREE from "three"; // 引入 Three.js 运行时能力。

export function createSparkTexture(): THREE.CanvasTexture | null { // 创建粒子使用的圆形发光贴图。
  const canvas = document.createElement("canvas"); // 创建离屏画布。

  const size = 128; // 设置贴图尺寸。

  const center = size / 2; // 计算贴图中心点。

  const radius = size / 2; // 计算径向渐变半径。

  const context = canvas.getContext("2d"); // 获取 2D 绘图上下文。

  canvas.width = size; // 设置画布宽度。
  canvas.height = size; // 设置画布高度。

  if (!context) { // 判断当前环境是否支持 2D 上下文。
    return null; // 不支持时返回空贴图。
  } // 上下文判断结束。

  const gradient = context.createRadialGradient(center, center, 0, center, center, radius); // 创建中心亮边缘透明的径向渐变。

  gradient.addColorStop(0, "rgba(255, 255, 255, 1)"); // 设置粒子中心为纯白。
  gradient.addColorStop(0.18, "rgba(255, 255, 255, 0.95)"); // 设置粒子内圈为高亮。
  gradient.addColorStop(0.52, "rgba(255, 255, 255, 0.34)"); // 设置粒子中圈为柔光。
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)"); // 设置粒子边缘透明。
  context.fillStyle = gradient; // 使用渐变作为填充样式。
  context.fillRect(0, 0, size, size); // 填满整张贴图。
  const texture = new THREE.CanvasTexture(canvas); // 把画布转换成 Three.js 纹理。

  texture.needsUpdate = true; // 标记纹理需要上传到 GPU。

  return texture; // 返回粒子发光贴图。
} // createSparkTexture 结束。

export function createBackdropPlane(): THREE.Mesh { // 创建深色背景平面。
  const geometry = new THREE.PlaneGeometry(40, 22, 1, 1); // 创建覆盖视野的背景几何体。

  const material = new THREE.MeshBasicMaterial({
    color: "#020414",
    depthWrite: false,
    depthTest: false
  }); // 创建不写深度的深空材质。

  const plane = new THREE.Mesh(geometry, material); // 创建背景网格。

  plane.position.set(0, 0, -7); // 把背景放到远处。

  return plane; // 返回背景平面。
} // createBackdropPlane 结束。

export function createStarField(sparkTexture: THREE.CanvasTexture | null): THREE.Points { // 创建普通星空粒子层。
  const count = 8600; // 设置普通星点数量。

  const geometry = new THREE.BufferGeometry(); // 创建星点几何体。

  const positions = new Float32Array(count * 3); // 创建星点坐标数组。

  const colors = new Float32Array(count * 3); // 创建星点颜色数组。

  const baseColor = new THREE.Color("#b7c7ee"); // 设置基础冷白星色。

  const warmColor = new THREE.Color("#e4cf8f"); // 设置少量暖色星点。

  const blueColor = new THREE.Color("#7fa8e2"); // 设置少量蓝色星点。

  for (let index = 0; index < count; index += 1) { // 遍历生成每颗普通星点。
    const i3 = index * 3; // 计算当前粒子在数组中的起始下标。

    const layer = Math.random(); // 随机决定星点色彩层。

    const color = layer > 0.92 ? warmColor : (layer > 0.68 ? blueColor : baseColor); // 按概率选择冷暖星色。

    const brightness = 0.34 + Math.random() * 0.72; // 随机设置星点亮度。

    positions[i3] = (Math.random() - 0.5) * 20.5; // 设置星点 X 坐标。
    positions[i3 + 1] = (Math.random() - 0.5) * 12.4; // 设置星点 Y 坐标。
    positions[i3 + 2] = -6.5 + Math.random() * 5.6; // 设置星点 Z 坐标。
    colors[i3] = color.r * brightness; // 写入星点红色通道。
    colors[i3 + 1] = color.g * brightness; // 写入星点绿色通道。
    colors[i3 + 2] = color.b * brightness; // 写入星点蓝色通道。
  } // 普通星点生成结束。

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3)); // 写入星点坐标属性。
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3)); // 写入星点颜色属性。
  const material = new THREE.PointsMaterial({
    size: 0.034,
    map: sparkTexture ?? undefined,
    transparent: true,
    opacity: 0.82,
    vertexColors: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  }); // 创建普通星点材质。

  return new THREE.Points(geometry, material); // 返回普通星空粒子层。
} // createStarField 结束。

export function createBrightStarField(sparkTexture: THREE.CanvasTexture | null): THREE.Points { // 创建较亮星点层。
  const count = 220; // 设置亮星数量。

  const geometry = new THREE.BufferGeometry(); // 创建亮星几何体。

  const positions = new Float32Array(count * 3); // 创建亮星坐标数组。

  const colors = new Float32Array(count * 3); // 创建亮星颜色数组。

  const cool = new THREE.Color("#eaf4ff"); // 设置冷白亮星颜色。

  const warm = new THREE.Color("#fff2bd"); // 设置暖白亮星颜色。

  for (let index = 0; index < count; index += 1) { // 遍历生成每颗亮星。
    const i3 = index * 3; // 计算当前亮星数组下标。

    const color = Math.random() > 0.78 ? warm : cool; // 随机选择冷暖亮星色。

    const brightness = 0.62 + Math.random() * 0.86; // 随机设置亮星亮度。

    positions[i3] = (Math.random() - 0.5) * 19.2; // 设置亮星 X 坐标。
    positions[i3 + 1] = (Math.random() - 0.5) * 10.6; // 设置亮星 Y 坐标。
    positions[i3 + 2] = -5.4 + Math.random() * 2.4; // 设置亮星 Z 坐标。
    colors[i3] = color.r * brightness; // 写入亮星红色通道。
    colors[i3 + 1] = color.g * brightness; // 写入亮星绿色通道。
    colors[i3 + 2] = color.b * brightness; // 写入亮星蓝色通道。
  } // 亮星生成结束。

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3)); // 写入亮星坐标属性。
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3)); // 写入亮星颜色属性。
  const material = new THREE.PointsMaterial({
    size: 0.115,
    map: sparkTexture ?? undefined,
    transparent: true,
    opacity: 0.82,
    vertexColors: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  }); // 创建亮星材质。

  return new THREE.Points(geometry, material); // 返回亮星粒子层。
} // createBrightStarField 结束。

export function getObjectMaterial(object: THREE.Object3D): THREE.Material | undefined { // 获取对象上的第一个材质。
  const mesh = object as THREE.Points | THREE.Mesh; // 把对象视为可能携带材质的类型。

  return Array.isArray(mesh.material) ? mesh.material[0] : mesh.material; // 返回单个材质对象。
} // getObjectMaterial 结束。

export function disposeObject(object: THREE.Object3D): void { // 释放 Three.js 对象占用的 GPU 资源。
  object.traverse(child => { // 遍历对象树中的每个子节点。
    const geometryOwner = child as THREE.Mesh | THREE.Points; // 把子节点视为可能携带几何体的对象。

    const material = getObjectMaterial(child); // 读取子节点材质。

    geometryOwner.geometry?.dispose(); // 释放几何体资源。
    material?.dispose(); // 释放材质资源。
  }); // 对象树遍历结束。
} // disposeObject 结束。
