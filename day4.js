import { readFileSync } from 'fs';

let overlappingPairs = 0;
let overlappingPairs2 = 0;

readFileSync('input_day4.txt', 'utf-8').split(/\r?\n/).forEach(function(line){

    let pairs = line.split(",");
    let pair1 = pairs[0].split("-").map(a => parseInt(a));
    let pair2 = pairs[1].split("-").map(a => parseInt(a));

    // PART 1
    if (pair1[0] === pair2[0] || pair1[1] === pair2[1]) {
        overlappingPairs++;
    } else if(pair1[0] < pair2[0]) {
        if(pair1[1] > pair2[1]) {
            overlappingPairs++;
        }
    } else if(pair2[0] < pair1[0]) {
        if(pair2[1] > pair1[1]) {
            overlappingPairs++;
            console.log(pair1, pair2);
        }
    }

    // PART 2
    if (pair1[0] === pair2[0] || pair1[1] === pair2[1]) {
        overlappingPairs2++;
    } else if(pair1[0] < pair2[0]) {
        if(pair2[0] <= pair1[1]) {
            overlappingPairs2++;
        }
    } else if(pair2[0] < pair1[0]) {
        if(pair1[0] <= pair2[1]) {
            overlappingPairs2++;
        }
    }
});

console.log(overlappingPairs);
console.log(overlappingPairs2);