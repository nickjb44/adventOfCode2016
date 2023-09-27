function computeMD5Hash(data) {
    var crypto = require('crypto');
    return crypto.createHash('md5').update(data).digest('hex');
}
var prefix = 'reyedfim';
var suffix = 0;
var password = '';
while (password.length < 8) {
    var hash = computeMD5Hash(prefix + suffix);
    if (hash.startsWith('00000')) {
        password += hash[5];
        console.log(password);
    }
    suffix++;
}
console.log(computeMD5Hash('abc3231929'));
