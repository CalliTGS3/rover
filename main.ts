radio.onReceivedValue(function (name, value) {
    ZeitstempelEmpfangen = input.runningTime()
    if (name == "G") {
        Geschwindigkeit = value
    } else if (name == "R") {
        Richtung = value
        RichtungMotor = Math.map(Richtung, 0, 100, -10, 10)
    }
})
let LedY = 0
let LedX = 0
let RichtungMotor = 0
let Richtung = 0
let Geschwindigkeit = 0
let ZeitstempelEmpfangen = 0
radio.setGroup(1)
let Timeout = 500
basic.setLedColor(0xff0000)
serial.redirectToUSB()
basic.forever(function () {
    if (input.runningTime() < ZeitstempelEmpfangen + Timeout) {
        basic.setLedColor(0x00ff00)
        led.unplot(LedX, LedY)
        LedX = Math.map(Richtung, 0, 100, 4, 0)
        LedY = Math.map(Geschwindigkeit, 0, 100, 0, 4)
        led.plot(LedX, LedY)
        if (false) {
            serial.writeLine("" + convertToText(Math.constrain(Geschwindigkeit + RichtungMotor, 0, 100)) + "-" + Math.constrain(Geschwindigkeit - RichtungMotor, 0, 100))
        }
        motors.dualMotorPower(Motor.A, Math.constrain(Geschwindigkeit + RichtungMotor, 0, 100))
        motors.dualMotorPower(Motor.B, Math.constrain(Geschwindigkeit - RichtungMotor, 0, 100))
    } else {
        basic.setLedColor(0xff0000)
        motors.dualMotorPower(Motor.A, 0)
        motors.dualMotorPower(Motor.B, 0)
    }
})
