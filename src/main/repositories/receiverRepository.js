const Receiver = require('../models/receiverModel');

const getReceivers = async () => {
    return Receiver.find({});
};

const saveReceiver = async (receiverData) => {
    return Receiver.updateOne(
        { pix_key: receiverData.pix_key },
        { $set: receiverData },
        { upsert: true } 
    );
}

const updateReceiver = async (receiverData) => {
    console.log('chegou aqui')
    try {
        return Receiver.updateOne(
            { pix_key: receiverData.pix_key },
            { $set: receiverData },
        );
    } catch (error) {
        console.log('error');
        console.log(error);
    }
}

module.exports = { saveReceiver, getReceivers, updateReceiver };