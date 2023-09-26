// defined in a different file but not imported, supressing linter error
var Triangle4 = /** @class */ (function () {
    function Triangle4(side1, side2, side3) {
        this.side1 = side1;
        this.side2 = side2;
        this.side3 = side3;
    }
    Triangle4.prototype.anyTwoSidesGreaterThanThird = function () {
        if (!this.isComplete()) {
            throw new Error('Triangle is not complete');
        }
        // cannot be null because of isComplete check
        // suppressing linter error
        // @ts-ignore
        return (this.side1 + this.side2) > this.side3 &&
            // @ts-ignore
            (this.side2 + this.side3) > this.side1 &&
            // @ts-ignore
            (this.side3 + this.side1) > this.side2;
    };
    Triangle4.prototype.isComplete = function () {
        return this.side1 !== null && this.side1 !== undefined &&
            this.side2 !== null && this.side2 !== undefined &&
            this.side3 !== null && this.side3 !== undefined;
        ;
    };
    return Triangle4;
}());
function isValidTriangle(triangle) {
    return triangle.anyTwoSidesGreaterThanThird();
}
function parseFile(filePath) {
    var fs = require('fs');
    var file = fs.readFileSync(filePath, 'utf8');
    var lines = file.split('\n');
    var sides = lines.map(function (line) {
        return line.trim().split(/\s+/).map(function (side) { return parseInt(side); });
    });
    var triangles = sides.reduce(function (acc, side, index) {
        if (side.length !== 3) {
            console.log(side);
            side.forEach(function (num) { return console.log(num); });
            return acc;
        }
        if (index % 3 === 0) {
            var secondLine = sides[index + 1];
            var thirdLine = sides[index + 2];
            acc.push(new Triangle4(side[0], secondLine[0], thirdLine[0]));
            acc.push(new Triangle4(side[1], secondLine[1], thirdLine[1]));
            acc.push(new Triangle4(side[2], secondLine[2], thirdLine[2]));
        }
        return acc;
    }, []);
    return triangles;
}
function countValidTriangles(triangles) {
    return triangles.filter(function (triangle) { return isValidTriangle(triangle); }).length;
}
function main() {
    var triangles = parseFile('input.txt');
    var count = countValidTriangles(triangles);
    console.log('Number of valid triangles: ');
    console.log(count);
    return count;
}
main();
