const pino = require('pino');
const { getReceivers, getReceiverById, saveReceiver, updateReceiver, deleteReceiver } = require('../repositories/receiverRepository')
const { isDataValid } = require('../utils/validatorUtil.js');
const { addUuid, validateUuid } = require('../utils/uuidUtil.js');
const { validateUpdate } = require('../utils/updateUtil.js');
const { queryByField } = require('../utils/queryUtil.js');
const { paginate } = require('../utils/paginationUtil.js');

const logger = pino();

module.exports = {

    async listReceivers(req) {
        const { page, pageSize } = req.query;
        const { skip, size } = paginate(page, pageSize);

        const field = req.query;
        const query = queryByField(field);

        return getReceivers(query, skip, size);
    },

    async createReceiver(receiverData) {
        if(!isDataValid(receiverData)) {
            logger.error(`[receiverService][createReceiver] Receiver data is not valid`);
            return;
        }
        const dataWithUuid = addUuid(receiverData);
        await saveReceiver(dataWithUuid);
    },

    async editReceiver(req) {
        const receiverData = req.body;
        const uuid = req.params.id;
        if(!isDataValid(receiverData) || !validateUuid(uuid)) {
            logger.error(`[receiverService][editReceiver] Receiver data is not valid`);
            throw new Error(`Invalid request params`);
        }

        const existingReceiver = await getReceiverById(uuid);
        if(!existingReceiver) {
            logger.error(`[receiverService][editReceiver] Receiver not found`);
            throw new Error(`Receiver not found`);
        }

        const isUpdateValid = await validateUpdate(uuid, receiverData);
        if (!isUpdateValid) {
            logger.error(`[receiverService][editReceiver] Update not allowed based on status`);
            throw new Error(`Only email field can be updated based on status`);
        }

        await updateReceiver(uuid, receiverData)
    },

    async deleteReceiver(receiverId) {
        if(!validateUuid(receiverId)){
            logger.error(`[receiverService][deleteReceiver] Receiver data is not valid`);
            throw new Error(`Invalid request params`);
        }
        await deleteReceiver(receiverId);
    },

    async bulkDeleteReceivers(receiversId) {
        for(let receiverId of receiversId) {
            if(!validateUuid(receiverId)) {
                logger.error(`[receiverService][bulkDeleteReceivers] Receiver data is not valid`);
                throw new Error(`Invalid request params`);
            }
            await deleteReceiver(receiverId);
        }
    },

}