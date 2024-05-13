const fs = require('fs').promises; 
const pino = require('pino');
const { createReceiver } = require('../services/receiverService')

const flagPath = './import-executed.flag';

const logger = pino();


const checkAndExecute = async (receivers) => {
  try {
    await fs.access(flagPath);
    logger.info(`[checkAndExecute] - script already executed.`);
    return;
  } catch (err) {
    if (err.code === 'ENOENT') {
      logger.info(`[checkAndExecute] - flag file not found. Creating it.`);
      await fs.writeFile(flagPath, ''); 
    } else {
      throw err;
    }
  }

  for(const receiver of receivers) {
    try {
      await createReceiver(receiver);
    } catch (error) {
      logger.error(`[checkAndExecute] - Error creating receiver: ${error.message}`);
    }
  }

  await fs.writeFile(flagPath, 'true');
  logger.info(`[checkAndExecute] - script executed successfully.`);
};

module.exports = { checkAndExecute };
