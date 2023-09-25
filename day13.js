import { readFileSync } from 'fs';

let pairs = [];
readFileSync('input_day13.txt', 'utf-8').split(/\r?\n\r?\n/).forEach(function(line){
    let pair = line.split(/\r?\n/).map(a => JSON.parse(a));
    pairs.push(pair);
});

const compare = (p1, p2) => {
    if(!Array.isArray(p1) && !Array.isArray(p2)) {
        if(p1 === p2) {
            return 0;
        } else if(p1 < p2) {
            return -1;
        }
        return 1;
    }

    if(Array.isArray(p1) && Array.isArray(p2)) {

        if(p1.length === 0 || p2.length === 0) {
            if(p1.length === p2.length) {
                return 0;
            }
            if(p1.length > p2.length) {
                return 1;
            } 
            return -1;
        }

        let result = compare(p1[0], p2[0]);
        let i = 1;

        while(result === 0 && i < p1.length && i < p2.length) {
            result = compare(p1[i], p2[i]);
            i++;
        };

        if(result === 0) {
            if(p1.length === p2.length) {
                return 0;
            }
            if(p1.length > p2.length) {
                return 1;
            } 
            return -1;
        }

        return result;
    }

    if(Array.isArray(p1) && !Array.isArray(p2)) {
        return compare(p1, [p2]);
    }

    if(!Array.isArray(p1) && Array.isArray(p2)) {
        return compare([p1], p2);
    }
};

let result = 0;
let index = 1;

pairs.forEach(p => {
    let pair1 = p[0];
    let pair2 = p[1];
    if(compare(pair1, pair2) === -1) {
        result += index;
    }
    index++;
});

console.log("PART1", result);

let rows = [];
// PART 2
pairs.forEach(p => {
    rows.push(p[0]);
    rows.push(p[1]);
});

rows.push([[2]]);
rows.push([[6]]);


let sorted = rows.sort((p1, p2) => compare(p1, p2) );

let first = 0;
let second = 0;
for(let i = 0; i < sorted.length; i++) {
    if(sorted[i].length === 1) {
        if(Array.isArray(sorted[i][0]) && sorted[i][0].length === 1) {
            if(sorted[i][0][0] === 2) {
                first = i + 1;
            }
            if(sorted[i][0][0] === 6) {
                second = i + 1;
            }
        }
    }
}

console.log("PART2", first*second);