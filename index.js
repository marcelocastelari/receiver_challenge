const pino = require('pino');
const server = require('./src/main/server')
const { PORT } = require('./config');
const dbConnect = require('./db/config');
const { checkAndExecute } = require('./src/main/utils/createInitialFilesUtil')
const receivers = require('./db/data.json')

const logger = pino();

server.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
    dbConnect();
    checkAndExecute(receivers);
});

module.exports = server;