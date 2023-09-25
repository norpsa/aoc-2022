import { readFileSync } from 'fs';

let order = [];
let encrypted = [];

// Ehkä pitää vielä ettiä original index...
readFileSync('input_day20.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    let number = parseInt(line);
    order.push(number);
    encrypted.push({ number, moved: false });
});

const findIndex = (number) => {
    for(let i = 0; i < encrypted.length; i++) {
        if(!encrypted[i].moved && encrypted[i].number === number) {
            return i;
        }
    }

}

order.forEach(n => {
    let originalIndex = findIndex(n);
    let newIndex = originalIndex + n;
    if (newIndex >= encrypted.length) {
        newIndex = newIndex - encrypted.length - 1;
    }

    if (newIndex < 0) {
        if(Math.abs(newIndex) >= encrypted.length) {
            newIndex = newIndex + encrypted.length;
        }
        newIndex = encrypted.length + newIndex;
    }

    console.log("NUMERO", n, "UUSI SIJAINTI", newIndex, "VANHA SIJAINTI", originalIndex);

    if(newIndex === 0 && n < 0) {
        let newArray = encrypted.slice(0, originalIndex);
        newArray = newArray.concat(encrypted.slice(originalIndex + 1, encrypted.length));
        newArray.push({ number: n, moved: true });
        encrypted = newArray;
    } else if(newIndex === 0 && n > 0) { 
        let newArray = [];
        newArray.push({ number: n, moved: true });
        newArray = newArray.concat(encrypted.slice(0, originalIndex));
        newArray = newArray.concat(encrypted.slice(originalIndex + 1, encrypted.length));
        encrypted = newArray;
    } else if(newIndex < originalIndex) {
        let newArray = encrypted.slice(0, newIndex);
        newArray.push({ number: n, moved: true });
        newArray = newArray.concat(encrypted.slice(newIndex, originalIndex));
        newArray = newArray.concat(encrypted.slice(originalIndex + 1, encrypted.length));
        encrypted = newArray;
    } else if(newIndex > originalIndex) {
        let newArray = encrypted.slice(0, originalIndex);
        newArray = newArray.concat(encrypted.slice(originalIndex + 1, newIndex + 1));
        newArray.push({ number: n, moved: true });
        newArray = newArray.concat(encrypted.slice(newIndex + 1, encrypted.length));
        encrypted = newArray;
    }
});

let indexOfZero = 0;

for(let i = 0; i < encrypted.length; i++) {
    if(encrypted[i].number === 0) {
        indexOfZero = i;
        break;
    }
}


let thousand = encrypted[(indexOfZero + 1000) % (encrypted.length)];
let twothousand = encrypted[(indexOfZero + 2000) % (encrypted.length) ];
let threethousand = encrypted[(indexOfZero + 3000) % (encrypted.length)];

console.log(thousand.number + twothousand.number + threethousand.number);