function getMaxFromCharList(charList) {
    var maxChar = '';
    var maxCount = 0;
    for (var char in charList) {
        if (charList[char] > maxCount) {
            maxChar = char;
            maxCount = charList[char];
        }
    }
    return maxChar;
}
var fs = require('fs');
var lines = fs.readFileSync('input.txt', 'utf8').split('\n').filter(function (line) { return line.trim() != ''; });
var columnFrequencies = lines.reduce(function (acc, line) {
    for (var i = 0; i < line.length; i++) {
        var char = line[i];
        acc[i] = acc[i] || {};
        acc[i][char] = acc[i][char] || 0;
        acc[i][char]++;
    }
    return acc;
}, Array.from(lines[0].length));
var message = columnFrequencies.map(getMaxFromCharList).join('');
console.log(message);
