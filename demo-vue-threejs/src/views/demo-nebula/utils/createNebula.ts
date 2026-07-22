import * as THREE from "three"; // 引入 Three.js 运行时能力。

import type {
  INebulaInstance, INebulaOptions, INebulaOrbitData
} from "../types"; // 引入星云实例、配置和轨道类型。
import {
  disposeObject, getObjectMaterial
} from "./nebulaFactory"; // 引入通用资源释放和材质读取方法。

function createNebula(options: INebulaOptions, sparkTexture: THREE.CanvasTexture | null): INebulaInstance { // 创建一个可复用星云实例。
  const group = new THREE.Group(); // 创建星云父级容器。

  const isPrimary = options.primary === true; // 判断是否使用主星云高密度配置。

  const haze = createHazeLayer(options, isPrimary ? 6800 : 3600, sparkTexture); // 创建外层彩色雾化粒子。

  const colorDust = createSpiralLayer(options, isPrimary ? 10_800 : 6200, isPrimary ? 1.22 : 1.14, 0.08, isPrimary ? 0.96 : 0.92, 0.12, isPrimary ? 0.048 : 0.052, sparkTexture); // 创建彩色尘埃旋臂。

  const whiteArms = createSpiralLayer(options, isPrimary ? 8200 : 2600, isPrimary ? 0.86 : 0.74, 0.045, isPrimary ? 1 : 0.88, isPrimary ? 0.86 : 0.66, isPrimary ? 0.072 : 0.058, sparkTexture); // 创建白色高光旋臂。

  const core = createCoreLayer(options, isPrimary ? 1150 : 720, sparkTexture); // 创建中心白核。

  const hitArea = createHitArea(options); // 创建透明命中区域。

  group.scale.setScalar(options.scale); // 设置星云初始大小。
  haze.userData.nebulaSpinSpeed = 0.006 / options.scale; // 设置外雾局部旋转速度。
  colorDust.userData.nebulaSpinSpeed = 0.024 / options.scale; // 设置彩色尘埃局部旋转速度。
  whiteArms.userData.nebulaSpinSpeed = 0.031 / options.scale; // 设置白色旋臂局部旋转速度。
  core.userData.nebulaSpinSpeed = 0.004 / options.scale; // 设置中心白核局部旋转速度。
  group.add(haze, colorDust, whiteArms, core, hitArea); // 把所有星云层加入父级容器。

  return { // 返回星云实例。
    group, // 暴露星云父级容器。
    hitArea, // 暴露透明命中区域。
    update: (delta, opacity, layoutScale) => { // 暴露每帧更新函数。
      updateNebula(group, options, delta, opacity, layoutScale); // 更新星云粒子、透明度和缩放。
    }, // 每帧更新函数结束。
    dispose: () => { // 暴露资源销毁函数。
      disposeObject(group); // 释放星云内部 Three.js 资源。
    } // 资源销毁函数结束。
  }; // 星云实例返回结束。
} // createNebula 结束。

function createHitArea(options: INebulaOptions): THREE.Mesh { // 创建星云透明命中区域。
  const geometry = new THREE.CircleGeometry(1.9, 48); // 创建圆形命中几何体。

  const material = new THREE.MeshBasicMaterial({
    color: "#ffffff",
    transparent: true,
    opacity: 0,
    depthWrite: false
  }); // 创建完全透明材质。

  const hitArea = new THREE.Mesh(geometry, material); // 创建命中网格。

  hitArea.userData = {
    id: options.id ?? ""
  }; // 写入星云 ID。

  return hitArea; // 返回命中区域。
} // createHitArea 结束。

