Fully Controllable [lottie-web](https://github.com/airbnb/lottie-web) component using Framer X Properties.

## Properties

| Property Name                                            | Type     | Description                                  |
| -------------------------------------------------------- | -------- | -------------------------------------------- |
| lottieJsonURL                                            | File     | Url for Lottie data                          |
| speed                                                    | Number   | Speed of the animation (max x10)             |
| percentage                                               | Number   | Current Frame percentage of the animation    |
| playState                                                | String   | State of the animation (pause, stop, start)  |
| direction                                                | String   | Direction of the animation (normal, reverse) |
| loop                                                     | Boolean  | Looping (true, false)                        |
| segmentStart, segmentEnd                                 | Number   | segment controls                             |
| onComplete, onLoopComplete, onEnterFrame, onSegmentStart | Function | eventListeners                               |

## Notes

If you want to change frame dynamically, please make `playState` as `stop` first

Example of Usage - [Enhanced Lottie - Example](https://framer.com/projects/Enhanced-Lottie-Example--gFqg5Ww3kafkTGjZDB5i-i3Y83)

Example of Usage 2 - [Enhanced Lottie - Frame by Frame](https://framer.com/projects/lottie-repeat-playing--haC5nS4kGqSrsO9bXsPR-gA88e)

## Contribute this repository

[https://github.com/ruucm/enhanced-lottie](https://github.com/ruucm/enhanced-lottie)

## Contact

Tweet [@ruucm](http://twitter.com/ruucm)

Issues [Here](https://github.com/ruucm/enhanced-lottie/issues)
