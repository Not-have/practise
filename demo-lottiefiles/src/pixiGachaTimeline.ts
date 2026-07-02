export type PixiEggFrame = {
  x: number
  y: number
  rotation: number
}

export type PixiGachaFrame = {
  progress: number
  knobRotation: number
  cabinetTilt: number
  eggs: PixiEggFrame[]
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const wave = (progress: number, phase = 0) => Math.sin((progress * Math.PI * 2 + phase) * 2)

export const getPixiGachaFrame = (rawProgress: number): PixiGachaFrame => {
  const progress = clamp(rawProgress, 0, 1)
  const wobble = Math.sin(progress * Math.PI * 6)

  return {
    progress,
    knobRotation: progress * Math.PI * 4,
    cabinetTilt: wobble * 0.025,
    eggs: [
      {
        x: 176 + wave(progress, 0) * 18,
        y: 142 + Math.cos(progress * Math.PI * 4) * 14,
        rotation: -0.22 + progress * Math.PI * 1.8,
      },
      {
        x: 220 + wave(progress, 1.6) * 20,
        y: 126 + Math.cos(progress * Math.PI * 5 + 1.2) * 16,
        rotation: 0.28 - progress * Math.PI * 2,
      },
      {
        x: 246 + wave(progress, 3) * 16,
        y: 164 + Math.cos(progress * Math.PI * 4 + 2.1) * 13,
        rotation: 0.18 + progress * Math.PI * 1.6,
      },
    ],
  }
}