function createSpiralLayer(
    options: INebulaOptions,
    count: number,
    radiusScale: number,
    zJitter: number,
    opacity: number,
    whiteBias: number,
    pointSize: number,
    sparkTexture: THREE.CanvasTexture | null
): THREE.Points { // 创建旋臂粒子层。
  const geometry = new THREE.BufferGeometry(); // 创建旋臂几何体。

  const positions = new Float32Array(count * 3); // 创建旋臂坐标数组。

  const colors = new Float32Array(count * 3); // 创建旋臂颜色数组。

  const flatten = options.flatten ?? 0.5; // 读取星云纵向压扁比例。

  const spin = options.spin ?? 2.9; // 读取星云旋臂卷曲强度。

  const orbitData = createOrbitData(count, flatten); // 创建粒子轨道数据。

  const galaxyColor = new THREE.Color(options.color); // 创建星云主色对象。

  const accentColor = new THREE.Color(options.accent); // 创建星云高光色对象。

  const deepColor = new THREE.Color("#050716"); // 创建暗部基色。

  for (let index = 0; index < count; index += 1) { // 遍历生成每颗旋臂粒子。
    const i3 = index * 3; // 计算当前粒子的数组下标。

    const arm = index % options.arms; // 计算当前粒子所属翅膀。

    const radius = Math.random() ** (whiteBias > 0.5 ? 0.68 : 0.56) * 2.05 * radiusScale; // 计算粒子半径。

    const armAngle = (arm / options.arms) * Math.PI * 2; // 计算当前翅膀基础角度。

    const angleSpread = whiteBias > 0.5 ? 0.13 + radius * 0.055 : 0.44 + radius * 0.16; // 计算粒子角度散布。

    const angle = armAngle + radius * spin * 0.76 + randomSpread(angleSpread); // 计算粒子最终角度。

    const thickness = whiteBias > 0.5 ? 0.032 + radius * 0.05 : 0.09 + radius * 0.12; // 计算旋臂厚度。

    const normalizedRadius = Math.min(radius / (2.05 * radiusScale), 1); // 计算归一化半径。

    const innerGlow = Math.max(0, 1 - radius / 1.58); // 计算靠近中心的高光权重。

    const armGlow = Math.max(0, 1 - normalizedRadius * 0.82); // 计算旋臂整体亮度权重。

    const colorStrength = whiteBias > 0.5 ? 0.42 + armGlow * 0.14 : 0.82 + armGlow * 0.18; // 计算主色混合强度。

    const highlightStrength = whiteBias > 0.5 ? Math.min(0.88, 0.38 + innerGlow * 0.3 - normalizedRadius * 0.08) : Math.min(0.34, 0.08 + innerGlow * 0.18); // 计算高光混合强度。

    const color = deepColor.clone().lerp(galaxyColor, colorStrength).lerp(accentColor, highlightStrength); // 计算粒子最终颜色。

    const brightness = whiteBias > 0.5 ? 0.82 + armGlow * 0.24 + Math.random() * 0.14 : 0.52 + armGlow * 0.32 + Math.random() * 0.2; // 计算粒子亮度。

    const offsetX = whiteBias > 0.5 ? randomGaussian() * thickness : randomSpread(thickness); // 计算粒子 X 偏移。

    const offsetY = whiteBias > 0.5 ? randomGaussian() * thickness : randomSpread(thickness); // 计算粒子 Y 偏移。

    const z = randomSpread(zJitter); // 计算粒子 Z 偏移。

    positions[i3] = Math.cos(angle) * radius + offsetX; // 写入粒子 X 坐标。
    positions[i3 + 1] = Math.sin(angle) * radius * flatten + offsetY; // 写入粒子 Y 坐标。
    positions[i3 + 2] = z; // 写入粒子 Z 坐标。
    writeOrbitData(orbitData, index, radius, angle, offsetX, offsetY, z); // 写入粒子轨道数据。
    colors[i3] = color.r * brightness; // 写入粒子红色通道。
    colors[i3 + 1] = color.g * brightness; // 写入粒子绿色通道。
    colors[i3 + 2] = color.b * brightness; // 写入粒子蓝色通道。
  } // 旋臂粒子生成结束。

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3)); // 写入旋臂坐标属性。
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3)); // 写入旋臂颜色属性。
  const points = new THREE.Points(geometry, new THREE.PointsMaterial({
    size: pointSize,
    map: sparkTexture ?? undefined,
    transparent: true,
    opacity,
    vertexColors: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  })); // 创建旋臂粒子对象。

  points.userData.nebulaOrbit = orbitData; // 绑定粒子轨道数据。

  return points; // 返回旋臂粒子层。
} // createSpiralLayer 结束。

