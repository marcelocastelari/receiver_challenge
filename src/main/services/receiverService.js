const pino = require('pino');
const { getReceivers, saveReceiver, updateReceiver } = require('../repositories/receiverRepository')
const { isDataValid } = require('../utils/validatorUtil.js');
const { addUuid } = require('../utils/uuidUtils.js');

const logger = pino();

module.exports = {

    async listReceivers() {
        return getReceivers();
    },

    async createReceiver(receiverData) {
        if(!isDataValid(receiverData)) {
            logger.error(`[receiverService][createReceiver] Receiver data is not valid`);
            return;
        }
        const dataWithUuid = addUuid(receiverData);
        await saveReceiver(dataWithUuid);
    },

    async editReceiver(receiverData) {
        if(!isDataValid(receiverData)) {
            logger.error(`[receiverService][editReceiver] Receiver data is not valid`);
            return;
        }
        await updateReceiver(receiverData);
    },

    async deleteReceiver(receiverId) {},

    async bulkDeleteReceivers(receiverIds) {},

}