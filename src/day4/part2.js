var Room2 = /** @class */ (function () {
    function Room2(name, sectorId, checksum) {
        this.name = name;
        this.sectorId = sectorId;
        this.checksum = checksum;
        this.name = name;
        this.sectorId = sectorId;
        this.checksum = checksum;
    }
    Room2.prototype.shiftName = function () {
        var _this = this;
        return this.name.split('').map(function (char) {
            if (char === '-') {
                return ' ';
            }
            var charCode = char.charCodeAt(0);
            var shiftedCharCode = ((charCode - 'a'.charCodeAt(0) + _this.sectorId) % 26 + 'a'.charCodeAt(0));
            return String.fromCharCode(shiftedCharCode);
        }).join('');
    };
    return Room2;
}());
function parseFileToRooms(filePath) {
    var fs = require('fs');
    var file = fs.readFileSync(filePath, 'utf8');
    var rooms = file.split('\n').filter(function (line) { return line.trim() !== ''; }).map(function (line) {
        var matches = line.match(/([a-z\-]+)-(\d+)\[([a-z]+)\]/);
        if (!matches) {
            throw new Error("line ".concat(line, " did not match regex"));
        }
        return new Room2(matches[1], parseInt(matches[2]), matches[3]);
    });
    return rooms;
}
function main() {
    var rooms = parseFileToRooms('input.txt');
    var realRoomNames = rooms.map(function (room) {
        var shiftedName = room.shiftName();
        return {
            name: shiftedName,
            sectorId: room.sectorId
        };
    });
    var northPoleRoom = realRoomNames.find(function (room) { return room.name.includes('north'); });
    console.log(northPoleRoom);
}
console.log("running...");
main();
