
const AuthKeys = require('../../../../models/auth_keys')
const { createAuthKeys } = require('../../../../services/auth_keys')

jest.mock('../../../../models/auth_keys', () => ({
  create: jest.fn()
}))

describe('createAuthKey', () => {

  it('should call create method', async () => {
    const business_id = 'business_id'
    const key = 'key'
    const data = { business_id, key }
    AuthKeys.create.mockImplementationOnce(() => Promise.resolve(data))
    const result = await createAuthKeys(data)

    expect(AuthKeys.create).toHaveBeenCalled()
    expect(result).toEqual(data)
  })
})