function createCoreLayer(options: INebulaOptions, count: number, sparkTexture: THREE.CanvasTexture | null): THREE.Points { // 创建星云中心白核层。
  const geometry = new THREE.BufferGeometry(); // 创建白核几何体。

  const positions = new Float32Array(count * 3); // 创建白核坐标数组。

  const colors = new Float32Array(count * 3); // 创建白核颜色数组。

  const flatten = options.flatten ?? 0.5; // 读取星云压扁比例。

  const orbitData = createOrbitData(count, flatten); // 创建白核轨道数据。

  const accentColor = new THREE.Color(options.accent); // 创建高光色对象。

  const coreColor = accentColor.clone().lerp(new THREE.Color("#ffffff"), 0.38); // 创建中心亮白色。

  for (let index = 0; index < count; index += 1) { // 遍历生成每颗白核粒子。
    const i3 = index * 3; // 计算当前粒子的数组下标。

    const radius = Math.random() ** 1.62 * 0.55; // 计算白核粒子半径。

    const angle = Math.random() * Math.PI * 2; // 计算白核粒子角度。

    const color = accentColor.clone().lerp(coreColor, 0.62 + Math.random() * 0.22); // 计算白核粒子颜色。

    const brightness = 1.04 + Math.random() * 0.38; // 计算白核粒子亮度。

    const offsetX = randomSpread(0.055); // 计算白核 X 偏移。

    const offsetY = randomSpread(0.035); // 计算白核 Y 偏移。

    const z = randomSpread(0.025); // 计算白核 Z 偏移。

    positions[i3] = Math.cos(angle) * radius + offsetX; // 写入白核 X 坐标。
    positions[i3 + 1] = Math.sin(angle) * radius * flatten + offsetY; // 写入白核 Y 坐标。
    positions[i3 + 2] = z; // 写入白核 Z 坐标。
    writeOrbitData(orbitData, index, radius, angle, offsetX, offsetY, z, 1.2); // 写入白核轨道数据。
    colors[i3] = color.r * brightness; // 写入白核红色通道。
    colors[i3 + 1] = color.g * brightness; // 写入白核绿色通道。
    colors[i3 + 2] = color.b * brightness; // 写入白核蓝色通道。
  } // 白核粒子生成结束。

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3)); // 写入白核坐标属性。
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3)); // 写入白核颜色属性。
  const points = new THREE.Points(geometry, new THREE.PointsMaterial({
    size: 0.07,
    map: sparkTexture ?? undefined,
    transparent: true,
    opacity: 0.94,
    vertexColors: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  })); // 创建白核粒子对象。

  points.userData.nebulaOrbit = orbitData; // 绑定白核轨道数据。

  return points; // 返回白核粒子层。
} // createCoreLayer 结束。

function createHazeLayer(options: INebulaOptions, count: number, sparkTexture: THREE.CanvasTexture | null): THREE.Points { // 创建外层雾化粒子。
  const geometry = new THREE.BufferGeometry(); // 创建外雾几何体。

  const positions = new Float32Array(count * 3); // 创建外雾坐标数组。

  const colors = new Float32Array(count * 3); // 创建外雾颜色数组。

  const flatten = (options.flatten ?? 0.5) * 0.88; // 计算外雾压扁比例。

  const orbitData = createOrbitData(count, flatten); // 创建外雾轨道数据。

  const galaxyColor = new THREE.Color(options.color); // 创建星云主色对象。

  const deepColor = new THREE.Color("#050716"); // 创建暗部基色。

  const isPrimary = options.primary === true; // 判断是否使用主星云配置。

  for (let index = 0; index < count; index += 1) { // 遍历生成每颗外雾粒子。
    const i3 = index * 3; // 计算当前粒子的数组下标。

    const radiusMax = isPrimary ? 2.88 : 2.58; // 计算外雾最大半径。

    const radius = Math.random() ** (isPrimary ? 0.42 : 0.36) * radiusMax; // 计算外雾粒子半径。

    const angle = Math.random() * Math.PI * 2; // 计算外雾粒子角度。

    const normalizedRadius = Math.min(radius / radiusMax, 1); // 计算归一化半径。

    const color = deepColor.clone().lerp(galaxyColor, (isPrimary ? 0.72 : 0.58) + (1 - normalizedRadius) * 0.22); // 计算外雾颜色。

    const brightness = (isPrimary ? 0.22 : 0.18) + (1 - normalizedRadius) * 0.18 + Math.random() * 0.16; // 计算外雾亮度。

    const offsetX = randomSpread(0.13); // 计算外雾 X 偏移。

    const offsetY = randomSpread(0.14); // 计算外雾 Y 偏移。

    const z = randomSpread(0.1); // 计算外雾 Z 偏移。

    positions[i3] = Math.cos(angle) * radius + offsetX; // 写入外雾 X 坐标。
    positions[i3 + 1] = Math.sin(angle) * radius * flatten + offsetY; // 写入外雾 Y 坐标。
    positions[i3 + 2] = z; // 写入外雾 Z 坐标。
    writeOrbitData(orbitData, index, radius, angle, offsetX, offsetY, z, 0.28); // 写入外雾轨道数据。
    colors[i3] = color.r * brightness; // 写入外雾红色通道。
    colors[i3 + 1] = color.g * brightness; // 写入外雾绿色通道。
    colors[i3 + 2] = color.b * brightness; // 写入外雾蓝色通道。
  } // 外雾粒子生成结束。

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3)); // 写入外雾坐标属性。
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3)); // 写入外雾颜色属性。
  const points = new THREE.Points(geometry, new THREE.PointsMaterial({
    size: 0.046,
    map: sparkTexture ?? undefined,
    transparent: true,
    opacity: 0.78,
    vertexColors: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  })); // 创建外雾粒子对象。

  points.userData.nebulaOrbit = orbitData; // 绑定外雾轨道数据。

  return points; // 返回外雾粒子层。
} // createHazeLayer 结束。

