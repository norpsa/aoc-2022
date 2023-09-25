import { readFileSync } from 'fs';

let input;
readFileSync('input_day6.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    input = line.split("");
});

let answer = 0;

for(let i = 13; i < input.length; i++) {
    let uniqueValues = new Set(input.slice(i - 13, i + 1)).size;

    if(uniqueValues === 14) {
        answer = i + 1;
        break;
    }
}

console.log(answer);