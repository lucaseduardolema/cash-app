/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      balance: {
        type: Sequelize.DECIMAL,
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('accounts');
  },
};