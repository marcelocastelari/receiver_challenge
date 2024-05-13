const request = require('supertest');
const server = require('../../main/server');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const receiverRepository = require('../../main/repositories/receiverRepository');

describe('GET /receiver', () => {
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
    });
    
    afterEach(async () => {
        await mongoose.connection.close();
    });
    
    it('should return status 200 when GET/receiver', async () => {
        const response = await request(server).get('/receiver')
    
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual([]);
    });

    it('should return status 200 when GET/receiver', async () => {
        const test = await request(server).post('/receiver').send(mockData);
        const response = await request(server).get('/receiver?name=User')
    
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual([]);
    });
});