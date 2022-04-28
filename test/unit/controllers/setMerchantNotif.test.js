const setMerchantNotifUrl = require('../../../controllers/setMerchantNotifUrl');
const { setMerchantUrl } = require('../../../services/merchant_url');
const { findPartnerTransaction } = require('../../../services/partners');
const Partners = require('../../../models/partners');

jest.mock('../../../services/merchant_url/setMerchantUrl');
jest.mock('../../../services/partners/findPartnerTransaction');
jest.mock('../../../models/partners')

describe('setMerchantNotifUrl', () => {

  it('should call all methods', async () => {

    Partners.findOne = jest.fn();
    setMerchantUrl.mockImplementation(() => Promise.resolve());
    findPartnerTransaction.mockImplementation(() => Promise.resolve());
    await setMerchantNotifUrl({ body: { test: 'test' } }, { status: (statusCode) => ({ json: jest.fn() })}, jest.fn())

    expect(setMerchantUrl).toHaveBeenCalled()
    expect(Partners.findOne).toHaveBeenCalled()
  })
});
