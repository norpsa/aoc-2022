import { readFileSync } from 'fs';
console.time('test');

let data = [];
readFileSync('input_day12.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    data.push(line.split(""));
});

let startX = 0;
let startY = 0;

for(let y = 0; y < data.length; y++) {
    for(let x = 0; x < data[y].length; x++) {
        if(data[y][x] === 'S') {
            startX = x;
            startY = y;
            break;
        }
    }
}

let endX = 0;
let endY = 0;

for(let y = 0; y < data.length; y++) {
    for(let x = 0; x < data[y].length; x++) {
        if(data[y][x] === 'E') {
            endX = x;
            endY = y;
            data[y][x] = '{';
            break;
        }
    }
}

const getMinimumDistance = (dist, queue) =>
{
    let min = Number.MAX_VALUE;
    let min_key = "";
     
    for(let y = 0; y < dist.length; y++) {
      for(let x = 0; x < dist[0].length; x++) {
        if(dist[y][x] <= min && queue.has(JSON.stringify({x: x, y: y}))) {
            min = dist[y][x];
            min_key = {x: x, y: y};
        }
      }
    }

    return min_key;
}

const getNeighbours = (v) => {
  let neighbours = [];
  let x = v.x;
  let y = v.y;
  let currentSignal = data[y][x].charCodeAt(0);

  if(currentSignal === 83) {
    currentSignal = 10000;
  }
  
  if(v.x > 0 && (data[y][x - 1].charCodeAt(0) <= currentSignal + 1)) {
    neighbours.push({x: x - 1, y: y});
  }
  if(v.y > 0 && (data[y - 1][x].charCodeAt(0) <= currentSignal + 1)) {
    neighbours.push({x: x, y: y - 1 });
  }
  if(v.x < data[0].length - 1 && (data[y][x + 1].charCodeAt(0) <= currentSignal + 1)) {
    neighbours.push({x: x + 1, y: y })
  }
  if(v.y < data.length - 1 && (data[y + 1][x].charCodeAt(0) <= currentSignal + 1)) {
    neighbours.push({x: x, y: y + 1 })
  }

  return neighbours;
}

const dijkstra = (graph) =>
{
    let dist = [];
    let queue = new Set();

    for(let i = 0; i < graph.length; i++) {
      let distRow = [];
      for(let j = 0; j < graph[0].length; j++) {
        if(data[i][j] === 'a' || data[i][j] === 'S') {
            distRow.push(0);
        } else {
            distRow.push(Number.MAX_VALUE);
        }

        queue.add(JSON.stringify({ x: j, y: i }));
      }
      dist.push(distRow);
    }
    
    dist[startY][startX] = 0;
     
    while(queue.size > 0) {
      let v = getMinimumDistance(dist, queue);
      queue.delete(JSON.stringify(v));
      let vObject = v;

      let neighbours = getNeighbours(vObject);

      neighbours.forEach(u => {
        let alternative = dist[vObject.y][vObject.x] + 1;
        if(alternative < dist[u.y][u.x]) {
            dist[u.y][u.x] = alternative;
        }
      });
    }
    return dist;
}

const dijkstra_part1 = (graph) =>
{
    let dist = [];
    let queue = new Set();

    for(let i = 0; i < graph.length; i++) {
      let distRow = [];
      for(let j = 0; j < graph[0].length; j++) {

        distRow.push(Number.MAX_VALUE);

        queue.add(JSON.stringify({ x: j, y: i }));
      }
      dist.push(distRow);
    }
    
    dist[startY][startX] = 0;
     
    while(queue.size > 0) {
      let v = getMinimumDistance(dist, queue);
      queue.delete(JSON.stringify(v));
      let vObject = v;

      let neighbours = getNeighbours(vObject);

      neighbours.forEach(u => {
        let alternative = dist[vObject.y][vObject.x] + 1;
        if(alternative < dist[u.y][u.x]) {
            dist[u.y][u.x] = alternative;
        }
      });
    }
    return dist;
}

let route = dijkstra_part1(data);
console.log("PART1", route[endY][endX]);

route = dijkstra(data);

console.log("PART2", route[endY][endX]);

console.timeEnd('test');