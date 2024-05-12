const { v4: uuidv4, validate: uuidValidate } = require('uuid');

const getUuid = () => {
    return uuidv4();
}

const addUuid = (data) => {
    const uuid = uuidv4();
    data.uuid = uuid;
    return data;
}

const validateUuid = (uuid) => {
    return uuidValidate(uuid);
}


module.exports = {
    getUuid,
    addUuid,
    validateUuid
}