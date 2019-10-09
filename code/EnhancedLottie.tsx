import * as React from 'react'
import { useState, useEffect } from 'react'
import { Frame, useCycle, addPropertyControls, ControlType } from 'framer'
import { url } from 'framer/resource'
import Lottie from './Lottie'

export function EnhancedLottie({
  lottieJsonURL,
  speed,
  currentFrame,
  playState,
  direction,
  loop,
  ...props
}) {
  const [animationData, setAnimationData] = useState(null)
  const [isStopped, setIsStopped] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [error, setError] = useState(false)

  const loadLottieData = () => {
    fetch(decodeURIComponent(lottieJsonURL), {
      method: 'GET',
      credentials: 'omit',
      redirect: 'follow',
    })
      .then(resp => {
        if (!resp.ok) {
          console.error('There was an error while the fetching Lottie JSON URL')
          console.log('Printing failed response...')
          console.log(resp)

          setError(true)
          return
        }
        resp
          .json()
          .then(data => {
            setError(true)
            setAnimationData(data)
          })
          .catch(e => {
            console.error(e)
            console.log('Could not parse a valid JSON from the Lottie URL')
            setError(true)
          })
      })
      .catch(e => {
        setError(true)

        console.error(e)
      })
  }

  useEffect(() => {
    loadLottieData()
  }, [])

  useEffect(() => {
    if (playState == 'pause') setIsPaused(true)
    else if (playState == 'stop') setIsStopped(true)
    else if (playState == 'play') {
      setIsPaused(false)
      setIsStopped(false)
    }
  }, [playState])

  const defaultOptions = {
    animationData: animationData,
    loop: loop,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <Frame width="100%" height="100%" background="" {...props}>
      <Lottie
        options={defaultOptions}
        isStopped={isStopped}
        isPaused={isPaused}
        speed={speed}
        direction={direction == 'normal' ? 1 : -1}
        currentFrame={currentFrame}
      />
    </Frame>
  )
}

EnhancedLottie.defaultProps = {
  lottieJsonURL: url('/assets/check-animation.json'),
}

addPropertyControls(EnhancedLottie, {
  lottieJsonURL: {
    type: ControlType.File,
    allowedFileTypes: ['json'],
  },
  playState: {
    type: ControlType.SegmentedEnum,
    defaultValue: 'play',
    options: ['play', 'pause', 'stop'],
    optionTitles: ['▶', '❙❙', '■'],
  },
  speed: {
    type: ControlType.Number,
    defaultValue: 1,
    min: 0,
    max: 10,
    step: 0.5,
    displayStepper: true,
  },
  direction: {
    title: 'Direction',
    type: ControlType.SegmentedEnum,
    defaultValue: 'normal',
    options: ['normal', 'reverse'],
    optionTitles: ['Normal', 'Reverse'],
  },

  loop: {
    type: ControlType.Boolean,
    title: 'Loop',
    defaultValue: true,
  },
  currentFrame: {
    type: ControlType.Number,
    defaultValue: 0,
    min: 0,
    max: 1000,
    step: 1,
    displayStepper: true,
  },
})
