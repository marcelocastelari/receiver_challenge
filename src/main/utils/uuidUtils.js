const { v4: uuidv4 } = require('uuid');

const getUuid = () => {
    return uuidv4();
}

const addUuid = (data) => {
    const uuid = uuidv4();
    data.uuid = uuid;
    return data;
}

module.exports = {
    getUuid,
    addUuid
}