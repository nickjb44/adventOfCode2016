function computeMD5Hash(data) {
    const crypto = require('crypto');
    return crypto.createHash('md5').update(data).digest('hex');
}

const prefix = 'reyedfim';
let suffix = 0;
let password = '';
while (password.length < 8) {
    const hash = computeMD5Hash(prefix + suffix);
    if (hash.startsWith('00000')) {
        password += hash[5];
        console.log(password);
    }
    suffix++;
}


console.log(computeMD5Hash('abc3231929'))
