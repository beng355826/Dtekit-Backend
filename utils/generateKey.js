const crypto = require('crypto');

function generateSecretKey(length = 32) {
    return crypto.randomBytes(length).toString('base64');
}

module.exports = generateSecretKey