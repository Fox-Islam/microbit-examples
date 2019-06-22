let currentX = 0
let currentY = 0
input.onButtonPressed(Button.A, function () {
    for (let j = 0; j <= xValues.length - 1; j++) {
        if (xValues[j] == currentX && yValues[j] == currentY) {
            xValues.splice(j, 1)
            yValues.splice(j, 1)
            return
        }
    }
})
input.onButtonPressed(Button.AB, function () {
    xValues = []
    yValues = []
})
input.onGesture(Gesture.LogoUp, function () {
    if (currentY > 3) {
        return
    }
    currentY = currentY + 1
})
input.onGesture(Gesture.TiltLeft, function () {
    if (currentX < 1) {
        return
    }
    currentX = currentX - 1
})
input.onButtonPressed(Button.B, function () {
    for (let i = 0; i <= xValues.length - 1; i++) {
        if (xValues[i] == currentX && yValues[i] == currentY) {
            return
        }
    }
    xValues.push(currentX)
    yValues.push(currentY)
})
input.onGesture(Gesture.TiltRight, function () {
    if (currentX > 3) {
        return
    }
    currentX = currentX + 1
})
input.onGesture(Gesture.LogoDown, function () {
    if (currentY < 1) {
        return
    }
    currentY = currentY - 1
})
let xValues: number[] = []
let yValues: number[] = []
yValues = []
xValues = []
currentX = 0
currentY = 0
basic.forever(function () {
    basic.clearScreen()
    if (xValues.length > 0) {
        for (let index = 0; index <= xValues.length - 1; index++) {
            led.plot(xValues[index], yValues[index])
        }
    }
    led.plot(currentX, currentY)
})
