let lastLetterIndex = 0
let receivedMessages: string[] = []
let currentLetterIndex = 0
let letters: string[] = []
let message = ""
function goToNextLetter() {
    if (currentLetterIndex < lastLetterIndex) {
        currentLetterIndex = currentLetterIndex + 1
    } else {
        currentLetterIndex = 0
    }
}
input.onButtonPressed(Button.B, function () {
    goToNextLetter()
    displayCurrentLetter2()
})
input.onButtonPressed(Button.AB, function () {
    addLetterToMessage2()
})
input.onButtonPressed(Button.A, function () {
    goToPreviousLetter()
    displayCurrentLetter2()
})
function goToPreviousLetter() {
    if (currentLetterIndex > 0) {
        currentLetterIndex = currentLetterIndex - 1
    } else {
        currentLetterIndex = lastLetterIndex
    }
}
function addLetterToMessage2() {
    message = "" + message + letters[currentLetterIndex]
}
radio.onReceivedString(function (receivedString) {
    receivedMessages.push(receivedString)
    showMessageNotification()
})
input.onGesture(Gesture.Shake, function () {
    if (input.buttonIsPressed(Button.AB)) {
        clearMessage()
    } else if (input.buttonIsPressed(Button.B)) {
        displayCurrentMessage2()
    } else if (receivedMessages.length > 0) {
        readMessage()
    } else if (message != "") {
        sendMessage2()
    }
})
function displayCurrentMessage2() {
    basic.clearScreen()
    basic.showString(message)
    basic.clearScreen()
    displayCurrentLetter2()
}
function clearMessage() {
    message = ""
}
function sendMessage2() {
    radio.sendString(message)
    clearMessage()
}
function displayCurrentLetter2() {
    basic.showString(letters[currentLetterIndex])
}
function showMessageNotification() {
    basic.clearScreen()
    basic.showLeds(`
        # # # # #
        # # . # #
        # . # . #
        # . . . #
        # # # # #
        `)
    basic.pause(500)
    basic.clearScreen()
    displayCurrentLetter2()
}
function readMessage() {
    basic.clearScreen()
    basic.showString(receivedMessages.shift())
    basic.clearScreen()
    displayCurrentLetter2()
}
radio.setGroup(1)
letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "?", "!", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", " "]
lastLetterIndex = letters.length - 1
currentLetterIndex = 0
message = ""
receivedMessages = []
displayCurrentLetter2()
