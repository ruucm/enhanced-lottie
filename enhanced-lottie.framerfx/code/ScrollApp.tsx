import { Override, Data, transform } from 'framer'

// Override Docs: https://framer.com/docs/overrides
window.log = console.log

const data = Data({
  currentFrame: 0,
})

export function Test(): Override {
  return {
    currentFrame: data.currentFrame,
  }
}

export function MoveFrameScroll(): Override {
  return {
    onScroll(e) {
      var move = e.point.y
      log('move', move)
      data.currentFrame = transform(move, [0, -2094], [0, 36])
    },
  }
}
