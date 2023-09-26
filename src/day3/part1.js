var Triangle = /** @class */ (function () {
    function Triangle(side1, side2, side3) {
        this.side1 = side1;
        this.side2 = side2;
        this.side3 = side3;
    }
    Triangle.prototype.anyTwoSidesGreaterThanThird = function () {
        return (this.side1 + this.side2) > this.side3 &&
            (this.side2 + this.side3) > this.side1 &&
            (this.side3 + this.side1) > this.side2;
    };
    return Triangle;
}());
function isValidTriangle(triangle) {
    return triangle.anyTwoSidesGreaterThanThird();
}
function parseFile(filePath) {
    var fs = require('fs');
    var file = fs.readFileSync(filePath, 'utf8');
    var lines = file.split('\n');
    var triangles = lines.map(function (line) {
        // split on any number of spaces
        // ignoring initial whitespace
        var sides = line.trim().split(/\s+/).map(function (side) { return parseInt(side); });
        return new Triangle(sides[0], sides[1], sides[2]);
    });
    return triangles;
}
function countValidTriangles(triangles) {
    console.log(triangles);
    var nTriangles = triangles.filter(function (triangle) { return isValidTriangle(triangle); }).length;
    console.log(triangles.length);
    return nTriangles;
}
function main() {
    var triangles = parseFile('input.txt');
    var count = countValidTriangles(triangles);
    console.log('Number of valid triangles: ');
    console.log(count);
    return count;
}
main();
