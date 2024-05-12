const receiverService = require('../../../main/services/receiverService');
const receiverController = require('../../../main/controllers/receiverController');

jest.mock('../../../main/services/receiverService');

describe('Receiver Controller', () => {
    const createMockRequest = (body = {}, params = {}) => ({
        body,
        params,
    });

    describe('GET /list', () => {
        it('should return a list of receivers on success', async () => {
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
            const req = createMockRequest();
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

            receiverService.listReceivers.mockResolvedValue(mockData);
            await receiverController.list(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(mockData);
        });

        it('should handle errors and return a 400 status code', async () => {
            const req = createMockRequest();
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            const mockError = new Error('Some error occurred');

            receiverService.listReceivers.mockRejectedValue(mockError);
            await receiverController.list(req, res);
      
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({ message: mockError.message });
        });
    });

    describe('POST /create', () => {
        it('should create a new receiver and return a 201 status code', async () => {
            const req = createMockRequest();
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            const mockResponse = { "message": "Receiver created successfully" }
            const mockData = {
                cpf_cnpj: "83235664025",
                email: "XXXXXXXXXXXXX",
                name: "User",
                pix_key: "83235664025",
                pix_key_type: "CPF",
            };

            receiverService.createReceiver.mockResolvedValue(mockData);
            await receiverController.create(createMockRequest({ body: mockData }), res);
    
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith(mockResponse);
        });

        it('should handle errors and return a 400 status code', async () => {
            const req = createMockRequest();
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            const mockError = new Error('Some error occurred');;

            receiverService.createReceiver.mockRejectedValue(mockError);
            await receiverController.create(req, res);
    
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({ message: mockError.message });
        });
    });
    
    describe('PUT /edit', () => {
        it('should update a receiver and return a 200 status code', async () => {
            const req = createMockRequest({ id: "1234-5678" });
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
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
            receiverService.editReceiver.mockResolvedValue(mockData);
        
            await receiverController.edit(req, res);
        
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({ message: 'Receiver updated successfully' });
        });
      
        it('should handle errors and return a 400 status code', async () => {
          const req = createMockRequest({ id: "1234-5678" });
          const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
          const mockError = new Error('Some error occurred');
          receiverService.editReceiver.mockRejectedValue(mockError);
      
          await receiverController.edit(req, res);
      
          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.send).toHaveBeenCalledWith({ message: mockError.message });
        });
    });

    describe('DELETE /delete', () => {
        it('should delete a receiver and return a 200 status code', async () => {
            const req = createMockRequest({ id: "1234-5678" });
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            receiverService.deleteReceiver.mockResolvedValue();
      
            await receiverController.delete(req, res);
        
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({ message: 'Receiver deleted successfully' });
        });
      
        it('should handle errors and return a 400 status code', async () => {
            const req = createMockRequest({ id: "1234-5678" });
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            const mockError = new Error('Some error occurred');
            receiverService.deleteReceiver.mockRejectedValue(mockError);
        
            await receiverController.delete(req, res);
        
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({ message: mockError.message });
        });
    });

    describe('POST /bulkDelete', () => {
        it('should bulk delete receivers and return a 200 status code', async () => {
            const req = createMockRequest( [ "1234-5678", "2345-6789" ]);
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
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
            receiverService.bulkDeleteReceivers.mockResolvedValue(mockData);
        
            await receiverController.bulkDelete(req, res);
        
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({ message: 'Bulk delete completed successfully' });
        });

        it('should handle errors and return a 400 status code', async () => {
            const req = createMockRequest( [ "1234-5678", "2345-6789" ]);
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            const mockError = new Error('Some error occurred');
            
            receiverService.bulkDeleteReceivers.mockRejectedValue(mockError);
            await receiverController.bulkDelete(req, res);
        
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({ message: mockError.message });
        });
        
    });


});
