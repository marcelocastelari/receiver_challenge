const { queryByField } = require('../../../main/utils/queryUtil');

describe('Query Utils', () => {
  it('should return the correct query object when all fields are provided', () => {
    const field = {
      status: 'active',
      name: 'John Doe',
      pixKeyType: 'CPF',
      pixKey: '123456789'
    };

    const result = queryByField(field);

    const expectedQuery = {
      status: 'active',
      name: 'John Doe',
      pix_key_type: 'CPF',
      pix_key: '123456789'
    };

    expect(result).toEqual(expectedQuery);
  });

  it('should return the correct query object when some fields are provided', () => {
    const field = {
      status: 'active',
      pixKeyType: 'CPF'
    };

    const result = queryByField(field);
    const expectedQuery = {
      status: 'active',
      pix_key_type: 'CPF'
    };

    expect(result).toEqual(expectedQuery);
  });

  it('should return an empty query object when no fields are provided', () => {
    const field = {};
    const result = queryByField(field);
    const expectedQuery = {};

    expect(result).toEqual(expectedQuery);
  });
});
