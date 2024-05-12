const receiverService = require('../../../main/services/receiverService');
const { getReceivers, getReceiverById, updateReceiver, deleteReceiver, bulkDeleteReceivers } = require('../../../main/repositories/receiverRepository');
const { saveReceiver } = require('../../../main/repositories/receiverRepository');
const { isDataValid } = require('../../../main/utils/validatorUtil');
const { addUuid, validateUuid } = require('../../../main/utils/uuidUtil');
const { validateUpdate } = require('../../../main/utils/updateUtil.js');

jest.mock('../../../main/utils/validatorUtil');
jest.mock('../../../main/utils/uuidUtil');
jest.mock('../../../main/utils/updateUtil.js');
jest.mock('../../../main/repositories/receiverRepository');

describe('Receiver Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should list receivers with pagination', async () => {
    const req = {
      query: {
        page: 1,
        pageSize: 10,
        status: 'draft'
      }
    };

    const mockData = [
        {
            cpf_cnpj: "83235664025",
            email: "test@test.com",
            name: "User",
            pix_key: "83235664025",
            pix_key_type: "CPF",
            status: "draft"
        }
    ];
    await getReceivers.mockResolvedValue(mockData);
    const result = await receiverService.listReceivers(req);

    expect(getReceivers).toHaveBeenCalledWith({ status: 'draft' }, 0, 10);
    expect(result).toEqual(mockData);
  });

  it('should create a receiver if data is valid', async () => {
    const mockData = [
        {
            cpf_cnpj: "83235664025",
            email: "test@test.com",
            name: "User",
            pix_key: "83235664025",
            pix_key_type: "CPF",
            status: "draft"
        }
    ];

    isDataValid.mockReturnValue(true);

    const mockDataWithUuid = { ...mockData, uuid: 'mocked_uuid' };

    addUuid.mockReturnValue(mockDataWithUuid);
    await receiverService.createReceiver(mockData);

    expect(isDataValid).toHaveBeenCalledWith(mockData);
    expect(addUuid).toHaveBeenCalledWith(mockData);
    expect(saveReceiver).toHaveBeenCalledWith(mockDataWithUuid);
  });

  it('should throw an error if data is invalid', async () => {
    const mockData = [
        {
            cpf_cnpj: "83235664025",
            email: "test@test.com",
            name: "User",
            pix_key: "83235664025",
            pix_key_type: "CPF",
            status: "draft"
        }
    ];

    isDataValid.mockReturnValue(false);

    await expect(receiverService.createReceiver(mockData)).rejects.toThrowError('Invalid request params');
    expect(saveReceiver).not.toHaveBeenCalled();
  });

  it('should edit a receiver if data and UUID are valid and receiver exists', async () => {
    const mockData = [
        {
            cpf_cnpj: "83235664025",
            email: "test@test.com",
            name: "User",
            pix_key: "83235664025",
            pix_key_type: "CPF",
            status: "draft"
        }
    ];
    const mockUuid = 'mock_uuid';

    isDataValid.mockReturnValue(true);
    validateUuid.mockReturnValue(true);

    const mockExistingReceiver = {};
    getReceiverById.mockResolvedValue(mockExistingReceiver);

    validateUpdate.mockResolvedValue(true);
    await receiverService.editReceiver({ body: mockData, params: { id: mockUuid } });

    expect(isDataValid).toHaveBeenCalledWith(mockData);
    expect(validateUuid).toHaveBeenCalledWith(mockUuid);
    expect(getReceiverById).toHaveBeenCalledWith(mockUuid);
    expect(validateUpdate).toHaveBeenCalledWith(mockUuid, mockData);
    expect(updateReceiver).toHaveBeenCalledWith(mockUuid, mockData);
  });

  it('should throw an error on edit if data is invalid', async () => {
    const mockData = [
        {
            cpf_cnpj: "83235664025",
            email: "test@test.com",
            name: "User",
            pix_key: "83235664025",
            pix_key_type: "CPF",
            status: "draft"
        }
    ];
    const mockUuid = 'mock_uuid';


    isDataValid.mockReturnValue(false);

    await expect(receiverService.editReceiver({ body: mockData, params: { id: mockUuid } })).rejects.toThrowError('Invalid request params');
  });

  it('should delete a receiver if UUID is valid', async () => {
    const mockUuid = 'mock_uuid';

    validateUuid.mockReturnValue(true);
    await receiverService.deleteReceiver(mockUuid);

    expect(validateUuid).toHaveBeenCalledWith(mockUuid);
    expect(deleteReceiver).toHaveBeenCalledWith(mockUuid);
  });

  it('should throw an error on delete if UUID is invalid', async () => {
    const mockUuid = 'invalid_uuid';

    validateUuid.mockReturnValue(false);

    await expect(receiverService.deleteReceiver(mockUuid)).rejects.toThrowError('Invalid request params');
    expect(deleteReceiver).not.toHaveBeenCalled();
  });

  it('should throw an error if receiver data or UUID are not valid', async () => {
    const mockReceiverData = {};
    const mockUuid = 'invalid_uuid';
  
    isDataValid.mockReturnValue(false);
    validateUuid.mockReturnValue(false);
  
    await expect(receiverService.editReceiver({ body: mockReceiverData, params: { id: mockUuid } })).rejects.toThrowError('Invalid request params');
  
    expect(getReceiverById).not.toHaveBeenCalled();
    expect(updateReceiver).not.toHaveBeenCalled();
  });

  it('should throw an error if receiver is not found', async () => {
    const mockReceiverData = {};
    const mockUuid = 'mock_uuid';
  
    isDataValid.mockReturnValue(true);
    validateUuid.mockReturnValue(true);
    getReceiverById.mockResolvedValue(null);
    await expect(receiverService.editReceiver({ body: mockReceiverData, params: { id: mockUuid } })).rejects.toThrowError('Receiver not found');
  
    expect(updateReceiver).not.toHaveBeenCalled();
  });

  it('should throw an error if update is not allowed based on status', async () => {
    const mockReceiverData = {};
    const mockUuid = 'mock_uuid';
  
    isDataValid.mockReturnValue(true);
    validateUuid.mockReturnValue(true);
    const mockExistingReceiver = {};
    getReceiverById.mockResolvedValue(mockExistingReceiver);
    validateUpdate.mockResolvedValue(false);

    await expect(receiverService.editReceiver({ body: mockReceiverData, params: { id: mockUuid } })).rejects.toThrowError('Only email field can be updated based on status');
    expect(updateReceiver).not.toHaveBeenCalled();
  });

  it('should throw an error if receiver is not found', async () => {
    const mockUuid = 'mock_uuid';

    validateUuid.mockReturnValue(true);
    deleteReceiver.mockRejectedValue(new Error('Receiver not found'));
    await expect(receiverService.deleteReceiver(mockUuid)).rejects.toThrowError('Receiver not found');

    expect(validateUuid).toHaveBeenCalledWith(mockUuid);
    expect(deleteReceiver).toHaveBeenCalledWith(mockUuid);
  });

  it('should bulk delete receivers if all UUIDs are valid', async () => {
    const mockUuids = ['uuid1', 'uuid2', 'uuid3'];

    validateUuid.mockReturnValue(true);

    await receiverService.bulkDeleteReceivers(mockUuids);

    expect(bulkDeleteReceivers).toHaveBeenCalledWith(mockUuids);
    mockUuids.forEach(uuid => {
      expect(validateUuid).toHaveBeenCalledWith(uuid);
    });
  });

  it('should throw an error if any receiver is not found', async () => {
    const mockUuids = ['uuid1', 'uuid2', 'uuid3'];
    const mockError = new Error('Invalid request params');

    bulkDeleteReceivers.mockImplementationOnce(() => { throw mockError });
    validateUuid.mockReturnValue(false);

    await expect(receiverService.bulkDeleteReceivers(mockUuids)).rejects.toThrowError(mockError);
  });

});