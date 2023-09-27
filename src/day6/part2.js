function getMinFromCharList(charList) {
    var minChar = '';
    var minCount = Infinity;
    for (var char in charList) {
        if (charList[char] < minCount) {
            minChar = char;
            minCount = charList[char];
        }
    }
    return minChar;
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
var message = columnFrequencies.map(getMinFromCharList).join('');
console.log(message);
