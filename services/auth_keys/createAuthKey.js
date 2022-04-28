const AuthKeys = require("../../models/auth_keys")

const createAuthKeys = async (merchant_id) => {

  const key = merchant_id + "-" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

  return AuthKeys.create({
    merchant_id,
    key
  })
}

module.exports = createAuthKeys
