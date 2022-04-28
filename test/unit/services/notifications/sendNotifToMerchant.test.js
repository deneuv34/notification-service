
const axios = require('axios')
const AuthKeys = require('../../../../models/auth_keys')
const Notifications = require('../../../../models/notifications')
const Partners = require('../../../../models/partners')
const { sendNotifToMerchant } = require('../../../../services/notifications')

jest.mock('../../../../models/notifications', () => ({
  findAll: jest.fn(),
  update: jest.fn()
}))
jest.mock('../../../../models/partners', () => ({
  findOne: jest.fn()
}))
jest.mock('../../../../models/auth_keys', () => ({
  findOne: jest.fn()
}))
jest.mock('axios')

describe('sendNotifToMerchant', () => {
  
    it('should update notif', async () => {
      const bussiness_id = 'bussiness_id'
      Partners.findOne.mockImplementationOnce(() => Promise.resolve({ business_id: 'test', merchant_id: 'test123' }))
      AuthKeys.findOne.mockImplementationOnce(() => Promise.resolve({ key: 'test123' }))
      axios.post.mockImplementationOnce(() => Promise.resolve())
      Notifications.update.mockImplementationOnce(() => Promise.resolve())
      await sendNotifToMerchant(bussiness_id)
  
      expect(Notifications.update).toHaveBeenCalled()
    })
})
