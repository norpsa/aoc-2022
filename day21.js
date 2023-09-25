import { readFileSync } from 'fs';

let monkeys = new Map();

readFileSync('input_day21.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    let input = line.split(": ");
    let monkeyName = input[0];
    var regex=/^[0-9]+$/;
    if (input[1].match(regex)) {
        monkeys.set(monkeyName, parseInt(input[1]));
    } else {
        monkeys.set(monkeyName, input[1]);
    }
});


const resolveMonkey = (monkeyName) => {
    let monkey = monkeys.get(monkeyName);
    if(Number.isInteger(monkey)) {
        return monkey;
    }

    if(monkey.includes("+")) {
        let split = monkey.split(" + ");
        let result = resolveMonkey(split[0]) + resolveMonkey(split[1]);
        monkeys.set(monkey, result);
        return result;
    } else if(monkey.includes("-")) {
        let split = monkey.split(" - ");
        let result = resolveMonkey(split[0]) - resolveMonkey(split[1]);
        monkeys.set(monkey, result);
        return result;
    } if(monkey.includes("*")) {
        let split = monkey.split(" * ");
        let result = resolveMonkey(split[0]) * resolveMonkey(split[1]);
        monkeys.set(monkey, result);
        return result;
    } if(monkey.includes("/")) {
        let split = monkey.split(" / ");
        let result = resolveMonkey(split[0]) / resolveMonkey(split[1]);
        monkeys.set(monkey, result);
        return result;
    }
}

console.log("PART 1", resolveMonkey('root'));

const containsHumn = (monkeyName) => {
    let monkey = monkeys.get(monkeyName);
    if(monkeyName === 'humn') {
        return true;
    }

    if(Number.isInteger(monkey)) {
        return false;
    }

    let split = monkey.split(" ");

    return containsHumn(split[0]) || containsHumn(split[2]);
}

let solved = false;
let start = 'root'
let humnResult;
while(!solved) {
    let split = monkeys.get(start).split(" ");
    let humn;
    let nothumn;
    
    let operator = split[1];
    if(containsHumn(split[0])) {
        humn = split[0];
        nothumn = split[2];
    } else {
        humn = split[2];
        nothumn = split[0];
    }

    let resultToMatch = resolveMonkey(nothumn);

    if(start === 'root') {
        humnResult = resultToMatch;
    } else if(operator === '+') {
        humnResult = humnResult - resultToMatch;
    } else if(operator === '-') {
        if(humn === split[0]) {
            humnResult = humnResult + resultToMatch;
        } else {
            humnResult = resultToMatch - humnResult;
        }
    } else if(operator === '*') {
        humnResult = humnResult / resultToMatch;
    } else if(operator === '/') {
        if(humn === split[0]) {
            humnResult = humnResult * resultToMatch;
        } else {
            humnResult = resultToMatch / humnResult;
        }
    }

    if(split[0] === 'humn' || split[2] === 'humn') {
        solved = true;
    }

    start = humn;
}

console.log("PART 2", humnResult);
