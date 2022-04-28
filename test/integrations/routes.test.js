const request = require('supertest');
const app = require('../../index');
const clearData = require('../../lib/clearData');
const initTestData = require('../../lib/initTestData');
const { createNotification } = require('../../services/notifications');

const baseUrl = '/v1'

const headers = {
  'Content-Type': 'application/json',
}

describe('GET /v1/generate-key', () => {
  beforeEach(async() => {
    jest.clearAllMocks();
    await clearData()
    await initTestData()
  })

  it('should return 200', async() => {
    const reqHeaders = { ...headers, 'x-api-key': 'test123' }

    await request(app)
      .post(`${baseUrl}/generate-key`)
      .send({
        merchant_id: 'business123'
      })
      .set(reqHeaders)
      .expect('Content-Type', /json/)
      .expect(200);
  })

})

describe('POST /v1/notifications/url', () => {
  beforeAll(async() => {
    await clearData()
    await initTestData()
  })

  it('should return 200', async() => {

    const reqHeaders = { ...headers, 'x-api-key': 'test123' }
    await request(app)
      .post(`${baseUrl}/notifications/url`)
      .set(reqHeaders)
      .send({
        merchant_id: 'business123',
        merchant_url: 'http://test.url.com',
      })
      .expect('Content-Type', /json/)
      .expect(201);
  })
})

describe('POST /v1/notifications', () => {
  beforeAll(async() => {
    await clearData()
    await initTestData()
  })

  it('should return 200', async() => {
    const payload = {
      "partner_trx_id": "demo-123456789",
      "amount": 240000,
      "transaction_timestamp": "2021-07-24T00:00:00.000Z",
      "virtual_account_number": "1234"
    }
    
    const reqHeaders = { ...headers, 'x-api-key': 'test123' }
    await request(app)
      .post(`${baseUrl}/notifications`)
      .set(reqHeaders)
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(201);
  })
})

describe('POST /v1/notifications/${:notificationId}/retry', () => {
  beforeAll(async() => {
    await clearData()
    await initTestData()
  })

  it('should return 200', async() => {
    const payload = {
      "partner_trx_id": "demo-123456789",
      "amount": 240000,
      "transaction_timestamp": "2021-07-24T00:00:00.000Z",
      "virtual_account_number": "1234"
    }
    
    const reqHeaders = { ...headers, 'x-api-key': 'test123' }
    const res = await request(app)
      .post(`${baseUrl}/notifications`)
      .set(reqHeaders)
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(201);

      await request(app)
        .get(`${baseUrl}/notifications/${res.body.data.id}/retry`)
        .set(reqHeaders)
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(200);
  })
})

describe('GET /v1/notifications', () => {
  beforeAll(async() => {
    await clearData()
    await initTestData()
  })

  it('should return 200', async() => {
    const payload = {
      "partner_trx_id": "demo-123456789",
      "amount": 240000,
      "transaction_timestamp": "2021-07-24T00:00:00.000Z",
      "virtual_account_number": "1234"
    }
    
    const reqHeaders = { ...headers, 'x-api-key': 'test123' }
    const { body } = await request(app)
      .post(`${baseUrl}/notifications`)
      .set(reqHeaders)
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(201);

      const res = await request(app)
        .get(`${baseUrl}/notifications/${body.data.business_id}`)
        .set(reqHeaders)
        .expect('Content-Type', /json/)
        .expect(200);

    expect(res.body.length).toEqual(1)
  })
})


