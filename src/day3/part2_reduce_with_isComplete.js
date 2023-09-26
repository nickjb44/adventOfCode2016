// defined in a different file but not imported, supressing linter error
var Triangle2 = /** @class */ (function () {
    function Triangle2(side1, side2, side3) {
        this.side1 = side1;
        this.side2 = side2;
        this.side3 = side3;
    }
    Triangle2.prototype.anyTwoSidesGreaterThanThird = function () {
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
    Triangle2.prototype.isComplete = function () {
        return this.side1 !== null && this.side1 !== undefined &&
            this.side2 !== null && this.side2 !== undefined &&
            this.side3 !== null && this.side3 !== undefined;
        ;
    };
    Triangle2.prototype.addSide = function (side) {
        if (this.side1 === null) {
            this.side1 = side;
        }
        else if (this.side2 === null) {
            this.side2 = side;
        }
        else if (this.side3 === null) {
            this.side3 = side;
        }
        else {
            throw new Error('Triangle is already complete');
        }
    };
    return Triangle2;
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
    // initializing three triangles to construct as we go
    var triangle1 = new Triangle2(null, null, null);
    var triangle2 = new Triangle2(null, null, null);
    var triangle3 = new Triangle2(null, null, null);
    var triangles = sides.reduce(function (acc, side) {
        if (side.length !== 3) {
            console.log(side);
            side.forEach(function (num) { return console.log(num); });
            return acc;
        }
        triangle1.addSide(side[0]);
        triangle2.addSide(side[1]);
        triangle3.addSide(side[2]);
        if (triangle1.isComplete()) {
            acc.push(triangle1);
            triangle1 = new Triangle2(null, null, null);
            acc.push(triangle2);
            triangle2 = new Triangle2(null, null, null);
            acc.push(triangle3);
            triangle3 = new Triangle2(null, null, null);
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
