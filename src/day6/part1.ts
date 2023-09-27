function getMaxFromCharList(charList: Record<string, number>): string {
    let maxChar = '';
    let maxCount = 0;
    for (const char in charList) {
        if (charList[char] > maxCount) {
            maxChar = char;
            maxCount = charList[char];
        }
    }
    return maxChar;
}

const fs = require('fs');
const lines = fs.readFileSync('input.txt', 'utf8').split('\n').filter((line: string) => line.trim() != '');
const columnFrequencies = lines.reduce((acc: Record<string, number>[], line:string) => {
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        acc[i] = acc[i] || {};
        acc[i][char] = acc[i][char] || 0;
        acc[i][char]++;
    }
    return acc;
    }, Array.from<Record<string, number>>(lines[0].length)); 

const message = columnFrequencies.map(getMaxFromCharList).join('');
console.log(message);





