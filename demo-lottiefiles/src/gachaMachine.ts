export type EggPrize = {
  id: string
  name: string
  rarity: string
  color: string
  accent: string
  kind: 'egg'
}

export type EggDrawResult = EggPrize & {
  serial: string
}

export const eggPrizes = [
  {
    id: 'sunny-yolk',
    name: '太阳蛋',
    rarity: '普通',
    color: '#ffd35a',
    accent: '#ff8a3d',
    kind: 'egg',
  },
  {
    id: 'mint-shell',
    name: '薄荷蛋',
    rarity: '稀有',
    color: '#8ce8ca',
    accent: '#2f9c87',
    kind: 'egg',
  },
  {
    id: 'berry-pop',
    name: '莓果蛋',
    rarity: '稀有',
    color: '#f69ac7',
    accent: '#aa4d88',
    kind: 'egg',
  },
  {
    id: 'star-cream',
    name: '星星彩蛋',
    rarity: '隐藏款',
    color: '#fff0a8',
    accent: '#7d62d9',
    kind: 'egg',
  },
] as const satisfies readonly EggPrize[]

const clampRandomValue = (value: number) => Math.min(Math.max(value, 0), 0.999999)

export const drawEgg = (
  random: () => number = Math.random,
  now: () => number = Date.now,
): EggDrawResult => {
  const randomValue = clampRandomValue(random())
  const prizeIndex = Math.floor(randomValue * eggPrizes.length)
  const prize = eggPrizes[prizeIndex] ?? eggPrizes[0]

  return {
    ...prize,
    serial: `${prize.id}-${now().toString(36)}`,
  }
}
