import { readFileSync } from 'fs';

class TreeNode {
    constructor(key, value = key, size = null, parent = null) {
        this.key = key;
        this.value = value;
        this.size = size;
        this.parent = parent;
        this.children = [];
    }

    get isLeaf() {
        return this.children.length === 0;
    }
}

let counter = 0;
let currentNode;
let root;
readFileSync('input_day7.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    let input = line.split(" ");
    if(counter === 0) {
        root = new TreeNode(counter, "/");
        currentNode = root;
    } else if(input[0] === "$") {
        if(input[1] === "cd") {
            if(input[2] === "..") {
                currentNode = currentNode.parent;
            } else {
                let correctChild = currentNode.children.filter(a => a.value === input[2])[0];
                currentNode = correctChild;
            }
        }
    } else {
        if(input[0] === "dir") {
            currentNode.children.push(new TreeNode(counter, input[1], null, currentNode));
        } else {
            currentNode.children.push(new TreeNode(counter, input[1], parseInt(input[0]), currentNode));
        }
    }
    
    //Random counter to get unique keys to nodes
    counter++;

});

let sums = new Map();

let getSizeForNode = (node) => {
    if(node.isLeaf) {
        return node.size;
    } else {
        let sum = 0;
        node.children.forEach(a => {
            sum+= getSizeForNode(a);
        });
        sums.set(node.key, sum);
        return sum;
    }
}

const totalSize = getSizeForNode(root);
const sizeNeeded = 30000000 - (70000000 - totalSize);

let part1 = 0;
let part2 = totalSize;
sums.forEach((value) => {
    if(value <= 100000) {
        part1 += value;
    }

    if(value >= sizeNeeded) {
        if(value < part2) {
            part2 = value;
        }
    }
})

console.log(part1);
console.log(part2);