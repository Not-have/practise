import assert from 'node:assert/strict'
import test from 'node:test'

import { drawEgg, eggPrizes } from '../gachaMachine.ts'

test('drawEgg maps a random value to an egg prize', () => {
  assert.equal(drawEgg(() => 0).id, eggPrizes[0].id)
  assert.equal(drawEgg(() => 0.999).id, eggPrizes[eggPrizes.length - 1]?.id)
})

test('every prize from the machine is an egg', () => {
  assert.ok(eggPrizes.length > 0)
  assert.ok(eggPrizes.every((prize) => prize.kind === 'egg'))
})
