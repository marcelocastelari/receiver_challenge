const pino = require('pino');
const Receiver = require('../models/receiverModel');

const logger = pino();

const setPixKeyAsIndex = () => {
    Receiver.createIndexes({ pix_key: 1 }, { unique: true })
}

const getReceivers = async (query, skip, limit) => {
    try {
        return Receiver.find(query)
        .skip(skip)
        .limit(limit);
    } catch (error) {
        logger.info(`[receiverRepository][getReceivers] ${error.message}`);
        throw new Error(`${error.codeName} - ${error.keyValue}`);
    }
};

const saveReceiver = async (receiverData) => {
    try {
        return Receiver.updateOne(
            { uuid: receiverData.uuid },
            { $set: receiverData },
            { upsert: true } 
        );
    } catch (error) {
        logger.info(`[receiverRepository][saveReceiver] ${error.message}`);
        throw new Error(`${error.codeName} - ${error.keyValue}`);
    }
};

const getReceiverById = async (uuid) => {
    try {
        return Receiver.findOne({
            uuid: uuid
        });
    } catch (error) {
        logger.info(`[receiverRepository][getReceiverById] ${error.message}`);
        throw new Error(`${error.codeName} - ${error.keyValue}`);
    }
};

const updateReceiver = async (uuid, receiverData) => {
    try {
        return Receiver.updateOne(
            { uuid: uuid },
            { $set: receiverData },
        );
    } catch (error) {
        logger.info(`[receiverRepository][updateReceiver] ${error.message}`);
        throw new Error(`${error.codeName} - ${error.keyValue}`);
    }
};

const deleteReceiver = async (receiverId) => {
    try {
        return Receiver.deleteOne(
            { uuid: receiverId }
        );
    } catch (error) {
        logger.info(`[receiverRepository][deleteReceiver] ${error.message}`);
        throw new Error(`${error.codeName} - ${error.keyValue}`);
    }
};

const bulkDeleteReceivers = async (receiversId) => {
    try {
        return Receiver.deleteMany(
            { uuid: { $in: receiversId } 
        });
    } catch (error) {
        throw new Error(`${error.codeName} - ${error.keyValue}`);
    }
};
    

module.exports = { saveReceiver, getReceivers, getReceiverById, updateReceiver, deleteReceiver, bulkDeleteReceivers, setPixKeyAsIndex };