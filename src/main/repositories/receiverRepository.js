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

const updateReceiver = async (receiverData) => {
    return Receiver.updateOne(
        { uuid: receiverData.uuid },
        { $set: receiverData },
    );
}
    

module.exports = { saveReceiver, getReceivers, updateReceiver };