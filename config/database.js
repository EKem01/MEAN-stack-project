const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
    uri : 'mongodb://127.0.0.1:27017/meanstack_db',
    secret: 'crypto',
    db: 'meanstack_db'
}