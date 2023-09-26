class Triangle {
    side1: number;
    side2: number;
    side3: number;

    constructor(side1: number, side2: number, side3: number) {
        this.side1 = side1;
        this.side2 = side2;
        this.side3 = side3;
    }

    anyTwoSidesGreaterThanThird(): boolean {
        return (this.side1 + this.side2) > this.side3 &&
            (this.side2 + this.side3) > this.side1 &&
            (this.side3 + this.side1) > this.side2;
    }
}


function isValidTriangle(triangle: Triangle): boolean {
    return triangle.anyTwoSidesGreaterThanThird();
}

function parseFile(filePath: string) {
    const fs = require('fs');
    const file = fs.readFileSync(filePath, 'utf8');
    const lines: string[] = file.split('\n');
    const triangles = lines.map(line => {
        // split on any number of spaces
        // ignoring initial whitespace
        const sides = line.trim().split(/\s+/).map(side => parseInt(side));
        return new Triangle(sides[0], sides[1], sides[2]);
    });
    return triangles;
}

function countValidTriangles(triangles: Triangle[]): number {
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
