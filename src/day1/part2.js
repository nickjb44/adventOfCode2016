var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Direction;
(function (Direction) {
    Direction[Direction["North"] = 0] = "North";
    Direction[Direction["East"] = 1] = "East";
    Direction[Direction["South"] = 2] = "South";
    Direction[Direction["West"] = 3] = "West";
})(Direction || (Direction = {}));
function parseInput(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var fs, data, instructions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fs = require('fs').promises;
                    return [4 /*yield*/, fs.readFile(filePath, 'utf-8')];
                case 1:
                    data = _a.sent();
                    instructions = data.split(', ').map(function (instruction) { return instruction.trim(); });
                    return [2 /*return*/, instructions];
            }
        });
    });
}
function calculateDistanceFromFirstDupeLocation(instructions) {
    var currentDirection = Direction.North;
    var parsedInstructions = instructions.map(function (instruction) {
        var parsedInstruction = {
            direction: instructionToDirection(instruction, currentDirection),
            distance: parseInt(instruction.slice(1))
        };
        currentDirection = parsedInstruction.direction;
        return parsedInstruction;
    });
    var stepsTravelledEast = 0;
    var stepsTravelledNorth = 0;
    var locationsTravelled = new Set();
    locationsTravelled.add(JSON.stringify({ x: stepsTravelledEast, y: stepsTravelledNorth }));
    for (var _i = 0, parsedInstructions_1 = parsedInstructions; _i < parsedInstructions_1.length; _i++) {
        var instruction = parsedInstructions_1[_i];
        switch (instruction.direction) {
            case Direction.North:
                for (var i = 0; i < instruction.distance; i++) {
                    stepsTravelledNorth += 1;
                    if (addCoordinateAndCheckForDupe({ x: stepsTravelledEast, y: stepsTravelledNorth }, locationsTravelled)) {
                        return Math.abs(stepsTravelledEast) + Math.abs(stepsTravelledNorth);
                    }
                }
                break;
            case Direction.East:
                for (var i = 0; i < instruction.distance; i++) {
                    stepsTravelledEast += 1;
                    if (addCoordinateAndCheckForDupe({ x: stepsTravelledEast, y: stepsTravelledNorth }, locationsTravelled)) {
                        return Math.abs(stepsTravelledEast) + Math.abs(stepsTravelledNorth);
                    }
                }
                break;
            case Direction.South:
                for (var i = 0; i < instruction.distance; i++) {
                    stepsTravelledNorth -= 1;
                    if (addCoordinateAndCheckForDupe({ x: stepsTravelledEast, y: stepsTravelledNorth }, locationsTravelled)) {
                        return Math.abs(stepsTravelledEast) + Math.abs(stepsTravelledNorth);
                    }
                }
                break;
            case Direction.West:
                for (var i = 0; i < instruction.distance; i++) {
                    stepsTravelledEast -= 1;
                    if (addCoordinateAndCheckForDupe({ x: stepsTravelledEast, y: stepsTravelledNorth }, locationsTravelled)) {
                        return Math.abs(stepsTravelledEast) + Math.abs(stepsTravelledNorth);
                    }
                }
                break;
        }
    }
    return -1;
}
function instructionToDirection(instruction, currentDirection) {
    switch (instruction[0]) {
        case 'R':
            switch (currentDirection) {
                case Direction.North:
                    return Direction.East;
                case Direction.East:
                    return Direction.South;
                case Direction.South:
                    return Direction.West;
                case Direction.West:
                    return Direction.North;
                default:
                    console.log(currentDirection + "threw an error");
                    throw new Error('Invalid direction');
            }
        case 'L':
            switch (currentDirection) {
                case Direction.North:
                    return Direction.West;
                case Direction.East:
                    return Direction.North;
                case Direction.South:
                    return Direction.East;
                case Direction.West:
                    return Direction.South;
                default:
                    console.log(currentDirection + "threw an error");
                    throw new Error('Invalid direction');
            }
        default:
            console.log(currentDirection + "threw an error");
            throw new Error('Invalid instruction');
    }
}
function addCoordinateAndCheckForDupe(coordinate, locationsTravelled) {
    var stringCoord = JSON.stringify(coordinate);
    if (locationsTravelled.has(stringCoord)) {
        return true;
    }
    else {
        locationsTravelled.add(stringCoord);
        return false;
    }
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var filePath, instructions, distance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filePath = "./input.txt";
                    return [4 /*yield*/, parseInput(filePath)];
                case 1:
                    instructions = _a.sent();
                    distance = calculateDistanceFromFirstDupeLocation(instructions);
                    console.log("distance from first repeat: " + distance);
                    return [2 /*return*/];
            }
        });
    });
}
main();
