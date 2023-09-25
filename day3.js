import { readFileSync } from 'fs';

let priorities = 0;
let badges = 0;

const getPriority = (sameCharacter) => {
    if(sameCharacter.toUpperCase() === sameCharacter) {
        return sameCharacter.charCodeAt(0) - 38; // -64 + 26
    } else {
        return sameCharacter.charCodeAt(0) - 96;
    }
}

let currentGroup = [];

readFileSync('input_day3.txt', 'utf-8').split(/\r?\n/).forEach(function(line){

    // PART 1
    let part1 = line.substring(0, line.length/2).split("");
    let part2 = line.substring(line.length/2).split("");

    const sameCharacter = part1.filter(element => part2.includes(element))[0];

    priorities += getPriority(sameCharacter);

    // PART 2
    if(currentGroup.length < 3) {
        currentGroup.push(line.split(""));
    } else {
        const sameCharacter = currentGroup[0].filter(element => currentGroup[1].includes(element)).filter(element => currentGroup[2].includes(element))[0];
        badges += getPriority(sameCharacter);
        currentGroup = [];
        currentGroup.push(line.split(""));
    }
});

//Last group
const sameCharacter = currentGroup[0].filter(element => currentGroup[1].includes(element)).filter(element => currentGroup[2].includes(element))[0];
badges += getPriority(sameCharacter);

//Part 1
console.log(priorities);
// Part 2
console.log(badges);

