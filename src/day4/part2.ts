class Room2 {

    constructor(public name: string, public sectorId: number, public checksum: string) {
        this.name = name;
        this.sectorId = sectorId;
        this.checksum = checksum;
    }

    shiftName() {
        return this.name.split('').map((char: string) => {
            if (char === '-') {
                return ' ';
            }
            const charCode = char.charCodeAt(0);
            const shiftedCharCode = (
                (charCode - 'a'.charCodeAt(0) + this.sectorId) % 26 + 'a'.charCodeAt(0)
            )
            return String.fromCharCode(shiftedCharCode);
            }).join('');
    }
}

function parseFileToRooms(filePath: string) {
    const fs = require('fs');
    const file: string = fs.readFileSync(filePath, 'utf8');
    const rooms = file.split('\n').filter(line => line.trim() !== '').map((line: string) => {
        const matches = line.match(/([a-z\-]+)-(\d+)\[([a-z]+)\]/);
        if (!matches) {
            throw new Error(`line ${line} did not match regex`);
        }
        return new Room2(matches[1], parseInt(matches[2]), matches[3]);
    })
    return rooms;
}


function main() {
    const rooms = parseFileToRooms('input.txt');
    const realRoomNames = rooms.map(room => {
        const shiftedName = room.shiftName();
        return {
            name: shiftedName,
            sectorId: room.sectorId
        }
    })
    const northPoleRoom = realRoomNames.find(room => room.name.includes('north'));
    console.log(northPoleRoom);
}

console.log("running...");
main()
