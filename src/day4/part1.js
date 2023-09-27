var Room1 = /** @class */ (function () {
    function Room1(name, sectorId, checksum) {
        this.name = name;
        this.sectorId = sectorId;
        this.checksum = checksum;
        this.name = name;
        this.sectorId = sectorId;
        this.checksum = checksum;
    }
    Room1.prototype.isValid = function () {
        var topFiveMostFreqChars = this.getTopFiveMostFreqChars();
        console.log(topFiveMostFreqChars.join('') + " vs " + this.checksum);
        return topFiveMostFreqChars.join('') === this.checksum;
    };
    Room1.prototype.getTopFiveMostFreqChars = function () {
        var charCounts = this.getCharCounts();
        var charCountsArray = Object.keys(charCounts).map(function (char) {
            return {
                char: char,
                count: charCounts[char]
            };
        }).sort(function (a, b) {
            if (a.count === b.count) {
                return a.char > b.char ? 1 : -1;
            }
            return b.count - a.count;
        });
        return charCountsArray.slice(0, 5).map(function (charCount) { return charCount.char; });
    };
    Room1.prototype.getCharCounts = function () {
        return this.name.split('').filter(function (char) { return char !== '-'; })
            .reduce(function (charCounts, char) {
            if (charCounts[char]) {
                charCounts[char]++;
            }
            else {
                charCounts[char] = 1;
            }
            return charCounts;
        }, {});
    };
    return Room1;
}());
function parseFileToRooms(filePath) {
    var fs = require('fs');
    var file = fs.readFileSync(filePath, 'utf8');
    var rooms = file.split('\n').filter(function (line) { return line.trim() !== ''; }).map(function (line) {
        var matches = line.match(/([a-z\-]+)-(\d+)\[([a-z]+)\]/);
        if (!matches) {
            throw new Error("line ".concat(line, " did not match regex"));
        }
        return new Room1(matches[1], parseInt(matches[2]), matches[3]);
    });
    return rooms;
}
function sumSectorIdsOfValidRooms(rooms) {
    return rooms.filter(function (room) { return room.isValid(); }).reduce(function (sum, room) { return sum + room.sectorId; }, 0);
}
function main() {
    var rooms = parseFileToRooms('input.txt');
    console.log("the sum of the sector IDs of the real rooms is");
    console.log(sumSectorIdsOfValidRooms(rooms));
}
console.log("running...");
main();
