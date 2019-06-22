let playerScore = 0
let time = 0
let enemySpeed = 0
let enemyY = 0
let enemyX = 0
let playerY = 0
let playerX = 0
let aDown = false
let bDown = false
let enemyStartingSpeed = 5000
let enemySpeedIncrease = 300
let enemySpeedLimit = 1000

function detectInput() {
    // if the button is down keep a note that a button was down
    if (input.buttonIsPressed(Button.A) && !aDown) {
        aDown = true
    } else if (input.buttonIsPressed(Button.B) && !bDown) {
        bDown = true
    }
    // if the button is up and the button is noted as down, register it as input
    if (!input.buttonIsPressed(Button.A) && aDown) {
        if (playerX > 0) {
            playerX -= 1
        }
        aDown = false
    } else if (!input.buttonIsPressed(Button.B) && bDown) {
        if (playerX < 4) {
            playerX += 1
        }
        bDown = false
    }
}

function handleEnemyDeath() {
    if (enemyY > 4) {
        enemyY = -1
        enemyX = Math.randomRange(0, 4)
        enemySpeed -= enemySpeedIncrease
        if (enemySpeed < enemySpeedLimit) {
            enemySpeed = enemySpeedLimit
        }
        playerScore += 1
    }
}

function draw() {
    basic.clearScreen()
    led.plot(playerX, playerY)
    led.plot(enemyX, enemyY)
}

function gameStart() {
    while (true) {
        detectInput()
        draw()
        if (enemyX == playerX && enemyY == playerY) {
            basic.showString("Game Over! Score: " + playerScore)
            break
        }
        handleEnemyDeath()
        time += 1
        if (time % enemySpeed == 0) {
            enemyY += 1
        }
    }
}
input.onButtonPressed(Button.AB, function () {
    playerX = 2
    playerY = 4
    enemyX = Math.randomRange(0, 4)
    enemyY = -1
    enemySpeed = enemyStartingSpeed
    time = 0
    gameStart()
})
