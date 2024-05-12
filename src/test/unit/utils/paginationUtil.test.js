const { paginate } = require('../../../main/utils/paginationUtil');

describe('Pagination Utils', () => {
  it('should return the correct pagination values', () => {
    const page = '2';
    const pageSize = '20';

    const result = paginate(page, pageSize);
    const expectedSkip = (parseInt(page) - 1) * parseInt(pageSize);
    const expectedSize = parseInt(pageSize);

    expect(result).toEqual({
      skip: expectedSkip,
      size: expectedSize
    });
  });

  it('should default to page size of 10 if pageSize is not provided', () => {
    const page = '2';

    const result = paginate(page);
    const expectedSkip = (parseInt(page) - 1) * 10;
    const expectedSize = 10;

    expect(result).toEqual({
      skip: expectedSkip,
      size: expectedSize
    });
  });

  it('should default to page size of 10 if pageSize is not a valid number', () => {
    const page = '2';
    const pageSize = 'invalid';

    const result = paginate(page, pageSize);
    const expectedSkip = (parseInt(page) - 1) * 10;
    const expectedSize = 10;

    expect(result).toEqual({
      skip: expectedSkip,
      size: expectedSize
    });
  });
});