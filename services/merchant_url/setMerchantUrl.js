const MerchantNotifURLs = require("../../models/merchantNotifURLs")

const setMerchantUrl = async (data) => {
  const url = await MerchantNotifURLs.findOne({ where: { merchant_id: data.merchant_id }});
  if (!url) {
    return MerchantNotifURLs.create(data)
  }
  await MerchantNotifURLs.update({
    merchant_url: data.merchant_url,
  }, {
    where: {
      merchant_id: data.merchant_id
    },
  })

  return MerchantNotifURLs.findOne({ where: { merchant_id: data.merchant_id }})
}

module.exports = setMerchantUrl;
