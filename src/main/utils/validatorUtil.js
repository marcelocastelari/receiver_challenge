const Joi = require('joi');
const pino = require('pino');
const logger = pino();

const ERROR_MESSAGES = {
    'CPF': 'O CPF deve seguir o formato XXX.XXX.XXX-XX ou XXXXXXXXXXX',
    'CNPJ': 'O CNPJ deve ter todos os 14 caracteres e seguir o formato XX.XXX.XXX/XXXX-XX ou XXXXXXXXXXXXXX',
    'EMAIL': 'O email deve ser um endereço válido.',
    'TELEFONE': 'O telefone deve seguir o formato XXXXXXXXXXX.',
    'CHAVE_ALEATORIA': 'A chave aleatória deve seguir o formato XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX.',
}

const REGEX = {
    'CPF': /^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/,
    'CNPJ': /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}$/,
    'EMAIL': /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    'TELEFONE': /^((?:\+?55)?)([1-9][0-9])(9[0-9]{8})$/,
    'CHAVE_ALEATORIA': /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
}

const validateFields = (data) => {
    const {  cpf_cnpj, name, pix_key_type, pix_key, email } = data;
    if(!cpf_cnpj) {
        throw new Error('CPF ou CNPJ não informado');
    }
    if(!name) {
        throw new Error('Nome não informado');
    }
    if(!email) {
        throw new Error('Email não informado');
    }
    if(!pix_key_type) {
        throw new Error('Tipo de chave não informado');
    }
    if(!pix_key) {
        throw new Error('Chave não informada');
    }
    
    return true;
}

const validateSchema = (data) => {
    const schema = Joi.object({
        pix_key_type: Joi.string().required().valid('CPF', 'CNPJ', 'EMAIL', 'TELEFONE', 'CHAVE_ALEATORIA'),
        pix_key: Joi.string().required().max(140)
        .when('pix_key_type', { 
            is: 'CPF',
            then: Joi.string().regex(REGEX.CPF).messages({
                'string.pattern.base': ERROR_MESSAGES['CPF'],
            }),
        })
        .when('pix_key_type', {
            is: 'CNPJ',
            then: Joi.string().regex(REGEX.CNPJ)
            .messages({'string.pattern.base' : ERROR_MESSAGES.CNPJ}),
        })
        .when('pix_key_type', {
            is: 'EMAIL',
            then: Joi.string().regex(REGEX.EMAIL)
            .messages({'string.pattern.base' : ERROR_MESSAGES.EMAIL}),
        })
        .when('pix_key_type', {
            is: 'TELEFONE',
            then: Joi.string().regex(REGEX.TELEFONE)
            .messages({'string.pattern.base' : ERROR_MESSAGES.TELEFONE}),
        })
        .when('pix_key_type', {
            is: 'CHAVE_ALEATORIA',
            then: Joi.string().regex(REGEX.CHAVE_ALEATORIA)
            .messages({'string.pattern.base' : ERROR_MESSAGES.CHAVE_ALEATORIA}),
        }),
        email: Joi.string().regex(REGEX.EMAIL)
        .messages({'string.pattern.base' : ERROR_MESSAGES['EMAIL']}),
    });

    const result = schema.validate(data);
    if(result.error) {
        logger.error(`[formatValidator] ${result.error.message}`);
        throw new Error(result.error.message);
    }

    return result.value;
}

const isDataValid = (data) => {
        const filteredData = {
            email: data.email,
            pix_key_type: data.pix_key_type,
            pix_key: data.pix_key,
        }
    
        if(validateFields(data)) {
            return validateSchema(filteredData)  
        }
    
        return;
}

module.exports = { isDataValid };