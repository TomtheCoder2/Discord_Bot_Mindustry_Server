const Gradient = require("javascript-color-gradient")
const chalk = require('chalk');
const log = console.log;
const colorGradient = new Gradient();

const color1 = "#3F2CAF";
const color2 = "#8BC2E3";
const colors = ["#3F2CAF", "#8BC2E3"]

colorGradient.setMidpoint(20);
colorGradient.setGradient(color1, color2);
// console.log(colorGradient.getArray());
colorArray = colorGradient.getArray()
// console.log(colorArray)
// log(chalk.hex('#DEADED').bold('Bold gray!'));
for (i in colorArray) {
    // console.log(colorArray[i])
    log(chalk.hex(colorArray[i]).bold(colorArray[i]));
}
