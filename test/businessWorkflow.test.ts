import request from 'supertest';
import app from '../src/index';

describe('Business Workflow API', () => {
    let fein = '123456789';
    let business = {
        fein: fein,
        name: 'Test Business'
    };

    it('should create a new business', async () => {
        const res = await request(app)
            .post('/api/businesses')
            .send(business);

        expect(res.status).toBe(201);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.business).toHaveProperty('status', 'New');
        expect(res.body).toHaveProperty('nextStep', 'Provide industry to progress from "New" stage. Supported industries: restaurants, stores.');
    });

    it('should update business to Market Approved', async () => {
        const res = await request(app)
            .put(`/api/businesses/${fein}`)
            .send({ industry: 'restaurants' });

        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.business).toHaveProperty('status', 'Market Approved');
        expect(res.body).toHaveProperty('nextStep', 'Provide contact information to progress from "Market Approved" stage.');
    });

    it('should update business to Sales Approved', async () => {
        const res = await request(app)
            .put(`/api/businesses/${fein}`)
            .send({ contact: { name: 'Talha Sarwar', phone: '923034138113' } });

        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.business).toHaveProperty('status', 'Sales Approved');
        expect(res.body).toHaveProperty('nextStep', 'Business can now be marked as "Won" or "Lost".');
    });

    it('should mark business as Won', async () => {
        const res = await request(app)
            .put(`/api/businesses/${fein}`)
            .send({ status: 'Won' });

        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.business).toHaveProperty('status', 'Won');
        expect(res.body).toHaveProperty('nextStep', 'No further steps available.');
    });

    it('should return 404 for non-existent business', async () => {
        const res = await request(app)
            .put('/api/businesses/000000000')
            .send({ status: 'Won' });

        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('message', 'Business not found');
    });

    it('should not create a business without FEIN or name', async () => {
        const res = await request(app)
            .post('/api/businesses')
            .send({});

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', 'FEIN and Name are required');
    });
});
