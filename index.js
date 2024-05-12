const pino = require('pino');
const server = require('./src/main/server')
const { PORT } = require('./config');
const dbConnect = require('./db/config');

const logger = pino();

server.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
    dbConnect();
});

module.exports = server;