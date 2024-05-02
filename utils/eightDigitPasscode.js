function eightDigitPasscode () {

let randomNumber = Math.floor(Math.random() * 100000000);

if(randomNumber.toString().length < 8){
    return eightDigitPasscode()
} else {
    return randomNumber
}

}

eightDigitPasscode()

module.exports = eightDigitPasscode