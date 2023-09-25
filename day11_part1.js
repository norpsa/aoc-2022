let monkeys = [
    {
        objects: [91, 58, 52, 69, 95, 54],
        divider: 7,
        ifTrue: 1,
        ifFalse: 5,
        inspected: 0, 
    },
    {
        objects: [80, 80, 97, 84],
        divider: 3,
        ifTrue: 3,
        ifFalse: 5,
        inspected: 0,
    },
    {
        objects: [86, 92, 71],
        divider: 2,
        ifTrue: 0,
        ifFalse: 4,
        inspected: 0, 
    },
    {
        objects: [96, 90, 99, 76, 79, 85, 98, 61],
        divider: 11,
        ifTrue: 7,
        ifFalse: 6,
        inspected: 0, 
    },
    {
        objects: [60, 83, 68, 64, 73],
        divider: 17,
        ifTrue: 1,
        ifFalse: 0,
        inspected: 0, 
    },
    {
        objects: [96, 52, 52, 94, 76, 51, 57],
        divider: 5,
        ifTrue: 7,
        ifFalse: 3,
        inspected: 0, 
    },
    {
        objects: [75],
        divider: 13,
        ifTrue: 4,
        ifFalse: 2,
        inspected: 0, 
    },
    {
        objects: [83, 75],
        divider: 19,
        ifTrue: 2,
        ifFalse: 6,
        inspected: 0, 
    },
];

const monkeyOperation = (monkey, object) => {
    if(monkey === 0) {
        return object * 13;
    }
    if(monkey === 1) {
        return object * object;
    }
    if(monkey === 2) {
        return object + 7;
    }
    if(monkey === 3) {
        return object + 4;
    }
    if(monkey === 4) {
        return object * 19;
    }
    if(monkey === 5) {
        return object + 3;
    }
    if(monkey === 6) {
        return object + 5;
    }
    if(monkey === 7) {
        return object + 1;
    } 
}

for(let i = 0; i < 20; i++) {
    for(let j = 0; j < monkeys.length; j++) {
        monkeys[j].objects.forEach(o => {
            let value = monkeyOperation(j, o);
            value = Math.floor(value/3);

            if(value % (monkeys[j].divider) === 0) {
                monkeys[monkeys[j].ifTrue].objects.push(value);
            } else {
                monkeys[monkeys[j].ifFalse].objects.push(value);
            }
            monkeys[j].inspected++;
        });

        monkeys[j].objects = [];
        console.log(monkeys);
    }
}

let sortedInspections = monkeys.map(m => m.inspected).sort((a, b) => b - a);
console.log(sortedInspections);
console.log(sortedInspections[0]*sortedInspections[1]);