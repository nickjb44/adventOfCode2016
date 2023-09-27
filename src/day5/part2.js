function computeMD5Hash(data) {
    var crypto = require('crypto');
    return crypto.createHash('md5').update(data).digest('hex');
}
var prefix = 'reyedfim';
var suffix = 0;
var password = '_'.repeat(8);
while (password.includes('_')) {
    var hash = computeMD5Hash(prefix + suffix);
    if (hash.startsWith('00000')) {
        var position = parseInt(hash[5]);
        if (position < 8 && password[position] === '_')
            password = password.substr(0, position) + hash[6] + password.substr(position + 1);
        console.log(password);
    }
    suffix++;
}
console.log(computeMD5Hash('abc3231929'));