function createOrbitData(count: number, flatten: number): INebulaOrbitData { // 创建粒子局部轨道数据容器。
  return {
    radii: new Float32Array(count),
    angles: new Float32Array(count),
    offsetX: new Float32Array(count),
    offsetY: new Float32Array(count),
    z: new Float32Array(count),
    rates: new Float32Array(count),
    flatten
  }; // 返回轨道数据。
} // createOrbitData 结束。

function writeOrbitData(orbitData: INebulaOrbitData, index: number, radius: number, angle: number, offsetX: number, offsetY: number, z: number, rateScale = 1): void { // 写入单颗粒子的轨道数据。
  orbitData.radii[index] = radius; // 写入粒子半径。
  orbitData.angles[index] = angle; // 写入粒子基础角度。
  orbitData.offsetX[index] = offsetX; // 写入粒子 X 偏移。
  orbitData.offsetY[index] = offsetY; // 写入粒子 Y 偏移。
  orbitData.z[index] = z; // 写入粒子 Z 偏移。
  orbitData.rates[index] = (0.985 + Math.random() * 0.03) * rateScale; // 写入粒子旋转速率。
} // writeOrbitData 结束。

function randomSpread(scale: number): number { // 生成均匀随机偏移。
  return (Math.random() - 0.5) * scale; // 返回指定尺度内的随机值。
} // randomSpread 结束。

function randomGaussian(): number { // 生成近似高斯分布随机值。
  const u = Math.max(Math.random(), Number.EPSILON); // 生成第一个非零随机数。

  const v = Math.max(Math.random(), Number.EPSILON); // 生成第二个非零随机数。

  return Math.sqrt(-2 * Math.log(u)) * Math.cos(Math.PI * 2 * v) * 0.5; // 返回 Box-Muller 生成的偏移值。
} // randomGaussian 结束。

function updateNebula(group: THREE.Group, options: INebulaOptions, delta: number, opacity: number, layoutScale: number): void { // 更新星云每帧状态。
  const targetScale = options.scale * layoutScale; // 计算当前星云目标缩放。

  group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.06); // 平滑更新星云缩放。

  for (const child of group.children) { // 遍历星云内部层级。
    if (!(child instanceof THREE.Points)) { // 判断子节点是否为粒子层。
      continue; // 非粒子层跳过更新。
    } // 粒子层判断结束。

    animateNebulaLayer(child, delta); // 更新粒子层局部旋转。
    const material = getObjectMaterial(child); // 获取粒子层材质。

    if (material && "opacity" in material) { // 判断材质是否支持透明度。
      material.opacity += (opacity - material.opacity) * 0.04; // 平滑更新透明度。
    } // 透明度更新结束。
  } // 星云层级遍历结束。
} // updateNebula 结束。

function animateNebulaLayer(points: THREE.Points, delta: number): void { // 根据局部轨道数据更新星云粒子。
  const orbitData = points.userData.nebulaOrbit as INebulaOrbitData | undefined; // 读取粒子轨道数据。

  const spinSpeed = Number(points.userData.nebulaSpinSpeed ?? 0); // 读取粒子层旋转速度。

  if (!orbitData || !spinSpeed || delta <= 0) { // 判断动画条件是否满足。
    return; // 条件不足时跳过动画。
  } // 动画条件判断结束。

  const positionAttribute = points.geometry.getAttribute("position") as THREE.BufferAttribute; // 获取粒子坐标属性。

  const positions = positionAttribute.array as Float32Array; // 获取粒子坐标数组。

  const phase = Number(points.userData.nebulaSpinPhase ?? 0) + spinSpeed * delta; // 计算粒子层旋转相位。

  points.userData.nebulaSpinPhase = phase; // 保存粒子层旋转相位。

  for (let index = 0; index < orbitData.radii.length; index += 1) { // 遍历更新每颗粒子。
    const i3 = index * 3; // 计算当前粒子的数组下标。

    const angle = (orbitData.angles[index] ?? 0) + phase * (orbitData.rates[index] ?? 1); // 计算当前粒子实时角度。

    const radius = orbitData.radii[index] ?? 0; // 读取当前粒子半径。

    positions[i3] = Math.cos(angle) * radius + (orbitData.offsetX[index] ?? 0); // 更新当前粒子 X 坐标。
    positions[i3 + 1] = Math.sin(angle) * radius * orbitData.flatten + (orbitData.offsetY[index] ?? 0); // 更新当前粒子 Y 坐标。
    positions[i3 + 2] = orbitData.z[index] ?? 0; // 更新当前粒子 Z 坐标。
  } // 粒子坐标更新结束。

  positionAttribute.needsUpdate = true; // 标记坐标属性需要上传 GPU。
} // animateNebulaLayer 结束。

export { createNebula }; // 导出可复用星云创建方法。
