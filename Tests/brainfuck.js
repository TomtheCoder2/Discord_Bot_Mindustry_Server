const Brainfuck = require('brainfuck-node');
const brainfuck = new Brainfuck();

let result = brainfuck.execute('++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.');
console.log(result);