const Receiver = require('../models/receiverModel');

const getReceivers = async () => {
    return Receiver.find({});
};

const saveReceiver = async (receiverData) => {

    return Receiver.updateOne(
        { uuid: receiverData.uuid },
        { $set: receiverData },
        { upsert: true } 
    );
}

const getReceiverById = async (uuid) => {
    return Receiver.findOne({
        uuid: uuid
    });
}

const getReceiversByParam = async(param) => {
    const parameter = param.field
    console.log(parameter);
    return Receiver.find({ parameter });
}

const updateReceiver = async (uuid, receiverData) => {
    return Receiver.updateOne(
        { uuid: uuid },
        { $set: receiverData },
    );
}

const deleteReceiver = async (receiverId) => {
    return Receiver.deleteOne(
        { uuid: receiverId }
    );
}

const bulkDeleteReceivers = async (receiversId) => {
    return Receiver.deleteMany({ uuid: { $in: receiversId } });
}
    

module.exports = { saveReceiver, getReceivers, getReceiversByParam, getReceiverById, updateReceiver, deleteReceiver, bulkDeleteReceivers };