Fully Controllable [lottie-web](https://github.com/airbnb/lottie-web) component using Framer X Properties

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

Example of Usage - [Enhanced Lottie - Example](https://www.dropbox.com/s/q02rk9ox5zp7euq/Enhanced%20Lottie%20-%20Example.framerx?dl=0)

Example of Usage 2 - [Enhanced Lottie - Frame by Frame](https://www.dropbox.com/s/th65lupv184cixx/Enhanced%20Lottie%20-%20Frame%20by%20Frame.framerx?dl=0)

## Contribute this repository

[https://github.com/ruucm/enhanced-lottie](https://github.com/ruucm/enhanced-lottie)

## Contact

Tweet [@ruucm](http://twitter.com/ruucm)

Issues [Here](https://github.com/ruucm/enhanced-lottie/issues)
