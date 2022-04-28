const Partners = require("../../models/partners")

const findPartnerTransaction = (data) => {

  return Partners.findOne({
    where: {
      business_id: data.virtual_account_number,
      partner_trx_id: data.partner_trx_id
    }
  })
};

module.exports = findPartnerTransaction;
