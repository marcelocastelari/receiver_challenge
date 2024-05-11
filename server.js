const express = require('express');
const pino = require('pino');
const cors = require('cors');
const dbConnect = require('./db/config');
const { PORT } = require('./config');

const server = express();
const logger = pino();

server.use(cors());
server.use(express.json());
require('./src/main/routes')(server);

server.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
    dbConnect();
});