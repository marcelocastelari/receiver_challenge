const dotenv = require('dotenv');
const path = require('path');

const envPath = path.join(__dirname, './.env');

dotenv.config({
    path: envPath,
});

module.exports = {
    PORT: process.env.PORT || 8000,
    MONGODB: {
        USERNAME: process.env.MONGO_USERNAME || null,
        PASSWORD: process.env.MONGO_PASSWORD || null,
        HOSTNAME: process.env.MONGO_HOSTNAME || 'localhost',
        PORT: process.env.MONGO_PORT || 27017,
        DB: process.env.MONGO_DB || 'transfeera',
    }
}