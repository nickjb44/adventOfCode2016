// defined in a different file but not imported, supressing linter error
class Triangle4 {
    side1: number;
    side2: number;
    side3: number;

    constructor(side1: number, side2: number, side3: number) {
        this.side1 = side1;
        this.side2 = side2;
        this.side3 = side3;
    }

    anyTwoSidesGreaterThanThird(): boolean {
        if (! this.isComplete()) {
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
    }

    isComplete(): boolean {
        return this.side1  !== null &&  this.side1 !== undefined &&
            this.side2 !== null && this.side2 !== undefined &&
            this.side3 !== null && this.side3 !== undefined;;
    }
}


function isValidTriangle(triangle: Triangle4): boolean {
    return triangle.anyTwoSidesGreaterThanThird();
}

function parseFile(filePath: string) {
    const fs = require('fs');
    const file = fs.readFileSync(filePath, 'utf8');
    const lines: string[] = file.split('\n');
    const sides= lines.map(line => {
        return line.trim().split(/\s+/).map(side => parseInt(side));
    });

    const triangles: Triangle4[] = sides.reduce((acc: Triangle4[], side: number[], index) => {
        if (side.length !== 3) {
            console.log(side);
            side.forEach(num => console.log(num));
            return acc
        }
        if (index % 3 === 0) {
            const secondLine = sides[index + 1];
            const thirdLine = sides[index + 2];
            acc.push(new Triangle4(side[0], secondLine[0], thirdLine[0]));
            acc.push(new Triangle4(side[1], secondLine[1], thirdLine[1]));
            acc.push(new Triangle4(side[2], secondLine[2], thirdLine[2]));
        }
        return acc
    }, []);

    return triangles;
}

function countValidTriangles(triangles: Triangle4[]): number {
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
