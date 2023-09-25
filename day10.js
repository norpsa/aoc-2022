import { readFileSync } from 'fs';

let answer = 0;
let cycle = 1;
let value = 1;
let row = "";

const draw = () => {
    if((cycle - 1) % 40 === (value) || (cycle - 1) % 40 === (value - 1) || (cycle - 1) % 40 === (value + 1)) {
        row += "#";
    } else {
        row += "."
    }
    if(cycle % 40 === 0) {
        console.log(row);
        row = "";
    }
}

const checkAnswer = () => {
    if(cycle === 20 || (cycle - 20) % 40 === 0) {
        answer += cycle*value;
    }
}

readFileSync('input_day10.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    let input = line.split(" ");

    if(input[0] === 'noop') {
        checkAnswer();
        draw();
        cycle++;
    } else {
        checkAnswer();
        draw();
        cycle++;
        checkAnswer();
        draw();
        cycle++;
        value += parseInt(input[1]);
    } 

});

console.log("PART1", answer);
