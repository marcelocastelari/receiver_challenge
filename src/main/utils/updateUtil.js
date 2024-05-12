const { getReceiverById } = require('../repositories/receiverRepository')

const validateUpdate = async (uuid, data) => {
    const oldData = await getReceiverById(uuid);
    if (!oldData) {
        return true;
    }
    if (oldData.status === 'valid') {
        for (let key in data) {
            if (key !== 'email' && oldData[key] !== data[key]) {
                return false;
            } 
        }
    } else {
        return true;
    }
    return true;
}

module.exports = {
    validateUpdate
}