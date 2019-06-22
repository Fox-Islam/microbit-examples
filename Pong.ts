let ballY = 0
let ballX = 0
let movingLeft = 0
let movingRight = 0
let bIsPressed = false
let aIsPressed = false
let ballSpeed = 0
let paddleX = 0
let time = 0
let inputDelay = 10000

let possibleXDirections: number[] = [-1, 0, 1]
let possibleYDirections: number[] = [-1, 1]
let ballXDirection: number = 0
let ballYDirection: number = 0

const initialBallSpeed: number = 7500
const ballSpeedIncrease: number = 500
const ballSpeedLimit: number = 1000

function detectInput() {
    // if the button is down keep a note that a button was
    // down
    if (input.buttonIsPressed(Button.A) && !(aIsPressed)) {
        aIsPressed = true
        movingRight = inputDelay
        movingLeft = 0
    } else if (input.buttonIsPressed(Button.B) && !(bIsPressed)) {
        bIsPressed = true
        movingLeft = inputDelay
        movingRight = 0
    }
    // if the button is up and the button is noted as
    // down, register it as input
    if (!(input.buttonIsPressed(Button.A)) && aIsPressed) {
        if (paddleX > 0) {
            paddleX += 0 - 1
        }
        aIsPressed = false
    } else if (!(input.buttonIsPressed(Button.B)) && bIsPressed) {
        if (paddleX < 3) {
            paddleX += 1
        }
        bIsPressed = false
    }
    if (movingRight > 0) {
        movingRight += 0 - 1
    }
    if (movingLeft > 0) {
        movingLeft += 0 - 1
    }
}
function main() {
    time = 0
    while (true) {
        basic.clearScreen()
        led.plot(paddleX, 4)
        led.plot(paddleX + 1, 4)
        led.plot(ballX, ballY)
        if (ballY > 4) {
            radio.sendString("You win!")
            basic.showString("You lose!")
            break
        }
        if (ballY < 0 && ballYDirection === -1) {
            sendBall()
            led.unplot(ballX, ballY)
            break
        }
        detectInput()
        if (time > ballSpeed) {
            moveBall()
            time = 0
        }
        detectWallCollision()
        detectPlayerCollision()
        time += 1
    }
}

function sendBall() {
    ballXDirection = -ballXDirection
    ballX += ballXDirection
    ballSpeed -= ballSpeedIncrease
    if (ballSpeed <= ballSpeedLimit) {
        ballSpeed = ballSpeedLimit
    }
    ballX = 4 - ballX
    radio.sendString(ballX + "," + ballSpeed + "," + ballXDirection)
}

function detectWallCollision() {
    if ((ballX < 1 && ballXDirection === -1) || (ballX > 3 && ballXDirection === 1)) {
        ballXDirection = -ballXDirection
    }
}

function detectPlayerCollision() {
    if (ballY == 3) {
        if (ballXDirection === 1 && (ballX === paddleX - 1 || ballX === paddleX)) {
            ballYDirection = -1
            if (ballX === paddleX - 1 || movingLeft > 0) {
                ballXDirection = -ballXDirection
                return
            }
            return
        }
        if (ballXDirection === -1 && (ballX === paddleX + 1 || ballX === paddleX + 2)) {
            ballYDirection = -1
            if (ballX === paddleX + 2 || movingRight > 0) {
                ballXDirection = -ballXDirection
                return
            }
            return
        }
        if (ballXDirection === 0 && (ballX === paddleX || ballX === paddleX + 1)) {
            ballYDirection = -1
            if (movingRight > 0) {
                ballXDirection = 1
                return
            }
            if (movingLeft > 0) {
                ballXDirection = -1
                return
            }
            ballXDirection = 0
            return
        }
    }
}

function moveBall() {
    ballY += ballYDirection
    ballX += ballXDirection
}
input.onButtonPressed(Button.AB, function () {
    ballSpeed = initialBallSpeed
    ballY = 0
    ballX = Math.randomRange(0, 4)
    ballXDirection = possibleXDirections[Math.randomRange(0, possibleXDirections.length - 1)]
    ballYDirection = possibleYDirections[Math.randomRange(0, possibleYDirections.length - 1)]
    main()
})
radio.onReceivedString(function (receivedString: string) {
    if (receivedString == "You win!") {
        basic.showString(receivedString)
        return
    }
    if (receivedString == "Handshake!") {
        return
    }
    let currentString = receivedString
    ballX = parseInt(currentString.substr(0, currentString.indexOf(',')))
    currentString = currentString.substr(currentString.indexOf(',') + 1)
    ballSpeed = parseInt(currentString.substr(0, currentString.indexOf(',')))
    currentString = currentString.substr(currentString.indexOf(',') + 1)
    ballXDirection = parseInt(currentString)
    ballYDirection = 1
    main()
})
input.onShake(function () {
    radio.sendString("Handshake!")
})
paddleX = 1
ballSpeed = 0
ballXDirection = 0
ballYDirection = 1
ballX = 0
ballY = 0
radio.setGroup(1)
basic.forever(function () {

})
