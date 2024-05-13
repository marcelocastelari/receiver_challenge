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

    it('should return status 200 when DELETE/receiver', async () => {
        const resp = await request(server).get('/receiver');
        
        const uuid = resp.body[0].uuid;
        const response = await request(server).delete(`/receiver/${uuid}`)

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual({ message: 'Receiver deleted successfully' });
    });

    it('should return status 404 when DELETE/receiver', async () => {
        const response = await request(server).delete(`/receiver/123`)

        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({ message: 'Error on delete receiver' });
    });

    it('should return status 200 when DELETE/receiver', async () => {
        await request(server).post('/receiver').send(mockData);
        const newData = { ...mockData, name: 'User55' }
        await request(server).post('/receiver').send(newData);

        const resp = await request(server).get('/receiver');
        
        const uuids = resp.body.map(receiver => receiver.uuid);
        const response = await request(server).post('/receiver/bulk-delete').send(uuids)

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual({ message: 'Bulk delete completed successfully' });
    });
});