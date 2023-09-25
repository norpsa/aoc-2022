import { readFileSync } from 'fs';

let input;

let map = [];
for(let i = 0; i < 22; i++) {
    let layer = [];
    for(let j = 0; j < 22; j++) {
        layer.push(new Array(22).fill(0));
    }
    map.push(layer);
}

readFileSync('input_day18.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    input = line.split(",").map(a => parseInt(a));
    map[input[2]][input[1]][input[0]] = 1;
});


// PART 1
let openSides = 0;
for(let z = 0; z < 22; z++) {
    for(let y = 0; y < 22; y++) {
        for(let x = 0; x < 22; x++) {
            if(map[z][y][x] === 1) {
                if((z > 0 && map[z - 1][y][x] === 0) || z === 0) {
                    openSides++;
                }
                if((z < 21 && map[z + 1][y][x] === 0) || z === 21) {
                    openSides++;
                }
                if((y > 0 && map[z][y - 1][x] === 0) || y === 0) {
                    openSides++;
                }
                if((y < 21 && map[z][y + 1][x] === 0) || y === 21) {
                    openSides++;
                }
                if((x > 0 && map[z][y][x - 1] === 0) || x === 0) {
                    openSides++;
                }
                if((x < 21 && map[z][y][x + 1] === 0) || x === 21) {
                    openSides++;
                }
            }
        }
    }
}

console.log("PART 1", openSides);

let fill = new Set();
let queue = [];
let visited = new Set();
queue.push({ x: 0, y: 0, z: 0});
fill.add({ x: 0, y: 0, z: 0});

while(queue.length !== 0) {
    let p = queue.shift();
    if(map[p.z][p.y][p.x] === 0 && !fill.has(p)) {
        fill.add(p);
        if((p.z > 0 && map[p.z - 1][p.y][p.x] === 0)) {
            if(!visited.has(JSON.stringify({ x: p.x, y: p.y, z: p.z - 1}))) {
                queue.push({ x: p.x, y: p.y, z: p.z - 1});
                visited.add(JSON.stringify({ x: p.x, y: p.y, z: p.z - 1}));
            }
        }
        if((p.z < 21 && map[p.z + 1][p.y][p.x] === 0)) {
            if(!visited.has(JSON.stringify({ x: p.x, y: p.y, z: p.z + 1}))) {
                queue.push({ x: p.x, y: p.y, z: p.z + 1});
                visited.add(JSON.stringify({ x: p.x, y: p.y, z: p.z + 1}));
            }
        }
        if((p.y > 0 && map[p.z][p.y - 1][p.x] === 0)) {
            if(!visited.has(JSON.stringify({ x: p.x, y: p.y - 1, z: p.z}))) {
                queue.push({ x: p.x, y: p.y - 1, z: p.z });
                visited.add(JSON.stringify({ x: p.x, y: p.y - 1, z: p.z }));
            }
        }
        if((p.y < 21 && map[p.z][p.y + 1][p.x] === 0)) {
            if(!visited.has(JSON.stringify({ x: p.x, y: p.y + 1, z: p.z}))) {
                queue.push({ x: p.x, y: p.y + 1, z: p.z });
                visited.add(JSON.stringify({ x: p.x, y: p.y + 1, z: p.z }));

            }
        }
        if((p.x > 0 && map[p.z][p.y][p.x - 1] === 0)) {
            if(!visited.has(JSON.stringify({ x: p.x -1, y: p.y, z: p.z }))) {
                queue.push({ x: p.x - 1, y: p.y, z: p.z });
                visited.add(JSON.stringify({ x: p.x - 1, y: p.y, z: p.z }));
            }
        }
        if((p.x < 21 && map[p.z][p.y][p.x + 1] === 0)) {
            if(!visited.has(JSON.stringify({ x: p.x + 1, y: p.y, z: p.z }))) {
                queue.push({ x: p.x + 1, y: p.y, z: p.z });
                visited.add(JSON.stringify({ x: p.x + 1, y: p.y, z: p.z }));
            }

        }
    }
}

fill.forEach(p => {
    map[p.z][p.y][p.x] = 1;
});

let oldResult = openSides;

openSides = 0;
for(let z = 0; z < 22; z++) {
    for(let y = 0; y < 22; y++) {
        for(let x = 0; x < 22; x++) {
            if(map[z][y][x] === 1) {
                if((z > 0 && map[z - 1][y][x] === 0)) {
                    openSides++;
                }
                if((z < 21 && map[z + 1][y][x] === 0)) {
                    openSides++;
                }
                if((y > 0 && map[z][y - 1][x] === 0)) {
                    openSides++;
                }
                if((y < 21 && map[z][y + 1][x] === 0)) {
                    openSides++;
                }
                if((x > 0 && map[z][y][x - 1] === 0)) {
                    openSides++;
                }
                if((x < 21 && map[z][y][x + 1] === 0)) {
                    openSides++;
                }
            }
        }
    }
}
console.log("PART 2", oldResult - openSides);
