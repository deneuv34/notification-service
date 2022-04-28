const Partners = require("../models/partners");
const { createAuthKeys } = require("../services/auth_keys")

const generateApiKey = async (req, res, next) => {
  try {
    const partner = await Partners.findOne({ where: { merchant_id: req.body.merchant_id } });
    if (!partner) res.status(400).json({ error: "merchant not found" });
    const data = await createAuthKeys(partner.merchant_id)

    res.status(200).json({
      key: data.key,
    })
  } catch (error) {
    console.error(error)
    next(error);
  }
}

module.exports = generateApiKey