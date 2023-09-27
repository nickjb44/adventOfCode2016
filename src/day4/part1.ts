class Room1 {

    constructor(public name: string, public sectorId: number, public checksum: string) {
        this.name = name;
        this.sectorId = sectorId;
        this.checksum = checksum;
    }

    public isValid(): boolean {
        const topFiveMostFreqChars = this.getTopFiveMostFreqChars();
        return topFiveMostFreqChars.join('') === this.checksum;
    }

    public getTopFiveMostFreqChars(): string[] {
        const charCounts = this.getCharCounts();
        const charCountsArray = Object.keys(charCounts).map((char) => {
            return {
                char,
                count: charCounts[char]
            };
        }).sort((a, b) => {
            if (a.count === b.count) {
                return a.char > b.char ? 1 : -1;
            }
            return b.count - a.count;
        });
        return charCountsArray.slice(0, 5).map((charCount) => charCount.char);
    }

    public getCharCounts() {
        return this.name.split('').filter((char) => char !== '-')
            .reduce((charCounts: Record<string, number>, char: string) => {
            if (charCounts[char]) {
                charCounts[char]++;
            } else {
                charCounts[char] = 1;
            }
            return charCounts;
        }, {});
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
        return new Room1(matches[1], parseInt(matches[2]), matches[3]);
    })
    return rooms;
}

function sumSectorIdsOfValidRooms(rooms: Room1[]) {
    return rooms.filter((room) => room.isValid()).reduce((sum, room) => sum + room.sectorId, 0);
}

function main() {
    const rooms = parseFileToRooms('input.txt');
    console.log("the sum of the sector IDs of the real rooms is");
    console.log(sumSectorIdsOfValidRooms(rooms));
}

console.log("running...");
main()
