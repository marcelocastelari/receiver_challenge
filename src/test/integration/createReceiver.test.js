const request = require('supertest');
const server = require('../../main/server');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const receiverService = require('../../main/services/receiverService');

describe('Receiver Repository', () => {
    const mockData =
    {
        uuid: "550e8400-e29b-41d4-a716-446655440000",
        cpf_cnpj: "83235664025",
        email: "test@test.com",
        name: "User",
        pix_key: "83235664026",
        pix_key_type: "CPF",
        status: "draft"
    };

    beforeEach(async () => {
        const mongoMemoryServer = await MongoMemoryServer.create();
        const mongoUri = await mongoMemoryServer.getUri();
        mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterEach(async () => {
        await receiverService.deleteReceiver(mockData.uuid);
        await mongoose.connection.close();
    });

    it('should return status 201 when POST/receiver', async () => {
        const response = await request(server).post('/receiver').send(mockData)

        expect(response.status).toBe(201);
        expect(response.body).toStrictEqual({ message: 'Receiver created successfully' });
    });

    it('should throws when POST/receiver with invalid data', async () => {
        const receiverData = { ...mockData, pix_key: 'teste' }
        const response = await request(server).post('/receiver').send(receiverData);

        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({ message: 'The CPF must follow the format XXX.XXX.XXX-XX or XXXXXXXXXXX' });
    });
    
});