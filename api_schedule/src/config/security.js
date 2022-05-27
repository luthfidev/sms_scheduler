const env = require('../env');
const config = {
    JWT: {
        key : env.jwt.JWT_KEY,
        algorith : 'HS256'
    },
}

module.exports = config;
