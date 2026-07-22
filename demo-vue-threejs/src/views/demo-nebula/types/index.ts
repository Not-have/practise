import type * as THREE from "three"; // 仅引入 Three.js 类型，避免生成运行时代码。

export interface INebulaGalaxy { // 定义单个星系的数据结构。
  id: string; // 星系唯一标识。
  name: string; // 星系中文名称。
  subtitle: string; // 星系辅助说明。
  description: string; // 星系详细描述。
  position: [number, number, number]; // 星系在 Three.js 场景中的坐标。
  rotation: number; // 星系初始静态倾角。
  nebula: INebulaOptions; // 星系对应的星云渲染参数。
} // INebulaGalaxy 结束。

export interface INebulaOptions { // 定义可复用星云的入参。
  id?: string; // 星云可选唯一标识。
  color: string; // 星云外层彩色尘埃主色。
  accent: string; // 星云内侧高光颜色。
  scale: number; // 星云整体大小。
  arms: number; // 星云翅膀或旋臂数量。
  spin?: number; // 星云旋臂卷曲强度。
  flatten?: number; // 星云纵向压扁比例。
  primary?: boolean; // 是否使用主星云的高密度效果。
} // INebulaOptions 结束。

export interface INebulaInstance { // 定义创建后的星云实例。
  group: THREE.Group; // 星云父级 Three.js 容器。
  hitArea: THREE.Mesh; // 星云透明鼠标命中区域。
  update: (delta: number, opacity: number, layoutScale: number) => void; // 星云每帧更新函数。
  dispose: () => void; // 星云资源销毁函数。
} // INebulaInstance 结束。

export interface IGalaxyObject { // 定义场景中的星系对象集合。
  data: INebulaGalaxy; // 星系原始配置数据。
  nebula: INebulaInstance; // 星系对应的可复用星云实例。
} // IGalaxyObject 结束。

export interface INebulaOrbitData { // 定义粒子围绕星系中心旋转所需的数据。
  radii: Float32Array; // 每颗粒子的基础半径。
  angles: Float32Array; // 每颗粒子的基础角度。
  offsetX: Float32Array; // 每颗粒子的 X 方向随机偏移。
  offsetY: Float32Array; // 每颗粒子的 Y 方向随机偏移。
  z: Float32Array; // 每颗粒子的 Z 方向随机偏移。
  rates: Float32Array; // 每颗粒子的局部旋转速率。
  flatten: number; // 当前粒子层的纵向压扁比例。
} // INebulaOrbitData 结束。

export interface IPointerVector { // 定义归一化鼠标坐标结构。
  x: number; // 鼠标 X 方向归一化值。
  y: number; // 鼠标 Y 方向归一化值。
} // IPointerVector 结束。
