const crypto = require('crypto');

const generateHash = password => {
    return crypto.createHash('SHA1')
        .update(password)
        .digest('hex');

};
exports.generateHash = generateHash;