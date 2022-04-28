const AuthKeys = require("../../models/auth_keys")

const findKey = async (bussiness_id, key) => {

  return AuthKeys.findOne({
    where: {
      bussiness_id,
      key
    }
  })
}

module.exports = findKey
