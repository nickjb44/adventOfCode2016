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
    Direction["Up"] = "U";
    Direction["Down"] = "D";
    Direction["Left"] = "L";
    Direction["Right"] = "R";
})(Direction || (Direction = {}));
var NumberPad = /** @class */ (function () {
    function NumberPad(grid, startingCoordinate) {
        this.grid = grid;
        this.currentCoordinate = startingCoordinate;
    }
    NumberPad.prototype.setCoordinate = function (coordinate) {
        this.currentCoordinate = coordinate;
    };
    NumberPad.prototype.getCoordinate = function () {
        return this.currentCoordinate;
    };
    NumberPad.prototype.setGridToPhonePad = function () {
        this.grid = [
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9']
        ];
    };
    NumberPad.prototype.moveOnGrid = function (direction) {
        switch (direction) {
            case Direction.Up:
                if (this.currentCoordinate.y > 0) {
                    this.currentCoordinate.y--;
                }
                break;
            case Direction.Down:
                if (this.currentCoordinate.y < this.grid.length - 1) {
                    this.currentCoordinate.y++;
                }
                break;
            case Direction.Left:
                if (this.currentCoordinate.x > 0) {
                    this.currentCoordinate.x--;
                }
                break;
            case Direction.Right:
                if (this.currentCoordinate.x < this.grid[0].length - 1) {
                    this.currentCoordinate.x++;
                }
                break;
        }
    };
    NumberPad.prototype.getNumberAtCoordinate = function () {
        return this.grid[this.currentCoordinate.y][this.currentCoordinate.x];
    };
    return NumberPad;
}());
function parseInput(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var fs;
        return __generator(this, function (_a) {
            fs = require('fs').promises;
            return [2 /*return*/, fs.readFile(filePath, 'utf-8')
                    .then(function (data) {
                    // Split the data into an array of instructions 
                    // where each instruction is an array of characters
                    var instructions = data.split('\n').map(function (line) { return line.split(''); });
                    return instructions;
                })];
        });
    });
}
function calculateBathroomCode(instructions) {
    var numberPad = new NumberPad([[]], { x: 1, y: 1 });
    numberPad.setGridToPhonePad();
    var code = [];
    instructions.forEach(function (instruction) {
        instruction.forEach(function (direction) {
            numberPad.moveOnGrid(direction);
        });
        code.push(numberPad.getNumberAtCoordinate());
    });
    return code.join('');
}
function main() {
    var filePath = './test.txt';
    parseInput(filePath)
        .then(function (instructions) {
        var code = calculateBathroomCode(instructions);
        console.log(code);
    });
}
main();
