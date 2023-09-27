
function computeMD5Hash(data) {
    const crypto = require('crypto');
    return crypto.createHash('md5').update(data).digest('hex');
}

const prefix = 'reyedfim';
let suffix = 0;
let password = '_'.repeat(8);
while (password.includes('_')) {
    const hash = computeMD5Hash(prefix + suffix);
    if (hash.startsWith('00000')) {
        const position = parseInt(hash[5]);
        if (position < 8 && password[position] === '_')
            password = password.substr(0, position) + hash[6] + password.substr(position + 1);
        console.log(password);
    }
    suffix++;
}
