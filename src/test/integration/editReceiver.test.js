const request = require('supertest');
const server = require('../../main/server');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const { deleteReceiver } = require('../../main/services/receiverService');

describe('Receiver Repository', () => {
    const mockData =
    {
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
        await request(server).post('/receiver').send(mockData);
    });

    afterEach(async () => {
        await mongoose.connection.close();
    });

    it('should return status 200 when PUT/receiver', async () => {
        const resp = await request(server).get('/receiver');
        
        const uuid = resp.body[0].uuid;
        const newData = { ...mockData, name: 'User2' }
        const response = await request(server).put(`/receiver/${uuid}`).send(newData)

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual({ message: 'Receiver updated successfully' });
    });

    it('should throws when PUT/receiver with invalid data', async () => {
        const newData = { ...mockData, name: 'User3' }
        await request(server).post('/receiver').send(newData);
        const resp = await request(server).get('/receiver');
        
        const uuid = resp.body[0].uuid;
        const receiverData = { ...mockData, pix_key: 'teste' }
        const response = await request(server).put(`/receiver/${uuid}`).send(receiverData);

        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({ message: 'The CPF must follow the format XXX.XXX.XXX-XX or XXXXXXXXXXX' });
    });
});