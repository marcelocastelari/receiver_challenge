const { getUuid, addUuid, validateUuid } = require('../../../main/utils/uuidUtil');
const { v4: uuidv4, validate: uuidValidate } = require('uuid');

// Mocking uuidv4 and uuidValidate
jest.mock('uuid', () => {
  const uuidv4 = jest.fn();
  const uuidValidate = jest.fn();
  return { v4: uuidv4, validate: uuidValidate };
});

describe('UUID Utils', () => {

  describe('getUuid', () => {
    it('should return a valid UUID', () => {
      const mockUuid = 'mock_uuid';
      uuidv4.mockReturnValue(mockUuid);

      const result = getUuid();

      expect(result).toBe(mockUuid);
    });
  });

  describe('addUuid', () => {
    it('should add a UUID to the provided data', () => {
      const inputData = {
        name: 'user'
      };

      const mockUuid = 'mock_uuid';
      uuidv4.mockReturnValue(mockUuid);

      const result = addUuid(inputData);

      expect(result).toEqual({
        ...inputData,
        uuid: mockUuid
      });
    });
  });

  describe('validateUuid', () => {
    it('should return true for a valid UUID', () => {
      const validUuid = '550e8400-e29b-41d4-a716-446655440000';
      uuidValidate.mockReturnValue(true);

      const result = validateUuid(validUuid);

      expect(result).toBe(true);
    });

    it('should return false for an invalid UUID', () => {
      const invalidUuid = 'invalid_uuid';
      uuidValidate.mockReturnValue(false);

      const result = validateUuid(invalidUuid);

      expect(result).toBe(false);
    });
  });
});
