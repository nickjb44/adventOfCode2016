// defined in a different file but not imported, supressing linter error
class Triangle3 {
    side1: number | null;
    side2: number | null;
    side3: number | null;

    constructor(side1: number | null, side2: number | null, side3: number | null) {
        this.side1 = side1;
        this.side2 = side2;
        this.side3 = side3;
    }

    anyTwoSidesGreaterThanThird(): boolean {
        // cannot be null because of isComplete check
        // suppressing linter error
        // @ts-ignore
        return (this.side1 + this.side2) > this.side3 &&
            // @ts-ignore
            (this.side2 + this.side3) > this.side1 &&
            // @ts-ignore
            (this.side3 + this.side1) > this.side2;
    }
}

function matrixToTriangles(matrix: number[][]): Triangle3[] {
    const triangles: Triangle3[] = [];
    for (let i = 0; i < matrix.length; i += 3) {
        // get the 1st, second and third column for each row
        const side1 = matrix[i][0];
        const side2 = matrix[i][1];
        const side3 = matrix[i][2];
        triangles.push(new Triangle3(side1, side2, side3));
    }
    return triangles;
}



function isValidTriangle(triangle: Triangle3): boolean {
    return triangle.anyTwoSidesGreaterThanThird();
}

function parseFile(filePath: string): Triangle3[] {
    const fs = require('fs');
    const file = fs.readFileSync(filePath, 'utf8');
    const lines: string[] = file.split('\n');
    const sides = lines.map(line => {
        return line.trim().split(/\s+/).map(side => parseInt(side));
    })
    const triangles = sides.map((vals, index: number) => {
        if (sides.length % 3 !== 0) {
            return
        }
        if (index % 3 === 0) {
            const lineTriplet = [vals, sides[index + 1], sides[index + 2]];
            const triangles = matrixToTriangles(lineTriplet);
            return triangles;
            }
    }).flat().filter(triangle => triangle !== undefined)
    // @ts-ignore
    return triangles;
}

function countValidTriangles(triangles: Triangle3[]): number {
    return triangles.filter(triangle => isValidTriangle(triangle)).length;
}

function main() {
    const triangles = parseFile('input.txt');
    const count = countValidTriangles(triangles);
    console.log('Number of valid triangles: ');
    console.log(count);
    return count;
}

main()
