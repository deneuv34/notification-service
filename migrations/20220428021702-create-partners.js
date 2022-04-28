'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('Partners', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        business_id: {
          type: Sequelize.STRING
        },
        merchant_id: {
          type: Sequelize.STRING,
          allowNull: false
        },
        merchant_end_customer_id: {
          type: Sequelize.STRING
        },
        partner_trx_id: {
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        deletedAt: {
          allowNull: true,
          type: Sequelize.DATE
        }
      });
      transaction.commit()
    } catch (error) {
      transaction.rollback()
    }
    
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Partners');
  }
};