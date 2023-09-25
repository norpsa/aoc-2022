import { readFileSync } from 'fs';

console.time('test');

let cave = [];
for(let i = 0; i < 1000; i++) {
    cave.push(new Array(1000).fill('.'));
}

let rightMostWall = 0;
let leftMostWall = 1000;
let bottom = 0;

readFileSync('input_day14.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    let coordinates = line.split(" -> ");
    for(let i = 1; i < coordinates.length; i++) {
        let start = coordinates[i - 1].split(",").map(a => parseInt(a));
        let end = coordinates[i].split(",").map(a => parseInt(a));

        let minX = Math.min(start[0], end[0]);
        let maxX = Math.max(start[0], end[0]);

        let minY = Math.min(start[1], end[1]);
        let maxY = Math.max(start[1], end[1]);

        if(minY > bottom) {
            bottom = minY;
        }

        if(maxX > rightMostWall) {
            rightMostWall = maxX;
        }

        if(minX < leftMostWall) {
            leftMostWall = minX;
        }

        for(let y = minY; y <= maxY; y++) {
            for(let x = minX; x <= maxX; x++) {
                cave[y][x] = '#';
            }
        }
    }
});

const checkIfAbyss = (x, y) => {
    if(x < leftMostWall || x > rightMostWall || y > bottom) {
        return true;
    }
    return false;
}

let sand = 0;
let abyss = false;
let rest = false;

while(!abyss) {
    let sandX = 500;
    let sandY = 0;
    rest = false;

    while(!rest && !abyss) {

        if(checkIfAbyss(sandX, sandY)){
            abyss = true;
            break;
        }

        if(cave[sandY + 1][sandX] === '.') {
            sandY++;
        } else if(cave[sandY + 1][sandX - 1] === '.') {
            sandY++;
            sandX--;
        } else if(cave[sandY + 1][sandX + 1] === '.') {
            sandY++;
            sandX++;
        } else {
            rest = true;
            cave[sandY][sandX] = 'o';
            sand++;
        }
    }
}

console.log("PART 1", sand);

// Part 2, data reset
for(let y = 0; y < 1000; y++) {
    for(let x = 0; x < 1000; x++) {
        if(cave[y][x] === 'o') {
            cave[y][x] === '.';
        }
    }
}

for(let x = 0; x <= 1000; x++) {
    cave[bottom + 2][x] = '#';
}

let end = false;
while(!end) {
    let sandX = 500;
    let sandY = 0;
    rest = false;

    while(!rest && !end) {

        if(cave[sandY + 1][sandX] === '.') {
            sandY++;
        } else if(cave[sandY + 1][sandX - 1] === '.') {
            sandY++;
            sandX--;
        } else if(cave[sandY + 1][sandX + 1] === '.') {
            sandY++;
            sandX++;
        } else {
            rest = true;
            cave[sandY][sandX] = 'o';
            sand++;

            if(sandY === 0 && sandX === 500) {
                end = true;
            }
        }
    }
}

console.log("PART 2", sand);

console.timeEnd('test');