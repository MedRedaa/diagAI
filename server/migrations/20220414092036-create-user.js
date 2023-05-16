'use strict';

const {DataTypes} = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      fullName : {
        type : DataTypes.STRING,
        allowNull : false
      },
      uuid : {
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        allowNull : false,
        primaryKey : true,
      },
      profileViews : {
        type : DataTypes.INTEGER,
        allowNull : true,
        defaultValue : 0
      },
      img : {
        type : DataTypes.STRING,
        defaultValue : 'https://www.pngfind.com/pngs/m/470-4703547_icon-user-icon-hd-png-download.png',
        allowNull : false
      },
      email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
      },
      role : {
        type : DataTypes.ENUM("doctor", "patient"),
        defaultValue : "patient",
        allowNull : false,
      },
      contact : {
        type : DataTypes.STRING,
        allowNull : false
      },
      password : {
        type : DataTypes.STRING(400),
        allowNull : false
      },
      isComplete : {
        type : DataTypes.BOOLEAN,
        defaultValue : false,
        allowNull : false
      },
      isNew : {
        type : DataTypes.BOOLEAN,
        defaultValue : true,
        allowNull : false
      },
      lat : DataTypes.STRING,
      longit : DataTypes.STRING,
  
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};