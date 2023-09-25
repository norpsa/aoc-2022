import { readFileSync } from 'fs';

let biggest = 0;
let secondBiggest = 0;
let thirdBiggest = 0;

let current = 0;

readFileSync('input_day1.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    if(line.length === 0) {
        if(current > biggest) {
            thirdBiggest = secondBiggest;
            secondBiggest = biggest;
            biggest = current;
        } else if(current > secondBiggest) {
            thirdBiggest = secondBiggest;
            secondBiggest = current;
        } else if(current > thirdBiggest) {
            thirdBiggest = current;
        }
        current = 0;
    } else {
        current += parseInt(line);
    }
});

// Tsekataan vielä vikan tontun eväät
if(current > biggest) {
    thirdBiggest = secondBiggest;
    secondBiggest = biggest;
    biggest = current;
} else if(current > secondBiggest) {
    thirdBiggest = secondBiggest;
    secondBiggest = current;
} else if(current > thirdBiggest) {
    thirdBiggest = current;
}

console.log(biggest);
console.log(biggest + secondBiggest + thirdBiggest);