import * as React from 'react'
import { useState, useEffect } from 'react'
import { Frame, useCycle, addPropertyControls, ControlType } from 'framer'
import { url } from 'framer/resource'
import Lottie from './Lottie'

enum SrcType {
  File = "File",
  Url = "URL",
}

export function EnhancedLottie({
  srcType,
  url,
  lottieJsonURL,
  speed,
  percentage,
  playState,
  direction,
  loop,
  segmentStart,
  segmentEnd,
  playSegments,
  onComplete,
  onLoopComplete,
  onEnterFrame,
  onSegmentStart,
  ...props
}) {
  const [animationData, setAnimationData] = useState(null)
  const [isStopped, setIsStopped] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [error, setError] = useState(false)
  const targetUrl = srcType === SrcType.Url ? url : decodeURIComponent(lottieJsonURL.replace('/preview', ''))

  console.log('targetUrl', targetUrl)

  const loadLottieData = () => {
    fetch(targetUrl, {
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
  }, [targetUrl, loop])

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
        percentage={percentage / 100}
        segments={[segmentStart, segmentEnd]}
        playSegments={playSegments}
        eventListeners={[
          {
            eventName: 'complete',
            callback: onComplete,
          },
          {
            eventName: 'loopComplete',
            callback: onLoopComplete,
          },
          {
            eventName: 'enterFrame',
            callback: onEnterFrame,
          },
          {
            eventName: 'segmentStart',
            callback: onSegmentStart,
          },
        ]}
      />
    </Frame>
  )
}

EnhancedLottie.defaultProps = {
  url: "https://firebasestorage.googleapis.com/v0/b/moko-app-bee21.appspot.com/o/json%2Fbbde0708-f331-4a0a-8825-b9a3cd7228ea.json?alt=media&token=fff86100-902d-49d1-8fbf-3ba504775b50",
  lottieJsonURL: url('/assets/check-animation.json'),
  onComplete: () => void 0,
  onLoopComplete: () => void 0,
  onEnterFrame: () => void 0,
  onSegmentStart: () => void 0,
}



addPropertyControls(EnhancedLottie, {
  srcType: {
    type: ControlType.SegmentedEnum,
    title: "Source",
    options: [SrcType.Url, SrcType.File],
  },
  url: {
    type: ControlType.String,
    title: ' ',
    placeholder: ".../example.json",
    hidden(props) {
      return props.srcType === SrcType.File
    },
  },
  lottieJsonURL: {
    type: ControlType.File,
    allowedFileTypes: ['json'],
    title: ' ',
    hidden(props) {
      return props.srcType === SrcType.Url
    },
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
  percentage: {
    type: ControlType.Number,
    defaultValue: 0,
    min: 0,
    max: 100,
    step: 0.1,
    unit: '%',
    displayStepper: false,
    title: 'Percentage',
    hidden(props) {
      return props.playState !== 'stop'
    },
  },
  playSegments: {
    type: ControlType.Boolean,
    title: 'Segment',
    defaultValue: false,
  },
  segmentStart: {
    type: ControlType.Number,
    min: 0,
    max: 1000,
    step: 1,
    title: '↦ Start',
    hidden(props) {
      return props.playSegments === false
    },
    defaultValue: 0,
  },
  segmentEnd: {
    type: ControlType.Number,
    min: 0,
    max: 1000,
    step: 1,
    title: '⇥ End',
    hidden(props) {
      return props.playSegments === false
    },
    defaultValue: 100,
  },
  onComplete: {
    type: ControlType.EventHandler,
  },
})
