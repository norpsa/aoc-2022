console.time('test');
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

const getRemainders = object => {
    for(let i = 0; i < monkeys.length; i++) {
        object[i] = object[i] % monkeys[i].divider;
    }
    return object;
}

const monkeyOperation = (monkey, object) => {
    if(monkey === 0) {
        object = object.map(a => a *= 13);
    }
    if(monkey === 1) {
        object = object.map(a => a *= a);
    }
    if(monkey === 2) {
        object = object.map(a => a += 7);
    }
    if(monkey === 3) {
        object = object.map(a => a += 4);
    }
    if(monkey === 4) {
        object = object.map(a => a *= 19);
    }
    if(monkey === 5) {
        object = object.map(a => a += 3);
    }
    if(monkey === 6) {
        object = object.map(a => a += 5);
    }
    if(monkey === 7) {
        object = object.map(a => a += 1);
    }

    return getRemainders(object);
}

// Initial remainders
monkeys.forEach(m => {
    m.objects = m.objects.map(o => {
        let remainders = [];
        let dividers = monkeys.map(m => m.divider);
        dividers.forEach(d => {
            remainders.push(o % d);
        });
        return remainders;
    });
});

for(let i = 0; i < 10000; i++) {
    for(let j = 0; j < monkeys.length; j++) {
        monkeys[j].objects.forEach(o => {
            let newValue = monkeyOperation(j, o);

            if(newValue[j] === 0) {
                monkeys[monkeys[j].ifTrue].objects.push(newValue);
            } else {
                monkeys[monkeys[j].ifFalse].objects.push(newValue);
            }
            monkeys[j].inspected++;
        });

        monkeys[j].objects = [];
    }
}

let sortedInspections = monkeys.map(m => m.inspected).sort((a, b) => b - a);
console.log(sortedInspections[0]*sortedInspections[1]);
console.timeEnd('test');