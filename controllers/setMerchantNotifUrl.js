const Partners = require("../models/partners");
const { setMerchantUrl } = require("../services/merchant_url");

const setMerchantNotifUrl = async (req, res) => {
  try {
    const merchant = await Partners.findOne({ where: { merchant_id: req.body.merchant_id }});

    if (!merchant) {
      res.status(400).json({
        error: "merchant not found"
      });
    }

    const data = await setMerchantUrl(req.body);

    res.status(201).json(data)
  } catch (error) {
    throw new Error(`Couldn't set the merchant notification url: ${error.message}`);
  }
}

module.exports = setMerchantNotifUrl;
