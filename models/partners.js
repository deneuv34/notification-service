'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
const sequelize = require('../database/connectors');

class Partners extends Model {}

Partners.init({
  business_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  merchant_end_customer_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  merchant_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  partner_trx_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Partners',
  paranoid: true
});

module.exports = Partners;
