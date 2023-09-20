
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

async function parseInput(filePath: string): Promise<string[]> {
    const fs = require('fs').promises;
    const data = await fs.readFile(filePath, 'utf-8');
    const instructions = data.split(', ').map((instruction:string) => instruction.trim());
    return instructions;
}

function calculateMinimumDistanceFromInstructions(instructions: string[]): number {
    let currentDirection = Direction.North

    const parsedInstructions: ParsedInstruction[]= instructions.map(instruction => {
        const parsedInstruction  = {
            direction: instructionToDirection(instruction, currentDirection),
            distance: parseInt(instruction.slice(1))
        }
        currentDirection = parsedInstruction.direction
        return parsedInstruction
    })

    const stepsEast = parsedInstructions.reduce((acc, instruction) => {
        if (instruction.direction === Direction.East) {
            return acc + instruction.distance
        } else if (instruction.direction === Direction.West) {
            return acc - instruction.distance
        } else {
            return acc
        }
    }, 0)

    const stepsNorth = parsedInstructions.reduce((acc, instruction) => {
        if (instruction.direction === Direction.North) {
            return acc + instruction.distance
        } else if (instruction.direction === Direction.South) {
            return acc - instruction.distance
        } else {
            return acc
        }
    }, 0)

    return Math.abs(stepsEast) + Math.abs(stepsNorth)
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


async function main() {
    const filePath = "./input.txt"
    const instructions = await parseInput(filePath)
    const distance = calculateMinimumDistanceFromInstructions(instructions)
    console.log("distance: " + distance)
}

main()
