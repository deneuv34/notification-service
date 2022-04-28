'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
const sequelize = require('../database/connectors');

class MerchantNotifURLs extends Model {}

MerchantNotifURLs.init({
  merchant_id: {
    type: DataTypes.STRING,
    unique: true
  },
  merchant_url: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Merchant_Notif_Urls',
  paranoid: true,
  indexes: [{ unique: true, fields: ['business_id'] }]
});

module.exports = MerchantNotifURLs