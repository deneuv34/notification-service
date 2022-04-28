const generateApiKey = require('../../../controllers/generateApiKey');
const Partners = require('../../../models/partners');
const { createAuthKeys } = require('../../../services/auth_keys')

jest.mock('../../../services/auth_keys/createAuthKey')
jest.mock('../../../models/partners')

describe('generateApiKey', () => {

  it('should call findAll method', async () => {
    Partners.findOne.mockImplementation(() => Promise.resolve({ test: 'ok'}));
    await generateApiKey({ body: { business_id: 'test' }, }, { status: (statusCode) => ({ json: jest.fn() })}, jest.fn())

    expect(createAuthKeys).toHaveBeenCalled()
  })
})