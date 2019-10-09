import { Override, Data, transform } from 'framer'

// Override Docs: https://framer.com/docs/overrides
window.log = console.log

const data = Data({
  state: 'play',
  currentFrame: 20,
})

export function Test(): Override {
  return {
    currentFrame: data.currentFrame,
    playState: data.state,
  }
}

export function Play(): Override {
  return {
    onTap() {
      data.state = 'play'
    },
  }
}

export function Pause(): Override {
  return {
    onTap() {
      data.state = 'pause'
    },
  }
}

export function Stop(): Override {
  return {
    onTap() {
      data.state = 'stop'
      data.currentFrame = 0
    },
  }
}

export function MoveFrame(): Override {
  return {
    onTap() {
      data.currentFrame -= 5
    },
  }
}
export function MoveFrameSlider(): Override {
  return {
    onValueChange(value) {
      data.currentFrame = value
    },
  }
}
