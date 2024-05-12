const { validateUpdate } = require('../../../main/utils/updateUtil');
const { getReceiverById } = require('../../../main/repositories/receiverRepository');

jest.mock('../../../main/repositories/receiverRepository');

describe('Update Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return false if status is "valid" and non-email fields are updated', async () => {
    const mockUuid = 'mock_uuid';
    const mockData = {
      status: 'valid',
      email: 'test@test.com',
    };
    getReceiverById.mockResolvedValue(mockData);

    const updatedData = {
        name: 'user',
        status: 'valid',
    };

    const result = await validateUpdate(mockUuid, updatedData);
    expect(result).toBe(false);
  });

  it('should return true if status is not "valid"', async () => {
    const mockUuid = 'mock_uuid';
    const mockData = {
      status: 'draft',
    };

    await getReceiverById.mockResolvedValue(mockData);
    const updatedData = {
        name: 'user'
    };

    const result = await validateUpdate(mockUuid, updatedData);

    expect(result).toBe(true);
  });

  it('should return true if no other conditions are met', async () => {
    const mockUuid = 'mock_uuid';
    const mockData = {
      status: 'valid',
      email: 'test@test.com',
    };
    getReceiverById.mockResolvedValue(mockData);
    const updatedData = {
    };
    const result = await validateUpdate(mockUuid, updatedData);
  
    expect(result).toBe(true);
  });

  it('should return true if receiver is not found', async () => {
    const mockUuid = 'mock_uuid';
    getReceiverById.mockResolvedValue(null);

    const updatedData = {};

    const result = await validateUpdate(mockUuid, updatedData);
    expect(result).toBe(true);
  });
});
