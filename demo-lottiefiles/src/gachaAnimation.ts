const rgba = (hex: string, alpha = 1) => {
  const value = hex.replace('#', '')
  const red = Number.parseInt(value.slice(0, 2), 16) / 255
  const green = Number.parseInt(value.slice(2, 4), 16) / 255
  const blue = Number.parseInt(value.slice(4, 6), 16) / 255

  return [red, green, blue, alpha]
}

const transform = (
  position: [number, number, number],
  scale: [number, number, number] = [100, 100, 100],
  rotation = 0,
) => ({
  o: { a: 0, k: 100 },
  r: { a: 0, k: rotation },
  p: { a: 0, k: position },
  a: { a: 0, k: [0, 0, 0] },
  s: { a: 0, k: scale },
})

const shapeTransform = {
  p: { a: 0, k: [0, 0] },
  a: { a: 0, k: [0, 0] },
  s: { a: 0, k: [100, 100] },
  r: { a: 0, k: 0 },
  o: { a: 0, k: 100 },
  sk: { a: 0, k: 0 },
  sa: { a: 0, k: 0 },
}

const layer = (ind: number, name: string, shapes: object[], position: [number, number, number]) => ({
  ddd: 0,
  ind,
  ty: 4,
  nm: name,
  sr: 1,
  ks: transform(position),
  ao: 0,
  shapes,
  ip: 0,
  op: 120,
  st: 0,
  bm: 0,
})

const rect = (
  name: string,
  size: [number, number],
  radius: number,
  fill: string,
  stroke = '#161a2d',
  strokeWidth = 6,
  position: [number, number] = [0, 0],
) => ({
  ty: 'gr',
  nm: name,
  it: [
    {
      ty: 'rc',
      nm: `${name} path`,
      p: { a: 0, k: position },
      s: { a: 0, k: size },
      r: { a: 0, k: radius },
    },
    { ty: 'fl', nm: `${name} fill`, c: { a: 0, k: rgba(fill) }, o: { a: 0, k: 100 }, r: 1 },
    {
      ty: 'st',
      nm: `${name} stroke`,
      c: { a: 0, k: rgba(stroke) },
      o: { a: 0, k: 100 },
      w: { a: 0, k: strokeWidth },
      lc: 2,
      lj: 2,
    },
    { ty: 'tr', nm: `${name} transform`, ...shapeTransform },
  ],
})

const ellipse = (
  name: string,
  size: [number, number],
  fill: string,
  stroke = '#161a2d',
  strokeWidth = 5,
  position: [number, number] = [0, 0],
  fillAlpha = 1,
) => ({
  ty: 'gr',
  nm: name,
  it: [
    {
      ty: 'el',
      nm: `${name} path`,
      p: { a: 0, k: position },
      s: { a: 0, k: size },
    },
    { ty: 'fl', nm: `${name} fill`, c: { a: 0, k: rgba(fill, fillAlpha) }, o: { a: 0, k: 100 }, r: 1 },
    {
      ty: 'st',
      nm: `${name} stroke`,
      c: { a: 0, k: rgba(stroke) },
      o: { a: 0, k: 100 },
      w: { a: 0, k: strokeWidth },
      lc: 2,
      lj: 2,
    },
    { ty: 'tr', nm: `${name} transform`, ...shapeTransform },
  ],
})

const ellipseStroke = (
  name: string,
  size: [number, number],
  stroke = '#161a2d',
  strokeWidth = 5,
  position: [number, number] = [0, 0],
) => ({
  ty: 'gr',
  nm: name,
  it: [
    {
      ty: 'el',
      nm: `${name} path`,
      p: { a: 0, k: position },
      s: { a: 0, k: size },
    },
    {
      ty: 'st',
      nm: `${name} stroke`,
      c: { a: 0, k: rgba(stroke) },
      o: { a: 0, k: 100 },
      w: { a: 0, k: strokeWidth },
      lc: 2,
      lj: 2,
    },
    { ty: 'tr', nm: `${name} transform`, ...shapeTransform },
  ],
})

