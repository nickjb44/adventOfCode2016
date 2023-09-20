enum Direction {
    North,
    East,
    South,
    West
}

interface ParsedInstruction {
    direction: Direction
    distance: number
}

interface Coordinate {
    x: number
    y: number
}

async function parseInput(filePath: string): Promise<string[]> {
    const fs = require('fs').promises;
    const data = await fs.readFile(filePath, 'utf-8');
    const instructions = data.split(', ').map((instruction:string) => instruction.trim());
    return instructions;
}

function calculateDistanceFromFirstDupeLocation(instructions: string[]): number {
    let currentDirection = Direction.North

    const parsedInstructions: ParsedInstruction[]= instructions.map(instruction => {
        const parsedInstruction  = {
            direction: instructionToDirection(instruction, currentDirection),
            distance: parseInt(instruction.slice(1))
        }
        currentDirection = parsedInstruction.direction
        return parsedInstruction
    })

    let stepsTravelledEast = 0
    let stepsTravelledNorth = 0
    let locationsTravelled = new Set<String>()
    locationsTravelled.add(JSON.stringify({x: stepsTravelledEast, y: stepsTravelledNorth}))

    for (const instruction of parsedInstructions) {
        switch (instruction.direction) {
            case Direction.North:
                for (let i = 0; i < instruction.distance; i++) {
                    stepsTravelledNorth += 1
                    if (addCoordinateAndCheckForDupe({x: stepsTravelledEast, y: stepsTravelledNorth}, locationsTravelled)) {
                        return Math.abs(stepsTravelledEast) + Math.abs(stepsTravelledNorth)
                    }
                }
                break
            case Direction.East:
                for (let i = 0; i < instruction.distance; i++) {
                    stepsTravelledEast += 1
                    if (addCoordinateAndCheckForDupe({x: stepsTravelledEast, y: stepsTravelledNorth}, locationsTravelled)) {
                        return Math.abs(stepsTravelledEast) + Math.abs(stepsTravelledNorth)
                    }
                }
                break
            case Direction.South:
                for (let i = 0; i < instruction.distance; i++) {
                    stepsTravelledNorth -= 1
                    if (addCoordinateAndCheckForDupe({x: stepsTravelledEast, y: stepsTravelledNorth}, locationsTravelled)) {
                        return Math.abs(stepsTravelledEast) + Math.abs(stepsTravelledNorth)
                    }
                }
                break
            case Direction.West:
                for (let i = 0; i < instruction.distance; i++) {
                    stepsTravelledEast -= 1
                    if (addCoordinateAndCheckForDupe({x: stepsTravelledEast, y: stepsTravelledNorth}, locationsTravelled)) {
                        return Math.abs(stepsTravelledEast) + Math.abs(stepsTravelledNorth)
                    }
                }
                break
        }
    }
    return -1
}

function instructionToDirection(instruction: string, currentDirection: Direction): Direction {
    switch (instruction[0]) {
        case 'R':
            switch (currentDirection) {
                case Direction.North:
                    return Direction.East
                case Direction.East:
                    return Direction.South
                case Direction.South:
                    return Direction.West
                case Direction.West:
                    return Direction.North
                default:
                    console.log(currentDirection + "threw an error")
                    throw new Error('Invalid direction')
        }
        case 'L':
            switch (currentDirection) {
                case Direction.North:
                    return Direction.West
                case Direction.East:
                    return Direction.North
                case Direction.South:
                    return Direction.East
                case Direction.West:
                    return Direction.South
                default:
                    console.log(currentDirection + "threw an error")
                    throw new Error('Invalid direction')
        }
        default:
            console.log(currentDirection + "threw an error")
            throw new Error('Invalid instruction')
    }
}

function addCoordinateAndCheckForDupe(coordinate: Coordinate, locationsTravelled: Set<String>): boolean {
    const stringCoord = JSON.stringify(coordinate)
    if (locationsTravelled.has(stringCoord)) {
        return true
    } else {
        locationsTravelled.add(stringCoord)
        return false
    }
}



async function main() {
    const filePath = "./input.txt"
    const instructions = await parseInput(filePath)
    const distance = calculateDistanceFromFirstDupeLocation(instructions)
    console.log("distance from first repeat: " + distance)
}

main()
