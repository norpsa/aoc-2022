import { readFileSync } from 'fs';

let input = [];
readFileSync('input_day8.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    input.push(line.split("").map(a => parseInt(a)));
});


// PART 1
// Trees around the edges
let visibleTrees = input.length*2 + (input[0].length - 2)*2;

for(let y = 1; y < input.length - 1; y++) {
    for(let x = 1; x < input[0].length - 1; x++) {
        //Left
        
        if(input[y].slice(0, x).filter(a => a >= input[y][x]).length === 0){
            visibleTrees++;
            continue;
        }

        // Right
        if(input[y].slice(x + 1, input[y].length).filter(a => a >= input[y][x]).length === 0){
            visibleTrees++;
            continue;
        }

        // Top
        let visible = true;
        for(let i = y - 1; i >= 0; i--) {
            if(input[i][x] >= input[y][x]) {
                visible = false;
                break;
            }
        }
        if(visible) {
            visibleTrees++;
            continue;
        }

        // Bottom
        visible = true;
        for(let i = y + 1; i < input.length; i++) {
            if(input[i][x] >= input[y][x]) {
                visible = false;
                break;
            }
        }

        if(visible) {
            visibleTrees++;
        }

    }
}

let bestScore = 0;

for(let y = 1; y < input.length - 1; y++) {
    for(let x = 1; x < input[0].length - 1; x++) {

        let score = 1;
        let factor = 1;
        //Left
        for(let i = x - 1; i > 0; i--) {
            if(input[y][i] >= input[y][x]) {
                break;
            } else {
                factor++;
            }
        }
        
        score = score*factor;

        factor = 1;
        

        // Right
        for(let i = x + 1; i < input[y].length - 1; i++) {
            if(input[y][i] >= input[y][x]) {
                break;
            } else {
                factor++;
            }
        }



        score = score*factor;
        factor = 1;

        // Top
        for(let i = y - 1; i > 0; i--) {
            if(input[i][x] >= input[y][x]) {
                break;
            } else {
                factor++;
            }
        }

        score = score*factor;
        factor = 1;

        // Bottom
        for(let i = y + 1; i < input.length - 1; i++) {
            if(input[i][x] >= input[y][x]) {
                break;
            } else {
                factor++;
            }
        }

        score = score*factor;

        if(score > bestScore) {
            bestScore = score;
        }

    }
}


console.log(visibleTrees);
console.log(bestScore);