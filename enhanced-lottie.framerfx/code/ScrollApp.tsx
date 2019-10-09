import { Override, Data, transform } from "framer"

// Override Docs: https://framer.com/docs/overrides
const log = console.log

const data = Data({
    currentFrame: 0,
})

export function Test(): Override {
    return {
        percentage: data.currentFrame,
    }
}

export function MoveFrameScroll(): Override {
    return {
        onScroll(info) {
            //@ts-ignore
            var move = info.point.y
            log("move", move)
            data.currentFrame = transform(move, [0, -1700], [0, 100])
        },
    }
}
