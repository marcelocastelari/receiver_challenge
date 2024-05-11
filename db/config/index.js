const mongoose = require('mongoose');
const pino = require('pino');
const logger = pino();

const { MONGODB: { USERNAME, PASSWORD, HOSTNAME, PORT, DB } } = require('../../config');
const mongo_connection_string = USERNAME 
? `mongodb://${USERNAME}:${PASSWORD}@${HOSTNAME}:${PORT}/${DB}`
: `mongodb://${HOSTNAME}:${PORT}/${DB}`;
const mongo_config = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

logger.info(`Connecting to ${mongo_connection_string}`);

const dbConnect = () => {
    logger.info('Connecting to MongoDB...');
    mongoose.connect(mongo_connection_string, mongo_config)
    .then(() => {
        logger.info('Connected to MongoDB');
    })
    .catch(err => { 
        logger.error('Error connecting to MongoDB', err.message);
    })
}

module.exports = dbConnect;