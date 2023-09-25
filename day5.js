import { readFileSync } from 'fs';

let cratesInput = [];
let maxCrate = 0;
let instructions = [];

readFileSync('input_day5.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    if(line.includes("[")){
        cratesInput.push(line);
    } else if((/^[0-9\s]*$/).test(line) && line){
        console.log(line);
        maxCrate = parseInt(line.charAt(line.length - 2));
    } else if(line){
        let numbers = line.match(/\d+/g).map(a => parseInt(a));
        instructions.push(numbers);
    }
});

let crates = [];
for(let i = 0; i < maxCrate; i++) {
    crates.push(new Array());
}



while(cratesInput.length > 0) {
    let input = cratesInput.pop().split("");
    for(let i = 0; i < maxCrate; i++) {
        if(input[i + 1 + i*3] !== " ") {
            crates[i].push(input[i + 1 + i*3]);
        } 
    }
}


// PART 1
/*instructions.forEach(a => {
    let amount = a[0];
    let from = a[1];
    let to = a[2];

    for(let i = 0; i < amount; i++){
        let moved = crates[from - 1].pop();
        crates[to - 1].push(moved);
    }

}); */


// PART 2
instructions.forEach(a => {
    let amount = a[0];
    let from = a[1];
    let to = a[2];

    let temp = [];
    for(let i = 0; i < amount; i++){
        let moved = crates[from - 1].pop();
        temp.push(moved);
    }

    while(temp.length > 0) {
        crates[to - 1].push(temp.pop());
    }

});


let result = "";

crates.forEach(a => {
    result += a.pop();
});

console.log(result);





