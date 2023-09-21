interface coordinate {
    x: number,
    y: number
}

enum Direction {
    Up = "U",
    Down = "D",
    Left = "L",
    Right = "R"
}

type NullableString = string | null

class NumberPad {
    private grid: NullableString[][]
    private currentCoordinate: coordinate

    constructor(grid: NullableString[][], startingCoordinate: coordinate) {
        this.grid = grid
        this.currentCoordinate = startingCoordinate
    }

    setCoordinate(coordinate: coordinate) {
        this.currentCoordinate = coordinate
    }

    getCoordinate(): coordinate {
        return this.currentCoordinate
    }

    setGridToPhonePad() {
        this.grid = [
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9']
        ]
    }

    setGridToDiamondPad() {
        this.grid = [
            [null, null, '1', null, null],
            [null, '2', '3', '4', null],
            ['5', '6', '7', '8', '9'],
            [null, 'A', 'B', 'C', null],
            [null, null, 'D', null, null]
        ]
    }

    moveOnGrid(direction: Direction) {
        switch (direction) {
            case Direction.Up:
                if (this.currentCoordinate.y > 0 && this.grid[this.currentCoordinate.y - 1][this.currentCoordinate.x] !== null) {
                    this.currentCoordinate.y--
                }
                break
            case Direction.Down:
                if (this.currentCoordinate.y < this.grid.length - 1 && this.grid[this.currentCoordinate.y + 1][this.currentCoordinate.x] !== null) {
                    this.currentCoordinate.y++
                }
                break
            case Direction.Left:
                if (this.currentCoordinate.x > 0 && this.grid[this.currentCoordinate.y][this.currentCoordinate.x - 1] !== null) {
                    this.currentCoordinate.x--
                }
                break
            case Direction.Right:
                if (this.currentCoordinate.x < this.grid[0].length - 1 && this.grid[this.currentCoordinate.y][this.currentCoordinate.x + 1] !== null) {
                    this.currentCoordinate.x++
                }
                break
        }
    }

    getNumberAtCoordinate(): NullableString {
        return this.grid[this.currentCoordinate.y][this.currentCoordinate.x]
    }
}

async function parseInput(filePath: string): Promise<string[][]> {
    const fs = require('fs').promises;
    return fs.readFile(filePath, 'utf-8')
        .then((data: string) => {
            // Split the data into an array of instructions 
            // where each instruction is an array of characters
            const instructions: string[][] = data.split('\n').map((line: string) => line.split(''))
            // Remove the last empty line (not sure what causes this, maybe a new line at end of file?)
            instructions.pop()
            return instructions
        })
}

function calculateBathroomCode(instructions: string[][]): string {
    const numberPad = new NumberPad([[]], { x: 0, y: 2 })
    numberPad.setGridToDiamondPad()

    const code: string[] = []

    instructions.forEach((instruction: string[]) => {
        instruction.forEach((direction: string) => {
            numberPad.moveOnGrid(direction as Direction)
        })
        code.push(numberPad.getNumberAtCoordinate())
    })

    return code.join('')
}

function main() {
    const filePath = './input.txt'

    parseInput(filePath)
        .then((instructions: string[][]) => {
            const code = calculateBathroomCode(instructions)
            console.log(code)
        })
}
main()

