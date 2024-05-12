const Receiver = require('../../../main/models/receiverModel');
const receiverRepository = require('../../../main/repositories/receiverRepository');

jest.mock('../../../main/models/receiverModel');

describe('Receiver Repository', () => {
    beforeEach(() => {
    jest.clearAllMocks();
  });

    it('should set pix_key as index', () => {
        Receiver.createIndexes.mockResolvedValue({});
        receiverRepository.setPixKeyAsIndex();

        expect(Receiver.createIndexes).toHaveBeenCalledWith({ pix_key: 1 }, { unique: true });
    });

    it('should return all receivers', async () => {
        const mockData = [
            {
                cpf_cnpj: "83235664025",
                email: "test@test.com",
                name: "User",
                pix_key: "83235664025",
                pix_key_type: "CPF",
                status: "draft"
            },
        ]

        Receiver.find.mockResolvedValue(mockData);
        const receiver = await Receiver.find();

        expect(receiver).toEqual(mockData);
    });

    it('should throw an error if Receiver.find throws an error', async () => {
        const mockError = new Error('Error on get receivers');

        Receiver.find.mockImplementationOnce(() => { throw mockError });
        await expect(receiverRepository.getReceivers()).rejects.toThrowError(mockError);
    
        expect(Receiver.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if Receiver.updateOne throws an error', async () => {
        const mockError = new Error('Error on save receiver');
        Receiver.updateOne.mockImplementationOnce(() => { throw mockError });
    
        await expect(receiverRepository.saveReceiver({})).rejects.toThrowError(mockError);
    
        expect(Receiver.updateOne).toHaveBeenCalled();
    });

    it('should return a receiver by ID', async () => {
        const mockReceiver = {
          uuid: "123456789",
          cpf_cnpj: "83235664025",
          email: "test@test.com",
          name: "User",
          pix_key: "83235664025",
          pix_key_type: "CPF",
          status: "draft"
        };
    
        Receiver.findOne.mockResolvedValue(mockReceiver);
        const result = await receiverRepository.getReceiverById(mockReceiver.uuid);
    
        expect(result).toEqual(mockReceiver);
        expect(Receiver.findOne).toHaveBeenCalledWith({ uuid: mockReceiver.uuid });
    });

    it('should throw an error if Receiver.findOne throws an error', async () => {
        const mockError = new Error('Error on get receiver by id');

        Receiver.findOne.mockImplementationOnce(() => { throw mockError });
        await expect(receiverRepository.getReceiverById("mocked_uuid")).rejects.toThrowError(mockError);
    
        expect(Receiver.findOne).toHaveBeenCalledWith({ uuid: "mocked_uuid" });
    });

    it('should update a receiver', async () => {
        const mockUuid = "123456789";
        const mockReceiverData = {
          cpf_cnpj: "83235664025",
          email: "test@test.com",
          name: "User",
          pix_key: "83235664025",
          pix_key_type: "CPF",
          status: "draft"
        };
    
        const mockResult = {
          n: 1,
          nModified: 1,
        };

        Receiver.updateOne.mockResolvedValue(mockResult);
        const result = await receiverRepository.updateReceiver(mockUuid, mockReceiverData);
    
        expect(result).toEqual(mockResult);
        expect(Receiver.updateOne).toHaveBeenCalledWith(
          { uuid: mockUuid },
          { $set: mockReceiverData }
        );
    });
    
    it('should throw an error if Receiver.updateOne throws an error', async () => {
        const mockUuid = "123456789";
        const mockReceiverData = {
          cpf_cnpj: "83235664025",
          email: "test@test.com",
          name: "User",
          pix_key: "83235664025",
          pix_key_type: "CPF",
          status: "draft"
        };
        const mockError = new Error('Error on update receiver');

        Receiver.updateOne.mockImplementationOnce(() => { throw mockError });
    
        await expect(receiverRepository.updateReceiver(mockUuid, mockReceiverData)).rejects.toThrowError(mockError);
        expect(Receiver.updateOne).toHaveBeenCalledWith(
          { uuid: mockUuid },
          { $set: mockReceiverData }
        );
    });

    it('should delete a receiver', async () => {
        const mockReceiverId = "123456789";
        const mockResult = {
          n: 1,
          deletedCount: 1,
        };

        Receiver.deleteOne.mockResolvedValue(mockResult);
        const result = await receiverRepository.deleteReceiver(mockReceiverId);
    
        expect(result).toEqual(mockResult);
        expect(Receiver.deleteOne).toHaveBeenCalledWith({ uuid: mockReceiverId });
    });
    
    it('should throw an error if Receiver.deleteOne throws an error', async () => {
        const mockReceiverId = "123456789";
        const mockError = new Error('error on delete receiver');

        Receiver.deleteOne.mockImplementationOnce(() => { throw mockError });

        await expect(receiverRepository.deleteReceiver(mockReceiverId)).rejects.toThrowError(mockError);
        expect(Receiver.deleteOne).toHaveBeenCalledWith({ uuid: mockReceiverId });
    });

    it('should bulk delete receivers', async () => {
        const mockReceiverIds = ["123456789", "987654321"];
        const mockResult = {
          n: mockReceiverIds.length,
          deletedCount: mockReceiverIds.length,
        };

        Receiver.deleteMany.mockResolvedValue(mockResult);
        const result = await receiverRepository.bulkDeleteReceivers(mockReceiverIds);
    
        expect(result).toEqual(mockResult);
        expect(Receiver.deleteMany).toHaveBeenCalledWith({ uuid: { $in: mockReceiverIds } });
    });
    
    it('should throw an error if Receiver.deleteMany throws an error', async () => {
        const mockReceiverIds = ["123456789", "987654321"];
        const mockError = new Error('error on bulk delete receivers');

        Receiver.deleteMany.mockImplementationOnce(() => { throw mockError });
    
        await expect(receiverRepository.bulkDeleteReceivers(mockReceiverIds)).rejects.toThrowError('error on bulk delete receivers');
        expect(Receiver.deleteMany).toHaveBeenCalledWith({ uuid: { $in: mockReceiverIds } });
    });
});