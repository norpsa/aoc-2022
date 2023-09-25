import { readFileSync } from 'fs';

let input;

readFileSync('input_day17.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    input = line.split("");
});

let cave = [];

// Luolalle pohja, muistetaan vähentää sit lopuks
cave.push(new Array(7).fill(1));
cave.push(new Array(7).fill(0));
cave.push(new Array(7).fill(0));
cave.push(new Array(7).fill(0));

for(let i = 1; i <= 2022; i++) {
    let inputIndex = i % input.length - 1;
    let stoneType = i % 5;
    
    // Lisätään uudet tyhjät rivit luolaan
    if(cave[cave.length - 1].reduce((a, b) => a + b, 0) !== 0) {
        cave.push(new Array(7).fill(0));
        cave.push(new Array(7).fill(0));
        cave.push(new Array(7).fill(0));
    } else if(cave[cave.length - 2].reduce((a, b) => a + b, 0) !== 0) {
        cave.push(new Array(7).fill(0));
        cave.push(new Array(7).fill(0));
    } else if(cave[cave.length - 3].reduce((a, b) => a + b, 0) !== 0) {
        cave.push(new Array(7).fill(0));
    }
    cave.push(new Array(7).fill(0));

    let stoneBottom = cave.length;

    switch (stoneType) {
        case 1:
            // ####
            cave[cave.length - 1] = [0, 0, 2, 2, 2, 2, 0];
            stoneBottom = cave.length - 1;            
            break;
        case 2:
            // .#.
            // ###
            // .#.
            cave[cave.length - 1] = [0, 0, 0, 2, 0, 0, 0];
            cave[cave.length - 2] = [0, 0, 2, 2, 2, 0, 0];
            cave[cave.length - 3] = [0, 0, 0, 2, 0, 0, 0];
            stoneBottom = cave.length - 3;  
            break;
        case 3:
            // ..#
            // ..#
            // ###
            cave[cave.length - 1] = [0, 0, 0, 0, 2, 0, 0];
            cave[cave.length - 2] = [0, 0, 0, 0, 2, 0, 0];
            cave[cave.length - 3] = [0, 0, 2, 2, 2, 0, 0];
            stoneBottom = cave.length - 3;
            break;
        case 4:
            // #
            // #
            // #
            // #
            cave[cave.length - 1] = [0, 0, 2, 0, 0, 0, 0];
            cave[cave.length - 2] = [0, 0, 2, 0, 0, 0, 0];
            cave[cave.length - 3] = [0, 0, 2, 0, 0, 0, 0];
            cave[cave.length - 4] = [0, 0, 2, 0, 0, 0, 0];
            stoneBottom = cave.length - 4;
            break;
        case 5:
            // ##
            // ##
            cave[cave.length - 1] = [0, 0, 2, 2, 0, 0, 0];
            cave[cave.length - 2] = [0, 0, 2, 2, 0, 0, 0];
            stoneBottom = cave.length - 2;
            break;
        default:
            break;
    }

    let stoneRest = false;
    while(!stoneRest) {
        let move = input[inputIndex];
        switch(stoneType) {
            case 1:
                // ####
                if(move === '>') {

                }
        
                break;
            case 2:
                // .#.
                // ###
                // .#.

                break;
            case 3:
                // ..#
                // ..#
                // ###

                break;
            case 4:
                // #
                // #
                // #
                // #

                break;
            case 5:
                // ##
                // ##

                break;
            default:
                break;

        }
    }

}