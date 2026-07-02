import assert from 'node:assert/strict'
import test from 'node:test'

import { getPixiGachaFrame } from '../pixiGachaTimeline.ts'

test('getPixiGachaFrame clamps progress to the animation range', () => {
  assert.equal(getPixiGachaFrame(-1).progress, 0)
  assert.equal(getPixiGachaFrame(2).progress, 1)
})

test('getPixiGachaFrame moves the knob and eggs during playback', () => {
  const start = getPixiGachaFrame(0)
  const middle = getPixiGachaFrame(0.5)

  assert.notEqual(middle.knobRotation, start.knobRotation)
  assert.notDeepEqual(middle.eggs[0], start.eggs[0])
})
