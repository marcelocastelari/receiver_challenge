const mongoose = require('mongoose');

const receiverSchema = new mongoose.Schema({
    uuid: {
        type: String,
        unique: true
    },
    cpf_cnpj : {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
    },
    pix_key : {
        type: String,
        required: true
    },
    pix_key_type : {
        type: String,
        required: true
    },
    status : {
        type: String,
        default: 'Draft'
    }
});

const Receiver = mongoose.model('Receiver', receiverSchema);

module.exports = Receiver;