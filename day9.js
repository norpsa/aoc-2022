import { readFileSync } from 'fs';

let input;


let map = [];
let mapSize = 1000;
for(let i = 0; i < mapSize; i++) {
    map.push(new Array(mapSize).fill(0));
}

let part2 = [];
for(let i = 0; i < mapSize; i++) {
    part2.push(new Array(mapSize).fill(0));
}

let h_x = 500;
let h_y = 500;
let t_x = 500;
let t_y = 500;

let t = [{x: 500, y: 500}, {x: 500, y: 500}, {x: 500, y: 500}, {x: 500, y: 500}, {x: 500, y: 500}, {x: 500, y: 500}, {x: 500, y: 500}, {x: 500, y: 500}, {x: 500, y: 500}]


map[t_y][t_x] = 1;

part2[t[0].y][t[0].x] = 1;

readFileSync('input_day9.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    input = line.split(" ");
    let direction = input[0];
    let amount = parseInt(input[1]);

    for(let j = 0; j < amount; j++) {
        if(direction === 'R') {
            h_x++;
        } else if(direction === 'L') {
            h_x--;
        } else if(direction === 'U') {
            h_y--;
        } else {
            h_y++;
        }

        // Part 1
        if(Math.abs(t_x - h_x) > 1 && Math.abs(t_y - h_y) === 1) {
            if(t_x > h_x) {
                t_x--;
            } else {
                t_x++;
            }
            t_y = h_y;
        } else if(Math.abs(t_y - h_y) > 1 && Math.abs(t_x - h_x) === 1) {
            if(t_y > h_y) {
                t_y--;
            } else {
                t_y++;
            }
            t_x = h_x;
        } else if(Math.abs(t_y - h_y) > 1) {
            if(t_y > h_y) {
                t_y--;
            } else {
                t_y++;
            }
        } else if(Math.abs(t_x - h_x) > 1) {
            if(t_x > h_x) {
                t_x--;
            } else {
                t_x++;
            }
        }

        map[t_y][t_x] = 1;

        // Part 2
        if(Math.abs(t[0].x - h_x) > 1 && Math.abs(t[0].y - h_y) === 1) {
            if(t[0].x > h_x) {
                t[0].x--;
            } else {
                t[0].x++;
            }
            t[0].y = h_y;
        } else if(Math.abs(t[0].y - h_y) > 1 && Math.abs(t[0].x - h_x) === 1) {
            if(t[0].y > h_y) {
                t[0].y--;
            } else {
                t[0].y++;
            }
            t[0].x = h_x;
        } else if(Math.abs(t[0].y - h_y) > 1 && Math.abs(t[0].x - h_x) > 1) {
            if(t[0].y > h_y) {
                t[0].y--;
            } else {
                t[0].y++;
            }
            if(t[0].x > h_x) {
                t[0].x--;
            } else {
                t[0].x++;
            }
        } else if(Math.abs(t[0].x - h_x) > 1 && Math.abs(t[0].y - h_y) > 1) {
            if(t[0].x > h_x) {
                t[0].x--;
            } else {
                t[0].x++;
            }
            if(t[0].y > h_y) {
                t[0].y--;
            } else {
                t[0].y++;
            }
        } else if(Math.abs(t[0].y - h_y) > 1) {
            if(t[0].y > h_y) {
                t[0].y--;
            } else {
                t[0].y++;
            }
        } else if(Math.abs(t[0].x - h_x) > 1) {
            if(t[0].x > h_x) {
                t[0].x--;
            } else {
                t[0].x++;
            }
        }
        //console.log("HÄNTÄ", 0, t[0].x, t[0].y);

        for(let i = 1; i < 9; i++) {
            if(Math.abs(t[i].x - t[i - 1].x) > 1 && Math.abs(t[i].y - t[i - 1].y) === 1) {
                if(t[i].x > t[i - 1].x) {
                    t[i].x--;
                } else {
                    t[i].x++;
                }
                t[i].y = t[i - 1].y;
            } else if(Math.abs(t[i].y - t[i - 1].y) > 1 && Math.abs(t[i].x - t[i - 1].x) === 1) {
                if(t[i].y > t[i - 1].y) {
                    t[i].y--;
                } else {
                    t[i].y++;
                }
                t[i].x = t[i - 1].x;
            } else if(Math.abs(t[i].y - t[i - 1].y) > 1 && Math.abs(t[i].x - t[i - 1].x) > 1) {
                if(t[i].y > t[i - 1].y) {
                    t[i].y--;
                } else {
                    t[i].y++;
                }
                if(t[i].x > t[i - 1].x) {
                    t[i].x--;
                } else {
                    t[i].x++;
                }
            } else if(Math.abs(t[i].x - t[i - 1].x) > 1 && Math.abs(t[i].y - t[i - 1].y) > 1) {
                if(t[i].x > t[i - 1].x) {
                    t[i].x--;
                } else {
                    t[i].x++;
                }
                if(t[i].y > t[i - 1].y) {
                    t[i].y--;
                } else {
                    t[i].y++;
                }
            } else if(Math.abs(t[i].y - t[i - 1].y) > 1) {
                if(t[i].y > t[i - 1].y) {
                    t[i].y--;
                } else {
                    t[i].y++;
                }
            } else if(Math.abs(t[i].x - t[i - 1].x) > 1) {
                if(t[i].x > t[i - 1].x) {
                    t[i].x--;
                } else {
                    t[i].x++;
                }
            }
            //console.log("HÄNTÄ", i, t[i].x, t[i].y);
        }
        part2[t[8].y][t[8].x] = 1;

        /*for(let i = 10; i < 40; i++) {
            let roska = "";
            for(let j = 10; j < 40; j++) {
                let tulostettu = false;
                if(h_x === j && h_y === i) {
                    roska += ("H");
                    tulostettu = true;
                } else {
                    for(let k = 0; k < 9; k++) {
                        if(t[k].x === j && t[k].y === i) {
                            roska += k;
                            tulostettu = true;
                            break;
                        }
                    }
                }
                if(!tulostettu) {
                    roska += ".";
                }
            }
            console.log(roska);
        }
        console.log();
        console.log();*/
    }
});

// Part 1
let sum = 0;
for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        sum += map[j][i];
    }
}
console.log(sum);

sum = 0;
for (let i = 0; i < part2.length; i++) {
    for (let j = 0; j < part2[i].length; j++) {
        sum += part2[j][i];
    }
}
console.log(sum);
