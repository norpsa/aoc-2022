import { readFileSync } from 'fs';

let data = [];

const maxValue = 4000000;

readFileSync('input_day15.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    let row = line.split('at').map(a => a.trim());
    let sensor = row[1].split(":")[0].split(",").map(a => a.trim());
    let beacon = row[2].split(",");
    let sensorX = parseInt(sensor[0].split("=")[1]);
    let sensorY = parseInt(sensor[1].split("=")[1]);
    let beaconX = parseInt(beacon[0].split("=")[1]);
    let beaconY = parseInt(beacon[1].split("=")[1]);
    let xDistance = Math.abs(beaconX - sensorX);
    let yDistance = Math.abs(beaconY - sensorY);
    let totalDistance = xDistance + yDistance;
    data.push({sensor: { x: sensorX, y: sensorY}, beacon: { x: beaconX, y: beaconY }, totalDistance });
});

for(let y = 0; y <= maxValue; y++) {
    let maxX = 0;
    data.map(d => {
        let xOffSet = d.totalDistance - Math.abs(d.sensor.y - y);
        return { start: Math.max(d.sensor.x - xOffSet, 0), end: Math.min(d.sensor.x + xOffSet, maxValue)};
    }).filter(a => a.end - a.start > 0).sort((a, b) => a.start - b.start).forEach(b => {
        if(b.start > maxX + 1) {
            console.log((b.start - 1) * 4000000 + y);
            process.exit();
        }

        if(b.start <= maxValue) {
            maxX = Math.max(maxX, Math.min(b.end, maxValue));
        }
    });
}