const animatedEgg = (
  ind: number,
  name: string,
  fill: string,
  positionFrames: Array<[number, [number, number, number]]>,
  rotationFrames: Array<[number, number]>,
) => ({
  ddd: 0,
  ind,
  ty: 4,
  nm: name,
  sr: 1,
  ks: {
    o: { a: 0, k: 100 },
    r: {
      a: 1,
      k: rotationFrames.map(([t, value]) => ({ t, s: [value], i: { x: [0.55], y: [1] }, o: { x: [0.45], y: [0] } })),
    },
    p: {
      a: 1,
      k: positionFrames.map(([t, value]) => ({ t, s: value, i: { x: [0.55], y: [1] }, o: { x: [0.45], y: [0] } })),
    },
    a: { a: 0, k: [0, 0, 0] },
    s: { a: 0, k: [100, 100, 100] },
  },
  ao: 0,
  shapes: [ellipse(`${name} shell`, [44, 58], fill, '#161a2d', 4)],
  ip: 0,
  op: 120,
  st: 0,
  bm: 0,
})

export const gachaMachineAnimation = {
  v: '5.12.2',
  fr: 60,
  ip: 0,
  op: 120,
  w: 420,
  h: 420,
  nm: 'Interactive gacha machine',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'turning knob',
      sr: 1,
      ks: {
        ...transform([210, 315, 0]),
        r: {
          a: 1,
          k: [
            { t: 0, s: [0], i: { x: [0.55], y: [1] }, o: { x: [0.45], y: [0] } },
            { t: 54, s: [540], i: { x: [0.55], y: [1] }, o: { x: [0.45], y: [0] } },
            { t: 120, s: [720], i: { x: [0.55], y: [1] }, o: { x: [0.45], y: [0] } },
          ],
        },
      },
      ao: 0,
      shapes: [
        rect('knob handle', [18, 60], 9, '#ffffff', '#161a2d', 4),
        ellipse('knob outer', [78, 78], '#ffc247', '#161a2d', 6),
      ],
      ip: 0,
      op: 120,
      st: 0,
      bm: 0,
    },
    layer(
      2,
      'egg tray',
      [rect('egg tray mouth', [96, 34], 16, '#ffc247', '#161a2d', 5)],
      [210, 376, 0],
    ),
    layer(3, 'front panel', [rect('front panel plate', [132, 88], 20, '#ffffff', '#161a2d', 6)], [210, 334, 0]),
    layer(
      4,
      'glass bowl',
      [
        ellipseStroke('glass dome', [202, 202], '#161a2d', 7),
        ellipse('glass shine', [58, 26], '#ffffff', '#ffffff', 0, [-42, -52], 0.72),
      ],
      [210, 142, 0],
    ),
    animatedEgg(
      5,
      'yellow egg',
      '#ffd35a',
      [
        [0, [176, 146, 0]],
        [28, [228, 118, 0]],
        [58, [254, 172, 0]],
        [88, [188, 184, 0]],
        [120, [176, 146, 0]],
      ],
      [
        [0, -12],
        [28, 24],
        [58, -30],
        [88, 18],
        [120, -12],
      ],
    ),
    animatedEgg(
      6,
      'mint egg',
      '#8ce8ca',
      [
        [0, [246, 154, 0]],
        [28, [192, 188, 0]],
        [58, [166, 132, 0]],
        [88, [232, 112, 0]],
        [120, [246, 154, 0]],
      ],
      [
        [0, 18],
        [28, -26],
        [58, 20],
        [88, -18],
        [120, 18],
      ],
    ),
    animatedEgg(
      7,
      'pink egg',
      '#f69ac7',
      [
        [0, [210, 106, 0]],
        [28, [256, 158, 0]],
        [58, [206, 196, 0]],
        [88, [170, 138, 0]],
        [120, [210, 106, 0]],
      ],
      [
        [0, 28],
        [28, -12],
        [58, 34],
        [88, -28],
        [120, 28],
      ],
    ),
    layer(8, 'machine body', [rect('base cabinet', [230, 220], 32, '#ef4f67', '#161a2d', 7)], [210, 292, 0]),
  ],
}
