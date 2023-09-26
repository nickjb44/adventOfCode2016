// defined in a different file but not imported, supressing linter error
class Triangle2 {
    side1: number | null;
    side2: number | null;
    side3: number | null;

    constructor(side1: number | null, side2: number | null, side3: number | null) {
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

    addSide(side: number): void {
        if (this.side1 === null) {
            this.side1 = side;
        } else if (this.side2 === null) {
            this.side2 = side;
        } else if (this.side3 === null) {
            this.side3 = side;
        } else {
            throw new Error('Triangle is already complete');
        }
    }
}


function isValidTriangle(triangle: Triangle2): boolean {
    return triangle.anyTwoSidesGreaterThanThird();
}

function parseFile(filePath: string) {
    const fs = require('fs');
    const file = fs.readFileSync(filePath, 'utf8');
    const lines: string[] = file.split('\n');
    const sides= lines.map(line => {
        return line.trim().split(/\s+/).map(side => parseInt(side));
    });

    // initializing three triangles to construct as we go
    let triangle1 = new Triangle2(null, null, null);
    let triangle2 = new Triangle2(null, null, null);
    let triangle3 = new Triangle2(null, null, null);

    const triangles: Triangle2[] = sides.reduce((acc: Triangle2[], side: number[]) => {
        if (side.length !== 3) {
            console.log(side);
            side.forEach(num => console.log(num));
            return acc
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
        return acc
    }, []);

    return triangles;
}

function countValidTriangles(triangles: Triangle2[]): number {
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
