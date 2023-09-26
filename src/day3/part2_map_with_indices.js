// defined in a different file but not imported, supressing linter error
var Triangle3 = /** @class */ (function () {
    function Triangle3(side1, side2, side3) {
        this.side1 = side1;
        this.side2 = side2;
        this.side3 = side3;
    }
    Triangle3.prototype.anyTwoSidesGreaterThanThird = function () {
        // cannot be null because of isComplete check
        // suppressing linter error
        // @ts-ignore
        return (this.side1 + this.side2) > this.side3 &&
            // @ts-ignore
            (this.side2 + this.side3) > this.side1 &&
            // @ts-ignore
            (this.side3 + this.side1) > this.side2;
    };
    return Triangle3;
}());
function matrixToTriangles(matrix) {
    var triangles = [];
    for (var i = 0; i < matrix.length; i += 3) {
        // get the 1st, second and third column for each row
        var side1 = matrix[i][0];
        var side2 = matrix[i][1];
        var side3 = matrix[i][2];
        triangles.push(new Triangle3(side1, side2, side3));
    }
    return triangles;
}
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
    var triangles = sides.map(function (vals, index) {
        if (sides.length % 3 !== 0) {
            return;
        }
        if (index % 3 === 0) {
            var lineTriplet = [vals, sides[index + 1], sides[index + 2]];
            var triangles_1 = matrixToTriangles(lineTriplet);
            return triangles_1;
        }
    }).flat().filter(function (triangle) { return triangle !== undefined; });
    // @ts-ignore
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
