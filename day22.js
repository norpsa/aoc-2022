import { readFileSync } from 'fs';

let map = [];
let path;

readFileSync('input_day22.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    if(line.includes('R')) {
        path = line;
    } else if (line) {
        let input = line.split("");
        map.push(input);
    }
});

console.log(path);
console.log(map);

let y = 0;
let x = 0;

for(let i = 0; i < map[0].length; i++) {
    if(map[0][i] === ".") {
        x = i;
        break;
    }
}

console.log(y, x);