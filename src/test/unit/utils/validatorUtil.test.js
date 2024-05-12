const { isDataValid, validateSchema } = require('../../../main/utils/validatorUtil');
const Joi = require('joi');

describe('isDataValid', () => {
    it('should throw an error if CPF or CNPJ is not informed', () => {
        const data = {
          name: 'John Doe',
          pix_key_type: 'CPF',
          pix_key: '12345678901',
          email: 'john@example.com'
        };
    
        expect(() => isDataValid(data)).toThrow('CPF or CNPJ not informed');
    });
    
    it('should throw an error if Name is not given', () => {
    const data = {
        cpf_cnpj: '12345678901',
        pix_key_type: 'CPF',
        pix_key: '12345678901',
        email: 'john@example.com'
    };

    expect(() => isDataValid(data)).toThrow('Name not given');
    });

    it('should throw an error if Email is not provided', () => {
    const data = {
        cpf_cnpj: '12345678901',
        name: 'John Doe',
        pix_key_type: 'CPF',
        pix_key: '12345678901'
    };

    expect(() => isDataValid(data)).toThrow('Email not provided');
    });

    it('should throw an error if Key type is not specified', () => {
    const data = {
        cpf_cnpj: '12345678901',
        name: 'John Doe',
        pix_key: '12345678901',
        email: 'john@example.com'
    };

    expect(() => isDataValid(data)).toThrow('Key type not specified');
    });

    it('should throw an error if Key is not provided', () => {
    const data = {
        cpf_cnpj: '12345678901',
        name: 'John Doe',
        pix_key_type: 'CPF',
        email: 'john@example.com'
    };

    expect(() => isDataValid(data)).toThrow('Key not provided');
    });


    it('should return true if all fields are provided and valid', () => {
    const data = {
        cpf_cnpj: '12345678901',
        name: 'John Doe',
        pix_key_type: 'CPF',
        pix_key: '12345678901',
        email: 'john@example.com'
    };

    const result = isDataValid(data);

    expect(result).toEqual({"email": "john@example.com", "pix_key": "12345678901", "pix_key_type": "CPF"});
    });

    it('should throw an error with the correct message if there is a validation error', () => {
        const invalidData = {
            pix_key_type: 'CPF',
            pix_key: 'invalid_key',
            email: 'invalid_email',
        };

        expect(() => validateSchema(invalidData)).toThrow('The CPF must follow the format XXX.XXX.XXX-XX or XXXXXXXXXXX');
    });
  
});
