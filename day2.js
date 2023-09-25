import { readFileSync } from 'fs';

let elf1;
let elf2;

let score = 0;
let part2 = 0;

readFileSync('input_day2.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    elf1 = line[0];
    elf2 = line[2];
    
    // Part 1
    if(elf1 === 'A') {
        if(elf2 === 'X') {
            score += 4;
        } else if(elf2 === 'Y'){
            score += 8;
        } else if(elf2 === 'Z') {
            score += 3;
        }
    } else if(elf1 === 'B') {
        if(elf2 === 'X') {
            score += 1;
        } else if(elf2 === 'Y'){
            score += 5;
        } else if(elf2 === 'Z') {
            score += 9;
        }
    } else if(elf1 === 'C') {
        if(elf2 === 'X') {
            score += 7;
        } else if(elf2 === 'Y'){
            score += 2;
        } else if(elf2 === 'Z') {
            score += 6;
        }
    }

    // Part 2
    if(elf1 === 'A') {
        if(elf2 === 'X') {
            part2 += 3;
        } else if(elf2 === 'Y'){
            part2 += 4;
        } else if(elf2 === 'Z') {
            part2 += 8;
        }
    } else if(elf1 === 'B') {
        if(elf2 === 'X') {
            part2 += 1;
        } else if(elf2 === 'Y'){
            part2 += 5;
        } else if(elf2 === 'Z') {
            part2 += 9;
        }
    } else if(elf1 === 'C') {
        if(elf2 === 'X') {
            part2 += 2;
        } else if(elf2 === 'Y'){
            part2 += 6;
        } else if(elf2 === 'Z') {
            part2 += 7;
        }
    }

});

console.log(score);
console.log(part2);