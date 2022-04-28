const request = require('supertest');
const app = require('../../index');
const clearData = require('../../lib/clearData');
const initTestData = require('../../lib/initTestData');
const { describe } = require('../../models/partners');

const baseUrl = '/v1'

const headers = {
  'Content-Type': 'application/json',
}

describe('GET /v1/generate-key', () => {
  beforeAll(async() => {
    await clearData()
    await initTestData()
  })

  it('should return 200', async() => {
    await request(app)
      .post(`${baseUrl}/generate-key`)
      .send({
        merchant_id: 'business123'
      })
      .set(headers)
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


