
const MerchantNotifURLs = require('../../../../models/merchantNotifURLs')
const { setMerchantUrl } = require('../../../../services/merchant_url')

jest.mock('../../../../models/merchantNotifURLs', () => ({
  update: jest.fn(),
  findOne: jest.fn()
}))

describe('setMerchantUrl', () => {
  
    it('should call findOne method', async () => {
      const bussiness_id = 'bussiness_id'
      const url = 'url'
      const data = { bussiness_id, url }
      MerchantNotifURLs.findOne.mockImplementationOnce(() => Promise.resolve(data))
      await setMerchantUrl(data)
  
      expect(MerchantNotifURLs.findOne).toHaveBeenCalledTimes(2)
      expect(MerchantNotifURLs.update).toHaveBeenCalled()
    })
})
